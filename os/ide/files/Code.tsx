"use client";

import type { ReactNode } from "react";

import { about } from "@/content/profile";
import { links } from "@/content/links";
import { projectById, type ProjectId } from "@/content/projects";
import { jobDates, resumeEn, stack } from "@/content/resume";
import { ideCopy } from "@/content/ide";
import { useOs } from "@/store/os";

import styles from "../ide.module.css";

/** One numbered editor line (numbers come from a CSS counter). */
export function Ln({ children, className }: { children?: ReactNode; className?: string }) {
  return (
    <div className={`${styles.ln} ${className ?? ""}`}>
      <span className={styles.t}>{children ?? " "}</span>
    </div>
  );
}

const K = ({ children }: { children: ReactNode }) => <span className={styles.k}>{children}</span>;
const P = ({ children }: { children: ReactNode }) => <span className={styles.p}>{children}</span>;
const S = ({ children }: { children: ReactNode }) => <span className={styles.s}>{children}</span>;
const C = ({ children }: { children: ReactNode }) => <span className={styles.c}>{children}</span>;
const N = ({ children }: { children: ReactNode }) => <span className={styles.n}>{children}</span>;

export function ProjectFile({ id }: { id: ProjectId }) {
  const p = projectById(id);
  if (!p) return null;
  const meta: [string, string][] = [
    ["title", p.title],
    ["org", p.org],
    ["role", p.role],
    ["period", p.period],
  ];
  return (
    <div className={styles.code}>
      <Ln>
        <C>---</C>
      </Ln>
      {meta.map(([k, v]) => (
        <Ln key={k}>
          <P>{k}</P>
          <N>: </N>
          <S>&quot;{v}&quot;</S>
        </Ln>
      ))}
      <Ln>
        <C>---</C>
      </Ln>
      <Ln />
      <Ln className={styles.lnEnd}>
        <span className={styles.big}>
          <span className={styles.bigHash}>#</span>
          {p.big}
        </span>
      </Ln>
      <Ln>
        <span className={styles.bigLabel}>{p.bigLabel}</span>
      </Ln>
      <Ln />
      {p.facts.map((f) => (
        <Ln key={f.text}>
          <K>- </K>
          <N>{f.text}</N>
          <span className={styles.blame} data-hl-ignore="">
            Andrey · {f.blame.date} · {f.blame.msg}
          </span>
        </Ln>
      ))}
      <Ln />
      <Ln>
        <C>stack:</C>
      </Ln>
      <Ln>
        <span className={styles.tags}>
          {p.tags.map((t) => (
            <span key={t} className={styles.tag}>
              {t}
            </span>
          ))}
        </span>
      </Ln>
    </div>
  );
}

const plain = (s: string) => s.replace(/\*\*/g, "");

export function ExperienceLog() {
  return (
    <div className={styles.code}>
      <Ln>
        <C># git log --career</C>
      </Ln>
      {resumeEn.jobs.map((j) => {
        const d = jobDates[j.id];
        return (
          <div key={j.id}>
            <Ln />
            <Ln>
              <K>* </K>
              <S>
                {d.from} → {d.to ?? "now"}
              </S>
              {"   "}
              <span className={styles.company}>{j.company}</span>
            </Ln>
            <Ln>
              <P>{"  "}role:</P> <N>{j.role}</N>
            </Ln>
            {j.bullets.map((b) => (
              <Ln key={b}>
                <C>
                  {"  "}
                  {plain(b)}
                </C>
              </Ln>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export function StackTs() {
  return (
    <div className={styles.code}>
      <Ln>
        <C>{ideCopy.stackComment}</C>
      </Ln>
      <Ln>
        <K>export const</K> <N>stack = {"{"}</N>
      </Ln>
      {stack.map((g) => (
        <Ln key={g.key}>
          {"  "}
          <P>{g.key}</P>
          <N>: </N>
          <S>[{g.items.map((i) => `"${i}"`).join(", ")}]</S>
          <N>,</N>
        </Ln>
      ))}
      <Ln>
        <N>{"};"}</N>
        <span className="caret" />
      </Ln>
    </div>
  );
}

export function AboutMd() {
  return (
    <div className={styles.code}>
      <Ln>
        <K>## </K>
        <span className={styles.aboutHead}>{about.headline}</span>
      </Ln>
      <Ln />
      {about.items.map((it, i) => (
        <Ln key={it.key}>
          <K>- </K>
          <P>{it.key}:</P> <N>{it.value}</N>
          {i === about.items.length - 1 && <span className="caret" />}
        </Ln>
      ))}
    </div>
  );
}

export function ContactSh() {
  const summarize = useOs((s) => s.summarize);
  const open: [string, string][] = [
    [links.telegram, links.telegram],
    [links.github, links.github],
  ];
  return (
    <div className={styles.code}>
      <Ln>
        <C>#!/bin/sh</C>
      </Ln>
      <Ln>
        <C># let&apos;s build something</C>
      </Ln>
      <Ln />
      <Ln>
        <a href={links.telegram} target="_blank" rel="noopener noreferrer" className={`${styles.letsBuild} rollhost`} aria-label={`Let's build — message me on Telegram ${links.telegramHandle}`}>
          <span className="roll" style={{ height: "1em", lineHeight: "1em" }} aria-hidden="true">
            <span className="roll-in">
              <span>Let&apos;s build.</span>
              <span style={{ color: "var(--accent)" }}>Let&apos;s build.</span>
            </span>
          </span>
        </a>
      </Ln>
      <Ln />
      {open.map(([href, label]) => (
        <Ln key={href}>
          <K>open</K>{" "}
          <a href={href} target="_blank" rel="noopener noreferrer" className={`${styles.s} ${styles.link}`}>
            {label}
          </a>
        </Ln>
      ))}
      <Ln>
        <K>./summarize</K>{" "}
        <button type="button" onClick={summarize} data-cursor="sum" className={`${styles.s} ${styles.link}`}>
          --format=cv
        </button>
        <span className="caret" />
      </Ln>
    </div>
  );
}
