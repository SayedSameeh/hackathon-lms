import { getPathModule } from "@/lib/actions/curriculum.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CompanionComponent from "@/components/CompanionComponent";
import SessionNotes from "@/components/SessionNotes";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";

interface LessonPageProps {
    params: Promise<{ id: string }>;
}

const pick = <T extends string>(value: unknown, allowed: readonly T[], fallback: T): T =>
    allowed.includes(value as T) ? (value as T) : fallback;

const LessonPage = async ({ params }: LessonPageProps) => {
    const { id } = await params;
    const user = await currentUser();

    if (!user) redirect('/sign-in');

    // Strip the "module-" prefix older links carried
    const moduleData = await getPathModule(id.replace('module-', ''));

    // Tutor voice and style come from the profile page
    const voice = pick(user.unsafeMetadata?.voice, ['male', 'female'] as const, 'male');
    const style = pick(user.unsafeMetadata?.style, ['casual', 'formal'] as const, 'casual');

    const session = (
        <CompanionComponent
            moduleId={moduleData.id}
            subject="coding" // Default subject styling for now
            topic={moduleData.topic}
            name="AI Mentor"
            userName={user.firstName!}
            userImage={user.imageUrl!}
            style={style}
            voice={voice}
            userInterest={moduleData.learning_paths?.user_interest || 'general real-world applications'}
        />
    );

    return (
        <div className="flex flex-col gap-6 max-w-5xl w-full">
            <Link href="/dashboard/lesson" className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 hover:text-primary transition-colors w-fit">
                <ArrowLeft className="size-4" aria-hidden />
                My lessons
            </Link>

            <header className="flex items-start justify-between gap-6 max-md:flex-col">
                <div className="flex flex-col gap-2">
                    <span className="text-sm font-semibold text-primary">
                        Lesson {moduleData.module_order}
                    </span>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900">
                        {moduleData.name}
                    </h1>
                    <p className="text-zinc-600 max-w-2xl">{moduleData.topic}</p>
                </div>
                <span className="flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-700 shrink-0">
                    <Clock className="size-4 text-primary" aria-hidden />
                    {moduleData.duration} min
                </span>
            </header>

            {moduleData.session_notes ? (
                <>
                    <SessionNotes markdown={moduleData.session_notes} />
                    <details className="group">
                        <summary className="cursor-pointer w-fit rounded-xl border border-stone-300 px-4 py-2 text-sm font-semibold text-zinc-800 hover:bg-white">
                            Run this lesson again
                        </summary>
                        <div className="mt-6">{session}</div>
                    </details>
                </>
            ) : (
                session
            )}
        </div>
    );
};

export default LessonPage;
