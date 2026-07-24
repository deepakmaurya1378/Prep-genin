"use client";

import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    setIsOpen(false);
  }, [path]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/Upgrade", label: "Upgrade" },
    { href: "/dashboard/About", label: "About" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm dark:shadow-none transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16 relative">
        {/* Floating Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group transition-transform duration-200 hover:scale-105"
        >
          <Image
            src="/Prepgeninlogo.png"
            width={145}
            height={40}
            alt="Prep-Genin Logo"
            className="cursor-pointer object-contain select-none dark:brightness-120 filter drop-shadow-sm"
          />
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/60 dark:bg-slate-800/60 p-1.5 rounded-full border border-slate-200/50 dark:border-slate-700/50">
          {navLinks.map((link) => {
            const isActive = path === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-900 shadow-sm"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
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
          <div className="h-5 w-[1px] bg-slate-200 dark:bg-slate-800 hidden sm:block" />
          <UserButton afterSignOutUrl="/" />
          <button
            className="md:hidden text-foreground p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
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
            className="md:hidden border-t border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl px-6 py-4"
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
                          ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
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
    </header>
  );
}

export default Header;
