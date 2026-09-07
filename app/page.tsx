import { ThemeToggleButton } from "@/components/theme-toggle-button";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <ThemeToggleButton variant="circle" start="top-right" />
    </main>
  );
}