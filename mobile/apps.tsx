"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { ResumePaper } from "@/components/shared/ResumePaper";
import { botChips, botCopy } from "@/content/bot";
import { fileById, ideFiles, isProjectFile, type FileId } from "@/content/ide";
import { links } from "@/content/links";
import { about, jobLeads, profile } from "@/content/profile";
import { projectById } from "@/content/projects";
import { jobDates, resumeEn, resumes, stack, type Lang } from "@/content/resume";
import { mobileCommands, terminalCopy } from "@/content/terminal";
import { useBotChat } from "@/hooks/useBotChat";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import { hireSequence, runCommand, type TermLine } from "@/lib/terminal-engine";

import type { Nav, Route } from "./MobileOS";
import styles from "./mobile.module.css";

/** Full-screen app frame: header with back / title / action, scrolling body, optional footer. */
function Shell({
  title,
  back,
  onBack,
  action,
  footer,
  children,
  bodyRef,
  className = "",
}: {
  title: ReactNode;
  back: string;
  onBack: () => void;
  action?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  bodyRef?: React.Ref<HTMLDivElement>;
  className?: string;
}) {
  return (
    <section className={`${styles.appScreen} ${className}`} aria-label={typeof title === "string" ? title : undefined}>
      <header className={styles.appBar}>
        <button type="button" className={styles.back} onClick={onBack}>
          {back}
        </button>
        <span className={styles.appTitle}>{title}</span>
        <span className={styles.appAction}>{action}</span>
      </header>
      <div ref={bodyRef} className={styles.appBody}>
        {children}
      </div>
      {footer && <div className={styles.appFoot}>{footer}</div>}
    </section>
  );
}

export default function Apps({ route, nav }: { route: Route; nav: Nav }) {
  switch (route.screen) {
    case "ide":
      return <Portfolio file={route.file} nav={nav} />;
    case "resume":
      return <Resume nav={nav} />;
    case "term":
      return <Terminal nav={nav} />;
    case "msg":
      return <Messages nav={nav} />;
    default:
      return null;
  }
}

/* ---------- Portfolio (simplified IDE) ---------- */

const icClass: Record<string, string> = { "M↓": styles.p, "≡": styles.warn, TS: styles.p, $_: styles.accent };

function Portfolio({ file, nav }: { file: FileId | null; nav: Nav }) {
  const [scanning, setScanning] = useState(false);
  const reduced = useReducedMotion();
  const f = file ? fileById(file) : null;

  const summarize = () => {
    if (reduced) return nav.go({ screen: "resume", file: null });
    setScanning(true);
    setTimeout(() => nav.go({ screen: "resume", file: null }), 1100);
  };

  return (
    <Shell
      title={f?.path ?? "portfolio.ide"}
      back={f && file !== "readme" ? "‹ Files" : "‹ Home"}
      onBack={f && file !== "readme" ? nav.back : nav.home}
      action={
        <button type="button" className={`${styles.cvBtn} tap`} onClick={summarize}>
          → CV
        </button>
      }
      footer={
        <span className={styles.termLine}>
          <span className={styles.accent}>{scanning ? "$ summarize --format=cv" : f ? `$ code ${f.path}` : "$ ls portfolio/"}</span>
          <span className="caret" />
        </span>
      }
    >
      {scanning && (
        <>
          <div className={styles.scan} aria-hidden="true" />
          <div className={styles.scanLabel} role="status">
            SUMMARIZING → CV<span className="caret" />
          </div>
        </>
      )}
      {!f || file === "readme" ? <Explorer nav={nav} /> : <FileView id={f.id} />}
    </Shell>
  );
}

