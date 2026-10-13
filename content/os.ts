// System copy: boot, lock screen, desktop chrome, toasts, console secret, mobile home.

import { links } from "./links";

export const bios: { text: string; ok: boolean }[] = [
  { text: "ANDREY-OS BIOS v26.10   (c) 2022–2026 Andrey Dmitriev", ok: false },
  { text: "CPU: Full Stack Core @ React / Node.js / NestJS", ok: false },
  { text: "Memory test: web development since 2022 ........ OK", ok: false },
  { text: " ", ok: false },
  { text: "Loading React modules (Feature-Sliced Design)", ok: true },
  { text: "Mounting NestJS services (5+)", ok: true },
  { text: "Connecting PostgreSQL, Redis", ok: true },
  { text: "Starting FastAPI workers", ok: true },
  { text: "Applying RBAC policies", ok: true },
  { text: "Starting GitHub Actions runners", ok: true },
  { text: "Starting andrey.os", ok: true },
];

export const osCopy = {
  osName: "andrey.os",
  version: "v2026.10",
  biosSkip: "PRESS ANY KEY OR CLICK TO SKIP",
  unlock: "CLICK OR PRESS ANY KEY TO UNLOCK",
  wallpaperHint: "// andrey.os — v2026.10 · press ⌘K anywhere",
  menu: ["Portfolio", "Resume", "Terminal", "Contact"] as const,
  noticeApp: "portfolio.ide",
  noticeBody: "Everything I've built lives in here. Click to open →",
  openHint: "› open portfolio.ide to see my work",
  ghost: "CLICK ME",
  sleep: "zzz — move the mouse to wake up",
  soundOn: "SOUND ON — mechanical keyboard mode",
  soundOff: "SOUND OFF",
  retroOn: "8-BIT MODE UNLOCKED — konami again to exit",
  retroOff: "BACK TO 2026",
  theme: (name: string) => `THEME: ${name.toUpperCase()}`,
  palettePlaceholder: "Type a file or a command…",
  paletteEmpty: 'No matches. Try "theme", "summarize", "senat"…',
} as const;

export const consoleSecret = {
  logo: "\n   ___   ___ \n  / _ | / _ \\\n / __ |/ // /\n/_/ |_/____/  andrey.os\n",
  hello: `You opened DevTools? Respect. Let's work together → ${links.telegram}`,
  secret1: "★ SECRET #1: open Terminal (the >_ icon in the dock) and type →  sudo make coffee",
  secret2: '★ SECRET #2: click anywhere on the page and press  ↑ ↑ ↓ ↓ ← → ← → B A  (or type "konami" in Terminal) for 8-bit mode',
} as const;

export const mobileCopy = {
  swipe: "SWIPE UP OR TAP TO UNLOCK",
  lockNotice: "Everything I've built lives in here.",
  startHere: "START HERE",
  desktopTitle: "There's more on desktop",
  desktopBody: "Open this site on a computer for the full andrey.os: windows, a live terminal, secrets and achievements.",
} as const;
