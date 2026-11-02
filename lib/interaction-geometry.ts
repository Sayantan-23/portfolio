export type Point = { x: number; y: number };

export function easeDot(
  current: Point,
  target: Point,
  elapsedMs: number,
): Point {
  const blend = 1 - Math.exp(-Math.max(0, elapsedMs) / 55);
  return {
    x: current.x + (target.x - current.x) * blend,
    y: current.y + (target.y - current.y) * blend,
  };
}

export function cursorClipRect(
  rect: { left: number; top: number; width: number; height: number },
  pointer: Point,
) {
  return {
    x: rect.left - pointer.x + 40,
    y: rect.top - pointer.y + 40,
    width: rect.width,
    height: rect.height,
  };
}

export function positionSkillPopover(
  anchor: { left: number; top: number; bottom: number },
  panel: { width: number; height: number },
  viewport: { width: number; height: number },
) {
  const left = Math.max(
    16,
    Math.min(anchor.left, viewport.width - panel.width - 16),
  );
  const below = anchor.bottom + 10;
  const top =
    below + panel.height <= viewport.height - 16
      ? below
      : Math.max(16, anchor.top - panel.height - 10);
  return { left, top };
}
