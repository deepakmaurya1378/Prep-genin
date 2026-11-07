"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, HelpCircle, MessageCircle, Send, CheckCircle2 } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import { Reveal } from "@/components/motion";

// Set NEXT_PUBLIC_CONTACT_EMAIL in .env.local to receive messages
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";

const TOPICS = ["General question", "Technical problem", "Billing", "Privacy or data request", "Feedback or idea"];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", topic: TOPICS[0], message: "" });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (!CONTACT_EMAIL) return;
    const subject = `[PrepGenin] ${form.topic}`;
    const body = `${form.message}\n\n— ${form.name} (${form.email})`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const input =
    "w-full h-11 px-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div>
      <PageHero eyebrow="Contact" title="Get in" highlight="touch" subtitle="Questions, problems or ideas. Send us a message." />

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-6">
        <Reveal>
          <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-6 sm:p-8">
            {sent ? (
              <div className="py-10 text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
                <p className="text-lg font-bold text-slate-900 dark:text-white">Your email app should open now</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Press send there to deliver your message. If nothing opened, email us at{" "}
                  <span className="font-semibold text-slate-700 dark:text-slate-200 select-all">{CONTACT_EMAIL}</span>.
                </p>
                <button type="button" onClick={() => setSent(false)} className="mt-5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                  Write another message
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="c-name" className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">Name</label>
                  <input id="c-name" required value={form.name} onChange={set("name")} className={input} placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="c-email" className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">Email</label>
                  <input id="c-email" type="email" required value={form.email} onChange={set("email")} className={input} placeholder="you@example.com" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="c-topic" className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">Topic</label>
                  <select id="c-topic" value={form.topic} onChange={set("topic")} className={input}>
                    {TOPICS.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="c-msg" className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">Message</label>
                  <textarea
                    id="c-msg"
                    required
                    rows={6}
                    value={form.message}
                    onChange={set("message")}
                    className={`${input} h-auto py-3 resize-y`}
                    placeholder="How can we help?"
                  />
                </div>
                <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <p className="text-xs text-slate-400">
                    {CONTACT_EMAIL ? "This opens your email app with the message ready to send." : "Messaging isn't set up yet. Please check back soon."}
                  </p>
                  <button
                    type="submit"
                    disabled={!CONTACT_EMAIL}
                    className="btn-shine h-11 px-6 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold shadow-md shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" /> Send message
                  </button>
                </div>
              </form>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col gap-4">
          {CONTACT_EMAIL && (
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 p-5">
              <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-2" />
              <p className="font-semibold text-slate-900 dark:text-white text-sm">Email</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 select-all break-all">{CONTACT_EMAIL}</p>
            </div>
          )}
          <Link href="/help" className="rounded-2xl border border-slate-200 dark:border-white/10 p-5 hover:border-blue-300 dark:hover:border-blue-500/40 transition-colors">
            <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-2" />
            <p className="font-semibold text-slate-900 dark:text-white text-sm">Help Center</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Guides for camera, mic, browsers and feedback.</p>
          </Link>
          <Link href="/faq" className="rounded-2xl border border-slate-200 dark:border-white/10 p-5 hover:border-blue-300 dark:hover:border-blue-500/40 transition-colors">
            <MessageCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-2" />
            <p className="font-semibold text-slate-900 dark:text-white text-sm">FAQ</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Quick answers to common questions.</p>
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
