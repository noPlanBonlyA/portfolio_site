"use client";

import { useEffect, type RefObject } from "react";

const FOCUSABLE = ["a[href]", "button:not([disabled])", "input:not([disabled])", "textarea", "[tabindex]"]
  .map((s) => `${s}:not([tabindex="-1"])`)
  .join(", ");

/**
 * While `active`: Tab cycles inside `ref`, Esc calls `onClose`, and focus returns
 * to whatever was focused before when the trap is released.
 */
export function useFocusTrap(ref: RefObject<HTMLElement | null>, active: boolean, onClose: () => void) {
  useEffect(() => {
    if (!active) return;
    const prev = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !ref.current) return;
      const items = [...ref.current.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((el) => el.offsetParent !== null);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => {
      window.removeEventListener("keydown", onKey, true);
      if (prev && document.contains(prev)) prev.focus({ preventScroll: true });
    };
  }, [active, onClose, ref]);
}
