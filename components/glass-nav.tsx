"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface NavItem {
  label: string;
  href: string;
}

interface GlassNavProps {
  items: NavItem[];
  activeHref: string;
}

export default function GlassNav({ items, activeHref }: GlassNavProps) {
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const highlightedHref = hoveredHref ?? activeHref;

  return (
    <div className="glass-nav-container">
      <nav
        className="glass-nav"
        onMouseLeave={() => setHoveredHref(null)}
      >
        <div className="glass-nav__sheen" aria-hidden="true" />
        <ul className="glass-nav__list">
          {items.map((item) => (
            <li key={item.href} className="glass-nav__item-wrapper">
              <a
                href={item.href}
                className="glass-nav__item"
                onMouseEnter={() => setHoveredHref(item.href)}
              >
                {highlightedHref === item.href && (
                  <motion.span
                    layoutId="glass-highlight"
                    className="glass-nav__highlight"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="glass-nav__label">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
