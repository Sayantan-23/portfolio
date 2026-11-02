import type { ProjectContent } from "../lib/project";
export const seedProject: ProjectContent = {
  name: "JobVault",
  summary:
    "Keeping the context of a job search together, even after the original posting disappears.",
  category: "selected",
  state: "In development",
  technologies: ["Next.js", "Express", "PostgreSQL", "Expo"],
  repository: "https://github.com/Sayantan-23/job-vault",
  demo: "",
  image: "",
  imageAlt: "",
  problem:
    "Job postings expire, application notes become scattered, and the original context can be difficult to find when it is needed again.",
  contribution:
    "A self-hosted workspace for an individual job search: save a posting snapshot, track application stages, and keep notes, contacts, and reminders with the job. Reusable profiles and personas provide context for assisted resume and cover-letter generation.",
  implementation:
    "A Next.js web client connects to an Express API and PostgreSQL through Drizzle. The API handles saved posting snapshots, application workflows, reminders, and structured document generation. A Chrome extension and an Expo mobile client connect to the same application.",
  decisions:
    "Keep resume content as structured data and derive previews, exports, and client-side PDFs in code. This avoids a backend rendering toolchain and a separate generated-file lifecycle. The tradeoff is that browser PDF rendering needs its own verification, and generated files are not retained as a source-file audit trail.",
  lessons: "",
};
