"use client";

import { useEffect, useRef } from "react";

import { fileById, ideCopy, themes } from "@/content/ide";
import { profile } from "@/content/profile";
import { projectById } from "@/content/projects";
import { useScramble } from "@/hooks/useScramble";
import { questScore, useOs } from "@/store/os";

import styles from "./ide.module.css";

export function TitleBar() {
  const setPhase = useOs((s) => s.setPhase);
  const setPal = useOs((s) => s.setPal);
  const summarize = useOs((s) => s.summarize);
  const path = useOs((s) => fileById(s.activeFile)?.path);
  return (
    <div className={styles.titleBar}>
      <div className={styles.lights}>
        <button type="button" className={`${styles.tl} ${styles.tlClose}`} aria-label="Close IDE and go to desktop" onClick={() => setPhase("desktop")} />
        <button type="button" className={`${styles.tl} ${styles.tlMin}`} aria-label="Minimize to desktop" onClick={() => setPhase("desktop")} />
        <span className={styles.tl} aria-hidden="true" />
      </div>
      <button type="button" className={styles.search} onClick={() => setPal(true)}>
        <span className={styles.searchText}>{path} — search files &amp; commands</span>
        <span className={styles.searchKbd}>⌘K</span>
      </button>
      <button type="button" className={styles.sumBtn} data-quest="sum" data-cursor="sum" data-mag="" onClick={summarize}>
        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6" />
        </svg>
        SUMMARIZE → CV
      </button>
    </div>
  );
}

export function BottomPanel() {
  const tab = useOs((s) => s.termTab);
  const setTab = useOs((s) => s.setTermTab);
  const run = useOs((s) => s.run);
  const active = useOs((s) => s.activeFile);
  const openFile = useOs((s) => s.openFile);
  const path = fileById(active)?.path ?? "";
  const [term] = useScramble(`$ code ${path}`);
  const out = useRef<HTMLDivElement>(null);
  const bar = projectById("p4")?.runBar;

  useEffect(() => {
    const el = out.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [run]);

  return (
    <div className={styles.panel}>
      <div role="tablist" aria-label="Panel" className={styles.panelTabs}>
        {(["terminal", "problems"] as const).map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            className={`${styles.panelTab} ${tab === t ? styles.panelTabOn : ""}`}
            onClick={() => setTab(t)}
          >
            {t.toUpperCase()}
            {t === "problems" && <span className={styles.warn}> 1</span>}
          </button>
        ))}
      </div>
      {tab === "terminal" ? (
        <div ref={out} className={`${styles.panelBody} scroll`} role="log" aria-live="polite" aria-label="Terminal output">
          <div>
            <span className={styles.accent}>$</span> <span className={styles.c}>whoami</span>
          </div>
          <div className={styles.muted}>andrey — full stack developer</div>
          {run.lines.map((l, i) =>
            l.kind === "bar" && bar ? (
              <div key={i} className={styles.loadRow}>
                <span className={styles.muted}>{bar.label}</span>
                <span className={styles.loadTrack}>
                  <span className={styles.loadBar} />
                </span>
                <span className={styles.accent}>
                  {bar.from} → {bar.to}
                </span>
              </div>
            ) : (
              <div key={i} className={`${styles.runLine} ${styles[`run_${l.kind}`]}`}>
                {l.text}
              </div>
            ),
          )}
          <div>
            <span className={styles.accent} aria-hidden="true">
              {term}
            </span>
            <span className="caret" />
          </div>
        </div>
      ) : (
        <div className={styles.problems}>
          <span className={styles.warn} aria-hidden="true">
            ⚠
          </span>
          <span>{ideCopy.problem}</span>
          <span className={styles.muted}>{ideCopy.problemLocation}</span>
          <button type="button" className={styles.chip} onClick={() => openFile("contact")}>
            {ideCopy.quickFix}
          </button>
        </div>
      )}
    </div>
  );
}

export function StatusBar() {
  const theme = useOs((s) => s.theme);
  const cycleTheme = useOs((s) => s.cycleTheme);
  const setTab = useOs((s) => s.setTermTab);
  const openQuests = useOs((s) => s.setQuestsOpen);
  const done = useOs((s) => s.done);
  const hl = useOs((s) => s.hlCount);
  const lang = useOs((s) => fileById(s.activeFile)?.lang);
  return (
    <footer className={styles.statusBar}>
      <div className={styles.statusGroup}>
        <span>⎇ {ideCopy.branch}</span>
        <button type="button" onClick={() => setTab("problems")}>
          ⚠ 1 warning
        </button>
        <span>● {profile.status}</span>
        {hl > 0 && <span role="status">{hl} matches</span>}
      </div>
      <div className={styles.statusGroup}>
        <button type="button" onClick={() => openQuests(true)} aria-label={`Achievements ${questScore(done)}`}>
          ★ {questScore(done)}
        </button>
        <button type="button" data-quest="theme" onClick={cycleTheme} aria-label={`Theme: ${themes[theme].name}. Switch theme`}>
          ◐ {themes[theme].name}
        </button>
        <span>{lang}</span>
        <span>UTF-8</span>
      </div>
    </footer>
  );
}
