import type { Metadata } from "next";
import { BrainCircuit, Check, LayoutGrid, Mic, NotebookPen, Route } from "lucide-react";
import PageHero from "@/components/landing/PageHero";
import Reveal from "@/components/landing/Reveal";
import Eyebrow from "@/components/landing/Eyebrow";
import Features from "@/components/landing/Features";
import CtaBand from "@/components/landing/CtaBand";

export const metadata: Metadata = { title: "Features · Converso", description: "Learning paths, voice sessions, interest-based analogies and auto-written notes." };

const DEEP = [
  { icon: Route, eyebrow: "Learning paths", title: "A syllabus that fits one student.", body: "Name a skill and Converso builds three to five modules, each with a topic and a duration, in an order where every module builds on the last.", points: ["Generated from your skill and interest", "Modules tick done as you finish", "Your dashboard opens on your latest path"] },
  { icon: Mic, eyebrow: "Voice sessions", title: "Talk it through, don’t watch it.", body: "Each module is a short live conversation. Interrupt, ask again, get quizzed. The coach listens instead of lecturing.", points: ["Real-time, in the browser", "Questions that check understanding", "Ends when you hang up"] },
  { icon: BrainCircuit, eyebrow: "Analogies", title: "Explained in your world.", body: "Tell the coach what you love. State becomes tyre telemetry, loops become kneading, pacing becomes a third act.", points: ["Formula 1, baking, Marvel, football…", "Change interest by starting a new path", "Same lesson, a different way in"] },
  { icon: NotebookPen, eyebrow: "Session notes", title: "Notes you didn’t have to take.", body: "When the call ends, the module is marked complete and a Markdown summary is saved, followed by the full transcript.", points: ["Summary of what was covered", "Full transcript attached", "Reopen any past lesson"] },
];

export default function FeaturesPage() {
  return (
    <>
      <PageHero icon={LayoutGrid} eyebrow="Features" title="Everything a tutor does, in one voice call." sub="Four things work together: a path, a conversation, an analogy and a set of notes." />
      <section className="bg-[#faf7f2] py-24 md:py-32">
        <div className="mx-auto w-full max-w-7xl space-y-24 px-6 md:space-y-32">
          {DEEP.map((d, i) => (
            <Reveal key={d.title}>
              <div className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-20 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <div>
                  <Eyebrow icon={d.icon}>{d.eyebrow}</Eyebrow>
                  <h2 className="mt-5 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-zinc-950 md:text-5xl">{d.title}</h2>
                  <p className="mt-5 max-w-lg text-pretty text-lg font-medium leading-relaxed text-zinc-600">{d.body}</p>
                </div>
                <ul className="space-y-3 rounded-3xl border border-zinc-200 bg-white p-6 md:p-8">
                  {d.points.map((p) => (
                    <li key={p} className="flex items-center gap-3 rounded-xl bg-[#faf7f2] px-4 py-3.5 font-semibold text-zinc-800 transition-transform duration-200 ease-[var(--ease-out)] hover:translate-x-1">
                      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-emerald-500 text-white"><Check className="size-3.5" aria-hidden /></span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <Features />
      <CtaBand />
    </>
  );
}
