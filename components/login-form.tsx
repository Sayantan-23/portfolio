"use client";
import { useActionState } from "react";
import { login } from "@/app/admin/actions";
export function LoginForm() {
  const [state, action, pending] = useActionState(login, {});
  return (
    <form className="admin-panel form-password" action={action}>
      {state.error && (
        <p className="notice error" role="alert">
          {state.error}
        </p>
      )}
      <div className="field">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          maxLength={1024}
        />
      </div>
      <button className="button primary" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"} <span aria-hidden="true">↗</span>
      </button>
    </form>
  );
}
