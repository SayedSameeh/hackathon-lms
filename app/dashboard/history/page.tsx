import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { getUserPaths } from "@/lib/actions/curriculum.actions";
import { learningStats } from "@/lib/progress";
import {
  Card,
  EmptyState,
  ModuleRow,
  PageHeader,
} from "@/components/dashboard";

export default async function HistoryPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const paths = await getUserPaths();
  const stats = learningStats(paths);
  const finished = paths
    .map(({ path, modules }) => ({
      path,
      modules: modules.filter((m) => m.is_completed),
    }))
    .filter((p) => p.modules.length > 0);

  return (
    <div className="flex flex-col gap-8 max-w-4xl w-full">
      <PageHeader
        title="Session history"
        description={
          stats.completed
            ? `${stats.completed} lessons completed, ${stats.minutes} minutes learned. Open one to read its notes.`
            : "Lessons you finish will be listed here with their notes."
        }
      />

      {finished.length === 0 ? (
        <EmptyState
          title="No finished sessions yet"
          body="Complete a voice lesson and it lands here with auto-generated notes."
          href="/dashboard"
          cta="Go to your next lesson"
        />
      ) : (
        finished.map(({ path, modules }) => (
          <section key={path.id} className="flex flex-col gap-3">
            <h2 className="text-lg font-bold text-zinc-900 capitalize">
              {path.target_skill}
            </h2>
            <Card className="py-3">
              {modules.map((m) => (
                <ModuleRow
                  key={m.id}
                  id={m.id}
                  order={m.module_order}
                  name={m.name}
                  duration={m.duration}
                  done
                  hasNotes={!!m.session_notes}
                />
              ))}
            </Card>
          </section>
        ))
      )}
    </div>
  );
}
