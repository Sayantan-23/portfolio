"use client";
import { useSyncExternalStore } from "react";
import { resolveMotionMode } from "@/lib/motion-preference";
const key = "signal-bench-motion";
const eventName = "signal-bench-motion-change";
let memoryPreference: string | null = null;
function snapshot() {
  let preference = memoryPreference;
  try {
    preference ??= localStorage.getItem(key);
  } catch {
    /* Storage is optional. */
  }
  return resolveMotionMode(
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    preference,
  );
}
function subscribe(update: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", update);
  window.addEventListener(eventName, update);
  const storage = (event: StorageEvent) => {
    if (event.key === key || event.key === null) {
      memoryPreference = event.newValue;
      update();
    }
  };
  window.addEventListener("storage", storage);
  return () => {
    media.removeEventListener("change", update);
    window.removeEventListener(eventName, update);
    window.removeEventListener("storage", storage);
  };
}
export function useMotionMode() {
  return useSyncExternalStore(subscribe, snapshot, () => "reduced" as const);
}
export function MotionPreference() {
  const mode = useMotionMode();
  function toggle() {
    memoryPreference = mode === "full" ? "reduced" : "full";
    try {
      localStorage.setItem(key, memoryPreference);
    } catch {
      /* Keep the in-memory choice. */
    }
    window.dispatchEvent(new Event(eventName));
  }
  return (
    <button
      className="motion-preference"
      data-cursor={mode === "full" ? "PAUSE MOTION" : "ENABLE MOTION"}
      type="button"
      onClick={toggle}
      disabled={mode === "system"}
      aria-pressed={mode !== "full"}
      title={
        mode === "system"
          ? "Reduced motion follows your system preference."
          : "Switch the portfolio motion on or off."
      }
    >
      <span aria-hidden="true">{mode === "full" ? "⌁" : "—"}</span> Motion:{" "}
      {mode === "full" ? "on" : mode === "system" ? "off (system)" : "off"}
    </button>
  );
}
