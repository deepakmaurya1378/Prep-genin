'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Sparkles,
  Target,
  Bot,
  Mic,
  ShieldCheck,
  ClipboardList,
  MessagesSquare,
  LineChart,
  ChevronsUpDown,
  ArrowRight,
} from 'lucide-react';

const WHY_ITEMS = [
  {
    icon: <Bot className="w-5 h-5" />,
    color: 'from-blue-500 to-indigo-500',
    title: 'Tailored to your target role',
    desc: 'Questions are generated fresh from the exact job title, tech stack and experience level you enter — not a generic question bank.',
  },
  {
    icon: <Mic className="w-5 h-5" />,
    color: 'from-purple-500 to-pink-500',
    title: 'Practice speaking, not typing',
    desc: 'Answer out loud with live webcam and voice transcription, so you build the muscle memory a real interview actually demands.',
  },
  {
    icon: <LineChart className="w-5 h-5" />,
    color: 'from-emerald-500 to-teal-500',
    title: 'Feedback you can act on',
    desc: 'Every answer gets a 1–10 rating plus specific, concise notes on what to improve — no vague "good job."',
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    color: 'from-amber-500 to-orange-500',
    title: 'Private by default',
    desc: 'Your camera feed is only used for your own live preview. Nothing is ever recorded, stored, or uploaded.',
  },
];

const STEPS = [
  {
    icon: <ClipboardList className="w-5 h-5" />,
    title: 'Create an interview',
    desc: 'Tell us the job role, tech stack, and years of experience. That\'s all the AI needs to build a relevant question set.',
  },
  {
    icon: <MessagesSquare className="w-5 h-5" />,
    title: 'Practice out loud',
    desc: 'Answer each question by speaking naturally, with your webcam on and a live transcript of what you said.',
  },
  {
    icon: <Target className="w-5 h-5" />,
    title: 'Review & improve',
    desc: 'Get a rating and tailored feedback per answer, then retake the same interview whenever you want to track improvement.',
  },
];

const FAQS = [
  {
    q: 'Is Prep-Genin free to use?',
    a: 'Yes — creating and taking mock interviews is free. Paid plans (see Upgrade) exist for higher usage limits, not for gating core features.',
  },
  {
    q: 'Do you record or store my video?',
    a: 'No. Your webcam feed is rendered locally for your own preview only — it is never recorded, saved, or sent anywhere.',
  },
  {
    q: 'Which browser should I use?',
    a: 'Chrome or Edge give the most reliable voice input, on both desktop and Android. Voice recognition isn\'t available on Safari or Firefox, though you can still take the interview.',
  },
  {
    q: 'How many questions are in each interview?',
    a: 'Ten questions per mock interview by default, tailored to the role and experience level you specify when creating it.',
  },
  {
    q: 'Can I retake an interview?',
    a: 'Yes — every past interview in your history has a Retake option, so you can practice the same role again and compare feedback over time.',
  },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="glass-card rounded-2xl overflow-hidden"
    >
      <CollapsibleTrigger className="p-5 w-full flex items-center justify-between gap-4 text-left hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
        <span className="font-semibold text-sm text-slate-900 dark:text-white">{q}</span>
        <ChevronsUpDown className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className="border-t border-slate-100 dark:border-slate-800/60">
        <p className="p-5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{a}</p>
      </CollapsibleContent>
    </Collapsible>
  );
}

function About() {
  return (
    <div className="py-10">
      <div className="max-w-4xl mx-auto">

        {/* Hero */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>About Prep-Genin</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
            Interview practice that feels <span className="gradient-text">like the real thing</span>
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Prep-Genin builds a fresh, role-specific mock interview in seconds, then coaches you with honest,
            per-answer feedback — so the first time you speak your answers out loud isn't in front of the
            real interviewer.
          </p>
        </div>

        {/* Why Prep-Genin */}
        <section className="mb-14">
          <h2 className="text-xl font-bold text-foreground mb-6 text-center">Why Prep-Genin</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHY_ITEMS.map((item, i) => (
              <div key={i} className="glass-card p-6 rounded-2xl">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-4 shadow-md`}>
                  {item.icon}
                </div>
                <h3 className="font-bold text-foreground mb-1.5">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="mb-14">
          <h2 className="text-xl font-bold text-foreground mb-6 text-center">How it works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {STEPS.map((step, i) => (
              <div key={i} className="relative glass-card p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-blue-500/25">
                    {i + 1}
                  </div>
                  <div className="text-blue-600 dark:text-blue-400">{step.icon}</div>
                </div>
                <h3 className="font-semibold text-foreground mb-1.5">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-14">
          <h2 className="text-xl font-bold text-foreground mb-6 text-center">Frequently asked questions</h2>
          <div className="flex flex-col gap-3">
            {FAQS.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl text-base shadow-lg shadow-blue-500/25 transition-all group"
          >
            Get Started Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
