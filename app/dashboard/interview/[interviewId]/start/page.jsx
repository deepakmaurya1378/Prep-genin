"use client";
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import QuestionSection from './_components/QuestionSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle, Flag } from 'lucide-react';

function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState(null);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());

  const interviewId = React.use(params)?.interviewId;

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, interviewId));
      const parsed = JSON.parse(result[0].jsonMockResp);
      // The AI response is normally a bare array, but defensively unwrap it
      // if it ever comes back as an object wrapping the array (e.g. {questions: [...]})
      const questions = Array.isArray(parsed)
        ? parsed
        : Object.values(parsed).find((value) => Array.isArray(value));

      if (!Array.isArray(questions) || questions.length === 0) {
        throw new Error('Interview questions are missing or invalid.');
      }

      setMockInterviewQuestion(questions);
      setInterviewData(result[0]);
    } catch (err) {
      console.error('Error fetching interview:', err);
      setLoadError('We could not load this interview\'s questions. Please try creating a new mock interview.');
    }
    setLoading(false);
  };

  const totalQuestions = mockInterviewQuestion?.length || 0;
  const progressPercent = totalQuestions > 0 ? ((activeQuestionIndex + 1) / totalQuestions) * 100 : 0;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5">
        <div className="w-12 h-12 rounded-full border-4 border-blue-500/30 border-t-blue-500 animate-spin" />
        <p className="text-slate-400 text-sm animate-pulse">Loading your interview session...</p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-4">
        <p className="text-slate-700 dark:text-slate-200 font-semibold">{loadError}</p>
        <Link href="/dashboard">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 h-11 font-semibold">
            Back to Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
            Mock Interview
          </h1>
          <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            Question {activeQuestionIndex + 1} of {totalQuestions}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mt-3">
          <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-xs text-slate-400">{Math.round(progressPercent)}% Complete</span>
            <span className="text-xs text-slate-400">
              {interviewData?.jobPosition} · {interviewData?.jobExperience} yrs exp
            </span>
          </div>
        </div>

        {/* Question Dots */}
        <div className="flex gap-1.5 mt-3">
          {mockInterviewQuestion?.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveQuestionIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeQuestionIndex
                  ? 'bg-blue-500 w-6'
                  : answeredQuestions.has(i)
                  ? 'bg-emerald-400 w-3'
                  : 'bg-slate-200 dark:bg-slate-700 w-3'
              }`}
              title={`Question ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <QuestionSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          onSelectQuestion={setActiveQuestionIndex}
        />
        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
          onAnswerSaved={() => setAnsweredQuestions(prev => new Set([...prev, activeQuestionIndex]))}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mt-6 pt-6">
        <div>
          {activeQuestionIndex > 0 && (
            <Button
              variant="outline"
              onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
              className="rounded-xl border-slate-200 dark:border-slate-700 text-sm font-semibold flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>
          )}
        </div>

        <div className="flex gap-3">
          {activeQuestionIndex !== totalQuestions - 1 && (
            <Button
              onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-md shadow-blue-500/20 flex items-center gap-2"
            >
              Next Question
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}

          {activeQuestionIndex === totalQuestions - 1 && (
            <Link href={'/dashboard/interview/' + interviewData?.mockId + '/feedback'}>
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl text-sm font-semibold shadow-md shadow-emerald-500/20 flex items-center gap-2">
                <Flag className="w-4 h-4" />
                End & View Results
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default StartInterview;
