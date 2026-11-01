import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Header, Footer, Mounts, Arrow } from "@/components/shell";
import { getProject } from "@/lib/projects";
import { storyLabels } from "@/lib/project";
export const dynamic = "force-dynamic";
type Props = { params: Promise<{ projectId: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProject((await params).projectId);
  if (!project)
    return {
      title: "Project not found",
      robots: { index: false, follow: false },
    };
  return {
    title: project.name,
    description: project.summary,
    openGraph: { title: project.name, description: project.summary },
  };
}
export default async function ProjectPage({ params }: Props) {
  const project = await getProject((await params).projectId);
  if (!project) notFound();
  return (
    <div className="site-wrap">
      <Header active="work" />
      <main id="main">
        <section className="bench-frame case-frame">
          <Mounts />
          <div className="bench-topline">
            <Link href="/work">← BACK TO WORK</Link>
            <span>
              {project.category === "learning"
                ? "LEARNING PROJECT"
                : "PERSONAL PROJECT"}{" "}
              / {project.state.toUpperCase()}
            </span>
          </div>
          <header className="case-heading">
            <span className="eyebrow">INSIDE THE BUILD</span>
            <h1>{project.name}</h1>
            <p>{project.summary}</p>
            <div className="case-links">
              {project.repository && (
                <a
                  className="button primary"
                  href={project.repository}
                  target="_blank"
                  rel="noreferrer"
                >
                  View source <Arrow />
                </a>
              )}
              {project.demo && (
                <a
                  className="button secondary"
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open demo <Arrow />
                </a>
              )}
            </div>
            <div className="tag-list">
              {project.technologies.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </header>
          {project.image && (
            <figure className="project-image">
              {/* External images load directly; no server-side URL fetching. */}
              <Image
                unoptimized
                width={1600}
                height={900}
                src={project.image}
                alt={project.imageAlt}
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </figure>
          )}
          <div className="story-sections">
            {Object.entries(storyLabels)
              .filter(([key]) => project[key as keyof typeof storyLabels])
              .map(([key, label], index) => (
                <section key={key}>
                  <span className="mono micro">
                    {String(index + 1).padStart(2, "0")} / {label.toUpperCase()}
                  </span>
                  <div>
                    <h2>{label}</h2>
                    <p>{project[key as keyof typeof storyLabels]}</p>
                  </div>
                </section>
              ))}
          </div>
          <div className="bench-bottomline">
            <span>AN EXPLORATION, FROM THE INSIDE OUT.</span>
            <Link href="/work">ALL PROJECTS ↗</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
