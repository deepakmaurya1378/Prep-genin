"use client"
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import React, { useState,useEffect } from 'react'
import { db } from '@/utils/db';
import { eq, desc } from 'drizzle-orm';
import InterviewItemCard from './InterviewItemCard';

function InterviewList() {

    const { user } = useUser();
    const [interviewList, setInterviewList] = useState([]);

    useEffect(() => {
        user && GetInterviewList();
    },[user])
    const GetInterviewList = async () => {
        const result = await db.select()
            .from(MockInterview)
            .where(eq(MockInterview.createdBy,user.emailAddresses?.[0]?.emailAddress))
            .orderBy(desc(MockInterview.id))
        setInterviewList(result);
    }

    const onDeleted = (mockId) => {
        setInterviewList((prev) => prev.filter((item) => item.mockId !== mockId));
    }

  return (
    <div>
      {interviewList && interviewList.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {interviewList.map((interview, index) => (
            <InterviewItemCard
              interview={interview}
              key={interview.mockId || index}
              onDeleted={onDeleted}
            />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-4">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">No mock interviews yet</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mt-1">
            Click "+ Add New" above to create your first customized AI mock interview session.
          </p>
        </div>
      )}
    </div>
  )
}

export default InterviewList
