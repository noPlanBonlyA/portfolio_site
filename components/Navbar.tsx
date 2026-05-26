"use client";

import { ClassNames, keyframes } from "@emotion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { navItems } from "@/data/portfolio";
import { cn } from "@/lib/utils";

import { Button } from "./ui/button";

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

const scrambleCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*+-=<>?/[]{}";
const scrambleDurationMs = 650;
const scrambleTickMs = 42;

function getRandomScrambleCharacter(original: string) {
  if (original === " ") {
    return original;
  }

  let next = original;

  while (next === original) {
    next = scrambleCharacters[Math.floor(Math.random() * scrambleCharacters.length)] ?? original;
  }

  return next;
}

type ScrambleCharacterProps = {
  character: string;
};

function ScrambleCharacter({ character }: ScrambleCharacterProps) {
  const [value, setValue] = useState(character);
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setValue(character);
  }, [character]);

  function startScramble() {
    if (character === " ") {
      return;
    }

    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    setValue(getRandomScrambleCharacter(character));
    intervalRef.current = window.setInterval(() => {
      setValue(getRandomScrambleCharacter(character));
    }, scrambleTickMs);

    timeoutRef.current = window.setTimeout(() => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      timeoutRef.current = null;
      setValue(character);
    }, scrambleDurationMs);
  }

  if (character === " ") {
    return <span className="inline-flex w-[0.42em]" />;
  }

  return (
    <span
      className="inline-flex w-[0.76em] justify-center font-mono tabular-nums transition-colors duration-150 hover:text-cyan-100"
      onPointerEnter={startScramble}
    >
      {value}
    </span>
  );
}

type ScrambleTextProps = {
  label: string;
};

function ScrambleText({ label }: ScrambleTextProps) {
  return (
    <span aria-hidden="true" className="inline-flex whitespace-pre">
      {Array.from(label).map((character, index) => (
        <ScrambleCharacter key={`${label}-${character}-${index}`} character={character} />
      ))}
    </span>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
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
              linear-gradient(90deg, rgba(34, 211, 238, 0.055), rgba(139, 92, 246, 0.045), rgba(16, 185, 129, 0.04));
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
            background: linear-gradient(90deg, rgba(34, 211, 238, 0), rgba(34, 211, 238, 0.9), rgba(139, 92, 246, 0));
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 220ms ease;
          }

          &:hover::after,
          &:focus-visible::after {
            transform: scaleX(1);
          }
        `;

        return (
          <header className={cn("sticky top-0 z-50 border-b border-white/[0.08] bg-[#050507]/70 backdrop-blur-xl", headerMotion)}>
            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
              <a
                href="#"
                className="group inline-flex items-center gap-3 text-sm font-semibold tracking-wide text-white"
                aria-label="Andrey Dmitriev portfolio home"
              >
                <span
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-md border border-cyan-300/30 bg-cyan-300/10 text-cyan-100 shadow-cyan-soft transition-colors group-hover:bg-cyan-300/20",
                    logoMark,
                  )}
                >
                  AD
                </span>
                <span className="hidden sm:inline">Andrey Dmitriev</span>
              </a>

              <div className="hidden items-center gap-1 md:flex">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    aria-label={item.label}
                    className={cn(
                      "rounded-md px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70",
                      navLink,
                    )}
                  >
                    <ScrambleText label={item.label} />
                  </a>
                ))}
              </div>

              <div className="hidden md:block">
                <Button asChild size="sm" variant="secondary">
                  <a href="#contact" aria-label="Contact">
                    <ScrambleText label="Contact" />
                  </a>
                </Button>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                title={isOpen ? "Close menu" : "Open menu"}
                onClick={() => setIsOpen((value) => !value)}
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </nav>

            <div
              className={cn(
                "grid border-t border-white/[0.08] bg-[#050507]/92 backdrop-blur-xl transition-all duration-300 md:hidden",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      aria-label={item.label}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "rounded-md px-3 py-3 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70",
                        navLink,
                      )}
                    >
                      <ScrambleText label={item.label} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </header>
        );
      }}
    </ClassNames>
  );
}
