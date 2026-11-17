import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Clock, Lightbulb } from "lucide-react";
import { POSTS, getPost, readingMinutes, slugify } from "@/lib/blog";
import PostCover from "@/components/landing/PostCover";
import CtaBand from "@/components/landing/CtaBand";
import Eyebrow from "@/components/landing/Eyebrow";
import PostToc from "@/components/landing/PostToc";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return { title: `${post.title} · Converso`, description: post.description, openGraph: { title: post.title, description: post.description, type: "article", publishedTime: post.date } };
}

const fmt = (iso: string) => new Intl.DateTimeFormat("en", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const index = POSTS.indexOf(post);
  const toc = post.body.filter((b) => b.type === "h2") as { type: "h2"; text: string }[];
  const more = POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);
  const ld = { "@context": "https://schema.org", "@type": "Article", headline: post.title, description: post.description, datePublished: post.date, author: { "@type": "Organization", name: "Converso" } };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className="relative isolate overflow-hidden bg-[#09090b] text-white">
        <div aria-hidden className="hero-light" />
        <div aria-hidden className="hero-grain" />
        <div className="mx-auto w-full max-w-3xl px-6 pb-16 pt-36 md:pb-20">
          <Link href="/blog" className="group hero-in inline-flex items-center gap-1.5 text-sm font-bold text-white/60 transition-colors hover:text-white">
            <ArrowLeft className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5" aria-hidden />All posts
          </Link>
          <div className="hero-in mt-6" style={{ animationDelay: "80ms" }}><Eyebrow icon={Lightbulb}>{post.tag}</Eyebrow></div>
          <h1 className="hero-in mt-5 text-balance text-4xl font-extrabold leading-[1.06] tracking-tight !text-white md:text-6xl" style={{ animationDelay: "160ms" }}>{post.title}</h1>
          <p className="hero-in mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-semibold text-white/55" style={{ animationDelay: "240ms" }}>
            <time dateTime={post.date}>{fmt(post.date)}</time>
            <span className="inline-flex items-center gap-1.5"><Clock className="size-4" aria-hidden />{readingMinutes(post)} min read</span>
            <span>By the Converso team</span>
          </p>
        </div>
      </section>

      <div className="mx-auto -mt-6 w-full max-w-5xl px-6">
        <PostCover post={post} index={index} className="h-48 rounded-3xl md:h-72" />
      </div>

      <section className="bg-white pb-24 pt-14 md:pt-20">
        <div className="mx-auto grid w-full max-w-5xl gap-12 px-6 lg:grid-cols-[200px_1fr]">
          <aside className="hidden lg:block"><PostToc items={toc.map((h) => ({ id: slugify(h.text), text: h.text }))} /></aside>

          <article className="max-w-2xl">
            <p className="text-pretty text-xl font-semibold leading-relaxed text-zinc-800">{post.description}</p>
            <div className="mt-8 space-y-6">
              {post.body.map((b, i) => {
                switch (b.type) {
                  case "h2": return <h2 key={i} id={slugify(b.text)} className="scroll-mt-28 pt-6 text-2xl font-extrabold tracking-tight text-zinc-950 md:text-3xl">{b.text}</h2>;
                  case "p": return <p key={i} className="text-pretty text-lg font-medium leading-[1.75] text-zinc-600">{b.text}</p>;
                  case "ul": return <ul key={i} className="space-y-3 pl-1">{b.items.map((it) => <li key={it} className="flex gap-3 text-pretty text-lg font-medium leading-relaxed text-zinc-600"><span aria-hidden className="mt-3 size-1.5 shrink-0 rounded-full bg-primary" />{it}</li>)}</ul>;
                  case "ol": return <ol key={i} className="space-y-4">{b.items.map((it, n) => <li key={it} className="flex gap-4 text-pretty text-lg font-medium leading-relaxed text-zinc-600"><span aria-hidden className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-primary/10 text-sm font-extrabold tabular-nums text-primary">{n + 1}</span>{it}</li>)}</ol>;
                  case "quote": return <blockquote key={i} className="border-l-4 border-primary pl-5 text-xl font-semibold italic text-zinc-800">{b.text}</blockquote>;
                  case "callout": return (
                    <aside key={i} className="rounded-2xl border border-primary/25 bg-primary/[0.06] p-6">
                      <p className="flex items-center gap-2 font-extrabold text-zinc-950"><Lightbulb className="size-5 text-primary" aria-hidden />{b.title}</p>
                      <p className="mt-2 text-pretty font-medium leading-relaxed text-zinc-700">{b.text}</p>
                    </aside>
                  );
                }
              })}
            </div>
          </article>
        </div>

        <div className="mx-auto mt-20 w-full max-w-5xl px-6">
          <h2 className="text-2xl font-extrabold tracking-tight text-zinc-950">Keep reading</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {more.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex items-start justify-between gap-4 rounded-2xl border border-zinc-200 bg-[#faf7f2] p-6 transition-[transform,border-color] duration-300 ease-[var(--ease-out)] hover:-translate-y-0.5 hover:border-primary/40">
                <div><p className="text-xs font-bold uppercase tracking-[0.12em] text-primary">{p.tag}</p><p className="mt-2 text-balance text-lg font-extrabold leading-snug tracking-tight text-zinc-950">{p.title}</p></div>
                <ArrowUpRight className="mt-1 size-5 shrink-0 text-zinc-400 transition-[transform,color] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand title="Learn this out loud." cta="Start a session" />
    </>
  );
}
