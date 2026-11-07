import React from "react";
import Link from "next/link";
import { Download } from "lucide-react";
import Logo, { LogoMark, jakarta } from "@/components/Logo";
import PageHero from "@/components/site/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

export const metadata = { title: "Press Kit · PrepGenin" };

const COLORS = [
  { name: "Electric Blue", hex: "#2F5BFF", use: "Primary brand colour" },
  { name: "Deep Blue", hex: "#1736C9", use: "Logo shadow facets" },
  { name: "Soft Blue", hex: "#6B8BFF", use: "Brand on dark backgrounds" },
  { name: "Ink", hex: "#0D1017", use: "Text and dark surfaces" },
];

const FACTS = [
  ["What it is", "An AI mock interview platform"],
  ["Interview length", "10 tailored questions"],
  ["Answer format", "Spoken, with live transcription"],
  ["Feedback", "A 1–10 rating and tips per answer"],
  ["Video", "Preview only, never recorded"],
  ["Price", "Free Starter plan"],
];

export default function Press() {
  return (
    <div>
      <PageHero
        eyebrow="Press Kit"
        title="Brand and"
        highlight="media resources"
        subtitle="Logos, colours and a short description for writing about PrepGenin."
      />

      <div className="max-w-5xl mx-auto space-y-12">
        {/* Boilerplate */}
        <Reveal>
          <section className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-6 sm:p-8">
            <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400 mb-3">About PrepGenin</h2>
            <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-200 max-w-[65ch] select-all">
              PrepGenin is an AI mock interview platform. It creates a fresh set of interview questions for the exact
              role, tech stack and experience level you enter, lets you answer out loud with live transcription, and
              scores every answer with specific, actionable feedback, so the first time you say your answers out loud
              isn&apos;t in front of a real interviewer.
            </p>
          </section>
        </Reveal>

        {/* Logos */}
        <section>
          <Reveal as="h2" className="text-xl font-bold text-slate-900 dark:text-white mb-4">Logo</Reveal>
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StaggerItem className="sm:col-span-2 rounded-2xl border border-slate-200 bg-white h-40 flex items-center justify-center">
              <Logo size="lg" />
            </StaggerItem>
            <StaggerItem className="sm:col-span-2 rounded-2xl border border-zinc-800 bg-zinc-950 h-40 flex items-center justify-center">
              <Logo size="lg" variant="light" />
            </StaggerItem>
            <StaggerItem className="rounded-2xl border border-slate-200 bg-white h-32 flex items-center justify-center">
              <LogoMark size={56} />
            </StaggerItem>
            <StaggerItem className="rounded-2xl border border-zinc-800 bg-zinc-950 h-32 flex items-center justify-center">
              <LogoMark size={56} variant="light" />
            </StaggerItem>
            <StaggerItem className="sm:col-span-2 rounded-2xl border border-slate-200 dark:border-white/10 p-5 flex flex-col justify-center gap-3">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Use the logo on plain backgrounds with clear space around it. Please don&apos;t stretch it, recolour it or add effects.
              </p>
              <a
                href="/icon.svg"
                download="prepgenin-icon.svg"
                className="self-start h-10 px-4 inline-flex items-center gap-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold"
              >
                <Download className="w-4 h-4" /> Download app icon (SVG)
              </a>
            </StaggerItem>
          </Stagger>
        </section>

        {/* Colours */}
        <section>
          <Reveal as="h2" className="text-xl font-bold text-slate-900 dark:text-white mb-4">Colours</Reveal>
          <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {COLORS.map((c) => (
              <StaggerItem key={c.hex} className="rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden">
                <div className="h-24" style={{ background: c.hex }} />
                <div className="p-4">
                  <p className="font-semibold text-sm text-slate-900 dark:text-white">{c.name}</p>
                  <p className="text-xs font-mono text-slate-500 select-all">{c.hex}</p>
                  <p className="text-xs text-slate-400 mt-1">{c.use}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* Type + facts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Reveal className="rounded-2xl border border-slate-200 dark:border-white/10 p-6">
            <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400 mb-4">Typography</h2>
            <p className={`${jakarta.className} text-3xl font-bold tracking-tight text-slate-900 dark:text-white`}>Plus Jakarta Sans</p>
            <p className="text-xs text-slate-500 mb-5">Logo wordmark</p>
            <p className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Inter</p>
            <p className="text-xs text-slate-500">Interface and body text</p>
          </Reveal>
          <Reveal delay={0.08} className="rounded-2xl border border-slate-200 dark:border-white/10 p-6">
            <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400 mb-4">Quick facts</h2>
            <dl className="divide-y divide-slate-100 dark:divide-white/10">
              {FACTS.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 py-2 text-sm">
                  <dt className="text-slate-500 dark:text-slate-400">{k}</dt>
                  <dd className="font-medium text-slate-900 dark:text-white text-right">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal className="text-center text-sm text-slate-500 dark:text-slate-400">
          Writing about PrepGenin? <Link href="/contact" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">Contact us</Link> for anything else you need.
        </Reveal>
      </div>
    </div>
  );
}
