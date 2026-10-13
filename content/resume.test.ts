import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { extractText, getDocumentProxy } from "unpdf";
import { describe, expect, it } from "vitest";

import { resumes, type Resume } from "./resume";

// Collapse whitespace and line-wrap hyphenation differences so we compare words, not layout.
const norm = (s: string) => s.replace(/\*\*/g, "").replace(/\s+/g, " ").trim();

async function pdfText(file: string) {
  const buf = await readFile(join(process.cwd(), "public", file));
  const pdf = await getDocumentProxy(new Uint8Array(buf));
  const { text } = await extractText(pdf, { mergePages: true });
  return norm(text);
}

function strings(r: Resume): string[] {
  return [
    r.name,
    `${r.title} ${r.titleStack}`,
    r.location,
    ...Object.values(r.headings),
    r.summary,
    ...r.skills.flatMap((g) => [`${g.label}: ${g.value}`]),
    ...r.jobs.flatMap((j) => [`${j.role} — ${j.company}`, j.period, ...j.bullets]),
    `${r.education.label}: ${r.education.value}`,
    `${r.languages.label}: ${r.languages.value}`,
  ];
}

describe.each(Object.values(resumes))("resume ($lang) matches PDF", (r) => {
  it("every string appears verbatim in the PDF", async () => {
    const text = await pdfText(r.pdf.filename);
    const missing = strings(r).map(norm).filter((s) => !text.includes(s));
    expect(missing).toEqual([]);
  });
});
