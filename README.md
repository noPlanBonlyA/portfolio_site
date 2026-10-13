# andrey.os

Portfolio of Andrey Dmitriev as a tiny operating system: boot → lock screen → desktop →
portfolio.ide → Summarize → printed CV. Phones get a separate "phone" UI.

**Stack:** Next.js 16 (App Router, static output) · React 19 · TypeScript · Zustand · CSS Modules.
Deployed on Vercel — pushing to `main` builds and deploys, no extra config needed.

## Scripts

```bash
npm run dev        # http://localhost:3000
npm run build      # production build (all routes are static)
npm test           # content-vs-PDF, privacy and engine tests
npm run typecheck
```

## Editing content

All texts live in [`content/`](content) — one source for desktop, mobile, terminal and bot.

| File | What |
|---|---|
| `resume.ts` | CV texts, **verbatim** from the PDFs in `public/`. `npm test` fails if they drift. |
| `profile.ts` | Hero copy, metrics, `about.md` extras (GPA, olympiads…) |
| `projects.ts` | `work/*.md` files: metric, facts, git-blame lines, ▶ RUN scripts |
| `terminal.ts`, `bot.ts` | Terminal output and Andrey.bot answers |
| `quests.ts` | The 17 achievements and their guide captions |
| `apps.ts`, `os.ts`, `ide.ts` | Dock apps, Task Manager, Trash, BIOS lines, IDE themes |
| `links.ts` | Telegram, GitHub, Spotify, PDF paths |

Updating the CV: replace `public/Andrey_Dmitriev_CV.pdf` (or `_RU.pdf`), edit `content/resume.ts`
to match, run `npm test`.

The site shows only Telegram and GitHub; email and phone stay inside the PDFs
(`content/privacy.test.ts` guards this).

**Photo:** replace `public/photo.jpg` (portrait, ~306×368 ratio or larger).

## Layout

```
app/          routes: / (OS), /cv, /cv/ru, OG image, sitemap, robots
content/      all copy + tests against the PDFs
os/           desktop: boot, desktop, ide, resume, windows, overlays (cursor, ⌘K, achievements)
mobile/       phone UI (separate chunk — phones never load the desktop code)
lib/          pure logic: terminal engine, bot, word highlight, sound
hooks/, store/  shared hooks, Zustand store for the desktop OS
design/       the original Claude Design prototype and handoff (reference only)
```
