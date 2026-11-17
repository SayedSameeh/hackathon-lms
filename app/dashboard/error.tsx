"use client";

import * as Sentry from "@sentry/nextjs";
import Link from "next/link";
import { useEffect } from "react";
import { LayoutDashboard, RotateCcw, TriangleAlert } from "lucide-react";

// Inside the app shell: keeps the sidebar, shows a calm in-page error.
export default function DashboardError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { Sentry.captureException(error); }, [error]);
  return (
    <div className="mx-auto grid min-h-[60vh] max-w-lg place-items-center text-center">
      <div className="page-in">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary"><TriangleAlert className="size-7" aria-hidden /></span>
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900">This page hit a problem.</h1>
        <p className="mt-3 text-pretty font-medium leading-relaxed text-slate-500">Your paths and notes are safe. Try again, or head back to your dashboard.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button type="button" onClick={reset} className="btn-primary px-6 py-3"><RotateCcw className="mr-2 size-4" aria-hidden />Try again</button>
          <Link href="/dashboard" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 font-bold text-slate-700 transition-[background-color,transform] duration-200 hover:bg-slate-50 active:scale-[0.97]"><LayoutDashboard className="size-4" aria-hidden />Dashboard</Link>
        </div>
        {error.digest && <p className="mt-6 font-mono text-xs text-slate-400">Reference: {error.digest}</p>}
      </div>
    </div>
  );
}
