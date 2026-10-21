import { UserProfile } from "@clerk/nextjs";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-8 max-w-5xl w-full pb-10">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-primary/10 p-2 rounded-xl">
            <Settings className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Account Settings
          </h1>
        </div>
        <p className="text-slate-500 font-medium text-lg max-w-2xl">
          Manage your profile, security preferences, and connected accounts.
        </p>
      </div>

      {/* Clerk UserProfile integrated with the new theme */}
      <div className="w-full relative">
        <UserProfile
          routing="hash"
          appearance={{
            elements: {
              rootBox: "w-full",
              cardBox:
                "w-full shadow-sm border border-slate-200 rounded-3xl bg-white",
              navbar: "bg-slate-50 border-r border-slate-200",
              navbarButton:
                "text-slate-600 font-medium hover:text-slate-900 hover:bg-slate-100 transition-colors py-2.5 rounded-lg",
              navbarButton__active:
                "text-primary bg-primary/10 font-bold hover:bg-primary/15 hover:text-primary",
              headerTitle:
                "font-extrabold text-2xl text-slate-900 tracking-tight",
              headerSubtitle: "text-slate-500 font-medium",
              profileSectionTitle:
                "font-bold text-slate-900 border-b border-slate-100 pb-2 mb-4",
              profileSectionTitleText: "text-lg",
              profileSectionPrimaryButton:
                "text-primary font-bold hover:bg-primary/5 transition-colors",
              accordionTriggerButton:
                "text-slate-700 font-semibold hover:bg-slate-50 transition-colors",
              badge: "bg-primary/10 text-primary font-bold border-none",
              formButtonPrimary:
                "bg-primary hover:bg-primary/90 text-white font-bold shadow-sm transition-all py-2.5 rounded-xl",
              formButtonReset:
                "text-slate-500 font-semibold hover:bg-slate-100 transition-colors py-2.5 rounded-xl",
              formFieldInput:
                "rounded-xl border-slate-200 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50 focus:bg-white py-2.5 text-slate-900 font-medium",
              formFieldLabel: "font-semibold text-slate-700 mb-1.5",
              avatarImageActionsUpload:
                "text-primary font-bold hover:bg-primary/5 transition-colors",
              breadcrumbsItem: "font-bold text-slate-700",
              breadcrumbsItemDivider: "text-slate-300",
              menuButton: "text-slate-500 hover:text-slate-900 font-semibold",
              menuItem: "font-medium text-slate-700 hover:bg-slate-50",
            },
          }}
        />
      </div>
    </div>
  );
}
