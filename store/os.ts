"use client";

import { create } from "zustand";

import { trashCopy, type WinId } from "@/content/apps";
import { fileById, ideCopy, isProjectFile, themeOrder, themes, type FileId, type ThemeId } from "@/content/ide";
import { projectById, runKind, type RunLine } from "@/content/projects";
import { quests, type QuestId } from "@/content/quests";
import { osCopy } from "@/content/os";
import type { Lang } from "@/content/resume";
import { playBeep } from "@/lib/sound";

// Desktop OS state. Fast-changing pointer state (cursor, drag) never goes here — it lives in refs.

export type Boot = "pending" | "bios" | "lock" | "on";
export type Phase = "desktop" | "ide" | "scan" | "shrink" | "resume";

const STORAGE = { booted: "andreyos_booted", done: "andreyos_done" } as const;

const WIN_IDS: WinId[] = ["term", "task", "msg", "music", "trash"];

interface OsState {
  boot: Boot;
  phase: Phase;
  wins: Record<WinId, boolean>;
  z: Record<WinId, number>;
  zTop: number;
  theme: ThemeId;
  lang: Lang;
  sound: boolean;
  retro: boolean;
  palOpen: boolean;
  questsOpen: boolean;
  done: Partial<Record<QuestId, true>>;
  toast: string;
  /** Ghost cursor + notification are shown until the visitor finds portfolio.ide. */
  hintDone: boolean;
  openFiles: FileId[];
  activeFile: FileId;
  trashAsk: boolean;
  /** Bumped to send the photo window back home; `shake` plays the "protected file" shake. */
  photoReset: { n: number; shake: boolean };
  /** IDE bottom panel. */
  termTab: "terminal" | "problems";
  /** ▶ RUN output; a `bar` line renders the animated page-load bar in place. */
  run: { lines: { text: string; kind: RunLine["kind"] | "bar" }[] };
  /** Matches of the selected word in the editor (status bar). */
  hlCount: number;

  hydrate: () => void;
  setBoot: (boot: Boot) => void;
  finishBoot: () => void;
  reboot: () => void;
  setPhase: (phase: Phase) => void;
  openWin: (id: WinId) => void;
  closeWin: (id: WinId) => void;
  focusWin: (id: WinId) => void;
  setTheme: (theme: ThemeId) => void;
  cycleTheme: () => void;
  setLang: (lang: Lang) => void;
  toggleSound: () => void;
  toggleRetro: () => void;
  setPal: (open: boolean) => void;
  setQuestsOpen: (open: boolean) => void;
  markDone: (id: QuestId) => void;
  showToast: (text: string) => void;
  beep: (freq?: number, dur?: number) => void;
  setHintDone: () => void;
  openIde: (file?: FileId) => void;
  goResume: () => void;
  openFile: (file: FileId) => void;
  closeFile: (file: FileId) => void;
  setTermTab: (tab: OsState["termTab"]) => void;
  runFile: () => void;
  setHlCount: (n: number) => void;
  summarize: () => void;
  askTrash: () => void;
  keepPhoto: () => void;
  deletePhoto: () => void;
}

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    if (value === undefined) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* private mode / blocked storage — the site works without it */
  }
}

let summarizeTimer: ReturnType<typeof setTimeout> | undefined;
let runTimers: ReturnType<typeof setTimeout>[] = [];
let toastTimer: ReturnType<typeof setTimeout> | undefined;

