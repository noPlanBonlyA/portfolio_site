import Link from "next/link";

export const metadata = { title: "404" };

export default function NotFound() {
  return (
    <main
      className="dot-grid"
      style={{ minHeight: "100dvh", display: "grid", placeItems: "center", padding: 24, textAlign: "center" }}
    >
      <div>
        <p style={{ fontSize: 13, letterSpacing: ".16em", color: "var(--muted)" }}>andrey@os:~$ cd {"<this page>"}</p>
        <h1
          style={{
            marginTop: 12,
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(72px, 18vw, 200px)",
            lineHeight: 0.9,
            letterSpacing: "-.05em",
          }}
        >
          4<span style={{ color: "var(--accent)" }}>0</span>4
        </h1>
        <p style={{ marginTop: 16, color: "var(--danger)" }}>cd: no such file or directory</p>
        <p style={{ marginTop: 28 }}>
          <Link
            href="/"
            style={{ display: "inline-flex", alignItems: "center", minHeight: 48, padding: "0 22px", background: "var(--accent)", color: "var(--on-accent)", fontWeight: 700 }}
          >
            ← BACK TO andrey.os
          </Link>
        </p>
      </div>
    </main>
  );
}
