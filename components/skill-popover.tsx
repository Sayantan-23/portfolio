"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { skillDetails } from "@/lib/skill-details";
import { positionSkillPopover } from "@/lib/interaction-geometry";

export function SkillPopover({
  name,
  area,
  anchor,
  onClose,
  onEnter,
  onLeave,
}: {
  name: string;
  area: string;
  anchor: HTMLButtonElement;
  onClose: () => void;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{
    left: number;
    top: number;
  } | null>(null);
  const detail = skillDetails[name];
  useLayoutEffect(() => {
    let frame = 0;
    function positionPanel() {
      frame = 0;
      if (!panel.current || !anchor.isConnected) return onClose();
      const bounds = anchor.getBoundingClientRect();
      if (bounds.bottom < 0 || bounds.top > window.innerHeight)
        return onClose();
      panel.current.style.maxWidth = `${document.documentElement.clientWidth - 32}px`;
      setPosition(
        positionSkillPopover(bounds, panel.current.getBoundingClientRect(), {
          width: document.documentElement.clientWidth,
          height: window.innerHeight,
        }),
      );
    }
    function onScroll() {
      if (!frame) frame = requestAnimationFrame(positionPanel);
    }
    function onPointerDown(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !anchor.contains(event.target) &&
        !panel.current?.contains(event.target)
      )
        onClose();
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    positionPanel();
    window.addEventListener("scroll", onScroll, {
      capture: true,
      passive: true,
    });
    window.addEventListener("resize", onScroll);
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [anchor, name, onClose]);

  return createPortal(
    <div
      ref={panel}
      id="skill-popover"
      className="skill-popover"
      role="tooltip"
      style={position ?? { visibility: "hidden" }}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
    >
      <div className="skill-popover-heading">
        <span
          className="skill-icon"
          style={{ maskImage: `url(/icons/${detail.icon}.svg)` }}
          aria-hidden="true"
        />
        <strong>{name}</strong>
        <span className="mono micro">IN PRACTICE</span>
      </div>
      <span className="skill-context mono">{detail.context}</span>
      <p>{detail.detail}</p>
      <div className="skill-popover-footer mono micro">
        <span>{area}</span>
        <span aria-hidden="true">↳_</span>
      </div>
    </div>,
    document.body,
  );
}