export const useOs = create<OsState>()((set, get) => ({
  boot: "pending",
  phase: "desktop",
  wins: Object.fromEntries(WIN_IDS.map((id) => [id, false])) as Record<WinId, boolean>,
  z: Object.fromEntries(WIN_IDS.map((id, i) => [id, 31 + i])) as Record<WinId, number>,
  zTop: 31 + WIN_IDS.length,
  theme: "andrey",
  lang: "en",
  sound: false,
  retro: false,
  palOpen: false,
  questsOpen: false,
  done: {},
  toast: "",
  hintDone: false,
  openFiles: ["readme"],
  activeFile: "readme",
  trashAsk: false,
  photoReset: { n: 0, shake: false },
  termTab: "terminal",
  run: { lines: [] },
  hlCount: 0,

  /** Runs once on mount: restores achievements and skips BIOS for returning visitors. */
  hydrate: () => {
    const done = read<OsState["done"]>(STORAGE.done, {});
    const booted = read<boolean>(STORAGE.booted, false);
    set({ done: done && typeof done === "object" ? done : {}, boot: booted ? "on" : "bios" });
  },

  setBoot: (boot) => set({ boot }),
  finishBoot: () => {
    write(STORAGE.booted, true);
    set({ boot: "on" });
  },
  reboot: () => {
    get().markDone("reboot");
    write(STORAGE.booted, undefined);
    set({ boot: "bios", phase: "desktop", palOpen: false, questsOpen: false });
  },

  setPhase: (phase) => set({ phase, palOpen: false }),

  openWin: (id) =>
    set((s) => ({
      wins: { ...s.wins, [id]: true },
      z: { ...s.z, [id]: s.zTop },
      zTop: s.zTop + 1,
      phase: "desktop",
    })),
  closeWin: (id) => set((s) => ({ wins: { ...s.wins, [id]: false } })),
  focusWin: (id) =>
    set((s) => (s.z[id] === s.zTop - 1 ? s : { z: { ...s.z, [id]: s.zTop }, zTop: s.zTop + 1 })),

  setTheme: (theme) => {
    if (theme === get().theme) return;
    get().markDone("theme");
    set({ theme });
    get().showToast(osCopy.theme(themes[theme].name));
  },
  cycleTheme: () => {
    const i = themeOrder.indexOf(get().theme);
    get().setTheme(themeOrder[(i + 1) % themeOrder.length]);
  },

  setLang: (lang) => {
    if (lang === "ru") get().markDone("lang");
    set({ lang });
  },

  toggleSound: () => {
    const sound = !get().sound;
    set({ sound });
    get().beep(880, 0.05);
    get().showToast(sound ? osCopy.soundOn : osCopy.soundOff);
  },
  toggleRetro: () => {
    if (!get().retro) get().markDone("konami");
    set((s) => ({ retro: !s.retro }));
  },

  setPal: (palOpen) => {
    if (palOpen) get().markDone("palette");
    set({ palOpen, questsOpen: palOpen ? false : get().questsOpen });
  },
  setQuestsOpen: (questsOpen) => set({ questsOpen, palOpen: questsOpen ? false : get().palOpen }),

  markDone: (id) => {
    const { done } = get();
    if (done[id]) return;
    const quest = quests.find((q) => q.id === id);
    if (!quest) return;
    const next = { ...done, [id]: true as const };
    write(STORAGE.done, next);
    set({ done: next });
    const n = Object.keys(next).length;
    setTimeout(() => get().showToast(`★ ${quest.label}  ·  ${n}/${quests.length}`), 250);
  },

  showToast: (toast) => {
    clearTimeout(toastTimer);
    set({ toast });
    toastTimer = setTimeout(() => set({ toast: "" }), 2600);
  },

  beep: (freq, dur) => {
    if (get().sound) playBeep(freq, dur);
  },

  setHintDone: () => {
    if (!get().hintDone) set({ hintDone: true });
  },

  openIde: (file) => {
    get().markDone("ide");
    set((s) => {
      const target = file ?? s.activeFile;
      return {
        phase: "ide",
        hintDone: true,
        palOpen: false,
        activeFile: target,
        openFiles: s.openFiles.includes(target) ? s.openFiles : [...s.openFiles, target],
      };
    });
  },

  goResume: () => set({ phase: "resume", hintDone: true, palOpen: false }),

  openFile: (file) => {
    if (!fileById(file)) return;
    get().beep(760, 0.02);
    set((s) => ({
      activeFile: file,
      openFiles: s.openFiles.includes(file) ? s.openFiles : [...s.openFiles, file],
      termTab: "terminal",
      hlCount: 0,
    }));
  },
  closeFile: (file) =>
    set((s) => {
      if (s.openFiles.length < 2) return s;
      const openFiles = s.openFiles.filter((f) => f !== file);
      return { openFiles, activeFile: s.activeFile === file ? openFiles[openFiles.length - 1] : s.activeFile };
    }),
  setTermTab: (termTab) => set({ termTab }),
  setHlCount: (hlCount) => {
    if (hlCount > 0) get().markDone("highlight");
    if (hlCount !== get().hlCount) set({ hlCount });
  },

  runFile: () => {
    runTimers.forEach(clearTimeout);
    runTimers = [];
    const id = get().activeFile;
    const project = isProjectFile(id) ? projectById(id) : undefined;
    if (!project) {
      set({ termTab: "terminal", run: { lines: [{ text: ideCopy.notExecutable(id), kind: "err" }] } });
      return;
    }
    get().markDone("run");
    set({ termTab: "terminal", run: { lines: [] } });
    const push = (text: string, kind: RunLine["kind"] | "bar") =>
      set((s) => ({ run: { lines: [...s.run.lines, { text, kind }] } }));
    project.run.forEach((text, i) =>
      runTimers.push(
        setTimeout(() => {
          push(text, runKind(text));
          get().beep(600 + i * 40, 0.02);
        }, 280 * i),
      ),
    );
    const bar = project.runBar;
    if (bar) {
      const t0 = 280 * project.run.length;
      runTimers.push(setTimeout(() => push(bar.label, "bar"), t0));
      runTimers.push(setTimeout(() => push(bar.after, "acc"), t0 + 3100));
    }
  },

  /**
   * IDE → CV: a scan beam sweeps the IDE (1 s), the window shrinks into a white sheet,
   * then the resume "prints". From the desktop or the resume, the IDE opens first.
   */
  summarize: () => {
    const { phase } = get();
    if (phase === "scan" || phase === "shrink") return;
    clearTimeout(summarizeTimer);
    if (phase === "desktop" || phase === "resume") {
      get().openIde();
      summarizeTimer = setTimeout(() => get().summarize(), 800);
      return;
    }
    get().markDone("summarize");
    const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      set({ phase: "resume", palOpen: false });
      return;
    }
    set({ phase: "scan", palOpen: false });
    summarizeTimer = setTimeout(() => {
      set({ phase: "shrink" });
      summarizeTimer = setTimeout(() => set({ phase: "resume" }), 650);
    }, 1000);
  },

  askTrash: () => {
    get().markDone("photo");
    set({ trashAsk: true });
  },
  keepPhoto: () => {
    set((s) => ({ trashAsk: false, photoReset: { n: s.photoReset.n + 1, shake: false } }));
    get().showToast(trashCopy.kept);
  },
  deletePhoto: () => {
    set((s) => ({ trashAsk: false, photoReset: { n: s.photoReset.n + 1, shake: true } }));
    get().showToast(trashCopy.denied);
  },
}));

export const questScore = (done: OsState["done"]) =>
  `${quests.filter((q) => done[q.id]).length}/${quests.length}`;
