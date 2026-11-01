import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sessionCookie, verifySession } from "./session";
export async function isAdmin() {
  return verifySession((await cookies()).get(sessionCookie)?.value);
}
export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}
