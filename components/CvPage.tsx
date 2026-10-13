import Link from "next/link";

import { ResumePaper } from "@/components/shared/ResumePaper";
import type { Resume } from "@/content/resume";

import styles from "./CvPage.module.css";

/** Plain, static CV page (/cv, /cv/ru): fast, printable, no OS — for direct links and reduced-motion users. */
export function CvPage({ resume }: { resume: Resume }) {
  const isRu = resume.lang === "ru";
  return (
    <div className={`${styles.page} dot-grid`}>
      <nav className={styles.bar} aria-label="CV">
        <Link href="/" className={styles.btn}>
          ← andrey.os
        </Link>
        <div className={styles.lang} role="group" aria-label="Language">
          <Link href="/cv" aria-current={isRu ? undefined : "page"} className={isRu ? "" : styles.on}>
            EN
          </Link>
          <Link href="/cv/ru" aria-current={isRu ? "page" : undefined} className={isRu ? styles.on : ""}>
            RU
          </Link>
        </div>
        <a href={resume.pdf.href} download={resume.pdf.filename} className={styles.download}>
          {isRu ? "СКАЧАТЬ PDF ↓" : "DOWNLOAD PDF ↓"}
        </a>
      </nav>
      <main className={styles.main}>
        <ResumePaper resume={resume} />
      </main>
    </div>
  );
}
