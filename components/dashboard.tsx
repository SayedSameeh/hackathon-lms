import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export const Card = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    className={cn("rounded-2xl border border-stone-200 bg-white p-6", className)}
    {...props}
  />
);

export const PageHeader = ({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) => (
  <header className="flex items-end justify-between gap-6 max-sm:flex-col max-sm:items-start">
    <div className="flex flex-col gap-1.5">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900">
        {title}
      </h1>
      {description && (
        <p className="text-zinc-600 text-base max-w-xl">{description}</p>
      )}
    </div>
    {action}
  </header>
);

export const ProgressBar = ({ percent }: { percent: number }) => (
  <div
    role="progressbar"
    aria-valuenow={percent}
    aria-valuemin={0}
    aria-valuemax={100}
    className="h-1.5 w-full rounded-full bg-stone-200 overflow-hidden"
  >
    <div
      className="h-full rounded-full bg-primary"
      style={{ width: `${percent}%` }}
    />
  </div>
);

export const EmptyState = ({
  title,
  body,
  href,
  cta,
}: {
  title: string;
  body: string;
  href?: string;
  cta?: string;
}) => (
  <Card className="flex flex-col items-center text-center gap-3 py-14">
    <h2 className="text-xl font-bold text-zinc-900">{title}</h2>
    <p className="text-zinc-600 max-w-sm">{body}</p>
    {href && cta && (
      <Link href={href} className="btn-primary mt-2">
        {cta}
      </Link>
    )}
  </Card>
);

export const ModuleRow = ({
  id,
  order,
  name,
  duration,
  done,
  hasNotes,
}: {
  id: string;
  order: number;
  name: string;
  duration: number;
  done: boolean;
  hasNotes?: boolean;
}) => (
  <Link
    href={`/dashboard/lesson/${id}`}
    className="group flex items-center gap-4 rounded-xl px-3 py-3 -mx-3 transition-colors hover:bg-stone-50"
  >
    <span
      className={cn(
        "grid size-8 shrink-0 place-items-center rounded-full text-sm font-bold tabular-nums",
        done ? "bg-primary text-white" : "bg-stone-100 text-zinc-600",
      )}
    >
      {order}
    </span>
    <span className="flex-1 min-w-0">
      <span className="block truncate font-semibold text-zinc-900">{name}</span>
      <span className="flex items-center gap-1.5 text-sm text-zinc-500">
        <Clock className="size-3.5" aria-hidden />
        {duration} min{hasNotes ? " · notes saved" : ""}
      </span>
    </span>
    <ArrowRight
      className="size-4 text-zinc-400 transition-transform group-hover:translate-x-0.5"
      aria-hidden
    />
  </Link>
);
