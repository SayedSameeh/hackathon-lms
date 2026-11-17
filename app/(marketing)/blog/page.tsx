import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import PageHero from "@/components/landing/PageHero";
import BlogGrid from "@/components/landing/BlogGrid";
import CtaBand from "@/components/landing/CtaBand";

export const metadata: Metadata = { title: "Blog · Converso", description: "Notes on learning, study technique and how Converso works." };

export default function BlogPage() {
  return (
    <>
      <PageHero icon={BookOpen} eyebrow="Blog" title="Notes on learning out loud." sub="Short, practical pieces on how people learn, and how to get more from each session." />
      <section className="bg-[#faf7f2] py-16 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-6"><BlogGrid /></div>
      </section>
      <CtaBand title="Turn a post into practice." />
    </>
  );
}
