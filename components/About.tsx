import { BrainCircuit, Layers3, Route } from "lucide-react";

import { about, workSteps } from "@/data/portfolio";

import { SectionReveal } from "./SectionReveal";

const aboutIcons = {
  product: Route,
  delivery: Layers3,
  ai: BrainCircuit,
};

export function About() {
  return (
    <section id="about" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-cyan-200/80">About</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-normal text-white sm:text-5xl">
                Practical full stack work with product judgment.
              </h2>
            </div>
            <p className="text-lg leading-8 text-zinc-300">{about.text}</p>
          </div>
        </SectionReveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {about.cards.map((card, index) => {
            const Icon = aboutIcons[card.icon];

            return (
              <SectionReveal key={card.title} delay={index * 0.05}>
                <article className="h-full rounded-lg border border-white/[0.09] bg-[#0b0c10]/76 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/25">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-md border border-cyan-300/25 bg-cyan-300/10 text-cyan-100">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{card.title}</h3>
                  <p className="mt-3 leading-7 text-zinc-400">{card.description}</p>
                </article>
              </SectionReveal>
            );
          })}
        </div>

        <SectionReveal className="mt-20">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-violet-200/80">
                How I work
              </p>
              <h3 className="mt-4 text-3xl font-semibold tracking-normal text-white sm:text-4xl">
                From requirement to useful increment.
              </h3>
            </div>
            <p className="max-w-xl leading-7 text-zinc-400">
              The process is intentionally direct: understand the workflow, model the system, build,
              ship and iterate.
            </p>
          </div>
        </SectionReveal>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {workSteps.map((step, index) => (
            <SectionReveal key={step.title} delay={index * 0.04}>
              <article className="h-full rounded-lg border border-white/[0.09] bg-white/[0.045] p-5 backdrop-blur-md">
                <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-md border border-violet-300/25 bg-violet-300/10 text-sm font-semibold text-violet-100">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h4 className="text-lg font-semibold text-white">{step.title}</h4>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{step.description}</p>
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
