"use client";

import { useEffect, type CSSProperties } from "react";

import { themes } from "@/content/ide";
import { consoleSecret } from "@/content/os";
import { useOs } from "@/store/os";

import { Bios } from "./boot/Bios";
import { LockScreen } from "./boot/LockScreen";
import { Desktop } from "./desktop/Desktop";
import { GlobalToast } from "./desktop/Extras";
import { PhaseStub } from "./overlay/PhaseStub";
import { TrashConfirm } from "./overlay/TrashConfirm";
import styles from "./os.module.css";

let consoleShown = false;

function logConsoleSecret() {
  if (consoleShown) return;
  consoleShown = true;
  const tag = "padding:6px 10px;font-family:monospace";
  console.log(`%c${consoleSecret.logo}`, "color:#c8ff3d;font-family:monospace;font-size:14px");
  console.log(`%c${consoleSecret.hello}`, `color:#ecebe6;background:#0b0b0c;${tag}`);
  console.log(`%c${consoleSecret.secret1}`, `color:#0b0b0c;background:#c8ff3d;font-weight:bold;${tag}`);
  console.log(`%c${consoleSecret.secret2}`, `color:#0b0b0c;background:#c8ff3d;font-weight:bold;${tag}`);
}

export default function DesktopOS() {
  const boot = useOs((s) => s.boot);
  const phase = useOs((s) => s.phase);
  const theme = useOs((s) => s.theme);
  const hydrate = useOs((s) => s.hydrate);

  useEffect(() => {
    hydrate();
    logConsoleSecret();
  }, [hydrate]);

  if (boot === "pending") return null;

  const t = themes[theme];
  const vars = { "--accent": t.accent, "--on-accent": t.on } as CSSProperties;

  return (
    <div className={styles.os} style={vars}>
      <Desktop hidden={boot !== "on" || phase !== "desktop"} dimmed={phase !== "desktop"} />
      {boot === "on" && phase !== "desktop" && <PhaseStub />}
      <TrashConfirm />
      <GlobalToast />
      {boot === "lock" && <LockScreen />}
      {boot === "bios" && <Bios />}
    </div>
  );
}
