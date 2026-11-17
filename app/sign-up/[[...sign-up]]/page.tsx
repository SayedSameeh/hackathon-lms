import { SignUp } from "@clerk/nextjs";
import AuthShell, { clerkAppearance } from "@/components/auth/AuthShell";

export const metadata = { title: "Create account · Converso" };

export default function SignUpPage() {
  return (
    <AuthShell heading="Learn any skill, out loud." sub="Create a free account and build your first learning path in a minute.">
      <SignUp appearance={clerkAppearance} signInUrl="/sign-in" />
    </AuthShell>
  );
}
