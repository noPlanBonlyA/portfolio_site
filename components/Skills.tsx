"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  GitBranch,
  Layers3,
  Network,
  Server,
  Wrench,
} from "lucide-react";
import type { ComponentType } from "react";
import { useRef } from "react";

import type { SkillStory } from "@/data/portfolio";
import { skillStories } from "@/data/portfolio";
import { cn } from "@/lib/utils";

import { SectionReveal } from "./SectionReveal";

type SkillExample = SkillStory["examples"][number];

const storyIcons: Record<SkillStory["id"], ComponentType<{ className?: string }>> = {
  frontend: Code2,
  backend: Server,
  pm: Wrench,
  lead: BriefcaseBusiness,
};

const railIcons = [Layers3, GitBranch, Network, ArrowRight];

const accentClasses: Record<
  SkillStory["accent"],
  {
    shell: string;
    icon: string;
    dot: string;
    line: string;
    text: string;
    glow: string;
    chip: string;
    border: string;
  }
> = {
  cyan: {
    shell: "border-cyan-300/22 bg-cyan-300/[0.045]",
    icon: "border-cyan-300/28 bg-cyan-300/10 text-cyan-100",
    dot: "bg-cyan-300",
    line: "from-cyan-300 via-cyan-100 to-transparent",
    text: "text-cyan-100",
    glow: "bg-cyan-300/14",
    chip: "border-cyan-300/20 bg-cyan-300/10 text-cyan-100",
    border: "border-cyan-300/24",
  },
  violet: {
    shell: "border-violet-300/22 bg-violet-300/[0.045]",
    icon: "border-violet-300/28 bg-violet-300/10 text-violet-100",
    dot: "bg-violet-300",
    line: "from-violet-300 via-violet-100 to-transparent",
    text: "text-violet-100",
    glow: "bg-violet-300/14",
    chip: "border-violet-300/20 bg-violet-300/10 text-violet-100",
    border: "border-violet-300/24",
  },
  blue: {
    shell: "border-blue-300/22 bg-blue-300/[0.045]",
    icon: "border-blue-300/28 bg-blue-300/10 text-blue-100",
    dot: "bg-blue-300",
    line: "from-blue-300 via-blue-100 to-transparent",
    text: "text-blue-100",
    glow: "bg-blue-300/14",
    chip: "border-blue-300/20 bg-blue-300/10 text-blue-100",
    border: "border-blue-300/24",
  },
  emerald: {
    shell: "border-emerald-300/22 bg-emerald-300/[0.045]",
    icon: "border-emerald-300/28 bg-emerald-300/10 text-emerald-100",
    dot: "bg-emerald-300",
    line: "from-emerald-300 via-emerald-100 to-transparent",
    text: "text-emerald-100",
    glow: "bg-emerald-300/14",
    chip: "border-emerald-300/20 bg-emerald-300/10 text-emerald-100",
    border: "border-emerald-300/24",
  },
  amber: {
    shell: "border-amber-300/22 bg-amber-300/[0.045]",
    icon: "border-amber-300/28 bg-amber-300/10 text-amber-100",
    dot: "bg-amber-300",
    line: "from-amber-300 via-amber-100 to-transparent",
    text: "text-amber-100",
    glow: "bg-amber-300/14",
    chip: "border-amber-300/20 bg-amber-300/10 text-amber-100",
    border: "border-amber-300/24",
  },
};

function getSegment(index: number, total: number) {
  const size = 1 / total;
  const start = Math.max(0, index * size - 0.08);
  const center = Math.min(1, index * size + size * 0.5);
  const end = Math.min(1, (index + 1) * size + 0.08);

  return { start, center, end };
}

type SkillRailItemProps = {
  example: SkillExample;
  index: number;
  total: number;
  progress: MotionValue<number>;
  accent: ReturnType<typeof getAccent>;
};

function getAccent(accent: SkillStory["accent"]) {
  return accentClasses[accent];
}

