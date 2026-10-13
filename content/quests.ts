// 17 achievements. `target` is the [data-quest] element the guide cursor flies to,
// `guide` its caption. Navigation for each quest is wired in the OS store (goQuest).

export type QuestId =
  | "ide" | "run" | "summarize" | "lang" | "palette" | "theme" | "highlight" | "hire" | "coffee"
  | "bot" | "music" | "dig" | "photo" | "sleep" | "reboot" | "console" | "konami";

export interface Quest {
  id: QuestId;
  label: string;
  hint: string;
  secret?: boolean;
  target?: string;
  guide?: string;
  /** Shown as a toast instead of (or in addition to) the guide. */
  toast?: string;
}

export const quests: Quest[] = [
  { id: "ide", label: "Open portfolio.ide", hint: "The glowing </> icon on the desktop.", target: "ide", guide: "click to open" },
  { id: "run", label: "Run a project", hint: "Open any file in work/ and press ▶ RUN.", target: "run", guide: "press ▶ RUN" },
  { id: "summarize", label: "Compile the IDE into a CV", hint: "The green SUMMARIZE button in the IDE.", target: "sum", guide: "compile it into a CV" },
  { id: "lang", label: "Read the CV in Russian", hint: "Switch EN → RU on the resume.", target: "ru", guide: "switch to RU" },
  { id: "palette", label: "Open the command palette", hint: "Press ⌘K or Ctrl+K, anywhere.", target: "pal", guide: "or press ⌘K / Ctrl+K" },
  { id: "theme", label: "Change the IDE theme", hint: "Click the theme name in the IDE status bar.", target: "theme", guide: "click to switch theme" },
  { id: "highlight", label: "Find a word's twins", hint: "Double-click any word in the code editor.", target: "editor", guide: "double-click any word" },
  { id: "hire", label: "Hire Andrey from the terminal", hint: "Open Terminal and type: hire andrey", target: "termin", guide: "type: hire andrey" },
  { id: "coffee", label: "Try to kill coffee.service", hint: "Task Manager → coffee.service → End task.", target: "endtask", guide: "pick coffee.service, then End task" },
  { id: "bot", label: "Ask Andrey.bot a question", hint: "Messages, in the dock.", target: "chips", guide: "ask anything" },
  { id: "music", label: "Put on some coding music", hint: "Now coding, in the dock.", target: "play", guide: "press play" },
  { id: "dig", label: "Dig through the Trash", hint: "Open the Trash and inspect a file.", target: "trashlist", guide: "click a file" },
  { id: "photo", label: "Try to throw Andrey away", hint: "Drag the photo onto the Trash.", target: "photo", guide: "drag me to the Trash in the dock" },
  { id: "sleep", label: "Let the computer fall asleep", hint: "Do absolutely nothing on the desktop for 30 seconds.", toast: "Hands off the mouse and keyboard for 30 seconds…" },
  { id: "reboot", label: "Reboot the system", hint: "Somewhere in the top-left corner.", target: "reboot", guide: "click here" },
  {
    id: "console", label: "Find the secret in the console", secret: true,
    hint: "Open DevTools: F12 or Ctrl+Shift+J (Cmd+Option+J on Mac) → Console tab. Find the green line and type that command in Terminal.",
    toast: "Press F12 (or Cmd+Option+J) → Console → read the green line",
  },
  {
    id: "konami", label: "Enter the ancient code (8-bit mode)", secret: true,
    hint: "Click any empty spot, then press ↑ ↑ ↓ ↓ ← → ← → B A. Easier way: type konami in Terminal.",
    target: "termin", guide: "or just type: konami",
    toast: "Press ↑ ↑ ↓ ↓ ← → ← → B A — or type konami in Terminal",
  },
];

export const questCopy = {
  heading: "★ ACHIEVEMENTS",
  found: (score: string) => `${score} tricks found`,
  help: "Click any item and the cursor will show you where to go.",
  pill: "see all tricks",
} as const;
