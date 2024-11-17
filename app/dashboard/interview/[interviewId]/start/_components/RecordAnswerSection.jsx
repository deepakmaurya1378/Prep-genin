'use-client'
import React, { useState, useEffect } from 'react'
import { db } from '@/utils/db';
import Webcam from 'react-webcam';
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, StopCircle } from 'lucide-react';
import { toast } from "sonner"
import { chatSession } from '@/utils/GeminiAIModal'
import { UserAnswer } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment';
import { WebcamIcon } from 'lucide-react';

 

function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex,interviewData }) {
   // Store the user answer
  const [userAnswer, setUserAnswer] = useState('');
  const { user } = useUser();
  const [loading, setloading] = useState(false);
  const[webCamEnabled, setWebCamEnabled] = useState(false);

  // Initialize speech-to-text hook
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  // Update user answer whenever new results come in
  useEffect(() => {
    results?.map((result) => (
      setUserAnswer(prevAns => prevAns + result?.transcript)
    ))
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer?.length > 5)
    {
      UpdateUserAnswer();
    }
   
  },[userAnswer])

  // Function to handle saving user answer (start/stop recording)
  const StartStopRecording = async() => {
    if (isRecording) {
      // Stop recording and save the answer
      stopSpeechToText();
      
    } else {
      // Start recording
      startSpeechToText();
    }
  }
    
    
  const UpdateUserAnswer= async () => {
    console.log(userAnswer);
    setloading(true)
    const feedbackPrompt = "Question:" + mockInterviewQuestion[activeQuestionIndex]?.question +
        ",User Answer:" + userAnswer + ",Depends on question user answer for given interview Question" +
        "please give us rating for answer between 1 to 10  feedback  area of improvement if any " +
        "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";
      
      // sending feedback prompt to ai for feed back using chatSession and getting the result
      const result = await chatSession.sendMessage(feedbackPrompt);
      const mockJsonResp = (result.response.text()).replace('```json', '').replace('```', ''); // removing ai format of writing answer ans converting it into json format
      console.log(mockJsonResp);
      const JsonFeedbackResp = JSON.parse(mockJsonResp); // converting it into actual json file
      const resp = await db.insert(UserAnswer)
        .values({
          mockIdRef: interviewData?.mockId,
          question: mockInterviewQuestion[activeQuestionIndex]?.question,
          correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
          userAns:userAnswer,
          feedback: JsonFeedbackResp?.feedback,
          rating: JsonFeedbackResp?.rating,
          userEmail: user.emailAddresses?.[0]?.emailAddress ,
         createdAt:moment().format('DD-MM-yyyy')
        })
      if (resp)
      {
        toast('User Answer recorded successfully',{style:{background :'black',color:'white'}});
        setUserAnswer('');
        setResults([]);

    }
    setResults([]);
    setloading(false); 
  }
    
  return (
    <div className="flex items-center justify-center flex-col ">
        <div className="flex flex-col  justify-center  rounded-lg p-5">
          {webCamEnabled ? (
        <>
        {/* Webcam Component */}
        <Webcam
          onUserMedia={() => setWebCamEnabled(true)}
          onUserMediaError={() => setWebCamEnabled(false)}
          mirrored={true}
          style={{
          height: 300,
          width: 400,
        }
      } />
            
    {/* Control Buttons */}
    <div className="flex justify-between w-50 mt-10">
      <Button
        className="text-bolder bg-blue-400 text-black hover:bg-blue-500 flex-1 mr-2"
        onClick={() => setWebCamEnabled(false)}>
        Disable WebCam
      </Button>
      <Button
        disabled={loading}
        variant="outline"
        className="text-bolder bg-blue-400 text-black hover:bg-blue-500 flex-1 mr-2"
        onClick={StartStopRecording}
      >
      {isRecording ? (
            <h2 className="text-red-600 animate-pulse flex gap-2">
            <StopCircle /> Stop Recording...
             </h2>
                ) : (
            <h2 className="text-primary flex gap-2 items-center">
            <Mic /> Record Answer
          </h2>
        )}
      </Button>
      </div>
      </>
      ) : (
      <>
     {/* Placeholder Icon */}
      <WebcamIcon className="h-72 w-full my-7 p-20 rounded-lg border bg-secondary" />
      {/* Control Buttons */}
      <div className="flex justify-between w-50 mt-10">
      <Button
        className="text-bolder bg-blue-400 text-black hover:bg-blue-500 flex-1 mr-2"
        onClick={() => setWebCamEnabled(true)}
      >Enable WebCam</Button>
      <Button
        disabled={loading}
        variant="outline"
        className="text-bolder bg-blue-400 text-black hover:bg-blue-500 flex-1 mr-2"
        onClick={StartStopRecording}
      >
      {isRecording ? (
          <h2 className="text-red-600 animate-pulse flex gap-2">
          <StopCircle /> Stop Recording...
          </h2>
        ) : (
          <h2 className="text-primary flex gap-2 items-center">
          <Mic /> Record Answer
          </h2>
        )}
      </Button>
    </div>
    </>
    )}
  </div>
</div> )}

export default RecordAnswerSection
