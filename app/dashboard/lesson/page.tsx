import Link from "next/link";
import { Compass } from "lucide-react";

export default function LessonIndexPage() {
    return (
        <div className="flex flex-col items-center justify-center h-[70vh] w-full">
            <div className="bg-white p-12 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center text-center max-w-md">
                <div className="bg-primary/10 p-4 rounded-full mb-6">
                    <Compass className="w-12 h-12 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">No Lesson Selected</h2>
                <p className="text-slate-500 font-medium mb-8">
                    It looks like you wandered off the path. Head back to your curriculum timeline to select a specific module.
                </p>
                <Link href="/dashboard" className="btn-primary w-full">
                    Return to Curriculum
                </Link>
            </div>
        </div>
    );
}