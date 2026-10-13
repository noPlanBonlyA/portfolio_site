import { Bricolage_Grotesque, JetBrains_Mono, Onest, Press_Start_2P } from "next/font/google";

// `subsets` only controls preloading; other ranges still load on demand via unicode-range.
export const display = Bricolage_Grotesque({
  subsets: ["latin"],
  // variable weight 200–800 + optical size, as in the prototype (opsz 12..96)
  axes: ["opsz"],
  variable: "--font-bricolage",
  display: "swap",
});

// Bricolage has no Cyrillic; Onest covers the RU resume. Its @font-face is limited
// to the Cyrillic unicode-range, so it downloads only when Russian text is on screen.
export const displayCyr = Onest({
  subsets: ["cyrillic"],
  weight: ["400", "600", "800"],
  variable: "--font-onest",
  display: "swap",
  preload: false,
});

export const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

// 8-bit mode only — not preloaded.
export const pixel = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pixel",
  display: "swap",
  preload: false,
});

export const fontVars = [display.variable, displayCyr.variable, mono.variable, pixel.variable].join(" ");
