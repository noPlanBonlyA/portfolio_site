import Link from "next/link";

import { links } from "@/content/links";
import { profile } from "@/content/profile";

// Temporary screen while the OS is being built (removed in steps 2 and 7).
export function Placeholder({ mode }: { mode: "desktop" | "mobile" }) {
  return (
    <main
      className="dot-grid"
      style={{ minHeight: "100dvh", display: "grid", placeItems: "center", padding: 24, textAlign: "center" }}
    >
      <div>
        <p style={{ fontSize: 12, letterSpacing: ".2em", color: "var(--muted)" }}>
          ANDREY.OS · {mode.toUpperCase()} BUILD IN PROGRESS
        </p>
        <h1
          style={{
            marginTop: 16,
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(48px, 10vw, 140px)",
            lineHeight: 0.88,
            letterSpacing: "-.045em",
            textTransform: "uppercase",
          }}
        >
          {profile.firstName}
          <br />
          <span style={{ color: "var(--accent)" }}>{profile.lastName}</span>
        </h1>
        <p style={{ marginTop: 20, color: "var(--text-3)" }}>
          {profile.role} · {profile.stackLine}
          <span className="caret" />
        </p>
        <p style={{ marginTop: 28, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/cv" style={{ padding: "14px 22px", background: "var(--accent)", color: "var(--on-accent)", fontWeight: 700 }}>
            READ CV →
          </Link>
          <a href={links.telegram} style={{ padding: "14px 22px", border: "1px solid var(--line-2)" }}>
            TELEGRAM ↗
          </a>
        </p>
      </div>
    </main>
  );
}
