import type { Metadata } from "next";
import { BrainCircuit, Code2, Heart, Mic, Target, Users } from "lucide-react";
import PageHero from "@/components/landing/PageHero";
import Reveal from "@/components/landing/Reveal";
import CtaBand from "@/components/landing/CtaBand";

export const metadata: Metadata = { title: "About · Converso", description: "Why we built Converso, a voice tutor that teaches through what you love." };

const BELIEFS = [
  { icon: Target, title: "Start from the student", body: "A path should be built around what you want to learn, not around a fixed syllabus." },
  { icon: BrainCircuit, title: "Use what they already know", body: "A new idea sticks when it hangs on something familiar. That is what analogies are for." },
  { icon: Mic, title: "Learning is a conversation", body: "Talking out loud shows what you understand and what you do not. Silence hides both." },
  { icon: Heart, title: "Keep it light", body: "Short modules, no streak guilt. Come back when you are curious." },
];
const STACK = ["Next.js", "React", "TypeScript", "Supabase", "Clerk", "Vapi", "Groq", "Sentry", "Tailwind CSS"];

export default function AboutPage() {
  return (
    <>
      <PageHero icon={Users} eyebrow="About" title="We think learning should sound like a conversation." sub="Converso began as a hackathon project: an AI tutor that explains new skills in the language of whatever you already love." />
      <section className="bg-[#faf7f2] py-24 md:py-32">
        <div className="mx-auto grid w-full max-w-7xl gap-5 px-6 md:grid-cols-2">
          {BELIEFS.map((b, i) => (
            <Reveal key={b.title} delay={(i % 2) * 90} className="flex">
              <article className="group w-full rounded-3xl border border-zinc-200 bg-white p-8 transition-[transform,border-color] duration-300 ease-[var(--ease-out)] hover:-translate-y-1 hover:border-primary/40">
                <span className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 ease-[var(--ease-out)] group-hover:scale-110 group-hover:-rotate-6"><b.icon className="size-6" aria-hidden /></span>
                <h2 className="mt-6 text-2xl font-extrabold tracking-tight text-zinc-950">{b.title}</h2>
                <p className="mt-2 text-pretty font-medium leading-relaxed text-zinc-600">{b.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="bg-white py-24">
        <Reveal className="mx-auto w-full max-w-4xl px-6">
          <h2 className="flex items-center gap-3 text-3xl font-extrabold tracking-tight text-zinc-950 md:text-4xl"><Code2 className="size-8 text-primary" aria-hidden />How it is built</h2>
          <p className="mt-5 max-w-2xl text-pretty text-lg font-medium leading-relaxed text-zinc-600">
            Converso extends the open-source <a className="font-bold text-primary underline-offset-4 hover:underline" href="https://github.com/adrianhajdin/saas-app" target="_blank" rel="noreferrer">saas-app</a> by Adrian Hajdin (JavaScript Mastery) with generated learning paths, interest-based analogies and automatic session notes.
          </p>
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {STACK.map((s) => <li key={s} className="rounded-full border border-zinc-200 bg-[#faf7f2] px-4 py-2 text-sm font-bold text-zinc-700 transition-colors duration-200 hover:border-primary/50">{s}</li>)}
          </ul>
        </Reveal>
      </section>
      <CtaBand title="See it for yourself." />
    </>
  );
}
