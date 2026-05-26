import { projects } from "@/data/portfolio";

import { ProjectCard } from "./ProjectCard";
import { SectionReveal } from "./SectionReveal";

export function Projects() {
  return (
    <section id="projects" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-cyan-200/80">
              Featured projects
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-normal text-white sm:text-5xl">
              Product-shaped work, not resume tiles.
            </h2>
            <p className="mt-5 text-lg leading-8 text-zinc-400">
              Each project is presented as a working product surface: dashboards, admin flows, Telegram UI,
              CMS operations and workflow tools.
            </p>
          </div>
        </SectionReveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {projects.map((project, index) => (
            <SectionReveal key={project.title} delay={index * 0.05}>
              <ProjectCard project={project} />
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
