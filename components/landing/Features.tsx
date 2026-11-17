import { BrainCircuit, Gauge, History, LayoutGrid, Mic, NotebookPen, Route } from "lucide-react";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";
import SpotlightCard from "./SpotlightCard";
import PathTile from "./bento/PathTile";
import VoiceTile from "./bento/VoiceTile";
import AnalogyTile from "./bento/AnalogyTile";
import ProgressTile from "./bento/ProgressTile";
import NotesTile from "./bento/NotesTile";
import HistoryTile from "./bento/HistoryTile";

type Tile = { icon: React.ComponentType<{ className?: string }>; title: string; body: string; span: string; pad?: boolean; node: React.ReactNode };

// One frame for every tile: copy on top, the picture on the tile floor. The
// hero (paths) is 2x2; the grid reads left to right as hero, voice/analogy, stat/progress, notes/history.
const TILES: Tile[] = [
  { icon: Route, title: "A path built for you.", body: "Three to five modules, ordered so each one builds on the last.", span: "lg:col-span-2 lg:row-span-2", pad: false, node: <PathTile /> },
  { icon: Mic, title: "Talk it through.", body: "Speak, interrupt, ask again.", span: "", pad: false, node: <VoiceTile /> },
  { icon: BrainCircuit, title: "In your world.", body: "Pick what you love.", span: "", node: <AnalogyTile /> },
  { icon: Gauge, title: "Progress you can see.", body: "Modules tick done as you finish.", span: "", node: <ProgressTile /> },
  { icon: NotebookPen, title: "Notes write themselves.", body: "A summary and the full transcript, saved when you hang up.", span: "md:col-span-2", pad: false, node: <NotesTile /> },
  { icon: History, title: "Every session, kept.", body: "Reopen any lesson and read what was said.", span: "md:col-span-2", pad: false, node: <HistoryTile /> },
];

export default function Features() {
  return (
    <section id="features" className="bg-[#09090b] py-24 text-white md:py-32">
      <div className="mx-auto w-full max-w-7xl px-6">
        <Reveal>
          <Eyebrow icon={LayoutGrid}>Features</Eyebrow>
          <h2 className="mt-5 max-w-3xl text-balance text-4xl font-extrabold leading-[1.05] tracking-tight !text-white md:text-6xl">
            Everything a tutor does, minus the scheduling.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:auto-rows-[340px] lg:grid-cols-4">
          {/* Row 2 stat: a number is a tile */}
          {TILES.slice(0, 3).map((t, i) => <BentoTile key={t.title} t={t} delay={i * 90} />)}
          <Reveal delay={270} className="flex">
            <SpotlightCard className="flex min-h-[340px] w-full flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.03] p-7">
              <p className="text-sm font-bold text-white/55">Every path has</p>
              <p className="whitespace-nowrap text-[5.5rem] font-extrabold leading-none tracking-tighter text-white tabular-nums">3<span className="text-primary">–</span>5</p>
              <p className="text-sm font-semibold text-white/55">short modules you can finish.</p>
            </SpotlightCard>
          </Reveal>
          <BentoTile t={TILES[3]} delay={360} />
          <BentoTile t={TILES[4]} delay={450} />
          <BentoTile t={TILES[5]} delay={540} />
        </div>
      </div>
    </section>
  );
}

function BentoTile({ t, delay }: { t: Tile; delay: number }) {
  const bleed = t.pad === false;
  return (
    <Reveal delay={delay} className={`flex ${t.span}`}>
      <SpotlightCard className={`group flex min-h-[340px] w-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition-[transform,border-color] duration-300 ease-[var(--ease-out)] hover:-translate-y-1 hover:border-primary/40`}>
        <div className="p-7 pb-0">
          <span className="grid size-10 place-items-center rounded-xl bg-primary/15 text-primary transition-transform duration-300 ease-[var(--ease-out)] group-hover:scale-110 group-hover:-rotate-6"><t.icon className="size-5" aria-hidden /></span>
          <h3 className="mt-4 text-[1.35rem] font-extrabold leading-tight tracking-tight !text-white">{t.title}</h3>
          <p className="mt-1.5 max-w-xs text-pretty text-[15px] font-medium leading-snug text-white/60">{t.body}</p>
        </div>
        <div className={`flex flex-1 flex-col ${bleed ? "pt-4" : "p-7 pt-4"}`}>{t.node}</div>
      </SpotlightCard>
    </Reveal>
  );
}
