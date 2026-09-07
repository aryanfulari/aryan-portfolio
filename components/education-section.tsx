"use client";

import { motion } from "framer-motion";

interface EducationEntry {
  institution: string;
  degree: string;
  years?: string;
  grade: string;
  achievements: string[];
}

const education: EducationEntry[] = [
  {
    institution: "AISSMS Institute of Information Technology",
    degree: "B.Tech, Information Technology",
    years: "2025 — 2029 (Expected)",
    grade: "FY CGPA 8.43 / 10",
    achievements: [
      "Varithon MMCOE 2026 — Finalist (Project: VaariSarthi)",
      "1 Patent Pending (IRIS)",
      "Perplexity AI Campus Partner (Ambassador)",
    ],
  },
  {
    institution: "Jadhavar Arts, Commerce and Science College, Pune",
    degree: "12th — SSC-HSC",
    grade: "78.83%",
    achievements: ["International Rank 11 — International Space Olympiad 2022"],
  },
  {
    institution: "Tree House High School",
    degree: "10th — ICSE",
    grade: "94.2%",
    achievements: [],
  },
];

export default function EducationSection() {
  return (
    <section id="education" className="relative w-full px-6 md:px-10 lg:px-16 py-24 md:py-32 scroll-mt-24">
      <div className="max-w-3xl mb-14 md:mb-20">
        <h2 className="text-white text-3xl md:text-5xl font-light tracking-tight mb-4">
          Education
        </h2>
        <p className="text-white/55 text-sm md:text-base leading-relaxed max-w-lg">
          My academic background, from school through my current degree.
          Hover a card to see achievements from that period.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {education.map((entry, i) => (
          <motion.div
            key={entry.institution}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.33, 1, 0.68, 1] }}
            className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-7 min-h-[220px] overflow-hidden transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.04]"
          >
            <div className="relative z-10 transition-opacity duration-300 group-hover:opacity-0">
              <h3 className="text-white text-lg md:text-xl font-medium mb-1.5">
                {entry.institution}
              </h3>
              <p className="text-white/60 text-sm mb-4">{entry.degree}</p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-white/40 text-xs">
                {entry.years && <span>{entry.years}</span>}
                <span className="text-white/50">{entry.grade}</span>
              </div>
            </div>

            <div className="absolute inset-0 z-20 flex flex-col justify-center p-6 md:p-7 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out bg-white/[0.03] backdrop-blur-sm">
              <h4 className="text-white/40 text-xs uppercase tracking-wider mb-4">
                Achievements
              </h4>
              {entry.achievements.length > 0 && (
                <ul className="space-y-3">
                  {entry.achievements.map((a) => (
                    <li key={a} className="flex items-start gap-2.5 text-white/85 text-sm leading-snug">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40 shrink-0 mt-1.5" />
                      {a}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
