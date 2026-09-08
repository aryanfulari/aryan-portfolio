import Navbar from "@/components/navbar";
import AboutSection from "@/components/about-section";
import EducationSection from "@/components/education-section";
import AchievementsSection from "@/components/achievements-section";
import ProjectsSection from "@/components/projects-section";
import SkillsSection from "@/components/skills-section";
import ContactSection from "@/components/contact-section";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <AboutSection />
      <EducationSection />
      <AchievementsSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </main>
  );
}