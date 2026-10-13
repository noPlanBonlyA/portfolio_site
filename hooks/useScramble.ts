"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CHARS = "!<>-_\\/[]{}=+*^?#01";
const FRAMES = 16;
const FRAME_MS = 32;
const KEEP = new Set([" ", ".", "/"]);

function frame(text: string, f: number) {
  let out = "";
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    out += KEEP.has(c) || i < (f / FRAMES) * text.length ? c : CHARS[Math.floor(Math.random() * CHARS.length)];
  }
  return out;
}

const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Letters resolve left-to-right through random glyphs (~0.5 s).
 * Returns the text to render and `play()`; `play(next)` scrambles into a new string.
 * Under reduced motion it just swaps the text.
 */
export function useScramble(text: string): [string, (next?: string) => void] {
  const [shown, setShown] = useState(text);
  const timer = useRef<ReturnType<typeof setInterval>>(undefined);
  const target = useRef(text);

  const play = useCallback((next?: string) => {
    const final = next ?? target.current;
    target.current = final;
    clearInterval(timer.current);
    if (prefersReduced()) {
      setShown(final);
      return;
    }
    let f = 0;
    timer.current = setInterval(() => {
      f++;
      if (f >= FRAMES) {
        clearInterval(timer.current);
        setShown(final);
      } else setShown(frame(final, f));
    }, FRAME_MS);
  }, []);

  // External text change (e.g. EN → RU) scrambles into the new value.
  useEffect(() => {
    if (text !== target.current) play(text);
  }, [text, play]);

  useEffect(() => () => clearInterval(timer.current), []);

  return [shown, play];
}
