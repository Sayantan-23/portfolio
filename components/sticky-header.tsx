"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function StickyHeader({ children }: { children: React.ReactNode }) {
  const header = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const element = header.current;
    function update() {
      if (element) element.dataset.compact = String(window.scrollY > 64);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [pathname]);

  return (
    <header className="site-header" ref={header}>
      <div className="header-surface">{children}</div>
    </header>
  );
}
