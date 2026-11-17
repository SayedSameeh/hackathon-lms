import { AlertTriangle, CloudOff, MessageCircleOff, Shuffle } from "lucide-react";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";

const POINTS = [
  { icon: Shuffle, title: "Syllabi teach in the wrong order", body: "A course is written for the average student. You are not the average student, so half of it lands before you are ready and half is review." },
  { icon: MessageCircleOff, title: "Video courses never talk back", body: "You can pause a four-hour tutorial. You cannot ask it what it meant. Questions pile up and the momentum is gone." },
  { icon: CloudOff, title: "Nothing is left when you close the tab", body: "Without notes written for you, an hour of learning is mostly forgotten by the next morning." },
];

export default function Problem() {
  return (
    <section id="problem" className="bg-[#faf7f2] py-24 md:py-32">
      <div className="mx-auto grid w-full max-w-7xl gap-14 px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow icon={AlertTriangle}>The problem</Eyebrow>
          <h2 className="mt-5 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-zinc-950 md:text-6xl">
            Most learning is built for someone else.
          </h2>
          <p className="mt-6 max-w-md text-pretty text-lg font-medium leading-relaxed text-zinc-600">
            Fixed syllabi, silent videos and blank notebooks. Students finish with a certificate and a gap where the understanding should be.
          </p>
        </Reveal>
        <ol className="space-y-4">
          {POINTS.map((p, i) => (
            <li key={p.title}>
              <Reveal delay={i * 90}>
                <div className="group flex gap-5 rounded-3xl border border-zinc-900/10 bg-white p-7 transition-[transform,border-color,box-shadow] duration-300 ease-[var(--ease-out)] hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_18px_40px_-24px_rgb(254_89_51/0.5)]">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 ease-[var(--ease-out)] group-hover:scale-110 group-hover:-rotate-6">
                    <p.icon className="size-6" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-2xl font-extrabold tracking-tight text-zinc-950">{p.title}</h3>
                    <p className="mt-2 max-w-lg text-pretty font-medium leading-relaxed text-zinc-600">{p.body}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
