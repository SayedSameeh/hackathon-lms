import type { Metadata } from "next";
import Legal from "@/components/landing/Legal";

export const metadata: Metadata = { title: "Privacy · Converso", description: "What Converso collects, why, and who processes it." };

export default function PrivacyPage() {
  return (
    <Legal title="Privacy policy" sub="Plain-language summary of what we collect and who helps us run Converso." updated="18 November 2026">
      <section><h2>What we collect</h2>
        <ul>
          <li>Account details you give when signing up (handled by our sign-in provider).</li>
          <li>The skill and interest you enter, and the learning paths and modules generated from them.</li>
          <li>Voice conversations during a session, and the transcript and notes created from them.</li>
          <li>Basic error and performance data from the app.</li>
        </ul>
      </section>
      <section><h2>How we use it</h2><p>To run your account, generate your learning paths, hold your voice sessions, write your notes and keep the app working. We do not sell your data.</p></section>
      <section><h2>Who processes it</h2>
        <ul>
          <li>Clerk: authentication and billing.</li>
          <li>Supabase: storage of paths, modules, notes and session history.</li>
          <li>Vapi: real-time voice sessions.</li>
          <li>Groq: language model that generates paths and summarises transcripts.</li>
          <li>Sentry: error monitoring.</li>
        </ul>
      </section>
      <section><h2>Your choices</h2><p>You can ask us to access, correct or delete your data. Write to the help address on the contact page.</p></section>
      <section><h2>Changes</h2><p>If this policy changes in a meaningful way we will update the date above and tell signed-in users.</p></section>
    </Legal>
  );
}
