import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { profile } from "@/content/profile";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Static at build time: dark card in the andrey.os style.
// next/og can't use woff2, so the display face ships as a TTF (OFL) in /assets.
export default async function OpengraphImage() {
  const display = await readFile(join(process.cwd(), "assets/fonts/BricolageGrotesque-ExtraBold.ttf"));
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0b0b0c",
          color: "#ecebe6",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, letterSpacing: 2 }}>
          <div style={{ width: 16, height: 16, borderRadius: 8, background: "#c8ff3d" }} />
          andrey.os
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "Bricolage", fontSize: 150, lineHeight: 0.88, letterSpacing: -4 }}>FULL STACK</div>
          <div style={{ display: "flex", alignItems: "flex-end", fontFamily: "Bricolage", fontSize: 150, lineHeight: 0.88, letterSpacing: -4, color: "#c8ff3d" }}>
            DEVELOPER
            <div style={{ width: 52, height: 92, marginLeft: 14, marginBottom: 10, background: "#c8ff3d" }} />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#b9b8b1" }}>
          <span>{profile.name}</span>
          <span>{profile.stackLine}</span>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Bricolage", data: display, weight: 800, style: "normal" }] },
  );
}
