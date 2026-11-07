import React from 'react'
import { Check, X, Sparkles } from 'lucide-react'
import { Reveal, SplitText, SpotlightCard, Stagger, StaggerItem } from '@/components/motion'

const PLANS = [
  {
    name: 'Starter',
    price: 'Free',
    note: '$0',
    cta: 'Current Plan',
    features: [
      { text: 'Create 3 free Mock Interviews', on: true },
      { text: 'Unlimited Retake Interview', on: true },
      { text: 'Practice Questions', on: false },
      { text: 'Priority Email Support', on: false },
    ],
  },
  {
    name: 'Pro Monthly',
    price: '$3.99',
    note: '/ month',
    cta: 'Upgrade Now',
    featured: true,
    features: [
      { text: 'Unlimited AI Mock Interviews', on: true, strong: true },
      { text: 'Unlimited Retakes & History', on: true },
      { text: 'Targeted Practice Questions', on: true },
      { text: 'Priority Email & AI Support', on: true },
    ],
  },
]

function Upgrade() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="text-center mb-10">
        <SplitText
          as="h2"
          className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground"
          segments={[{ text: 'Upgrade' }, { text: 'Plan', className: 'gradient-text' }]}
        />
        <Reveal delay={0.25} as="p" className="text-base text-muted-foreground mt-3">
          Upgrade to a monthly plan to access unlimited AI mock interviews and priority support.
        </Reveal>
      </div>

      <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:items-stretch" gap={0.12}>
        {PLANS.map((plan) => (
          <StaggerItem key={plan.name} className="h-full">
            <SpotlightCard
              className={`h-full rounded-2xl bg-card text-card-foreground p-6 sm:px-8 lg:p-10 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 ${
                plan.featured
                  ? 'beam-border border border-blue-500/40 shadow-xl shadow-blue-500/10'
                  : 'border border-border shadow-sm'
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 inline-flex items-center gap-1 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider shadow-md shadow-blue-600/30">
                  <Sparkles className="w-3 h-3" /> Recommended
                </span>
              )}
              <div>
                <div className="text-center">
                  <h2 className="text-lg font-semibold text-foreground">
                    {plan.name}
                    <span className="sr-only"> Plan</span>
                  </h2>
                  <p className="mt-2 sm:mt-4 flex items-baseline justify-center gap-1">
                    <strong className="text-3xl font-bold text-foreground sm:text-4xl">{plan.price}</strong>
                    <span className="text-sm font-bold text-muted-foreground">{plan.note}</span>
                  </p>
                </div>

                <ul className="mt-8 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f.text} className={`flex items-center gap-2 ${f.on ? '' : 'opacity-50'}`}>
                      {f.on ? (
                        <Check className="size-5 text-blue-600 dark:text-blue-400" strokeWidth={2} />
                      ) : (
                        <X className="size-5 text-muted-foreground" strokeWidth={2} />
                      )}
                      <span className={`text-sm ${f.on ? 'text-foreground/90' : 'text-muted-foreground'} ${f.strong ? 'font-medium' : ''}`}>
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="/dashboard"
                className={
                  plan.featured
                    ? 'btn-shine mt-8 block rounded-full bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 px-12 py-3 text-center text-sm font-medium text-white shadow-md shadow-blue-600/30 transition-colors'
                    : 'mt-8 block rounded-full border border-border bg-muted dark:bg-slate-800 px-12 py-3 text-center text-sm font-medium text-foreground hover:bg-accent transition-colors'
                }
              >
                {plan.cta}
              </a>
            </SpotlightCard>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  )
}

export default Upgrade;
