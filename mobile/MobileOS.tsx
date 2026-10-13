"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState, type PointerEvent } from "react";

import { links } from "@/content/links";
import { mobileCopy, osCopy } from "@/content/os";
import { profile } from "@/content/profile";
import type { FileId } from "@/content/ide";
import { useClock } from "@/hooks/useClock";
import { useReducedMotion } from "@/hooks/useMediaQuery";

import styles from "./mobile.module.css";

const Apps = dynamic(() => import("./apps"), { ssr: false });

export type Screen = "home" | "ide" | "resume" | "term" | "msg";
export interface Route {
  screen: Screen;
  file: FileId | null;
}

export interface Nav {
  go: (r: Route) => void;
  /** One step back (file → explorer, app → previous). */
  back: () => void;
  /** Straight to the home screen. */
  home: () => void;
}

const HOME: Route = { screen: "home", file: null };

/**
 * Phone version: lock screen (swipe up / tap) → home screen → full-screen apps.
 * Each app is a history entry, so the system back gesture closes it.
 */
export default function MobileOS() {
  const [locked, setLocked] = useState(true);
  const [route, setRoute] = useState<Route>(HOME);
  const [hintDone, setHintDone] = useState(false);
  const depth = useRef(0);

  useEffect(() => {
    // A reload starts on the home screen: drop app state left in the current history entry.
    if (history.state?.m) history.replaceState({ ...history.state, m: undefined, d: 0 }, "");
    const onPop = (e: PopStateEvent) => {
      const st = e.state as { m?: Route; d?: number } | null;
      depth.current = st?.d ?? 0;
      setRoute(st?.m ?? HOME);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const nav = useMemo<Nav>(
    () => ({
      go: (next) => {
        if (next.screen === "ide") setHintDone(true);
        depth.current += 1;
        history.pushState({ m: next, d: depth.current }, "");
        setRoute(next);
      },
      back: () => (depth.current > 0 ? history.back() : setRoute(HOME)),
      home: () => (depth.current > 0 ? history.go(-depth.current) : setRoute(HOME)),
    }),
    [],
  );

  const open = (screen: Screen, file: FileId | null = null) => nav.go({ screen, file });

  return (
    <div className={styles.phone}>
      <Home hidden={locked || route.screen !== "home"} hintDone={hintDone} open={open} />
      {route.screen !== "home" && <Apps route={route} nav={nav} />}
      {locked && <Lock onUnlock={() => setLocked(false)} />}
    </div>
  );
}

/* ---------- lock ---------- */

function Lock({ onUnlock }: { onUnlock: () => void }) {
  const { time, date } = useClock();
  const reduced = useReducedMotion();
  const [leaving, setLeaving] = useState(false);
  const startY = useRef<number | null>(null);
  const ref = useRef<HTMLButtonElement>(null);

  const unlock = () => {
    if (leaving) return;
    setLeaving(true);
    setTimeout(onUnlock, reduced ? 0 : 600);
  };

  useEffect(() => ref.current?.focus({ preventScroll: true }), []);

  const onDown = (e: PointerEvent<HTMLButtonElement>) => {
    startY.current = e.clientY;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onUp = (e: PointerEvent) => {
    if (startY.current !== null && startY.current - e.clientY > 40) unlock();
    startY.current = null;
  };

  return (
    <button
      ref={ref}
      type="button"
      className={`${styles.lock} ${leaving ? styles.lockOut : ""}`}
      onClick={unlock}
      onPointerDown={onDown}
      onPointerUp={onUp}
      aria-label="Unlock — swipe up or tap"
    >
      <span className={styles.bgWord} aria-hidden="true">
        {profile.lastName.toUpperCase()}
      </span>
      <span className={styles.lockDate}>{date}</span>
      <span className={styles.lockTime}>{time}</span>
      <span className={styles.lockNotice}>
        <span className={styles.appGlyph} aria-hidden="true">
          &lt;/&gt;
        </span>
        <span>
          <span className={styles.noticeHead}>{osCopy.noticeApp} · now</span>
          <span className={styles.noticeBody}>{mobileCopy.lockNotice}</span>
        </span>
      </span>
      <span className={styles.lockFoot}>
        <Image src={links.photo} alt="" width={64} height={64} priority className={styles.lockPhoto} />
        <span className="shimmer">{mobileCopy.swipe}</span>
        <span className={styles.homeBar} aria-hidden="true" />
      </span>
    </button>
  );
}

/* ---------- home ---------- */

interface AppTile {
  label: string;
  glyph: string;
  bg: string;
  fg: string;
  screen?: Screen;
  file?: FileId;
  href?: string;
}

const APPS: AppTile[] = [
  { label: "Portfolio", glyph: "</>", bg: "var(--accent)", fg: "var(--on-accent)", screen: "ide" },
  { label: "Resume", glyph: "CV", bg: "#ecebe6", fg: "#0b0b0c", screen: "resume" },
  { label: "Terminal", glyph: ">_", bg: "#0e0e10", fg: "var(--accent)", screen: "term" },
  { label: "Messages", glyph: "…", bg: "#8ec5ff", fg: "#0b0b0c", screen: "msg" },
  { label: "GitHub", glyph: "GH", bg: "#2a2a2e", fg: "#ecebe6", href: links.github },
  { label: "Telegram", glyph: "TG", bg: "#1b1b1e", fg: "#8ec5ff", href: links.telegram },
  { label: "Music", glyph: "♪", bg: "#ff7a59", fg: "#0b0b0c", href: links.spotify },
  { label: "Contact", glyph: "$_", bg: "#1d2416", fg: "var(--accent)", screen: "ide", file: "contact" },
];

function Tile({ app, open, badge, dock }: { app: AppTile; open: (s: Screen, f?: FileId | null) => void; badge?: boolean; dock?: boolean }) {
  const glyph = (
    <span className={`${dock ? styles.dockTile : styles.tile} ${badge ? styles.pulse : ""}`} style={{ background: app.bg, color: app.fg }} aria-hidden="true">
      {app.glyph}
      {badge && <span className={styles.badge}>1</span>}
    </span>
  );
  const label = !dock && <span className={styles.tileLabel}>{app.label}</span>;
  if (app.href)
    return (
      <a href={app.href} target="_blank" rel="noopener noreferrer" className={`${styles.app} tap`} aria-label={`${app.label} (opens in a new tab)`}>
        {glyph}
        {label}
      </a>
    );
  return (
    <button type="button" className={`${styles.app} tap`} aria-label={app.label} onClick={() => open(app.screen!, app.file ?? null)}>
      {glyph}
      {label}
    </button>
  );
}

function Home({ hidden, hintDone, open }: { hidden: boolean; hintDone: boolean; open: (s: Screen, f?: FileId | null) => void }) {
  const { time, date } = useClock();
  return (
    <main className={styles.home} inert={hidden}>
      <h1 className="sr-only">
        {profile.name} — {profile.role}
      </h1>
      <span className={styles.bgWord} aria-hidden="true">
        {profile.lastName.toUpperCase()}
      </span>

      <section className={styles.widget} aria-label="Profile">
        <Image src={links.photo} alt={profile.photoAlt} width={64} height={64} priority className={styles.widgetPhoto} />
        <div>
          <p className={styles.widgetName}>{profile.name}</p>
          <p className={styles.widgetRole}>
            {profile.role} · {profile.locationShort}
          </p>
          <p className={styles.widgetStatus}>
            <span className={styles.dot} aria-hidden="true" />
            {profile.statusShort}
          </p>
        </div>
      </section>

      <p className={styles.homeTime} aria-hidden="true">
        {time}
      </p>
      <p className={styles.homeDate} aria-hidden="true">
        {date}
      </p>

      <nav className={styles.grid} aria-label="Apps">
        {APPS.map((a, i) => (
          <Tile key={a.label} app={a} open={open} badge={i === 0 && !hintDone} />
        ))}
      </nav>

      {!hintDone && (
        <div className={styles.startHere} aria-hidden="true">
          <span className={styles.accent}>↑</span>
          <span className={styles.startTag}>{mobileCopy.startHere}</span>
        </div>
      )}

      <aside className={styles.desktopHint}>
        <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.6">
          <rect x="3" y="4" width="18" height="12" rx="1.5" />
          <path d="M8 20h8M12 16v4" />
        </svg>
        <span>
          <span className={styles.hintTitle}>{mobileCopy.desktopTitle}</span>
          <span className={styles.hintBody}>{mobileCopy.desktopBody}</span>
        </span>
      </aside>

      <nav className={styles.dock} aria-label="Dock">
        {APPS.slice(0, 4).map((a) => (
          <Tile key={a.label} app={a} open={open} dock />
        ))}
      </nav>
    </main>
  );
}
