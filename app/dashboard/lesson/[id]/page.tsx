import { getPathModule } from "@/lib/actions/curriculum.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CompanionComponent from "@/components/CompanionComponent";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";

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
        <main className="w-full flex flex-col gap-6">
            
            {/* Clean Back Navigation */}
            <Link href="/dashboard" className="inline-flex items-center gap-2 font-semibold text-slate-500 hover:text-primary transition-colors w-fit">
                <ArrowLeft className="w-4 h-4" />
                Back to Curriculum
            </Link>

            {/* Redesigned Header Card */}
            <article className="flex rounded-2xl border border-slate-200 bg-white p-8 shadow-sm justify-between items-start max-md:flex-col max-md:gap-6">
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                        <span className="bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg">
                            Module {moduleData.module_order}
                        </span>
                        <h1 className="font-extrabold text-3xl text-slate-900 tracking-tight">
                            {moduleData.name}
                        </h1>
                    </div>
                    <p className="text-lg text-slate-500 font-medium pl-1 max-w-2xl">
                        {moduleData.topic}
                    </p>
                </div>
                
                {/* Duration Badge */}
                <div className="flex items-center gap-2 text-slate-600 font-bold bg-slate-50 px-4 py-3 rounded-xl border border-slate-100 max-md:self-start">
                    <Clock className="w-5 h-5 text-primary" />
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