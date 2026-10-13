import { projects } from "./projects";

export type FileId = "readme" | "p0" | "p1" | "p2" | "p3" | "p4" | "exp" | "stack" | "about" | "contact";

export interface IdeFile {
  id: FileId;
  name: string;
  path: string;
  lang: string;
  icon: "M↓" | "≡" | "TS" | "$_";
  /** Nesting level in the explorer (work/ files are 1). */
  depth: 0 | 1;
}

const md = (id: FileId, name: string, depth: 0 | 1 = 0): IdeFile => ({
  id, name, path: depth ? `work/${name}` : name, lang: "Markdown", icon: "M↓", depth,
});

export const ideFiles: IdeFile[] = [
  md("readme", "README.md"),
  ...projects.map((p) => md(p.id, p.file, 1)),
  { id: "exp", name: "experience.log", path: "experience.log", lang: "Log", icon: "≡", depth: 0 },
  { id: "stack", name: "stack.ts", path: "stack.ts", lang: "TypeScript", icon: "TS", depth: 0 },
  md("about", "about.md"),
  { id: "contact", name: "contact.sh", path: "contact.sh", lang: "Shell", icon: "$_", depth: 0 },
];

export const fileById = (id: string) => ideFiles.find((f) => f.id === id);
export const isProjectFile = (id: string) => /^p\d$/.test(id);

export const ACCENT = "#c8ff3d";

export type ThemeId = "andrey" | "dracula" | "monokai" | "solarized";

export interface IdeTheme {
  name: string;
  bg: string; panel: string; text: string; muted: string; dim: string; line: string; sel: string;
  accent: string; on: string;
  /** Syntax colours: keyword, property, comment, string. */
  k: string; p: string; c: string; s: string;
}

export const themes: Record<ThemeId, IdeTheme> = {
  andrey: { name: "Andrey Dark", bg: "#0b0b0c", panel: "#0f0f11", text: "#ecebe6", muted: "#8d8c86", dim: "#55544f", line: "rgba(236,235,230,.1)", sel: "#18181b", accent: ACCENT, on: "#0b0b0c", k: "#ff8f70", p: "#8ec5ff", c: "#76756f", s: ACCENT },
  dracula: { name: "Dracula", bg: "#282a36", panel: "#21222c", text: "#f8f8f2", muted: "#a9abc8", dim: "#5f6380", line: "rgba(248,248,242,.1)", sel: "#343746", accent: "#bd93f9", on: "#21222c", k: "#ff79c6", p: "#8be9fd", c: "#8590c0", s: "#f1fa8c" },
  monokai: { name: "Monokai", bg: "#272822", panel: "#1e1f1c", text: "#f8f8f2", muted: "#a8a89a", dim: "#64655c", line: "rgba(248,248,242,.1)", sel: "#3e3d32", accent: "#a6e22e", on: "#1e1f1c", k: "#f92672", p: "#66d9ef", c: "#948f78", s: "#e6db74" },
  solarized: { name: "Solarized Light", bg: "#fdf6e3", panel: "#eee8d5", text: "#073642", muted: "#586e75", dim: "#93a1a1", line: "rgba(7,54,66,.14)", sel: "#e4ddc8", accent: "#1f6fa8", on: "#fdf6e3", k: "#cb4b16", p: "#1f6fa8", c: "#7b8b8d", s: "#5f7000" },
};

export const themeOrder: ThemeId[] = ["andrey", "dracula", "monokai", "solarized"];

export const ideCopy = {
  tip: "// tip: ⌘K to search. ▶ RUN a project file. select a word to highlight its twins.",
  scan: "SUMMARIZING 10 FILES → CV",
  heroA: "FULL STACK",
  heroB: "DEVELOPER",
  problem: "candidate not hired yet",
  problemLocation: "portfolio/contact.sh:1",
  quickFix: "Quick fix: open contact.sh",
  branch: "main",
  stackComment: "// what I reach for (live view: Task Manager in the dock)",
  notExecutable: (id: string) => `$ ./${id}: not executable. open a file in work/ and press ▶ RUN`,
} as const;
