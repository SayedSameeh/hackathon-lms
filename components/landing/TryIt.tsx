"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Camera, Car, CheckCircle2, ChefHat, Circle, Code2, Mic, Presentation, Shield, Trophy } from "lucide-react";

// A canned preview of what the real flow does: pick a skill and an interest,
// get a path and a first analogy. Nothing here calls the API.
const SKILLS = [
  { id: "react", label: "React", icon: Code2, modules: ["Components as parts", "State & re-renders", "Effects & side effects"], now: 1 },
  { id: "python", label: "Python", icon: Code2, modules: ["Variables & types", "Loops & conditions", "Functions"], now: 1 },
  { id: "photo", label: "Photography", icon: Camera, modules: ["Light & exposure", "Composition", "Editing basics"], now: 0 },
  { id: "speak", label: "Public speaking", icon: Presentation, modules: ["Opening strong", "Voice & pacing", "Handling questions"], now: 1 },
] as const;

const INTERESTS = [
  { id: "f1", label: "Formula 1", icon: Car },
  { id: "bake", label: "Baking", icon: ChefHat },
  { id: "marvel", label: "Marvel", icon: Shield },
  { id: "foot", label: "Football", icon: Trophy },
] as const;

const SAY: Record<string, Record<string, string>> = {
  react: {
    f1: "State is the live telemetry. When the tyre temperature changes, the pit-wall screen redraws. That redraw is a re-render.",
    bake: "State is the dough. When it rises, you reshape the loaf. That reshaping is a re-render.",
    marvel: "State is the suit's status. When the arc reactor drops, the HUD redraws. That redraw is a re-render.",
    foot: "State is the scoreboard. When a goal goes in, the board updates. That update is a re-render.",
  },
  python: {
    f1: "A loop is a lap. Same circuit, repeated, until the counter hits the race distance.",
    bake: "A loop is kneading. Same fold, repeated, until the dough is smooth.",
    marvel: "A loop is Doctor Strange's bargain. Same moment, repeated, until the exit condition is met.",
    foot: "A loop is a drill. Same pass, repeated, until the coach calls stop.",
  },
  photo: {
    f1: "Exposure is shutter speed. Fast freezes the car mid-corner, slow turns it into a streak.",
    bake: "Exposure is oven time. Short keeps it pale, long browns the crust.",
    marvel: "Exposure is the lighting on a hero shot. Too bright and the highlights burn out, too dark and the suit vanishes.",
    foot: "Exposure is the floodlights. Too dim and the ball disappears, too bright and the white kit burns out.",
  },
  speak: {
    f1: "Pacing is tyre management. Push every sentence and the talk fades. Save energy for the final stint.",
    bake: "Pacing is proving time. Rush it and the loaf is flat. Pause, and the room rises with you.",
    marvel: "Pacing is the third act. Hold the big reveal until the room is leaning in.",
    foot: "Pacing is the match. Control the ball early, then build to the final push.",
  },
};

export default function TryIt() {
  const [skill, setSkill] = useState<(typeof SKILLS)[number]["id"]>("react");
  const [interest, setInterest] = useState<(typeof INTERESTS)[number]["id"]>("f1");
  const [typed, setTyped] = useState("");

  const s = SKILLS.find((x) => x.id === skill)!;
  const i = INTERESTS.find((x) => x.id === interest)!;
  const line = SAY[skill][interest];

  // Types the tutor line word by word; a new pick cancels the old run.
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return setTyped(line);
    const words = line.split(" ");
    let n = 0;
    setTyped("");
    const t = setInterval(() => {
      n += 1;
      setTyped(words.slice(0, n).join(" "));
      if (n >= words.length) clearInterval(t);
    }, 55);
    return () => clearInterval(t);
  }, [line]);

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_1.15fr]">
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 md:p-8">
        <Group label="I want to learn" items={SKILLS} value={skill} onPick={setSkill} />
        <div className="h-7" />
        <Group label="Explain it through" items={INTERESTS} value={interest} onPick={setInterest} />
        <Link href="/sign-up" className="btn-primary btn-shine mt-9 w-full py-3.5 text-base">
          Build my own path
          <ArrowRight className="ml-2 size-5" aria-hidden />
        </Link>
      </div>

      <div className="overflow-hidden rounded-3xl bg-[#09090b] text-white shadow-[0_30px_60px_-30px_rgb(9_9_11/0.6)]">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <p className="flex items-center gap-2 text-sm font-bold text-white/70">
            <span className="relative flex size-2"><span className="pulse-dot absolute inset-0 rounded-full bg-primary" /></span>
            Your path · {s.label}, through {i.label}
          </p>
          <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-xs font-bold text-white/50">Preview</span>
        </div>
        <ol className="space-y-2 px-6 pt-5">
          {s.modules.map((m, idx) => {
            const done = idx < s.now;
            const now = idx === s.now;
            return (
              <li key={m} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors duration-300 ${now ? "bg-white/10 text-white" : "text-white/50"}`}>
                {done ? <CheckCircle2 className="size-5 text-emerald-400" aria-hidden /> : now ? <Mic className="size-5 text-primary" aria-hidden /> : <Circle className="size-5" aria-hidden />}
                {m}
                {now && <span className="ml-auto text-xs font-bold text-primary">In session</span>}
              </li>
            );
          })}
        </ol>
        <div className="m-6 min-h-[132px] rounded-2xl bg-white/[0.06] p-5">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">Coach says</p>
          <p className="sr-only" aria-live="polite">{line}</p>
          <p aria-hidden className="text-lg font-medium leading-relaxed text-white/90">{typed}<span className="ml-0.5 inline-block h-5 w-0.5 translate-y-1 bg-primary" /></p>
        </div>
      </div>
    </div>
  );
}

function Group<T extends { id: string; label: string; icon: React.ComponentType<{ className?: string }> }>({ label, items, value, onPick }: { label: string; items: readonly T[]; value: string; onPick: (id: T["id"]) => void }) {
  return (
    <fieldset>
      <legend className="text-sm font-bold uppercase tracking-[0.12em] text-zinc-400">{label}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((it) => {
          const on = it.id === value;
          return (
            <button
              key={it.id}
              type="button"
              aria-pressed={on}
              onClick={() => onPick(it.id)}
              className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-bold transition-[background-color,border-color,color,transform] duration-200 active:scale-95 ${on ? "border-zinc-950 bg-zinc-950 text-white" : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400"}`}
            >
              <it.icon className="size-4" aria-hidden />
              {it.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
