import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { profile } from "@/content/profile";

import { fontVars } from "./fonts";
import "./globals.css";

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

const title = `${profile.name} — ${profile.role}`;
const description =
  "Full Stack Developer (React / Node.js / NestJS) in Saint Petersburg. 5+ internal services used daily by 200–300 people, led a team of 7. Explore the portfolio as an operating system.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s — ${profile.name}` },
  description,
  openGraph: { title, description, type: "website", siteName: "andrey.os", locale: "en_US" },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={fontVars}>
      <body>{children}</body>
    </html>
  );
}
