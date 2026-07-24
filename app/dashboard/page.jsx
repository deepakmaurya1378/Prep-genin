"use client"
import React, { useEffect, useState } from 'react';
import AddNewInterview from './_components/AddNewInterview';
import InterviewList from './_components/InterviewList';
import { Sparkles, PlusCircle, History } from 'lucide-react';

function Dashboard() {
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  useEffect(() => {
    const isFirstTime = localStorage.getItem('firstVisit');
    if (!isFirstTime) {
      setIsFirstVisit(true);
      localStorage.setItem('firstVisit', 'false');
    } else {
      setIsFirstVisit(false);
    }
  }, []);

  return (
    <div className="py-6">
      {/* Top Welcome Hero Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white shadow-xl mb-10">
          <div className="absolute right-[-5%] top-[-20%] w-[300px] h-[300px] bg-white/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-medium mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>AI-Powered Interview Coach</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
              {isFirstVisit ? "Welcome to Prep-Genin!" : "Welcome Back to Your Workspace!"}
            </h1>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
              {isFirstVisit 
                ? "Generate your personalized AI mock interview in seconds and accelerate your career prep." 
                : "Manage your ongoing AI mock interviews, practice voice responses, and review tailored AI performance feedback."}
            </p>
          </div>
        </div>

        {/* Section 1: Create New Interview */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <PlusCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Create New Interview</h2>
          </div>
          <div className="max-w-sm">
            <AddNewInterview />
          </div>
        </section>

        {/* Section 2: Interview History */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-6">
            <History className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Previous Mock Interviews</h2>
          </div>
          <div className="glass-card p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
            <InterviewList />
          </div>
        </section>
    </div>
  );
}

export default Dashboard;
