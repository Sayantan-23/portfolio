import test from "node:test";
import assert from "node:assert/strict";
import { SignJWT } from "jose";
import { createHmac } from "node:crypto";
import {
  createSession,
  verifySession,
  passwordMatches,
  authConfigured,
} from "../lib/session";
test("sessions require configuration and reject changed passwords, signatures, and expiry", async () => {
  const oldPassword = process.env.ADMIN_PASSWORD,
    oldSecret = process.env.ADMIN_SESSION_SECRET;
  try {
    delete process.env.ADMIN_PASSWORD;
    delete process.env.ADMIN_SESSION_SECRET;
    assert.equal(authConfigured(), false);
    assert.equal(await verifySession("anything"), false);
    process.env.ADMIN_PASSWORD = "test-password-only";
    process.env.ADMIN_SESSION_SECRET =
      "test-session-secret-for-unit-checks-only-32chars";
    assert.equal(passwordMatches("wrong"), false);
    assert.equal(passwordMatches("test-password-only"), true);
    const token = await createSession();
    assert.equal(await verifySession(token), true);
    assert.equal(await verifySession(token.slice(0, -8) + "tampered"), false);
    process.env.ADMIN_PASSWORD = "rotated-password";
    assert.equal(await verifySession(token), false);
    process.env.ADMIN_PASSWORD = "test-password-only";
    const key = createHmac("sha256", process.env.ADMIN_SESSION_SECRET)
      .update(process.env.ADMIN_PASSWORD)
      .digest();
    const expired = await new SignJWT({ scope: "project-admin" })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuer("signal-bench")
      .setAudience("project-admin")
      .setExpirationTime("1 second ago")
      .sign(key);
    assert.equal(await verifySession(expired), false);
    const wrongScope = await new SignJWT({ scope: "visitor" })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuer("signal-bench")
      .setAudience("project-admin")
      .setExpirationTime("1h")
      .sign(key);
    assert.equal(await verifySession(wrongScope), false);
  } finally {
    if (oldPassword === undefined) delete process.env.ADMIN_PASSWORD;
    else process.env.ADMIN_PASSWORD = oldPassword;
    if (oldSecret === undefined) delete process.env.ADMIN_SESSION_SECRET;
    else process.env.ADMIN_SESSION_SECRET = oldSecret;
  }
});
