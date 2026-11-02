import test from "node:test";
import assert from "node:assert/strict";
import {
  easeDot,
  cursorClipRect,
  positionSkillPopover,
} from "../lib/interaction-geometry";
import { skillAreas } from "../lib/skills";
import { skillDetails } from "../lib/skill-details";
import { existsSync } from "node:fs";

test("dot follows smoothly and independently of display refresh rate", () => {
  const target = { x: 100, y: 50 };
  const one = easeDot({ x: 0, y: 0 }, target, 32);
  const two = easeDot(easeDot({ x: 0, y: 0 }, target, 16), target, 16);
  assert.ok(one.x > 0 && one.x < target.x);
  assert.ok(Math.abs(one.x - two.x) < 1e-9);
  assert.ok(Math.abs(one.y - two.y) < 1e-9);
  assert.deepEqual(easeDot(target, target, 16), target);
});
test("white cursor clipping stays attached to the button as the pointer crosses its edge", () => {
  const button = { left: 100, top: 50, width: 200, height: 40 };
  assert.deepEqual(cursorClipRect(button, { x: 95, y: 60 }), {
    x: 45,
    y: 30,
    width: 200,
    height: 40,
  });
  assert.deepEqual(cursorClipRect(button, { x: 105, y: 60 }), {
    x: 35,
    y: 30,
    width: 200,
    height: 40,
  });
});
test("skill details fit narrow screens and flip above a low anchor", () => {
  assert.deepEqual(
    positionSkillPopover(
      { left: 350, top: 700, bottom: 740 },
      { width: 304, height: 200 },
      { width: 390, height: 844 },
    ),
    { left: 70, top: 490 },
  );
  assert.deepEqual(
    positionSkillPopover(
      { left: 2, top: 100, bottom: 140 },
      { width: 288, height: 200 },
      { width: 320, height: 844 },
    ),
    { left: 16, top: 150 },
  );
});
test("every listed tool has practical context and an existing local icon, including React Native", () => {
  const tools = skillAreas.flatMap((area) => area.tools);
  assert.ok(tools.includes("React Native"));
  for (const name of tools) {
    const detail = skillDetails[name];
    assert.ok(detail?.context && detail.detail, name);
    assert.ok(existsSync(`public/icons/${detail.icon}.svg`), name);
  }
});
