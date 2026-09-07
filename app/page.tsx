import HeroLanding from "@/components/hero-landing";
import { ThemeToggleButton } from "@/components/theme-toggle-button";

export default function Home() {
  return (
    <main className="relative">
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggleButton variant="circle" start="top-right" />
      </div>
      <HeroLanding />
    </main>
  );
}