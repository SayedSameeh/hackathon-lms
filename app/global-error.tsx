"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

// Replaces the root layout, so the app's CSS may not be present: inline styles only.
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { Sentry.captureException(error); }, [error]);
  return (
    <html lang="en">
      <body style={{ margin: 0, minHeight: "100dvh", display: "grid", placeItems: "center", background: "#09090b", color: "#fff", fontFamily: "system-ui, sans-serif", textAlign: "center", padding: 24 }}>
        <main>
          <p style={{ fontSize: "clamp(5rem, 22vw, 11rem)", fontWeight: 800, margin: 0, lineHeight: 1, letterSpacing: "-0.04em", color: "#fe5933" }}>500</p>
          <h1 style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", margin: "16px 0 8px" }}>Converso hit a serious snag.</h1>
          <p style={{ color: "rgba(255,255,255,.6)", maxWidth: 420, margin: "0 auto 28px", lineHeight: 1.6 }}>The error has been reported. Reload to try again.</p>
          <button type="button" onClick={reset} style={{ background: "#fe5933", color: "#fff", border: 0, borderRadius: 12, padding: "14px 28px", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>Reload</button>
          {error.digest && <p style={{ marginTop: 24, fontFamily: "monospace", fontSize: 12, color: "rgba(255,255,255,.35)" }}>Reference: {error.digest}</p>}
        </main>
      </body>
    </html>
  );
}
