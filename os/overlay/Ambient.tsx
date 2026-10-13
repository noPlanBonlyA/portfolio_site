"use client";

import { useEffect, useRef } from "react";

import { osCopy } from "@/content/os";
import { useOs } from "@/store/os";

import styles from "./overlay.module.css";

const IDLE_MS = 30_000;
/** Pointer travel (px) that counts as "the visitor is here" — micro-jitter doesn't reset the timer. */
const WAKE_PX = 10;

/**
 * Screensaver after 30 s of no real activity on the desktop (not while a field has focus,
 * a dialog is open or a window is being dragged). Any real movement or key wakes it.
 */
export function Sleep() {
  const sleeping = useOs((s) => s.sleeping);
  const setSleeping = useOs((s) => s.setSleeping);
  const last = useRef(Date.now());

  useEffect(() => {
    let travel = 0;
    let px = -1;
    let py = -1;
    const active = () => {
      last.current = Date.now();
      travel = 0;
      if (useOs.getState().sleeping) setSleeping(false);
    };
    const onMove = (e: PointerEvent) => {
      if (px >= 0) travel += Math.abs(e.clientX - px) + Math.abs(e.clientY - py);
      px = e.clientX;
      py = e.clientY;
      if (travel > WAKE_PX) active();
    };
    const t = setInterval(() => {
      const s = useOs.getState();
      const typing = document.activeElement?.matches("input, textarea");
      const busy = s.boot !== "on" || s.phase !== "desktop" || s.palOpen || s.questsOpen || s.trashAsk || typing;
      if (busy) last.current = Date.now();
      else if (!s.sleeping && Date.now() - last.current > IDLE_MS) setSleeping(true);
    }, 1000);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", active);
    window.addEventListener("keydown", active);
    window.addEventListener("wheel", active, { passive: true });
    window.addEventListener("touchstart", active, { passive: true });
    return () => {
      clearInterval(t);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", active);
      window.removeEventListener("keydown", active);
      window.removeEventListener("wheel", active);
      window.removeEventListener("touchstart", active);
    };
  }, [setSleeping]);

  if (!sleeping) return null;
  return (
    <div className={styles.sleep} aria-hidden="true">
      <div className={styles.dvdx}>
        <div className={styles.dvdy}>
          <div className={styles.dvdLogo}>andrey.os</div>
        </div>
      </div>
      <div className={styles.sleepHint}>{osCopy.sleep}</div>
    </div>
  );
}

/** 8-bit mode: CRT scanlines over everything (the pixel font comes from the .retro class). */
export function RetroOverlay() {
  const retro = useOs((s) => s.retro);
  if (!retro) return null;
  return <div className={styles.scanlines} aria-hidden="true" />;
}
