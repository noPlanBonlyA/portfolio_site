// Site-level copy derived from the EN CV (content/resume.ts) plus facts Andrey added for the site.

export const profile = {
  name: "Andrey Dmitriev",
  firstName: "Andrey",
  lastName: "Dmitriev",
  initials: "AD",
  role: "Full Stack Developer",
  stackLine: "React / Node.js / NestJS",
  location: "Saint Petersburg",
  locationShort: "SPb",
  coords: "59.93° N, 30.31° E",
  since: 2022,
  status: "Available for strong product teams",
  statusShort: "open to strong product teams",
  sticker: "OPEN TO STRONG PRODUCT TEAMS • OPEN TO WORK • ",
  photoAlt: "Andrey Dmitriev on a balcony in Saint Petersburg",
  /** Two sentences from the CV summary, used as the README lead. */
  lead: "Full Stack Developer working in web development since 2022. I cover the full cycle: API and database design, frontend, CI/CD and deployment.",
  metrics: [
    { value: "200–300", label: "DAILY ENTERPRISE USERS" },
    { value: "5+", label: "SERVICES IN PRODUCTION" },
    { value: "Team of 7", label: "LED TO DELIVERY" },
  ],
  marquee: [
    "React", "Next.js", "NestJS", "TypeScript", "FastAPI", "PostgreSQL",
    "Redis", "Docker", "Vue", "WebSocket", "GitHub Actions", "Microfrontends",
  ],
} as const;

/** about.md — education extras (GPA, AI management, olympiads) confirmed by Andrey, not in the PDF. */
export const about = {
  headline: "Comfortable running several projects in parallel.",
  items: [
    { key: "education", value: "B.Sc., ITMO University, 2026 · GPA 4.1" },
    { key: "now", value: "studying a program in AI management" },
    { key: "olympiads", value: "winner, Data Analytics · finalist, Algorithms and Data Structures" },
    { key: "languages", value: "Russian (native) · English (B2)" },
    { key: "ai", value: "AI tools to speed up prototyping, debugging and testing" },
    { key: "based in", value: "Saint Petersburg" },
  ],
} as const;

/** One-line takeaways per job (mobile experience list). Paraphrased from the CV bullets. */
export const jobLeads = {
  gazekonomika: "5+ internal services (React, NestJS) used daily by 200-300 employees; RBAC, microfrontends, AI seminars.",
  pharmacies: "Coordinated website improvements: requirements, task specs, deadlines.",
  senat: "Led 7 developers through a 6-month project, delivered an educational platform.",
  itmo: "Telegram AI service MVP; 2nd place in a startup competition.",
  leadmakers: "SQL optimization and caching: page load from 10-20 s to ~1 s.",
  driving: "Built and launched the company site on WordPress.",
} as const;
