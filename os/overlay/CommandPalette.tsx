"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";

import { ideFiles, themeOrder, themes } from "@/content/ide";
import { osCopy } from "@/content/os";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useOs } from "@/store/os";

import styles from "./overlay.module.css";

interface Cmd {
  label: string;
  hint: string;
  run: () => void;
}

function commands(): Cmd[] {
  const s = useOs.getState();
  return [
    ...ideFiles.map((f) => ({ label: `Open ${f.path}`, hint: "FILE", run: () => s.openIde(f.id) })),
    { label: "Summarize → CV", hint: "COMMAND", run: () => s.summarize() },
    {
      label: "Run current file",
      hint: "COMMAND",
      run: () => {
        if (useOs.getState().phase !== "ide") s.openIde();
        setTimeout(() => useOs.getState().runFile(), 300);
      },
    },
    ...themeOrder.map((t) => ({ label: `Theme: ${themes[t].name}`, hint: "THEME", run: () => s.setTheme(t) })),
    { label: "Open Terminal", hint: "APP", run: () => s.openWin("term") },
    { label: "Open Task Manager", hint: "APP", run: () => s.openWin("task") },
    { label: "Open Messages (Andrey.bot)", hint: "APP", run: () => s.openWin("msg") },
    { label: "Open Now coding", hint: "APP", run: () => s.openWin("music") },
    { label: "Open Trash", hint: "APP", run: () => s.openWin("trash") },
    { label: "Open resume", hint: "NAV", run: () => s.goResume() },
    { label: "Go to desktop", hint: "NAV", run: () => s.setPhase("desktop") },
    { label: "Show achievements", hint: "NAV", run: () => s.setQuestsOpen(true) },
    { label: "Toggle sound", hint: "SETTING", run: () => s.toggleSound() },
    { label: "Reboot andrey.os", hint: "SYSTEM", run: () => s.reboot() },
  ];
}

export function CommandPalette() {
  const open = useOs((s) => s.palOpen);
  const setPal = useOs((s) => s.setPal);
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);
  const panel = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const close = useCallback(() => setPal(false), [setPal]);
  useFocusTrap(panel, open, close);

  const all = useMemo(() => (open ? commands() : []), [open]);
  const items = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return needle ? all.filter((c) => c.label.toLowerCase().includes(needle)) : all;
  }, [all, q]);
  const active = Math.min(i, Math.max(0, items.length - 1));

  useEffect(() => {
    if (!open) return;
    setQ("");
    setI(0);
    input.current?.focus();
  }, [open]);

  useEffect(() => {
    list.current?.querySelector(`[data-i="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  if (!open) return null;

  const run = (c: Cmd) => {
    setPal(false);
    c.run();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setI((n) => Math.min(items.length - 1, n + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setI((n) => Math.max(0, n - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (items[active]) run(items[active]);
    }
  };

  return (
    <div className={styles.palWrap}>
      <button type="button" className={styles.palScrim} aria-label="Close command palette" tabIndex={-1} onClick={close} />
      <div ref={panel} role="dialog" aria-modal="true" aria-label="Command palette" className={styles.pal}>
        <div className={styles.palHead}>
          <span aria-hidden="true" className={styles.accent}>
            ›
          </span>
          <input
            ref={input}
            role="combobox"
            aria-expanded="true"
            aria-controls="pal-list"
            aria-activedescendant={items[active] ? `pal-${active}` : undefined}
            aria-label="Search files and commands"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setI(0);
            }}
            onKeyDown={onKeyDown}
            placeholder={osCopy.palettePlaceholder}
            autoComplete="off"
            spellCheck={false}
            className={styles.palIn}
          />
          <kbd className={styles.kbd}>ESC</kbd>
        </div>
        <ul ref={list} id="pal-list" role="listbox" aria-label="Commands" className={`${styles.palList} scroll`}>
          {items.map((c, n) => (
            <li
              key={c.label}
              id={`pal-${n}`}
              data-i={n}
              role="option"
              aria-selected={n === active}
              className={`${styles.palItem} ${n === active ? styles.palOn : ""}`}
              onPointerEnter={() => setI(n)}
              onClick={() => run(c)}
            >
              <span>{c.label}</span>
              <span className={styles.palHint}>{c.hint}</span>
            </li>
          ))}
          {!items.length && <li className={styles.palEmpty}>{osCopy.paletteEmpty}</li>}
        </ul>
        <div className={styles.palFoot} aria-hidden="true">
          <span>↑↓ navigate</span>
          <span>↵ run</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  );
}
