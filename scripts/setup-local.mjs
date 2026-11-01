import { randomBytes } from "node:crypto";
import { access, writeFile } from "node:fs/promises";
const exists = async (path) => {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
};
if ((await exists(".env.local")) || (await exists(".env.database"))) {
  console.log("Local configuration already exists. Nothing was overwritten.");
} else {
  const password = randomBytes(32).toString("base64url");
  const admin = randomBytes(24).toString("base64url");
  const secret = randomBytes(48).toString("base64url");
  await writeFile(
    ".env.database",
    `POSTGRES_USER=portfolio\nPOSTGRES_DB=portfolio\nPOSTGRES_PASSWORD=${password}\n`,
    { mode: 0o600, flag: "wx" },
  );
  await writeFile(
    ".env.local",
    `DATABASE_URL=postgresql://portfolio:${password}@127.0.0.1:5434/portfolio\nADMIN_PASSWORD=${admin}\nADMIN_SESSION_SECRET=${secret}\nSITE_URL=http://localhost:3000\n`,
    { mode: 0o600, flag: "wx" },
  );
  console.log(
    "Local credentials generated in .env.local and .env.database. Values were not displayed.",
  );
}
