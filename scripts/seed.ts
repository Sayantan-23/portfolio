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
    "A personal project exploring a connected workspace for saving job descriptions and organising applications, notes, and follow-ups.",
  implementation:
    "The repository documents a web interface, an API, PostgreSQL persistence, and extension and mobile clients. These are connected surfaces of one project.",
  decisions:
    "One documented decision is to keep structured content as data and generate previews and documents in code, rather than storing generated files.",
  lessons: "",
};
