"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

/** A single light/dark switch: click to flip, the knob slides across. */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative flex items-center w-[3.25rem] h-7 rounded-full p-0.5 border transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
        isDark
          ? "bg-slate-800 border-slate-700 justify-end"
          : "bg-slate-200/80 border-slate-300/60 justify-start"
      }`}
    >
      {/* Faint icons on the track */}
      <Sun className="absolute left-1.5 w-3.5 h-3.5 text-amber-500/50" aria-hidden />
      <Moon className="absolute right-1.5 w-3.5 h-3.5 text-indigo-300/50" aria-hidden />

      {/* Sliding knob */}
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className={`relative z-10 flex items-center justify-center w-6 h-6 rounded-full shadow-md ${
          isDark ? "bg-slate-950" : "bg-white"
        }`}
      >
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="flex"
        >
          {isDark ? (
            <Moon className="w-3.5 h-3.5 text-indigo-300" />
          ) : (
            <Sun className="w-3.5 h-3.5 text-amber-500" />
          )}
        </motion.span>
      </motion.span>
    </button>
  );
}

export default ThemeToggle;
