"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { useMotionMode } from "./motion-preference";
import {
  cursorClipRect,
  easeDot,
  type Point,
} from "@/lib/interaction-geometry";

export function PublicEffects() {
  const pathname = usePathname();
  const mode = useMotionMode();
  const cursor = useRef<HTMLDivElement>(null);
  const caption = useRef<HTMLSpanElement>(null);
  const contrastClip = useRef<SVGClipPathElement>(null);
  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    const root = document.documentElement;
    const scope = document.querySelector<HTMLElement>(".site-wrap");
    root.dataset.motion = mode === "full" ? "full" : "reduced";
    if (!scope || mode !== "full")
      return () => {
        delete root.dataset.motion;
      };
    const controller = new AbortController();
    const animations: Animation[] = [];
    const revealNodes: HTMLElement[] = [];
    let scrollFrame = 0;
    let dotFrame = 0;
    let dotTime = 0;
    let dotPosition: Point | null = null;
    let lenis: Lenis | undefined;
    let pointerPosition: { x: number; y: number } | null = null;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const filledButtons = [
      ...scope.querySelectorAll<HTMLElement>(".button.primary"),
    ];
    const clipRects = filledButtons.map(() =>
      document.createElementNS("http://www.w3.org/2000/svg", "rect"),
    );
    const clipElement = contrastClip.current;
    clipElement?.replaceChildren(...clipRects);
    const ease = "cubic-bezier(.22,1,.36,1)";
    function enter(
      element: Element | null,
      delay = 0,
      distance = 24,
      duration = 850,
    ) {
      if (!element) return;
      animations.push(
        element.animate(
          [
            { opacity: 0, transform: `translateY(${distance}px)` },
            { opacity: 1, transform: "translateY(0)" },
          ],
          { duration, delay, easing: ease, fill: "backwards" },
        ),
      );
    }
    enter(scope.querySelector(".header-surface"), 0, -12, 650);
    enter(scope.querySelector(".bench-frame"), 50, 28, 1000);
    const introItems = [
      ".hero-person .eyebrow",
      ".name-line:first-child > span",
      ".name-line:last-child > span",
      ".hero-description",
      ".personal-signature",
      ".hero-actions",
    ];
    introItems.forEach((selector, index) =>
      enter(
        scope.querySelector(selector),
        100 + index * 85,
        selector.includes("name-line") ? 65 : 18,
      ),
    );
    enter(scope.querySelector(".display-label"), 220, 12);
    const display = scope.querySelector(".screen-bezel");
    if (display)
      animations.push(
        display.animate(
          [
            {
              opacity: 0,
              transform: "perspective(1200px) rotateX(5deg) translateY(35px)",
              clipPath: "inset(0 0 90% 0 round 10px)",
            },
            {
              opacity: 1,
              transform: "perspective(1200px) rotateX(0deg) translateY(0)",
              clipPath: "inset(0 0 0 0 round 10px)",
            },
          ],
          { duration: 1100, delay: 200, easing: ease, fill: "backwards" },
        ),
      );
    enter(scope.querySelector(".bench-lower"), 550, 16);
    enter(scope.querySelector(".work-heading, .case-heading"), 180, 25);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target as HTMLElement;
          element.dataset.reveal = "done";
          enter(element, 0, 32, 900);
          observer.unobserve(element);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -30px 0px" },
    );
    scope
      .querySelectorAll<HTMLElement>(
        ".about-section .section-label, .about-grid > *, .skills-section .section-label, .skills-heading, .skills-workbench, .experience-section .section-label, .experience-intro, .experience-record, .education-strip, .contact-section .section-label, .contact-section h2, .contact-link, .project-row, .story-sections > section, .project-image",
      )
      .forEach((element) => {
        revealNodes.push(element);
        if (element.getBoundingClientRect().top > window.innerHeight - 30)
          element.dataset.reveal = "pending";
        observer.observe(element);
      });
    root.classList.add("public-motion");
    function updateScroll() {
      scrollFrame = 0;
      const max = root.scrollHeight - window.innerHeight;
      root.style.setProperty(
        "--page-progress",
        String(max > 0 ? window.scrollY / max : 0),
      );
      root.style.setProperty(
        "--screen-shift",
        finePointer.matches
          ? `${-Math.min(window.scrollY * 0.035, 16)}px`
          : "0px",
      );
      if (pointerPosition)
        updateCursor(
          document.elementFromPoint(pointerPosition.x, pointerPosition.y),
          pointerPosition.x,
          pointerPosition.y,
        );
    }
    function scroll() {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll);
    }
    window.addEventListener("scroll", scroll, {
      passive: true,
      signal: controller.signal,
    });
    window.addEventListener("resize", scroll, {
      passive: true,
      signal: controller.signal,
    });
    updateScroll();
    function hideCursor() {
      pointerPosition = null;
      dotPosition = null;
      dotTime = 0;
      cancelAnimationFrame(dotFrame);
      dotFrame = 0;
      root.classList.remove("precision-cursor-active");
      cursor.current?.classList.remove(
        "is-visible",
        "is-interactive",
        "is-pressed",
      );
    }
    function configureDesktop() {
      lenis?.destroy();
      lenis = undefined;
      hideCursor();
      if (!finePointer.matches) return;
      lenis = new Lenis({
        autoRaf: true,
        lerp: 0.085,
        smoothWheel: true,
        syncTouch: false,
        anchors: true,
        stopInertiaOnNavigate: true,
      });
    }
    configureDesktop();
    finePointer.addEventListener("change", configureDesktop, {
      signal: controller.signal,
    });
    function drawDot() {
      if (!pointerPosition || !dotPosition) return;
      cursor.current?.style.setProperty(
        "--dot-x",
        `${dotPosition.x - pointerPosition.x}px`,
      );
      cursor.current?.style.setProperty(
        "--dot-y",
        `${dotPosition.y - pointerPosition.y}px`,
      );
    }
    function animateDot(time: number) {
      dotFrame = 0;
      if (!pointerPosition || !dotPosition) return;
      dotPosition = easeDot(
        dotPosition,
        pointerPosition,
        dotTime ? time - dotTime : 16.67,
      );
      dotTime = time;
      const remaining = Math.hypot(
        dotPosition.x - pointerPosition.x,
        dotPosition.y - pointerPosition.y,
      );
      if (remaining < 0.1) {
        dotPosition = { ...pointerPosition };
        dotTime = 0;
      } else dotFrame = requestAnimationFrame(animateDot);
      drawDot();
    }
    function updateCursor(target: Element | null, x: number, y: number) {
      const node = cursor.current;
      if (
        !node ||
        target?.closest('input, textarea, select, [contenteditable="true"]')
      ) {
        hideCursor();
        return;
      }
      const interactive = target?.closest<HTMLElement>("a, button");
      const label =
        interactive?.dataset.cursor ||
        (interactive?.matches(".layer")
          ? "INSPECT"
          : interactive?.matches(".project-row")
            ? "EXPLORE"
            : interactive?.matches('a[href^="mailto:"]')
              ? "SAY HELLO"
              : interactive?.matches('a[href="/work"]')
                ? "VIEW WORK"
                : interactive?.matches('a[href*="#"]')
                  ? "SCROLL"
                  : interactive?.matches('a[target="_blank"]')
                    ? "OPEN LINK"
                    : interactive
                      ? "OPEN"
                      : "");
      node.style.transform = `translate3d(${x}px,${y}px,0)`;
      if (!dotPosition) dotPosition = { x, y };
      drawDot();
      if (!dotFrame) dotFrame = requestAnimationFrame(animateDot);
      filledButtons.forEach((button, index) => {
        const rect = cursorClipRect(button.getBoundingClientRect(), { x, y });
        for (const [key, value] of Object.entries(rect))
          clipRects[index].setAttribute(key, String(value));
        clipRects[index].setAttribute(
          "rx",
          getComputedStyle(button).borderTopLeftRadius,
        );
      });
      node.classList.add("is-visible");
      node.classList.toggle("is-interactive", !!interactive);
      node.classList.toggle(
        "is-over-display",
        !!target?.closest(".bench-screen, .skills-instrument, .skill-popover"),
      );
      node.classList.toggle("on-right", x > window.innerWidth - 160);
      if (caption.current) caption.current.textContent = label;
      root.classList.add("precision-cursor-active");
    }
    window.addEventListener(
      "pointermove",
      (event) => {
        if (!finePointer.matches || event.pointerType !== "mouse") {
          hideCursor();
          return;
        }
        pointerPosition = { x: event.clientX, y: event.clientY };
        updateCursor(
          event.target instanceof Element ? event.target : null,
          event.clientX,
          event.clientY,
        );
      },
      { passive: true, signal: controller.signal },
    );
    document.documentElement.addEventListener("pointerleave", hideCursor, {
      signal: controller.signal,
    });
    window.addEventListener("blur", hideCursor, { signal: controller.signal });
    window.addEventListener(
      "keydown",
      (event) => {
        if (event.key === "Tab") hideCursor();
      },
      { signal: controller.signal },
    );
    window.addEventListener(
      "pointerdown",
      () => cursor.current?.classList.add("is-pressed"),
      { signal: controller.signal },
    );
    window.addEventListener(
      "pointerup",
      () => cursor.current?.classList.remove("is-pressed"),
      { signal: controller.signal },
    );
    return () => {
      controller.abort();
      observer.disconnect();
      lenis?.destroy();
      cancelAnimationFrame(scrollFrame);
      animations.forEach((animation) => animation.cancel());
      revealNodes.forEach((element) => {
        delete element.dataset.reveal;
      });
      root.classList.remove("public-motion", "precision-cursor-active");
      root.style.removeProperty("--page-progress");
      root.style.removeProperty("--screen-shift");
      clipElement?.replaceChildren();
      delete root.dataset.motion;
      hideCursor();
    };
  }, [pathname, mode]);
  if (pathname.startsWith("/admin")) return null;
  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <div ref={cursor} className="precision-cursor" aria-hidden="true">
        <svg className="cursor-clip-definitions" width="0" height="0">
          <defs>
            <clipPath
              id="cursor-button-clip"
              clipPathUnits="userSpaceOnUse"
              ref={contrastClip}
            />
          </defs>
        </svg>
        {["cursor-mark", "cursor-mark cursor-contrast"].map((className) => (
          <div className={className} key={className}>
            <span className="cursor-center" />
            <svg viewBox="0 0 40 40">
              <path d="M4 14V4H14M26 4H36V14M36 26V36H26M14 36H4V26" />
            </svg>
          </div>
        ))}
        <span className="cursor-caption" ref={caption} />
      </div>
    </>
  );
}
