import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import StatusScreen, { Code } from "@/components/landing/StatusScreen";

export const metadata = { title: "Page not found · Converso" };

export default function NotFound() {
  return (
    <StatusScreen
      code={<Code digits="404" orb />}
      title="That page isn’t on your learning path."
      body="The link may be old, or the page has moved. Head back and pick up from somewhere familiar."
      actions={<>
        <Link href="/" className="btn-primary btn-shine group px-7 py-3.5">Back to home<ArrowRight className="ml-2 size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden /></Link>
        <Link href="/blog" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/4 px-7 py-3.5 font-bold transition-[background-color,border-color,transform] duration-200 hover:border-white/30 hover:bg-white/8 active:scale-[0.97]"><BookOpen className="size-4" aria-hidden />Read the blog</Link>
      </>}
    />
  );
}
