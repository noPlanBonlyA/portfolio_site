"use client";

import { useEffect, useState } from "react";

const pad = (n: number) => String(n).padStart(2, "0");

function read() {
  const d = new Date();
  return {
    time: `${pad(d.getHours())}:${pad(d.getMinutes())}`,
    date: d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" }),
  };
}

/** HH:MM + long date, re-rendering exactly when the minute changes. */
export function useClock() {
  const [now, setNow] = useState(read);
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const schedule = () => {
      t = setTimeout(() => {
        setNow(read());
        schedule();
      }, 60_000 - (Date.now() % 60_000) + 50);
    };
    schedule();
    return () => clearTimeout(t);
  }, []);
  return now;
}
