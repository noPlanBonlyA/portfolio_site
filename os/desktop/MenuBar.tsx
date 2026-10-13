"use client";

import { useClock } from "@/hooks/useClock";
import { questScore, useOs } from "@/store/os";

import styles from "./desktop.module.css";

export function MenuBar() {
  const { time } = useClock();
  const s = useOs();
  const score = questScore(s.done);

  return (
    <header className={styles.menu}>
      <nav className={styles.menuLeft} aria-label="Menu">
        <button type="button" data-quest="reboot" className={styles.menuBrand} onClick={s.reboot} title="Reboot andrey.os">
          <span className={styles.menuDot} aria-hidden="true" />
          andrey.os
        </button>
        <button type="button" className={styles.menuItem} onClick={() => s.openIde("readme")}>
          Portfolio
        </button>
        <button type="button" className={styles.menuItem} onClick={s.goResume}>
          Resume
        </button>
        <button type="button" className={styles.menuItem} onClick={() => s.openWin("term")}>
          Terminal
        </button>
        <button type="button" className={styles.menuItem} onClick={() => s.openIde("contact")}>
          Contact
        </button>
        <button type="button" className={`${styles.menuItem} ${styles.menuAccent}`} onClick={() => s.setQuestsOpen(true)}>
          ★ Achievements {score}
        </button>
      </nav>
      <div className={styles.menuRight}>
        <button type="button" data-quest="pal" className={styles.kbd} onClick={() => s.setPal(true)} aria-label="Open command palette (⌘K)">
          ⌘K
        </button>
        <button
          type="button"
          className={styles.menuItem}
          onClick={s.toggleSound}
          aria-label={s.sound ? "Turn sound off" : "Turn sound on"}
          aria-pressed={s.sound}
        >
          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 9h4l5-4v14l-5-4H4z" />
            {s.sound ? <path d="M17 9c1.5 1.5 1.5 4.5 0 6" /> : <path d="M17 9l4 6M21 9l-4 6" />}
          </svg>
          {s.sound ? "ON" : "OFF"}
        </button>
        <time className={styles.menuClock}>{time}</time>
      </div>
    </header>
  );
}
