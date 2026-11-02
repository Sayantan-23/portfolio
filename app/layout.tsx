import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "lenis/dist/lenis.css";
import "./globals.css";
import "./skills.css";
import "./motion.css";
import { PublicEffects } from "@/components/public-effects";
export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || "http://localhost:3000"),
  title: {
    default: "Sayantan Ghosh — Software Engineer",
    template: "%s — Sayantan Ghosh",
  },
  description:
    "Interfaces, systems, and the connections between them. The personal portfolio of software engineer Sayantan Ghosh.",
  openGraph: {
    type: "website",
    title: "Sayantan Ghosh — Software Engineer",
    description: "Thoughtful interfaces. Considered foundations.",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
        <PublicEffects />
      </body>
    </html>
  );
}
