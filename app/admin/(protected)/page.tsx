import Link from "next/link";
import { listProjects } from "@/lib/projects";
import { requireAdmin } from "@/lib/auth";
import { publishProject, unpublishProject, moveProject } from "../actions";
import { DeleteProject } from "@/components/delete-project";
const notices: Record<string, string> = {
  saved: "Project saved.",
  updated: "Project updated.",
  conflict:
    "The project changed in another tab. Review the latest version and try again.",
  failed: "The change could not be saved. Please try again.",
  invalid: "The project could not be identified.",
};
export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ notice?: string }>;
}) {
  await requireAdmin();
  const projects = await listProjects(true);
  const { notice } = await searchParams;
  return (
    <>
      <div className="admin-heading">
        <div>
          <h1>Projects</h1>
          <p>Your work, in the order you want to share it.</p>
        </div>
        <Link className="button primary" href="/admin/projects/new">
          Add project +
        </Link>
      </div>
      {notice && notices[notice] && (
        <p
          className={`notice ${["saved", "updated"].includes(notice) ? "success" : "error"}`}
          role="status"
        >
          {notices[notice]}
        </p>
      )}
      <div className="admin-panel">
        {!projects.length && (
          <p className="admin-empty">
            No projects yet. Add your first project to get started.
          </p>
        )}
        {projects.map((project, index) => (
          <article className="admin-project" key={project.id}>
            <div>
              <span
                className={`status-badge ${project.published ? "published" : ""}`}
              >
                {project.published ? "PUBLISHED" : "DRAFT"}
              </span>
              <h2>
                <Link href={`/admin/projects/${project.id}`}>
                  {project.name}
                </Link>
              </h2>
              <p>
                {project.category === "learning"
                  ? "Learning archive"
                  : "Selected work"}{" "}
                · {project.state}
              </p>
            </div>
            <div className="admin-row-actions">
              <Link
                className="button secondary"
                href={`/admin/projects/${project.id}`}
              >
                Edit
              </Link>
              <form
                action={(project.published
                  ? unpublishProject
                  : publishProject
                ).bind(null, project.id, project.revision)}
              >
                <button className="button secondary">
                  {project.published ? "Unpublish" : "Publish"}
                </button>
              </form>
              <form
                action={moveProject.bind(
                  null,
                  project.id,
                  project.revision,
                  "up",
                )}
              >
                <button
                  className="button secondary"
                  disabled={index === 0}
                  aria-label={`Move ${project.name} up`}
                >
                  ↑
                </button>
              </form>
              <form
                action={moveProject.bind(
                  null,
                  project.id,
                  project.revision,
                  "down",
                )}
              >
                <button
                  className="button secondary"
                  disabled={index === projects.length - 1}
                  aria-label={`Move ${project.name} down`}
                >
                  ↓
                </button>
              </form>
              <DeleteProject
                id={project.id}
                revision={project.revision}
                name={project.name}
              />
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
