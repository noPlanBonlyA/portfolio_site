import type { ReactNode } from "react";

import { links } from "@/content/links";
import type { Resume } from "@/content/resume";

import styles from "./ResumePaper.module.css";

/** Renders `**bold**` fragments from resume strings. */
function rich(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") ? <strong key={i}>{part.slice(2, -2)}</strong> : part,
  );
}

interface Props {
  resume: Resume;
  /** Overrides for the name/title while the EN↔RU scramble runs. */
  name?: string;
  title?: string;
  className?: string;
  id?: string;
}

/** The light "printed" CV sheet. Pure markup — usable from server and client components. */
export function ResumePaper({ resume: r, name, title, className, id }: Props) {
  return (
    <article id={id} lang={r.lang} className={[styles.paper, className].filter(Boolean).join(" ")}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.name}>{name ?? r.name}</h1>
          <p className={styles.title}>
            {title ?? r.title} <span className={styles.titleStack}>{r.titleStack}</span>
          </p>
        </div>
        <span className={styles.mark} aria-hidden="true" />
      </header>

      <p className={styles.contacts}>
        <span>{r.location}</span>
        <a href={links.telegram} target="_blank" rel="noopener noreferrer">
          TG: {links.telegramHandle}
        </a>
        <a href={links.github} target="_blank" rel="noopener noreferrer">
          {links.githubLabel}
        </a>
      </p>

      <section className={styles.section} aria-labelledby={`${r.lang}-summary`}>
        <h2 id={`${r.lang}-summary`} className={styles.h2}>{r.headings.summary}</h2>
        <p className={styles.summary}>{r.summary}</p>
      </section>

      <section className={styles.section} aria-labelledby={`${r.lang}-exp`}>
        <h2 id={`${r.lang}-exp`} className={styles.h2}>{r.headings.experience}</h2>
        {r.jobs.map((j) => (
          <div key={j.id} className={styles.job}>
            <div className={styles.jobHead}>
              <h3 className={styles.role}>
                {j.role} <span className={styles.company}>— {j.company}</span>
              </h3>
              <span className={styles.period}>{j.period}</span>
            </div>
            <ul className={styles.bullets}>
              {j.bullets.map((b) => (
                <li key={b}>{rich(b)}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className={styles.section} aria-labelledby={`${r.lang}-skills`}>
        <h2 id={`${r.lang}-skills`} className={styles.h2}>{r.headings.skills}</h2>
        <dl className={styles.rows}>
          {r.skills.map((g) => (
            <div key={g.label} className={styles.row}>
              <dt>{g.label}</dt>
              <dd>{g.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className={styles.section} aria-labelledby={`${r.lang}-edu`}>
        <h2 id={`${r.lang}-edu`} className={styles.h2}>{r.headings.education}</h2>
        <dl className={styles.rows}>
          {[r.education, r.languages].map((g) => (
            <div key={g.label} className={styles.row}>
              <dt>{g.label}</dt>
              <dd>{g.value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </article>
  );
}
