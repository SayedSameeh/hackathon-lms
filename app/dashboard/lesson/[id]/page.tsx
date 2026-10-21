import { getPathModule } from "@/lib/actions/curriculum.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CompanionComponent from "@/components/CompanionComponent";
import Link from "next/link";
import { getSubjectColor } from "@/lib/utils";

interface LessonPageProps {
    params: Promise<{ id: string }>;
}

const LessonPage = async ({ params }: LessonPageProps) => {
    const { id } = await params;
    const user = await currentUser();
    
    if (!user) redirect('/sign-in');

    // Strip the "module-" prefix we added in the timeline link
    const cleanId = id.replace('module-', '');
    const moduleData = await getPathModule(cleanId);

    return (
        <main className="max-w-6xl mx-auto p-4 md:p-8">
            {/* Simple navigation to go back to the timeline */}
            <Link href="/dashboard" className="inline-block mb-6 font-semibold text-[#1E90FF] hover:underline">
                ← Back to Curriculum
            </Link>

            <article className="flex rounded-xl border border-gray-200 justify-between p-6 mb-8 bg-white shadow-sm max-md:flex-col">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <span className="bg-[#1E90FF]/10 text-[#1E90FF] text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-md">
                            Module {moduleData.module_order}
                        </span>
                        <h1 className="font-bold text-2xl">
                            {moduleData.name}
                        </h1>
                    </div>
                    <p className="text-lg opacity-80">{moduleData.topic}</p>
                </div>
                <div className="items-start text-xl max-md:hidden opacity-70 font-medium">
                    {moduleData.duration} mins
                </div>
            </article>

            {/* Launch the AI Agent */}
            <CompanionComponent
                moduleId={moduleData.id}
                subject="coding" // Hardcoding a default subject style for now
                topic={moduleData.topic}
                name="AI Mentor"
                userName={user.firstName!}
                userImage={user.imageUrl!}
                style="casual"
                voice="male"
                userInterest={moduleData.learning_paths?.user_interest || 'general real-world applications'}
            />
        </main>
    )
}

export default LessonPage;