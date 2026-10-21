import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Sparkles, ArrowRight, Mic, FileText, BrainCircuit } from "lucide-react";

const Page = async () => {
  // Automatically route active users to their private dashboard
  const { userId } = await auth();
  if (userId) redirect("/dashboard");

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans overflow-x-hidden">
      
      {/* Minimal Navigation for Landing Page */}
      <nav className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-1.5 rounded-lg">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Converso<span className="text-primary">.</span>
          </span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/sign-in" className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">
            Log in
          </Link>
          <Link href="/sign-up" className="btn-primary py-2.5 px-6 text-sm shadow-primary/20 max-sm:hidden">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-20 pb-32 relative z-0">
        
        {/* Decorative background blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="bg-white border border-slate-200 text-slate-700 px-5 py-2 rounded-full text-sm font-bold flex items-center gap-3 mb-8 shadow-sm">
          <span className="flex h-2.5 w-2.5 rounded-full bg-primary animate-pulse"></span>
          Converso is now in Public Beta
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 max-w-4xl leading-[1.1]">
          Master any tech skill, <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
            without the academic fluff.
          </span>
        </h1>
        
        <p className="text-xl text-slate-500 max-w-2xl mb-10 font-medium leading-relaxed">
          Upload your outdated university syllabus. We instantly convert it into a modern, industry-standard roadmap taught by a real-time AI voice mentor.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href="/sign-up" className="btn-primary py-4 px-8 text-lg w-full sm:w-auto shadow-primary/20 group">
            Start Learning for Free
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
          <a href="https://github.com/SayedSameeh/hackathon-lms" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-900 px-8 py-4 text-lg font-bold shadow-sm transition-all hover:bg-slate-50 hover:shadow-md w-full sm:w-auto">
            View GitHub
          </a>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full mt-32 text-left">
          
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-5 relative overflow-hidden group hover:border-primary/30 hover:shadow-md transition-all">
            <div className="bg-primary/10 w-14 h-14 rounded-2xl flex items-center justify-center">
              <FileText className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Syllabus Extraction</h3>
            <p className="text-slate-500 font-medium leading-relaxed">Drop in your PDF syllabus. We strip out the outdated theory and rebuild it into practical, industry-relevant modules.</p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-5 relative overflow-hidden group hover:border-primary/30 hover:shadow-md transition-all">
            <div className="bg-primary/10 w-14 h-14 rounded-2xl flex items-center justify-center">
              <Mic className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Real-Time Voice AI</h3>
            <p className="text-slate-500 font-medium leading-relaxed">Stop watching 4-hour tutorials. Talk back and forth with a voice agent that pauses, listens, and tests your knowledge.</p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-5 relative overflow-hidden group hover:border-primary/30 hover:shadow-md transition-all">
            <div className="bg-primary/10 w-14 h-14 rounded-2xl flex items-center justify-center">
              <BrainCircuit className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Analogy-Based Learning</h3>
            <p className="text-slate-500 font-medium leading-relaxed">Tell the AI what you love (Formula 1, Baking, Marvel). It will instantly adapt its teaching analogies to match your brain.</p>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Page;