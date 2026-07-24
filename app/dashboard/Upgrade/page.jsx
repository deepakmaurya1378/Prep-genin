import React from 'react'

function Upgrade() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div>
        <h2 className="text-3xl font-bold text-center text-foreground">Upgrade Plan</h2>
        <p className="text-base text-center text-muted-foreground mb-8 mt-2">
          Upgrade to a monthly plan to access unlimited AI mock interviews and priority support.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:items-stretch">
        {/* Starter Plan */}
        <div className="rounded-2xl border border-border bg-card text-card-foreground p-6 shadow-sm flex flex-col justify-between sm:px-8 lg:p-10 transition-colors">
          <div>
            <div className="text-center">
              <h2 className="text-lg font-semibold text-foreground">
                Starter
                <span className="sr-only">Plan</span>
              </h2>

              <p className="mt-2 sm:mt-4 flex items-baseline justify-center gap-1">
                <strong className="text-3xl font-bold text-foreground sm:text-4xl">Free</strong>
                <span className="text-sm font-bold text-muted-foreground">$0</span>
              </p>
            </div>

            <ul className="mt-8 space-y-3">
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-blue-600 dark:text-blue-400"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-foreground/90 text-sm">Create 3 free Mock Interviews</span>
              </li>

              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-blue-600 dark:text-blue-400"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-foreground/90 text-sm">Unlimited Retake Interview</span>
              </li>

              <li className="flex items-center gap-2 opacity-50">
                <span className="text-muted-foreground text-sm">✘ Practice Questions</span>
              </li>

              <li className="flex items-center gap-2 opacity-50">
                <span className="text-muted-foreground text-sm">✘ Priority Email Support</span>
              </li>
            </ul>
          </div>

          <a
            href="/dashboard"
            className="mt-8 block rounded-full border border-border bg-muted dark:bg-slate-800 px-12 py-3 text-center text-sm font-medium text-foreground hover:bg-accent transition-colors"
          >
            Current Plan
          </a>
        </div>

        {/* Pro Plan */}
        <div className="rounded-2xl border-2 border-blue-600 dark:border-blue-500 bg-card text-card-foreground p-6 shadow-md flex flex-col justify-between sm:px-8 lg:p-10 relative transition-colors">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            Recommended
          </span>
          <div>
            <div className="text-center">
              <h2 className="text-lg font-semibold text-foreground">
                Pro Monthly
                <span className="sr-only">Plan</span>
              </h2>

              <p className="mt-2 sm:mt-4 flex items-baseline justify-center gap-1">
                <strong className="text-3xl font-bold text-foreground sm:text-4xl">$3.99</strong>
                <span className="text-sm font-bold text-muted-foreground">/ month</span>
              </p>
            </div>

            <ul className="mt-8 space-y-3">
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-blue-600 dark:text-blue-400"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-foreground/90 text-sm font-medium">Unlimited AI Mock Interviews</span>
              </li>

              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-blue-600 dark:text-blue-400"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-foreground/90 text-sm">Unlimited Retakes & History</span>
              </li>

              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-blue-600 dark:text-blue-400"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-foreground/90 text-sm">Targeted Practice Questions</span>
              </li>

              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-blue-600 dark:text-blue-400"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-foreground/90 text-sm">Priority Email & AI Support</span>
              </li>
            </ul>
          </div>

          <a
            href="/dashboard"
            className="mt-8 block rounded-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 px-12 py-3 text-center text-sm font-medium text-white shadow-md transition-all"
          >
            Upgrade Now
          </a>
        </div>
      </div>
    </div>
  )
}

export default Upgrade;

