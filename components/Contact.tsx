import { Github, Linkedin, Mail, Send } from "lucide-react";

import { contacts } from "@/data/portfolio";

import { Button } from "./ui/button";
import { SectionReveal } from "./SectionReveal";

const contactIcons = {
  mail: Mail,
  telegram: Send,
  github: Github,
  linkedin: Linkedin,
};

export function Contact() {
  return (
    <section id="contact" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <div className="glass-panel overflow-hidden rounded-lg">
            <div className="grid gap-0 lg:grid-cols-[1fr_0.9fr]">
              <div className="p-6 sm:p-8 lg:p-10">
                <p className="text-sm font-medium uppercase tracking-[0.28em] text-cyan-200/80">Contact</p>
                <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-normal text-white sm:text-5xl">
                  Let's build something useful and polished.
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
                  Open to full stack product work, internal systems, AI-enabled services and frontend
                  architecture tasks.
                </p>

                <div className="mt-8">
                  <Button asChild size="lg">
                    <a href="mailto:andrey.dmitriev@example.com">
                      <Send className="h-4 w-4" />
                      Let's build something
                    </a>
                  </Button>
                </div>
              </div>

              <div className="border-t border-white/10 bg-black/20 p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
                <div className="space-y-4">
                  {contacts.map((contact) => {
                    const Icon = contactIcons[contact.icon];

                    return (
                      <a
                        key={contact.label}
                        href={contact.href}
                        className="group flex items-center gap-4 rounded-md border border-white/10 bg-white/[0.04] p-4 transition-colors hover:border-cyan-300/30 hover:bg-cyan-300/10"
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-white/10 bg-black/20 text-cyan-100 transition-colors group-hover:border-cyan-300/30">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm text-zinc-500">{contact.label}</span>
                          <span className="block truncate font-medium text-zinc-100">{contact.value}</span>
                        </span>
                      </a>
                    );
                  })}
                </div>
                {/* Phone can be added here later if needed; it is intentionally omitted to reduce spam. */}
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
