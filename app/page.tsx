import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ArrowRight, Mic } from "lucide-react";
import HeroDemo from "@/components/landing/HeroDemo";
import SiteNav from "@/components/landing/SiteNav";
import Marquee from "@/components/landing/Marquee";
import Problem from "@/components/landing/Problem";
import Solution from "@/components/landing/Solution";
import Features from "@/components/landing/Features";
import Notes from "@/components/landing/Notes";
import Pricing from "@/components/landing/Pricing";
import Faq from "@/components/landing/Faq";
import Footer from "@/components/landing/Footer";

const Page = async () => {
  // Automatically route active users to their private dashboard
  const { userId } = await auth();
  if (userId) redirect("/dashboard");

  return (
    <div id="top" className="min-h-screen bg-background flex flex-col font-sans overflow-x-clip">
      <a href="#main" className="skip-link">Skip to content</a>
      <SiteNav />

      <main id="main" className="m-0! max-w-none! gap-0! p-0! h-auto!">
      {/* Hero: a dark stage, a warm key light from above, the product as the shot */}
      <section className="hero-stage relative isolate overflow-hidden bg-[#09090b] text-white">
        <div aria-hidden className="hero-light" />
        <div aria-hidden className="hero-grain" />

        <div aria-hidden className="h-18" />

        <div className="relative z-10 flex flex-col items-center text-center px-4 pt-10 md:pt-12">
          <p className="hero-in inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/4 px-4 py-1.5 text-sm font-semibold text-white/75" style={{ animationDelay: "0ms" }}>
            <Mic className="w-4 h-4 text-primary" aria-hidden />
            An AI voice tutor for students
          </p>

          <h1 className="mt-6 max-w-6xl text-5xl md:text-[52px] lg:text-[64px] text-balance font-extrabold tracking-tight leading-[1.04] text-white">
            <span className="hero-in block" style={{ animationDelay: "120ms" }}>Learn any skill out loud,</span>
            <span className="hero-in block text-transparent bg-clip-text bg-linear-to-r from-primary via-[#ff7a52] to-amber-300" style={{ animationDelay: "240ms" }}>
              explained through what you love.
            </span>
          </h1>

          <p className="hero-in mt-6 max-w-2xl text-lg md:text-xl text-white/60 font-medium leading-relaxed" style={{ animationDelay: "380ms" }}>
            Name a skill and something you&apos;re into. Converso builds a path of 3&nbsp;to&nbsp;5 short modules,
            talks you through each one in analogies from your world, and writes your notes when you hang up.
          </p>

          <div className="hero-in mt-9 flex flex-col sm:flex-row gap-3 w-full sm:w-auto" style={{ animationDelay: "500ms" }}>
            <Link href="/sign-up" className="btn-primary btn-shine py-4 px-8 text-lg w-full sm:w-auto shadow-lg shadow-primary/25 group">
              Build my learning path
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
            <a href="https://github.com/SayedSameeh/hackathon-lms" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/4 text-white px-8 py-4 text-lg font-bold transition-[background-color,border-color,transform] duration-200 active:scale-[0.97] hover:bg-white/8 hover:border-white/25 w-full sm:w-auto">
              View on GitHub
            </a>
          </div>
        </div>

        {/* The product shot: a live lesson, the window running off the bottom of the hero */}
        <div className="hero-in relative z-10 mx-auto mt-10 md:mt-12 w-full max-w-260 px-0 sm:px-4" style={{ animationDelay: "700ms" }}>
          <HeroDemo />
        </div>
      </section>

      <Marquee />
      <Problem />
      <Solution />
      <Features />
      <Notes />
      <Pricing />
      <Faq />
      </main>
      <Footer />
    </div>
  );
};

export default Page;