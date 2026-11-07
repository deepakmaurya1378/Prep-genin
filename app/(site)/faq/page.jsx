"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ChevronDown, MessageCircle } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import PageHero from "@/components/site/PageHero";
import { Stagger, StaggerItem } from "@/components/motion";

const FAQ = [
  {
    group: "Getting started",
    items: [
      { q: "Is PrepGenin free to use?", a: "Yes. The Starter plan lets you create mock interviews and retake them for free. Paid plans on the Upgrade page are for higher usage, not for core features." },
      { q: "How do I start my first interview?", a: "Sign in, open the Dashboard and click “Add New Mock Interview”. Enter the job role, tech stack and years of experience, and your questions are ready in a few seconds." },
      { q: "How many questions are in each interview?", a: "Ten by default, tailored to the role and experience level you enter." },
    ],
  },
  {
    group: "Camera, microphone and browsers",
    items: [
      { q: "Which browser should I use?", a: "Chrome or Edge give the best voice input, on desktop and Android. Safari and Firefox work too: there, your answer is transcribed on your device after you stop recording, which can take a few seconds (and a one-time model download)." },
      { q: "Do I need a webcam?", a: "No. The camera is optional and only shows you a preview of yourself, like a real video interview. You can answer every question with just a microphone." },
      { q: "My microphone isn't working. What should I do?", a: "Check that your browser has microphone permission for this site (click the lock icon in the address bar), close other apps using the mic, and reload the page. The Help Center has a full checklist." },
    ],
  },
  {
    group: "Privacy",
    items: [
      { q: "Do you record or store my video?", a: "No. Your webcam feed is shown only to you in your browser. It is never recorded, saved or uploaded." },
      { q: "What do you store?", a: "Your account details, the interviews you create, the text of your answers and the AI feedback. See the Privacy Policy for details." },
      { q: "Can I delete an interview?", a: "Yes. Use the delete button on any interview card in your dashboard. This removes the interview, your answers and the feedback." },
    ],
  },
  {
    group: "Feedback and scoring",
    items: [
      { q: "How are my answers rated?", a: "The AI compares your transcribed answer with a model answer for the question and gives a rating out of 10 with specific tips to improve." },
      { q: "Can I retake an interview?", a: "Yes. Every interview in your history has a Retake button, so you can practise the same questions again and compare your feedback." },
      { q: "Is the AI feedback always right?", a: "It is a helpful guide, not a final verdict. AI can miss context, so use the feedback as a starting point for your own practice." },
    ],
  },
];

function Item({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible open={open} onOpenChange={setOpen} className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03]">
      <CollapsibleTrigger className="w-full flex items-center justify-between gap-4 p-5 text-left">
        <span className="font-semibold text-sm sm:text-[15px] text-slate-900 dark:text-white">{q}</span>
        <ChevronDown className={`w-4 h-4 shrink-0 text-slate-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <p className="px-5 pb-5 -mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{a}</p>
      </CollapsibleContent>
    </Collapsible>
  );
}

export default function FaqPage() {
  const [query, setQuery] = useState("");

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FAQ;
    return FAQ.map((g) => ({
      ...g,
      items: g.items.filter((i) => (i.q + " " + i.a).toLowerCase().includes(q)),
    })).filter((g) => g.items.length);
  }, [query]);

  return (
    <div>
      <PageHero eyebrow="FAQ" title="Frequently asked" highlight="questions" subtitle="Quick answers about practising with PrepGenin.">
        <label className="relative block max-w-md mx-auto">
          <span className="sr-only">Search questions</span>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            id="faq-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions"
            className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
      </PageHero>

      <div className="max-w-3xl mx-auto space-y-10">
        {groups.length === 0 && (
          <p className="text-center text-sm text-slate-500">No questions match “{query}”. Try another word, or contact us below.</p>
        )}
        {groups.map((g) => (
          <section key={g.group}>
            <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400 mb-3">{g.group}</h2>
            <Stagger className="space-y-3" gap={0.05}>
              {g.items.map((i) => (
                <StaggerItem key={i.q}>
                  <Item q={i.q} a={i.a} />
                </StaggerItem>
              ))}
            </Stagger>
          </section>
        ))}

        <div className="rounded-2xl border border-slate-200 dark:border-white/10 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <MessageCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
            <p className="text-sm text-slate-600 dark:text-slate-300">Didn&apos;t find your answer?</p>
          </div>
          <div className="flex gap-2">
            <Link href="/help" className="h-10 px-4 inline-flex items-center rounded-xl border border-slate-200 dark:border-white/10 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-white/5">Help Center</Link>
            <Link href="/contact" className="h-10 px-4 inline-flex items-center rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold">Contact us</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
