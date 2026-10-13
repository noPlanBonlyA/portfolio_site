import Link from "next/link";

import { DeviceSwitch } from "@/components/DeviceSwitch";
import { profile } from "@/content/profile";
import { resumeEn } from "@/content/resume";

export default function Home() {
  return (
    <>
      <Link href="/cv" className="skip-link">
        Skip to plain-text CV
      </Link>

      {/* Server-rendered summary for search engines and screen readers; the OS below is client-only. */}
      <div className="sr-only">
        <h1>
          {profile.name} — {profile.role} ({profile.stackLine})
        </h1>
        <p>{resumeEn.summary}</p>
      </div>

      <noscript>
        <p style={{ padding: 24 }}>
          andrey.os needs JavaScript. <a href="/cv" style={{ color: "var(--accent)" }}>Read the CV as a page →</a>
        </p>
      </noscript>

      <DeviceSwitch />
    </>
  );
}
