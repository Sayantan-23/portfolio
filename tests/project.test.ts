import test from "node:test";
import assert from "node:assert/strict";
import { projectSchema, validId } from "../lib/project";
const input = {
  name: "A project",
  summary: "A useful description.",
  category: "selected",
  state: "In development",
  technologies: "React, PostgreSQL, React",
  repository: "https://github.com/example/project",
  demo: "",
  image: "",
  imageAlt: "",
  problem: "",
  contribution: "",
  implementation: "",
  decisions: "",
  lessons: "",
};
test("project validation normalises technologies and leaves optional stories empty", () => {
  const result = projectSchema.parse(input);
  assert.deepEqual(result.technologies, ["React", "PostgreSQL"]);
  assert.equal(result.lessons, "");
});
test("invalid content cannot become a published project", () => {
  for (const change of [
    { name: "" },
    { summary: "a".repeat(401) },
    { category: "professional" },
    { repository: "javascript:alert(1)" },
    { demo: "https://user:secret@example.com" },
    { image: "http://example.com/image.png" },
    { image: "https://example.com/image.png", imageAlt: "" },
  ]) {
    assert.equal(
      projectSchema.safeParse({ ...input, ...change }).success,
      false,
      JSON.stringify(change),
    );
  }
});
test("a display name is independent of a stable route ID", () => {
  const id = "a8096a46-d065-49a0-a9cb-20e92a4845a0";
  assert.ok(validId(id));
  assert.ok(projectSchema.parse({ ...input, name: "A renamed project" }));
  for (const bad of [
    null, 17,"../admin", "a' OR 1=1", "", "a".repeat(81)])
    assert.equal(validId(bad), false);
});
