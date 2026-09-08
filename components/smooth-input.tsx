"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import React, { useEffect, useRef, useState, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

const wrapperClassName =
  "relative w-full rounded-2xl border border-white/10 bg-white/[0.03] p-4 has-[:focus-visible]:outline has-[:focus-visible]:outline-1 has-[:focus-visible]:outline-white/30 has-[:focus-visible]:outline-offset-2";

const fieldClassName = "w-full bg-transparent outline-none text-white placeholder:text-white/30";

type SmoothInputProps = ComponentPropsWithoutRef<"input"> & {
  wrapperClassName?: string;
};

export default function SmoothInput({
  className,
  wrapperClassName: wrapperClassOverride,
  value,
  defaultValue,
  onChange,
  onBlur,
  placeholder,
  ...props
}: SmoothInputProps) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const caretX = useMotionValue(0);
  const caretOpacity = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const isControlled = value !== undefined;
  const inputValue = isControlled ? String(value) : internalValue;

  const springCaretX = useSpring(
    caretX,
    prefersReducedMotion
      ? { stiffness: 10000, damping: 100, mass: 0.1 }
      : { stiffness: 500, damping: 30, mass: 0.5 }
  );

  const syncMeasureSpan = () => {
    const input = inputRef.current;
    const measureSpan = measureRef.current;
    if (!input || !measureSpan) return;
    const styles = window.getComputedStyle(input);
    measureSpan.style.font = `${styles.fontStyle} ${styles.fontWeight} ${styles.fontSize} ${styles.fontFamily}`;
    measureSpan.style.letterSpacing = styles.letterSpacing;
  };

  const measurePrefixWidth = (text: string) => {
    const input = inputRef.current;
    const measureSpan = measureRef.current;
    if (!input || !measureSpan) return null;
    syncMeasureSpan();
    measureSpan.textContent = text;
    const paddingLeft = parseFloat(window.getComputedStyle(input).paddingLeft) || 0;
    return text.length > 0 ? measureSpan.offsetWidth + paddingLeft : paddingLeft - 1;
  };

  const updateCaretFromInput = (target: HTMLInputElement) => {
    const caretIndex = target.selectionStart ?? target.value.length;
    const textBeforeCaret = target.value.slice(0, caretIndex);
    const absoluteWidth = measurePrefixWidth(textBeforeCaret);
    if (absoluteWidth === null) return;

    const styles = window.getComputedStyle(target);
    const paddingRight = parseFloat(styles.paddingRight) || 0;
    const caretPosition = absoluteWidth - target.scrollLeft;
    const maxX = target.clientWidth - paddingRight;

    caretX.set(Math.min(caretPosition, maxX));
    caretOpacity.set(1);
  };

  useEffect(() => {
    const input = inputRef.current;
    if (input && document.activeElement === input) {
      updateCaretFromInput(input);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  return (
    <div className={cn(wrapperClassName, wrapperClassOverride)}>
      <div ref={containerRef} className="relative" style={{ caretColor: "transparent" }}>
        <input
          {...props}
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          className={cn(fieldClassName, className)}
          value={inputValue}
          onChange={(e) => {
            if (!isControlled) setInternalValue(e.target.value);
            onChange?.(e);
            requestAnimationFrame(() => updateCaretFromInput(e.target));
          }}
          onBlur={(e) => {
            caretOpacity.set(0);
            onBlur?.(e);
          }}
        />
        <span ref={measureRef} aria-hidden className="pointer-events-none invisible absolute top-0 left-0 whitespace-pre" />
        <motion.div
          className="bg-white pointer-events-none absolute top-1/2 h-[1.1em] w-0.5 -translate-y-1/2"
          style={{ x: springCaretX, opacity: caretOpacity }}
        />
      </div>
    </div>
  );
}
