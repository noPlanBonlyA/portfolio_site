"use client";

import { links } from "@/content/links";
import { osCopy } from "@/content/os";
import { useOs } from "@/store/os";

import styles from "./desktop.module.css";

export function DesktopIcons() {
  const openIde = useOs((s) => s.openIde);
  const goResume = useOs((s) => s.goResume);
  const hintDone = useOs((s) => s.hintDone);
  const setHintDone = useOs((s) => s.setHintDone);

  return (
    <div className={styles.icons}>
      <button
        type="button"
        className={styles.icon}
        data-quest="ide"
        data-cursor="open"
        data-mag=""
        onClick={() => openIde("readme")}
        onPointerEnter={setHintDone}
        onFocus={setHintDone}
      >
        <span className={`${styles.ideTile} ${styles.breath}`} aria-hidden="true">
          &lt;/&gt;
          {!hintDone && (
            <>
              <span className={styles.ring} />
              <span className={styles.badge}>1</span>
            </>
          )}
        </span>
        <span className={styles.iconLabel}>portfolio.ide</span>
      </button>

      <button type="button" className={styles.icon} data-cursor="cv" data-mag="" onClick={goResume}>
        <span className={styles.pdfTile} aria-hidden="true">
          <span className={styles.pdfTag}>PDF</span>
          <span style={{ width: "80%" }} />
          <span />
          <span style={{ width: "60%" }} />
        </span>
        <span className={styles.iconLabel}>resume.pdf</span>
      </button>

      <a href={links.github} target="_blank" rel="noopener noreferrer" className={styles.icon} data-cursor="git" data-mag="">
        <span className={styles.folderTile} aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#b9b8b1" strokeWidth="1.6">
            <circle cx="6" cy="5" r="2" />
            <circle cx="6" cy="19" r="2" />
            <circle cx="18" cy="9" r="2" />
            <path d="M6 7v10M18 11c0 4-6 3-12 6" />
          </svg>
        </span>
        <span className={styles.iconLabel}>
          github<span className="sr-only"> (opens in a new tab)</span>
        </span>
      </a>
    </div>
  );
}

export function OpenIdeNotice() {
  const openIde = useOs((s) => s.openIde);
  const hintDone = useOs((s) => s.hintDone);
  if (hintDone) return null;
  return (
    <button type="button" className={styles.notice} data-cursor="open" onClick={() => openIde("readme")}>
      <span className={styles.noticeIcon} aria-hidden="true">
        &lt;/&gt;
      </span>
      <span className={styles.noticeBody}>
        <span className={styles.noticeHead}>
          <span>{osCopy.noticeApp}</span>
          <span className={styles.noticeTime}>now</span>
        </span>
        <span className={styles.noticeText}>{osCopy.noticeBody}</span>
      </span>
    </button>
  );
}
