"use client";

import { useEffect, useRef } from "react";

import { fileById, isProjectFile } from "@/content/ide";
import type { ProjectId } from "@/content/projects";
import { clearTwins, highlightTwins, selectedWord } from "@/lib/highlight";
import { useOs } from "@/store/os";

import { AboutMd, ContactSh, ExperienceLog, ProjectFile, StackTs } from "./files/Code";
import { Readme } from "./files/Readme";
import styles from "./ide.module.css";

export function Tabs() {
  const openFiles = useOs((s) => s.openFiles);
  const active = useOs((s) => s.activeFile);
  const openFile = useOs((s) => s.openFile);
  const closeFile = useOs((s) => s.closeFile);
  const runFile = useOs((s) => s.runFile);

  return (
    <div className={styles.tabBar}>
      <div role="tablist" aria-label="Open files" className={styles.tabs}>
        {openFiles.map((id) => {
          const f = fileById(id)!;
          const on = id === active;
          return (
            <div key={id} className={`${styles.tab} ${on ? styles.tabOn : ""}`}>
              <button
                type="button"
                role="tab"
                id={`tab-${id}`}
                aria-selected={on}
                aria-controls="ide-editor"
                tabIndex={on ? 0 : -1}
                className={styles.tabName}
                onClick={() => openFile(id)}
                onKeyDown={(e) => {
                  if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
                  const i = openFiles.indexOf(id) + (e.key === "ArrowRight" ? 1 : -1);
                  const next = openFiles[(i + openFiles.length) % openFiles.length];
                  openFile(next);
                  requestAnimationFrame(() => document.getElementById(`tab-${next}`)?.focus());
                }}
              >
                {f.name}
              </button>
              {openFiles.length > 1 && (
                <button type="button" className={styles.tabClose} aria-label={`Close ${f.name}`} onClick={() => closeFile(id)}>
                  ×
                </button>
              )}
            </div>
          );
        })}
      </div>
      {isProjectFile(active) && (
        <button type="button" className={styles.runBtn} data-quest="run" data-cursor="run" onClick={runFile}>
          ▶ RUN
        </button>
      )}
    </div>
  );
}

function FileView({ id }: { id: string }) {
  if (id === "readme") return <Readme />;
  if (isProjectFile(id)) return <ProjectFile id={id as ProjectId} />;
  if (id === "exp") return <ExperienceLog />;
  if (id === "stack") return <StackTs />;
  if (id === "about") return <AboutMd />;
  if (id === "contact") return <ContactSh />;
  return null;
}

export function Editor() {
  const active = useOs((s) => s.activeFile);
  const setHlCount = useOs((s) => s.setHlCount);
  const ref = useRef<HTMLDivElement>(null);
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollTo({ top: 0 });
    clearTwins(layer.current);
    setHlCount(0);
  }, [active, setHlCount]);

  useEffect(() => () => clearTwins(), []);

  const onSelect = () => {
    const root = ref.current;
    if (!root) return;
    const word = selectedWord(root);
    if (!word) {
      clearTwins(layer.current);
      setHlCount(0);
      return;
    }
    setHlCount(highlightTwins(root, layer.current, word));
  };

  const path = fileById(active)?.path ?? "";

  return (
    <>
      <div className={styles.crumbs}>portfolio › {path}</div>
      <div
        ref={ref}
        id="ide-editor"
        role="tabpanel"
        aria-labelledby={`tab-${active}`}
        tabIndex={0}
        data-quest="editor"
        className={`${styles.editor} scroll`}
        onMouseUp={onSelect}
        onKeyUp={(e) => e.shiftKey && onSelect()}
      >
        <div ref={layer} className={styles.twins} aria-hidden="true" data-hl-ignore="" />
        <FileView id={active} />
      </div>
    </>
  );
}
