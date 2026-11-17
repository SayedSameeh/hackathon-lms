import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

export default function CtaBand({ title = "Build your first path in a minute.", cta = "Build my learning path" }: { title?: string; cta?: string }) {
  return (
    <section className="bg-[#faf7f2] py-20 md:py-28">
      <Reveal className="mx-auto w-full max-w-7xl px-6">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-[#09090b] px-8 py-16 text-center text-white md:py-20">
          <div aria-hidden className="hero-light" />
          <h2 className="mx-auto max-w-2xl text-balance text-4xl font-extrabold leading-[1.05] tracking-tight !text-white md:text-5xl">{title}</h2>
          <Link href="/sign-up" className="btn-primary btn-shine group mt-8 px-8 py-4 text-lg">
            {cta}
            <ArrowRight className="ml-2 size-5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
