import { Check, FileText, Flag, Mic, Route, WandSparkles } from "lucide-react";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";
import TryIt from "./TryIt";

const STEPS = [
  {
    icon: Flag,
    title: "Name a skill and something you love",
    body: "Type “React” and “Formula 1”. Converso asks for nothing else.",
    visual: (
      <div className="space-y-2.5">
        <Field label="I want to learn" value="React hooks" />
        <Field label="Explain it through" value="Formula 1" />
        <div className="rounded-lg bg-primary px-3 py-2 text-center text-sm font-bold text-white">Build my path</div>
      </div>
    ),
  },
  {
    icon: Mic,
    title: "Talk through each module",
    body: "A short voice session per module, with analogies from your world and questions that check you were listening.",
    visual: (
      <div className="space-y-2 text-sm font-medium">
        <p className="ml-8 rounded-xl rounded-br-sm bg-zinc-900 px-3 py-2 text-white">Why does it re-render?</p>
        <p className="mr-8 rounded-xl rounded-bl-sm bg-zinc-100 px-3 py-2 text-zinc-800">Like the pit-wall screen: new tyre reading, new redraw.</p>
        <div className="flex h-6 items-end gap-1" aria-hidden>
          {[40, 80, 55, 100, 65, 30, 75, 45, 90, 50].map((h, i) => (
            <span key={i} className="float w-1.5 rounded-full bg-primary" style={{ height: `${h}%`, animationDelay: `${i * 120}ms` }} />
          ))}
        </div>
      </div>
    ),
  },
  {
    icon: FileText,
    title: "Hang up. Your notes are written",
    body: "The module ticks done and a summary with the full transcript is saved to your path.",
    visual: (
      <ul className="space-y-2 text-sm font-semibold text-zinc-800">
        {["Components as car parts", "State and re-renders", "Effects and side effects"].map((m, i) => (
          <li key={m} className="flex items-center gap-2.5 rounded-lg border border-zinc-200 px-3 py-2">
            <span className={`grid size-5 place-items-center rounded-full ${i < 2 ? "bg-emerald-500 text-white" : "border border-zinc-300"}`}>
              {i < 2 && <Check className="size-3" aria-hidden />}
            </span>
            {m}
          </li>
        ))}
      </ul>
    ),
  },
];

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-zinc-200 px-3 py-2">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-400">{label}</p>
      <p className="text-sm font-bold text-zinc-900">{value}</p>
    </div>
  );
}

export default function Solution() {
  return (
    <section id="solution" className="bg-white py-24 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-6">
        <Reveal>
          <Eyebrow icon={Route}>How it works</Eyebrow>
          <h2 className="mt-5 max-w-3xl text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-zinc-950 md:text-6xl">
            A path built for you, taught out&nbsp;loud.
          </h2>
        </Reveal>
        <ol className="mt-16 grid gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className="flex">
              <Reveal delay={i * 100} className="flex w-full">
                <div className="group flex w-full flex-col rounded-3xl border border-zinc-200 bg-[#faf7f2] p-6 transition-[transform,border-color] duration-300 ease-[var(--ease-out)] hover:-translate-y-1 hover:border-primary/40">
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-full bg-zinc-950 text-sm font-bold text-white tabular-nums">{i + 1}</span>
                    <s.icon className="size-5 text-primary transition-transform duration-300 ease-[var(--ease-out)] group-hover:scale-125" aria-hidden />
                  </div>
                  <h3 className="mt-6 text-2xl font-extrabold leading-tight tracking-tight text-zinc-950">{s.title}</h3>
                  <p className="mt-3 text-pretty font-medium leading-relaxed text-zinc-600">{s.body}</p>
                  <div className="mt-8 flex-1 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">{s.visual}</div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mt-24">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow icon={WandSparkles}>Try it</Eyebrow>
              <h3 className="mt-4 text-balance text-3xl font-extrabold tracking-tight text-zinc-950 md:text-4xl">Pick a skill. Pick what you love.</h3>
            </div>
            <p className="max-w-xs text-pretty font-medium text-zinc-500">A preview of the first analogy your coach would give you.</p>
          </div>
          <TryIt />
        </Reveal>
      </div>
    </section>
  );
}
