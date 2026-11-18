import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { getUserPaths } from "@/lib/actions/curriculum.actions";
import { pathProgress } from "@/lib/progress";
import GeneratePathForm from "@/components/GeneratePathForm";
import {
  Card,
  EmptyState,
  ModuleRow,
  PageHeader,
  ProgressBar,
} from "@/components/dashboard";

export default async function LessonsPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const paths = await getUserPaths();
  const interest = (user.unsafeMetadata?.interest as string) ?? "";

  return (
    <div className="flex flex-col gap-10 max-w-4xl w-full">
      <PageHeader
        title="My lessons"
        description="Every learning path you've built, and the lessons inside."
      />

      <section aria-labelledby="new-path" className="flex flex-col gap-3">
        <h2 id="new-path" className="text-lg font-bold text-zinc-900">
          Start a new path
        </h2>
        <GeneratePathForm defaultInterest={interest} />
      </section>

      {paths.length === 0 ? (
        <EmptyState
          title="No paths yet"
          body="Your first path will show up here as soon as you generate it."
        />
      ) : (
        <div className="flex flex-col gap-6">
          {paths.map(({ path, modules }) => {
            const { done, total, percent } = pathProgress(modules);
            return (
              <Card key={path.id} className="flex flex-col gap-4">
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="text-xl font-bold tracking-tight text-zinc-900 capitalize">
                    {path.target_skill}
                  </h2>
                  <span className="text-sm text-zinc-500 tabular-nums shrink-0">
                    {done} of {total} done
                  </span>
                </div>
                <ProgressBar percent={percent} />
                <div>
                  {modules.map((m) => (
                    <ModuleRow
                      key={m.id}
                      id={m.id}
                      order={m.module_order}
                      name={m.name}
                      duration={m.duration}
                      done={m.is_completed}
                      hasNotes={!!m.session_notes}
                    />
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