function Explorer({ nav }: { nav: Nav }) {
  return (
    <>
      <div className={styles.readme}>
        <h2 className={styles.hero}>
          Full Stack
          <br />
          <span className={styles.accent}>Developer</span>
        </h2>
        <p className={styles.lead}>{profile.leadShort}</p>
        <dl className={styles.metrics}>
          {profile.metrics.map((m) => (
            <div key={m.short}>
              <dt>{m.short}</dt>
              <dd>{m.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <p className={styles.eyebrow}>EXPLORER · TAP A FILE</p>
      <ul className={styles.fileList}>
        {ideFiles
          .filter((f) => f.id !== "readme")
          .map((f, i, arr) => (
            <li key={f.id}>
              {f.depth === 1 && arr[i - 1]?.depth !== 1 && <div className={styles.folder}>▾ work/</div>}
              <button
                type="button"
                className={styles.fileRow}
                style={{ paddingLeft: f.depth ? 32 : 16 }}
                onClick={() => nav.go({ screen: "ide", file: f.id })}
              >
                <span className={icClass[f.icon]} aria-hidden="true">
                  {f.icon}
                </span>
                <span className={styles.fileName}>{f.name}</span>
                <span className={styles.chev} aria-hidden="true">
                  ›
                </span>
              </button>
            </li>
          ))}
      </ul>
    </>
  );
}

function FileView({ id }: { id: FileId }) {
  if (isProjectFile(id)) {
    const p = projectById(id)!;
    const meta: [string, string][] = [
      ["title", p.title],
      ["org", p.org],
      ["role", p.role],
      ["period", p.period],
    ];
    return (
      <article className={`${styles.file} rise`}>
        <div className={styles.code}>
          <div className={styles.c}>---</div>
          {meta.map(([k, v]) => (
            <div key={k}>
              <span className={styles.p}>{k}</span>: <span className={styles.s}>{v}</span>
            </div>
          ))}
          <div className={styles.c}>---</div>
        </div>
        <p className={styles.big}>{p.big}</p>
        <p className={styles.bigLabel}>{p.bigLabel}</p>
        <ul className={styles.facts}>
          {p.facts.map((fact) => (
            <li key={fact.text}>
              <span className={styles.accent} aria-hidden="true">
                ›
              </span>
              <span>{fact.text}</span>
            </li>
          ))}
        </ul>
        <div className={styles.tags}>
          {p.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </article>
    );
  }
  if (id === "exp")
    return (
      <article className={`${styles.file} rise`}>
        <div className={`${styles.code} ${styles.c}`}># git log --career</div>
        {resumeEn.jobs.map((j) => {
          const d = jobDates[j.id];
          return (
            <div key={j.id} className={styles.job}>
              <p className={`${styles.small} ${styles.accent}`}>
                * {d.from} → {d.to ?? "now"}
              </p>
              <h3 className={styles.jobCompany}>{j.company}</h3>
              <p className={`${styles.small} ${styles.p}`}>{j.role}</p>
              <p className={styles.jobLead}>{jobLeads[j.id]}</p>
            </div>
          );
        })}
      </article>
    );
  if (id === "stack")
    return (
      <article className={`${styles.file} ${styles.code} rise`}>
        <div>
          <span className={styles.k}>export const</span> stack = {"{"}
        </div>
        {stack.map((g) => (
          <div key={g.key} className={styles.indent}>
            <span className={styles.p}>{g.key}</span>: <span className={styles.s}>[{g.items.map((x) => `"${x}"`).join(", ")}]</span>,
          </div>
        ))}
        <div>
          {"};"}
          <span className="caret" />
        </div>
      </article>
    );
  if (id === "about")
    return (
      <article className={`${styles.file} rise`}>
        <h3 className={styles.aboutHead}>{about.headline}</h3>
        <ul className={styles.aboutList}>
          {about.items.map((it) => (
            <li key={it.key}>
              <span className={styles.p}>{it.key}</span> — {it.value}
            </li>
          ))}
        </ul>
      </article>
    );
  if (id === "contact")
    return (
      <article className={`${styles.file} rise`}>
        <div className={`${styles.code} ${styles.c}`}>#!/bin/sh — let&apos;s build something</div>
        <p className={styles.letsBuild}>
          Let&apos;s
          <br />
          <span className={styles.accent}>build.</span>
        </p>
        <div className={styles.contactLinks}>
          <a href={links.telegram} target="_blank" rel="noopener noreferrer" className={`${styles.primaryLink} tap`}>
            <span>Telegram {links.telegramHandle}</span>
            <span aria-hidden="true">↗</span>
          </a>
          <a href={links.github} target="_blank" rel="noopener noreferrer" className={`${styles.ghostLink} tap`}>
            <span>{links.githubLabel}</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </article>
    );
  return null;
}

/* ---------- Resume ---------- */

function Resume({ nav }: { nav: Nav }) {
  const [lang, setLang] = useState<Lang>("en");
  const r = resumes[lang];
  return (
    <Shell
      title="resume.pdf"
      back="‹ Home"
      onBack={nav.home}
      action={
        <span className={styles.lang} role="group" aria-label="Language">
          {(["en", "ru"] as const).map((l) => (
            <button key={l} type="button" aria-pressed={lang === l} className={lang === l ? styles.langOn : ""} onClick={() => setLang(l)}>
              {l.toUpperCase()}
            </button>
          ))}
        </span>
      }
      className={styles.resumeScreen}
    >
      <ResumePaper key={lang} resume={r} heading="h2" className={styles.paper} />
      <div className={styles.resumeBar}>
        <a href={r.pdf.href} download={r.pdf.filename} className={`${styles.download} tap`}>
          {lang === "ru" ? "СКАЧАТЬ PDF ↓" : "DOWNLOAD PDF ↓"}
        </a>
        <button type="button" className={`${styles.square} tap`} aria-label="Open portfolio" onClick={() => nav.go({ screen: "ide", file: null })}>
          &lt;/&gt;
        </button>
      </div>
    </Shell>
  );
}

/* ---------- Terminal (commands as buttons) ---------- */

function Terminal({ nav }: { nav: Nav }) {
  const [lines, setLines] = useState<TermLine[]>([{ text: terminalCopy.mobileBanner, kind: "dim" }]);
  const out = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const el = out.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const run = (cmd: string) => {
    const res = runCommand(cmd, { compact: true });
    setLines((l) => [...l, ...res.lines]);
    for (const e of res.effects) {
      if (e.type === "clear") setLines([]);
      else if (e.type === "openFile") timers.current.push(setTimeout(() => nav.go({ screen: "ide", file: e.file }), 450));
      else if (e.type === "hire") {
        hireSequence.forEach((line, i) => timers.current.push(setTimeout(() => setLines((l) => [...l, line]), 350 * (i + 1))));
        timers.current.push(setTimeout(() => nav.go({ screen: "ide", file: "contact" }), 350 * (hireSequence.length + 1) + 300));
      }
    }
  };

  return (
    <Shell
      title="zsh — andrey@os"
      back="‹ Home"
      onBack={nav.home}
      className={styles.termScreen}
      bodyRef={out}
      footer={
        <>
          <p className={styles.eyebrow}>TAP A COMMAND</p>
          <div className={styles.cmds}>
            {mobileCommands.map((c) => (
              <button key={c} type="button" className={`${styles.cmd} tap ${c === "hire andrey" ? styles.accent : ""}`} onClick={() => run(c)}>
                {c}
              </button>
            ))}
          </div>
        </>
      }
    >
      <div className={styles.termOut} role="log" aria-live="polite">
        {lines.map((l, i) => (
          <div key={i} className={styles[`t_${l.kind}`]}>
            {l.text}
          </div>
        ))}
        <div>
          <span className={styles.accent}>{terminalCopy.prompt}</span> <span className="caret" />
        </div>
      </div>
    </Shell>
  );
}

/* ---------- Messages ---------- */

function Messages({ nav }: { nav: Nav }) {
  const { msgs, typing, send } = useBotChat();
  const [input, setInput] = useState("");
  const out = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = out.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, typing]);

  return (
    <Shell
      title={
        <span className={styles.botTitle}>
          <span>Andrey.bot</span>
          <span className={styles.botSub}>{botCopy.footnote}</span>
        </span>
      }
      back="‹ Home"
      onBack={nav.home}
      className={styles.msgScreen}
      bodyRef={out}
      footer={
        <>
          <div className={styles.chips}>
            {botChips.map((c) => (
              <button key={c.short} type="button" className={`${styles.chip} tap`} onClick={() => send(c.full)}>
                {c.short}
              </button>
            ))}
          </div>
          <form
            className={styles.compose}
            onSubmit={(e) => {
              e.preventDefault();
              if (send(input)) setInput("");
            }}
          >
            <label htmlFor="m-msg" className="sr-only">
              Message Andrey.bot
            </label>
            <input id="m-msg" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Message" autoComplete="off" className={styles.msgIn} enterKeyHint="send" />
            <button type="submit" className={styles.send} aria-label="Send">
              ↑
            </button>
          </form>
        </>
      }
    >
      <div className={styles.chat} role="log" aria-live="polite" aria-label="Conversation">
        {msgs.map((m, i) => (
          <div key={i} className={`${styles.bubble} ${m.me ? styles.me : ""}`}>
            <span className="sr-only">{m.me ? "You: " : "Andrey.bot: "}</span>
            {m.text}
          </div>
        ))}
        {typing && (
          <div className={styles.dots} aria-label="Andrey.bot is typing">
            <span />
            <span />
            <span />
          </div>
        )}
      </div>
    </Shell>
  );
}
