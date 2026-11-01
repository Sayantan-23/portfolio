import "server-only";
import { database } from "./db";
import { validId, type Project, type ProjectContent } from "./project";
type Row = {
  id: string;
  content: ProjectContent;
  published: boolean;
  sort_order: number;
  revision: number;
  updated_at: Date;
};
function project(row: Row): Project {
  return {
    ...row.content,
    id: row.id,
    published: row.published,
    sort_order: row.sort_order,
    revision: row.revision,
    updated_at: row.updated_at.toISOString(),
  };
}
export async function listProjects(includeDrafts = false): Promise<Project[]> {
  const { rows } = await database().query<Row>(
    "SELECT * FROM projects WHERE ($1::boolean OR published) ORDER BY sort_order, id",
    [includeDrafts],
  );
  return rows.map(project);
}
export async function getProject(
  id: string,
  includeDrafts = false,
): Promise<Project | null> {
  if (!validId(id)) return null;
  const { rows } = await database().query<Row>(
    "SELECT * FROM projects WHERE id=$1 AND ($2::boolean OR published)",
    [id, includeDrafts],
  );
  return rows[0] ? project(rows[0]) : null;
}
