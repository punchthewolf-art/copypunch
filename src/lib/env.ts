import { readFileSync } from "fs";
import { resolve } from "path";

let cache: Record<string, string> | null = null;

function loadEnv(): Record<string, string> {
  if (cache) return cache;
  cache = {};
  try {
    const content = readFileSync(resolve(process.cwd(), ".env.local"), "utf-8");
    for (const line of content.split("\n")) {
      const m = line.match(/^([A-Z_]+)=(.+)$/);
      if (m) cache[m[1]] = m[2].trim();
    }
  } catch {
    // ignore — .env.local may not exist in production (Vercel injects env vars)
  }
  return cache;
}

export function getEnv(key: string): string | undefined {
  return process.env[key] || loadEnv()[key];
}
