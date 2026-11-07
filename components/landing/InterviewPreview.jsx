"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Sparkles, Star } from "lucide-react";
import { LogoMark } from "@/components/Logo";

// Sample session the hero demo loops through. Illustrative only.
const SCRIPT = [
  {
    role: "Frontend Engineer · 2 yrs",
    q: "How would you speed up a React list that renders 10,000 rows?",
    a: "I'd virtualize the list so only visible rows mount, memoize row components, and keep keys stable…",
    rating: 8,
    tip: "Strong answer. Mention measuring first with the React Profiler.",
  },
  {
    role: "Backend Engineer · 3 yrs",
    q: "Walk me through how you'd design a rate limiter for a public API.",
    a: "I'd use a token bucket per API key stored in Redis, with a sliding window as a fallback…",
    rating: 9,
    tip: "Great depth. Add how you'd return 429s with Retry-After headers.",
  },
];

function useTyped(text, active, speed = 22) {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!active) return;
    setOut("");
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, active, speed]);
  return out;
}

export default function InterviewPreview() {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState(0); // 0 question, 1 answering, 2 feedback
  const item = SCRIPT[idx];

  useEffect(() => {
    const timings = [2600, 4200, 3800];
    const id = setTimeout(() => {
      if (phase < 2) setPhase(phase + 1);
      else {
        setPhase(0);
        setIdx((i) => (i + 1) % SCRIPT.length);
      }
    }, timings[phase]);
    return () => clearTimeout(id);
  }, [phase]);

  const question = useTyped(item.q, true, 24);
  const answer = useTyped(item.a, phase >= 1, 20);

  return (
    <div className="relative rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-slate-900 shadow-2xl shadow-blue-900/10 dark:shadow-black/40 overflow-hidden text-left">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 h-10 border-b border-slate-200/80 dark:border-white/10 bg-slate-50/80 dark:bg-white/[0.03]">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
        <div className="ml-3 flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">
          <LogoMark size={12} />
          <AnimatePresence mode="wait">
            <motion.span
              key={item.role}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
            >
              Mock interview · {item.role}
            </motion.span>
          </AnimatePresence>
        </div>
        <span className="ml-auto inline-flex items-center gap-1.5 text-[10px] font-semibold text-red-500">
          <span className="relative flex w-1.5 h-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping" />
            <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-red-500" />
          </span>
          LIVE
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-4 p-4 sm:p-5">
        {/* Camera tile */}
        <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[240px] rounded-xl overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-blue-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(96,165,250,0.35),transparent_55%)]" />
          {/* Silhouette */}
          <svg viewBox="0 0 100 80" className="absolute inset-x-0 bottom-0 w-full h-[78%] text-slate-700/80" aria-hidden>
            <circle cx="50" cy="30" r="14" fill="currentColor" />
            <path d="M18 80c2-18 16-28 32-28s30 10 32 28z" fill="currentColor" />
          </svg>
          {/* Voice waveform */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 rounded-lg bg-black/55 px-2.5 py-1.5">
            <Mic className={`w-3.5 h-3.5 ${phase === 1 ? "text-red-400" : "text-slate-400"}`} />
            <div className="flex items-center gap-[3px] h-4 flex-1">
              {Array.from({ length: 22 }).map((_, i) => (
                <span
                  key={i}
                  className={`w-[3px] rounded-full bg-sky-300/90 origin-center transition-transform duration-300 ${phase === 1 ? "animate-wave" : ""}`}
                  style={{
                    height: "100%",
                    animationDelay: `${(i % 7) * 0.11}s`,
                    transform: phase === 1 ? undefined : "scaleY(0.2)",
                  }}
                />
              ))}
            </div>
            <span className="text-[10px] text-slate-300 tabular-nums">{phase === 1 ? "Recording" : "Mic ready"}</span>
          </div>
        </div>

        {/* Q&A column */}
        <div className="flex flex-col gap-3 min-w-0">
          <div className="rounded-xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-white/[0.03] p-3.5">
            <div className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1.5">
              Question {idx + 3} of 10
            </div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white leading-snug min-h-[2.6em]">
              <span className={question.length < item.q.length ? "caret" : ""}>{question}</span>
            </p>
          </div>

          <div className="rounded-xl border border-dashed border-slate-200 dark:border-white/10 p-3.5 min-h-[72px]">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Your answer · live transcript</div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {phase >= 1 ? (
                <span className={phase === 1 ? "caret" : ""}>{answer}</span>
              ) : (
                <span className="italic text-slate-400">Waiting for you to speak…</span>
              )}
            </p>
          </div>

          <div className="relative min-h-[64px]">
            <AnimatePresence>
              {phase === 2 && (
                <motion.div
                  key={`fb-${idx}`}
                  initial={{ opacity: 0, y: 14, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="flex items-start gap-3 rounded-xl border border-emerald-200 dark:border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/10 p-3"
                >
                  <div className="flex flex-col items-center justify-center w-12 shrink-0">
                    <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 leading-none tabular-nums">
                      {item.rating}
                      <span className="text-xs font-semibold opacity-70">/10</span>
                    </span>
                    <div className="flex mt-1">
                      {[0, 1, 2, 3, 4].map((s) => (
                        <Star
                          key={s}
                          className={`w-2.5 h-2.5 ${s < Math.round(item.rating / 2) ? "text-amber-400 fill-amber-400" : "text-slate-300 dark:text-slate-600"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-0.5">
                      <Sparkles className="w-3 h-3" /> AI feedback
                    </div>
                    <p className="text-xs text-emerald-900 dark:text-emerald-100/90 leading-relaxed">{item.tip}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
