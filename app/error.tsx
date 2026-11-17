"use client";

import * as Sentry from "@sentry/nextjs";
import Link from "next/link";
import { useEffect } from "react";
import { Home, RotateCcw } from "lucide-react";
import StatusScreen, { Code } from "@/components/landing/StatusScreen";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { Sentry.captureException(error); }, [error]);
  return (
    <StatusScreen
      code={<Code digits="500" orb />}
      title="Something went wrong on our side."
      body="The error has been reported. Try again, and if it keeps happening, come back in a few minutes."
      note={error.digest ? `Reference: ${error.digest}` : undefined}
      showLinks={false}
      actions={<>
        <button type="button" onClick={reset} className="btn-primary btn-shine group px-7 py-3.5"><RotateCcw className="mr-2 size-4 transition-transform duration-300 group-hover:-rotate-180" aria-hidden />Try again</button>
        <Link href="/" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-7 py-3.5 font-bold transition-[background-color,border-color,transform] duration-200 hover:border-white/30 hover:bg-white/[0.08] active:scale-[0.97]"><Home className="size-4" aria-hidden />Back to home</Link>
      </>}
    />
  );
}
