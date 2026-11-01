import type { Metadata } from "next";
import Link from "next/link";
import { Header, Footer, Mounts, Arrow } from "@/components/shell";
import { listProjects } from "@/lib/projects";
import type { Project } from "@/lib/project";
export const metadata: Metadata = {
  title: "Selected work",
  description:
    "Personal software projects, the decisions behind them, and lessons from building.",
};
export const dynamic = "force-dynamic";
function ProjectRow({ project, index }: { project: Project; index: number }) {
  return (
    <Link href={`/work/${project.id}`} className="project-row">
      <span className="project-number">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div>
        <span className="eyebrow">{project.state}</span>
        <h2>{project.name}</h2>
        <p>{project.summary}</p>
        <div className="tag-list">
          {project.technologies.map((tool) => (
            <span key={tool}>{tool}</span>
          ))}
        </div>
      </div>
      <span className="project-open">
        <Arrow />
        <small>EXPLORE PROJECT</small>
      </span>
    </Link>
  );
}
export default async function Work() {
  const projects = await listProjects();
  const selected = projects.filter((p) => p.category === "selected");
  const learning = projects.filter((p) => p.category === "learning");
  return (
    <div className="site-wrap">
      <Header active="work" />
      <main id="main" className="work-page">
        <section className="bench-frame collection-frame">
          <Mounts />
          <div className="bench-topline">
            <span>SG / PERSONAL SOFTWARE COLLECTION</span>
            <span>INDEX — {String(projects.length).padStart(2, "0")}</span>
          </div>
          <div className="work-heading">
            <span className="eyebrow">SELECTED WORK</span>
            <h1>
              Built. Considered.
              <br />
              <em>Still learning.</em>
            </h1>
            <p>
              Personal projects, from the interface to the decisions underneath.
              A collection that grows with the work.
            </p>
          </div>
          <div className="collection-list">
            {selected.length ? (
              selected.map((project, index) => (
                <ProjectRow key={project.id} project={project} index={index} />
              ))
            ) : (
              <div className="empty-collection">
                <span className="mono micro">A COLLECTION IN THE MAKING</span>
                <h2>The next piece is taking shape.</h2>
                <p>
                  Selected projects will appear here as they’re ready to share.
                </p>
                <a
                  className="text-link"
                  href="https://github.com/Sayantan-23"
                  target="_blank"
                  rel="noreferrer"
                >
                  Explore my GitHub <Arrow />
                </a>
              </div>
            )}
          </div>
          {learning.length > 0 && (
            <section className="learning-collection" id="learning">
              <div className="section-label">
                <span>↳</span>THE LEARNING ARCHIVE
              </div>
              <p>Earlier experiments. Each one, a lesson worth keeping.</p>
              {learning.map((project, index) => (
                <ProjectRow key={project.id} project={project} index={index} />
              ))}
            </section>
          )}
          <div className="bench-bottomline">
            <span>PROBLEMS / CONSTRAINTS / DECISIONS</span>
            <Link href="/">BACK TO THE INTRODUCTION ↗</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
