"use client";
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import QuestionSection from './_components/QuestionSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link'; 
import Webcam from 'react-webcam';

function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState(null);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  // for delays and errors
  const [loading, setLoading] = useState(true);

  //these both method are correct to fetch data form params
  const interviewId = React.use(params)?.interviewId;


  // Fetch interview details when component mounts or interviewId changes
  useEffect(() => {
       GetInterviewDetails();
  }, []);

  // Function to fetch interview details
  const GetInterviewDetails = async () => { 
    setLoading(true); // Set loading to true while fetching data

      const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, interviewId));
      console.log(result);// debuging the mock id
      const jsonMockResp = JSON.parse(result[0].jsonMockResp);
      setMockInterviewQuestion(jsonMockResp);
      console.log(jsonMockResp);
      setInterviewData(result[0]);
  
   
      setLoading(false); // Set loading to false once data is fetched
  };

  // Render the component UI
  return (
    <div className='p-8'>
      
      <div className="flex justify-center ">
        <h1 className='text-3xl text-justify font-bold'>Welcome to Your Interview</h1>
          </div>
      
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
      {/* {Question} */}
        <QuestionSection mockInterviewQuestion={mockInterviewQuestion}
                        activeQuestionIndex={activeQuestionIndex}
        />{/* passing mockInterviewQuestion as a prop to questionSection components */}

      {/* {Answer} */}
        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
        />  
      </div>
      <div className='flex justify-end gap-6 m-10'>
        {activeQuestionIndex > 0 &&
          <Button className="text-bolder bg-blue-400 text-black hover:bg-blue-500 "onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>}
        {activeQuestionIndex != mockInterviewQuestion?.length-1&&
          <Button  className="bg-blue-400 text-black hover:bg-blue-500 " onClick={()=> setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}
        {activeQuestionIndex == mockInterviewQuestion?.length-1 &&
          <Link href={'/dashboard/interview/'+ interviewData?.mockId +"/feedback"}>
            <Button className="bg-blue-400 text-black hover:bg-blue-500 " >End Interview</Button>
          </Link>}
        </div>
  </div>
  );
}

export default StartInterview;

