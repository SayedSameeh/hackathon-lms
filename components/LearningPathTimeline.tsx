import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface PathModule {
  id: string;
  module_order: number;
  name: string;
  topic: string;
  duration: number;
  is_completed: boolean;
}

interface LearningPathTimelineProps {
  title: string;
  modules: PathModule[];
}

const LearningPathTimeline = ({ title, modules }: LearningPathTimelineProps) => {
  const activeIndex = modules.findIndex((m) => !m.is_completed);

  return (
    <div className="w-full max-w-3xl py-8">
      <h2 className="font-bold text-3xl mb-10">{title}</h2>
      
      <div className="relative border-l-2 border-gray-200 ml-4 md:ml-6">
        {modules.map((module, index) => {
          const isCompleted = module.is_completed;
          const isActive = index === activeIndex;
          const isLocked = !isCompleted && !isActive;

          return (
            <div key={module.id} className="mb-10 ml-8 md:ml-12 relative group">
              {/* Timeline Node */}
              <span
                className={cn(
                  "absolute -left-10.25 md:-left-14.25 flex items-center justify-center w-8 h-8 rounded-full ring-8 ring-white",
                  isCompleted ? "bg-[#1E90FF]" : isActive ? "bg-[#1E90FF] ring-[#1E90FF]/20" : "bg-gray-200"
                )}
              >
                {isCompleted ? (
                  <Image src="/icons/check.svg" alt="completed" width={14} height={14} className="text-white invert" />
                ) : (
                  <span className={cn("text-sm font-bold", isActive ? "text-white" : "text-gray-500")}>
                    {module.module_order}
                  </span>
                )}
              </span>

              {/* Module Card */}
              <article
                className={cn(
                  "p-6 rounded-xl border transition-all duration-200 bg-white",
                  isActive ? "border-[#1E90FF] shadow-sm" : "border-gray-200",
                  isLocked && "opacity-50"
                )}
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={cn(
                        "text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-md",
                        isCompleted ? "bg-[#1E90FF]/10 text-[#1E90FF]" : isActive ? "bg-[#1E90FF]/20 text-[#1E90FF]" : "bg-gray-100 text-gray-500"
                      )}>
                        {isCompleted ? "Completed" : isActive ? "Up Next" : "Locked"}
                      </span>
                      <span className="text-sm font-medium flex items-center gap-1 opacity-70">
                        <Image src="/icons/clock.svg" alt="time" width={14} height={14} />
                        {module.duration} mins
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{module.name}</h3>
                    <p className="text-sm opacity-80">{module.topic}</p>
                  </div>

                  <div className="shrink-0 mt-2 md:mt-0">
                    {isActive && (
                      <Link href={`/dashboard/lesson/${module.id}`}>
                        <button className="btn-primary w-full justify-center">
                          Start Lesson
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LearningPathTimeline;