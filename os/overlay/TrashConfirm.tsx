"use client";

import { useEffect, useRef } from "react";

import { trashCopy } from "@/content/apps";
import { useOs } from "@/store/os";

import styles from "./overlay.module.css";

/** "Move andrey.jpg to Trash?" — shown after the photo is dropped on the Trash. */
export function TrashConfirm() {
  const ask = useOs((s) => s.trashAsk);
  const keep = useOs((s) => s.keepPhoto);
  const del = useOs((s) => s.deletePhoto);
  const keepRef = useRef<HTMLButtonElement>(null);
  const delRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!ask) return;
    const prev = document.activeElement as HTMLElement | null;
    keepRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        keep();
      } else if (e.key === "Tab") {
        // Two-button focus trap.
        e.preventDefault();
        (document.activeElement === keepRef.current ? delRef : keepRef).current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      prev?.focus?.({ preventScroll: true });
    };
  }, [ask, keep]);

  if (!ask) return null;
  return (
    <div className={styles.scrim}>
      <div role="alertdialog" aria-modal="true" aria-labelledby="trash-title" aria-describedby="trash-body" className={styles.dialog}>
        <h2 id="trash-title" className={styles.dialogTitle}>
          {trashCopy.askTitle}
        </h2>
        <p id="trash-body" className={styles.dialogBody}>
          {trashCopy.askBody}
        </p>
        <div className={styles.dialogActions}>
          <button ref={keepRef} type="button" className={styles.primary} onClick={keep}>
            {trashCopy.keep}
          </button>
          <button ref={delRef} type="button" className={styles.secondary} onClick={del}>
            {trashCopy.del}
          </button>
        </div>
      </div>
    </div>
  );
}
