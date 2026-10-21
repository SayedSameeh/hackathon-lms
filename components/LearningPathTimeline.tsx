"use client";

import Link from "next/link";
import { CheckCircle2, Circle, Clock, PlayCircle, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Module {
  id: string;
  module_order: number;
  name: string;
  topic: string;
  duration: number;
  is_completed: boolean;
}

export default function LearningPathTimeline({ modules }: { modules: Module[] }) {
  // Find the first incomplete module to mark it as "Up Next"
  const activeIndex = modules.findIndex(m => !m.is_completed);

  return (
    <div className="flex flex-col gap-0 relative w-full">
      {modules.map((module, index) => {
        const isCompleted = module.is_completed;
        const isActive = index === activeIndex;

        return (
          <div key={module.id} className="relative flex gap-6 pb-8 last:pb-0 group">
            
            {/* The Connecting Line */}
            {index !== modules.length - 1 && (
              <div className={cn(
                "absolute left-[19px] top-10 bottom-0 w-[2px] transition-colors duration-500",
                isCompleted ? "bg-primary/50" : "bg-slate-100"
              )} />
            )}

            {/* The Timeline Node / Status Icon */}
            <div className="relative z-10 flex flex-col items-center justify-start pt-2">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 shadow-sm bg-white",
                isCompleted ? "border-primary text-primary" :
                isActive ? "border-primary text-primary shadow-primary/20 bg-primary/5 ring-4 ring-primary/10" :
                "border-slate-200 text-slate-300"
              )}>
                {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : 
                 isActive ? <Circle className="w-4 h-4 fill-primary" /> : 
                 <Lock className="w-4 h-4" />}
              </div>
            </div>

            {/* The Module Card */}
            <div className={cn(
              "flex-1 rounded-2xl border p-6 transition-all duration-300",
              isCompleted ? "bg-slate-50 border-slate-200 opacity-70" :
              isActive ? "bg-white border-primary/30 shadow-md ring-1 ring-primary/5" :
              "bg-white border-slate-100 opacity-50"
            )}>
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-md",
                      isCompleted ? "bg-slate-200 text-slate-600" :
                      isActive ? "bg-primary/10 text-primary" :
                      "bg-slate-100 text-slate-500"
                    )}>
                      Module {module.module_order}
                    </span>
                    {isActive && (
                      <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-md flex items-center gap-1.5 animate-pulse">
                        <PlayCircle className="w-3.5 h-3.5" /> Up Next
                      </span>
                    )}
                  </div>
                  
                  <h3 className={cn(
                    "text-xl font-bold tracking-tight",
                    isCompleted ? "text-slate-700 line-through decoration-slate-300" : "text-slate-900"
                  )}>
                    {module.name}
                  </h3>
                  <p className="text-slate-500 font-medium">{module.topic}</p>
                </div>

                {/* Actions & Metadata */}
                <div className="flex flex-col items-start md:items-end gap-4 min-w-[160px] pt-1">
                   <div className="flex items-center gap-1.5 text-sm font-bold text-slate-400">
                     <Clock className="w-4 h-4" />
                     {module.duration} mins
                   </div>
                   
                   {isActive && (
                     <Link href={`/dashboard/lesson/${module.id}`} className="w-full">
                       <button className="btn-primary w-full py-2.5 text-sm shadow-primary/20">
                         Start Lesson
                       </button>
                     </Link>
                   )}
                   
                   {isCompleted && (
                     <Link href={`/dashboard/lesson/${module.id}`} className="w-full">
                       <button className="w-full py-2.5 text-sm font-bold text-slate-600 bg-slate-200 hover:bg-slate-300 rounded-xl transition-colors">
                         Review Notes
                       </button>
                     </Link>
                   )}
                </div>
                
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}