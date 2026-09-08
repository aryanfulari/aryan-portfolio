"use client";

import { motion } from "framer-motion";

export interface ProjectCard {
  title: string;
  description: string;
  href: string;
}

export const projectCards: ProjectCard[] = [
  {
    title: "VaariSarthi",
    description:
      "GPS-based safety and group-tracking app for pilgrims on the Pandharpur Wari, with offline SOS and a Lost & Found system. Built at Vaarithon — finalist among 450+ teams.",
    href: "https://github.com/aryanfulari/VaariSarthi",
  },
  {
    title: "Codence",
    description:
      "An AI-powered codebase memory tool, built to help teams retain context across a project's history. Built at the Inception Hackathon with a team.",
    href: "https://github.com/aryanfulari/Codence",
  },
  {
    title: "Agent Passport",
    description:
      "A Monad Blitz hackathon project — placeholder description, tell me what this one actually does and I'll update it.",
    href: "https://github.com/aryanfulari/Monad-Lisa",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative w-full px-6 md:px-10 lg:px-16 py-16 md:py-24 scroll-mt-24">
      <div className="max-w-3xl mb-14 md:mb-20">
        <h2 className="text-white text-3xl md:text-5xl font-light tracking-tight mb-4">
          Projects
        </h2>
        <p className="text-white/55 text-base md:text-lg leading-relaxed max-w-lg">
          A few things I&apos;ve worked on and contributing to.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projectCards.map((project, i) => (
          <motion.a
            key={project.title}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.33, 1, 0.68, 1] }}
            className="group block rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-7 min-h-[220px] flex flex-col justify-between hover:border-white/25 hover:bg-white/[0.04] transition-colors duration-300"
          >
            <div>
              <h3 className="font-mono uppercase tracking-wide text-white text-xl md:text-2xl font-bold mb-3">
                {project.title}
              </h3>
              <p className="text-white/60 text-base leading-relaxed">
                {project.description}
              </p>
            </div>
            <span className="text-white/30 group-hover:text-white/60 text-sm mt-4 transition-colors">
              View on GitHub →
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
