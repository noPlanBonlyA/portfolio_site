# Text Scramble Animation Prompt

## What This Animation Does

This animation makes link text feel interactive at the letter level.
When the cursor touches a letter, that specific letter starts changing into random symbols for a short time. It keeps scrambling even if the cursor leaves the letter, then restores itself automatically. If the cursor moves across a whole word, the letters activate one after another and recover like a small wave.

## Libraries Needed

For a React or Next.js project:

No animation library is required for the symbol-changing behavior.
The letter scrambling uses React state, refs, `setInterval`, and `setTimeout`.

## Prompt To Reuse

```text
Create a reusable React text scramble animation.

Requirements:
- Every text label must be split into individual letters.
- Each letter must be its own hover target.
- When the cursor enters a letter, that letter should start rapidly changing into random characters like A-Z, 0-9, #, %, &, *, +, =, <, >, ?, [, ].
- The letter should keep scrambling for about 1.5-2 seconds even if the cursor leaves it.
- If the cursor stays still on the letter, it should still stop by itself and restore the original letter after the timer.
- If the cursor moves across a word, each touched letter should start its own independent scramble timer, so the word restores letter by letter like a wave.
- Do not scramble spaces.
- Keep each character in a fixed-width inline element so the link text does not jump while symbols change.
- Preserve accessibility: the link should keep a normal aria-label with the real text, and the animated letter spans can be aria-hidden.
- Clean up all intervals and timeouts on unmount.

Keep the component self-contained and suitable for a Next.js client component.
```

## Implementation Notes

Use a component structure like this:

```tsx
function ScrambleText({ label }: { label: string }) {
  return (
    <span aria-hidden="true">
      {Array.from(label).map((character, index) => (
        <ScrambleCharacter key={`${label}-${character}-${index}`} character={character} />
      ))}
    </span>
  );
}
```

Each `ScrambleCharacter` should:

- store the currently visible character in `useState`;
- store interval and timeout ids in `useRef`;
- start a new interval on `onPointerEnter`;
- clear any previous interval/timeout before starting again;
- update the character every `40-50ms`;
- stop after about `1600ms`;
- restore the original character at the end;
- clear interval and timeout in `useEffect` cleanup.

Recommended values:

```ts
const scrambleCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*+-=<>?/[]{}";
const scrambleDurationMs = 1650;
const scrambleTickMs = 42;
```

Use fixed character width:

```tsx
className="inline-flex w-[0.76em] justify-center font-mono tabular-nums"
```

For spaces:

```tsx
if (character === " ") {
  return <span className="inline-flex w-[0.42em]" />;
}
```

For accessibility:

```tsx
<a href="/example" aria-label="Skills">
  <ScrambleText label="Skills" />
</a>
```

## Common Pitfalls

- Do not restore the letter on `pointerleave`; let the timeout restore it.
- Do not use a single timer for the whole word; each letter needs its own timer.
- Do not use variable-width character spans, or the nav text will jitter.
- Do not remove the real accessible label from links.
- For decorative color, sweep, glow, and underline animations, use a separate CSS or Emotion animation layer.
