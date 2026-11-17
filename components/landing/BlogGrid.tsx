"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, Clock } from "lucide-react";
import { POSTS, TAGS, readingMinutes } from "@/lib/blog";
import PostCover from "./PostCover";

const fmt = (iso: string) => new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric" }).format(new Date(iso));

export default function BlogGrid() {
  const [tag, setTag] = useState<(typeof TAGS)[number]>("All");
  const posts = useMemo(() => [...POSTS].sort((a, b) => b.date.localeCompare(a.date)).filter((p) => tag === "All" || p.tag === tag), [tag]);
  const [lead, ...rest] = posts;

  return (
    <div>
      <div role="group" aria-label="Filter posts by topic" className="flex flex-wrap gap-2">
        {TAGS.map((t) => (
          <button key={t} type="button" aria-pressed={t === tag} onClick={() => setTag(t)}
            className={`min-h-11 rounded-full border px-5 text-sm font-bold transition-[background-color,border-color,color,transform] duration-200 active:scale-95 ${t === tag ? "border-zinc-950 bg-zinc-950 text-white" : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400"}`}>
            {t}
          </button>
        ))}
      </div>

      {lead && (
        <Link href={`/blog/${lead.slug}`} className="group mt-8 grid overflow-hidden rounded-[2rem] border border-zinc-200 bg-white transition-[transform,border-color,box-shadow] duration-300 ease-[var(--ease-out)] hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_30px_60px_-34px_rgb(254_89_51/0.5)] md:grid-cols-[1.1fr_1fr]">
          <PostCover post={lead} index={POSTS.indexOf(lead)} className="min-h-[240px] md:min-h-[360px]" />
          <div className="flex flex-col justify-center p-8 md:p-12">
            <Meta tag={lead.tag} date={lead.date} mins={readingMinutes(lead)} />
            <h2 className="mt-4 text-balance text-3xl font-extrabold leading-[1.1] tracking-tight text-zinc-950 md:text-4xl">{lead.title}</h2>
            <p className="mt-4 text-pretty text-lg font-medium leading-relaxed text-zinc-600">{lead.description}</p>
            <span className="mt-6 inline-flex items-center gap-1.5 font-bold text-primary">Read the post<ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden /></span>
          </div>
        </Link>
      )}

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white transition-[transform,border-color,box-shadow] duration-300 ease-[var(--ease-out)] hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_24px_50px_-30px_rgb(9_9_11/0.35)]">
            <PostCover post={p} index={POSTS.indexOf(p)} className="h-44" />
            <div className="flex flex-1 flex-col p-6">
              <Meta tag={p.tag} date={p.date} mins={readingMinutes(p)} />
              <h3 className="mt-3 text-balance text-xl font-extrabold leading-snug tracking-tight text-zinc-950">{p.title}</h3>
              <p className="mt-2 flex-1 text-pretty font-medium leading-relaxed text-zinc-600">{p.description}</p>
            </div>
          </Link>
        ))}
      </div>
      {posts.length === 0 && <p className="mt-10 font-semibold text-zinc-500">No posts in this topic yet.</p>}
    </div>
  );
}

function Meta({ tag, date, mins }: { tag: string; date: string; mins: number }) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold uppercase tracking-[0.12em] text-zinc-500">
      <span className="text-primary">{tag}</span>
      <time dateTime={date}>{fmt(date)}</time>
      <span className="inline-flex items-center gap-1"><Clock className="size-3.5" aria-hidden />{mins} min read</span>
    </p>
  );
}
