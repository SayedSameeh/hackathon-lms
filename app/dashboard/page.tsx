import CTA from "@/components/CTA";
import LearningPathTimeline from "@/components/LearningPathTimeline";
import { getRecentSessions } from "@/lib/actions/companion.actions";
import CompanionsList from "@/components/CompanionsList";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import GeneratePathForm from "@/components/GeneratePathForm";
import { getActiveLearningPath } from "@/lib/actions/curriculum.actions";

const DashboardPage = async () => {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  // Fetch the real data from Supabase
  const recentSessionsCompanions = await getRecentSessions(10);
  const activePathData = await getActiveLearningPath();

  return (
    <main>
      {/* Generator Section */}
      <section className="home-section flex-col items-center text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">What do you want to master today?</h1>
        <p className="text-lg opacity-80 max-w-2xl mb-8">
          Enter a topic or upload your university syllabus. We'll strip away the academic fluff and build a modern, industry-standard roadmap.
        </p>
        
        <GeneratePathForm />
      </section>

      {/* Active Timeline (Only renders if a path exists) */}
      {activePathData && activePathData.modules.length > 0 && (
        <section className="home-section flex-col">
          <LearningPathTimeline 
            title={`Current Focus: ${activePathData.path.target_skill}`} 
            modules={activePathData.modules} 
          />
        </section>
      )}

      {/* Past Sessions */}
      <section className="home-section flex-col mt-12 border-t pt-12">
        <CompanionsList
          title="Past Sessions"
          companions={recentSessionsCompanions}
          classNames="w-2/3 max-lg:w-full"
        />
        <CTA />
      </section>
    </main>
  );
};

export default DashboardPage;