"use client";

import { useEffect, useRef, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";

import type { WinId } from "@/content/apps";
import { useOs } from "@/store/os";

import styles from "./windows.module.css";

/** Positions survive close/reopen within the session. */
const offsets = new Map<WinId, { x: number; y: number }>();

interface Props {
  id: WinId;
  title: string;
  label: string;
  className: string;
  children: ReactNode;
}

/**
 * A draggable app window. Stays mounted while closed (`hidden`) so app state survives.
 * Drag by the title bar (pointer capture, clamped so the bar can't leave the screen),
 * click anywhere to bring to front, Esc closes.
 */
export function WindowFrame({ id, title, label, className, children }: Props) {
  const open = useOs((s) => s.wins[id]);
  const z = useOs((s) => s.z[id]);
  const focusWin = useOs((s) => s.focusWin);
  const closeWin = useOs((s) => s.closeWin);
  const ref = useRef<HTMLElement>(null);
  const drag = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!open || !el) return;
    const o = offsets.get(id);
    if (o) el.style.translate = `${o.x}px ${o.y}px`;
    const target = el.querySelector<HTMLElement>("[data-autofocus]") ?? el.querySelector<HTMLElement>("button:not([data-close]), input, a[href]");
    target?.focus({ preventScroll: true });
  }, [open, id]);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || (e.target as HTMLElement).closest("button")) return;
    const o = offsets.get(id) ?? { x: 0, y: 0 };
    drag.current = { sx: e.clientX, sy: e.clientY, ox: o.x, oy: o.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const el = ref.current;
    if (!d || !el) return;
    let x = d.ox + e.clientX - d.sx;
    let y = d.oy + e.clientY - d.sy;
    // Keep at least 80px of the title bar on screen, and never under the menu bar.
    const base = el.getBoundingClientRect();
    const left0 = base.left - (offsets.get(id)?.x ?? 0);
    const top0 = base.top - (offsets.get(id)?.y ?? 0);
    x = Math.min(Math.max(x, 80 - left0 - base.width), window.innerWidth - 80 - left0);
    y = Math.min(Math.max(y, 32 - top0), window.innerHeight - 60 - top0);
    offsets.set(id, { x, y });
    el.style.translate = `${x}px ${y}px`;
  };

  const onPointerUp = () => {
    drag.current = null;
  };

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      closeWin(id);
      document.querySelector<HTMLElement>(`[data-quest="dock-${id}"]`)?.focus({ preventScroll: true });
    }
  };

  return (
    <section
      ref={ref}
      data-win={id}
      className={`${styles.win} ${className}`}
      style={{ zIndex: z }}
      hidden={!open}
      aria-label={label}
      onPointerDownCapture={() => focusWin(id)}
      onFocusCapture={() => focusWin(id)}
      onKeyDown={onKeyDown}
    >
      <div
        className={styles.bar}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <button type="button" data-close="" className={`${styles.tl} ${styles.tlClose}`} aria-label={`Close ${label}`} onClick={() => closeWin(id)} />
        <span className={styles.tl} aria-hidden="true" />
        <span className={styles.tl} aria-hidden="true" />
        <span className={styles.title}>{title}</span>
      </div>
      {children}
    </section>
  );
}
