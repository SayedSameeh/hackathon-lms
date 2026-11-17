import type { Metadata } from "next";
import { Bug, Handshake, LifeBuoy, Mail, ArrowUpRight } from "lucide-react";
import PageHero from "@/components/landing/PageHero";
import Reveal from "@/components/landing/Reveal";

export const metadata: Metadata = { title: "Contact · Converso", description: "Get help, report a bug or talk partnerships." };

// Placeholder addresses on the reserved .example domain: swap for real inboxes at launch.
const CHANNELS = [
  { icon: LifeBuoy, title: "Help with your account", body: "Trouble signing in, a path that did not generate, a session that dropped.", href: "mailto:help@converso.example", label: "help@converso.example" },
  { icon: Bug, title: "Report a bug", body: "Found something broken? Open an issue so it can be tracked and fixed.", href: "https://github.com/SayedSameeh/hackathon-lms/issues", label: "Open a GitHub issue" },
  { icon: Handshake, title: "Partnerships & schools", body: "Teaching a group, or want Converso in your course? Start here.", href: "mailto:hello@converso.example", label: "hello@converso.example" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero icon={Mail} eyebrow="Contact" title="Talk to a human." sub="Pick the channel that fits. We read everything, and answer as fast as a small team can." />
      <section className="bg-[#faf7f2] py-24 md:py-32">
        <div className="mx-auto grid w-full max-w-7xl gap-5 px-6 md:grid-cols-3">
          {CHANNELS.map((c, i) => (
            <Reveal key={c.title} delay={i * 90} className="flex">
              <a href={c.href} {...(c.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})} className="group flex w-full flex-col rounded-3xl border border-zinc-200 bg-white p-8 transition-[transform,border-color,box-shadow] duration-300 ease-[var(--ease-out)] hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_24px_50px_-30px_rgb(254_89_51/0.5)]">
                <span className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary"><c.icon className="size-6" aria-hidden /></span>
                <h2 className="mt-6 text-2xl font-extrabold tracking-tight text-zinc-950">{c.title}</h2>
                <p className="mt-2 flex-1 text-pretty font-medium leading-relaxed text-zinc-600">{c.body}</p>
                <span className="mt-8 inline-flex items-center gap-2 font-bold text-primary">{c.label}<ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden /></span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
