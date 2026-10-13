"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";

import { terminalCopy } from "@/content/terminal";
import { complete, hireSequence, runCommand, type TermEffect, type TermLine } from "@/lib/terminal-engine";
import { useOs } from "@/store/os";

import { WindowFrame } from "./WindowFrame";
import styles from "./windows.module.css";

const banner = terminalCopy.banner.map((l) => ({ ...l })) as TermLine[];

export function Terminal() {
  const [lines, setLines] = useState<TermLine[]>(banner);
  const [input, setInput] = useState("");
  const [hist, setHist] = useState<string[]>([]);
  const [histI, setHistI] = useState(-1);
  const out = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const os = useOs.getState;

  useEffect(() => {
    const el = out.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const later = (fn: () => void, ms: number) => timers.current.push(setTimeout(fn, ms));
  const push = (more: TermLine[]) => setLines((l) => [...l, ...more].slice(-220));

  const apply = (e: TermEffect) => {
    const s = os();
    switch (e.type) {
      case "openFile":
        return later(() => s.openIde(e.file), 450);
      case "resume":
        return later(() => os().goResume(), 400);
      case "url":
        return void window.open(e.url, "_blank", "noopener,noreferrer");
      case "win":
        return s.openWin(e.id);
      case "theme":
        return s.setTheme(e.id);
      case "retro":
        return later(() => os().toggleRetro(), 300);
      case "sound":
        return void (s.sound !== e.on && s.toggleSound());
      case "quest":
        return s.markDone(e.id);
      case "clear":
        return setLines([]);
      case "exit":
        return s.closeWin("term");
      case "hire":
        hireSequence.forEach((line, i) =>
          later(() => {
            push([line]);
            os().beep(500 + i * 90, 0.04);
          }, 380 * (i + 1)),
        );
        return later(() => os().openIde("contact"), 380 * (hireSequence.length + 1) + 300);
    }
  };

  const submit = () => {
    const cmd = input;
    setInput("");
    setHistI(-1);
    if (cmd.trim()) setHist((h) => [...h, cmd.trim()]);
    const res = runCommand(cmd, { retro: os().retro });
    push(res.lines);
    res.effects.forEach(apply);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    os().beep(900, 0.012);
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    } else if (e.key === "Tab") {
      if (!input) return; // let Tab move focus out of an empty prompt
      e.preventDefault();
      const r = complete(input);
      if (r.value) setInput(r.value);
      if (r.options) push([{ text: r.options.join("   "), kind: "dim" }]);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!hist.length) return;
      const i = histI === -1 ? hist.length - 1 : Math.max(0, histI - 1);
      setHistI(i);
      setInput(hist[i]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histI === -1) return;
      const i = histI + 1;
      setHistI(i >= hist.length ? -1 : i);
      setInput(i >= hist.length ? "" : hist[i]);
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  return (
    <WindowFrame id="term" title={terminalCopy.title} label="Terminal" className={styles.term}>
      <div ref={out} className={`${styles.termOut} scroll`} onClick={() => field.current?.focus()}>
        <div role="log" aria-live="polite" aria-label="Terminal output">
          {lines.map((l, i) => (
            <div key={i} className={`${styles.line} ${styles[`k_${l.kind}`]}`}>
              {l.text}
            </div>
          ))}
        </div>
        <div className={styles.prompt} data-quest="termin">
          <label htmlFor="term-in" className={styles.ps1}>
            {terminalCopy.prompt}
          </label>
          <input
            ref={field}
            id="term-in"
            data-autofocus=""
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            className={styles.termIn}
          />
        </div>
      </div>
    </WindowFrame>
  );
}
