"use client";

import { useEffect, useRef, useState } from "react";

import { bios, osCopy } from "@/content/os";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import { useOs } from "@/store/os";

import styles from "./boot.module.css";

const STEP = 190;

/** First-visit boot log. Any key or click skips to the lock screen. */
export function Bios() {
  const setBoot = useOs((s) => s.setBoot);
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    ref.current?.focus({ preventScroll: true });
    const toLock = () => setBoot("lock");
    if (reduced) {
      setCount(bios.length);
      const t = setTimeout(toLock, 900);
      return () => clearTimeout(t);
    }
    const timers = bios.map((_, i) => setTimeout(() => setCount(i + 1), 200 + i * STEP));
    timers.push(setTimeout(toLock, 200 + bios.length * STEP + 600));
    return () => timers.forEach(clearTimeout);
  }, [reduced, setBoot]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      e.preventDefault();
      setBoot("lock");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setBoot]);

  return (
    <button ref={ref} type="button" className={styles.bios} onClick={() => setBoot("lock")} aria-label="Skip boot">
      <span aria-hidden="true">
        {bios.slice(0, count).map((l, i) => (
          <span key={i} className={styles.biosLine}>
            {l.ok && <span className={styles.ok}>[  OK  ] </span>}
            {l.text}
          </span>
        ))}
        <span className="caret" />
      </span>
      <span className={styles.biosSkip} aria-hidden="true">
        {osCopy.biosSkip}
      </span>
    </button>
  );
}
