"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Greeting {
  text: string;
  fontClass: string;
}

const greetings: Greeting[] = [
  { text: "Welcome", fontClass: "" },
  { text: "नमस्ते", fontClass: "font-[family-name:var(--font-devanagari)]" },
  { text: "ನಮಸ್ಕಾರಗಳು", fontClass: "font-[family-name:var(--font-kannada)]" },
  { text: "Bonjour", fontClass: "" },
  { text: "Hola", fontClass: "" },
];

const SWEEP_DURATION = 200;
const SETTLE_PAUSE = 150;
const FIRST_WORD_HOLD = 250;

// Splits text into real visual characters (graphemes) instead of raw UTF-16
// units, so combining marks in Devanagari/Kannada stay attached to their
// base letter instead of getting revealed as an orphaned dotted-circle mark.
function toGraphemes(text: string): string[] {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
    return Array.from(segmenter.segment(text), (s) => s.segment);
  }
  return Array.from(text);
}

export default function Preloader() {
  const [chars, setChars] = useState<string[]>(() => toGraphemes(greetings[0].text));
  const [fontClass, setFontClass] = useState(greetings[0].fontClass);
  const [cursorPercent, setCursorPercent] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    let wordIndex = 0;
    let direction = 1;
    let cancelled = false;

    const sweep = (from: Greeting, to: Greeting, dir: number, onComplete: () => void) => {
      const fromChars = toGraphemes(from.text);
      const toChars = toGraphemes(to.text);
      const maxLen = Math.max(fromChars.length, toChars.length);
      const start = performance.now();
      setCursorVisible(true);

      const tick = (now: number) => {
        if (cancelled) return;
        const elapsed = now - start;
        const progress = Math.min(elapsed / SWEEP_DURATION, 1);
        const revealCount = Math.floor(progress * maxLen);

        const next: string[] = [];
        for (let i = 0; i < maxLen; i++) {
          const revealed = dir === 1 ? i < revealCount : i >= maxLen - revealCount;
          next.push(revealed ? (toChars[i] ?? "") : (fromChars[i] ?? ""));
        }

        if (progress > 0.1) setFontClass(to.fontClass);
        setChars(next);
        setCursorPercent(dir === 1 ? progress * 100 : 100 - progress * 100);

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setChars(toChars);
          setFontClass(to.fontClass);
          setCursorVisible(false);
          onComplete();
        }
      };

      rafRef.current = requestAnimationFrame(tick);
    };

    const advance = () => {
      if (cancelled) return;
      const nextIndex = wordIndex + 1;

      if (nextIndex >= greetings.length) {
        setTimeout(() => {
          if (!cancelled) setIsExiting(true);
        }, SETTLE_PAUSE);
        return;
      }

      setTimeout(() => {
        if (cancelled) return;
        sweep(greetings[wordIndex], greetings[nextIndex], direction, () => {
          wordIndex = nextIndex;
          direction *= -1;
          advance();
        });
      }, SETTLE_PAUSE);
    };

    const initialHold = setTimeout(() => {
      if (!cancelled) advance();
    }, FIRST_WORD_HOLD);

    return () => {
      cancelled = true;
      clearTimeout(initialHold);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isExiting) return;
    const timeout = setTimeout(() => {
      setIsDone(true);
      document.body.style.overflow = "";
    }, 900);
    return () => clearTimeout(timeout);
  }, [isExiting]);

  if (isDone) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
      initial={{ y: 0 }}
      animate={{ y: isExiting ? "-100%" : 0 }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="relative inline-flex items-center">
        <span className={`text-black text-6xl md:text-8xl font-bold tracking-tight ${fontClass}`}>
          {chars.join("")}
        </span>
        {cursorVisible && (
          <motion.span
            className="absolute top-0 h-full w-[3px] bg-black"
            animate={{ left: `${cursorPercent}%` }}
            transition={{ duration: 0.05, ease: "linear" }}
          />
        )}
      </div>
    </motion.div>
  );
}
