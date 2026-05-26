"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Send } from "lucide-react";
import Image from "next/image";

import { hero, profile, stats } from "@/data/portfolio";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const floatingPositions = [
  "left-[-0.5rem] top-[18%] sm:left-[-2.5rem]",
  "right-[-0.4rem] top-[12%] sm:right-[-2rem]",
  "bottom-[24%] left-[-0.8rem] sm:left-[-3rem]",
  "bottom-[18%] right-[-0.5rem] sm:right-[-2.5rem]",
  "bottom-[-0.6rem] left-1/2 -translate-x-1/2",
];

function ctaIcon(label: string) {
  if (label === "Download CV") {
    return <Download className="h-4 w-4" />;
  }

  if (label === "Contact Me") {
    return <Send className="h-4 w-4" />;
  }

  return <ArrowRight className="h-4 w-4" />;
}

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-24 pt-20 sm:px-6 sm:pb-28 sm:pt-24 lg:px-8 lg:pb-32 lg:pt-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <Badge variant="graphite" className="mb-6">
            Available for strong product teams
          </Badge>
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.32em] text-cyan-200/80">
            {hero.name}
          </p>
          <h1 className="text-balance text-5xl font-semibold leading-[0.95] tracking-normal text-white sm:text-6xl lg:text-7xl">
            {hero.title}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-300 sm:text-xl">
            {hero.subtitle}
          </p>

          <div className="mt-7 flex flex-wrap gap-2.5">
            {hero.badges.map((badge, index) => (
              <motion.div
                key={badge}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 + index * 0.04, duration: 0.45 }}
              >
                <Badge variant={index % 3 === 0 ? "default" : index % 3 === 1 ? "violet" : "blue"}>
                  {badge}
                </Badge>
              </motion.div>
            ))}
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {hero.ctas.map((cta) => (
              <Button key={cta.label} asChild size="lg" variant={cta.variant}>
                <a href={cta.href} download={cta.download ? true : undefined}>
                  {ctaIcon(cta.label)}
                  {cta.label}
                </a>
              </Button>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={`${stat.value}-${stat.label}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 + index * 0.06, duration: 0.5 }}
                className="rounded-md border border-white/[0.08] bg-white/[0.04] p-4"
              >
                <div className="text-2xl font-semibold text-white">{stat.value}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.22em] text-zinc-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.16, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-xl"
        >
          <div className="absolute inset-0 rounded-[2rem] bg-cyan-300/[0.08] blur-3xl" />
          <div className="glass-panel mockup-shine relative rounded-lg p-4 sm:p-5">
            <div className="rounded-md border border-white/10 bg-[#08090d] shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400/80" />
                  <span className="h-3 w-3 rounded-full bg-amber-300/80" />
                  <span className="h-3 w-3 rounded-full bg-emerald-300/80" />
                </div>
                <span className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-zinc-400">
                  andrey.dev
                </span>
              </div>

              <div className="space-y-6 p-5 sm:p-6">
                <div className="grid gap-4 sm:grid-cols-[0.9fr_1.1fr]">
                  <div className="relative min-h-[240px] overflow-hidden rounded-md border border-cyan-300/20 bg-[#0d1015]">
                    <div className="premium-grid absolute inset-0 opacity-50 animate-grid-pan" />
                    <div className="absolute inset-x-8 top-6 h-px bg-gradient-to-r from-transparent via-cyan-200/55 to-transparent" />
                    <div className="absolute bottom-0 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full bg-cyan-300/12 blur-2xl" />
                    <div className="relative flex h-full min-h-[240px] items-end justify-center p-4">
                      <div className="relative flex h-48 w-40 items-center justify-center overflow-hidden rounded-md border border-white/12 bg-gradient-to-b from-white/[0.09] to-white/[0.035] shadow-2xl">
                        {profile.photoSrc ? (
                          <Image
                            src={profile.photoSrc}
                            alt={profile.photoAlt}
                            fill
                            sizes="160px"
                            className="object-cover"
                            priority
                          />
                        ) : (
                          <span className="text-5xl font-semibold tracking-normal text-white/90">
                            {profile.initials}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    {["Frontend", "Backend", "PM / Lead"].map((item, index) => (
                      <div key={item} className="rounded-md border border-white/[0.08] bg-white/[0.04] p-3">
                        <div className="mb-3 flex items-center justify-between">
                          <span className="text-xs font-medium text-zinc-400">{item}</span>
                          <span
                            className={[
                              "h-2 w-2 rounded-full",
                              index === 0 ? "bg-cyan-300" : index === 1 ? "bg-violet-300" : "bg-amber-300",
                            ].join(" ")}
                          />
                        </div>
                        <div className="h-9 rounded-md bg-white/[0.04] p-1">
                          <div
                            className={[
                              "h-full rounded-sm",
                              index === 0
                                ? "w-[92%] bg-cyan-300/[0.18]"
                                : index === 1
                                  ? "w-[84%] bg-violet-300/[0.18]"
                                  : "w-[76%] bg-amber-300/[0.18]",
                            ].join(" ")}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-md border border-cyan-300/15 bg-black/40 p-4 font-mono text-sm">
                  <div className="mb-3 flex items-center gap-2 text-xs text-zinc-500">
                    <span className="h-2 w-2 rounded-full bg-cyan-300 animate-status-pulse" />
                    terminal
                  </div>
                  <div className="space-y-3">
                    {hero.terminalLines.map((line, index) => (
                      <motion.div
                        key={line}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.42 + index * 0.18, duration: 0.42 }}
                        className="text-cyan-100/90"
                      >
                        {line}
                      </motion.div>
                    ))}
                    <div className="text-violet-100/90">
                      <span>&gt; ready</span>
                      <span className="ml-1 inline-block h-4 w-2 translate-y-0.5 bg-cyan-200 animate-terminal-caret" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-[1fr_auto] gap-3">
                  <div className="rounded-md border border-white/[0.08] bg-white/[0.04] p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-xs text-zinc-500">deploy pipeline</span>
                      <span className="rounded-md bg-emerald-300/10 px-2 py-1 text-xs text-emerald-100">live</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/[0.08]">
                      <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-cyan-300 to-violet-300" />
                    </div>
                  </div>
                  <div className="flex h-full w-20 items-center justify-center rounded-md border border-white/[0.08] bg-white/[0.04] text-2xl font-semibold text-white">
                    2nd
                  </div>
                </div>
              </div>
            </div>
          </div>

          {hero.floatingBadges.map((badge, index) => (
            <div
              key={badge}
              className={`absolute ${floatingPositions[index] ?? "left-0 top-0"} hidden rounded-md border border-white/10 bg-[#0c0d12]/90 px-3 py-2 text-xs font-medium text-zinc-200 shadow-violet-soft backdrop-blur-md sm:block animate-float-slow`}
              style={{ animationDelay: `${index * 0.35}s` }}
            >
              {badge}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
