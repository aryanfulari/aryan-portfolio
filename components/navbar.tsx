"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface NavLink {
    label: string;
    href: string;
    hasDropdown?: boolean;
}

const navLinks: NavLink[] = [
    { label: "About", href: "#about" },
    { label: "Education", href: "#education" },
    { label: "Achievements", href: "#achievements" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    return (
        <motion.nav
            className="fixed top-0 left-0 right-0 z-40 w-full px-6 md:px-10 lg:px-16 py-5 md:py-6 flex items-center justify-between backdrop-blur-md bg-[#0d0b0f]/60 border-b border-white/5"
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: 'easeOut' }}
        >
            <a href="/" className="flex items-center gap-2.5 shrink-0">
                <span className="flex items-center justify-center size-8 rounded-full bg-white/10 border border-white/20 text-white text-sm font-semibold">
                    AF
                </span>
                <span className="text-white text-lg font-semibold tracking-tight">
                    Aryan Fulari
                </span>
            </a>

            <div className="hidden lg:flex items-center gap-7 xl:gap-9">
                {navLinks.map((link, idx) => (
                    <motion.a
                        key={idx}
                        href={link.href}
                        className="flex items-center gap-1 text-white/75 hover:text-white text-[14px] font-medium transition-colors duration-200 relative group/nav"
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.25 + idx * 0.07 }}
                    >
                        {link.label}
                        {link.hasDropdown && (
                            <ChevronDown size={14} strokeWidth={2} className="text-white/50 group-hover/nav:text-white/80 transition-colors" />
                        )}
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-white/60 group-hover/nav:w-full transition-all duration-300" />
                    </motion.a>
                ))}
            </div>

            <div className="flex items-center gap-5">
                <button className="lg:hidden text-white p-1">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <line x1="3" y1="7" x2="21" y2="7" />
                        <line x1="3" y1="12" x2="16" y2="12" />
                        <line x1="3" y1="17" x2="21" y2="17" />
                    </svg>
                </button>
            </div>
        </motion.nav>
    );
}
