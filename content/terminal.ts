// Terminal app copy. The command logic lives in lib/terminal-engine.ts.

import { links } from "./links";
import { profile } from "./profile";

export const terminalCopy = {
  title: "andrey@andrey.os: ~ — zsh",
  prompt: "andrey@os:~$",
  banner: [
    { text: 'andrey.os terminal — type "help" to see commands', kind: "dim" },
    { text: "try: neofetch · projects · hire andrey", kind: "acc" },
  ],
  mobileBanner: "andrey.os mobile terminal — tap a command below",
  help: [
    "commands:",
    "  whoami · ls · projects · skills · contact · neofetch · date",
    "  cat <file>     open a file in portfolio.ide",
    "  open <ide|cv|github|telegram|taskmgr|messages>",
    "  theme <andrey|dracula|monokai|solarized>",
    "  hire andrey · sound on|off · clear · exit",
  ],
  helpTip: "  tip: Tab autocompletes, ↑ ↓ walk history",
  whoami: `andrey dmitriev — full stack developer (${profile.stackLine}), saint petersburg`,
  ls: "README.md  work/  experience.log  stack.ts  about.md  contact.sh  resume.pdf",
  contact: [
    `  telegram  ${links.telegramHandle}`,
    `  github    ${links.githubLabel}`,
  ],
  neofetch: [
    "   ___   ___      andrey@andrey.os",
    "  / _ | / _ \\     ----------------",
    " / __ |/ // /     OS: andrey.os v2026.10",
    "/_/ |_/____/      Role: Full Stack Developer",
    "                  Stack: React · Next.js · NestJS · FastAPI",
    "                  Uptime: since 2022",
    "                  Users: 200–300 daily (enterprise)",
    "                  Location: Saint Petersburg",
  ],
  coffee: [
    "[sudo] password for recruiter: ********",
    "      ( (",
    "       ) )",
    "    ........",
    "    |      |]",
    "    \\      /",
    "     `----'",
  ],
  coffeeDone: "coffee ready. you found the console secret ★",
  hire: [
    "> compiling offer for andrey…",
    "[1/3] stack: React, NestJS, FastAPI ............ ✓",
    "[2/3] delivery: team of 7, 6-month project ..... ✓",
    "[3/3] availability: strong product teams ....... ✓",
    "build succeeded. opening contact.sh…",
  ],
  sudoPassword: "[sudo] password for recruiter: ********",
  sudoBoredom: "boredom: removed. enjoy andrey.os",
  sudoOther: "nice try. this incident will be reported (to andrey, who will laugh).",
  sudoUsage: "usage: sudo rm -rf boredom",
  konamiOn: "cheat accepted. welcome to 1986.",
  konamiOff: "exiting 8-bit mode…",
  themes: "themes: andrey · dracula · monokai · solarized",
  notFound: (cmd: string) => `command not found: ${cmd} — type "help"`,
  noFile: (f: string) => `cat: ${f}: no such file. try "ls"`,
  unknownTarget: (t: string) => `open: unknown target "${t}"`,
} as const;

/** Tab-completion pool. Secrets (sudo make coffee, konami) are deliberately left out. */
export const terminalCommands = [
  "help", "whoami", "ls", "projects", "skills", "contact", "neofetch", "date",
  "cat ", "open ", "theme ", "hire andrey", "sudo rm -rf boredom",
  "sound on", "sound off", "clear", "exit",
];

export const openTargets = ["ide", "cv", "github", "telegram", "taskmgr", "messages"];

/** Mobile terminal: commands are buttons. */
export const mobileCommands = ["whoami", "projects", "skills", "neofetch", "hire andrey", "sudo make coffee", "clear"];
