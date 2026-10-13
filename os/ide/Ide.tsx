"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

import { ideCopy, themes } from "@/content/ide";
import { useScramble } from "@/hooks/useScramble";
import { useOs } from "@/store/os";

import { Editor, Tabs } from "./Editor";
import { ActivityBar, Explorer } from "./Explorer";
import { BottomPanel, StatusBar, TitleBar } from "./Panels";
import styles from "./ide.module.css";

/** Where the IDE grows from: the centre of the portfolio.ide icon on the desktop. */
function useIconOrigin() {
  const [origin, setOrigin] = useState("calc(100% - 92px) 182px");
  useEffect(() => {
    const measure = () => {
      const r = document.querySelector('[data-quest="ide"]')?.getBoundingClientRect();
      if (r) setOrigin(`${r.left + r.width / 2}px ${r.top + r.height / 2 - 10}px`);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  return origin;
}

/** Summarize, part 1: a lime beam sweeps the IDE while the label scrambles in. */
function ScanOverlay() {
  const [text, play] = useScramble(ideCopy.scan);
  useEffect(() => play(), [play]);
  return (
    <>
      <div className={styles.scan} aria-hidden="true" />
      <div className={styles.scanLabel} role="status">
        <span aria-hidden="true">{text}</span>
        <span className="sr-only">{ideCopy.scan}</span>
        <span className="caret" aria-hidden="true" />
      </div>
    </>
  );
}

/**
 * portfolio.ide. Always mounted once loaded so it can animate out of the desktop icon;
 * `inert` while closed. Phases scan/shrink/resume are driven by Summarize (step 4).
 */
export default function Ide() {
  const phase = useOs((s) => s.phase);
  const theme = useOs((s) => s.theme);
  const origin = useIconOrigin();
  const t = themes[theme];

  const open = phase === "ide" || phase === "scan";

  // Warm the resume chunk so Summarize never waits on the network.
  useEffect(() => {
    if (open) void import("../resume/ResumeView");
  }, [open]);

  // Keyboard users land in the IDE on open and back on the desktop icon on close.
  const wasOpen = useRef(open);
  useEffect(() => {
    if (open === wasOpen.current) return;
    wasOpen.current = open;
    if (open) {
      document.querySelector<HTMLElement>('[aria-label="Open files"] [aria-selected="true"]')?.focus({ preventScroll: true });
    } else if (phase === "desktop") {
      document.querySelector<HTMLElement>('[data-quest="ide"]')?.focus({ preventScroll: true });
    }
  }, [open, phase]);
  const state = phase === "desktop" ? "closed" : open ? "open" : phase === "shrink" ? "shrink" : "gone";

  const vars = {
    "--bg": t.bg,
    "--panel": t.panel,
    "--text": t.text,
    "--muted": t.muted,
    "--dim": t.dim,
    "--line": t.line,
    "--sel": t.sel,
    "--accent": t.accent,
    "--on-accent": t.on,
    "--k": t.k,
    "--p": t.p,
    "--c": t.c,
    "--s": t.s,
    transformOrigin: phase === "desktop" ? origin : "50% 50%",
  } as CSSProperties;

  return (
    <section className={styles.ide} data-state={state} style={vars} inert={!open} aria-label="portfolio.ide">
      <TitleBar />
      <div className={styles.body}>
        {phase === "scan" && <ScanOverlay />}
        <ActivityBar />
        <Explorer />
        <div className={styles.main}>
          <Tabs />
          <Editor />
          <BottomPanel />
        </div>
      </div>
      <StatusBar />
      <div className={styles.whiteout} aria-hidden="true" />
    </section>
  );
}
