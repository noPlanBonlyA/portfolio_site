// Pure terminal: command string in, output lines + side effects out.
// Shared by the desktop Terminal window and the mobile Terminal app; UI applies the effects.

import { openTargets, terminalCommands, terminalCopy as T } from "@/content/terminal";
import { fileById, ideFiles, themes, type FileId, type ThemeId } from "@/content/ide";
import type { WinId } from "@/content/apps";
import { links } from "@/content/links";
import type { QuestId } from "@/content/quests";
import { stack } from "@/content/resume";

export type LineKind = "cmd" | "out" | "acc" | "err" | "dim";
export interface TermLine {
  text: string;
  kind: LineKind;
}

export type TermEffect =
  | { type: "openFile"; file: FileId }
  | { type: "resume" }
  | { type: "url"; url: string }
  | { type: "win"; id: WinId }
  | { type: "theme"; id: ThemeId }
  | { type: "retro" }
  | { type: "sound"; on: boolean }
  | { type: "quest"; id: QuestId }
  | { type: "hire" }
  | { type: "clear" }
  | { type: "exit" };

export interface TermResult {
  lines: TermLine[];
  effects: TermEffect[];
}

interface Ctx {
  retro?: boolean;
  now?: Date;
}

const fileMap: Record<string, FileId> = Object.fromEntries(
  ideFiles.flatMap((f) => [
    [f.path.toLowerCase(), f.id],
    [f.name.toLowerCase(), f.id],
  ]),
);

const KONAMI = ["konami", "up up down down left right left right b a", "↑↑↓↓←→←→ba"];

export function runCommand(raw: string, ctx: Ctx = {}): TermResult {
  const cmd = raw.trim().replace(/\s+/g, " ");
  const lc = cmd.toLowerCase();
  const lines: TermLine[] = [{ text: `${T.prompt} ${cmd}`, kind: "cmd" }];
  const effects: TermEffect[] = [];
  const out = (text: string, kind: LineKind = "out") => lines.push({ text, kind });

  if (!cmd) return { lines, effects };

  if (lc === "help") {
    T.help.forEach((l) => out(l));
    out(T.helpTip, "dim");
  } else if (lc === "whoami") {
    out(T.whoami);
  } else if (lc === "ls" || lc === "ls -la" || lc === "ll") {
    out(T.ls);
  } else if (lc === "ls work" || lc === "ls work/" || lc === "projects") {
    ideFiles.filter((f) => f.depth === 1).forEach((f) => out(`  ${f.path}`));
  } else if (lc === "skills" || lc === "cat stack.ts") {
    stack.forEach((g) => out(`  ${g.key.padEnd(15)}${g.items.join(", ")}`));
  } else if (lc === "contact") {
    T.contact.forEach((l) => out(l));
  } else if (lc === "neofetch") {
    T.neofetch.forEach((l) => out(l, "acc"));
  } else if (lc === "date") {
    out((ctx.now ?? new Date()).toString());
  } else if (lc.startsWith("cat ")) {
    const arg = lc.slice(4).trim();
    const id = fileMap[arg];
    if (id) {
      out(`opening ${fileById(id)!.path} in portfolio.ide…`, "acc");
      effects.push({ type: "openFile", file: id });
    } else out(T.noFile(cmd.slice(4).trim()), "err");
  } else if (lc.startsWith("open ")) {
    const a = lc.slice(5).trim();
    if (a === "ide" || a === "portfolio") {
      out("launching portfolio.ide…", "acc");
      effects.push({ type: "openFile", file: "readme" });
    } else if (a === "cv" || a === "resume" || a === "resume.pdf") {
      out("opening resume.pdf…", "acc");
      effects.push({ type: "resume" });
    } else if (a === "github") {
      out(`→ ${links.github}`, "acc");
      effects.push({ type: "url", url: links.github });
    } else if (a === "telegram" || a === "tg") {
      out(`→ ${links.telegram}`, "acc");
      effects.push({ type: "url", url: links.telegram });
    } else if (a === "taskmgr" || a === "task manager") {
      out("starting Task Manager…", "acc");
      effects.push({ type: "win", id: "task" });
    } else if (a === "messages") {
      out("starting Messages…", "acc");
      effects.push({ type: "win", id: "msg" });
    } else out(T.unknownTarget(a), "err");
  } else if (lc.startsWith("theme ")) {
    const k = lc.slice(6).trim() as ThemeId;
    if (k in themes) {
      out(`theme set: ${themes[k].name}`, "acc");
      effects.push({ type: "theme", id: k });
    } else out(T.themes, "err");
  } else if (KONAMI.includes(lc)) {
    out(ctx.retro ? T.konamiOff : T.konamiOn, "acc");
    effects.push({ type: "retro" });
  } else if (lc === "sudo make coffee") {
    T.coffee.forEach((l) => out(l));
    out(T.coffeeDone, "acc");
    effects.push({ type: "quest", id: "console" });
  } else if (lc === "hire andrey" || lc === "hire") {
    effects.push({ type: "quest", id: "hire" }, { type: "hire" });
  } else if (lc.startsWith("sudo rm")) {
    out(T.sudoPassword);
    out(lc.includes("boredom") ? T.sudoBoredom : T.sudoOther, "acc");
  } else if (lc === "sudo") {
    out(T.sudoUsage, "dim");
  } else if (lc === "sound on" || lc === "sound off") {
    const on = lc === "sound on";
    out(`sound: ${on ? "on" : "off"}`, "acc");
    effects.push({ type: "sound", on });
  } else if (lc === "clear") {
    return { lines: [], effects: [{ type: "clear" }] };
  } else if (lc === "exit") {
    return { lines: [], effects: [{ type: "exit" }] };
  } else {
    out(T.notFound(cmd), "err");
  }
  return { lines, effects };
}

/** The "hire andrey" build log, printed line by line by the UI. */
export const hireSequence: TermLine[] = T.hire.map((text, i) => ({
  text,
  kind: i === T.hire.length - 1 || text.includes("✓") ? "acc" : "out",
}));

/** Tab completion: a single match completes, several are listed. */
export function complete(input: string): { value?: string; options?: string[] } {
  const v = input.toLowerCase();
  if (!v) return {};
  let pool = terminalCommands;
  if (v.startsWith("cat ")) pool = ideFiles.map((f) => `cat ${f.path.toLowerCase()}`);
  else if (v.startsWith("open ")) pool = openTargets.map((t) => `open ${t}`);
  else if (v.startsWith("theme ")) pool = Object.keys(themes).map((t) => `theme ${t}`);
  const matches = pool.filter((c) => c.startsWith(v));
  if (matches.length === 1) return { value: matches[0] };
  if (matches.length > 1) {
    // Extend to the longest common prefix, like a real shell.
    let prefix = matches[0];
    for (const m of matches) while (!m.startsWith(prefix)) prefix = prefix.slice(0, -1);
    return prefix.length > v.length ? { value: prefix, options: matches } : { options: matches };
  }
  return {};
}
