"use client";
import React, { useState } from "react";
import { v4 as uuid4 } from "uuid";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Briefcase, Code2, Clock, Plus } from "lucide-react";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { db } from "@/utils/db";
import { useRouter } from "next/navigation";
import { generateInterviewContent } from "@/utils/GrokAIModal";
import { toast } from "sonner";

const LOADING_STEPS = [
  "Analyzing job requirements...",
  "Crafting tailored questions...",
  "Generating model answers...",
  "Finalizing your interview...",
];

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const router = useRouter();
  const { user } = useUser();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoadingStep(0);

    // Animate through loading steps
    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev < LOADING_STEPS.length - 1) return prev + 1;
        clearInterval(stepInterval);
        return prev;
      });
    }, 1200);

    const questionCount = process.env.NEXT_PUBLIC_INTERVIEW_QUESTIONS_COUNT || 5;
    const inputPrompt = `Job Position: ${jobPosition}, Job Description/Tech Stack: ${jobDesc}, Years of Experience: ${jobExperience}. Generate exactly ${questionCount} interview questions with detailed answers in a JSON array. Each item must have 'question' and 'answer' fields. Return only valid JSON array, no extra text.`;

    try {
      const MockJsonResp = await generateInterviewContent(inputPrompt);

      if (MockJsonResp) {
        const resp = await db
          .insert(MockInterview)
          .values({
            mockId: uuid4(),
            jsonMockResp: MockJsonResp,
            jobPosition,
            jobDesc,
            jobExperience,
            createdBy: user.emailAddresses?.[0]?.emailAddress,
            createdAt: moment().format("DD_MM_YYYY"),
          })
          .returning({ mockId: MockInterview.mockId });

        if (resp) {
          clearInterval(stepInterval);
          toast.success("🎯 Interview created successfully!");
          setOpenDialog(false);
          router.push("/dashboard/interview/" + resp[0]?.mockId);
        }
      } else {
        toast.error("Failed to generate questions. Please try again.");
      }
    } catch (error) {
      clearInterval(stepInterval);
      console.error("Error generating interview:", error);
      toast.error("Something went wrong. Please check your connection and try again.");
    }

    setLoading(false);
  };

  const handleClose = () => {
    if (!loading) {
      setOpenDialog(false);
      setJobPosition("");
      setJobDesc("");
      setJobExperience("");
    }
  };

  return (
    <div>
      {/* Trigger Card */}
      <div
        className="p-8 border-2 border-dashed border-blue-400/40 hover:border-blue-500 dark:border-blue-500/30 dark:hover:border-blue-400 rounded-2xl bg-gradient-to-br from-blue-50/60 to-indigo-50/40 dark:from-blue-950/20 dark:to-indigo-950/10 hover:from-blue-50 hover:to-indigo-50/60 dark:hover:from-blue-950/40 dark:hover:to-indigo-950/20 cursor-pointer transition-all duration-300 group text-center flex flex-col items-center justify-center min-h-[170px] shadow-sm hover:shadow-md hover:-translate-y-0.5"
        onClick={() => setOpenDialog(true)}
      >
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white mb-4 shadow-lg shadow-blue-500/30 group-hover:scale-110 group-hover:shadow-blue-500/40 transition-all duration-300">
          <Plus className="w-7 h-7" strokeWidth={2.5} />
        </div>
        <h2 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          Add New Mock Interview
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed max-w-[160px]">
          AI-generated questions in seconds
        </p>
      </div>

      {/* Dialog */}
      <Dialog open={openDialog} onOpenChange={handleClose}>
        <DialogContent className="max-w-lg bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-slate-200/80 dark:border-slate-800/80 shadow-2xl rounded-2xl">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/25">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold text-slate-900 dark:text-white">
                  Create Mock Interview
                </DialogTitle>
                <DialogDescription className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  Tell us about the role and we'll generate tailored questions.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {/* Loading Overlay */}
          {loading && (
            <div className="py-8 flex flex-col items-center gap-5">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin" />
                <Sparkles className="w-6 h-6 text-blue-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
                  {LOADING_STEPS[loadingStep]}
                </p>
                <p className="text-xs text-slate-400 mt-1">This takes about 5-10 seconds</p>
              </div>
              {/* Step dots */}
              <div className="flex gap-2">
                {LOADING_STEPS.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${i <= loadingStep ? 'bg-blue-500 scale-110' : 'bg-slate-200 dark:bg-slate-700'
                      }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Form */}
          {!loading && (
            <form onSubmit={onSubmit} className="mt-2 space-y-4">
              <div>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-2 block">
                  <Briefcase className="w-4 h-4 text-blue-500" />
                  Job Role / Position
                </label>
                <Input
                  placeholder="e.g. Full Stack Developer, Product Manager"
                  required
                  value={jobPosition}
                  className="bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 rounded-xl focus:border-blue-500 dark:focus:border-blue-500 transition-colors"
                  onChange={(e) => setJobPosition(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-2 block">
                  <Code2 className="w-4 h-4 text-purple-500" />
                  Tech Stack / Job Description
                </label>
                <Textarea
                  placeholder="e.g. React, Node.js, TypeScript, REST APIs, PostgreSQL"
                  required
                  value={jobDesc}
                  rows={3}
                  className="bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 rounded-xl focus:border-blue-500 dark:focus:border-blue-500 transition-colors resize-none"
                  onChange={(e) => setJobDesc(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-2 block">
                  <Clock className="w-4 h-4 text-emerald-500" />
                  Years of Experience
                </label>
                <Input
                  placeholder="e.g. 3"
                  type="number"
                  min="0"
                  max="50"
                  required
                  value={jobExperience}
                  className="bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 rounded-xl focus:border-blue-500 dark:focus:border-blue-500 transition-colors"
                  onChange={(e) => setJobExperience(e.target.value)}
                />
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleClose}
                  className="rounded-xl font-semibold text-slate-600 dark:text-slate-400"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold shadow-md shadow-blue-500/25 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Generate Interview
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
