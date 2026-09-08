"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SplitFlapText from "@/components/split-flap-text";
import { projectCards } from "@/components/projects-section";

interface Stat {
  value: string;
  label: string;
  charset: "numeric" | "alpha";
  href?: string;
}

interface Role {
  title: string;
  description: string;
}

export const roles: Role[] = [
  {
    title: "Infinix Campus Connect — Event Main Coordinator",
    description: "Led a full-day partnership event with Infinix and Call of Duty Mobile — 500+ registrations, 50+ pieces of social content, and ₹10,000 secured as a goodwill gesture. Biggest event under the current student body's tenure.",
  },
  {
    title: "Perplexity AI — Student Campus Ambassador",
    description: "Drove student adoption through peer outreach and referral campaigns — $200+ in referral incentives and 40+ completed registrations in the first month alone.",
  },
  {
    title: "DESSA — Event Management Head",
    description: "Led event management across multiple department-organized events through a full first year.",
  },
  {
    title: "ACM — Event Management Member",
    description: "Active member across multiple chapter events, plus team member for MUN, Youth Parliament, and Tenet Hack.",
  },
  {
    title: "Training & Placement Office, AISSMS IOIT — Joint Secretary (Innovative Domain)",
    description: "Anchor and coordinator for T&P-led initiatives and events.",
  },
];

const stats: Stat[] = [
  { value: "$200+", label: "Earned in referral incentives — Perplexity AI Campus Ambassador", charset: "numeric" },
  { value: "500+", label: "Event registrations driven — Infinix Campus Connect", charset: "numeric" },
  { value: "FINALIST", label: "Out of 450+ teams — Varithon 2026 (VaariSarthi)", charset: "alpha", href: "/varithon-finalist-certificate.pdf" },
  { value: "1", label: "Patent pending — IRIS, Ideathon (AISSMS IOIT)", charset: "numeric" },
  { value: String(projectCards.length), label: "Projects shipped — click to view", charset: "numeric", href: "#projects" },
  { value: String(roles.length), label: "Leadership roles held across campus", charset: "numeric" },
];

export default function AchievementsSection() {
  const [entered, setEntered] = useState<boolean[]>(() => stats.map(() => false));

  const markEntered = (index: number) => {
    setEntered((prev) => {
      if (prev[index]) return prev;
      const next = [...prev];
      next[index] = true;
      return next;
    });
  };

  return (
    <section id="achievements" className="relative w-full px-6 md:px-10 lg:px-16 py-16 md:py-24 scroll-mt-24">
      <div className="max-w-3xl mb-14 md:mb-20">
        <h2 className="text-white text-3xl md:text-5xl font-light tracking-tight mb-4">
          Achievements and Experience
        </h2>
        <p className="text-white/55 text-base md:text-lg leading-relaxed max-w-lg">
          A snapshot of hackathon results, leadership roles, and the impact behind them.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-16 md:mb-20">
        {stats.map((stat, i) => {
          const CardWrapper = stat.href ? "a" : "div";
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              onViewportEnter={() => markEntered(i)}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.33, 1, 0.68, 1] }}
            >
              <CardWrapper
                {...(stat.href ? { href: stat.href } : {})}
                {...(stat.href && !stat.href.startsWith("#")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className={`block rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:p-6 hover:border-white/20 hover:bg-white/[0.04] transition-colors duration-300 ${stat.href ? "cursor-pointer" : ""}`}
              >
                <div className="mb-2 min-h-[40px] flex items-center">
                  {entered[i] && (
                    <SplitFlapText
                      words={["", stat.value]}
                      flipDuration={0.11}
                      stagger={0.06}
                      cycleDelay={150}
                      charset={stat.charset}
                      flipsPerChar={5}
                      tileColor="#040509"
                      textColor="#ffffff"
                      tileRadius={8}
                      gap={3}
                      fontSize={28}
                      loop={false}
                      padTo={stat.value.length}
                    />
                  )}
                </div>
                <p className="text-white/60 text-sm md:text-base leading-snug">
                  {stat.label}
                </p>
              </CardWrapper>
            </motion.div>
          );
        })}
      </div>

      <div className="space-y-0">
        {roles.map((role, i) => (
          <motion.div
            key={role.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="group grid grid-cols-1 md:grid-cols-[80px_1fr_1.4fr] gap-4 md:gap-10 py-8 border-b border-white/5 last:border-none hover:bg-white/[0.015] transition-colors duration-300 -mx-4 px-4 rounded-lg"
          >
            <span className="text-white/25 text-sm font-mono">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="text-white text-xl md:text-2xl font-medium leading-snug">
              {role.title}
            </h3>
            <p className="text-white/55 text-base md:text-lg leading-relaxed">
              {role.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
