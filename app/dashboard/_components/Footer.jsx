import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';

const PRODUCT_LINKS = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/dashboard/Upgrade', label: 'Upgrade' },
  { href: '/dashboard/About', label: 'About' },
];

function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-950/40 backdrop-blur-xl relative overflow-hidden">
      {/* Subtle animated accent line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-70 animate-shimmer" style={{ backgroundSize: '200% 100%' }} />

      <div className="max-w-7xl mx-auto px-5 py-8 sm:px-6 sm:py-10 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center sm:text-left">
        <div className="animate-fade-in flex flex-col items-center sm:items-start">
          <Image
            src="/Prepgeninlogo.png"
            width={140}
            height={30}
            alt="Prep-Genin"
            className="object-contain dark:brightness-120 mb-3 w-32 sm:w-[140px] h-auto"
          />
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
            Practice real interviews with AI-generated questions, live voice &amp; video, and instant, actionable feedback.
          </p>
        </div>

        <div className="animate-fade-in">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
            Product
          </h4>
          <ul className="space-y-2 text-sm">
            {PRODUCT_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="animate-fade-in flex flex-col items-center sm:items-start">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
            Stay sharp
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
            A fresh set of AI-generated questions every time you practice.
          </p>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Powered by AI
          </span>
        </div>
      </div>

      <div className="border-t border-slate-200/60 dark:border-slate-800/60 py-4 px-4 text-center text-xs text-slate-400 dark:text-slate-500">
        &copy; {new Date().getFullYear()} Prep-Genin. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
