"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Bot,
  CheckCircle,
  ClipboardList,
  LineChart,
  MessagesSquare,
  Mic,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Zap,
} from "lucide-react";

import Header from "./dashboard/_components/Header";
import Footer from "./dashboard/_components/Footer";
import InterviewPreview from "@/components/landing/InterviewPreview";
import {
  CountUp,
  Magnetic,
  Reveal,
  SplitText,
  SpotlightCard,
  Stagger,
  StaggerItem,
} from "@/components/motion";

const HIGHLIGHTS = ["No credit card required", "Works in Chrome & Edge", "Video is never recorded"];


const FEATURES = [
  {
    icon: Bot,
    title: "Questions built for your exact role",
    desc: "Enter a job title, tech stack and years of experience. The AI writes a fresh question set for that role, not a generic question bank.",
    span: "md:col-span-2",
    visual: "chips",
  },
  {
    icon: Mic,
    title: "Answer out loud",
    desc: "Speak naturally with your webcam on and see a live transcript as you talk.",
    visual: "wave",
  },
  {
    icon: LineChart,
    title: "A score for every answer",
    desc: "Each answer gets a 1–10 rating, a model answer and specific tips to improve.",
    visual: "bars",
  },
  {
    icon: ShieldCheck,
    title: "Private by default",
    desc: "Your camera only powers your own preview. Nothing is recorded, stored or uploaded.",
    span: "md:col-span-2",
    visual: "shield",
  },
];

const STEPS = [
  { icon: ClipboardList, title: "Create an interview", desc: "Tell us the role, stack and experience. Questions are ready in seconds." },
  { icon: MessagesSquare, title: "Practise out loud", desc: "Answer each question by speaking, with live transcription and your webcam on." },
  { icon: Target, title: "Review and improve", desc: "Read your ratings and tips, then retake the interview to track progress." },
];

const STATS = [
  { to: 10, suffix: "", label: "tailored questions per interview" },
  { to: 10, prefix: "<", suffix: "s", label: "to generate a full interview" },
  { to: 1, suffix: "–10", label: "rating with feedback on every answer" },
  { to: 0, suffix: "", label: "videos recorded or stored" },
];

function FeatureVisual({ type }) {
  if (type === "chips") {
    return (
      <div className="mt-5 flex flex-wrap gap-2">
        {["Senior React Developer", "Next.js · TypeScript", "5 yrs", "System design", "Behavioral"].map((c, i) => (
          <motion.span
            key={c}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + i * 0.07 }}
            className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-500/20"
          >
            {c}
          </motion.span>
        ))}
      </div>
    );
  }
  if (type === "wave") {
    return (
      <div className="mt-5 flex items-center gap-[3px] h-10">
        {Array.from({ length: 28 }).map((_, i) => (
          <span
            key={i}
            className="flex-1 rounded-full bg-gradient-to-t from-blue-600 to-sky-400 animate-wave"
            style={{ height: `${30 + ((i * 37) % 70)}%`, animationDelay: `${(i % 9) * 0.1}s` }}
          />
        ))}
      </div>
    );
  }
  if (type === "bars") {
    return (
      <div className="mt-5 flex items-end gap-2 h-14">
        {[5, 6, 6.5, 7.5, 8, 9].map((v, i) => (
          <motion.span
            key={i}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex-1 origin-bottom rounded-md bg-gradient-to-t from-emerald-500 to-teal-300"
            style={{ height: `${v * 10}%` }}
          />
        ))}
      </div>
    );
  }
  return (
    <div className="mt-5 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
      {["Camera: preview only", "Audio: transcribed live", "Storage: none"].map((t) => (
        <span key={t} className="inline-flex items-center gap-1.5">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
          {t}
        </span>
      ))}
    </div>
  );
}

