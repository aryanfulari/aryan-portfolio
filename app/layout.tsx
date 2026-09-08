import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Devanagari, Noto_Sans_Kannada, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import Preloader from "@/components/preloader";
import SideRays from "@/components/side-rays";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoDevanagari = Noto_Sans_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "700"],
});

const notoKannada = Noto_Sans_Kannada({
  variable: "--font-kannada",
  subsets: ["kannada"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Aryan Fulari",
  description: "Portfolio of Aryan Fulari",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoDevanagari.variable} ${notoKannada.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <Preloader />
        <div className="fixed inset-0 -z-10 bg-[#0a0a0a]">
          <SideRays
            speed={3.6}
            rayColor1="#e9dfbe"
            rayColor2="#67a1e1"
            intensity={1.7}
            spread={2.5}
            origin="top-right"
            tilt={30}
            saturation={0.85}
            blend={0.85}
            falloff={1.6}
            opacity={1}
          />
        </div>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}