# Top Bar Color Animation With Emotion Prompt

## What This Animation Does

This animation adds a premium visual layer to a top navigation bar:

- a thin glowing sweep line moving across the top edge;
- a soft animated aurora/glow background;
- a hover/focus underline that grows under each nav link;
- optional glow around a logo mark.

This file is only about color, glow, sweep, and underline animation. The symbol-changing letter scramble is described separately in `topbar-text-scramble-animation.md`.

## Libraries Needed

For React or Next.js:

```bash
npm install @emotion/react
```

Use `@emotion/react` for `keyframes` and generated classes.

## Prompt To Reuse

```text
Create a top navigation bar color animation using @emotion/react.

Requirements:
- Use Emotion keyframes for all decorative animation.
- Add a thin glowing sweep line across the top edge of the navbar.
- Add a soft animated aurora/glow background inside the navbar.
- Add an animated underline on nav link hover and focus.
- Optionally add a subtle pulsing glow behind the logo mark.
- The navbar should keep its existing layout and classes.
- If the project uses Tailwind, use Emotion only for the animated pseudo-elements/keyframes and keep Tailwind for layout.
- Use prefers-reduced-motion to disable decorative animations for users who prefer reduced motion.
- Keep the animation subtle, premium, and readable.
```

## Emotion Pattern

Use `ClassNames` when the project already has normal `className` strings or Tailwind classes:

```tsx
import { ClassNames, keyframes } from "@emotion/react";

const topBarSweep = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-54%) scaleX(0.28);
  }
  18% {
    opacity: 1;
  }
  58% {
    opacity: 0.95;
  }
  100% {
    opacity: 0;
    transform: translateX(154%) scaleX(0.72);
  }
`;

const topBarAurora = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;
```

Then generate classes inside the component:

```tsx
<ClassNames>
  {({ css }) => {
    const headerMotion = css`
      position: sticky;
      isolation: isolate;
      overflow: hidden;

      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        z-index: 2;
        height: 2px;
        width: 54%;
        background: linear-gradient(
          90deg,
          transparent,
          rgba(34, 211, 238, 0.95),
          rgba(167, 139, 250, 0.9),
          rgba(52, 211, 153, 0.72),
          transparent
        );
        filter: drop-shadow(0 0 16px rgba(34, 211, 238, 0.55));
        transform-origin: center;
        animation: ${topBarSweep} 4.8s cubic-bezier(0.22, 1, 0.36, 1) infinite;
      }

      &::after {
        content: "";
        position: absolute;
        inset: 0;
        z-index: -1;
        background:
          radial-gradient(circle at 18% 0%, rgba(34, 211, 238, 0.12), transparent 28%),
          radial-gradient(circle at 82% 0%, rgba(139, 92, 246, 0.12), transparent 30%),
          linear-gradient(
            90deg,
            rgba(34, 211, 238, 0.055),
            rgba(139, 92, 246, 0.045),
            rgba(16, 185, 129, 0.04)
          );
        background-size: 160% 160%;
        opacity: 0.86;
        animation: ${topBarAurora} 12s ease-in-out infinite;
      }

      @media (prefers-reduced-motion: reduce) {
        &::before,
        &::after {
          animation: none;
        }
      }
    `;

    return (
      <header className={headerMotion}>
        ...
      </header>
    );
  }}
</ClassNames>
```

## Link Underline Animation

Use an Emotion class with a pseudo-element:

```tsx
const navLink = css`
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    left: 10px;
    right: 10px;
    bottom: 6px;
    height: 1px;
    background: linear-gradient(
      90deg,
      rgba(34, 211, 238, 0),
      rgba(34, 211, 238, 0.9),
      rgba(139, 92, 246, 0)
    );
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 220ms ease;
  }

  &:hover::after,
  &:focus-visible::after {
    transform: scaleX(1);
  }
`;
```

Apply it together with existing classes:

```tsx
<a className={`${baseLinkClassName} ${navLink}`} href="/example">
  Skills
</a>
```

## Optional Logo Glow

```tsx
const logoPulse = keyframes`
  0%, 100% {
    opacity: 0.32;
    transform: scale(0.92);
  }
  50% {
    opacity: 0.78;
    transform: scale(1.08);
  }
`;

const logoMark = css`
  position: relative;

  &::after {
    content: "";
    position: absolute;
    inset: -5px;
    z-index: -1;
    border-radius: 8px;
    background: rgba(34, 211, 238, 0.28);
    filter: blur(12px);
    animation: ${logoPulse} 3.4s ease-in-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    &::after {
      animation: none;
    }
  }
`;
```

## Common Pitfalls

- Keep `isolation: isolate` on the navbar if pseudo-elements use negative `z-index`.
- Use `overflow: hidden` so sweep/glow does not leak outside the top bar.
- Do not make the sweep too bright or too fast; it should support the UI, not distract from navigation.
- Always add `prefers-reduced-motion`.
- In Next.js, restart the dev server after installing Emotion. If `.next` gets corrupted, stop `next dev`, delete `.next`, and restart.
