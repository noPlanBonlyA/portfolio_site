"use client";

import { useEffect, useRef } from "react";

import { ideCopy } from "@/content/ide";
import { profile } from "@/content/profile";
import { useScramble } from "@/hooks/useScramble";
import { useOs } from "@/store/os";

import styles from "../ide.module.css";
import { Ln } from "./Code";

function Roll({ label }: { label: string }) {
  return (
    <span className="roll">
      <span className="roll-in">
        <span>{label}</span>
        <span aria-hidden="true">{label}</span>
      </span>
    </span>
  );
}

/** README.md — the IDE's home: hero, metrics, code teaser and the stack marquee. */
export function Readme() {
  const phase = useOs((s) => s.phase);
  const openFile = useOs((s) => s.openFile);
  const summarize = useOs((s) => s.summarize);
  const [a, playA] = useScramble(ideCopy.heroA);
  const [b, playB] = useScramble(ideCopy.heroB);
  const played = useRef(false);

  const hero = (delay: number) => {
    playA();
    setTimeout(() => playB(), delay);
  };

  // Scramble once when the IDE first opens on README (after the grow animation).
  useEffect(() => {
    if (phase !== "ide" || played.current) return;
    played.current = true;
    const t = setTimeout(() => hero(200), 450);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  return (
    <div className={styles.readme}>
      <div className={styles.readmeMeta}>
        <span className={styles.status}>
          <span className={styles.statusDot} aria-hidden="true" />
          {profile.status.toUpperCase()}
        </span>
        <span>{profile.stackLine.toUpperCase()}</span>
      </div>

      <h2 className={styles.hero} aria-label={profile.role} onPointerEnter={() => hero(160)}>
        <span aria-hidden="true">{a}</span>
        <span aria-hidden="true" className={styles.heroAccent}>
          {b}
        </span>
      </h2>

      <div className={styles.readmeRow}>
        <div className={styles.readmeLead}>
          <p className={styles.lead}>{profile.lead}</p>
          <div className={styles.ctas}>
            <button type="button" className={styles.ctaPrimary} data-mag="" onClick={() => openFile("p0")}>
              <Roll label="VIEW PROJECTS →" />
            </button>
            <button type="button" className={styles.ctaGhost} data-mag="" data-cursor="sum" onClick={summarize}>
              <Roll label="GET MY CV ↓" />
            </button>
          </div>
        </div>
        <dl className={styles.metrics}>
          {profile.metrics.map((m) => (
            <div key={m.label} className={styles.metric}>
              <dt className={styles.metricLabel}>{m.label}</dt>
              <dd className={styles.metricValue}>{m.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className={`${styles.code} ${styles.bleed} ${styles.readmeCode}`}>
        <Ln>
          <span className={styles.c}>{ideCopy.tip}</span>
        </Ln>
        <Ln>
          <span className={styles.k}>const</span> <span className={styles.n}>andrey</span>{" "}
          <span className={styles.n}>= {"{"}</span> <span className={styles.p}>role</span>
          <span className={styles.n}>:</span> <span className={styles.s}>&quot;{profile.role}&quot;</span>
          <span className={styles.n}>,</span> <span className={styles.p}>since</span>
          <span className={styles.n}>:</span> <span className={styles.s}>{profile.since}</span>
          <span className={styles.n}>,</span> <span className={styles.p}>status</span>
          <span className={styles.n}>:</span> <span className={styles.s}>&quot;shipping&quot;</span>{" "}
          <span className={styles.n}>{"};"}</span>
          <span className="caret" />
        </Ln>
      </div>

      <div className={`${styles.marqWrap} ${styles.bleed}`} aria-label="Technologies" role="group">
        <div className={styles.marq}>
          {[0, 1].map((copy) => (
            <span key={copy} className={styles.marqCopy} aria-hidden={copy === 1 || undefined}>
              {profile.marquee.map((t) => (
                <span key={t} className={styles.marqItem}>
                  {t} <span className={styles.marqSlash}>/</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
