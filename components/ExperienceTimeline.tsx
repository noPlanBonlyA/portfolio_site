import { BriefcaseBusiness, CalendarDays } from "lucide-react";

import type { ExperienceType } from "@/data/portfolio";
import { experience } from "@/data/portfolio";
import { cn } from "@/lib/utils";

import { Badge } from "./ui/badge";
import { SectionReveal } from "./SectionReveal";

const typeStyles: Record<ExperienceType, string> = {
  Commercial: "border-cyan-300/25 bg-cyan-300/10 text-cyan-100",
  Startup: "border-violet-300/25 bg-violet-300/10 text-violet-100",
  CMS: "border-blue-300/25 bg-blue-300/10 text-blue-100",
  "Project Management": "border-amber-300/25 bg-amber-300/10 text-amber-100",
  "Technical Administration": "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
};

export function ExperienceTimeline() {
  return (
    <section id="experience" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-cyan-200/80">
              Workplaces
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-normal text-white sm:text-5xl">
              Workplaces and chronology below the skill map.
            </h2>
            <p className="mt-5 text-lg leading-8 text-zinc-400">
              The timeline is still here for context, but the page leads with what kind of work I can
              do and uses the workplaces as supporting proof.
            </p>
          </div>
        </SectionReveal>

        <div className="relative mt-14">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-cyan-300/50 via-white/10 to-transparent md:left-1/2" />

          <div className="space-y-7">
            {experience.map((item, index) => (
              <SectionReveal key={`${item.company}-${item.role}`} delay={index * 0.04}>
                <article
                  className={cn(
                    "relative grid gap-5 pl-12 md:grid-cols-2 md:gap-10 md:pl-0",
                    index % 2 === 0 ? "md:[&>div]:col-start-1" : "md:[&>div]:col-start-2",
                  )}
                >
                  <div className="absolute left-0 top-5 flex h-8 w-8 items-center justify-center rounded-md border border-cyan-300/30 bg-[#0b0c10] text-cyan-100 shadow-cyan-soft md:left-1/2 md:-translate-x-1/2">
                    <BriefcaseBusiness className="h-4 w-4" />
                  </div>

                  <div className="rounded-lg border border-white/[0.09] bg-[#0b0c10]/78 p-5 backdrop-blur-md transition-colors duration-300 hover:border-cyan-300/22">
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                      <span className={cn("inline-flex rounded-md border px-2.5 py-1 text-xs font-medium", typeStyles[item.type])}>
                        {item.type}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.05] px-2.5 py-1 text-xs text-zinc-400">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {item.period}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold text-white">{item.company}</h3>
                    {item.department ? <p className="mt-1 text-sm text-zinc-500">{item.department}</p> : null}
                    <p className="mt-3 font-medium text-cyan-100">{item.role}</p>

                    <div className="mt-4 space-y-2">
                      {item.points.map((point) => (
                        <div key={point} className="flex gap-2 text-sm leading-6 text-zinc-400">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.stack.map((tag) => (
                        <Badge key={tag} variant="graphite">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </article>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
