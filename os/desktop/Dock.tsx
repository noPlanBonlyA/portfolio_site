"use client";

import { Fragment } from "react";

import { dockApps } from "@/content/apps";
import { useOs } from "@/store/os";

import styles from "./desktop.module.css";

export function Dock() {
  const wins = useOs((s) => s.wins);
  const openWin = useOs((s) => s.openWin);

  return (
    <nav aria-label="Dock" className={styles.dock}>
      {dockApps.map((app) => (
        <Fragment key={app.id}>
          {app.id === "trash" && <span className={styles.dockSep} aria-hidden="true" />}
          <button
            type="button"
            className={styles.dockItem}
            data-mag=""
            data-quest={`dock-${app.id}`}
            data-trash={app.id === "trash" ? "" : undefined}
            aria-label={wins[app.id] ? `${app.label} (open)` : app.label}
            onClick={() => openWin(app.id)}
          >
            <span className={styles.dockTip} aria-hidden="true">
              {app.label}
            </span>
            <span className={styles.dockTile} style={{ background: app.bg, color: app.fg }} aria-hidden="true">
              {app.glyph}
            </span>
            <span className={styles.dockDot} style={{ opacity: wins[app.id] ? 1 : 0 }} aria-hidden="true" />
          </button>
        </Fragment>
      ))}
    </nav>
  );
}
