// src/lib/server/fs-utils.ts
import fs from "node:fs";
import path from "node:path";

export function readJson<T>(...segments: string[]): T {
  const p = path.join(process.cwd(), ...segments);
  const raw = fs.readFileSync(p, "utf-8");
  return JSON.parse(raw) as T;
}
