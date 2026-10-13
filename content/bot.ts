// Andrey.bot — scripted answers based on the CV. First matching intent wins.

import { links } from "./links";

export const botCopy = {
  title: "Messages — Andrey.bot",
  greeting: "Hi! I'm Andrey.bot. Ask me about Andrey's stack, projects or availability.",
  placeholder: "Ask about stack, projects, availability…",
  footnote: "scripted answers, based on my CV",
  fallback: `Good question — I would rather answer it myself. Ping me on Telegram ${links.telegramHandle}.`,
} as const;

export const botChips = [
  { full: "What is your stack?", short: "Your stack?" },
  { full: "Are you open to work?", short: "Open to work?" },
  { full: "Tell me about SENAT AI", short: "About SENAT AI" },
  { full: "How to contact you?", short: "Contacts" },
];

export const botIntents: { keywords: string[]; answer: string }[] = [
  {
    keywords: ["stack", "skill", "tech", "стек", "навык"],
    answer: "Frontend: React, Next.js, Vue, TypeScript.\nBackend: Node.js, NestJS, Python/FastAPI.\nAlso PostgreSQL, Redis, Docker, GitHub Actions.",
  },
  {
    keywords: ["open", "availab", "hire", "job", "work with", "ищ", "работ"],
    answer: `Yes — open to strong product teams. Fastest way to reach me: Telegram ${links.telegramHandle}.`,
  },
  {
    keywords: ["senat", "lead", "team", "тимлид", "команд"],
    answer: "At SENAT AI I led 7 developers through a 6-month project and delivered an educational platform. I also wrote Python/FastAPI and Node.js services with tests.",
  },
  {
    keywords: ["gazek", "current", "now", "сейчас"],
    answer: "Since Sep 2025 at Research Institute Gazekonomika: 5+ internal services (React, NestJS) used daily by 200–300 employees.",
  },
  {
    keywords: ["contact", "email", "telegram", "reach", "контакт", "почт", "связ"],
    answer: `Telegram: ${links.telegramHandle} — the fastest way.\nCode: ${links.githubLabel}`,
  },
  {
    keywords: ["experience", "years", "опыт", "лет"],
    answer: "In web development since 2022 — from WordPress sites to enterprise NestJS services.",
  },
  {
    keywords: ["english", "language", "англ", "язык"],
    answer: "Russian (native), English (B2).",
  },
  {
    keywords: ["bitrix", "speed", "performance", "скорост"],
    answer: "At Leadmakers I optimized SQL and set up server-side caching: page load went from 10–20 s to ~1 s.",
  },
  {
    keywords: ["education", "itmo", "university", "образован", "итмо"],
    answer: "B.Sc., ITMO University, 2026. Now studying a program in AI management.",
  },
  {
    keywords: ["hi", "hello", "привет", "hey"],
    answer: "Hey! Ask me about my stack, projects or whether I am open to work.",
  },
];
