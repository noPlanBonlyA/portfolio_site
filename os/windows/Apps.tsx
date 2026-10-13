"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { musicCopy, processes, taskCopy, trashCopy, trashItems } from "@/content/apps";
import { botChips, botCopy } from "@/content/bot";
import { useBotChat } from "@/hooks/useBotChat";
import { useOs } from "@/store/os";

import { WindowFrame } from "./WindowFrame";
import styles from "./windows.module.css";

/* ---------- Task Manager: skills as processes with live load ---------- */

const jitter = () =>
  processes.map((p) =>
    p.critical ? 97 + Math.round(Math.random() * 2) : Math.max(1, Math.round(p.cpu + (Math.random() - 0.5) * 14)),
  );

export function TaskManager() {
  const open = useOs((s) => s.wins.task);
  const markDone = useOs((s) => s.markDone);
  const [cpu, setCpu] = useState(() => processes.map((p) => p.cpu));
  const [sel, setSel] = useState<number | null>(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!open) return;
    const t = setInterval(() => setCpu(jitter()), 1400);
    return () => clearInterval(t);
  }, [open]);

  const total = Math.min(100, Math.round(cpu.reduce((a, b) => a + b, 0) / 2.3));

  const endTask = () => {
    if (sel === null) return setMsg(taskCopy.selectFirst);
    const p = processes[sel];
    if (p.critical) markDone("coffee");
    setMsg(p.critical ? taskCopy.coffeeDenied : taskCopy.denied(p.name));
  };

  return (
    <WindowFrame id="task" title={taskCopy.title} label="Task Manager" className={styles.task}>
      <div className={styles.procHead} aria-hidden="true">
        <span>PROCESS</span>
        <span>CPU</span>
        <span className={styles.right}>%</span>
      </div>
      <ul className={styles.procs} aria-label="Processes">
        {processes.map((p, i) => (
          <li key={p.name}>
            <button
              type="button"
              className={`${styles.proc} ${sel === i ? styles.procOn : ""}`}
              aria-expanded={sel === i}
              onClick={() => {
                setSel(sel === i ? null : i);
                setMsg("");
              }}
            >
              <span className={styles.ellipsis}>{p.name}</span>
              <span className={styles.meter} aria-hidden="true">
                <span style={{ width: `${cpu[i]}%`, background: cpu[i] > 80 ? "var(--danger)" : "var(--accent)" }} />
              </span>
              <span className={styles.right} style={{ color: cpu[i] > 80 ? "var(--danger)" : "var(--accent)" }}>
                {cpu[i]}%
              </span>
            </button>
            {sel === i && <div className={styles.usedIn}>↳ used in: {p.usedIn}</div>}
          </li>
        ))}
      </ul>
      <div className={styles.taskFoot}>
        <span>{taskCopy.info(total)}</span>
        <button type="button" data-quest="endtask" className={styles.danger} onClick={endTask}>
          End task
        </button>
      </div>
      <p className={styles.taskMsg} role="status">
        {msg}
      </p>
    </WindowFrame>
  );
}

/* ---------- Messages: Andrey.bot ---------- */

export function Messages() {
  const markDone = useOs((s) => s.markDone);
  const beep = useOs((s) => s.beep);
  const onSend = useCallback(() => {
    markDone("bot");
    beep(820, 0.03);
  }, [markDone, beep]);
  const onReply = useCallback(() => beep(560, 0.05), [beep]);
  const { msgs, typing, send: sendMsg } = useBotChat(onSend, onReply);
  const [input, setInput] = useState("");
  const out = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = out.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, typing]);

  const send = (text: string) => {
    if (sendMsg(text)) setInput("");
  };

  return (
    <WindowFrame id="msg" title={botCopy.title} label="Messages" className={styles.msg}>
      <div ref={out} className={`${styles.chat} scroll`} role="log" aria-live="polite" aria-label="Conversation">
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
      <div className={styles.chips} data-quest="chips">
        {botChips.map((c) => (
          <button key={c.full} type="button" className={styles.chip} onClick={() => send(c.full)}>
            {c.full}
          </button>
        ))}
      </div>
      <form
        className={styles.compose}
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
      >
        <label htmlFor="msg-in" className="sr-only">
          Message Andrey.bot
        </label>
        <input
          id="msg-in"
          data-autofocus=""
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={botCopy.placeholder}
          autoComplete="off"
          className={styles.msgIn}
        />
        <button type="submit" className={styles.send} aria-label="Send">
          ↑
        </button>
      </form>
      <p className={styles.footnote}>{botCopy.footnote}</p>
    </WindowFrame>
  );
}

/* ---------- Now coding ---------- */

export function NowCoding() {
  const markDone = useOs((s) => s.markDone);
  const [playing, setPlaying] = useState(false);
  return (
    <WindowFrame id="music" title={musicCopy.title} label="Now coding player" className={styles.music}>
      <div className={styles.player}>
        <div className={`${styles.eq} ${playing ? styles.playing : ""}`} aria-hidden="true">
          {[0, -0.3, -0.6, -0.15].map((d) => (
            <span key={d} style={{ animationDelay: `${d}s` }} />
          ))}
        </div>
        <div className={styles.track}>
          <div className={styles.trackTitle}>{musicCopy.track}</div>
          <div className={styles.trackArtist}>{musicCopy.artist}</div>
          <div className={styles.progress}>
            <div style={{ animationPlayState: playing ? "running" : "paused" }} />
          </div>
        </div>
      </div>
      <div className={styles.playerCtl}>
        <button
          type="button"
          data-quest="play"
          className={styles.play}
          aria-label={playing ? "Pause" : "Play"}
          aria-pressed={playing}
          onClick={() => {
            if (!playing) markDone("music");
            setPlaying(!playing);
          }}
        >
          {playing ? "❚❚" : "▶"}
        </button>
        <a href={musicCopy.href} target="_blank" rel="noopener noreferrer" className={styles.spotify}>
          {musicCopy.listen}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </WindowFrame>
  );
}

/* ---------- Trash ---------- */

export function Trash() {
  const markDone = useOs((s) => s.markDone);
  const [sel, setSel] = useState<number | null>(null);
  const [msg, setMsg] = useState<string>(trashCopy.idle);
  return (
    <WindowFrame id="trash" title={trashCopy.title} label="Trash" className={styles.trash}>
      <ul className={styles.files} data-quest="trashlist" aria-label="Deleted files">
        {trashItems.map((it, i) => (
          <li key={it.name}>
            <button
              type="button"
              className={`${styles.trashItem} ${sel === i ? styles.procOn : ""}`}
              aria-pressed={sel === i}
              onClick={() => {
                markDone("dig");
                setSel(i);
                setMsg(it.note);
              }}
            >
              <span>{it.name}</span>
              <span className={styles.muted}>{it.size}</span>
            </button>
          </li>
        ))}
      </ul>
      <p className={styles.trashMsg} role="status">
        {msg}
      </p>
      <div className={styles.trashFoot}>
        <button type="button" className={styles.chipBox} onClick={() => setMsg(trashCopy.cantEmpty)}>
          Empty Trash
        </button>
      </div>
    </WindowFrame>
  );
}
