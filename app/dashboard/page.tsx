import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ArrowRight, Clock } from "lucide-react";
import { getUserPaths } from "@/lib/actions/curriculum.actions";
import { learningStats, pathProgress } from "@/lib/progress";
import GeneratePathForm from "@/components/GeneratePathForm";
import {
  Card,
  ModuleRow,
  PageHeader,
  ProgressBar,
} from "@/components/dashboard";

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const paths = await getUserPaths();
  const interest = (user.unsafeMetadata?.interest as string) ?? "";

  if (paths.length === 0) {
    return (
      <div className="flex flex-col gap-8 max-w-3xl w-full">
        <PageHeader
          title={`Welcome${user.firstName ? `, ${user.firstName}` : ""}`}
          description="Tell us what you want to learn and we'll build a short path of voice lessons around it."
        />
        <GeneratePathForm defaultInterest={interest} />
      </div>
    );
  }

  const stats = learningStats(paths);
  // Active path = newest path that still has something left to learn
  const active =
    paths.find((p) => pathProgress(p.modules).next) ?? paths[0];
  const { next, percent, done, total } = pathProgress(active.modules);

  const tiles = [
    { label: "Lessons completed", value: `${stats.completed}/${stats.total}` },
    { label: "Minutes learned", value: stats.minutes },
    { label: "Learning paths", value: stats.paths },
    { label: "Overall progress", value: `${stats.percent}%` },
  ];

  return (
    <div className="flex flex-col gap-8 max-w-5xl w-full">
      <PageHeader
        title={`Hi${user.firstName ? `, ${user.firstName}` : ""}`}
        description="Pick up where you left off."
      />

      <dl className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {tiles.map((t) => (
          <Card key={t.label} className="p-5">
            <dt className="text-sm text-zinc-500">{t.label}</dt>
            <dd className="mt-1 text-3xl font-bold tracking-tight tabular-nums text-zinc-900">
              {t.value}
            </dd>
          </Card>
        ))}
      </dl>

      {next ? (
        <section className="rounded-2xl bg-[#09090b] p-8 text-white flex flex-col gap-5">
          <p className="text-sm font-medium text-primary">Up next</p>
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              {next.name}
            </h2>
            <p className="text-zinc-400 max-w-2xl">{next.topic}</p>
          </div>
          <div className="flex items-center gap-6 max-sm:flex-col max-sm:items-start">
            <Link href={`/dashboard/lesson/${next.id}`} className="btn-primary">
              Start lesson
              <ArrowRight className="size-4 ml-2" aria-hidden />
            </Link>
            <span className="flex items-center gap-1.5 text-sm text-zinc-400">
              <Clock className="size-4" aria-hidden />
              {next.duration} min
            </span>
          </div>
        </section>
      ) : (
        <Card className="flex items-center justify-between gap-4 max-sm:flex-col max-sm:items-start">
          <div>
            <h2 className="text-xl font-bold text-zinc-900">Path complete</h2>
            <p className="text-zinc-600">
              You finished every lesson in {active.path.target_skill}.
            </p>
          </div>
          <Link href="/dashboard/lesson" className="btn-primary">
            Start a new path
          </Link>
        </Card>
      )}

      <section className="flex flex-col gap-4">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 capitalize">
            {active.path.target_skill}
          </h2>
          <span className="text-sm text-zinc-500 tabular-nums">
            {done} of {total} lessons
          </span>
        </div>
        <ProgressBar percent={percent} />
        <Card className="py-3">
          {active.modules.map((m) => (
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
        </Card>
        <Link
          href="/dashboard/lesson"
          className="text-sm font-semibold text-primary hover:underline w-fit"
        >
          All paths and new path
        </Link>
      </section>
    </div>
  );
}