function HowItWorks() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={ref} className="relative max-w-6xl mx-auto px-6 py-24">
      <Reveal className="text-center mb-14">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400 mb-3">How it works</p>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white text-balance">
          From zero to interview-ready in three steps
        </h2>
      </Reveal>

      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Progress line that fills as you scroll */}
        <div className="hidden md:block absolute top-6 left-[16.6%] right-[16.6%] h-px bg-slate-200 dark:bg-slate-800" />
        <motion.div
          style={{ scaleX }}
          className="hidden md:block absolute top-6 left-[16.6%] right-[16.6%] h-px origin-left bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500"
        />
        {STEPS.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.12} className="relative flex flex-col items-center text-center">
            <div className="relative z-10 w-12 h-12 rounded-full bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-500/30 shadow-lg shadow-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-5">
              <s.icon className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                {i + 1}
              </span>
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-1.5">{s.title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">{s.desc}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground relative overflow-x-clip">
      <Header />

      {/* ───────── Hero (pulled up behind the transparent header) ───────── */}
      <section className="relative -mt-16 pt-16">
        {/* Background: grid + drifting light */}
        <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-grid" />
        </div>

        <div className="max-w-5xl mx-auto px-6 pt-20 sm:pt-28 pb-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex"
          >
            <Link
              href="/dashboard"
              className="beam-border group inline-flex items-center gap-2 pl-1.5 pr-3.5 py-1 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur text-xs font-medium text-slate-700 dark:text-slate-200 mb-8"
            >
              <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wide">New</span>
              Voice interviews with instant AI feedback
              <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          <SplitText
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-[-0.035em] leading-[1.05] mb-6 text-slate-900 dark:text-white"
            segments={[
              { text: "Ace your next interview" },
              { text: "with personalised", br: true },
              { text: "AI feedback", className: "gradient-text pb-1" },
            ]}
            delay={0.1}
          />

          <Reveal delay={0.45}>
            <p className="text-slate-600 dark:text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto mb-6 leading-relaxed">
              Realistic technical and behavioural mock interviews tailored to your target job, tech stack and
              experience level.
            </p>
          </Reveal>

          <Reveal delay={0.55}>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mb-10">
              {HIGHLIGHTS.map((h) => (
                <span key={h} className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                  {h}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.65}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Magnetic>
                <Link
                  href="/dashboard"
                  className="btn-shine group inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-base shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-shadow"
                >
                  Get started free
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Magnetic>
              <Link
                href="/about"
                className="inline-flex items-center justify-center h-12 px-7 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 backdrop-blur text-slate-700 dark:text-slate-200 font-semibold text-base hover:bg-white dark:hover:bg-slate-800 transition-colors"
              >
                How it works
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Product demo */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative"
          >
                        <InterviewPreview />
          </motion.div>
        </div>
      </section>


      {/* ───────── Features bento ───────── */}
      <section className="max-w-6xl mx-auto px-6 py-24 w-full">
        <Reveal className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400 mb-3">Features</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white text-balance">
            Everything you need to walk in confident
          </h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Built to make practice feel like the real thing, then tell you exactly what to fix.
          </p>
        </Reveal>

        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <StaggerItem key={f.title} className={f.span || ""}>
              <SpotlightCard className="h-full rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-slate-900/80 p-6 transition-transform duration-300 hover:-translate-y-1">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/25 mb-4">
                    <f.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1.5 tracking-tight">{f.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{f.desc}</p>
                  <FeatureVisual type={f.visual} />
                </div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* ───────── How it works ───────── */}
      <HowItWorks />

      {/* ───────── Numbers ───────── */}
      <section className="max-w-6xl mx-auto px-6 pb-24 w-full">
        <Stagger className="grid grid-cols-2 md:grid-cols-4 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-slate-900/70 overflow-hidden divide-x divide-y md:divide-y-0 divide-slate-200/80 dark:divide-white/10">
          {STATS.map((s) => (
            <StaggerItem key={s.label} className="p-6 sm:p-8 text-center">
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                <CountUp to={s.to} prefix={s.prefix || ""} suffix={s.suffix} />
              </div>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400">{s.label}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <span className="text-amber-600 dark:text-amber-400 font-semibold text-sm">4.9/5</span>
          </div>
          <span>Trusted by hundreds of developers for interview prep</span>
        </Reveal>
      </section>

      {/* ───────── Final CTA ───────── */}
      <section className="max-w-5xl mx-auto px-6 pb-24 w-full">
        <Reveal>
          <div className="beam-border relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-950 border border-slate-200 dark:border-transparent shadow-xl shadow-blue-900/5 dark:shadow-none px-6 py-16 sm:px-16 text-center">
            <div aria-hidden className="absolute inset-0 bg-grid opacity-60" />
            <div aria-hidden className="aurora-blob aurora-1 w-[420px] h-[420px] -top-40 left-[22%] bg-transparent dark:bg-blue-600/40" />
            <div className="relative">
              <Sparkles className="w-6 h-6 text-blue-600 dark:text-sky-300 mx-auto mb-4" />
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white text-balance">
                Your next interview starts here
              </h2>
              <p className="mt-4 text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
                Create your first mock interview in under a minute. It&apos;s free.
              </p>
              <div className="mt-8 flex justify-center">
                <Magnetic>
                  <Link
                    href="/dashboard"
                    className="btn-shine group inline-flex items-center gap-2 h-12 px-8 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white dark:from-white dark:to-white dark:text-slate-900 font-semibold shadow-lg shadow-blue-500/30 dark:shadow-blue-500/20"
                  >
                    <Zap className="w-4 h-4 text-white dark:text-blue-600" />
                    Start practising
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Magnetic>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
