import React from "react";
import PageHero from "./PageHero";

/**
 * Layout for policy pages: heading, "last updated" line, a table of contents
 * on wide screens and readable sections.
 * sections: [{ id, title, body: [string | { list: string[] }] }]
 */
export default function LegalPage({ eyebrow, title, subtitle, updated, sections }) {
  return (
    <div>
      <PageHero eyebrow={eyebrow} title={title} subtitle={subtitle}>
        <p className="text-xs text-slate-400">Last updated {updated}</p>
      </PageHero>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)] gap-10">
        <nav aria-label="On this page" className="hidden lg:block">
          <div className="sticky top-24">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400 mb-3">On this page</p>
            <ul className="space-y-2 text-sm border-l border-slate-200 dark:border-white/10">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="block -ml-px pl-4 border-l border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-blue-500 transition-colors"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <article className="min-w-0 space-y-10">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="scroll-mt-24">
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
                <span className="text-blue-600 dark:text-blue-400 mr-2 tabular-nums">{i + 1}.</span>
                {s.title}
              </h2>
              <div className="space-y-3 text-[15px] leading-7 text-slate-600 dark:text-slate-300 max-w-[68ch]">
                {s.body.map((b, j) =>
                  typeof b === "string" ? (
                    <p key={j}>{b}</p>
                  ) : (
                    <ul key={j} className="list-disc pl-5 space-y-1.5 marker:text-blue-500">
                      {b.list.map((li) => (
                        <li key={li}>{li}</li>
                      ))}
                    </ul>
                  )
                )}
              </div>
            </section>
          ))}
        </article>
      </div>
    </div>
  );
}
