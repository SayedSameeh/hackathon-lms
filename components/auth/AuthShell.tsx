import Link from "next/link";
import { ArrowLeft, BrainCircuit, CheckCircle2, Mic, NotebookPen, Route, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/landing/Logo";

// Shared Clerk theme: used by <SignIn/>, <SignUp/> and (via the provider) every
// other Clerk surface in the app, e.g. the UserButton menu.
export const clerkAppearance = {
  variables: {
    colorPrimary: "#fe5933",
    colorText: "#09090b",
    colorTextSecondary: "#52525b",
    colorInputBackground: "#fafafa",
    colorBackground: "#ffffff",
    borderRadius: "0.875rem",
    fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif",
    fontSize: "0.95rem",
  },
  elements: {
    rootBox: "w-full max-w-[420px]",
    cardBox: "w-full rounded-[1.75rem] border border-zinc-200 bg-white shadow-[0_30px_70px_-40px_rgb(9_9_11/0.45)]",
    card: "bg-transparent shadow-none border-0 p-8 sm:p-9 gap-7 [@media(max-height:780px)]:gap-4 [@media(max-height:780px)]:py-5",
    headerTitle: "text-[1.75rem] font-extrabold tracking-tight text-zinc-950",
    headerSubtitle: "text-zinc-500 font-medium",
    socialButtonsBlockButton: "min-h-12 rounded-xl border border-zinc-200 bg-white font-semibold text-zinc-800 transition-[background-color,border-color,transform] duration-200 hover:border-zinc-400 hover:bg-zinc-50 active:scale-[0.98]",
    socialButtonsBlockButtonText: "font-semibold",
    dividerLine: "bg-zinc-200",
    dividerText: "text-zinc-400 font-medium",
    formFieldLabel: "font-semibold text-zinc-700",
    formFieldInput: "min-h-12 rounded-xl border border-zinc-200 bg-zinc-50 font-medium text-zinc-900 transition-[border-color,box-shadow,background-color] duration-200 focus:border-primary focus:bg-white focus:shadow-[0_0_0_4px_rgb(254_89_51/0.15)]",
    formButtonPrimary: "min-h-12 rounded-xl bg-primary text-base font-bold text-white shadow-none transition-[background-color,transform] duration-200 hover:bg-primary/90 active:scale-[0.98]",
    footer: "bg-zinc-50 rounded-b-[1.75rem]",
    footerActionText: "text-zinc-500 font-medium",
    footerActionLink: "font-bold text-primary hover:text-primary/80",
    formResendCodeLink: "font-bold text-primary",
    otpCodeFieldInput: "rounded-xl border-zinc-200 bg-zinc-50",
    alert: "rounded-xl",
    identityPreview: "rounded-xl border-zinc-200 bg-zinc-50",
    identityPreviewEditButton: "text-primary",
    userButtonPopoverCard: "rounded-2xl border border-zinc-200 shadow-xl",
  },
};

const POINTS = [
  { icon: Route, text: "A path of 3 to 5 modules, built from your skill and interest" },
  { icon: BrainCircuit, text: "Analogies from the things you already love" },
  { icon: NotebookPen, text: "Notes written for you the moment a session ends" },
];

const MODULES = ["Components as parts", "State & re-renders", "Effects & side effects"];
export default function AuthShell({ heading, sub, children }: { heading: string; sub: string; children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen w-full lg:h-screen lg:grid-rows-[minmax(0,1fr)] lg:grid-cols-[1.05fr_1fr] lg:overflow-hidden">
      <a href="#auth" className="skip-link">Skip to form</a>
      <aside className="relative isolate hidden min-h-0 flex-col overflow-hidden bg-[#09090b] text-white lg:flex">
        <div aria-hidden className="hero-light" />
        <div aria-hidden className="hero-grain" />
        <div className="relative z-10 flex min-h-0 flex-1 flex-col justify-between px-12 pt-10">
          <Logo />
          <div className="max-w-xl py-6">
            <h1 className="text-balance text-5xl font-extrabold leading-[1.04] tracking-tight !text-white [@media(min-height:760px)]:xl:text-6xl">{heading}</h1>
            <p className="mt-5 max-w-md text-pretty text-lg font-medium leading-relaxed text-white/60">{sub}</p>

            {/* A path resolving in turn: the product, not a quote */}
            <div className="relative mt-10 max-w-md [@media(max-height:820px)]:hidden">
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-white/45">
                  <Mic className="size-3.5 text-primary" aria-hidden /> Your path · React, through Formula&nbsp;1
                </p>
                <ul className="mt-4 space-y-2">
                  {MODULES.map((m, i) => (
                    <li key={m} className="tick flex items-center gap-3 rounded-xl bg-white/[0.06] px-3.5 py-3 text-sm font-semibold" style={{ ["--t" as string]: `${i * 1.4}s` }}>
                      <CheckCircle2 className="size-5 text-emerald-400" aria-hidden />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <ul className="mt-10 space-y-4 [@media(max-height:660px)]:hidden">
              {POINTS.map((p) => (
                <li key={p.text} className="flex items-center gap-3.5 font-semibold text-white/80">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white/[0.07] text-primary"><p.icon className="size-[18px]" aria-hidden /></span>
                  {p.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Wordmark flush on the bottom edge */}
        <p aria-hidden translate="no" className="footer-mark relative z-10 !mt-0 select-none overflow-hidden whitespace-nowrap text-center font-extrabold uppercase text-white/[0.07]" style={{ fontSize: "clamp(3rem, 8.2vw, 10rem)" }}>Converso</p>
      </aside>

      <main id="auth" className="!m-0 !h-auto !max-w-none !gap-0 !pb-0 relative flex min-h-0 flex-col items-center bg-[#faf7f2] px-5 py-8 sm:px-8 lg:overflow-y-auto">
        <div className="my-auto flex w-full flex-col items-center">
        <Logo className="mb-6 text-zinc-950 lg:hidden" />
        <div className="auth-in flex w-full flex-col items-center">{children}</div>
        <div className="mt-6 flex items-center gap-6 text-sm font-semibold text-zinc-500">
          <Link href="/" className="group inline-flex items-center gap-1.5 rounded-lg transition-colors duration-200 hover:text-zinc-950">
            <ArrowLeft className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5" aria-hidden />
            Back to home
          </Link>
          <span className="inline-flex items-center gap-1.5"><ShieldCheck className="size-4 text-emerald-600" aria-hidden />Secure sign-in</span>
        </div>
        </div>
      </main>
    </div>
  );
}
