"use client";

import { useEffect } from "react";

import { useOs } from "@/store/os";

// Matched by physical key (event.code), so it works on the Russian layout too.
const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "KeyB", "KeyA"];

/** ⌘K / Ctrl+K anywhere, the Konami code, and the mechanical click sound. On window, not a focus root. */
export function useGlobalKeys() {
  useEffect(() => {
    let seq: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      const s = useOs.getState();
      if (s.boot !== "on") return;
      if ((e.metaKey || e.ctrlKey) && e.code === "KeyK") {
        e.preventDefault();
        s.setPal(!s.palOpen);
        return;
      }
      if ((e.target as Element | null)?.closest?.("input, textarea")) return;
      seq = [...seq, e.code].slice(-KONAMI.length);
      if (seq.join() === KONAMI.join()) {
        seq = [];
        s.toggleRetro();
      }
    };
    const onDown = () => useOs.getState().beep(420, 0.018);
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, []);
}
