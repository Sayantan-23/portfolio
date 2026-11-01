import { Pool } from "pg";
const globalDb = globalThis as unknown as { portfolioPool?: Pool };
export function database() {
  if (!process.env.DATABASE_URL)
    throw new Error("DATABASE_URL is not configured.");
  if (!globalDb.portfolioPool) {
    globalDb.portfolioPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 5,
      connectionTimeoutMillis: 5000,
    });
    globalDb.portfolioPool.on("error", () =>
      console.error("PostgreSQL background connection failed."),
    );
  }
  return globalDb.portfolioPool;
}
