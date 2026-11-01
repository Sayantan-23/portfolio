import { z } from "zod";
const link = z
  .string()
  .trim()
  .max(2048)
  .refine((value) => {
    if (!value) return true;
    try {
      const url = new URL(value);
      return (
        ["https:", "http:"].includes(url.protocol) &&
        !url.username &&
        !url.password
      );
    } catch {
      return false;
    }
  }, "Enter a complete http or https URL.");
const imageLink = link.refine(
  (value) => !value || value.startsWith("https://"),
  "Images must use HTTPS.",
);
export const projectSchema = z
  .object({
    name: z.string().trim().min(1, "Give the project a name.").max(100),
    summary: z.string().trim().min(1, "Add a short summary.").max(400),
    category: z.enum(["selected", "learning"]),
    state: z.string().trim().min(1).max(60),
    technologies: z
      .string()
      .trim()
      .max(400)
      .transform((value) => [
        ...new Set(
          value
            .split(",")
            .map((x) => x.trim())
            .filter(Boolean),
        ),
      ])
      .refine((value) => value.length <= 20, "Use up to 20 technologies."),
    repository: link,
    demo: link,
    image: imageLink,
    imageAlt: z.string().trim().max(250),
    problem: z.string().trim().max(10000),
    contribution: z.string().trim().max(10000),
    implementation: z.string().trim().max(10000),
    decisions: z.string().trim().max(10000),
    lessons: z.string().trim().max(10000),
  })
  .superRefine((data, context) => {
    if (data.image && !data.imageAlt)
      context.addIssue({
        code: "custom",
        path: ["imageAlt"],
        message: "Describe the image for screen readers.",
      });
  });
export type ProjectContent = z.output<typeof projectSchema>;
export type Project = ProjectContent & {
  id: string;
  published: boolean;
  sort_order: number;
  revision: number;
  updated_at: string;
};
export type FormState = {
  error?: string;
  fields?: Record<string, string>;
  values?: Record<string, string>;
  success?: string;
};
export const projectFields = [
  "name",
  "summary",
  "category",
  "state",
  "technologies",
  "repository",
  "demo",
  "image",
  "imageAlt",
  "problem",
  "contribution",
  "implementation",
  "decisions",
  "lessons",
] as const;
export const storyLabels = {
  problem: "The problem",
  contribution: "What I built",
  implementation: "Inside the build",
  decisions: "Decisions & tradeoffs",
  lessons: "What I learned",
} as const;
export function validId(id: unknown): id is string {
  return typeof id === "string" && /^[a-zA-Z0-9-]{1,80}$/.test(id);
}
