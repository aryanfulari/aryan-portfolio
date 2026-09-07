"use client";

import { FocusCards } from "@/components/ui/focus-cards";

export default function ProjectsSection() {
  const cards = [
    {
      title: "VaariSarthi",
      src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "IRIS",
      src: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "SIH26038",
      src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  return (
    <section id="projects" className="relative w-full px-6 md:px-10 lg:px-16 py-24 md:py-32">
      <div className="max-w-3xl mb-14 md:mb-20">
        <h2 className="text-white text-3xl md:text-5xl font-light tracking-tight mb-4">
          Selected Work
        </h2>
        <p className="text-white/55 text-sm md:text-base leading-relaxed max-w-lg">
          A few things I&apos;ve built and worked on recently, spanning
          full-stack development, computer vision, and applied ML.
        </p>
      </div>
      <FocusCards cards={cards} />
    </section>
  );
}
