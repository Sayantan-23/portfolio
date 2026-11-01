import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getProject } from "@/lib/projects";
import { ProjectForm } from "@/components/project-form";
export default async function EditProject({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  await requireAdmin();
  const project = await getProject((await params).projectId, true);
  if (!project) notFound();
  return (
    <>
      <div className="editor-heading">
        <Link href="/admin" className="text-link">
          ← All projects
        </Link>
        <h1>Edit project</h1>
        <p>
          Update the details. The project’s link stays the same when its name
          changes.
        </p>
        <span className="editor-status">
          {project.published ? "Published" : "Draft"}
        </span>
      </div>
      <ProjectForm project={project} />
    </>
  );
}
