"use client";

import Link from "next/link";

import { useOs } from "@/store/os";

import styles from "./overlay.module.css";

// Temporary: stands in for the IDE (step 3) and the resume view (step 4).
export function PhaseStub() {
  const phase = useOs((s) => s.phase);
  const file = useOs((s) => s.activeFile);
  const setPhase = useOs((s) => s.setPhase);
  return (
    <div className={styles.stub} role="dialog" aria-label="Coming soon">
      <div className={styles.stubCard}>
        <p>{phase === "resume" ? "resume view — step 4" : `portfolio.ide › ${file} — step 3`}</p>
        <p>
          <Link href="/cv" className={styles.secondary} style={{ display: "inline-flex", alignItems: "center" }}>
            plain CV →
          </Link>{" "}
          <button type="button" className={styles.primary} onClick={() => setPhase("desktop")} autoFocus>
            ← Desktop
          </button>
        </p>
      </div>
    </div>
  );
}
