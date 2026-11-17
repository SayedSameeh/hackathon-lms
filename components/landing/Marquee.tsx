import { Camera, Car, ChefHat, Crown, Gamepad2, Music, Rocket, Shield, Trophy } from "lucide-react";

const ITEMS = [
  { icon: Car, label: "Formula 1" },
  { icon: ChefHat, label: "Baking" },
  { icon: Shield, label: "Marvel" },
  { icon: Trophy, label: "Football" },
  { icon: Crown, label: "Chess" },
  { icon: Gamepad2, label: "Minecraft" },
  { icon: Music, label: "Music" },
  { icon: Camera, label: "Photography" },
  { icon: Rocket, label: "Space" },
];

export default function Marquee() {
  return (
    <section aria-label="Interests Converso teaches through" className="border-y border-white/10 bg-[#09090b] py-6 text-white">
      <p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.16em] text-white/40">Explained through what you love</p>
      <div className="marquee-wrap marquee-mask overflow-hidden">
        <ul className="marquee" aria-hidden={false}>
          {[...ITEMS, ...ITEMS].map((it, i) => (
            <li key={i} aria-hidden={i >= ITEMS.length} className="mx-3 flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-bold text-white/75 transition-colors duration-200 hover:border-primary/50 hover:text-white">
              <it.icon className="size-4 text-primary" aria-hidden />
              {it.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
