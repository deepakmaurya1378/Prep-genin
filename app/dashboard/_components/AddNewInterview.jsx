"use client"
import React, { useState } from 'react';
import { v4 as uuid4 } from 'uuid';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/utils/GeminiAIModal';
import { LoaderCircle } from 'lucide-react';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { db } from '@/utils/db';
import { useRouter } from 'next/navigation';

function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState('');
    const [jobDesc, setJobDesc] = useState('');
    const [jobExperience, setJobExperience] = useState('');  // Updated to jobExperience
    const [loading, setloading] = useState(false);
    const [JsonResponse, setJsonResponse] = useState([]);
    const router = useRouter();
    const { user } = useUser();

   const onSubmit = async (e) => {
       setloading(true);
        e.preventDefault();
        const questionCount = process.env.NEXT_PUBLIC_INTERVIEW_QUESTIONS_COUNT;
        const InputPrompt = `Job position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}. Generate ${questionCount} interview questions with answers in JSON format. Each item should have 'question' and 'answer' fields without any extra.`;

       const result = await chatSession.sendMessage(InputPrompt);
       console.log(result.response.text());
        const MockJsonResp = (result.response.text()).replace('```json', '').replace('```','')
        console.log(MockJsonResp)
       setJsonResponse(MockJsonResp);
       if (MockJsonResp) {
            const resp = await db.insert(MockInterview).values({
            mockId: uuid4(),
            jsonMockResp: MockJsonResp,
            jobPosition: jobPosition,
            jobDesc: jobDesc,
            jobExperience: jobExperience,  // Updated to jobExperience
            createdBy: user.emailAddresses?.[0]?.emailAddress ,
            createdAt: moment().format('DD_MM_YYYY')
        }).returning({ mockId: MockInterview.mockId });

           console.log("Inserted ID:", resp);
           if (resp)
           {
               setOpenDialog(false);
              router.push('/dashboard/interview/'+resp[0]?.mockId);
            }
       }
       else {
           console.log("Error")
       }
       setloading(false);
};

    return (
        <div>
            <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'
                onClick={() => setOpenDialog(true)}>
                <h2 className='font-bold text-lg text-center'>+ Add New</h2>
            </div>
            <Dialog open={openDialog}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Tell us more about your job interviewing</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        <form onSubmit={onSubmit}>
                            <div>
                                <h2>Add Details about your job position/role, Job description and years of experience</h2>
                                <div className='mt-7 my-2'>
                                    <label>Job Role/Job Position</label>
                                    <Input placeholder="Ex. Full Stack Developer" required
                                    onChange={(event) => setJobPosition(event.target.value)} />
                                </div>
                                <div className='my-3'>
                                    <label>Job Description/ Tech Stack (In Short)</label>
                                    <Textarea placeholder="Ex. React, Angular, NodeJs, MySql etc" required
                                    onChange={(event) => setJobDesc(event.target.value)} />
                                </div>
                                <div className='my-3'>
                                    <label>Years of experience</label>
                                    <Input placeholder="Ex.5" type="number" max="100" required 
                                    onChange={(event) => setJobExperience(event.target.value)} />
                                </div>
                            </div>
                            <div className='flex gap-5 justify-end'>
                                <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                                <Button type="submit" className="bg-blue-500 hover:bg-blue-600" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <LoaderCircle className='animate-spin' /> Generating from AI
                                        </>
                                    ) : 'Start Interview'}
                                </Button>
                            </div>
                        </form>
                    </DialogDescription>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddNewInterview;
