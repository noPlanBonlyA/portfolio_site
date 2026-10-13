// Short square-wave clicks via WebAudio ("mechanical keyboard mode"). Off by default.

let ctx: AudioContext | undefined;

export function playBeep(freq = 700, dur = 0.025) {
  try {
    const C = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!C) return;
    ctx ??= new C();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    const t = ctx.currentTime;
    o.type = "square";
    o.frequency.value = freq * (0.92 + Math.random() * 0.16);
    g.gain.setValueAtTime(0.03, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g);
    g.connect(ctx.destination);
    o.start(t);
    o.stop(t + dur);
  } catch {
    /* audio unavailable */
  }
}
