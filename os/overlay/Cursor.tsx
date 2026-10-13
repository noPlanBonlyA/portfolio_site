"use client";

import { useEffect, useRef, useState } from "react";

import { useMediaQuery, useReducedMotion } from "@/hooks/useMediaQuery";
import { pointer } from "@/lib/pointer";

import styles from "./cursor.module.css";

/** [data-cursor] value → size class + caption. */
const MODES: Record<string, { size: "open" | "big"; label: string }> = {
  open: { size: "open", label: "OPEN\n</>" },
  about: { size: "big", label: "HELLO\n(drag me)" },
  cv: { size: "big", label: "READ\nCV" },
  git: { size: "big", label: "CODE" },
  hire: { size: "big", label: "HIRE" },
  sum: { size: "big", label: "→ CV" },
  dl: { size: "big", label: "SAVE" },
  run: { size: "big", label: "▶ RUN" },
};

const TEXTISH = "p, h1, h2, h3, li, dd, dt, input, textarea, #ide-editor";
const LERP = 0.22;
const MAGNET = { x: 0.25, y: 0.3 };

function modeOf(t: Element): string {
  const el = t.closest("[data-cursor], a, button");
  if (el) return el.getAttribute("data-cursor") || "link";
  return t.closest(TEXTISH) ? "text" : "default";
}

/**
 * Custom cursor: a white dot with mix-blend-mode: difference that eases after the pointer
 * and glitches every ~4.6 s. Ring over links, captioned disc over special targets, caret
 * over text; [data-mag] elements lean towards it. Fine pointers only.
 */
export function Cursor() {
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduced = useReducedMotion();
  const [mode, setMode] = useState("default");
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!fine) return;
    const html = document.documentElement;
    html.dataset.cursor = "custom";
    const pos = { x: pointer.x, y: pointer.y };
    let mag: HTMLElement | null = null;
    let magRect: DOMRect | null = null;
    let raf = 0;

    const loop = () => {
      const k = reduced ? 1 : LERP;
      pos.x += (pointer.x - pos.x) * k;
      pos.y += (pointer.y - pos.y) * k;
      if (root.current) root.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const releaseMagnet = () => {
      if (!mag) return;
      const old = mag;
      old.style.transition = "translate .4s var(--ease-out)";
      old.style.translate = "";
      setTimeout(() => (old.style.transition = ""), 420);
      mag = null;
      magRect = null;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      if (!pointer.seen) {
        pointer.seen = true;
        pos.x = e.clientX;
        pos.y = e.clientY;
      }
      root.current?.setAttribute("data-shown", "");
      if (mag && magRect && !reduced) {
        const dx = e.clientX - (magRect.left + magRect.width / 2);
        const dy = e.clientY - (magRect.top + magRect.height / 2);
        mag.style.translate = `${dx * MAGNET.x}px ${dy * MAGNET.y}px`;
      }
    };

    const onOver = (e: PointerEvent) => {
      const t = e.target as Element | null;
      if (!t?.closest) return;
      const m = t.closest<HTMLElement>("[data-mag]");
      if (m !== mag) {
        releaseMagnet();
        if (m) {
          mag = m;
          magRect = m.getBoundingClientRect();
        }
      }
      setMode(modeOf(t));
    };

    const onLeave = (e: PointerEvent) => {
      if (!e.relatedTarget) root.current?.removeAttribute("data-shown");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      releaseMagnet();
      delete html.dataset.cursor;
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onLeave);
    };
  }, [fine, reduced]);

  if (!fine) return null;
  const special = MODES[mode];
  const cls = special ? styles[special.size] : mode === "link" ? styles.link : mode === "text" ? styles.text : "";

  return (
    <div ref={root} className={styles.cur} aria-hidden="true">
      <div className={`${styles.dot} ${cls}`}>
        {special && (
          <span key={mode} className={styles.label}>
            {special.label}
          </span>
        )}
      </div>
    </div>
  );
}
