"use client";

import { profile } from "@/content/profile";
import { questCopy } from "@/content/quests";
import { questScore, useOs } from "@/store/os";

import styles from "./desktop.module.css";

/** Rotating "open to work" sticker → contact.sh. */
export function Sticker() {
  const openIde = useOs((s) => s.openIde);
  return (
    <button type="button" className={styles.sticker} data-cursor="hire" onClick={() => openIde("contact")} aria-label="Contact Andrey">
      <svg className={styles.spin} viewBox="0 0 132 132" width="132" height="132" aria-hidden="true">
        <defs>
          <path id="sticker-circle" d="M66,66 m-52,0 a52,52 0 1,1 104,0 a52,52 0 1,1 -104,0" />
        </defs>
        <circle cx="66" cy="66" r="65" fill="#141416" stroke="rgba(236,235,230,.16)" />
        <text fontFamily="var(--font-mono)" fontSize="10.5" letterSpacing="2.6" fill="#ecebe6">
          <textPath href="#sticker-circle">{profile.sticker}</textPath>
        </text>
      </svg>
      <span className={styles.stickerMark} aria-hidden="true">
        {profile.initials}
      </span>
    </button>
  );
}

/** Bottom-left: achievements pill + the "open portfolio.ide" prompt line. */
export function QuestPill() {
  const done = useOs((s) => s.done);
  const open = useOs((s) => s.setQuestsOpen);
  return (
    <>
      <button type="button" className={styles.qpill} onClick={() => open(true)}>
        <span className={styles.accent}>★</span>
        {questScore(done)} found <span className={styles.muted}>· {questCopy.pill}</span>
      </button>
      <p className={styles.openHint}>
        › open <span className={styles.accent}>portfolio.ide</span> to see my work <span className="caret" />
      </p>
    </>
  );
}

export function GlobalToast() {
  const toast = useOs((s) => s.toast);
  return (
    <div className={styles.toastRegion} role="status" aria-live="polite">
      {toast && (
        <div key={toast} className={styles.gtoast}>
          {toast}
        </div>
      )}
    </div>
  );
}
