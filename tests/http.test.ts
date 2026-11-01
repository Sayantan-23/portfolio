import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import nextEnv from "@next/env";
import { database } from "../lib/db";
import { createSession, sessionCookie } from "../lib/session";

// Run explicitly against the local production server, never a hosted site.
test(
  "project admin round trip, authorisation, drafts, ordering, and persistence",
  { skip: !process.env.TEST_BASE_URL },
  async () => {
    const base = process.env.TEST_BASE_URL!;
    assert.ok(["127.0.0.1", "localhost"].includes(new URL(base).hostname));
    nextEnv.loadEnvConfig(process.cwd());
    const pool = database();
    const manifest = JSON.parse(
      await readFile(".next/server/server-reference-manifest.json", "utf8"),
    );
    const actions = new Map(
      Object.entries(manifest.node).map(([id, value]) => [
        (value as { exportedName: string }).exportedName,
        id,
      ]),
    );
    const { encodeReply } = createRequire(import.meta.url)(
      "next/dist/compiled/react-server-dom-webpack/client.node",
    );
    const cookie = `${sessionCookie}=${await createSession()}`;
    const prefix = `__integration_${Date.now()}_`;
    const ids: string[] = [];
    const input = {
      name: prefix + "first",
      summary: "Temporary integration fixture.",
      category: "selected",
      state: "Testing",
      technologies: "Next.js, PostgreSQL",
      repository: "",
      demo: "",
      image: "",
      imageAlt: "",
      problem: "Test fixture.",
      contribution: "",
      implementation: "",
      decisions: "",
      lessons: "",
      intent: "draft",
      revision: "0",
    };
    function form(values: Record<string, string>) {
      const f = new FormData();
      for (const [k, v] of Object.entries(values)) f.set(k, v);
      return f;
    }
    async function action(
      name: string,
      args: unknown[],
      signed = true,
      origin = base,
    ) {
      const response = await fetch(`${base}/admin/projects/new`, {
        method: "POST",
        redirect: "manual",
        headers: {
          "Next-Action": actions.get(name)!,
          Origin: origin,
          ...(signed ? { Cookie: cookie } : {}),
        },
        body: await encodeReply(args),
      });
      const body = await response.text();
      return { response, body };
    }
    async function row(id: string) {
      return (await pool.query("SELECT * FROM projects WHERE id=$1", [id]))
        .rows[0];
    }
    try {
      const protectedPage = await fetch(`${base}/admin/projects/new`, {
        redirect: "manual",
      });
      assert.match(
        protectedPage.headers.get("location") || "",
        /\/admin\/login/,
      );
      const badSession = await fetch(`${base}/admin/projects/new`, {
        redirect: "manual",
        headers: { Cookie: `${sessionCookie}=tampered` },
      });
      assert.match(badSession.headers.get("location") || "", /admin\/login/);
      const denied = await action(
        "saveProject",
        [null, {}, form(input)],
        false,
      );
      assert.match(
        denied.response.headers.get("x-action-redirect") || denied.body,
        /admin\/login/,
      );
      assert.equal(
        (
          await pool.query(
            "SELECT id FROM projects WHERE content->>'name'=$1",
            [input.name],
          )
        ).rowCount,
        0,
      );
      const invalid = await action("saveProject", [
        null,
        {},
        form({ ...input, name: "" }),
      ]);
      assert.match(invalid.body, /Check the highlighted fields/);
      for (const name of [input.name, prefix + "second"]) {
        const created = await action("saveProject", [
          null,
          {},
          form({ ...input, name }),
        ]);
        assert.match(
          created.response.headers.get("x-action-redirect") || created.body,
          /notice=saved/,
        );
        const result = await pool.query(
          "SELECT id FROM projects WHERE content->>'name'=$1",
          [name],
        );
        assert.equal(result.rowCount, 1);
        ids.push(result.rows[0].id);
      }
      assert.equal(
        (await fetch(`${base}/work/${ids[0]}`)).status,
        404,
        "draft must return 404",
      );
      assert.ok(
        !(await (await fetch(`${base}/sitemap.xml`)).text()).includes(ids[0]),
      );
      await action("publishProject", [ids[0], (await row(ids[0])).revision]);
      assert.equal((await fetch(`${base}/work/${ids[0]}`)).status, 200);
      assert.ok(
        (await (await fetch(`${base}/sitemap.xml`)).text()).includes(ids[0]),
      );
      const revision = (await row(ids[0])).revision;
      await action("saveProject", [
        ids[0],
        {},
        form({
          ...input,
          name: prefix + "renamed",
          revision: String(revision),
          intent: "publish",
        }),
      ]);
      assert.equal((await row(ids[0])).content.name, prefix + "renamed");
      assert.match(
        await (await fetch(`${base}/work/${ids[0]}`)).text(),
        new RegExp(prefix + "renamed"),
      );
      const stale = await action("saveProject", [
        ids[0],
        {},
        form({ ...input, name: prefix + "stale", revision: String(revision) }),
      ]);
      assert.match(stale.body, /changed in another tab/);
      assert.equal((await row(ids[0])).content.name, prefix + "renamed");
      const orderBeforeInvalid = (await row(ids[0])).sort_order;
    const invalidDirection = await action("moveProject", [ids[0], (await row(ids[0])).revision, "sideways"]);
    assert.match(invalidDirection.response.headers.get("x-action-redirect") || invalidDirection.body, /notice=invalid/);
    assert.equal((await row(ids[0])).sort_order, orderBeforeInvalid);
    await action("moveProject", [ids[1], (await row(ids[1])).revision, "up"]);
      assert.ok(
        (await row(ids[1])).sort_order < (await row(ids[0])).sort_order,
      );
      const csrf = await action(
        "unpublishProject",
        [ids[0], (await row(ids[0])).revision],
        true,
        "https://untrusted.example",
      );
      assert.ok(csrf.response.status >= 400);
      assert.equal((await row(ids[0])).published, true);
      await action("unpublishProject", [ids[0], (await row(ids[0])).revision]);
      assert.equal((await fetch(`${base}/work/${ids[0]}`)).status, 404);
      const client = await pool.connect();
      try {
        assert.equal(
          (
            await client.query("SELECT content FROM projects WHERE id=$1", [
              ids[0],
            ])
          ).rows[0].content.name,
          prefix + "renamed",
        );
      } finally {
        client.release();
      }
      await action("deleteProject", [ids[1], (await row(ids[1])).revision]);
      assert.equal(await row(ids[1]), undefined);
      const loggedOut = await action("logout", []);
      assert.match(
        loggedOut.response.headers.get("set-cookie") || "",
        /signal-bench-session=;.*(?:Max-Age=0|Expires=Thu, 01 Jan 1970)/i,
      );
      const limiterBefore = await pool.query(
        "SELECT * FROM admin_login_limit WHERE id=1",
      );
      if (!limiterBefore.rowCount) {
        try {
          for (let attempt = 1; attempt <= 11; attempt++) {
            const result = await action(
              "login",
              [{}, form({ password: "incorrect-integration-test-password" })],
              false,
            );
            assert.match(
              result.body,
              attempt <= 10
                ? /password was not accepted/
                : /Too many sign-in attempts/,
            );
          }
        } finally {
          await pool.query("DELETE FROM admin_login_limit WHERE id=1");
        }
      }
    } finally {
      // Only remove the test's own records, including partial creations after a failed assertion.
      await pool.query(
        "DELETE FROM projects WHERE id=ANY($1::text[]) OR starts_with(content->>'name',$2)",
        [ids, prefix],
      );
      await pool.end();
    }
  },
);
