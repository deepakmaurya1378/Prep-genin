'use client';
import { Lightbulb, Volume2, VolumeX } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

// Android Chrome/Edge return an empty voice list on the very first call —
// voices only show up once 'voiceschanged' fires, sometimes a beat later.
function getVoicesAsync() {
  return new Promise((resolve) => {
    const existing = window.speechSynthesis.getVoices();
    if (existing.length > 0) {
      resolve(existing);
      return;
    }
    const onVoicesChanged = () => {
      window.speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
      resolve(window.speechSynthesis.getVoices());
    };
    window.speechSynthesis.addEventListener('voiceschanged', onVoicesChanged);
    // Fallback in case the event never fires on some engines
    setTimeout(() => resolve(window.speechSynthesis.getVoices()), 1000);
  });
}

function pickVoice(voices) {
  return (
    voices.find((v) => v.lang === 'en-US' && /Google|Microsoft/i.test(v.name)) ||
    voices.find((v) => v.lang === 'en-US') ||
    voices.find((v) => v.lang?.startsWith('en')) ||
    voices[0] ||
    null
  );
}

function QuestionSection({ mockInterviewQuestion, activeQuestionIndex, onSelectQuestion }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const keepAliveRef = useRef(null);

  // Cancel speech on question change / unmount so two answers never overlap
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      if (keepAliveRef.current) clearInterval(keepAliveRef.current);
      setIsSpeaking(false);
    };
  }, [activeQuestionIndex]);

  const textToSpeech = async (text) => {
    if (!('speechSynthesis' in window)) {
      alert('Sorry, your browser does not support text to speech.');
      return;
    }

    // If already speaking → stop
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      if (keepAliveRef.current) clearInterval(keepAliveRef.current);
      setIsSpeaking(false);
      return;
    }

    // Cancel any ongoing speech before starting new
    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);
    speech.rate = 0.95;
    speech.pitch = 1;
    speech.volume = 1;

    const voice = pickVoice(await getVoicesAsync());
    if (voice) {
      speech.voice = voice;
      speech.lang = voice.lang;
    }

    speech.onstart = () => {
      setIsSpeaking(true);
      // Chrome (desktop + Android) silently pauses speech after ~15s on some
      // versions; nudging pause/resume periodically keeps it talking.
      keepAliveRef.current = setInterval(() => {
        if (window.speechSynthesis.speaking) {
          window.speechSynthesis.pause();
          window.speechSynthesis.resume();
        }
      }, 10000);
    };
    speech.onend = () => {
      setIsSpeaking(false);
      if (keepAliveRef.current) clearInterval(keepAliveRef.current);
    };
    speech.onerror = () => {
      setIsSpeaking(false);
      if (keepAliveRef.current) clearInterval(keepAliveRef.current);
    };

    window.speechSynthesis.speak(speech);
  };

  if (!mockInterviewQuestion) return null;

  return (
    <div className="p-6 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-lg rounded-2xl my-10">

      {/* Question Number Pills */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mb-6">
        {mockInterviewQuestion.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onSelectQuestion?.(index)}
            className={`px-3 py-1.5 rounded-full text-xs text-center font-semibold transition-all duration-200 select-none cursor-pointer ${
              activeQuestionIndex === index
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            Q{index + 1}
          </button>
        ))}
      </div>

      {/* Question Text */}
      <div className="mb-5">
        <h2 className="text-base md:text-lg font-semibold text-slate-900 dark:text-white leading-relaxed">
          {mockInterviewQuestion[activeQuestionIndex]?.question}
        </h2>
      </div>

      {/* Text-to-Speech Button */}
      <button
        onClick={() => textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)}
        title={isSpeaking ? 'Click to stop reading' : 'Click to read question aloud'}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 border ${
          isSpeaking
            ? 'bg-blue-100 dark:bg-blue-950/50 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300'
            : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:border-blue-300 hover:text-blue-600'
        }`}
      >
        {isSpeaking ? (
          <>
            <VolumeX className="w-4 h-4 animate-pulse" />
            Stop Reading
          </>
        ) : (
          <>
            <Volume2 className="w-4 h-4" />
            Read Aloud
          </>
        )}
      </button>

      {/* Note Box */}
      <div className="mt-8 border border-blue-200 dark:border-blue-900/60 rounded-xl p-4 bg-blue-50/70 dark:bg-blue-950/20">
        <h3 className="flex gap-2 items-center text-blue-700 dark:text-blue-300 font-semibold text-sm mb-2">
          <Lightbulb className="w-4 h-4 text-amber-500 flex-shrink-0" />
          Note
        </h3>
        <p className="text-xs text-blue-800 dark:text-blue-200 leading-relaxed">
          {process.env.NEXT_PUBLIC_QUESTION_NOTE}
        </p>
      </div>
    </div>
  );
}

export default QuestionSection;
