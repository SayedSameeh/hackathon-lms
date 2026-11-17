import { FileText } from "lucide-react";
import PageHero from "./PageHero";

export default function Legal({ title, sub, updated, children }: { title: string; sub: string; updated: string; children: React.ReactNode }) {
  return (
    <>
      <PageHero icon={FileText} eyebrow="Legal" title={title} sub={sub} />
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto w-full max-w-3xl px-6">
          <p className="rounded-2xl border border-amber-300/60 bg-amber-50 px-5 py-4 text-sm font-semibold text-amber-900">
            Draft for launch preparation. Have a lawyer review it before you rely on it. Last updated {updated}.
          </p>
          <div className="mt-10 space-y-10 [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:tracking-tight [&_h2]:text-zinc-950 [&_p]:mt-3 [&_p]:text-pretty [&_p]:font-medium [&_p]:leading-relaxed [&_p]:text-zinc-600 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ul]:font-medium [&_ul]:text-zinc-600">
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
