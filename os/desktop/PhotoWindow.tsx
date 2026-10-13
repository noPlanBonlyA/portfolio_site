"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";

import { links } from "@/content/links";
import { profile } from "@/content/profile";
import { useOs } from "@/store/os";

import styles from "./desktop.module.css";

/** Extra hit area around the Trash tile so a sloppy drop still counts. */
const TRASH_SLOP = 56;

function overTrash(x: number, y: number, card: DOMRect) {
  const trash = document.querySelector<HTMLElement>("[data-trash]");
  if (!trash) return false;
  const r = trash.getBoundingClientRect();
  const pointerHit =
    x >= r.left - TRASH_SLOP && x <= r.right + TRASH_SLOP && y >= r.top - TRASH_SLOP && y <= r.bottom + TRASH_SLOP;
  const cardHit = card.left < r.right && card.right > r.left && card.top < r.bottom && card.bottom > r.top;
  return pointerHit || cardHit;
}

function setTrashHot(hot: boolean) {
  document.querySelector<HTMLElement>("[data-trash]")?.toggleAttribute("data-hot", hot);
}

/** Draggable andrey.jpg. Click opens about.md; dropping it on the Trash asks for confirmation. */
export function PhotoWindow() {
  const openIde = useOs((s) => s.openIde);
  const askTrash = useOs((s) => s.askTrash);
  const reset = useOs((s) => s.photoReset);
  const ref = useRef<HTMLButtonElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const drag = useRef<{ sx: number; sy: number; ox: number; oy: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const [dragging, setDragging] = useState(false);
  const [shake, setShake] = useState(false);

  const move = (x: number, y: number, animate: boolean) => {
    const el = ref.current;
    if (!el) return;
    pos.current = { x, y };
    el.style.transition = animate ? "translate .7s var(--ease-out), transform .6s var(--ease-out)" : "";
    el.style.translate = `${x}px ${y}px`;
  };

  useEffect(() => {
    if (!reset.n) return;
    move(0, 0, true);
    if (!reset.shake) return;
    setShake(true);
    const t = setTimeout(() => setShake(false), 700);
    return () => clearTimeout(t);
  }, [reset]);

  const onPointerDown = (e: PointerEvent<HTMLButtonElement>) => {
    if (e.button !== 0) return;
    drag.current = { sx: e.clientX, sy: e.clientY, ox: pos.current.x, oy: pos.current.y, moved: false };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent<HTMLButtonElement>) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.sx;
    const dy = e.clientY - d.sy;
    if (!d.moved && Math.abs(dx) + Math.abs(dy) < 5) return;
    if (!d.moved) {
      d.moved = true;
      setDragging(true);
    }
    move(d.ox + dx, d.oy + dy, false);
    setTrashHot(overTrash(e.clientX, e.clientY, e.currentTarget.getBoundingClientRect()));
  };

  const onPointerUp = (e: PointerEvent<HTMLButtonElement>) => {
    const d = drag.current;
    drag.current = null;
    if (!d?.moved) return;
    setDragging(false);
    setTrashHot(false);
    suppressClick.current = true;
    if (overTrash(e.clientX, e.clientY, e.currentTarget.getBoundingClientRect())) askTrash();
  };

  const onClick = () => {
    if (suppressClick.current) {
      suppressClick.current = false;
      return;
    }
    openIde("about");
  };

  // Keyboard equivalent of the drag gag.
  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Delete" || e.key === "Backspace") {
      e.preventDefault();
      askTrash();
    }
  };

  return (
    <button
      ref={ref}
      type="button"
      className={`${styles.photo} ${dragging ? styles.photoDragging : ""}`}
      data-quest="photo"
      data-cursor="about"
      aria-label="About Andrey — open about.md (drag me, or press Delete to trash)"
      onClick={onClick}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <span className={`${styles.photoInner} ${shake ? styles.shake : ""}`}>
        <span className={styles.photoBar}>
          <span className={styles.tl} />
          <span className={styles.tl} />
          <span className={styles.tl} />
          <span className={styles.photoName}>andrey.jpg</span>
        </span>
        <span className={styles.photoFrame}>
          <Image
            className={styles.photoImg}
            src={links.photo}
            alt={profile.photoAlt}
            width={306}
            height={368}
            sizes="(max-width: 1440px) 21vw, 300px"
            draggable={false}
            priority
          />
        </span>
        <span className={styles.photoFoot}>
          <span>{profile.name}</span>
          <span>Full Stack</span>
        </span>
      </span>
    </button>
  );
}
