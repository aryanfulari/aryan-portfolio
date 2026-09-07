import Navbar from "@/components/navbar";
import AboutSection from "@/components/about-section";
import EducationSection from "@/components/education-section";
import ProjectsSection from "@/components/projects-section";
import { ThemeToggleButton } from "@/components/theme-toggle-button";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <div className="fixed top-5 right-6 z-50">
        <ThemeToggleButton variant="circle" start="top-right" />
      </div>
      <AboutSection />
      <EducationSection />
      <ProjectsSection />
    </main>
  );
}