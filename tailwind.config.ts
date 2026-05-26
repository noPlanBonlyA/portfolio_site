import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "cyan-soft": "0 0 42px rgba(34, 211, 238, 0.12)",
        "violet-soft": "0 0 42px rgba(139, 92, 246, 0.14)",
      },
      keyframes: {
        "terminal-caret": {
          "0%, 45%": { opacity: "1" },
          "46%, 100%": { opacity: "0" },
        },
        "table-shift": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-42px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -12px, 0)" },
        },
        "status-pulse": {
          "0%, 100%": { opacity: "0.55", transform: "scale(0.96)" },
          "50%": { opacity: "1", transform: "scale(1)" },
        },
        "chat-rise": {
          "0%": { transform: "translateY(8px)", opacity: "0.45" },
          "40%, 100%": { transform: "translateY(0)", opacity: "1" },
        },
        "grid-pan": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "44px 44px" },
        },
      },
      animation: {
        "terminal-caret": "terminal-caret 1.1s steps(1) infinite",
        "table-shift": "table-shift 5s linear infinite",
        "float-slow": "float-slow 5.5s ease-in-out infinite",
        "status-pulse": "status-pulse 2s ease-in-out infinite",
        "chat-rise": "chat-rise 3.8s ease-in-out infinite",
        "grid-pan": "grid-pan 18s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
