"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import ThemeToggle from "@/components/ThemeToggle";

function Header() {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    setIsOpen(false);
  }, [path]);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      setScrolled(currentY > 10);

      if (Math.abs(delta) > 5) {
        setHidden(currentY > 48 && delta > 0);
        lastScrollY.current = currentY;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/Upgrade", label: "Upgrade" },
    { href: "/dashboard/About", label: "About" },
  ];

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`sticky top-0 z-50 w-full border-b backdrop-blur-xl transition-colors duration-300 ${
        scrolled
          ? "bg-white/70 dark:bg-slate-950/70 border-blue-100 dark:border-blue-900/40 shadow-md shadow-blue-900/5 dark:shadow-blue-950/30"
          : "bg-white dark:bg-gradient-to-r dark:from-slate-950 dark:via-blue-950 dark:to-slate-950 border-blue-100/80 dark:border-blue-900/40 shadow-sm dark:shadow-lg"
      }`}
    >
      {/* Subtle animated accent line — shades of blue */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-400 via-sky-400 to-blue-600 opacity-60 animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16 relative">
        {/* Floating Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group transition-transform duration-200 hover:scale-105"
        >
          <Image
            src="/Prepgeninlogo.png"
            width={166}
            height={35}
            alt="Prep-Genin Logo"
            priority
            className="cursor-pointer object-contain select-none dark:brightness-125 filter drop-shadow-sm"
          />
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1 bg-blue-50 dark:bg-white/5 p-1.5 rounded-full border border-blue-100 dark:border-white/10">
          {navLinks.map((link) => {
            const isActive = path === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
                  isActive
                    ? "text-white bg-blue-600 shadow-sm"
                    : "text-slate-600 dark:text-blue-200/80 hover:text-blue-700 dark:hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Section Controls */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="h-5 w-[1px] bg-blue-200 dark:bg-blue-800/40 hidden sm:block" />
          <UserButton afterSignOutUrl="/" />
          <button
            className="md:hidden text-slate-700 dark:text-blue-100 p-2 rounded-xl hover:bg-blue-50 dark:hover:bg-white/10 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-blue-100 dark:border-blue-900/40 bg-white/98 dark:bg-slate-950/98 backdrop-blur-xl px-6 py-4"
          >
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = path === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                        isActive
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-600/30 dark:text-white"
                          : "text-slate-700 dark:text-blue-100/80 hover:bg-blue-50 dark:hover:bg-white/10"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Header;
