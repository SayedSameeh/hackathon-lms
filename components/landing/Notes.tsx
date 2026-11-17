import { NotebookPen } from "lucide-react";
import CardStack from "./CardStack";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";

const CARDS = [
  { tag: "React · through Formula 1", title: "State & re-renders", points: ["State is the live reading; a change redraws the screen.", "A redraw is a re-render, and it happens on every state change.", "Keep state small so the pit wall redraws less."] },
  { tag: "Python · through Baking", title: "Loops & conditions", points: ["A loop repeats a step until a condition is met.", "for walks a known list; while waits for a signal.", "Every loop needs a way out, like a timer on the oven."] },
  { tag: "Photography · through Football", title: "Light & exposure", points: ["Exposure is how much light reaches the sensor.", "Shutter speed freezes or streaks the motion.", "Floodlights change the settings you need."] },
  { tag: "Public speaking · through Marvel", title: "Voice & pacing", points: ["Slow down before the point that matters.", "A pause lands harder than a louder voice.", "Build to the reveal like a third act."] },
];

export default function Notes() {
  return (
    <section id="notes" className="overflow-hidden bg-white py-24 md:py-32">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <Reveal>
          <Eyebrow icon={NotebookPen}>Your notes</Eyebrow>
          <h2 className="mt-5 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-zinc-950 md:text-6xl">
            Hang up. A summary is already waiting.
          </h2>
          <p className="mt-6 max-w-md text-pretty text-lg font-medium leading-relaxed text-zinc-600">
            Every session ends with a short Markdown summary and the full transcript, saved to the module. Flick through a few samples.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <CardStack cards={CARDS} />
        </Reveal>
      </div>
    </section>
  );
}
