'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { db } from '@/utils/db';
import { and, eq } from 'drizzle-orm';
import Webcam from 'react-webcam';
import { Button } from '@/components/ui/button';
import { Mic, StopCircle, Video, VideoOff, RefreshCw, WebcamIcon } from 'lucide-react';
import { toast } from 'sonner';
import { generateInterviewContent } from '@/utils/GrokAIModal';
import { transcribeAudioBlob } from '@/utils/whisperFallback';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';

function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData, onAnswerSaved }) {
  const [userAnswer, setUserAnswer] = useState('');
  const [interimText, setInterimText] = useState('');
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [micError, setMicError] = useState(null);
  const [audioLevel, setAudioLevel] = useState(0);
  const [transcribing, setTranscribing] = useState(false);
  const [modelProgress, setModelProgress] = useState(null);

  const recognitionRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const fallbackStreamRef = useRef(null);
  const analyserRef = useRef(null);
  const animFrameRef = useRef(null);
  const audioCtxRef = useRef(null);
  const wantRecordingRef = useRef(false); // tracks user intent, so we can auto-restart after mobile browsers auto-stop
  const restartTimeoutRef = useRef(null);

  // Animate waveform using Web Audio API
  const startWaveform = async () => {
    // Recognition auto-restarts on mobile can re-fire onstart; avoid stacking
    // multiple live AudioContexts/mic streams when that happens.
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      audioCtxRef.current = ctx;
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;

      const tick = () => {
        const data = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(data);
        const avg = data.reduce((a, b) => a + b, 0) / data.length;
        setAudioLevel(avg);
        animFrameRef.current = requestAnimationFrame(tick);
      };
      tick();
    } catch (_) {
      // silent — waveform is decorative
    }
  };

  const stopWaveform = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    // Only close if AudioContext exists and is NOT already closed
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      audioCtxRef.current.close().catch(() => { });
      audioCtxRef.current = null;
    }
    setAudioLevel(0);
  };

  // Pick a MediaRecorder mime type the current browser actually supports.
  const pickAudioMimeType = () => {
    const candidates = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/aac'];
    for (const type of candidates) {
      if (window.MediaRecorder?.isTypeSupported?.(type)) return type;
    }
    return undefined; // let the browser pick a default
  };

  // Fallback for browsers with no native SpeechRecognition (Safari/iOS, Firefox):
  // record raw audio and transcribe it on-device with a small Whisper model.
  const startFallbackRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      fallbackStreamRef.current = stream;

      const mimeType = pickAudioMimeType();
      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      audioChunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        fallbackStreamRef.current?.getTracks().forEach((t) => t.stop());
        fallbackStreamRef.current = null;
        stopWaveform();
        setIsRecording(false);

        const blob = new Blob(audioChunksRef.current, { type: mimeType || 'audio/webm' });
        audioChunksRef.current = [];
        if (blob.size < 1000) return; // essentially silent/empty

        setTranscribing(true);
        try {
          const text = await transcribeAudioBlob(blob, (progress) => {
            if (progress?.status === 'progress' && progress.total) {
              setModelProgress(Math.round((progress.loaded / progress.total) * 100));
            }
          });
          setModelProgress(null);
          if (text) {
            setUserAnswer((prev) => (prev ? prev + ' ' : '') + text);
          } else {
            toast.error("Couldn't make out any speech — please try again.");
          }
        } catch (err) {
          console.error('On-device transcription failed:', err);
          toast.error('Transcription failed. Please try again.');
        }
        setTranscribing(false);
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      wantRecordingRef.current = true;
      setIsRecording(true);
      setMicError(null);
      startWaveform();
    } catch (err) {
      console.error('Mic access failed:', err);
      setMicError('Microphone access denied or unavailable. Please allow microphone permissions and try again.');
      toast.error('Microphone permission denied.');
    }
  };

  const stopFallbackRecording = () => {
    wantRecordingRef.current = false;
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    mediaRecorderRef.current = null;
  };

  // Initialize and start speech recognition
  const startRecording = useCallback(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // No native speech engine (Safari/iOS, Firefox) — transcribe on-device instead.
      startFallbackRecording();
      return;
    }

    // Mic access + Speech Recognition both require a secure context.
    // On a phone this bites people testing over a plain http://<lan-ip> address.
    if (!window.isSecureContext) {
      setMicError('Voice input needs a secure connection (https://). It won\'t work over a plain http:// address, even on your local network.');
      toast.error('Insecure connection — voice input is blocked.');
      return;
    }

    wantRecordingRef.current = true;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsRecording(true);
      setMicError(null);
      startWaveform();
    };

    recognition.onresult = (event) => {
      let finalTranscript = '';
      let interim = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + ' ';
        } else {
          interim += event.results[i][0].transcript;
        }
      }

      if (finalTranscript) {
        setUserAnswer(prev => prev + finalTranscript);
      }
      setInterimText(interim);
    };

    // Errors that mean "give up" — anything else, mobile Chrome/Edge throw
    // routinely (e.g. a short gap in speech) and recognition should just restart.
    const FATAL_ERRORS = new Set(['not-allowed', 'service-not-allowed', 'audio-capture']);

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        setMicError('Microphone access denied. Please allow microphone permissions and try again.');
        toast.error('Microphone permission denied.');
      } else if (event.error === 'audio-capture') {
        setMicError('No microphone was found. Please check your device and try again.');
        toast.error('No microphone detected.');
      } else if (event.error === 'network') {
        // Chrome/Edge speech recognition sends audio to a cloud service — this
        // fires when the phone has a flaky connection.
        toast.warning('Network issue during speech recognition — retrying...');
      } else if (event.error === 'no-speech') {
        // Common on mobile after a few seconds of silence; not fatal, we restart below.
      } else {
        toast.error(`Speech error: ${event.error}`);
      }

      if (FATAL_ERRORS.has(event.error)) {
        wantRecordingRef.current = false;
        setIsRecording(false);
        stopWaveform();
      }
    };

    recognition.onend = () => {
      // Android Chrome/Edge frequently auto-stop recognition after a short pause
      // even with continuous:true. If the user hasn't clicked "Stop", restart it
      // transparently instead of dropping their recording session.
      if (wantRecordingRef.current) {
        restartTimeoutRef.current = setTimeout(() => {
          if (wantRecordingRef.current) {
            try {
              recognition.start();
            } catch (_) {
              // start() can throw if called too soon after stop; a fresh instance is more reliable.
              startRecording();
            }
          }
        }, 250);
        return;
      }
      setIsRecording(false);
      setInterimText('');
      stopWaveform();
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, []);

  const stopRecording = useCallback(() => {
    wantRecordingRef.current = false;
    if (restartTimeoutRef.current) {
      clearTimeout(restartTimeoutRef.current);
      restartTimeoutRef.current = null;
    }

    if (mediaRecorderRef.current) {
      stopFallbackRecording();
      return;
    }

    stopWaveform();
    if (recognitionRef.current) {
      // Don't flip isRecording here — recognition.stop() still delivers a
      // trailing final onresult before onend fires. Setting it early races
      // that last chunk and can save a truncated (or empty) answer. The
      // onend handler's non-restart branch is the one true "fully stopped"
      // signal, so let it flip isRecording once the transcript is final.
      recognitionRef.current.stop();
    } else {
      setIsRecording(false);
    }
  }, []);

  const StartStopRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  // Reset answer when question changes
  useEffect(() => {
    setUserAnswer('');
    setInterimText('');
    if (isRecording) stopRecording();
  }, [activeQuestionIndex]);

  // Make sure a pending auto-restart doesn't fire after the component is gone
  useEffect(() => {
    return () => {
      wantRecordingRef.current = false;
      if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current);
      if (recognitionRef.current) recognitionRef.current.stop();
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      fallbackStreamRef.current?.getTracks().forEach((t) => t.stop());
      stopWaveform();
    };
  }, []);

  // Save answer once recording has fully stopped AND (for the on-device
  // fallback) transcription has finished — the fallback flips isRecording
  // false immediately on stop, well before the async transcript is ready.
  useEffect(() => {
    if (!isRecording && !transcribing && userAnswer?.trim().length > 5) {
      UpdateUserAnswer();
    }
  }, [isRecording, transcribing]);

  const UpdateUserAnswer = async () => {
    if (!userAnswer?.trim() || userAnswer.trim().length <= 5) return;
    setLoading(true);

    const feedbackPrompt = `Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}
User Answer: ${userAnswer}

Based on the above interview question and user answer, provide a rating (1-10) and concise feedback (3-5 lines) on how to improve. Respond ONLY with valid JSON in this exact format:
{"rating": <number 1-10>, "feedback": "<feedback text>"}`;

    try {
      const mockJsonRespText = await generateInterviewContent(feedbackPrompt);
      const JsonFeedbackResp = JSON.parse(mockJsonRespText);

      const question = mockInterviewQuestion[activeQuestionIndex]?.question;

      // Re-recording an answer should replace the previous attempt for this
      // question, not add a duplicate row alongside it.
      await db.delete(UserAnswer).where(
        and(
          eq(UserAnswer.mockIdRef, interviewData?.mockId),
          eq(UserAnswer.question, question)
        )
      );

      const resp = await db.insert(UserAnswer).values({
        mockIdRef: interviewData?.mockId,
        question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: JsonFeedbackResp?.feedback,
        rating: JsonFeedbackResp?.rating,
        userEmail: user?.emailAddresses?.[0]?.emailAddress,
        createdAt: moment().format('DD-MM-yyyy')
      });

      if (resp) {
        toast.success('✅ Answer recorded & analyzed!');
        setUserAnswer('');
        setInterimText('');
        onAnswerSaved?.();
      }
    } catch (err) {
      console.error('Error generating feedback:', err);
      toast.error('Failed to analyze answer. Please try again.');
    }

    setLoading(false);
  };

  // Waveform bars
  const bars = 12;
  const getBarHeight = (index) => {
    if (!isRecording) return 4;
    const offset = Math.sin((Date.now() / 200 + index) * 1.5) * 0.5 + 0.5;
    return Math.max(4, (audioLevel / 255) * 40 * offset + 6);
  };

  return (
    <div className="flex flex-col items-center justify-center my-10 w-full">
      {/* Camera + Recording Card */}
      <div className="relative flex flex-col items-center justify-center p-4 rounded-3xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl w-full max-w-lg overflow-hidden">

        {/* REC LIVE Badge */}
        {isRecording && (
          <div className="absolute top-5 left-5 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-500/30">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            <span>REC LIVE</span>
          </div>
        )}

        {/* Webcam or Placeholder */}
        {webCamEnabled ? (
          <Webcam
            onUserMedia={() => setWebCamEnabled(true)}
            onUserMediaError={() => setWebCamEnabled(false)}
            mirrored={true}
            className="rounded-2xl border border-slate-200 dark:border-slate-700 shadow-md w-full h-[280px] object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-[280px] w-full rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800/70 dark:to-slate-900/50 border border-dashed border-slate-300 dark:border-slate-700 text-slate-400">
            <WebcamIcon className="h-14 w-14 mb-3 opacity-30" />
            <p className="text-xs font-semibold text-slate-400">Camera Preview Disabled</p>
            <p className="text-xs text-slate-300 dark:text-slate-600 mt-1">Your video is never recorded</p>
          </div>
        )}

        {/* Waveform Visualizer */}
        <div className="flex items-center justify-center gap-1 mt-5 h-10">
          {Array.from({ length: bars }).map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-100 ${isRecording
                  ? 'bg-gradient-to-t from-blue-500 to-indigo-400'
                  : 'bg-slate-200 dark:bg-slate-700'
                }`}
              style={{
                width: '4px',
                height: isRecording ? `${getBarHeight(i)}px` : '4px',
                transition: 'height 0.1s ease',
              }}
            />
          ))}
        </div>

        {/* Live Transcript Box */}
        {(userAnswer || interimText) && (
          <div className="w-full mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-200 max-h-28 overflow-y-auto leading-relaxed">
            <span className="font-bold text-blue-600 dark:text-blue-400 block mb-1.5 text-xs uppercase tracking-wide">Live Transcript</span>
            <span>{userAnswer}</span>
            {interimText && (
              <span className="text-slate-400 dark:text-slate-500 italic"> {interimText}</span>
            )}
          </div>
        )}

        {/* Mic Error Message */}
        {micError && (
          <div className="w-full mt-3 p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 text-xs text-red-700 dark:text-red-300">
            ⚠️ {micError}
          </div>
        )}

        {/* On-device transcription status (Safari/iOS/Firefox fallback) */}
        {transcribing && (
          <div className="w-full mt-3 p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50 text-xs text-blue-700 dark:text-blue-300 flex items-center gap-2">
            <RefreshCw className="w-3.5 h-3.5 animate-spin shrink-0" />
            {modelProgress !== null
              ? `Downloading on-device speech model (${modelProgress}%, first time only)...`
              : 'Transcribing your answer on-device...'}
          </div>
        )}

        {/* Control Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-5 w-full">
          <Button
            variant="outline"
            onClick={() => setWebCamEnabled(!webCamEnabled)}
            className="rounded-xl border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold px-4"
          >
            {webCamEnabled ? (
              <span className="flex items-center gap-1.5"><VideoOff className="w-4 h-4 text-red-500" /> Disable Camera</span>
            ) : (
              <span className="flex items-center gap-1.5"><Video className="w-4 h-4 text-blue-500" /> Enable Camera</span>
            )}
          </Button>

          <Button
            disabled={loading || transcribing}
            onClick={StartStopRecording}
            className={`rounded-xl text-xs font-semibold px-5 transition-all shadow-md ${isRecording
                ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/25'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25'
              }`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" /> Analyzing...
              </span>
            ) : transcribing ? (
              <span className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" /> Transcribing...
              </span>
            ) : isRecording ? (
              <span className="flex items-center gap-2">
                <StopCircle className="w-4 h-4" /> Stop Recording
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Mic className="w-4 h-4" /> Record Answer
              </span>
            )}
          </Button>
        </div>

        {/* Helper Text */}
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-3 text-center">
          {isRecording
            ? '🎙️ Listening... Speak clearly into your microphone'
            : transcribing
              ? '🧠 Converting your speech to text on-device...'
              : loading
                ? '⚡ AI is analyzing your answer...'
                : 'Click "Record Answer" to start speaking'}
        </p>
      </div>
    </div>
  );
}

export default RecordAnswerSection;
