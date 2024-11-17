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
        user && GetInterviewList();//if it their then get it if it not their it okay
    },[user])
    const GetInterviewList = async () => {
        const result = await db.select()
            .from(MockInterview)
            .where(eq(MockInterview.createdBy,user.emailAddresses?.[0]?.emailAddress))
            .orderBy(desc(MockInterview.id))
        console.log(result)
        setInterviewList(result);
    }

  return (
    <div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
              {interviewList&&interviewList.map((interview, index) => (
                  < InterviewItemCard
                      interview={interview}
                      key={index} />
              ))}
          </div>
    </div>
  )
}

export default InterviewList
