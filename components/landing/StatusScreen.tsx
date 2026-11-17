import Link from "next/link";
import { BookOpen, Compass, LayoutDashboard, LayoutGrid, Mail, Tag } from "lucide-react";
import { Logo } from "./Logo";

export const QUICK_LINKS = [
  { href: "/features", label: "Features", icon: LayoutGrid },
  { href: "/pricing", label: "Pricing", icon: Tag },
  { href: "/blog", label: "Blog", icon: BookOpen },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/contact", label: "Contact", icon: Mail },
];

/** The big code: "4 (orb) 4" for 404, plain digits elsewhere. */
export function Code({ digits, orb = false }: { digits: string; orb?: boolean }) {
  const chars = digits.split("");
  return (
    <p aria-hidden className="float flex select-none items-center justify-center font-extrabold leading-none tracking-tighter" style={{ fontSize: "clamp(6.5rem, 26vw, 17rem)" }}>
      {chars.map((c, i) =>
        orb && i === 1 ? (
          <span key={i} className="eq-orb mx-[0.04em]" style={{ width: "0.74em", height: "0.74em", fontSize: "1em" }}><i /><i /><i /><i /><i /></span>
        ) : (
          <span key={i} className="bg-gradient-to-b from-white to-white/15 bg-clip-text text-transparent">{c}</span>
        ),
      )}
    </p>
  );
}

export default function StatusScreen({ code, title, body, actions, note, showLinks = true }: { code: React.ReactNode; title: string; body: string; actions: React.ReactNode; note?: React.ReactNode; showLinks?: boolean }) {
  return (
    <main className="!m-0 !h-auto !max-w-none !gap-0 !pb-0 relative isolate flex min-h-dvh flex-col overflow-hidden bg-[#09090b] text-white">
      <div aria-hidden className="hero-light" />
      <div aria-hidden className="hero-grain" />
      <div aria-hidden className="grid-bg absolute inset-0 -z-10" />
      <header className="mx-auto flex w-full max-w-7xl items-center px-6 py-6"><Logo /></header>

      <div className="flex flex-1 flex-col items-center justify-center px-6 pb-10 text-center">
        <div className="hero-in">{code}</div>
        <h1 className="hero-in mt-4 max-w-2xl text-balance text-3xl font-extrabold leading-tight tracking-tight !text-white md:text-5xl" style={{ animationDelay: "120ms" }}>{title}</h1>
        <p className="hero-in mt-4 max-w-md text-pretty text-lg font-medium leading-relaxed text-white/60" style={{ animationDelay: "220ms" }}>{body}</p>
        <div className="hero-in mt-8 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "320ms" }}>{actions}</div>
        {note && <p className="hero-in mt-6 font-mono text-xs text-white/35" style={{ animationDelay: "380ms" }}>{note}</p>}
      </div>

      {showLinks && (
        <nav aria-label="Pages you might want" className="hero-in mx-auto w-full max-w-3xl px-6 pb-12" style={{ animationDelay: "440ms" }}>
          <p className="mb-4 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-white/40"><Compass className="size-3.5" aria-hidden />Try one of these</p>
          <ul className="flex flex-wrap justify-center gap-2.5">
            {QUICK_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm font-bold text-white/75 transition-[transform,border-color,color,background-color] duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-white/[0.07] hover:text-white">
                  <l.icon className="size-4 text-primary transition-transform duration-200 group-hover:scale-110" aria-hidden />{l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </main>
  );
}
