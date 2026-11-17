import Link from "next/link";
import { ArrowRight, Check, Crown, Sprout, Tag, Zap } from "lucide-react";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";

// Plan names and limits mirror the Clerk Billing features read in
// lib/actions/companion.actions.ts (3 / 10 / unlimited). Prices are launch
// placeholders: keep them in step with the plans configured in Clerk.
const PLANS = [
  { name: "Basic", icon: Sprout, price: "$0", note: "free forever", cta: "Start free", featured: false, items: ["3 learning paths", "Voice sessions with analogies", "Auto-written session notes", "Full session history"] },
  { name: "Core", icon: Zap, price: "$9", note: "per month", cta: "Choose Core", featured: true, items: ["10 learning paths", "Everything in Basic"] },
  { name: "Pro", icon: Crown, price: "$19", note: "per month", cta: "Choose Pro", featured: false, items: ["Unlimited learning paths", "Everything in Basic"] },
];

export default function Pricing({ bare = false }: { bare?: boolean }) {
  return (
    <section id="pricing" className="bg-[#faf7f2] py-24 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-6">
        {!bare && (
          <Reveal>
            <Eyebrow icon={Tag}>Pricing</Eyebrow>
            <h2 className="mt-5 max-w-3xl text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-zinc-950 md:text-6xl">
              Start free. Pay when you need more paths.
            </h2>
          </Reveal>
        )}
        <div className={`${bare ? "" : "mt-16 "}grid items-stretch gap-5 md:grid-cols-3`}>
          {PLANS.map((p, i) => (
            <Reveal key={p.name} delay={i * 100} className="flex">
              <article className={`group relative flex w-full flex-col rounded-3xl border p-8 transition-[transform,box-shadow] duration-300 ease-[var(--ease-out)] hover:-translate-y-1.5 ${p.featured ? "border-zinc-950 bg-zinc-950 text-white hover:shadow-[0_30px_60px_-30px_rgb(254_89_51/0.55)]" : "border-zinc-200 bg-white text-zinc-950 hover:shadow-[0_24px_50px_-30px_rgb(9_9_11/0.35)]"}`}>
                {p.featured && <span className="absolute right-6 top-6 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">Recommended</span>}
                <h3 className={`flex items-center gap-2.5 text-lg font-extrabold ${p.featured ? "!text-white" : ""}`}>
                  <span className={`grid size-9 place-items-center rounded-xl ${p.featured ? "bg-white/10" : "bg-primary/10"} text-primary`}><p.icon className="size-5" aria-hidden /></span>
                  {p.name}
                </h3>
                <p className="mt-6 flex items-baseline gap-2">
                  <span className="text-6xl font-extrabold tracking-tight tabular-nums">{p.price}</span>
                  <span className={`text-sm font-semibold ${p.featured ? "text-white/60" : "text-zinc-500"}`}>{p.note}</span>
                </p>
                <ul className="mt-8 flex-1 space-y-3.5">
                  {p.items.map((it) => (
                    <li key={it} className="flex items-start gap-3 font-medium">
                      <Check className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                      {it}
                    </li>
                  ))}
                </ul>
                <Link href="/sign-up" className={`btn-shine mt-10 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-bold transition-[background-color,transform] duration-200 active:scale-[0.97] ${p.featured ? "bg-primary text-white hover:bg-primary/90" : "bg-zinc-950 text-white hover:bg-zinc-800"}`}>
                  {p.cta}
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
