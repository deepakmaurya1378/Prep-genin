import React from "react";
import Link from "next/link";
import { Rocket, Mic, Globe, AudioLines, LineChart, FolderOpen, ArrowRight } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import { Reveal, SpotlightCard, Stagger, StaggerItem } from "@/components/motion";

export const metadata = { title: "Help Center · PrepGenin" };

const GUIDES = [
  {
    id: "getting-started",
    icon: Rocket,
    title: "Getting started",
    summary: "Create your first mock interview.",
    steps: [
      "Sign in or create a free account.",
      "Open the Dashboard and click “Add New Mock Interview”.",
      "Enter the job role, your tech stack or a job description, and your years of experience.",
      "Click Start. Your tailored questions are ready in about 5–10 seconds.",
    ],
  },
  {
    id: "camera-mic",
    icon: Mic,
    title: "Camera and microphone",
    summary: "Fix permission and device problems.",
    steps: [
      "When asked, click Allow for camera and microphone. If you missed it, click the lock icon in the address bar and allow both.",
      "Close other apps that might be using the mic or camera (Zoom, Teams, etc.).",
      "Check your system's default microphone in sound settings.",
      "Reload the page after changing permissions.",
      "The camera is optional. You can answer with just your microphone.",
    ],
  },
  {
    id: "browsers",
    icon: Globe,
    title: "Browser support",
    summary: "Which browsers work best.",
    steps: [
      "Chrome and Edge (desktop and Android) give live transcription while you speak.",
      "Safari and Firefox are supported: your answer is transcribed on your device after you stop recording.",
      "The first time in Safari or Firefox, a small speech model downloads once. Later answers are faster.",
      "Keep your browser up to date for the best results.",
    ],
  },
  {
    id: "answering",
    icon: AudioLines,
    title: "Answering questions",
    summary: "Record good answers.",
    steps: [
      "Read the question, then click “Record Answer” and speak naturally.",
      "Click “Stop Recording” when you finish. Answers of only a word or two are not saved, so aim for a few sentences.",
      "Use the speaker button to hear the question read aloud.",
      "Move between questions with Previous and Next Question, then click “End & View Results” when you're done.",
    ],
  },
  {
    id: "feedback",
    icon: LineChart,
    title: "Understanding feedback",
    summary: "Read your report and improve.",
    steps: [
      "Each answer gets a rating out of 10, with a model answer and improvement tips.",
      "Green ratings (8+) are strong, amber (5–7) need polish, red (below 5) need more work.",
      "Compare your answer with the model answer to find what you missed.",
      "Retake the interview later to see how your scores change.",
    ],
  },
  {
    id: "managing",
    icon: FolderOpen,
    title: "Managing interviews",
    summary: "Review, retake and delete.",
    steps: [
      "All your interviews appear under “Previous Mock Interviews” on the Dashboard.",
      "Click Feedback to reopen a report, or Retake to practise again.",
      "Click the trash icon to delete an interview with its answers and feedback.",
    ],
  },
];

export default function Help() {
  return (
    <div>
      <PageHero
        eyebrow="Help Center"
        title="How can we"
        highlight="help?"
        subtitle="Step-by-step guides for everything from your first interview to reading your feedback."
      />

      <Stagger className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
        {GUIDES.map((g) => (
          <StaggerItem key={g.id} className="h-full">
            <a href={`#${g.id}`} className="block h-full">
              <SpotlightCard className="h-full rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-5 transition-transform hover:-translate-y-0.5">
                <div>
                  <span className="inline-flex w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 items-center justify-center mb-3">
                    <g.icon className="w-5 h-5" />
                  </span>
                  <p className="font-bold text-slate-900 dark:text-white">{g.title}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{g.summary}</p>
                </div>
              </SpotlightCard>
            </a>
          </StaggerItem>
        ))}
      </Stagger>

      <div className="max-w-3xl mx-auto space-y-6">
        {GUIDES.map((g) => (
          <Reveal key={g.id}>
            <section id={g.id} className="scroll-mt-24 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-6">
              <h2 className="flex items-center gap-3 text-lg font-bold text-slate-900 dark:text-white mb-4">
                <g.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                {g.title}
              </h2>
              <ol className="space-y-3">
                {g.steps.map((s, i) => (
                  <li key={s} className="flex gap-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center shrink-0 tabular-nums">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{s}</span>
                  </li>
                ))}
              </ol>
            </section>
          </Reveal>
        ))}

        <Reveal className="text-center pt-6">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">Still stuck?</p>
          <div className="flex justify-center gap-2">
            <Link href="/faq" className="h-10 px-4 inline-flex items-center rounded-xl border border-slate-200 dark:border-white/10 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-white/5">Read the FAQ</Link>
            <Link href="/contact" className="group h-10 px-4 inline-flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold">
              Contact us <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
