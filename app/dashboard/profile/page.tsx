import { PageHeader } from "@/components/dashboard";
import ProfileForm from "@/components/ProfileForm";

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-8 max-w-2xl w-full">
      <PageHeader
        title="Profile"
        description="Your details and how you like to learn."
      />
      <ProfileForm />
    </div>
  );
}
