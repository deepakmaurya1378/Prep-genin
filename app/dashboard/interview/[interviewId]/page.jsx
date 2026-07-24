"use client";
import { MockInterview } from '@/utils/schema';
import React, { useEffect, useState } from 'react';
import { db } from '@/utils/db';
import { eq } from 'drizzle-orm';
import Webcam from 'react-webcam';
import {
    Lightbulb,
    WebcamIcon,
    Briefcase,
    Code2,
    Clock,
    AlertCircle,
    Mic,
    Wifi,
    DoorClosed,
    Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const READY_CHECKS = [
    { icon: <WebcamIcon className="h-3.5 w-3.5" />, label: 'Camera' },
    { icon: <Mic className="h-3.5 w-3.5" />, label: 'Microphone' },
    { icon: <DoorClosed className="h-3.5 w-3.5" />, label: 'Quiet space' },
    { icon: <Wifi className="h-3.5 w-3.5" />, label: 'Stable internet' },
];

function Interview({ params }) {
    const [interviewData, setInterviewData] = useState(null);
    const [webCamEnabled, setWebCamEnabled] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Extract interviewId from params properly using React.use
    const interviewId = React.use(params)?.interviewId;

    useEffect(() => {
        if (!interviewId) return; // Ensure interviewId exists before making the API call

        // Fetch interview details when the interviewId is available
        GetInterviewDetails();
    }, [interviewId]); // Re-run effect when interviewId changes

    const GetInterviewDetails = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, interviewId));
            if (!result[0]) {
                setError("We couldn't find this interview. It may have been removed.");
            } else {
                setInterviewData(result[0]);
            }
        } catch (err) {
            setError("Something went wrong while loading your interview. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="my-4 md:my-5 max-w-6xl mx-auto px-4">
            <header className="text-center mb-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-2">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>AI Mock Interview</span>
                </div>
                <h1 className="font-extrabold text-2xl sm:text-3xl text-foreground">Let's Get Started!</h1>
                <p className="text-sm sm:text-base text-muted-foreground mt-1.5 max-w-xl mx-auto">
                    Review the role details, enable your webcam, and start whenever you're ready.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full items-stretch">
                {/* Left Section: Interview Details */}
                <div className="flex flex-col gap-3 h-full">
                    {loading ? (
                        <div className="p-4 rounded-xl border border-border bg-card animate-pulse space-y-3 flex-1">
                            <div className="h-4 w-2/3 rounded bg-muted" />
                            <div className="h-4 w-full rounded bg-muted" />
                            <div className="h-4 w-1/3 rounded bg-muted" />
                        </div>
                    ) : error ? (
                        <div className="flex items-start gap-3 p-4 rounded-xl border border-destructive/30 bg-destructive/5 text-destructive flex-1">
                            <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
                            <p className="text-sm leading-relaxed">{error}</p>
                        </div>
                    ) : (
                        <div className="flex flex-col justify-center gap-2.5 p-4 rounded-xl border border-border bg-card text-card-foreground shadow-sm flex-1">
                            <div className="flex items-center gap-2 min-w-0">
                                <Briefcase className="h-4 w-4 text-blue-600 shrink-0" />
                                <span className="text-xs font-medium text-muted-foreground shrink-0">Role:</span>
                                <span className="text-sm font-semibold text-foreground truncate" title={interviewData.jobPosition}>{interviewData.jobPosition}</span>
                            </div>
                            <div className="flex items-center gap-2 min-w-0">
                                <Code2 className="h-4 w-4 text-blue-600 shrink-0" />
                                <span className="text-xs font-medium text-muted-foreground shrink-0">Tech Stack:</span>
                                <span className="text-sm font-semibold text-foreground truncate" title={interviewData.jobDesc}>{interviewData.jobDesc}</span>
                            </div>
                            <div className="flex items-center gap-2 min-w-0">
                                <Clock className="h-4 w-4 text-blue-600 shrink-0" />
                                <span className="text-xs font-medium text-muted-foreground shrink-0">Experience:</span>
                                <span className="text-sm font-semibold text-foreground truncate">{interviewData.jobExperience} yrs</span>
                            </div>
                        </div>
                    )}

                    <div className='flex items-start gap-2.5 p-4 border rounded-xl border-yellow-300 dark:border-yellow-700/60 shadow-sm bg-yellow-50 dark:bg-yellow-950/30 text-yellow-800 dark:text-yellow-300 flex-1'>
                            <Lightbulb className="h-4 w-4 mt-0.5 shrink-0 text-yellow-600 dark:text-yellow-400" />
                            <p className='text-xs leading-relaxed'>{ process.env.NEXT_PUBLIC_INFORMATION}</p>
                    </div>
                </div>

                {/* Webcam */}
                <div className="h-full flex flex-col items-center justify-center gap-3">
                    {webCamEnabled ? (
                        <>
                        <Webcam
                            onUserMedia={() => setWebCamEnabled(true)}
                            onUserMediaError={() => setWebCamEnabled(false)}
                            mirrored={true}
                            className="w-full max-w-[380px] aspect-[4/3] rounded-xl border border-border shadow-md object-cover"
                        />
                        <Button
                               variant="outline"
                               className="w-full sm:w-auto font-semibold h-9 px-6"
                                onClick={() => setWebCamEnabled(false)}>
                                Disable WebCam
                            </Button>
                            </>
                    ) : (
                        <>
                            <div className="flex flex-col items-center justify-center gap-1.5 w-full max-w-[380px] aspect-[4/3] rounded-xl border border-dashed border-border bg-muted/60 text-muted-foreground">
                                <WebcamIcon className="h-12 w-12 opacity-40" />
                                <p className="text-xs opacity-70">Camera preview will appear here</p>
                            </div>
                             <Button
                               className="w-full sm:w-auto font-semibold bg-blue-600 text-white hover:bg-blue-700 h-9 px-6"
                                onClick={() => setWebCamEnabled(true)}>
                                Enable WebCam and Microphone
                            </Button>
                        </>
                    )}

                    {/* Readiness checklist */}
                    <div className="flex flex-wrap justify-center gap-2 pt-1 w-full">
                        {READY_CHECKS.map((check, i) => (
                            <span
                                key={i}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium"
                            >
                                {check.icon}
                                {check.label}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Start Interview — centered below both columns */}
            <div className="flex justify-center mt-6">
                <Link href={`/dashboard/interview/${interviewId}/start`} passHref aria-disabled={loading || !!error} className="w-full max-w-xs">
                     <Button
                        disabled={loading || !!error}
                        className="w-full bg-blue-600 text-white hover:bg-blue-700 font-semibold rounded-xl h-11 text-base shadow-md shadow-blue-500/20 disabled:opacity-50 disabled:pointer-events-none">
                        Start Interview
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default Interview;
