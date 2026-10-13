"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { questCopy, quests } from "@/content/quests";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { pointer } from "@/lib/pointer";
import { questScore, useOs } from "@/store/os";

import styles from "./overlay.module.css";

export function Achievements() {
  const open = useOs((s) => s.questsOpen);
  const done = useOs((s) => s.done);
  const setOpen = useOs((s) => s.setQuestsOpen);
  const goQuest = useOs((s) => s.goQuest);
  const panel = useRef<HTMLElement>(null);
  const close = useCallback(() => setOpen(false), [setOpen]);
  useFocusTrap(panel, open, close);

  useEffect(() => {
    if (open) panel.current?.querySelector<HTMLElement>("button")?.focus();
  }, [open]);

  if (!open) return null;
  const n = quests.filter((q) => done[q.id]).length;

  return (
    <div className={styles.drawerWrap}>
      <button type="button" className={styles.drawerScrim} aria-label="Close achievements" tabIndex={-1} onClick={close} />
      <aside ref={panel} role="dialog" aria-modal="true" aria-labelledby="ach-title" className={`${styles.drawer} scroll`}>
        <div className={styles.drawerHead}>
          <div className={styles.drawerTop}>
            <span className={styles.eyebrow}>{questCopy.heading}</span>
            <button type="button" className={styles.x} aria-label="Close" onClick={close}>
              ×
            </button>
          </div>
          <h2 id="ach-title" className={styles.drawerTitle}>
            {questCopy.found(questScore(done))}
          </h2>
          <div className={styles.progress} role="progressbar" aria-valuemin={0} aria-valuemax={quests.length} aria-valuenow={n} aria-label="Achievements found">
            <div style={{ width: `${(n / quests.length) * 100}%` }} />
          </div>
          <p className={styles.drawerHelp}>{questCopy.help}</p>
        </div>
        <ul className={styles.quests}>
          {quests.map((q) => {
            const ok = !!done[q.id];
            return (
              <li key={q.id}>
                <button type="button" className={styles.quest} onClick={() => goQuest(q.id)}>
                  <span className={`${styles.box} ${ok ? styles.boxOn : ""}`} aria-hidden="true">
                    {ok ? "✓" : ""}
                  </span>
                  <span className={styles.questBody}>
                    <span className={`${styles.questLabel} ${ok ? styles.questDone : ""}`}>
                      {q.label}
                      <span className="sr-only">{ok ? " — done" : " — not found yet"}</span>
                    </span>
                    <span className={styles.questHint}>{q.hint}</span>
                  </span>
                  <span className={`${styles.questGo} ${ok ? styles.muted : ""}`} aria-hidden="true">
                    {q.secret ? (ok ? "FOUND" : "SECRET · HOW →") : ok ? "DONE" : "SHOW ME →"}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
}

/** Lime arrow + caption that flies from the pointer to the quest's target element. */
export function GuideCursor() {
  const guide = useOs((s) => s.guide);
  const setGuide = useOs((s) => s.setGuide);
  const [pos, setPos] = useState<{ x: number; y: number; flip: boolean } | null>(null);

  useEffect(() => {
    if (!guide) {
      setPos(null);
      return;
    }
    const el = [...document.querySelectorAll<HTMLElement>(`[data-quest="${guide.target}"]`)].find(
      (e) => e.getClientRects().length > 0 && !e.closest("[inert], [hidden]"),
    );
    if (!el) {
      setGuide(null);
      return;
    }
    el.scrollIntoView({ block: "nearest" });
    const r = el.getBoundingClientRect();
    const to = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    const from = pointer.seen ? { x: pointer.x, y: pointer.y } : { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const flip = to.x > window.innerWidth - 280;
    setPos({ ...from, flip });
    // Two frames so the start position paints before the transition to the target.
    const t1 = setTimeout(() => setPos({ ...to, flip }), 40);
    const t2 = setTimeout(() => setGuide(null), 5600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [guide, setGuide]);

  if (!guide || !pos) return null;
  return (
    <div className={styles.guide} style={{ left: pos.x, top: pos.y }} aria-hidden="true">
      <span className={styles.guideRing} />
      <svg className={styles.guideTap} width="28" height="32" viewBox="0 0 26 30">
        <path d="M2 2 L2 24 L8 18.5 L12.5 28 L16.5 26.2 L12 17 L20 17 Z" fill="var(--accent)" stroke="#0b0b0c" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
      <span className={styles.guideLabel} style={{ left: pos.flip ? -250 : 26 }}>
        {guide.label}
      </span>
    </div>
  );
}
