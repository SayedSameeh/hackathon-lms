"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BookOpen, LayoutGrid, Menu, Route, Tag, Users, X } from "lucide-react";
import { Logo } from "./Logo";

// `section` lets the home page highlight a link while its section is on screen.
const LINKS = [
  { href: "/#solution", label: "How it works", icon: Route, section: "solution" },
  { href: "/features", label: "Features", icon: LayoutGrid, section: "features" },
  { href: "/pricing", label: "Pricing", icon: Tag, section: "pricing" },
  { href: "/blog", label: "Blog", icon: BookOpen },
  { href: "/about", label: "About", icon: Users },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState("");
  const bar = useRef<HTMLSpanElement>(null);

  // Scroll progress (writes a transform, no re-render) + the pill state
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.current?.style.setProperty("transform", `scaleX(${max > 0 ? Math.min(scrollY / max, 1) : 0})`);
      setScrolled(scrollY > 40);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    return () => { removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, [pathname]);

  // Home only: which section is in view
  useEffect(() => {
    if (pathname !== "/") return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setSection(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    LINKS.forEach((l) => { const el = l.section && document.getElementById(l.section); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (l: (typeof LINKS)[number]) => (pathname === "/" ? !!l.section && section === l.section : pathname === l.href || pathname.startsWith(l.href + "/"));
  const pill = scrolled && !open;

  return (
    <header className={`pointer-events-none fixed inset-x-0 top-0 z-50 text-white transition-[padding] duration-500 ease-[var(--ease-out)] ${scrolled ? "px-3 pt-3" : "px-0 pt-0"}`}>
      <div
        className={`pointer-events-auto relative mx-auto w-full overflow-hidden transition-[max-width,border-radius,background-color,box-shadow,border-color] duration-500 ease-[var(--ease-out)] ${
          (scrolled ? "max-w-[62rem] border border-white/10 shadow-[0_18px_50px_-20px_rgb(0_0_0/0.7)]" : "max-w-7xl border border-transparent") + (scrolled || open ? " bg-[#09090b]/95 backdrop-blur-xl" : " bg-transparent")
        } ${!scrolled ? "rounded-none" : pill ? "rounded-[28px]" : "rounded-3xl"}`}
      >
        <nav aria-label="Primary" className={`flex items-center justify-between gap-4 transition-[height,padding] duration-500 ease-[var(--ease-out)] ${scrolled ? "h-14 pl-5 pr-2.5" : "h-[72px] px-6"}`}>
          <Logo />
          <ul className="hidden items-center gap-0.5 lg:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l) ? "page" : undefined}
                  className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-semibold transition-[background-color,color] duration-200 ${isActive(l) ? "bg-white/10 text-white" : "text-white/75 hover:bg-white/10 hover:text-white"}`}
                >
                  <l.icon className="hidden size-4 xl:block" aria-hidden />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <Link href="/sign-in" className="hidden whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-bold text-white/70 transition-colors hover:text-white sm:block">Log in</Link>
            <Link href="/sign-up" className="btn-primary btn-shine whitespace-nowrap !rounded-full px-5 py-2.5 text-sm max-sm:hidden">Get started</Link>
            <button
              type="button"
              className="grid size-11 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/10 lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
            </button>
          </div>
        </nav>

        {open && (
          <div id="mobile-menu" className="page-in border-t border-white/10 px-4 pb-5 pt-2 lg:hidden">
            <ul className="space-y-1">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="flex items-center gap-3 rounded-xl px-3 py-3.5 text-lg font-bold text-white/80 active:bg-white/10">
                    <l.icon className="size-5 text-primary" aria-hidden />
                    {l.label}
                  </Link>
                </li>
              ))}
              <li><Link href="/sign-in" className="flex items-center gap-3 rounded-xl px-3 py-3.5 text-lg font-bold text-white/80"><BookOpen className="size-5 text-primary" aria-hidden />Log in</Link></li>
            </ul>
            <Link href="/sign-up" className="btn-primary mt-3 w-full py-3.5 text-base">Get started</Link>
          </div>
        )}

        <span aria-hidden className="absolute inset-x-6 bottom-0 h-0.5">
          <span ref={bar} className="block h-full origin-left rounded-full bg-primary" style={{ transform: "scaleX(0)" }} />
        </span>
      </div>
    </header>
  );
}
