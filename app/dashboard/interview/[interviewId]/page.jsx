"use client";
import { MockInterview } from '@/utils/schema';
import React, { useEffect, useMemo, useState } from 'react';
import { db } from '@/utils/db';
import { eq } from 'drizzle-orm';
import Webcam from 'react-webcam';
import {
    Lightbulb,
    WebcamIcon,
    Briefcase,
    Clock,
    AlertCircle,
    Mic,
    Wifi,
    DoorClosed,
    Sparkles,
    ArrowRight,
    Check,
    ListChecks,
    AudioLines,
    FileBarChart,
    VideoOff,
    ShieldCheck,
    ChevronDown,
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import RobotLoader from '@/components/RobotLoader';
import { Magnetic, Reveal, SplitText, SpotlightCard } from '@/components/motion';

const READY_CHECKS = [
    { id: 'camera', icon: WebcamIcon, label: 'Camera on' },
    { id: 'mic', icon: Mic, label: 'Microphone allowed' },
    { id: 'quiet', icon: DoorClosed, label: 'Quiet space' },
    { id: 'net', icon: Wifi, label: 'Stable internet' },
];

const STEPS = [
    { icon: AudioLines, title: 'Answer out loud', desc: 'Record each answer by voice, at your own pace.' },
    { icon: Sparkles, title: 'AI scores each answer', desc: 'Every answer gets a rating and specific tips.' },
    { icon: FileBarChart, title: 'Get your report', desc: 'Review all feedback once you finish.' },
];

// The stored questions are a JSON array, sometimes wrapped in ```json fences
function countQuestions(raw) {
    try {
        const cleaned = String(raw || '').replace(/```json|```/g, '').trim();
        const parsed = JSON.parse(cleaned);
        if (Array.isArray(parsed)) return parsed.length;
        if (Array.isArray(parsed?.questions)) return parsed.questions.length;
    } catch { /* fall through */ }
    return Number(process.env.NEXT_PUBLIC_INTERVIEW_QUESTIONS_COUNT) || null;
}

function Interview({ params }) {
    const [interviewData, setInterviewData] = useState(null);
    const [webCamEnabled, setWebCamEnabled] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [checked, setChecked] = useState({});
    const [showNotes, setShowNotes] = useState(false);

    const interviewId = React.use(params)?.interviewId;

    useEffect(() => {
        if (!interviewId) return;
        GetInterviewDetails();
    }, [interviewId]);

    const GetInterviewDetails = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, interviewId));
            if (!result[0]) {
                setError("We couldn't find this interview. It may have been removed.");
            } else {
                setInterviewData(result[0]);
            }
        } catch (err) {
            setError("Something went wrong while loading your interview. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    // Camera and mic tick themselves when the webcam is on
    const isChecked = (id) => (id === 'camera' || id === 'mic' ? webCamEnabled : !!checked[id]);
    const readyCount = READY_CHECKS.filter((c) => isChecked(c.id)).length;
    const allReady = readyCount === READY_CHECKS.length;

    const techStack = useMemo(
        () => (interviewData?.jobDesc || '').split(/[,/|]/).map((t) => t.trim()).filter(Boolean),
        [interviewData]
    );
    const questionCount = useMemo(() => countQuestions(interviewData?.jsonMockResp), [interviewData]);
    const disabled = loading || !!error;

    return (
        <div className="relative my-4 md:my-6 max-w-6xl mx-auto px-1 sm:px-4">
            {/* Background */}
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[420px] -z-10 overflow-hidden">
                <div className="absolute inset-0 bg-grid" />
            </div>

            {/* Heading */}
            <header className="text-center mb-8">
                <Reveal className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 dark:bg-slate-900/70 backdrop-blur border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-3 shadow-sm">
                    <span className="relative flex w-2 h-2">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                        <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-500" />
                    </span>
                    Your mock interview is ready
                </Reveal>
                <SplitText
                    className="font-extrabold text-3xl sm:text-5xl tracking-[-0.03em] text-slate-900 dark:text-white"
                    segments={[{ text: "Let's get" }, { text: 'started!', className: 'gradient-text pb-1' }]}
                    delay={0.05}
                />
                <Reveal delay={0.25} as="p" className="text-sm sm:text-base text-muted-foreground mt-3 max-w-xl mx-auto">
                    Check the role, turn on your camera, tick off the checklist, and start when you&apos;re ready.
                </Reveal>
            </header>

            {/* Two equal-height cards side by side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
                {/* ───────── Left: interview brief ───────── */}
                <Reveal className="h-full">
                    <SpotlightCard className="h-full flex flex-col rounded-3xl bg-white/95 dark:bg-slate-900/90 border border-slate-200/80 dark:border-white/10 shadow-xl shadow-blue-900/5 p-5 sm:p-6">
                        {loading ? (
                            <div className="flex-1 flex items-center justify-center py-6">
                                <RobotLoader scene="setup" size="sm" />
                            </div>
                        ) : error ? (
                            <div className="flex items-start gap-3 p-4 rounded-xl border border-destructive/30 bg-destructive/5 text-destructive">
                                <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
                                <p className="text-sm leading-relaxed">{error}</p>
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col justify-between gap-5">
                                {/* Role */}
                                <div className="flex items-start gap-4">
                                    <div className="shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
                                        <Briefcase className="w-6 h-6" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">Interview for</p>
                                        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white capitalize break-words leading-tight">
                                            {interviewData.jobPosition}
                                        </h2>
                                        {techStack.length > 0 && (
                                            <div className="mt-2 flex flex-wrap gap-1.5">
                                                {techStack.map((t, i) => (
                                                    <span
                                                        key={t + i}
                                                        className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-500/20"
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Key facts */}
                                <div className="grid grid-cols-3 rounded-2xl border border-slate-200/80 dark:border-white/10 divide-x divide-slate-200/80 dark:divide-white/10 bg-slate-50/70 dark:bg-white/[0.03]">
                                    {[
                                        { icon: Clock, value: `${interviewData.jobExperience} yrs`, label: 'Experience' },
                                        { icon: ListChecks, value: questionCount ?? '—', label: 'Questions' },
                                        { icon: Mic, value: 'Voice', label: 'Answers' },
                                    ].map((f) => (
                                        <div key={f.label} className="flex flex-col items-center text-center py-3.5 px-2">
                                            <f.icon className="w-4 h-4 text-blue-600 dark:text-blue-400 mb-1.5" />
                                            <div className="text-lg font-extrabold text-slate-900 dark:text-white leading-none tabular-nums">{f.value}</div>
                                            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{f.label}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* How it works: vertical steps */}
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400 mb-3">How it works</p>
                                    <ol className="relative flex flex-col gap-4">
                                        <span aria-hidden className="absolute left-[15px] top-4 bottom-4 w-px bg-gradient-to-b from-blue-500/50 to-indigo-500/10" />
                                        {STEPS.map((s, i) => (
                                            <li key={s.title} className="relative flex items-center gap-3">
                                                <span className="relative z-10 w-8 h-8 rounded-full bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                                                    <s.icon className="w-4 h-4" />
                                                </span>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">
                                                        <span className="text-blue-600 dark:text-blue-400 mr-1.5 tabular-nums">{i + 1}.</span>{s.title}
                                                    </p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">{s.desc}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ol>
                                </div>

                                {/* Notes (from config), pinned to the bottom */}
                                {process.env.NEXT_PUBLIC_INFORMATION && (
                                    <div className="rounded-2xl border border-amber-200 dark:border-amber-500/20 bg-amber-50/80 dark:bg-amber-500/[0.06] overflow-hidden">
                                        <button
                                            type="button"
                                            onClick={() => setShowNotes((v) => !v)}
                                            className="w-full flex items-center gap-3 px-4 py-3 text-left"
                                            aria-expanded={showNotes}
                                        >
                                            <Lightbulb className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
                                            <span className="flex-1 min-w-0 text-xs text-amber-900 dark:text-amber-200">
                                                <span className="font-semibold">Before you begin:</span> your video is never recorded.
                                            </span>
                                            <ChevronDown className={`w-4 h-4 text-amber-700 dark:text-amber-300 transition-transform ${showNotes ? 'rotate-180' : ''}`} />
                                        </button>
                                        <AnimatePresence initial={false}>
                                            {showNotes && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.25 }}
                                                >
                                                    <p className="px-4 pb-3 text-xs leading-relaxed text-amber-900/90 dark:text-amber-200/80">
                                                        {process.env.NEXT_PUBLIC_INFORMATION}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                )}
                            </div>
                        )}
                    </SpotlightCard>
                </Reveal>

                {/* ───────── Right: camera + readiness ───────── */}
                <Reveal delay={0.08} className="h-full">
                    <div className="h-full flex flex-col rounded-3xl bg-white/95 dark:bg-slate-900/90 border border-slate-200/80 dark:border-white/10 shadow-xl shadow-blue-900/5 p-5 sm:p-6">
                        {/* Camera stage */}
                        <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-blue-100 dark:border-white/5 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950">
                            {webCamEnabled ? (
                                <Webcam
                                    onUserMedia={() => setWebCamEnabled(true)}
                                    onUserMediaError={() => setWebCamEnabled(false)}
                                    mirrored={true}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(59,130,246,0.18),transparent_60%)] dark:bg-[radial-gradient(circle_at_50%_45%,rgba(59,130,246,0.25),transparent_60%)]" />
                                    <div className="relative mb-3">
                                        <span className="absolute inset-0 rounded-full bg-blue-500/30 animate-ping" />
                                        <span className="relative flex w-14 h-14 rounded-full bg-white dark:bg-blue-500/15 border border-blue-200 dark:border-blue-400/30 shadow-sm dark:shadow-none items-center justify-center">
                                            <WebcamIcon className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                                        </span>
                                    </div>
                                    <p className="relative text-sm font-semibold text-slate-800 dark:text-white">Camera is off</p>
                                    <p className="relative text-xs text-slate-500 dark:text-slate-400 mt-0.5">See yourself the way the interviewer would</p>
                                </div>
                            )}

                            {/* Viewfinder corners */}
                            <div aria-hidden className="pointer-events-none absolute inset-3">
                                <span className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-slate-400/60 dark:border-white/50 rounded-tl-md" />
                                <span className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-slate-400/60 dark:border-white/50 rounded-tr-md" />
                                <span className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-slate-400/60 dark:border-white/50 rounded-bl-md" />
                                <span className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-slate-400/60 dark:border-white/50 rounded-br-md" />
                            </div>

                            <div className={`absolute top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${webCamEnabled ? 'bg-black/50 text-white' : 'bg-white/90 text-slate-700 shadow-sm dark:bg-black/50 dark:text-white dark:shadow-none'}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${webCamEnabled ? 'bg-emerald-400' : 'bg-slate-400'}`} />
                                {webCamEnabled ? 'Preview only · not recorded' : 'Camera off'}
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => setWebCamEnabled((v) => !v)}
                            className={`mt-4 w-full h-11 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
                                webCamEnabled
                                    ? 'border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5'
                                    : 'btn-shine bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 hover:from-blue-700 hover:to-indigo-700'
                            }`}
                        >
                            {webCamEnabled ? <><VideoOff className="w-4 h-4" /> Turn camera off</> : <><WebcamIcon className="w-4 h-4" /> Enable webcam and microphone</>}
                        </button>

                        {/* Readiness checklist, pinned to the bottom */}
                        <div className="mt-auto pt-5">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Readiness</p>
                                <p className={`text-xs font-semibold tabular-nums ${allReady ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'}`}>
                                    {readyCount}/{READY_CHECKS.length} ready
                                </p>
                            </div>
                            <div className="h-1.5 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden mb-3">
                                <motion.div
                                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-400"
                                    animate={{ width: `${(readyCount / READY_CHECKS.length) * 100}%` }}
                                    transition={{ type: 'spring', stiffness: 160, damping: 22 }}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                {READY_CHECKS.map((c) => {
                                    const on = isChecked(c.id);
                                    const auto = c.id === 'camera' || c.id === 'mic';
                                    return (
                                        <button
                                            key={c.id}
                                            type="button"
                                            disabled={auto}
                                            onClick={() => setChecked((p) => ({ ...p, [c.id]: !p[c.id] }))}
                                            title={auto ? 'Ticks automatically when the webcam is on' : 'Tap to tick'}
                                            className={`h-11 flex items-center gap-2 px-3 rounded-xl border text-left text-xs font-semibold transition-colors disabled:cursor-default ${
                                                on
                                                    ? 'border-emerald-300 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-300'
                                                    : 'border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] text-slate-600 dark:text-slate-300 hover:border-blue-300 dark:hover:border-blue-500/40'
                                            }`}
                                        >
                                            <span className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-colors ${on ? 'bg-emerald-500 text-white' : 'bg-slate-100 dark:bg-white/10 text-slate-400'}`}>
                                                <AnimatePresence mode="wait" initial={false}>
                                                    {on ? (
                                                        <motion.span key="y" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                                            <Check className="w-3.5 h-3.5" strokeWidth={3} />
                                                        </motion.span>
                                                    ) : (
                                                        <motion.span key="n" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                                            <c.icon className="w-3 h-3" />
                                                        </motion.span>
                                                    )}
                                                </AnimatePresence>
                                            </span>
                                            <span className="truncate">{c.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>

            {/* Start */}
            <Reveal delay={0.25} className="flex flex-col items-center mt-8">
                <Magnetic>
                    <Link
                        href={disabled ? '#' : `/dashboard/interview/${interviewId}/start`}
                        aria-disabled={disabled}
                        onClick={(e) => disabled && e.preventDefault()}
                        className={`btn-shine group inline-flex items-center justify-center gap-2 h-14 px-10 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-shadow ${
                            disabled ? 'opacity-50 pointer-events-none' : ''
                        }`}
                    >
                        Start interview
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                </Magnetic>
                <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    {allReady ? "You're all set. Good luck!" : 'You can start anytime. The checklist is just to help.'}
                </p>
            </Reveal>
        </div>
    );
}

export default Interview;
