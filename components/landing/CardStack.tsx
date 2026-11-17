"use client";

import { useRef, useState } from "react";
import { ArrowRight, CheckCircle2, MoveHorizontal } from "lucide-react";

export type StackCard = { tag: string; title: string; points: string[] };

// A deck: drag the top card sideways (or press Next) to send it to the back.
// Pure transforms + opacity, pointer events with capture, keyboard via button.
export default function CardStack({ cards }: { cards: StackCard[] }) {
  const [order, setOrder] = useState(() => cards.map((_, i) => i));
  const [dx, setDx] = useState(0);
  const [drag, setDrag] = useState(false);
  const startX = useRef(0);

  const next = () => setOrder((o) => [...o.slice(1), o[0]]);

  return (
    <div className="mx-auto w-full max-w-md">
      <div
        className="relative h-[360px] select-none"
        role="group"
        aria-roledescription="card stack"
        aria-label="Sample session notes"
        onKeyDown={(e) => (e.key === "ArrowRight" || e.key === "ArrowLeft") && next()}
      >
        {order.map((cardIdx, pos) => {
          const c = cards[cardIdx];
          const top = pos === 0;
          const depth = Math.min(pos, 3);
          const style: React.CSSProperties = top
            ? { transform: `translateX(${dx}px) rotate(${dx / 18}deg)`, transition: drag ? "none" : "transform 0.45s var(--ease-out)" }
            : { transform: `translateY(${depth * 16}px) scale(${1 - depth * 0.05})`, opacity: pos > 3 ? 0 : 1 - (depth - 1) * 0.12, transition: "transform 0.45s var(--ease-out), opacity 0.45s var(--ease-out)" };
          return (
            <article
              key={cardIdx}
              aria-hidden={!top}
              className={`absolute inset-x-0 top-0 flex h-[320px] flex-col rounded-3xl border border-zinc-200 bg-white p-7 shadow-[0_24px_50px_-28px_rgb(9_9_11/0.4)] ${top ? "cursor-grab touch-pan-y active:cursor-grabbing" : "pointer-events-none"}`}
              style={{ ...style, zIndex: cards.length - pos, transformOrigin: "50% 100%" }}
              onPointerDown={top ? (e) => { startX.current = e.clientX - dx; setDrag(true); e.currentTarget.setPointerCapture(e.pointerId); } : undefined}
              onPointerMove={top && drag ? (e) => setDx(e.clientX - startX.current) : undefined}
              onPointerUp={top ? () => { setDrag(false); if (Math.abs(dx) > 90) next(); setDx(0); } : undefined}
              onPointerCancel={top ? () => { setDrag(false); setDx(0); } : undefined}
            >
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">{c.tag}</p>
              <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-zinc-950">{c.title}</h3>
              <ul className="mt-5 space-y-3">
                {c.points.map((p) => (
                  <li key={p} className="flex gap-3 text-pretty font-medium leading-snug text-zinc-600">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-500" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
              <p className="mt-auto flex items-center gap-2 pt-4 text-xs font-bold text-zinc-400"><MoveHorizontal className="size-4" aria-hidden />Drag to see the next note</p>
            </article>
          );
        })}
      </div>
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm font-semibold tabular-nums text-zinc-500" aria-live="polite">Note {cards.findIndex((_, i) => i === order[0]) + 1} of {cards.length}</p>
        <button type="button" onClick={next} className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-zinc-950 px-5 text-sm font-bold text-white transition-[background-color,transform] duration-200 hover:bg-zinc-800 active:scale-95">
          Next note
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
        </button>
      </div>
    </div>
  );
}
