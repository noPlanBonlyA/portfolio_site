"use client";

import Link from "next/link";

import { useOs } from "@/store/os";

import styles from "./overlay.module.css";

// Temporary: stands in for the resume view (step 4).
export function PhaseStub() {
  const setPhase = useOs((s) => s.setPhase);
  return (
    <div className={styles.stub} role="dialog" aria-label="Coming soon">
      <div className={styles.stubCard}>
        <p>resume view — step 4</p>
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
