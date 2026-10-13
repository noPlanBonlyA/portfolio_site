// work/*.md files in the IDE. Every fact is a rewording of a CV bullet (content/resume.ts).

import type { JobId } from "./resume";

export type ProjectId = "p0" | "p1" | "p2" | "p3" | "p4";

export interface RunLine {
  text: string;
  kind: "cmd" | "out" | "acc" | "err";
}

export interface Project {
  id: ProjectId;
  job: JobId;
  file: string;
  title: string;
  org: string;
  role: string;
  period: string;
  big: string;
  bigLabel: string;
  facts: { text: string; blame: { date: string; msg: string } }[];
  tags: string[];
  /** ▶ RUN demo, printed line by line in the IDE terminal panel. */
  run: string[];
  /** Bitrix only: animated "page load" bar after the script, then this closing line. */
  runBar?: { label: string; from: string; to: string; after: string };
}

export const projects: Project[] = [
  {
    id: "p0",
    job: "gazekonomika",
    file: "enterprise-systems.md",
    title: "Enterprise Internal Systems",
    org: "Research Institute Gazekonomika",
    role: "Full Stack Developer (Middle+)",
    period: "Sep 2025 → now",
    big: "200–300",
    bigLabel: "employees use these services daily",
    facts: [
      { text: "5+ internal services (React, NestJS) I develop and support", blame: { date: "Sep 2025", msg: "feat: services" } },
      { text: "REST APIs, data models and business logic", blame: { date: "2025", msg: "feat: api + models" } },
      { text: "Authentication and role-based access control (RBAC)", blame: { date: "2025", msg: "feat(auth): rbac" } },
      { text: "Microfrontends integrated into a unified enterprise platform", blame: { date: "2026", msg: "feat: mf-host" } },
      { text: "React modules built with Feature-Sliced Design", blame: { date: "2025", msg: "refactor: fsd" } },
    ],
    tags: ["NestJS", "React", "TypeScript", "REST API", "RBAC", "Microfrontends", "FSD"],
    run: [
      "$ npm run start:services",
      "✓ auth-service        ready",
      "✓ rbac-gateway        ready",
      "✓ corporate-chatbot   ready",
      "✓ workflow-tools      ready",
      "✓ microfrontend-host  ready",
      "→ 5+ services up · used daily by 200–300 employees",
    ],
  },
  {
    id: "p1",
    job: "gazekonomika",
    file: "chatbot-and-workflows.md",
    title: "Corporate Chatbot and Workflow Tools",
    org: "Research Institute Gazekonomika",
    role: "Full Stack Developer (Middle+)",
    period: "Sep 2025 → now",
    big: "AI",
    bigLabel: "seminars across company centers",
    facts: [
      { text: "A corporate chatbot for employees", blame: { date: "2025", msg: "feat: chatbot" } },
      { text: "Workflow-optimization tools", blame: { date: "2025", msg: "feat: workflows" } },
      { text: "Seminars on using AI for analysis, implementation, testing and documentation", blame: { date: "2026", msg: "docs: ai seminars" } },
    ],
    tags: ["AI", "NestJS", "React", "TypeScript"],
    run: [
      "$ node chatbot.js",
      "[bot] connected to corporate workspace",
      "user> how do I file this request?",
      "bot>  here is the 3-step workflow, pre-filled for you.",
      "→ demo dialogue, illustrative",
    ],
  },
  {
    id: "p2",
    job: "senat",
    file: "senat-ai-platform.md",
    title: "SENAT AI Educational Platform",
    org: "SENAT AI",
    role: "Team Lead / Full Stack Developer",
    period: "Feb 2025 → Jan 2026",
    big: "7 devs",
    bigLabel: "led through a 6-month project, delivered",
    facts: [
      { text: "Client requirements turned into technical specs and tasks", blame: { date: "Feb 2025", msg: "chore: specs" } },
      { text: "Python/FastAPI and Node.js backend services with tests", blame: { date: "2025", msg: "feat(api): fastapi" } },
      { text: "React / Vue / TypeScript UIs, admin panels, external integrations", blame: { date: "2025", msg: "feat(ui): admin" } },
      { text: "CI/CD, server configuration, deployment and code reviews", blame: { date: "2025", msg: "ci: deploy" } },
    ],
    tags: ["React", "Vue", "TypeScript", "Node.js", "Python", "FastAPI", "CI/CD"],
    run: [
      "$ make deliver",
      "[team]  7 developers assigned",
      "[spec]  client requirements → technical tasks",
      "[ci]    pipeline green · reviewed",
      "✓ educational platform delivered (6-month project)",
    ],
  },
  {
    id: "p3",
    job: "itmo",
    file: "ai-character-bot.md",
    title: "AI Character Bot",
    org: "ITMO University Startup Project",
    role: "Full Stack Developer / DevOps",
    period: "Nov 2024 → May 2025",
    big: "2nd",
    bigLabel: "place in a startup competition",
    facts: [
      { text: "Telegram-based AI service for 3D character customization via natural language", blame: { date: "Nov 2024", msg: "feat: mvp" } },
      { text: "LLM logic integrated through FastAPI", blame: { date: "2025", msg: "feat: llm" } },
      { text: "Telegram bot and backend on REST + WebSocket", blame: { date: "2025", msg: "feat: ws" } },
      { text: "Docker Compose and GitHub Actions CI/CD; prototyped with Next.js and MongoDB", blame: { date: "2025", msg: "ci: actions" } },
    ],
    tags: ["FastAPI", "LLM", "Telegram", "WebSocket", "Docker", "Next.js", "MongoDB"],
    run: [
      "$ python bot.py",
      "[fastapi]  LLM endpoint ready",
      "[telegram] bot online · REST + WebSocket",
      "user> make my character taller, red jacket",
      "bot>  updating 3D character…",
      "✓ 2nd place in a startup competition",
    ],
  },
  {
    id: "p4",
    job: "leadmakers",
    file: "bitrix-speedup.md",
    title: "Bitrix Performance Overhaul",
    org: "Leadmakers",
    role: "1C-Bitrix / Full Stack Developer",
    period: "May 2024 → Oct 2024",
    big: "~1 s",
    bigLabel: "page load, down from 10–20 s",
    facts: [
      { text: "Optimized SQL queries and set up server-side caching", blame: { date: "2024", msg: "perf: sql + cache" } },
      { text: "Contributed to raising Google PageSpeed from 40 to 97", blame: { date: "2024", msg: "perf: pagespeed" } },
      { text: "Custom PHP / 1C-Bitrix functionality and AJAX/jQuery features", blame: { date: "2024", msg: "feat: bitrix" } },
    ],
    tags: ["1C-Bitrix", "PHP", "SQL", "Caching", "jQuery"],
    run: [
      "$ lighthouse --compare",
      "before:  load 10–20 s · PageSpeed 40",
      "optimizing SQL queries… setting up server-side caching…",
    ],
    runBar: { label: "page load", from: "15 s", to: "~1 s", after: "after:   load ~1 s · PageSpeed 97" },
  },
];

export const projectById = (id: string) => projects.find((p) => p.id === id);

/** Colour class for a run line, by its leading glyph. */
export function runKind(line: string): RunLine["kind"] {
  const c = line.charAt(0);
  if (c === "✓" || c === "→") return "acc";
  if (c === "$") return "cmd";
  return "out";
}
