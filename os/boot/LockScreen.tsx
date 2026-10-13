"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { links } from "@/content/links";
import { osCopy } from "@/content/os";
import { profile } from "@/content/profile";
import { useClock } from "@/hooks/useClock";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import { useOs } from "@/store/os";

import styles from "./boot.module.css";

/** Big clock + photo. Click or any key slides the curtain up. */
export function LockScreen() {
  const { time, date } = useClock();
  const finishBoot = useOs((s) => s.finishBoot);
  const beep = useOs((s) => s.beep);
  const reduced = useReducedMotion();
  const [leaving, setLeaving] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  const unlock = useCallback(() => {
    if (leaving) return;
    beep(660, 0.06);
    setLeaving(true);
    setTimeout(finishBoot, reduced ? 0 : 650);
  }, [beep, finishBoot, leaving, reduced]);

  useEffect(() => {
    ref.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.key === "Tab") return;
      e.preventDefault();
      unlock();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [unlock]);

  return (
    <button
      ref={ref}
      type="button"
      className={`${styles.lock} ${leaving ? styles.lockOut : ""}`}
      onClick={unlock}
      aria-label="Unlock andrey.os"
    >
      <span className={styles.lockWord} aria-hidden="true">
        {profile.lastName.toUpperCase()}
      </span>
      <span className={styles.lockTime}>{time}</span>
      <span className={styles.lockDate}>{date}</span>
      <span className={styles.lockPhoto}>
        <Image src={links.photo} alt="" width={92} height={92} priority />
      </span>
      <span className={styles.lockName}>{profile.name}</span>
      <span className={`${styles.lockHint} shimmer`}>{osCopy.unlock}</span>
    </button>
  );
}
