"use client";

import { DesktopIcons, OpenIdeNotice } from "./DesktopIcons";
import { Dock } from "./Dock";
import { QuestPill, Sticker } from "./Extras";
import { GhostCursor } from "./GhostCursor";
import { MenuBar } from "./MenuBar";
import { PhotoWindow } from "./PhotoWindow";
import { Wallpaper } from "./Wallpaper";
import styles from "./desktop.module.css";

interface Props {
  /** Covered by boot/lock or by the IDE: removed from tab order and the a11y tree. */
  hidden: boolean;
  /** IDE / resume on top: zoom + blur the desktop behind it. */
  dimmed: boolean;
}

export function Desktop({ hidden, dimmed }: Props) {
  return (
    <div className={`${styles.desktop} ${dimmed ? styles.dimmed : ""}`} inert={hidden}>
      <Wallpaper />
      <MenuBar />
      <main className={styles.surface}>
        <PhotoWindow />
        <OpenIdeNotice />
        <DesktopIcons />
        <Sticker />
        <QuestPill />
        <GhostCursor />
      </main>
      <Dock />
    </div>
  );
}
