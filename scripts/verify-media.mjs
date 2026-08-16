import { readFileSync, existsSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const configText = readFileSync(path.join(root, "src/data/site.ts"), "utf8");
const paths = [...configText.matchAll(/\/media\/[^\"']+/g)].map((m) => m[0]);
const missing = paths.filter((p) => !existsSync(path.join(root, "public", p.replace(/^\//, ""))));
console.log("media refs:", paths.length);
console.log("missing:", missing.length ? missing : "none");
paths.forEach((p) => {
  const fp = path.join(root, "public", p.replace(/^\//, ""));
  if (existsSync(fp)) console.log("ok", p, Math.round(statSync(fp).size / 1024) + "KB");
});
