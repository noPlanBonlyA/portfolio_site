"use client";

import { ideFiles, type IdeFile } from "@/content/ide";
import { useScramble } from "@/hooks/useScramble";
import { useOs } from "@/store/os";

import styles from "./ide.module.css";

const iconClass: Record<IdeFile["icon"], string> = {
  "M↓": styles.icMd,
  "≡": styles.icLog,
  TS: styles.icMd,
  $_: styles.icSh,
};

function FileButton({ file }: { file: IdeFile }) {
  const active = useOs((s) => s.activeFile === file.id);
  const openFile = useOs((s) => s.openFile);
  const [name, play] = useScramble(file.name);
  return (
    <li>
      <button
        type="button"
        className={`${styles.file} ${active ? styles.fileOn : ""}`}
        style={{ paddingLeft: file.depth ? 48 : 30 }}
        aria-current={active ? "true" : undefined}
        onClick={() => openFile(file.id)}
        onPointerEnter={() => play()}
        onFocus={() => play()}
      >
        <span className={iconClass[file.icon]} aria-hidden="true">
          {file.icon}
        </span>
        <span className={styles.fileName} aria-label={file.name}>
          <span aria-hidden="true">{name}</span>
        </span>
      </button>
    </li>
  );
}

export function Explorer() {
  return (
    <nav aria-label="Explorer" className={styles.explorer}>
      <div className={styles.explorerTitle}>EXPLORER</div>
      <div className={styles.explorerRoot}>▾ PORTFOLIO</div>
      <ul className={styles.tree}>
        {ideFiles.map((f, i) => (
          <FileGroup key={f.id} file={f} first={f.depth === 1 && ideFiles[i - 1]?.depth === 0} />
        ))}
      </ul>
    </nav>
  );
}

function FileGroup({ file, first }: { file: IdeFile; first: boolean }) {
  return (
    <>
      {first && (
        <li className={styles.folder} aria-hidden="true">
          ▾ work/
        </li>
      )}
      <FileButton file={file} />
    </>
  );
}

const ACTIVITY = [
  "M4 4h9l3 3v13H4z M13 4v4h4M8 12h6M8 16h6",
  "M16 16l5 5 M11 5a6 6 0 1 0 0 12a6 6 0 1 0 0-12",
  "M6 7v10M18 11c0 4-6 3-12 6 M6 3a2 2 0 1 0 0 4a2 2 0 1 0 0-4 M6 17a2 2 0 1 0 0 4a2 2 0 1 0 0-4 M18 7a2 2 0 1 0 0 4a2 2 0 1 0 0-4",
  "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM15 14l5 3-5 3z",
];

export function ActivityBar() {
  return (
    <div className={styles.activity} aria-hidden="true">
      {ACTIVITY.map((d, i) => (
        <div key={i} className={`${styles.activityItem} ${i === 0 ? styles.activityOn : ""}`}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d={d} />
          </svg>
        </div>
      ))}
    </div>
  );
}
