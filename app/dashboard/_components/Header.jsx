"use client";

import React, { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import { ScrollProgress } from "@/components/motion";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/Upgrade", label: "Upgrade" },
  { href: "/about", label: "About" },
];

function Header() {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    setIsOpen(false);
  }, [path]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <ScrollProgress />
      <header className="sticky top-0 z-50 w-full pointer-events-none">
        {/* The bar: transparent at the top, a floating see-through glass bar once you scroll */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className={`pointer-events-auto w-full transition-[background-color,border-color,box-shadow] duration-300 ${
            scrolled
              ? "border-b border-slate-200/50 dark:border-white/10 bg-white/30 dark:bg-slate-950/30 backdrop-blur-lg shadow-[0_8px_24px_-16px_rgba(15,23,42,0.25)]"
              : "border-b border-transparent bg-transparent"
          }`}
        >
          <div className="mx-auto max-w-7xl h-16 px-4 sm:px-6 flex items-center justify-between">
          <Link href="/" aria-label="PrepGenin home" className="flex items-center transition-transform duration-200 hover:scale-[1.03]">
            <Logo size="md" />
          </Link>

          {/* Desktop nav: sliding active pill + hover highlight */}
          <nav
            className="hidden md:flex items-center gap-0.5 p-1 rounded-full"
            onMouseLeave={() => setHovered(null)}
          >
            {NAV_LINKS.map((link) => {
              const isActive = path === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHovered(link.href)}
                  className={`relative px-4 py-1.5 text-[13px] font-semibold rounded-full transition-colors duration-200 ${
                    isActive ? "text-white" : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <AnimatePresence>
                    {hovered === link.href && !isActive && (
                      <motion.span
                        layoutId="nav-hover"
                        className="absolute inset-0 rounded-full bg-slate-900/[0.06] dark:bg-white/10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                  </AnimatePresence>
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md shadow-blue-600/30"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <div className="h-5 w-px bg-slate-300/70 dark:bg-white/15 hidden sm:block" />
            <UserButton afterSignOutUrl="/" />
            <button
              className="md:hidden text-slate-700 dark:text-slate-100 p-2 rounded-xl hover:bg-slate-900/5 dark:hover:bg-white/10 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isOpen ? "x" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="block"
                >
                  {isOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
          </div>
        </motion.div>

        {/* Mobile menu: glass panel under the bar */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-auto md:hidden mx-3 mt-2 rounded-2xl border border-white/40 dark:border-white/10 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl shadow-xl p-2"
            >
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => {
                  const isActive = path === link.href;
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * i, duration: 0.25 }}
                    >
                      <Link
                        href={link.href}
                        className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                          isActive
                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                            : "text-slate-700 dark:text-slate-200 hover:bg-slate-900/5 dark:hover:bg-white/10"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

export default Header;
