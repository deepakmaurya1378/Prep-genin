"use client";
import { MockInterview } from '@/utils/schema';
import React, { useEffect, useState } from 'react';
import { db } from '@/utils/db';
import { eq } from 'drizzle-orm';
import Webcam from 'react-webcam';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function Interview({ params }) {
    const [interviewData, setInterviewData] = useState(null);
    const [webCamEnabled, setWebCamEnabled] = useState(false);
    const [loading, setLoading] = useState(false);  // Add loading state
    const [error, setError] = useState(null);  // Add error state

    // Extract interviewId from params properly using React.use
    const interviewId = React.use(params)?.interviewId;

    useEffect(() => {
        if (!interviewId) return; // Ensure interviewId exists before making the API call
        console.log(interviewId); // Debugging log to check interviewId
        console.log("step3"); // Debugging log to check interviewId

        // Fetch interview details when the interviewId is available
        GetInterviewDetails();
    }, [interviewId]); // Re-run effect when interviewId changes
    
    const GetInterviewDetails = async () => {
        //setLoading(true);  // Start loading
            const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, interviewId));// retriving that mockin which is equal to interviewId
             console.log(result); // Log result for debugging

        setInterviewData(result[0]); // Set the first result to interviewData
        console.log("step4");
            
    }

    // Conditional rendering for loading, error, and actual content
    return (
        <div className="my-10">
           <header className="text-center mb-12">
                    <h1 className="font-extrabold text-4xl text-gray-900">Let's Get Started with Your Mock Interview!</h1>
                    <p className="text-lg text-gray-600 mt-3">Prepare yourself by answering the mock interview questions. Enable your webcam to begin.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full px-5 ">
                {/* Left Section: Interview Details */}
                <div>
                    {interviewData ? (
                        <div className="flex flex-col my-5 gap-5 shadow-sm">
                            <div className="flex flex-col gap-5 p-6 rounded-lg  border border-gray-200 bg-white">
                                <h2 className="text-lg font-semibold text-gray-800">
                                    <strong>Job Role/Job Position:</strong> {interviewData.jobPosition}
                                </h2>
                                <h2 className="text-lg font-semibold text-gray-800">
                                    <strong>Job Description/Tech Stack:</strong> {interviewData.jobDesc}
                                </h2>
                                <h2 className="text-lg font-semibold text-gray-800">
                                    <strong>Years of Experience:</strong> {interviewData.jobExperience}
                                </h2>
                            </div> 
                        </div>
                    ) : (
                        <div className="text-gray-500">Loading interview details...</div>  // Show if no data is available
                    )}
                    
                    <div className='p-5 border rounded-lg border-yellow-300  shadow-sm bg-yellow-50'>
                            <h2 className='flex gap-2 item-center text-yellow-400'><Lightbulb/><strong>Information</strong></h2>
                            <h2 className='mt-3 text-yellow-400'>{ process.env.NEXT_PUBLIC_INFORMATION}</h2>
                    </div>
                
                </div>  


                {/* Webcam */}
                <div className="flex justify-center items-center flex-col gap-5">
                    {webCamEnabled ? (
                        <>
                        <Webcam
                            onUserMedia={() => setWebCamEnabled(true)}
                            onUserMediaError={() => setWebCamEnabled(false)}
                            mirrored={true}
                            style={{
                                height: 300,
                                width: 400,
                            }}
                        />
                        <Button
                               className="w-400 text-bolder bg-blue-400 text-white hover:bg-blue-500 h-10 "
                                onClick={() => setWebCamEnabled(false)}>
                                Disable WebCam
                            </Button>
                            </>
                    ) : (
                        <>
                            <WebcamIcon className="h-72 w-full my-7 p-20 rounded-lg border bg-secondary" />
                             <Button
                               className="w-500 text-bolder bg-blue-500 text-white hover:bg-blue-600 h-10 "
                                onClick={() => setWebCamEnabled(true)}>
                                Enable WebCam and Microphone for Interview 
                            </Button>
                        </>
                    )}
                </div>
            </div>
            <div className='flex justify-end item-end p-10'>
                <Link href={`/dashboard/interview/${interviewId}/start`} passHref>
                     <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-200 ">Start Interview</button>
                </Link>
             </div>
        </div>
    );
}

export default Interview;
