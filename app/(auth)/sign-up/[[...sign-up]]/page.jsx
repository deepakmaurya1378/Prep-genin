"use client";
import { SignUp } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const LASER_BEAMS = [
  { left: '30%', duration: '15s', delay: '2s' },
  { left: '75%', duration: '13s', delay: '8s' },
];

export default function Page() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-slate-950 px-4 py-10">
      <div className="laser-field">
        {LASER_BEAMS.map((beam, i) => (
          <span
            key={i}
            className="laser-beam"
            style={{
              '--laser-left': beam.left,
              '--laser-duration': beam.duration,
              '--laser-delay': beam.delay,
            }}
          />
        ))}
      </div>

      <Link href="/" className="relative z-10 mb-8 transition-transform duration-200 hover:scale-105">
        <Image
          src="/Prepgeninlogo.png"
          width={170}
          height={36}
          alt="Prep-Genin"
          className="object-contain brightness-125 filter drop-shadow-sm w-36 sm:w-[170px] h-auto"
        />
      </Link>

      <h1 className="relative z-10 text-xl sm:text-2xl font-bold text-white text-center mb-6 animate-fade-in">
        Create your account and start practicing today
      </h1>

      <div className="relative z-10 w-full max-w-sm rounded-2xl border border-blue-900/40 bg-card shadow-2xl shadow-blue-950/50 overflow-hidden animate-slide-up">
        <SignUp
          appearance={{
            baseTheme: mounted && resolvedTheme === 'dark' ? dark : undefined,
            variables: {
              colorPrimary: '#2563eb',
            },
            elements: {
              rootBox: 'w-full',
              card: 'w-full shadow-none border-none bg-transparent rounded-none',
              headerTitle: 'text-slate-900 dark:text-white',
              headerSubtitle: 'text-slate-500 dark:text-slate-400',
              socialButtonsBlockButton: 'border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors',
              socialButtonsBlockButtonText: 'text-slate-700 dark:text-slate-100 font-medium',
              dividerLine: 'bg-slate-200 dark:bg-slate-700',
              dividerText: 'text-slate-400 dark:text-slate-400',
              formFieldLabel: 'text-slate-700 dark:text-slate-200',
              formFieldInput: 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500',
              formFieldInputShowPasswordButton: 'text-slate-400 dark:text-slate-400',
              footer: 'bg-transparent',
              footerAction: 'bg-transparent',
              footerActionText: 'text-slate-500 dark:text-slate-400',
              footerActionLink: 'text-blue-600 dark:text-blue-400 font-semibold',
              identityPreviewText: 'text-slate-700 dark:text-slate-200',
              identityPreviewEditButton: 'text-blue-600 dark:text-blue-400',
              formResendCodeLink: 'text-blue-600 dark:text-blue-400',
              otpCodeFieldInput: 'text-slate-900 dark:text-white border-slate-300 dark:border-slate-600',
            },
          }}
        />
      </div>
    </div>
  );
}
