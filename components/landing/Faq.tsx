import { CircleHelp, Gauge, Mic, NotebookPen, Plus, RefreshCw, Route } from "lucide-react";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";

const FAQ = [
  { icon: Route, q: "How does Converso build my learning path?", a: "You enter a skill and an interest. Converso generates three to five modules for that skill, each with a topic and a duration, and saves them as your path." },
  { icon: Mic, q: "Do I need a microphone?", a: "Yes. Lessons are voice conversations in the browser, so you need a microphone and permission to use it." },
  { icon: NotebookPen, q: "What are the session notes?", a: "When you end a session, the module is marked complete and a Markdown summary of what was covered is saved, followed by the full transcript." },
  { icon: RefreshCw, q: "Can I change the interest later?", a: "Yes. Start a new path with a different interest and the tutor switches its analogies. Your earlier paths stay in your dashboard." },
  { icon: Gauge, q: "What happens when I reach my plan’s limit?", a: "You keep every path and note you already have. To build more paths, move to a plan with a higher limit." },
];

export default function Faq() {
  return (
    <section id="faq" className="bg-white py-24 md:py-32">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow icon={CircleHelp}>FAQ</Eyebrow>
          <h2 className="mt-5 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-zinc-950 md:text-6xl">Questions, answered.</h2>
        </Reveal>
        <div className="space-y-3">
          {FAQ.map((f, i) => (
            <Reveal key={f.q} delay={i * 60}>
              <details className="group rounded-2xl border border-zinc-200 bg-[#faf7f2] px-6 py-5 transition-colors duration-200 open:border-primary/40 open:bg-white hover:border-zinc-300">
                <summary className="flex cursor-pointer list-none items-center gap-4 text-lg font-extrabold tracking-tight text-zinc-950 marker:hidden [&::-webkit-details-marker]:hidden">
                  <f.icon className="size-5 shrink-0 text-primary" aria-hidden />
                  <span className="flex-1">{f.q}</span>
                  <Plus className="size-5 shrink-0 text-zinc-400 transition-transform duration-300 ease-[var(--ease-out)] group-open:rotate-45 group-open:text-primary" aria-hidden />
                </summary>
                <p className="faq-body mt-4 max-w-2xl text-pretty pl-9 font-medium leading-relaxed text-zinc-600">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
