"use client";

import { Achievements, GuideCursor } from "./Achievements";
import { RetroOverlay, Sleep } from "./Ambient";
import { CommandPalette } from "./CommandPalette";
import { Cursor } from "./Cursor";

/** Global layers above every phase (lazy chunk, loaded after unlock). */
export default function Overlays() {
  return (
    <>
      <Sleep />
      <CommandPalette />
      <Achievements />
      <GuideCursor />
      <RetroOverlay />
      <Cursor />
    </>
  );
}
