// Resume-backed tools, grouped by the work they support rather than proficiency scores.
export const skillAreas = [
  {
    id: "interface",
    code: "UI",
    title: "Interfaces",
    description:
      "From a component to a complete application: building interfaces, managing state, and connecting the experience to the system behind it.",
    connection: "Interaction → components → application",
    tools: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Vue.js",
      "Nuxt",
      "HTML",
      "CSS",
      "Tailwind CSS",
    ],
  },
  {
    id: "services",
    code: "API",
    title: "Services & communication",
    description:
      "The behaviour behind the screen: API integrations, authentication, application workflows, and real-time updates.",
    connection: "Request → application logic → response",
    tools: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "WebSockets",
      "JWT authentication",
    ],
  },
  {
    id: "data",
    code: "DB",
    title: "Data & persistence",
    description:
      "Working with relational data, query performance, and caching so applications can keep their context and retrieve it efficiently.",
    connection: "Model → query → cache",
    tools: ["PostgreSQL", "Redis"],
  },
  {
    id: "delivery",
    code: "OPS",
    title: "Build & delivery",
    description:
      "Getting a change beyond a local branch: source control, containerised environments, automated builds, and deployment workflows.",
    connection: "Commit → build → release",
    tools: ["AWS", "Docker", "Kubernetes", "GitHub Actions", "CI/CD", "Git"],
  },
  {
    id: "quality",
    code: "QA",
    title: "Testing & feedback",
    description:
      "Checking application behaviour and interface interactions, and using that feedback while refining a change.",
    connection: "Arrange → interact → verify",
    tools: ["Vitest", "React Testing Library"],
  },
  {
    id: "tools",
    code: "DEV",
    title: "Mobile & developer tools",
    description:
      "Working with mobile applications and using agentic development tools to support implementation and debugging.",
    connection: "Explore → implement → iterate",
    tools: ["React Native", "Flutter", "Capacitor", "Claude Code", "Codex"],
  },
];
