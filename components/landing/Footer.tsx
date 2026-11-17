import Link from "next/link";
import { FileText, Mail, ShieldCheck, Users, ArrowUp, BookOpen, CircleHelp, CreditCard, ExternalLink, History, LayoutDashboard, LayoutGrid, LogIn, PlusCircle, Route, Settings, UserPlus, AlertTriangle, Code2 } from "lucide-react";
import { Logo } from "./Logo";

const COLUMNS = [
  { title: "Product", links: [["How it works", "/#solution", Route], ["Features", "/features", LayoutGrid], ["Pricing", "/pricing", CreditCard], ["FAQ", "/#faq", CircleHelp]] },
  { title: "Account", links: [["Log in", "/sign-in", LogIn], ["Create account", "/sign-up", UserPlus], ["Dashboard", "/dashboard", LayoutDashboard], ["Settings", "/dashboard/settings", Settings]] },
  { title: "Learn", links: [["Build a path", "/dashboard/new", PlusCircle], ["Session history", "/dashboard/history", History], ["My lessons", "/dashboard/lesson", BookOpen], ["The problem", "/#problem", AlertTriangle]] },
  { title: "Company", links: [["Blog", "/blog", BookOpen], ["About", "/about", Users], ["Contact", "/contact", Mail], ["Privacy", "/privacy", ShieldCheck], ["Terms", "/terms", FileText]] },
] as const;

export default function Footer() {
  return (
    <footer className="bg-[#09090b] text-white">
      <div className="mx-auto w-full max-w-7xl px-6 pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-pretty font-medium leading-relaxed text-white/55">An AI voice tutor that teaches you through what you already love.</p>
            <Link href="/sign-up" className="btn-primary btn-shine mt-8 px-6 py-3">Build my learning path</Link>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {COLUMNS.map((c) => (
              <div key={c.title}>
                <h3 className="text-xs font-bold uppercase tracking-[0.14em] !text-white/45">{c.title}</h3>
                <ul className="mt-5 space-y-1">
                  {c.links.map(([label, href, Icon]) => {
                    const cls = "group -mx-2 inline-flex items-center whitespace-nowrap gap-2.5 rounded-lg px-2 py-2 font-semibold text-white/75 transition-colors duration-200 hover:text-white";
                    const inner = (<><Icon className="size-4 text-white/35 transition-colors duration-200 group-hover:text-primary" aria-hidden />{label}</>);
                    return (
                      <li key={label}>
                        {href.startsWith("http") ? <a href={href} target="_blank" rel="noreferrer" className={cls}>{inner}</a> : <Link href={href} className={cls}>{inner}</Link>}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="mt-14 flex items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm font-medium text-white/40">
          <p>© {new Date().getFullYear()} <span translate="no">Converso</span>. A hackathon project.</p>
          <a href="#top" className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 font-semibold text-white/70 transition-colors duration-200 hover:border-primary/50 hover:text-white">
            Back to top
            <ArrowUp className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5" aria-hidden />
          </a>
        </div>
      </div>
      {/* Wordmark sits on the very bottom edge: line box = cap height, no descender room */}
      <p aria-hidden translate="no" className="footer-mark select-none overflow-hidden whitespace-nowrap text-center font-extrabold uppercase text-white">Converso</p>
    </footer>
  );
}
