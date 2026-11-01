import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { authConfigured } from "@/lib/session";
import { LoginForm } from "@/components/login-form";
export const dynamic = "force-dynamic";
export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");
  return (
    <div className="admin-wrap">
      <header className="admin-header">
        <Link href="/" className="brand">
          <span className="brand-symbol" aria-hidden="true">
            ↳_
          </span>
          <span>
            <strong>Sayantan Ghosh</strong>
            <small>PROJECT ADMIN</small>
          </span>
        </Link>
        <Link className="text-link" href="/">
          Back to portfolio ↗
        </Link>
      </header>
      <main id="main" className="admin-login">
        <span className="eyebrow">PRIVATE WORKSPACE</span>
        <h1>A place for the work.</h1>
        <p>Sign in to add and manage your portfolio projects.</p>
        {authConfigured() ? (
          <LoginForm />
        ) : (
          <div className="notice">
            Admin access is disabled until the server password and session
            secret are configured.
          </div>
        )}
      </main>
    </div>
  );
}
