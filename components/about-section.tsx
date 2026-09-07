"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import Image from "next/image";

const techStack = [
  "Flutter",
  "Firebase",
  "Python",
  "C++",
  "Java",
  "PyTorch",
  "NumPy",
  "scikit-learn",
  "Git / GitHub",
];

const roles = [
  "Perplexity AI Campus Ambassador",
  "Infinix Campus Connect — Main Coordinator",
  "DESSA — Event Management Head",
  "T&P Office — Joint Secretary (Innovative Domain)",
];

export default function AboutSection() {
  return (
    <section id="about" className="relative w-full min-h-screen flex items-center px-6 md:px-10 lg:px-16 pt-28 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-14 lg:gap-20 items-start w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-[12px] font-medium text-white/85 border border-white/15 bg-white/[0.04] mb-6">
            ✦ B.Tech IT · AISSMS Pune
          </span>
          <h1 className="text-white text-4xl md:text-6xl font-light tracking-tight mb-6">
            About Me
          </h1>
          <p className="text-white/60 text-sm md:text-base leading-relaxed mb-4 max-w-xl">
            I&apos;m a second-year B.Tech IT student at AISSMS Institute of
            Information Technology, Pune, building things at the
            intersection of AI/ML, full-stack development, and
            competitive projects.
          </p>
          <p className="text-white/60 text-sm md:text-base leading-relaxed mb-8 max-w-xl">
            I learn primarily through documentation rather than video
            tutorials — it lets me set my own pace, slow down on hard
            material, and skip what I already know. Outside coursework,
            I hold a few campus leadership and ambassador roles:
          </p>
          <ul className="space-y-3 mb-10">
            {roles.map((role, i) => (
              <motion.li
                key={role}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                className="flex items-center gap-3 text-white/70 text-sm md:text-[15px]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
                {role}
              </motion.li>
            ))}
          </ul>

          <div className="flex items-center flex-wrap gap-4 mb-8">
            <a
              href="#projects"
              className="bg-white text-[#0d0b0f] rounded-full px-7 py-3 text-[14px] font-semibold hover:scale-[1.03] transition-transform"
            >
              View Projects
            </a>
            <a
              href="/resume.pdf"
              download
              className="flex items-center gap-2 bg-white/8 hover:bg-white/[0.14] border border-white/10 text-white rounded-full px-6 py-3 text-[14px] font-medium transition-colors"
            >
              <Download size={15} />
              Resume
            </a>
            <a
              href="#contact"
              className="bg-white/8 hover:bg-white/[0.14] border border-white/10 text-white rounded-full px-6 py-3 text-[14px] font-medium transition-colors"
            >
              Get in Touch
            </a>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="https://github.com/aryanfulari"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-white/50 hover:text-white transition-colors"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/aryan-fulari/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-white/50 hover:text-white transition-colors"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href="https://x.com/aryansfulari"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="text-white/50 hover:text-white transition-colors"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
        >
          <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 mb-10 relative">
            <Image
              src="/headshot.jpg"
              alt="Aryan Fulari"
              fill
              className="object-cover"
              priority
            />
          </div>

          <h3 className="text-white/40 text-xs uppercase tracking-wider mb-5">
            Tech I work with
          </h3>
          <div className="flex flex-wrap gap-3">
            {techStack.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.05 }}
                className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] text-white/75 text-sm hover:bg-white/[0.08] hover:border-white/20 transition-colors duration-300"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
