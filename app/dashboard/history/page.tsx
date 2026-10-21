import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  getUserCompanions,
  getUserSessions,
  getBookmarkedCompanions,
} from "@/lib/actions/companion.actions";
import CompanionsList from "@/components/CompanionsList";
import { History, CheckCircle2, Bot } from "lucide-react";

export default async function HistoryPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const companions = await getUserCompanions(user.id);
  const sessionHistory = await getUserSessions(user.id);
  const bookmarkedCompanions = await getBookmarkedCompanions(user.id);

  return (
    <div className="flex flex-col gap-8 w-full max-w-6xl pb-10">
      
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-primary/10 p-2 rounded-xl">
            <History className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Session History
          </h1>
        </div>
        <p className="text-slate-500 font-medium text-lg max-w-2xl">
          Review your past lessons, generated mentors, and overall progress.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mb-4">
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5">
          <div className="bg-emerald-100 p-4 rounded-full text-emerald-600">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {sessionHistory.length}
            </span>
            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">
              Lessons Completed
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5">
          <div className="bg-blue-100 p-4 rounded-full text-blue-600">
            <Bot className="w-8 h-8" />
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {companions.length}
            </span>
            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">
              Mentors Created
            </span>
          </div>
        </div>

      </div>

      {/* Unified Lists */}
      <div className="flex flex-col gap-12">
        {sessionHistory.length > 0 && (
          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight px-1">Recent Sessions</h2>
            <CompanionsList title="" companions={sessionHistory} classNames="w-full" />
          </section>
        )}

        {companions.length > 0 && (
          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight px-1">My Custom Mentors</h2>
            <CompanionsList title="" companions={companions} classNames="w-full" />
          </section>
        )}

        {bookmarkedCompanions.length > 0 && (
          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight px-1">Bookmarked Mentors</h2>
            <CompanionsList title="" companions={bookmarkedCompanions} classNames="w-full" />
          </section>
        )}
      </div>

    </div>
  );
}