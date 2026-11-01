"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { randomUUID } from "node:crypto";
import { database } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import {
  authConfigured,
  passwordMatches,
  createSession,
  sessionCookie,
} from "@/lib/session";
import {
  projectFields,
  projectSchema,
  validId,
  type FormState,
} from "@/lib/project";

export async function login(
  _previous: FormState,
  form: FormData,
): Promise<FormState> {
  if (!authConfigured())
    return {
      error:
        "Admin access is not configured. Set ADMIN_PASSWORD and a session secret on the server.",
    };
  const password = form.get("password");
  if (typeof password !== "string" || password.length > 1024)
    return { error: "The password was not accepted." };
  try {
    // One owner: a shared, database-backed attempt window works across app instances.
    const result = await database().query<{
      attempts: number;
    }>(`INSERT INTO admin_login_limit(id,attempts) VALUES(1,1)
      ON CONFLICT(id) DO UPDATE SET
      attempts=CASE WHEN admin_login_limit.window_start < now()-interval '15 minutes' THEN 1 ELSE LEAST(admin_login_limit.attempts+1,11) END,
      window_start=CASE WHEN admin_login_limit.window_start < now()-interval '15 minutes' THEN now() ELSE admin_login_limit.window_start END
      RETURNING attempts`);
    if (result.rows[0].attempts > 10)
      return {
        error: "Too many sign-in attempts. Please try again in 15 minutes.",
      };
    if (!passwordMatches(password))
      return { error: "The password was not accepted." };
    await database().query("DELETE FROM admin_login_limit WHERE id=1");
  } catch {
    return {
      error:
        "Sign-in is temporarily unavailable. Check the database connection and try again.",
    };
  }
  (await cookies()).set(sessionCookie, await createSession(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 8 * 60 * 60,
  });
  redirect("/admin");
}
export async function logout() {
  await requireAdmin();
  (await cookies()).delete(sessionCookie);
  redirect("/admin/login");
}

export async function saveProject(
  id: string | null,
  _previous: FormState,
  form: FormData,
): Promise<FormState> {
  await requireAdmin();
  const values = Object.fromEntries(
    projectFields.map((key) => [
      key,
      typeof form.get(key) === "string" ? (form.get(key) as string) : "",
    ]),
  );
  const parsed = projectSchema.safeParse(values);
  if (!parsed.success)
    return {
      error: "Check the highlighted fields.",
      values,
      fields: Object.fromEntries(
        parsed.error.issues.map((issue) => [
          String(issue.path[0]),
          issue.message,
        ]),
      ),
    };
  const intent = form.get("intent");
  if (!["draft", "publish"].includes(String(intent)))
    return { error: "Choose Save draft or Publish.", values };
  const revision = Number(form.get("revision"));
  if (id && (!validId(id) || !Number.isInteger(revision) || revision < 1))
    return {
      error: "This project could not be identified. Reload the page.",
      values,
    };
  const projectId = id || randomUUID();
  try {
    if (id) {
      const result = await database().query(
        "UPDATE projects SET content=$1,published=$2,revision=revision+1,updated_at=now() WHERE id=$3 AND revision=$4",
        [JSON.stringify(parsed.data), intent === "publish", id, revision],
      );
      if (!result.rowCount)
        return {
          error:
            "This project changed in another tab or was removed. Copy your edits before reloading.",
          values,
        };
    } else {
      const client = await database().connect();
      try {
        await client.query("BEGIN");
        await client.query("SELECT pg_advisory_xact_lock(726410)");
        await client.query(
          "INSERT INTO projects(id,content,published,sort_order) VALUES($1,$2,$3,(SELECT COALESCE(MAX(sort_order),-1)+1 FROM projects))",
          [projectId, JSON.stringify(parsed.data), intent === "publish"],
        );
        await client.query("COMMIT");
      } catch (error) {
        await client.query("ROLLBACK");
        throw error;
      } finally {
        client.release();
      }
    }
  } catch {
    return {
      error:
        "The project could not be saved. Your changes are still here; please try again.",
      values,
    };
  }
  revalidatePath("/work");
  revalidatePath(`/work/${projectId}`);
  revalidatePath("/admin");
  redirect("/admin?notice=saved");
}

async function changeProject(
  id: string,
  revision: number,
  operation: "publish" | "unpublish" | "delete" | "up" | "down",
) {
  await requireAdmin();
  if (
    !validId(id) ||
    !Number.isInteger(revision) ||
    revision < 1 ||
    !["publish", "unpublish", "delete", "up", "down"].includes(operation)
  )
    redirect("/admin?notice=invalid");
  let outcome = "updated";
  try {
    const client = await database().connect();
    try {
      await client.query("BEGIN");
      await client.query("SELECT pg_advisory_xact_lock(726410)");
      const { rows } = await client.query<{
        id: string;
        revision: number;
        sort_order: number;
      }>(
        "SELECT id,revision,sort_order FROM projects ORDER BY sort_order,id FOR UPDATE",
      );
      const index = rows.findIndex((row) => row.id === id);
      if (index < 0 || rows[index].revision !== revision) outcome = "conflict";
      else if (operation === "up" || operation === "down") {
        const neighbor = rows[index + (operation === "up" ? -1 : 1)];
        if (neighbor) {
          await client.query(
            "UPDATE projects SET sort_order=$1,revision=revision+1,updated_at=now() WHERE id=$2",
            [neighbor.sort_order, id],
          );
          await client.query(
            "UPDATE projects SET sort_order=$1,revision=revision+1,updated_at=now() WHERE id=$2",
            [rows[index].sort_order, neighbor.id],
          );
        }
      } else if (operation === "delete")
        await client.query("DELETE FROM projects WHERE id=$1", [id]);
      else
        await client.query(
          "UPDATE projects SET published=$1,revision=revision+1,updated_at=now() WHERE id=$2",
          [operation === "publish", id],
        );
      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  } catch {
    outcome = "failed";
  }
  revalidatePath("/work");
  revalidatePath(`/work/${id}`);
  revalidatePath("/admin");
  redirect(`/admin?notice=${outcome}`);
}
export async function publishProject(id: string, revision: number) {
  return changeProject(id, revision, "publish");
}
export async function unpublishProject(id: string, revision: number) {
  return changeProject(id, revision, "unpublish");
}
export async function deleteProject(id: string, revision: number) {
  return changeProject(id, revision, "delete");
}
export async function moveProject(
  id: string,
  revision: number,
  direction: "up" | "down",
) {
  return changeProject(id, revision, direction);
}
