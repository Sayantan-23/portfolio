import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { ProjectForm } from "@/components/project-form";
export default async function NewProject() {
  await requireAdmin();
  return (
    <>
      <div className="editor-heading">
        <Link href="/admin" className="text-link">
          ← All projects
        </Link>
        <h1>Add a project</h1>
        <p>Start with the essentials. Add the story when you’re ready.</p>
      </div>
      <ProjectForm />
    </>
  );
}
