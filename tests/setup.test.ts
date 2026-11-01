import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { execFileSync } from "node:child_process";
test("local setup generates matching private credentials and never overwrites them", async () => {
  const directory = await mkdtemp(join(tmpdir(), "signal-bench-setup-"));
  const script = resolve("scripts/setup-local.mjs");
  try {
    execFileSync(process.execPath, [script], { cwd: directory });
    const env = await readFile(join(directory, ".env.local"), "utf8");
    const db = await readFile(join(directory, ".env.database"), "utf8");
    const password = db
      .split("\n")
      .find((line) => line.startsWith("POSTGRES_PASSWORD="))!
      .slice("POSTGRES_PASSWORD=".length);
    assert.ok(password.length >= 32);
    assert.ok(env.includes(`:${password}@127.0.0.1:5434/portfolio`));
    assert.equal(
      (await stat(join(directory, ".env.local"))).mode & 0o777,
      0o600,
    );
    assert.equal(
      (await stat(join(directory, ".env.database"))).mode & 0o777,
      0o600,
    );
    execFileSync(process.execPath, [script], { cwd: directory });
    assert.equal(await readFile(join(directory, ".env.local"), "utf8"), env);
    assert.equal(await readFile(join(directory, ".env.database"), "utf8"), db);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
