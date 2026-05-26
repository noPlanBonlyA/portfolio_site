import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: "Andrey Dmitriev - Full Stack Developer",
  description:
    "Portfolio of a Full Stack Developer building enterprise systems, educational platforms, AI services and commercial web projects.",
  openGraph: {
    title: "Andrey Dmitriev - Full Stack Developer",
    description:
      "Portfolio of a Full Stack Developer building enterprise systems, educational platforms, AI services and commercial web projects.",
    type: "website",
    locale: "en_US",
    siteName: "Andrey Dmitriev Portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
