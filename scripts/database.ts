import nextEnv from "@next/env";
import { readFile } from "node:fs/promises";
import { database } from "../lib/db";
import { seedProject } from "./seed";
nextEnv.loadEnvConfig(process.cwd());
const pool = database();
try {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(
      await readFile(new URL("./schema.sql", import.meta.url), "utf8"),
    );
    if (process.argv.includes("--seed")) {
      await client.query(
        "INSERT INTO projects(id,content,published,sort_order) VALUES($1,$2,false,0) ON CONFLICT(id) DO NOTHING",
        ["job-vault", JSON.stringify(seedProject)],
      );
      console.log(
        "Seed added as a draft, if absent. Existing records were not changed.",
      );
    }
    await client.query("COMMIT");
    console.log("Database schema ready.");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
} catch {
  console.error("Database setup failed. Check PostgreSQL and DATABASE_URL.");
  process.exitCode = 1;
} finally {
  await pool.end();
}
