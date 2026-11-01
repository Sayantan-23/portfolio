"use client";
import Link from "next/link";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main id="main" className="message-page">
      <span className="eyebrow">A CONNECTION NEEDS ATTENTION</span>
      <h1>Something didn’t come through.</h1>
      <p>Please try again in a moment.</p>
      <button className="button primary" onClick={reset}>
        Try again ↗
      </button>
      <Link className="text-link" href="/">
        Return home
      </Link>
    </main>
  );
}
