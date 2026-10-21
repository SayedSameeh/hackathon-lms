import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import GeneratePathForm from "@/components/GeneratePathForm";
import LearningPathTimeline from "@/components/LearningPathTimeline";
import { getActiveLearningPath } from "@/lib/actions/curriculum.actions";
import { Sparkles } from "lucide-react";

const DashboardPage = async () => {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const activePathData = await getActiveLearningPath();

  return (
    <div className="flex flex-col gap-10 pb-10">
      
      {/* Hero / Generator Section */}
      <section className="flex flex-col items-center text-center py-12 px-4 bg-gradient-to-b from-slate-50 to-white rounded-3xl border border-slate-100 shadow-sm mt-2 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 mb-6">
          <Sparkles className="w-4 h-4" />
          AI-Powered Curriculum
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-5">
          Master any topic in <span className="text-primary">record time.</span>
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mb-10 font-medium leading-relaxed">
          Drop a topic below or upload your syllabus. We'll strip away the academic fluff and build a modern, interactive roadmap tailored to how you think.
        </p>
        
        <GeneratePathForm />
      </section>

      {/* Active Timeline - The only thing that matters now */}
      {activePathData && activePathData.modules.length > 0 && (
        <section className="flex flex-col gap-6 mt-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Your Active Journey</h2>
            <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-lg capitalize">
              {activePathData.path.target_skill}
            </span>
          </div>
          
          <LearningPathTimeline modules={activePathData.modules} />
        </section>
      )}
      
    </div>
  );
};

export default DashboardPage;