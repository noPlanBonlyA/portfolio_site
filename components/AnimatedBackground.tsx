export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#050507]" aria-hidden="true">
      <div className="premium-grid absolute inset-0 opacity-[0.18] [mask-image:linear-gradient(to_bottom,black,transparent_88%)] animate-grid-pan" />
      <div className="noise-mask absolute inset-0 opacity-80" />
      <div className="aurora-band absolute left-[-12%] top-[-12rem] h-[28rem] w-[124%] rotate-[-6deg] opacity-70" />
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-cyan-300/[0.08] via-transparent to-transparent" />
      <div className="absolute inset-x-[-18%] bottom-[-10rem] h-[24rem] bg-[linear-gradient(92deg,transparent_0%,rgba(34,211,238,0.08)_26%,rgba(139,92,246,0.07)_48%,rgba(16,185,129,0.045)_68%,transparent_100%)] blur-3xl" />
    </div>
  );
}
