import Link from "next/link";
import { profile } from "@/lib/profile";
import { MotionPreference } from "./motion-preference";
export function Arrow() {
  return (
    <span className="arrow" aria-hidden="true">
      ↗
    </span>
  );
}
export function Header({ active }: { active?: "work" }) {
  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="Sayantan Ghosh, home">
        <span className="brand-symbol" aria-hidden="true">
          ↳_
        </span>
        <span>
          <strong>{profile.name}</strong>
          <small>SOFTWARE ENGINEER</small>
        </span>
      </Link>
      <span className="header-note">IN PURSUIT OF THOUGHTFUL SOFTWARE</span>
      <nav aria-label="Main navigation">
        <Link
          href="/work"
          aria-current={active === "work" ? "page" : undefined}
        >
          Work
        </Link>
        <Link href="/#about">About</Link>
        <Link href="/#contact">
          Contact <Arrow />
        </Link>
      </nav>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <span>
        © {new Date().getFullYear()} {profile.name}
      </span>
      <span className="footer-signature">THOUGHTFULLY PUT TOGETHER.</span>
      <MotionPreference />
      <a href={profile.github} target="_blank" rel="noreferrer">
        GitHub <Arrow />
      </a>
    </footer>
  );
}
export function Mounts() {
  return (
    <div className="mounts" aria-hidden="true">
      {["tl", "tr", "bl", "br"].map((p) => (
        <i className={`mount ${p}`} key={p} />
      ))}
    </div>
  );
}
export function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <div className="section-label">
      <span>{number}</span>
      {children}
    </div>
  );
}
