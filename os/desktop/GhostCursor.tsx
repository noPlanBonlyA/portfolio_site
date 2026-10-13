"use client";

import { useEffect, useRef } from "react";

import { osCopy } from "@/content/os";
import { useOs } from "@/store/os";

import styles from "./desktop.module.css";

/**
 * A fake cursor with a "CLICK ME" tag that keeps flying to the real portfolio.ide icon
 * until the visitor hovers or opens it. Target is measured, not hard-coded.
 */
export function GhostCursor() {
  const hintDone = useOs((s) => s.hintDone);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hintDone) return;
    const place = () => {
      const el = ref.current;
      const icon = document.querySelector<HTMLElement>('[data-quest="ide"]');
      const host = el?.offsetParent as HTMLElement | null;
      if (!el || !icon || !host) return;
      const h = host.getBoundingClientRect();
      const r = icon.getBoundingClientRect();
      // Arrow tip lands slightly inside the tile's lower-left quadrant.
      el.style.setProperty("--sx", `${h.width * 0.46}px`);
      el.style.setProperty("--sy", `${h.height * 0.64}px`);
      el.style.setProperty("--tx", `${r.left - h.left + r.width * 0.45}px`);
      el.style.setProperty("--ty", `${r.top - h.top + 30}px`);
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [hintDone]);

  if (hintDone) return null;
  return (
    <div ref={ref} className={styles.ghost} aria-hidden="true">
      <svg width="26" height="30" viewBox="0 0 26 30">
        <path
          d="M2 2 L2 24 L8 18.5 L12.5 28 L16.5 26.2 L12 17 L20 17 Z"
          fill="#ecebe6"
          stroke="#0b0b0c"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
      <span className={styles.ghostTag}>{osCopy.ghost}</span>
    </div>
  );
}
