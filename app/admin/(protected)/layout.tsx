import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { logout } from "../actions";
export const dynamic = "force-dynamic";
export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();
  return (
    <div className="admin-wrap">
      <header className="admin-header">
        <Link className="brand" href="/admin">
          <span className="brand-symbol" aria-hidden="true">
            ↳_
          </span>
          <span>
            <strong>Sayantan Ghosh</strong>
            <small>PROJECT ADMIN</small>
          </span>
        </Link>
        <div className="admin-header-actions">
          <Link href="/work">View portfolio ↗</Link>
          <form action={logout}>
            <button>Log out</button>
          </form>
        </div>
      </header>
      <main id="main">{children}</main>
    </div>
  );
}
