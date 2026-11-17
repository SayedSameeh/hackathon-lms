import type { Metadata } from "next";
import { Check, Tag } from "lucide-react";
import PageHero from "@/components/landing/PageHero";
import Pricing from "@/components/landing/Pricing";
import Faq from "@/components/landing/Faq";
import CtaBand from "@/components/landing/CtaBand";

export const metadata: Metadata = { title: "Pricing · Converso", description: "Start free with 3 learning paths. Move up when you need 10 or unlimited." };

const ROWS = [
  ["Learning paths", "3", "10", "Unlimited"],
  ["Voice sessions", true, true, true],
  ["Analogies from your interest", true, true, true],
  ["Auto-written session notes", true, true, true],
  ["Session history", true, true, true],
] as const;

export default function PricingPage() {
  return (
    <>
      <PageHero icon={Tag} eyebrow="Pricing" title="Pay for paths, not for time." sub="Every plan includes voice sessions, analogies and notes. The plans differ in how many learning paths you can build." />
      <Pricing bare />
      <section aria-labelledby="compare" className="bg-white py-24">
        <div className="mx-auto w-full max-w-4xl px-6">
          <h2 id="compare" className="text-3xl font-extrabold tracking-tight text-zinc-950 md:text-4xl">Compare plans</h2>
          <div className="mt-10 overflow-x-auto rounded-3xl border border-zinc-200">
            <table className="w-full min-w-[560px] text-left">
              <caption className="sr-only">What each plan includes</caption>
              <thead className="bg-zinc-50 text-sm font-bold text-zinc-500">
                <tr><th scope="col" className="px-6 py-4">Feature</th>{["Basic", "Core", "Pro"].map((n) => <th key={n} scope="col" className="px-6 py-4 text-center">{n}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 font-semibold text-zinc-800">
                {ROWS.map(([label, ...cells]) => (
                  <tr key={label} className="transition-colors duration-200 hover:bg-[#faf7f2]">
                    <th scope="row" className="px-6 py-4 font-semibold">{label}</th>
                    {cells.map((c, i) => (
                      <td key={i} className="px-6 py-4 text-center tabular-nums">
                        {c === true ? <Check className="mx-auto size-5 text-emerald-500" aria-label="Included" /> : c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <Faq />
      <CtaBand />
    </>
  );
}
