export type MotionMode = "full" | "reduced" | "system";
export function resolveMotionMode(
  systemReduced: boolean,
  preference: string | null,
): MotionMode {
  if (systemReduced) return "system";
  return preference === "reduced" ? "reduced" : "full";
}
