import { ExternalLink, FileText, Github, Sparkles } from "lucide-react";
import type { ReactNode } from "react";

import type { Project, ProjectPreviewVariant } from "@/data/portfolio";
import { cn } from "@/lib/utils";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

type ProjectCardProps = {
  project: Project;
};

const previewAccent: Record<ProjectPreviewVariant, string> = {
  enterprise: "from-cyan-300/20 via-blue-300/10 to-transparent",
  education: "from-violet-300/20 via-cyan-300/10 to-transparent",
  telegram: "from-blue-300/20 via-cyan-300/10 to-transparent",
  commerce: "from-emerald-300/[0.18] via-cyan-300/10 to-transparent",
  landing: "from-amber-300/[0.18] via-cyan-300/10 to-transparent",
  kanban: "from-violet-300/[0.18] via-emerald-300/10 to-transparent",
};

function actionIcon(label: string) {
  if (label === "GitHub") {
    return <Github className="h-4 w-4" />;
  }

  if (label === "Case Study") {
    return <FileText className="h-4 w-4" />;
  }

  return <ExternalLink className="h-4 w-4" />;
}

function BrowserChrome({ children, title }: { children: ReactNode; title: string }) {
  return (
    <div className="h-full overflow-hidden rounded-md border border-white/10 bg-[#08090d] shadow-2xl">
      <div className="flex h-9 items-center justify-between border-b border-white/10 bg-white/[0.03] px-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/80" />
        </div>
        <span className="max-w-[9rem] truncate rounded-md border border-white/10 bg-black/30 px-2 py-1 text-[10px] text-zinc-500 sm:max-w-[12rem]">
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}

function EnterprisePreview() {
  const rows = ["Finance", "Engineer", "Admin", "Viewer", "Security", "Analyst", "Manager"];

  return (
    <BrowserChrome title="enterprise.internal/dashboard">
      <div className="grid h-[calc(100%-2.25rem)] grid-cols-[4.5rem_1fr] bg-[#090a0f] text-[10px] text-zinc-400">
        <aside className="border-r border-white/10 bg-white/[0.03] p-2">
          <div className="mb-4 h-5 rounded-md bg-cyan-300/20" />
          <div className="space-y-2">
            {[0, 1, 2, 3, 4].map((item) => (
              <div key={item} className={cn("h-3 rounded-full bg-white/10", item === 1 && "bg-cyan-300/35")} />
            ))}
          </div>
        </aside>
        <div className="p-3">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <div className="h-3 w-24 rounded-full bg-white/15" />
              <div className="mt-2 h-2 w-16 rounded-full bg-white/10" />
            </div>
            <span className="rounded-md border border-cyan-300/20 bg-cyan-300/10 px-2 py-1 text-cyan-100">
              RBAC role
            </span>
          </div>
          <div className="mb-3 grid grid-cols-3 gap-2">
            {["API", "Users", "Tasks"].map((item, index) => (
              <div key={item} className="rounded-md border border-white/10 bg-white/[0.04] p-2">
                <div className="mb-2 h-2 w-10 rounded-full bg-white/10" />
                <div className={cn("h-6 rounded-md", index === 0 ? "bg-cyan-300/20" : index === 1 ? "bg-violet-300/20" : "bg-blue-300/20")} />
              </div>
            ))}
          </div>
          <div className="h-24 overflow-hidden rounded-md border border-white/10 bg-black/30">
            <div className="animate-table-shift">
              {[...rows, ...rows].map((row, index) => (
                <div key={`${row}-${index}`} className="grid h-[21px] grid-cols-[1fr_3rem_3rem] items-center border-b border-white/[0.06] px-2">
                  <span>{row}</span>
                  <span className="h-2 rounded-full bg-white/10" />
                  <span className={cn("ml-2 rounded-md px-1 py-0.5 text-center", index % 3 === 0 ? "bg-emerald-300/10 text-emerald-100" : "bg-cyan-300/10 text-cyan-100")}>
                    ok
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </BrowserChrome>
  );
}

function EducationPreview() {
  return (
    <BrowserChrome title="senat.ai/admin">
      <div className="h-[calc(100%-2.25rem)] bg-[#090a0f] p-3 text-[10px] text-zinc-400">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <div className="h-3 w-28 rounded-full bg-white/15" />
            <div className="mt-2 h-2 w-20 rounded-full bg-white/10" />
          </div>
          <span className="rounded-md border border-violet-300/20 bg-violet-300/10 px-2 py-1 text-violet-100 animate-status-pulse">
            content sync
          </span>
        </div>
        <div className="grid grid-cols-[1fr_7rem] gap-2">
          <div className="space-y-2">
            {["Course Builder", "Students", "Assignments"].map((item, index) => (
              <div key={item} className="rounded-md border border-white/10 bg-white/[0.04] p-2">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-zinc-300">{item}</span>
                  <span className="text-cyan-100">{72 + index * 8}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className={cn("h-full rounded-full bg-gradient-to-r from-cyan-300 to-violet-300", index === 0 ? "w-[72%]" : index === 1 ? "w-[80%]" : "w-[88%]")} />
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-md border border-white/10 bg-black/30 p-2">
            <div className="mb-2 h-2 w-12 rounded-full bg-white/15" />
            <div className="grid grid-cols-2 gap-1.5">
              {[0, 1, 2, 3, 4, 5].map((item) => (
                <div key={item} className={cn("aspect-square rounded-md", item % 2 === 0 ? "bg-cyan-300/[0.18]" : "bg-violet-300/[0.18]")} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </BrowserChrome>
  );
}

function TelegramPreview() {
  const messages = [
    { text: "/start character", mine: true },
    { text: "Describe the style", mine: false },
    { text: "cyber mage, blue coat", mine: true },
    { text: "Generating 3D options...", mine: false },
  ];

  return (
    <div className="mx-auto flex h-full max-w-[15.5rem] flex-col rounded-[1.4rem] border border-white/10 bg-[#08090d] p-2 shadow-2xl">
      <div className="mb-2 flex justify-center">
        <div className="h-1.5 w-14 rounded-full bg-white/20" />
      </div>
      <div className="flex flex-1 flex-col overflow-hidden rounded-[1rem] border border-white/10 bg-[#0b1020]">
        <div className="border-b border-white/10 bg-blue-400/12 px-3 py-2">
          <div className="text-xs font-semibold text-white">AI Character Bot</div>
          <div className="text-[10px] text-cyan-100">online</div>
        </div>
        <div className="flex flex-1 flex-col justify-end gap-2 p-3 text-[10px]">
          {messages.map((message, index) => (
            <div
              key={message.text}
              className={cn(
                "max-w-[86%] rounded-md px-2.5 py-2 leading-relaxed animate-chat-rise",
                message.mine
                  ? "ml-auto bg-cyan-300/[0.18] text-cyan-50"
                  : "mr-auto border border-white/10 bg-white/[0.06] text-zinc-200",
              )}
              style={{ animationDelay: `${index * 0.28}s` }}
            >
              {message.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CommercePreview() {
  return (
    <BrowserChrome title="bitrix.store/admin">
      <div className="h-[calc(100%-2.25rem)] bg-[#090a0f] p-3 text-[10px] text-zinc-400">
        <div className="mb-3 grid grid-cols-[1fr_auto] gap-2">
          <div className="rounded-md border border-white/10 bg-white/[0.04] p-2">
            <div className="mb-2 h-2 w-20 rounded-full bg-white/15" />
            <div className="flex gap-1.5">
              {["Catalog", "Orders", "Cache"].map((item) => (
                <span key={item} className="rounded-md bg-white/[0.06] px-2 py-1 text-zinc-300">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-md border border-emerald-300/20 bg-emerald-300/10 px-3 py-2 text-emerald-100">
            +38% perf
          </div>
        </div>
        <div className="grid grid-cols-[4rem_1fr] gap-2">
          <div className="space-y-2 rounded-md border border-white/10 bg-black/25 p-2">
            {[0, 1, 2, 3].map((item) => (
              <div key={item} className={cn("h-3 rounded-full", item === 0 ? "bg-emerald-300/25" : "bg-white/10")} />
            ))}
          </div>
          <div className="space-y-2">
            {[0, 1, 2].map((item) => (
              <div key={item} className="grid grid-cols-[2.6rem_1fr_3rem] items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] p-2">
                <div className={cn("h-8 rounded-md", item === 0 ? "bg-cyan-300/[0.18]" : item === 1 ? "bg-violet-300/[0.18]" : "bg-emerald-300/[0.18]")} />
                <div>
                  <div className="mb-2 h-2 w-20 rounded-full bg-white/15" />
                  <div className="h-2 w-12 rounded-full bg-white/10" />
                </div>
                <div className="rounded-md bg-emerald-300/10 px-1 py-1 text-center text-emerald-100">cached</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BrowserChrome>
  );
}

function LandingPreview() {
  return (
    <BrowserChrome title="driving-school/site">
      <div className="h-[calc(100%-2.25rem)] bg-[#090a0f] p-3 text-[10px] text-zinc-400">
        <div className="mb-3 rounded-md border border-white/10 bg-gradient-to-br from-cyan-300/15 via-white/[0.04] to-amber-300/10 p-3">
          <div className="mb-2 h-3 w-28 rounded-full bg-white/25" />
          <div className="mb-3 h-2 w-40 rounded-full bg-white/15" />
          <div className="flex gap-2">
            <span className="rounded-md bg-cyan-300 px-2 py-1 text-slate-950">Enroll</span>
            <span className="rounded-md border border-white/15 px-2 py-1 text-white">Prices</span>
          </div>
        </div>
        <div className="grid grid-cols-[1fr_7rem] gap-2">
          <div className="space-y-2">
            {[0, 1, 2].map((item) => (
              <div key={item} className="rounded-md border border-white/10 bg-white/[0.04] p-2">
                <div className="mb-2 h-2 w-20 rounded-full bg-white/15" />
                <div className="h-1.5 rounded-full bg-cyan-300/30" />
              </div>
            ))}
          </div>
          <div className="rounded-md border border-white/10 bg-black/25 p-2">
            <div className="mb-2 text-zinc-300">Lead form</div>
            <div className="space-y-1.5">
              <div className="h-5 rounded-md bg-white/10" />
              <div className="h-5 rounded-md bg-white/10" />
              <div className="h-6 rounded-md bg-amber-300/30" />
            </div>
          </div>
        </div>
      </div>
    </BrowserChrome>
  );
}

function KanbanPreview() {
  return (
    <BrowserChrome title="operations.workflow/board">
      <div className="grid h-[calc(100%-2.25rem)] grid-cols-3 gap-2 bg-[#090a0f] p-3 text-[10px] text-zinc-400">
        {["Backlog", "In work", "Done"].map((column, columnIndex) => (
          <div key={column} className="rounded-md border border-white/10 bg-white/[0.035] p-2">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-zinc-300">{column}</span>
              <span className="rounded-md bg-white/[0.06] px-1.5 py-0.5">{columnIndex + 2}</span>
            </div>
            <div className="space-y-2">
              {[0, 1, 2].map((item) => (
                <div
                  key={item}
                  className={cn(
                    "rounded-md border border-white/10 bg-black/25 p-2",
                    columnIndex === 1 && item === 0 && "translate-y-1 border-cyan-300/30 bg-cyan-300/10",
                  )}
                >
                  <div className="mb-2 h-2 rounded-full bg-white/15" />
                  <div className={cn("h-1.5 rounded-full", columnIndex === 2 ? "bg-emerald-300/30" : "bg-violet-300/25")} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </BrowserChrome>
  );
}

function ProjectPreview({ project }: { project: Project }) {
  return (
    <div className={cn("relative aspect-[16/10] overflow-hidden rounded-md bg-gradient-to-br p-3", previewAccent[project.preview])}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12),transparent_42%)]" />
      <div className="relative h-full">
        {project.media?.kind === "video" ? (
          <video
            className="h-full w-full rounded-md object-cover"
            src={project.media.src}
            poster={project.media.poster}
            autoPlay
            muted
            loop
            playsInline
            aria-label={project.media.alt}
          />
        ) : null}
        {project.media?.kind === "image" ? (
          <img className="h-full w-full rounded-md object-cover" src={project.media.src} alt={project.media.alt} />
        ) : null}
        {!project.media && project.preview === "enterprise" && <EnterprisePreview />}
        {!project.media && project.preview === "education" && <EducationPreview />}
        {!project.media && project.preview === "telegram" && <TelegramPreview />}
        {!project.media && project.preview === "commerce" && <CommercePreview />}
        {!project.media && project.preview === "landing" && <LandingPreview />}
        {!project.media && project.preview === "kanban" && <KanbanPreview />}
      </div>
      <span className="sr-only">{project.title} preview mockup</span>
    </div>
  );
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-lg border border-white/[0.09] bg-[#0b0c10]/78 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/25 hover:shadow-cyan-soft sm:p-5">
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <ProjectPreview project={project} />

      <div className="mt-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge variant="graphite">{project.type}</Badge>
          <Badge variant="blue">{project.role}</Badge>
        </div>

        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-cyan-300/20 bg-cyan-300/10 text-cyan-100">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-xl font-semibold tracking-normal text-white">{project.title}</h3>
            {project.company ? <p className="mt-1 text-sm text-zinc-500">{project.company}</p> : null}
          </div>
        </div>

        <p className="mt-4 leading-7 text-zinc-300">{project.description}</p>

        <div className="mt-4 grid gap-2">
          {project.highlights.map((highlight) => (
            <div key={highlight} className="flex gap-2 text-sm leading-6 text-zinc-400">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
              <span>{highlight}</span>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <Badge key={tech} variant="graphite" className="bg-white/[0.04]">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.actions.map((action) => (
            <Button key={action.label} asChild size="sm" variant={action.label === "Case Study" ? "default" : "secondary"}>
              <a href={action.href} aria-label={`${action.label} for ${project.title}`}>
                {actionIcon(action.label)}
                {action.label}
              </a>
            </Button>
          ))}
        </div>
      </div>
    </article>
  );
}
