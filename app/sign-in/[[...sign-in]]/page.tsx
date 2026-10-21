import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { Sparkles, BrainCircuit } from "lucide-react";

export default function SignInPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 w-full">
      
      {/* Left Side - Brand Presentation */}
      <div className="hidden md:flex flex-col justify-between bg-slate-900 text-white p-12 relative overflow-hidden">
        {/* Background decorative glows */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 z-10 w-fit hover:opacity-80 transition-opacity">
          <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-3xl font-extrabold tracking-tight">
            Converso<span className="text-primary">.</span>
          </span>
        </Link>

        {/* Value Prop */}
        <div className="z-10 flex flex-col gap-6 max-w-md mb-10">
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10">
            <BrainCircuit className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-4xl font-bold leading-[1.2] tracking-tight text-white">
            "I learned more in a 15-minute AI session than I did in a 4-hour university lecture."
          </h2>
          <p className="text-slate-400 font-medium text-lg">
            Log in to continue building your personalized curriculum.
          </p>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="flex flex-col items-center justify-center p-8 bg-slate-50 relative">
         
         {/* Mobile Logo (Only visible on small screens) */}
         <Link href="/" className="md:hidden flex items-center gap-2 mb-8 z-10">
          <div className="bg-primary/10 p-1.5 rounded-lg">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Converso<span className="text-primary">.</span>
          </span>
        </Link>

        {/* Customized Clerk Component */}
        <SignIn 
          appearance={{
            elements: {
              rootBox: "w-full max-w-md",
              card: "shadow-sm border border-slate-200 bg-white rounded-3xl w-full",
              headerTitle: "font-extrabold tracking-tight text-slate-900 text-2xl",
              headerSubtitle: "text-slate-500 font-medium",
              socialButtonsBlockButton: "border-slate-200 hover:bg-slate-50 transition-colors font-semibold text-slate-700 py-3 rounded-xl",
              socialButtonsBlockButtonText: "font-semibold",
              dividerLine: "bg-slate-200",
              dividerText: "text-slate-400 font-medium",
              formButtonPrimary: "bg-primary hover:bg-primary/90 text-white font-bold shadow-sm transition-all py-3 rounded-xl text-base",
              formFieldInput: "rounded-xl border-slate-200 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50 focus:bg-white py-3 text-slate-900 font-medium",
              formFieldLabel: "font-semibold text-slate-700 mb-1.5",
              footerActionLink: "text-primary hover:text-primary/80 font-bold transition-colors",
              identityPreviewText: "font-semibold text-slate-700",
              identityPreviewEditButtonIcon: "text-primary hover:text-primary/80"
            }
          }}
        />
      </div>
    </div>
  );
}