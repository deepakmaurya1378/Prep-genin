"use client";
import { UserAnswer } from '@/utils/schema';
import React, { useEffect, useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from 'lucide-react'; 
import { eq } from 'drizzle-orm';
import { db } from '@/utils/db';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function Feedback({params}) {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(false);

  const interviewId = React.use(params)?.interviewId;
  useEffect(() => {
    if (interviewId) {
      console.log("Interview ID:", interviewId); // Log interviewId for debugging
      GetFeedback();
    }
  }, []);

  const GetFeedback = async() => {
      // Fetch feedback data from database
    const result = await db.select().from(UserAnswer).where(eq(UserAnswer.mockIdRef, interviewId)).orderBy(UserAnswer.id);
    // getting the most latest data with orderBy userAnswer.if  of those whose intervew mockIdRef = interveiwId
    console.log(result);
    setFeedbackList(result);
  };
  const calculateAverageRating = () => {
    if (feedbackList.length === 0) return 0; 

    const sumOfRatings = feedbackList.reduce((sum, item) => {
      const rating = parseFloat(item.rating); // Ensure rating is a number
      return sum + (isNaN(rating) ? 0 : rating); // If rating is invalid, treat it as 0
    }, 0);

    const average = sumOfRatings / feedbackList.length;
    return average.toFixed(2); // Return the average rounded to 2 decimal places
  };
  return (
    <div className="p-10 h-screen ">
      {feedbackList?.length == 0 ?
        <h2 className='font-bold text-xl text-grey-500'>No Interveiw Record Found</h2>
        :
        <>
          <h2 className="text-3xl font-bold text-green-500">Congratulations!</h2>
          <h2 className="text-2xl font-bold">Here is your interview feedback</h2>
          <h2 className="text-primary text-lg my-3">
            Your overall rating: <strong>{calculateAverageRating()}/10</strong>
          </h2>

          <h2 className="text-sm text-gray-500">
            Find below interview question with correct answer, Your answer and feedback for improvement
          </h2>
          {feedbackList && feedbackList.map((item, index) => (
            <Collapsible key={index}>
              <CollapsibleTrigger className="p-2 bg-secondary rounded-lg flex justify-between my-2 text-left gap-20">
               Question {index+1} : {item.question} <ChevronsUpDown className="h-5 w-5" />
              </CollapsibleTrigger>
              <CollapsibleContent   className=" overflow-y-auto">
                <div className="flex flex-col gap-2">
                  <h2 className="text-red-500 p-2 rounded-lg">
                    <strong>Rating:</strong> {item.rating}
                  </h2>
                  <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                    <strong>Your Answer: </strong> {item.userAns}
                  </h2>
                  <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-red-900">
                    <strong>Correct Answer: </strong> {item.correctAns}
                  </h2>
                  <h2 className="p-2 border rounded-lg bg-blue-100 text-sm text-red-900">
                    <strong>feedback: </strong> {item.feedback}
                  </h2>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </>}
      
      <div className='mt-10'>
      <Link href="/dashboard">
        <Button className="bg-blue-600  hover:bg-blue-400">Go Back</Button>
      </Link>
      </div>

    </div>
  );
}

export default Feedback;
