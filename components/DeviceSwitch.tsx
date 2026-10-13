"use client";

import dynamic from "next/dynamic";

import { DESKTOP_QUERY, useMediaQuery } from "@/hooks/useMediaQuery";

// Separate chunks: phones never download the desktop OS and vice versa.
const DesktopOS = dynamic(() => import("@/os/DesktopOS"), { ssr: false });
const MobileOS = dynamic(() => import("@/mobile/MobileOS"), { ssr: false });

export function DeviceSwitch() {
  const desktop = useMediaQuery(DESKTOP_QUERY);
  if (desktop === null) return null;
  return desktop ? <DesktopOS /> : <MobileOS />;
}
