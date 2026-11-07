import React from "react";
import { Reveal } from "@/components/motion";

/** Consistent heading block for the public footer pages. */
export default function PageHero({ eyebrow, title, highlight, subtitle, children }) {
  return (
    <header className="max-w-3xl mx-auto text-center pt-12 sm:pt-16 pb-10">
      {eyebrow && (
        <Reveal className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-4">
          {eyebrow}
        </Reveal>
      )}
      <Reveal delay={0.05} as="h1" className="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-slate-900 dark:text-white text-balance">
        {title} {highlight && <span className="gradient-text">{highlight}</span>}
      </Reveal>
      {subtitle && (
        <Reveal delay={0.12} as="p" className="mt-4 text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
          {subtitle}
        </Reveal>
      )}
      {children && <Reveal delay={0.18} className="mt-6">{children}</Reveal>}
    </header>
  );
}
