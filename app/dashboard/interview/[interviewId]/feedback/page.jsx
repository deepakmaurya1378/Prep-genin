"use client";
import { UserAnswer } from '@/utils/schema';
import React, { useEffect, useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ChevronsUpDown,
  Trophy,
  Star,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  MessageSquareText,
  TrendingUp,
  Award
} from 'lucide-react';
import { eq } from 'drizzle-orm';
import { db } from '@/utils/db';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);

  const interviewId = React.use(params)?.interviewId;

  useEffect(() => {
    if (interviewId) {
      GetFeedback();
    }
  }, [interviewId]);

  const GetFeedback = async () => {
    setLoading(true);
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, interviewId))
      .orderBy(UserAnswer.id);
    setFeedbackList(result);
    setLoading(false);
  };

  const calculateAverageRating = () => {
    if (feedbackList.length === 0) return 0;
    const sum = feedbackList.reduce((acc, item) => {
      const r = parseFloat(item.rating);
      return acc + (isNaN(r) ? 0 : r);
    }, 0);
    return (sum / feedbackList.length).toFixed(1);
  };

  const getRatingColor = (rating) => {
    const r = parseFloat(rating);
    if (r >= 8) return { bg: 'bg-emerald-100 dark:bg-emerald-950/40', text: 'text-emerald-700 dark:text-emerald-300', border: 'border-emerald-300 dark:border-emerald-700/50' };
    if (r >= 5) return { bg: 'bg-amber-100 dark:bg-amber-950/30', text: 'text-amber-700 dark:text-amber-300', border: 'border-amber-300 dark:border-amber-700/50' };
    return { bg: 'bg-red-100 dark:bg-red-950/30', text: 'text-red-700 dark:text-red-300', border: 'border-red-300 dark:border-red-700/50' };
  };

  const getScoreLabel = (avg) => {
    const r = parseFloat(avg);
    if (r >= 8) return { label: 'Excellent', color: 'text-emerald-300' };
    if (r >= 6) return { label: 'Good', color: 'text-amber-300' };
    if (r >= 4) return { label: 'Fair', color: 'text-orange-300' };
    return { label: 'Needs Work', color: 'text-red-300' };
  };

  const avgRating = calculateAverageRating();
  const scoreLabel = getScoreLabel(avgRating);

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 rounded-full border-4 border-blue-500/30 border-t-blue-500 animate-spin" />
        <p className="text-sm text-slate-400">Loading your feedback report...</p>
      </div>
    );
  }

  return (
    <div className="py-8 max-w-4xl mx-auto px-4 min-h-screen">

      {feedbackList?.length === 0 ? (
        /* Empty State */
        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 p-12 rounded-3xl text-center flex flex-col items-center justify-center my-12 shadow-lg">
          <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-5">
            <AlertCircle className="w-8 h-8 text-slate-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">No Feedback Found</h2>
          <p className="text-sm text-slate-500 max-w-sm mb-8 leading-relaxed">
            Complete a mock interview session to unlock your personalized AI feedback report with detailed ratings.
          </p>
          <Link href="/dashboard">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 h-11 font-semibold shadow-md shadow-blue-500/20">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      ) : (
        <>
          {/* Hero Summary Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-8 text-white shadow-2xl mb-10">
            {/* Ambient decorations */}
            <div className="absolute right-[-8%] top-[-20%] w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute left-[-5%] bottom-[-30%] w-56 h-56 bg-purple-400/20 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-semibold mb-4">
                  <Trophy className="w-4 h-4 text-amber-300" />
                  <span>Interview Session Complete</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
                  Congratulations! 🎉
                </h1>
                <p className="text-blue-100 text-sm leading-relaxed max-w-md">
                  Review your AI-generated feedback and answer analysis below. Use these insights to sharpen your interview skills!
                </p>
              </div>

              {/* Score Badge */}
              <div className="flex-shrink-0 flex flex-col items-center bg-white/10 backdrop-blur-md px-7 py-5 rounded-2xl border border-white/20 text-center min-w-[130px]">
                <Star className="w-7 h-7 text-amber-300 fill-amber-300 mb-1" />
                <span className="text-4xl font-black text-white leading-none">{avgRating}</span>
                <span className="text-sm font-normal text-blue-200 mt-1">/ 10</span>
                <span className={`text-xs font-bold mt-2 ${scoreLabel.color}`}>{scoreLabel.label}</span>
              </div>
            </div>

            {/* Progress Bar for overall score */}
            <div className="relative z-10 mt-6">
              <div className="flex justify-between text-xs text-blue-200 mb-1.5">
                <span>Overall Performance</span>
                <span>{avgRating}/10</span>
              </div>
              <div className="h-2 rounded-full bg-white/20">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-amber-300 to-emerald-300 transition-all duration-700"
                  style={{ width: `${(avgRating / 10) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { icon: <MessageSquareText className="w-4 h-4" />, label: 'Questions', value: feedbackList.length, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/30' },
              { icon: <Award className="w-4 h-4" />, label: 'Avg Rating', value: `${avgRating}/10`, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/30' },
              { icon: <TrendingUp className="w-4 h-4" />, label: 'Performance', value: scoreLabel.label, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
            ].map((stat, i) => (
              <div key={i} className={`${stat.bg} rounded-2xl p-4 text-center border border-slate-100 dark:border-slate-800/60`}>
                <div className={`flex justify-center mb-1 ${stat.color}`}>{stat.icon}</div>
                <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Detailed Breakdown */}
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <MessageSquareText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Detailed Question Breakdown
          </h2>

          <div className="space-y-4 mb-10">
            {feedbackList.map((item, index) => {
              const ratingColors = getRatingColor(item.rating);
              return (
                <Collapsible
                  key={index}
                  className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-2xl border border-slate-200/80 dark:border-slate-800/80 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <CollapsibleTrigger className="p-5 w-full flex items-center justify-between gap-4 text-left hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-8 h-8 rounded-full bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center flex-shrink-0">
                        Q{index + 1}
                      </span>
                      <span className="font-semibold text-sm text-slate-900 dark:text-white leading-snug line-clamp-2">
                        {item.question}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${ratingColors.bg} ${ratingColors.text} ${ratingColors.border}`}>
                        {item.rating}/10
                      </span>
                      <ChevronsUpDown className="h-4 w-4 text-slate-400" />
                    </div>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="border-t border-slate-100 dark:border-slate-800/60">
                    <div className="p-5 space-y-3 bg-slate-50/50 dark:bg-slate-900/30">

                      {/* Your Answer */}
                      <div className="p-4 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
                          Your Answer
                        </span>
                        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                          {item.userAns || <span className="italic text-slate-400">No answer recorded</span>}
                        </p>
                      </div>

                      {/* Model Answer */}
                      <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40">
                        <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                          <CheckCircle className="w-3.5 h-3.5" /> Model Answer
                        </span>
                        <p className="text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 leading-relaxed">
                          {item.correctAns}
                        </p>
                      </div>

                      {/* AI Feedback */}
                      <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/40">
                        <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider block mb-2">
                          AI Feedback & Improvement Tips
                        </span>
                        <p className="text-xs sm:text-sm text-blue-900 dark:text-blue-200 leading-relaxed">
                          {item.feedback}
                        </p>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              );
            })}
          </div>

          {/* Back Button */}
          <div className="flex justify-start">
            <Link href="/dashboard">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 h-11 flex items-center gap-2 font-semibold shadow-md shadow-blue-500/20">
                <ArrowLeft className="w-4 h-4" />
                Return to Dashboard
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Feedback;
