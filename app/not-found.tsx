import Link from "next/link";
import { Header, Footer } from "@/components/shell";
export default function NotFound() {
  return (
    <div className="site-wrap">
      <Header />
      <main id="main" className="message-page">
        <span className="eyebrow">404 / A MISSING CONNECTION</span>
        <h1>This path ends here.</h1>
        <p>The page may have moved, or the project isn’t available to view.</p>
        <Link className="button primary" href="/work">
          Back to work ↗
        </Link>
      </main>
      <Footer />
    </div>
  );
}
