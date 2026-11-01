import { createHmac, createHash, timingSafeEqual } from "node:crypto";
import { SignJWT, jwtVerify } from "jose";
export const sessionCookie = "signal-bench-session";
export function authConfigured() {
  return (
    !!process.env.ADMIN_PASSWORD &&
    (process.env.ADMIN_SESSION_SECRET?.length ?? 0) >= 32
  );
}
function sessionKey() {
  if (!authConfigured()) throw new Error("Admin access is not configured.");
  // Password rotation invalidates all previously signed sessions.
  return createHmac("sha256", process.env.ADMIN_SESSION_SECRET!)
    .update(process.env.ADMIN_PASSWORD!)
    .digest();
}
export function passwordMatches(value: string) {
  if (!authConfigured()) return false;
  const digest = (text: string) => createHash("sha256").update(text).digest();
  return timingSafeEqual(digest(value), digest(process.env.ADMIN_PASSWORD!));
}
export async function createSession() {
  return new SignJWT({ scope: "project-admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuer("signal-bench")
    .setAudience("project-admin")
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(sessionKey());
}
export async function verifySession(token?: string) {
  if (!token || !authConfigured()) return false;
  try {
    const { payload } = await jwtVerify(token, sessionKey(), {
      algorithms: ["HS256"],
      issuer: "signal-bench",
      audience: "project-admin",
    });
    return payload.scope === "project-admin";
  } catch {
    return false;
  }
}
