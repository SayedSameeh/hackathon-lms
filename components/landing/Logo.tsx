import Link from "next/link";
import { Mic } from "lucide-react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" translate="no" aria-label="Converso home" className={`group inline-flex items-center gap-2.5 font-extrabold tracking-tight ${className}`}>
      <span className="grid size-8 place-items-center rounded-lg bg-primary text-white transition-transform duration-300 ease-[var(--ease-out)] group-hover:-rotate-6 group-hover:scale-110">
        <Mic className="size-4" aria-hidden />
      </span>
      <span className="text-xl">Converso</span>
    </Link>
  );
}
