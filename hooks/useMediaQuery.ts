"use client";

import { useSyncExternalStore } from "react";

/** `null` during SSR and the first hydration pass — callers render a neutral shell until it resolves. */
export function useMediaQuery(query: string): boolean | null {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => null,
  );
}

export const DESKTOP_QUERY = "(min-width: 1024px) and (hover: hover) and (pointer: fine)";

export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)") ?? false;
}
