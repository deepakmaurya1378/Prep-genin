import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Briefcase, Calendar, Award, Trash2 } from 'lucide-react'
import { db } from '@/utils/db'
import { MockInterview, UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { toast } from 'sonner'

function InterviewItemCard({ interview, onDeleted }) {
    const router = useRouter();
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const onRetake = () => {
        router.push("/dashboard/interview/" + interview?.mockId);
    }

    const onFeedback = () => {
        router.push('/dashboard/interview/' + interview.mockId + "/feedback");
    }

    const onDelete = async () => {
        setDeleting(true);
        try {
            await db.delete(UserAnswer).where(eq(UserAnswer.mockIdRef, interview.mockId));
            await db.delete(MockInterview).where(eq(MockInterview.mockId, interview.mockId));
            toast.success("Interview deleted");
            setOpenDeleteDialog(false);
            onDeleted?.(interview.mockId);
        } catch (error) {
            console.error("Error deleting interview:", error);
            toast.error("Failed to delete interview. Please try again.");
        }
        setDeleting(false);
    }

    return (
    <div className='bg-white dark:bg-slate-900/60 backdrop-blur-xl p-5 rounded-2xl border border-blue-100 dark:border-slate-800/80 shadow-sm flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl'>
        <div>
          <div className='flex items-start justify-between gap-3 mb-3'>
            <div className='w-10 h-10 rounded-xl bg-blue-500/10 dark:bg-blue-400/10 flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0'>
              <Briefcase className="w-5 h-5" />
            </div>
            <span className='inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium'>
              <Award className="w-3 h-3 text-amber-500" />
              {interview?.jobExperience} Yrs Exp
            </span>
          </div>

          <h3 className='font-bold text-slate-900 dark:text-white text-lg tracking-tight line-clamp-1 mb-1'>
            {interview?.jobPosition}
          </h3>
          
          <div className='flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 mb-4'>
            <Calendar className="w-3.5 h-3.5" />
            <span>Created {interview?.createdAt}</span>
          </div>
        </div>

        <div className='flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/60'>
          <Button
            size="sm"
            variant="outline"
            className='flex-1 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold rounded-xl'
            onClick={onFeedback}
          >
            Feedback
          </Button>
          <Button
            size="sm"
            className='flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-md shadow-blue-500/20'
            onClick={onRetake}
          >
            Retake
          </Button>
          <Button
            size="sm"
            variant="outline"
            className='px-2.5 border-slate-200 dark:border-slate-800 hover:bg-red-50 hover:border-red-200 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:border-red-900 dark:hover:text-red-400 text-slate-500 dark:text-slate-400 rounded-xl'
            onClick={() => setOpenDeleteDialog(true)}
            aria-label="Delete interview"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>

        <Dialog open={openDeleteDialog} onOpenChange={(open) => !deleting && setOpenDeleteDialog(open)}>
          <DialogContent className="max-w-sm bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-slate-200/80 dark:border-slate-800/80 shadow-2xl rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-slate-900 dark:text-white">Delete this interview?</DialogTitle>
              <DialogDescription className="text-slate-500 dark:text-slate-400">
                This will permanently delete the "{interview?.jobPosition}" interview and its feedback. This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-2">
              <Button
                type="button"
                variant="ghost"
                disabled={deleting}
                onClick={() => setOpenDeleteDialog(false)}
                className="rounded-xl font-semibold text-slate-600 dark:text-slate-400"
              >
                Cancel
              </Button>
              <Button
                type="button"
                disabled={deleting}
                onClick={onDelete}
                className="bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold"
              >
                {deleting ? "Deleting..." : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
    </div>
  )
}

export default InterviewItemCard