function SkillRailItem({ example, index, total, progress, accent }: SkillRailItemProps) {
  const { start, center, end } = getSegment(index, total);
  const Icon = railIcons[index % railIcons.length];
  const x = useTransform(progress, [start, center, end], [index % 2 === 0 ? -34 : 34, 0, index % 2 === 0 ? 10 : -10]);
  const y = useTransform(progress, [start, center, end], [18, 0, -14]);
  const opacity = useTransform(progress, [start, center, end], [0.28, 1, 0.48]);
  const scale = useTransform(progress, [start, center, end], [0.94, 1.04, 0.98]);

  return (
    <motion.div
      style={{ x, y, opacity, scale }}
      className={cn(
        "relative rounded-md border bg-[#0d1015]/90 p-3 shadow-2xl backdrop-blur-md",
        accent.border,
      )}
    >
      <div className="flex items-center gap-3">
        <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-md border", accent.icon)}>
          <Icon className="h-4 w-4" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">{example.company}</p>
          <p className="mt-1 truncate text-xs text-zinc-500">{example.title}</p>
        </div>
      </div>
    </motion.div>
  );
}

type SkillCaseProps = {
  example: SkillExample;
  index: number;
  total: number;
  progress: MotionValue<number>;
  story: SkillStory;
};

function SkillCase({ example, index, total, progress, story }: SkillCaseProps) {
  const accent = getAccent(story.accent);
  const { start, center, end } = getSegment(index, total);
  const y = useTransform(progress, [start, center, end], [44, 0, -18]);
  const opacity = useTransform(progress, [start, center, end], [0.38, 1, 0.72]);
  const scale = useTransform(progress, [start, center, end], [0.97, 1, 0.99]);

  return (
    <motion.article
      style={{ y, opacity, scale }}
      className={cn(
        "rounded-lg border bg-[#0b0c10]/80 p-5 backdrop-blur-md transition-colors duration-300 sm:p-6",
        accent.shell,
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className={cn("text-xs font-medium uppercase tracking-[0.22em]", accent.text)}>
            {example.role}
          </p>
          <h4 className="mt-3 text-2xl font-semibold tracking-normal text-white">{example.company}</h4>
          <p className="mt-2 text-sm text-zinc-500">{example.period}</p>
        </div>
        <span className={cn("inline-flex rounded-md border px-2.5 py-1 text-xs font-medium", accent.chip)}>
          {example.title}
        </span>
      </div>

      <p className="mt-5 leading-7 text-zinc-300">{example.impact}</p>

      <div className="mt-5 space-y-3">
        {example.tasks.map((task) => (
          <div key={task} className="flex gap-3 text-sm leading-6 text-zinc-400">
            <span className={cn("mt-2 h-1.5 w-1.5 shrink-0 rounded-full", accent.dot)} />
            <span>{task}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {example.tools.map((tool) => (
          <span key={tool} className="rounded-md border border-white/10 bg-white/[0.045] px-2.5 py-1 text-xs text-zinc-300">
            {tool}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

type SkillStoryBlockProps = {
  story: SkillStory;
  index: number;
};

function SkillStoryBlock({ story, index }: SkillStoryBlockProps) {
  const blockRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: blockRef,
    offset: ["start 0.82", "end 0.18"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 85, damping: 24, mass: 0.45 });
  const Icon = storyIcons[story.id];
  const accent = getAccent(story.accent);
  const rotate = useTransform(progress, [0, 1], [index % 2 === 0 ? -5 : 5, index % 2 === 0 ? 5 : -5]);
  const scale = useTransform(progress, [0, 0.52, 1], [0.96, 1.04, 0.99]);
  const beamScale = useTransform(progress, [0.05, 0.92], [0.08, 1]);
  const number = String(index + 1).padStart(2, "0");

  return (
    <section id={`skill-${story.id}`} ref={blockRef} className="scroll-mt-24 py-12 lg:min-h-[136vh]">
      <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <div className="lg:sticky lg:top-24">
          <div className="glass-panel relative overflow-hidden rounded-lg p-4 sm:p-5">
            <div className="premium-grid absolute inset-0 opacity-35 animate-grid-pan" />
            <div className={cn("absolute -right-14 top-12 h-36 w-36 rounded-full blur-3xl", accent.glow)} />
            <motion.div
              style={{ rotate, scale }}
              className="relative min-h-[430px] overflow-hidden rounded-md border border-white/10 bg-[#090b10]/90 p-5"
            >
              <div className="absolute inset-8 rounded-full border border-white/10" />
              <div className="absolute inset-16 rounded-full border border-dashed border-white/10" />
              <motion.div
                style={{ scaleY: beamScale, transformOrigin: "top" }}
                className={cn("absolute left-1/2 top-8 h-[calc(100%-4rem)] w-px bg-gradient-to-b", accent.line)}
              />

              <div className="relative z-10 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.24em] text-zinc-500">
                    Skill block {number}
                  </p>
                  <h3 className="mt-3 text-3xl font-semibold tracking-normal text-white">{story.shortTitle}</h3>
                </div>
                <span className={cn("flex h-12 w-12 items-center justify-center rounded-md border", accent.icon)}>
                  <Icon className="h-5 w-5" />
                </span>
              </div>

              <div className="relative z-10 mt-10 space-y-4">
                {story.examples.map((example, exampleIndex) => (
                  <SkillRailItem
                    key={`${story.id}-${example.company}`}
                    example={example}
                    index={exampleIndex}
                    total={story.examples.length}
                    progress={progress}
                    accent={accent}
                  />
                ))}
              </div>

              <div className="absolute inset-x-5 bottom-5">
                <div className="h-1 overflow-hidden rounded-full bg-white/[0.08]">
                  <motion.div
                    style={{ scaleX: beamScale, transformOrigin: "left" }}
                    className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="space-y-5 lg:pt-8">
          <div className="rounded-lg border border-white/[0.09] bg-white/[0.035] p-5 backdrop-blur-md sm:p-6">
            <p className={cn("text-sm font-medium uppercase tracking-[0.22em]", accent.text)}>
              {story.eyebrow}
            </p>
            <h3 className="mt-4 text-4xl font-semibold tracking-normal text-white sm:text-5xl">
              {story.title}
            </h3>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-400">{story.summary}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {story.stack.map((tool) => (
                <span key={tool} className={cn("rounded-md border px-2.5 py-1 text-xs font-medium", accent.chip)}>
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {story.examples.map((example, exampleIndex) => (
            <SkillCase
              key={`${story.id}-${example.company}-case`}
              example={example}
              index={exampleIndex}
              total={story.examples.length}
              progress={progress}
              story={story}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-cyan-200/80">
                Skill-based portfolio
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-normal text-white sm:text-5xl">
                First by skill, then by workplace.
              </h2>
            </div>
            <p className="text-lg leading-8 text-zinc-400">
              Each section shows a skill area and the exact work examples behind it: what happened
              at Gazprom / Gazekonomika, SENAT AI, Leadmakers, the startup project and the driving school.
            </p>
          </div>
        </SectionReveal>

        <SectionReveal className="mt-8">
          <nav aria-label="Skill anchors" className="flex flex-wrap gap-2">
            {skillStories.map((story) => {
              const Icon = storyIcons[story.id];
              const accent = getAccent(story.accent);

              return (
                <a
                  key={story.id}
                  href={`#skill-${story.id}`}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition-colors hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70",
                    accent.chip,
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {story.shortTitle}
                </a>
              );
            })}
            <a
              href="#experience"
              className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.055] px-3 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
            >
              <BriefcaseBusiness className="h-4 w-4" />
              Workplaces
            </a>
          </nav>
        </SectionReveal>

        <div className="mt-10 space-y-20">
          {skillStories.map((story, index) => (
            <SkillStoryBlock key={story.id} story={story} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
