import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion";
import POSTS from "@/components/site/posts";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  return { title: post ? `${post.title} · PrepGenin` : "Blog · PrepGenin" };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) notFound();
  const next = POSTS[(POSTS.indexOf(post) + 1) % POSTS.length];

  return (
    <article className="max-w-2xl mx-auto pt-10 sm:pt-14">
      <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white mb-8">
        <ArrowLeft className="w-4 h-4" /> All articles
      </Link>

      <Reveal>
        <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-3">
          {post.tag} · {post.readTime}
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-slate-900 dark:text-white text-balance">{post.title}</h1>
        <p className="mt-4 text-lg text-slate-500 dark:text-slate-400 leading-relaxed">{post.excerpt}</p>
      </Reveal>

      <div className="mt-10 space-y-5 text-[16px] leading-8 text-slate-700 dark:text-slate-300">
        {post.body.map((b, i) =>
          typeof b === "string" ? (
            <p key={i}>{b}</p>
          ) : b.h ? (
            <h2 key={i} className="pt-4 text-xl font-bold tracking-tight text-slate-900 dark:text-white">{b.h}</h2>
          ) : (
            <ul key={i} className="list-disc pl-5 space-y-2 marker:text-blue-500">
              {b.list.map((li) => <li key={li}>{li}</li>)}
            </ul>
          )
        )}
      </div>

      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-6 text-white">
          <p className="font-bold">Put it into practice</p>
          <p className="text-sm text-blue-100 mt-1 mb-4">Answer real questions for your role and get scored feedback.</p>
          <Link href="/dashboard" className="inline-flex items-center gap-1.5 h-9 px-4 rounded-lg bg-white text-slate-900 text-sm font-semibold">
            Start practising <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        {next.slug !== post.slug && (
          <Link href={`/blog/${next.slug}`} className="group rounded-2xl border border-slate-200 dark:border-white/10 p-6 hover:border-blue-300 dark:hover:border-blue-500/40 transition-colors">
            <p className="text-xs font-semibold text-slate-400 mb-1">Next article</p>
            <p className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{next.title}</p>
          </Link>
        )}
      </div>
    </article>
  );
}
