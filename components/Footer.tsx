import { navItems } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.08] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between">
        <p>Andrey Dmitriev - Full Stack Developer</p>
        <div className="flex flex-wrap gap-3">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-white">
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
