"use client";
import { SignUp } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, CheckCircle } from 'lucide-react';

const HIGHLIGHTS = [
  'Free to start — no credit card required',
  '3 free AI mock interviews to try it out',
  'Practice speaking, get instant feedback',
];

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background text-foreground relative overflow-hidden">
      {/* Ambient glow orbs — same treatment as the homepage */}
      <div className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-500/8 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-500/8 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Branding side */}
      <div className="flex flex-col justify-center px-5 py-6 sm:px-12 sm:py-14 lg:w-1/2 lg:px-16 animate-fade-in">
        <Link href="/" className="inline-flex items-center gap-2 mb-3 sm:mb-10 w-fit transition-transform duration-200 hover:scale-105">
          <Image
            src="/Prepgeninlogo.png"
            width={190}
            height={40}
            alt="Prep-Genin"
            className="object-contain dark:brightness-120 filter drop-shadow-sm w-28 sm:w-[190px] h-auto"
          />
        </Link>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 dark:bg-blue-400/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-2.5 sm:mb-5 w-fit">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          Get started free
        </div>

        <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-2 sm:mb-4 leading-[1.2] sm:leading-[1.15] animate-slide-up">
          Create your account and{' '}
          <span className="gradient-text">start practicing today</span>
        </h1>

        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-3 sm:mb-8 max-w-md animate-fade-in">
          Join Prep-Genin to generate role-specific mock interviews and get AI feedback on every answer.
        </p>

        <ul className="flex flex-wrap gap-x-4 gap-y-1.5 lg:flex-col lg:gap-y-3 animate-fade-in">
          {HIGHLIGHTS.map((h, i) => (
            <li key={i} className="flex items-center gap-1.5 lg:gap-2 text-xs lg:text-sm text-slate-600 dark:text-slate-300">
              <CheckCircle className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-emerald-500 flex-shrink-0" />
              {h}
            </li>
          ))}
        </ul>
      </div>

      {/* Auth form side */}
      <div className="flex-1 min-w-0 flex items-center justify-center px-4 py-6 sm:px-6 sm:py-10 lg:py-14 animate-slide-up">
        <div className="w-full max-w-sm rounded-2xl border border-slate-200 dark:border-slate-800 bg-card shadow-xl overflow-hidden">
          <SignUp
            appearance={{
              elements: {
                rootBox: 'w-full',
                card: 'w-full shadow-none border-none bg-transparent rounded-none',
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
