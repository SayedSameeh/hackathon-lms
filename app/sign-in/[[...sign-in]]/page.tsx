import { SignIn } from "@clerk/nextjs";
import AuthShell, { clerkAppearance } from "@/components/auth/AuthShell";

export const metadata = { title: "Log in · Converso" };

export default function SignInPage() {
  return (
    <AuthShell heading="Pick up where you left off." sub="Log in to continue your learning path and reopen your session notes.">
      <SignIn appearance={clerkAppearance} signUpUrl="/sign-up" />
    </AuthShell>
  );
}
