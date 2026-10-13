import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// The site shows only Telegram (and GitHub); email and phone stay inside the PDFs.
const FORBIDDEN = [/andrey\.spb521/i, /@gmail/i, /mailto:/i, /988-98-89/, /\+7\s?\(981\)/];
const DIRS = ["app", "components", "content", "os", "mobile", "store", "hooks", "lib"];

async function files(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true }).catch(() => []);
  const nested = await Promise.all(
    entries.map((e) => {
      const p = join(dir, e.name);
      if (e.isDirectory()) return files(p);
      return /\.(tsx?|css)$/.test(e.name) && !e.name.endsWith(".test.ts") ? [p] : [];
    }),
  );
  return nested.flat();
}

describe("privacy", () => {
  it("no email or phone in site source", async () => {
    const all = (await Promise.all(DIRS.map(files))).flat();
    const hits: string[] = [];
    for (const f of all) {
      const src = await readFile(f, "utf8");
      for (const re of FORBIDDEN) if (re.test(src)) hits.push(`${f}: ${re}`);
    }
    expect(hits).toEqual([]);
  });
});
