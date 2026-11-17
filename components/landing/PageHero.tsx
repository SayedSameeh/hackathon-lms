import Eyebrow from "./Eyebrow";

export default function PageHero({ icon, eyebrow, title, sub }: { icon: React.ComponentType<{ className?: string }>; eyebrow: string; title: string; sub: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-[#09090b] text-white">
      <div aria-hidden className="hero-light" />
      <div aria-hidden className="hero-grain" />
      <div className="mx-auto w-full max-w-7xl px-6 pb-20 pt-40 md:pb-28">
        <div className="hero-in"><Eyebrow icon={icon}>{eyebrow}</Eyebrow></div>
        <h1 className="hero-in mt-6 max-w-4xl text-balance text-5xl font-extrabold leading-[1.04] tracking-tight !text-white md:text-7xl" style={{ animationDelay: "100ms" }}>{title}</h1>
        <p className="hero-in mt-6 max-w-2xl text-pretty text-lg font-medium leading-relaxed text-white/60 md:text-xl" style={{ animationDelay: "220ms" }}>{sub}</p>
      </div>
    </section>
  );
}
