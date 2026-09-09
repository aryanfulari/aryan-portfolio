"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import VariableProximity from "@/components/variable-proximity";
import Image from "next/image";
import { Download } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import SpecularButton from "@/components/specular-button";
import { projectCards } from "@/components/projects-section";
import { roles as leadershipRoles } from "@/components/achievements-section";

const techStack = [
  "Flutter", "Firebase", "Python", "C++", "Java",
  "PyTorch", "NumPy", "scikit-learn", "Git / GitHub",
];

const stats = [
  { value: "8.43", label: "Current CGPA" },
  { value: String(projectCards.length), label: "Projects Shipped" },
  { value: "4", label: "Leadership Roles" },
];

export default function AboutSection() {
  const headingRef = useRef<HTMLDivElement>(null);

  return (
    <section id="about" className="relative w-full min-h-screen flex flex-col justify-center px-6 md:px-10 lg:px-16 pt-24 pb-16 scroll-mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr_320px] gap-10 lg:gap-14 items-stretch w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="flex flex-col"
        >
          <div className="w-full max-w-[320px] aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 mb-6 relative">
            <Image src="/headshot.jpg" alt="Aryan Fulari" fill className="object-cover" priority />
          </div>
          <div className="flex items-center gap-5 mt-auto">
            <a href="https://github.com/aryanfulari" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-white/50 hover:text-white transition-colors">
              <FaGithub size={22} />
            </a>
            <a href="https://www.linkedin.com/in/aryan-fulari/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white/50 hover:text-white transition-colors">
              <FaLinkedin size={22} />
            </a>
            <a href="https://x.com/aryansfulari" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="text-white/50 hover:text-white transition-colors">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.33, 1, 0.68, 1] }}
          className="flex flex-col justify-center"
        >
          <div ref={headingRef} className="mb-8">
            <VariableProximity
              label="About Me"
              containerRef={headingRef}
              radius={140}
              fromWeight={300}
              toWeight={700}
              className="text-white text-5xl md:text-7xl tracking-tight"
            />
          </div>
          <p className="text-white/60 text-lg md:text-xl leading-relaxed mb-4">
            I&apos;m a second-year B.Tech IT student at AISSMS Institute of
            Information Technology, Pune, building things at the
            intersection of AI/ML, full-stack development, and
            competitive projects. I am passionate about learning,
            building, and doing whatever intrigues me. I am also
            interested in astronomy, rockets, and space science.
          </p>
          <p className="text-white/60 text-lg md:text-xl leading-relaxed mb-8">
            Got something for me?{" "}
            <a href="#contact" className="text-white underline underline-offset-4 hover:text-white/70 transition-colors">
              Contact here
            </a>
            .
          </p>

          <div className="flex items-center flex-wrap gap-4">
            <SpecularButton href="#projects" size="md" radius={999} tint="#ffffff" tintOpacity={1} textColor="#0d0b0f" lineColor="#ffffff" baseColor="#525252" intensity={1.6} shineSize={23} shineFade={51} thickness={3.3} speed={0.65} followMouse={false} proximity={250} autoAnimate>
              View Projects
            </SpecularButton>
            <SpecularButton href="/resume.pdf" download size="md" radius={999} tint="#ffffff" tintOpacity={0.08} textColor="#ffffff" lineColor="#ffffff" baseColor="#525252" intensity={1.6} shineSize={23} shineFade={51} thickness={3.3} speed={0.65} followMouse={false} proximity={250} autoAnimate>
              <Download size={15} />
              Resume
            </SpecularButton>
            <SpecularButton href="#contact" size="md" radius={999} tint="#ffffff" tintOpacity={0.08} textColor="#ffffff" lineColor="#ffffff" baseColor="#525252" intensity={1.6} shineSize={23} shineFade={51} thickness={3.3} speed={0.65} followMouse={false} proximity={250} autoAnimate>
              Get in Touch
            </SpecularButton>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.33, 1, 0.68, 1] }}
          className="grid grid-cols-2 grid-rows-2 gap-4 h-full"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
              className={`rounded-2xl border border-white/10 bg-white/[0.02] p-4 flex flex-col items-center justify-center text-center ${i === 0 ? "col-span-2" : ""}`}
            >
              <div className="text-white text-3xl md:text-4xl font-light tracking-tight mb-2">
                {stat.value}
              </div>
              <p className="text-white/45 text-[11px] md:text-xs uppercase tracking-wide leading-tight">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-14 pt-10 border-t border-white/5"
      >
        <h3 className="text-white/40 text-xs uppercase tracking-wider mb-5">
          Tech I work with
        </h3>
        <div className="flex flex-wrap gap-3">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] text-white/75 text-sm hover:bg-white/[0.08] hover:border-white/20 transition-colors duration-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
