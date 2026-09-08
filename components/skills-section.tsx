"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import VariableProximity from "@/components/variable-proximity";

interface SkillCategory {
  category: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    category: "Languages",
    skills: ["Python", "C++", "Java"],
  },
  {
    category: "Mobile & Frontend",
    skills: ["Flutter", "React", "Tailwind CSS"],
  },
  {
    category: "Backend & Infra",
    skills: ["Firebase", "Git", "GitHub"],
  },
  {
    category: "AI / ML",
    skills: ["PyTorch", "NumPy", "scikit-learn"],
  },
];

export default function SkillsSection() {
  const headingRef = useRef<HTMLDivElement>(null);

  return (
    <section id="skills" className="relative w-full px-6 md:px-10 lg:px-16 py-16 md:py-24 scroll-mt-24">
      <div className="max-w-3xl mb-14 md:mb-20">
        <div ref={headingRef} className="mb-4">
          <VariableProximity
            label="Skills"
            containerRef={headingRef}
            radius={140}
            fromWeight={300}
            toWeight={700}
            className="text-white text-3xl md:text-5xl tracking-tight"
          />
        </div>
        <p className="text-white/55 text-base md:text-lg leading-relaxed max-w-lg">
          Languages, tools, and more that I'm learning.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
        {skillCategories.map((group, i) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.33, 1, 0.68, 1] }}
          >
            <h3 className="text-white/50 text-sm uppercase tracking-wider mb-4">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-white/75 text-base hover:bg-white/[0.08] hover:border-white/20 transition-colors duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
