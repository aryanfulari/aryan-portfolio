"use client";

import { useRef, useState, useCallback, useEffect } from "react";

type Falloff = "linear" | "smooth" | "sharp";

const FALLOFF_CURVES: Record<Falloff, (p: number) => number> = {
  linear: (p) => p,
  smooth: (p) => p * p * (3 - 2 * p),
  sharp: (p) => p * p * p,
};

interface NavItem {
  label: string;
  href: string;
}

interface ScrollLineNavProps {
  items: NavItem[];
  accentColor?: string;
  textColor?: string;
  markerColor?: string;
  showIndex?: boolean;
  showMarker?: boolean;
  proximityRadius?: number;
  maxShift?: number;
  falloff?: Falloff;
  markerLength?: number;
  markerGap?: number;
  tickScale?: number;
  scaleTick?: boolean;
  itemGap?: number;
  fontSize?: number;
  smoothing?: number;
  className?: string;
}

export default function ScrollLineNav({
  items,
  accentColor = "#A855F7",
  textColor = "#c4c4c4",
  markerColor = "#6c6c6c",
  showIndex = true,
  showMarker = true,
  proximityRadius = 65,
  maxShift = 60,
  falloff = "sharp",
  markerLength = 85,
  markerGap = 13,
  tickScale = 0.44,
  scaleTick = true,
  itemGap = 15,
  fontSize = 1.2,
  smoothing = 240,
  className = "",
}: ScrollLineNavProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const targetsRef = useRef<number[]>([]);
  const currentRef = useRef<number[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef(0);
  const activeRef = useRef<number | null>(null);
  const smoothingRef = useRef(smoothing);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  activeRef.current = activeIndex;
  smoothingRef.current = smoothing;

  const runFrame = useCallback((now: number) => {
    const dt = Math.min((now - lastRef.current) / 1000, 0.05);
    lastRef.current = now;
    const tau = Math.max(smoothingRef.current, 1) / 1000;
    const k = 1 - Math.exp(-dt / tau);

    let moving = false;
    const els = itemRefs.current;
    for (let i = 0; i < els.length; i++) {
      const el = els[i];
      if (!el) continue;
      const target = Math.max(targetsRef.current[i] || 0, activeRef.current === i ? 1 : 0);
      const cur = currentRef.current[i] || 0;
      const next = cur + (target - cur) * k;
      const settled = Math.abs(target - next) < 0.0015;
      const value = settled ? target : next;
      currentRef.current[i] = value;
      el.style.setProperty("--effect", value.toFixed(4));
      if (!settled) moving = true;
    }

    rafRef.current = moving ? requestAnimationFrame(runFrame) : null;
  }, []);

  const startLoop = useCallback(() => {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    lastRef.current = performance.now();
    rafRef.current = requestAnimationFrame(runFrame);
  }, [runFrame]);

  // Tracks pointer X instead of Y, since items now run in a horizontal row
  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      const list = listRef.current;
      if (!list) return;
      const rect = list.getBoundingClientRect();
      const pointerX = e.clientX - rect.left;
      const ease = FALLOFF_CURVES[falloff] ?? FALLOFF_CURVES.linear;
      const els = itemRefs.current;
      for (let i = 0; i < els.length; i++) {
        const el = els[i];
        if (!el) continue;
        const center = el.offsetLeft + el.offsetWidth / 2;
        const distance = Math.abs(pointerX - center);
        targetsRef.current[i] = ease(Math.max(0, 1 - distance / proximityRadius));
      }
      startLoop();
    },
    [falloff, proximityRadius, startLoop]
  );

  const handlePointerLeave = useCallback(() => {
    targetsRef.current = targetsRef.current.map(() => 0);
    startLoop();
  }, [startLoop]);

  const handleClick = useCallback((index: number, href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  useEffect(() => {
    startLoop();
  }, [activeIndex, startLoop]);

  useEffect(
    () => () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    },
    []
  );

  // Scroll-spy: highlight whichever section is currently most visible
  useEffect(() => {
    const sectionEls = items
      .map((item, index) => ({ el: document.getElementById(item.href.replace("#", "")), index }))
      .filter((entry): entry is { el: HTMLElement; index: number } => entry.el !== null);

    if (sectionEls.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          const match = sectionEls.find((s) => s.el === visible[0].target);
          if (match) setActiveIndex(match.index);
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sectionEls.forEach(({ el }) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      className={`scroll-line-nav${showMarker ? " scroll-line-nav--markers" : ""}${scaleTick ? " scroll-line-nav--scale-tick" : ""}${className ? ` ${className}` : ""}`}
      style={
        {
          "--accent-color": accentColor,
          "--text-color": textColor,
          "--marker-color": markerColor,
          "--marker-length": `${markerLength}px`,
          "--marker-gap": `${markerGap}px`,
          "--tick-scale": tickScale,
          "--max-shift": `${maxShift}px`,
          "--item-gap": `${itemGap}px`,
          "--font-size": `${fontSize}rem`,
          "--smoothing": `${smoothing}ms`,
        } as React.CSSProperties
      }
    >
      <ul
        ref={listRef}
        className="scroll-line-nav__list"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        {items.map((item, index) => (
          <li
            key={item.label}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            className="scroll-line-nav__item"
            aria-current={activeIndex === index ? "true" : undefined}
            onClick={() => handleClick(index, item.href)}
          >
            {showMarker && <span className="scroll-line-nav__marker" aria-hidden="true" />}
            <span className="scroll-line-nav__label">
              {showIndex && (
                <span className="scroll-line-nav__index">{String(index + 1).padStart(2, "0")}</span>
              )}
              <span className="scroll-line-nav__text">{item.label}</span>
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
}
