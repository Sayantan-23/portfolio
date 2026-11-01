import test from "node:test";
import assert from "node:assert/strict";
import { resolveMotionMode } from "../lib/motion-preference";
test("system reduced motion takes precedence over a saved full-motion choice", () => {
  assert.equal(resolveMotionMode(true, "full"), "system");
  assert.equal(resolveMotionMode(true, null), "system");
});
test("visitors can persist reduced motion and invalid saved values fall back safely", () => {
  assert.equal(resolveMotionMode(false, "reduced"), "reduced");
  assert.equal(resolveMotionMode(false, "full"), "full");
  assert.equal(resolveMotionMode(false, null), "full");
  assert.equal(resolveMotionMode(false, "unexpected"), "full");
});
