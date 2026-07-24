import { Button } from "@/components/ui/button";
import Link from "next/link";
import Header from "./dashboard/_components/Header";
import Footer from "./dashboard/_components/Footer";
import { Sparkles, ArrowRight, Bot, Target, ShieldCheck, Zap, CheckCircle, Star } from "lucide-react";

const FEATURES = [
  {
    icon: <Bot className="w-5 h-5" />,
    title: "Tailored AI Questions",
    desc: "Dynamically generated interview questions aligned strictly with your role, tech stack & experience level.",
    color: "from-blue-500 to-indigo-500",
    bg: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Speech & Video Simulation",
    desc: "Practice speaking naturally using real-time speech recognition and live video preview.",
    color: "from-purple-500 to-pink-500",
    bg: "bg-purple-50 dark:bg-purple-950/30",
  },
  {
    icon: <Target className="w-5 h-5" />,
    title: "Detailed AI Feedback",
    desc: "Get numerical ratings out of 10 and actionable recommendations for each answer.",
    color: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
  },
];

const HIGHLIGHTS = [
  "No credit card required",
  "Works in Chrome & Edge",
  "100% private — video never recorded",
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300 relative overflow-hidden">
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-500/8 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] bg-purple-500/10 dark:bg-purple-500/8 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[40%] left-[50%] w-[300px] h-[300px] bg-indigo-400/8 dark:bg-indigo-400/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <Header />

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 max-w-5xl mx-auto text-center relative z-10 w-full">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 dark:from-blue-400/10 dark:to-indigo-400/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold tracking-wide mb-8 animate-fade-in shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          <span>Next-Gen AI Mock Interview Platform</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1] animate-slide-up">
          Ace Your Next Interview with{" "}
          <br className="hidden sm:inline" />
          <span className="gradient-text">Personalized AI Feedback</span>
        </h1>

        <p className="text-slate-600 dark:text-slate-300 text-lg sm:text-xl max-w-2xl mb-4 leading-relaxed font-normal animate-fade-in">
          Simulate realistic technical and behavioral interviews tailored to your exact target job, tech stack, and experience level — all powered by AI.
        </p>

        {/* Highlight Bullets */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mb-10 animate-fade-in">
          {HIGHLIGHTS.map((h, i) => (
            <span key={i} className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
              {h}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-16 w-full max-w-sm animate-slide-up">
          <Link href="/dashboard" className="w-full">
            <Button className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl text-base shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-200 flex items-center justify-center gap-2 group">
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/dashboard/About" className="w-full">
            <Button
              variant="outline"
              className="w-full h-12 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-200 font-semibold rounded-xl text-base transition-colors"
            >
              About
            </Button>
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full text-left animate-fade-in">
          {FEATURES.map((feat, i) => (
            <div
              key={i}
              className={`glass-card p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 hover:-translate-y-1`}
            >
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feat.color} flex items-center justify-center text-white mb-4 shadow-md`}>
                {feat.icon}
              </div>
              <h3 className="text-base font-bold mb-2 text-slate-900 dark:text-white">{feat.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>

        {/* Trust bar */}
        <div className="mt-14 flex items-center gap-2 text-slate-400 dark:text-slate-500 text-xs">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            ))}
          </div>
          <span>Trusted by hundreds of developers for interview prep</span>
        </div>
      </main>

      <Footer />
    </div>
  );
}
