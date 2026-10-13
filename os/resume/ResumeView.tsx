"use client";

import { useEffect, useRef } from "react";

import { ResumePaper } from "@/components/shared/ResumePaper";
import { resumes, type Lang } from "@/content/resume";
import { useScramble } from "@/hooks/useScramble";
import { useOs } from "@/store/os";

import styles from "./resume.module.css";

const LANGS: { id: Lang; label: string }[] = [
  { id: "en", label: "EN" },
  { id: "ru", label: "RU" },
];

/** Summarize, part 2: the CV "prints" out of a printer bar. EN/RU swap scrambles name + title. */
export default function ResumeView() {
  const lang = useOs((s) => s.lang);
  const setLang = useOs((s) => s.setLang);
  const setPhase = useOs((s) => s.setPhase);
  const resume = resumes[lang];
  const [name] = useScramble(resume.name);
  const [title] = useScramble(resume.title);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div ref={ref} className={`${styles.res} scroll`} tabIndex={-1} role="region" aria-label="Resume" data-print-root="">
      <nav className={styles.bar} aria-label="Resume">
        <div className={styles.group}>
          <button type="button" className={styles.btn} onClick={() => setPhase("ide")}>
            ← BACK TO IDE
          </button>
          <button type="button" className={styles.btn} onClick={() => setPhase("desktop")}>
            DESKTOP
          </button>
        </div>
        <div className={styles.lang} role="group" aria-label="Language">
          {LANGS.map((l) => (
            <button
              key={l.id}
              type="button"
              aria-pressed={lang === l.id}
              className={lang === l.id ? styles.on : ""}
              data-quest={l.id === "ru" ? "ru" : undefined}
              onClick={() => setLang(l.id)}
            >
              {l.label}
            </button>
          ))}
        </div>
        <a href={resume.pdf.href} download={resume.pdf.filename} className={styles.download} data-cursor="dl">
          <span className="roll">
            <span className="roll-in">
              <span>DOWNLOAD PDF ↓</span>
              <span aria-hidden="true">DOWNLOAD PDF ↓</span>
            </span>
          </span>
          <span className="sr-only"> ({lang === "ru" ? "Russian" : "English"})</span>
        </a>
      </nav>

      <div className={styles.printerWrap} aria-hidden="true">
        <div className={styles.printer}>
          <span className={styles.led} />
          PRINTING resume.pdf…
          <span className={styles.head} />
        </div>
      </div>

      <ResumePaper resume={resume} name={name} title={title} className={styles.paper} heading="h2" />
    </div>
  );
}
