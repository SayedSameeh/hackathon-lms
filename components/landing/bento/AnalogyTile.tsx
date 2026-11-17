"use client";

import { useState } from "react";
import { Car, ChefHat, Shield, Trophy } from "lucide-react";

const OPTIONS = [
  { id: "f1", label: "Formula 1", icon: Car, say: "A variable is the pit board: one slot holding the number the driver needs right now." },
  { id: "bake", label: "Baking", icon: ChefHat, say: "A variable is a labelled jar: flour today, sugar tomorrow, same jar." },
  { id: "marvel", label: "Marvel", icon: Shield, say: "A variable is a stone socket: the slot stays, what sits in it can change." },
  { id: "foot", label: "Football", icon: Trophy, say: "A variable is the score on the board: same slot, a new number each goal." },
];

// The one tile you can play with: hover or press a chip and the coach rephrases.
export default function AnalogyTile() {
  const [id, setId] = useState("f1");
  const cur = OPTIONS.find((o) => o.id === id)!;
  return (
    <div className="mt-auto">
      <div role="group" aria-label="Pick an interest" className="flex flex-wrap gap-2">
        {OPTIONS.map((o) => {
          const on = o.id === id;
          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={on}
              onClick={() => setId(o.id)}
              onPointerEnter={(e) => e.pointerType === "mouse" && setId(o.id)}
              className={`inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3 text-xs font-bold transition-[background-color,border-color,color,transform] duration-200 active:scale-95 ${on ? "border-primary bg-primary text-white" : "border-white/15 text-white/70 hover:border-white/40"}`}
            >
              <o.icon className="size-3.5" aria-hidden />
              {o.label}
            </button>
          );
        })}
      </div>
      <p key={id} aria-live="polite" className="page-in mt-3 min-h-[84px] rounded-2xl rounded-tl-md bg-white/[0.07] p-3.5 text-[13px] font-medium leading-relaxed text-white/85">
        {cur.say}
      </p>
    </div>
  );
}
