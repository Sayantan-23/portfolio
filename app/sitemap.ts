import type { MetadataRoute } from "next";
import { listProjects } from "@/lib/projects";
export const dynamic = "force-dynamic";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.SITE_URL || "http://localhost:3000";
  return [
    { url: base },
    { url: `${base}/work` },
    ...(await listProjects()).map((project) => ({
      url: `${base}/work/${project.id}`,
      lastModified: new Date(project.updated_at),
    })),
  ];
}
