// Desktop apps (windows in the dock) and their copy.

import { links } from "./links";

export type WinId = "term" | "task" | "msg" | "music" | "trash";

export const dockApps: { id: WinId; label: string; glyph: string; bg: string; fg: string }[] = [
  { id: "term", label: "Terminal", glyph: ">_", bg: "#0e0e10", fg: "var(--accent)" },
  { id: "task", label: "Task Manager", glyph: "▮▮▯", bg: "#1d2416", fg: "var(--accent)" },
  { id: "msg", label: "Messages", glyph: "…", bg: "#8ec5ff", fg: "#0b0b0c" },
  { id: "music", label: "Now coding", glyph: "♪", bg: "#ff7a59", fg: "#0b0b0c" },
  // separator goes before trash
  { id: "trash", label: "Trash", glyph: "⌫", bg: "rgba(236,235,230,.08)", fg: "#ecebe6" },
];

/** Task Manager: skills as processes. `cpu` is the base load; it jitters ±7 while open. */
export const processes = [
  { name: "react.exe", cpu: 38, usedIn: "Gazekonomika services, SENAT AI, this portfolio" },
  { name: "nestjs", cpu: 24, usedIn: "Gazekonomika internal services" },
  { name: "typescript", cpu: 31, usedIn: "basically everywhere" },
  { name: "fastapi.py", cpu: 14, usedIn: "SENAT AI backend, ITMO AI bot" },
  { name: "postgres", cpu: 11, usedIn: "Gazekonomika, SENAT AI" },
  { name: "docker", cpu: 9, usedIn: "CI/CD and deployments" },
  { name: "redis", cpu: 6, usedIn: "caching" },
  { name: "coffee.service", cpu: 99, usedIn: "every single commit", critical: true },
];

export const taskCopy = {
  title: "Task Manager — skills.exe",
  info: (cpu: number) => `CPU ${cpu}% · ${processes.length} processes · uptime: since 2022`,
  selectFirst: "Select a process first.",
  coffeeDenied: "Access denied: coffee.service is a critical system process.",
  denied: (name: string) => `Ending ${name} would break production. Request denied.`,
};

export const musicCopy = {
  title: "Now coding",
  track: "What I code to",
  artist: "Andrey's playlist · Spotify",
  listen: "LISTEN ON SPOTIFY ↗",
  href: links.spotify,
};

export const trashItems = [
  { name: "old-portfolio-design.zip", size: "18 MB", note: "Archived. The new one has an operating system." },
  { name: "jquery-spaghetti.js", size: "412 KB", note: "$('.everything').on('click', panic). We don't talk about this one." },
  { name: "prod-bugs-2024.log", size: "2.1 MB", note: "All fixed. Mostly. Some became features." },
  { name: "TODO-final-final-v3.md", size: "3 KB", note: "1. Ship it.  2. Ship it again." },
];

export const trashCopy = {
  title: `Trash — ${trashItems.length} items`,
  idle: "Click a file to inspect it.",
  cantEmpty: "Can't empty: these files are part of character development.",
  askTitle: "Move andrey.jpg to Trash?",
  askBody: "Are you sure? He's nice.",
  keep: "Keep him",
  del: "Delete anyway",
  kept: "Good choice.",
  denied: "Permission denied: andrey.jpg is a protected system file",
};
