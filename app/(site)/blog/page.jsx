import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import { SpotlightCard, Stagger, StaggerItem } from "@/components/motion";
import POSTS from "@/components/site/posts";

export const metadata = { title: "Blog · PrepGenin" };

export default function Blog() {
  const [featured, ...rest] = POSTS;
  return (
    <div>
      <PageHero eyebrow="Blog" title="Interview tips and" highlight="practice guides" subtitle="Practical advice to help you answer with confidence." />

      <Stagger className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
        <StaggerItem className="md:col-span-2">
          <Link href={`/blog/${featured.slug}`} className="group block">
            <SpotlightCard className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-7 sm:p-10">
              <div>
                <span className="inline-block px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-4">
                  {featured.tag}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-2xl text-balance group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {featured.title}
                </h2>
                <p className="mt-3 text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">{featured.excerpt}</p>
                <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400">
                  Read article · {featured.readTime}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </p>
              </div>
            </SpotlightCard>
          </Link>
        </StaggerItem>

        {rest.map((p) => (
          <StaggerItem key={p.slug} className="h-full">
            <Link href={`/blog/${p.slug}`} className="group block h-full">
              <SpotlightCard className="h-full rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-6 sm:p-7">
                <div className="h-full flex flex-col">
                  <span className="self-start px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 text-xs font-semibold mb-4">
                    {p.tag}
                  </span>
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {p.title}
                  </h2>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed flex-1">{p.excerpt}</p>
                  <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400">
                    {p.readTime}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </p>
                </div>
              </SpotlightCard>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
