import { Brain, NotebookPen, Mic, Route } from "lucide-react";
import type { Post } from "@/lib/blog";

const ICONS = { brain: Brain, route: Route, mic: Mic, notebook: NotebookPen };
// Generated cover: warm gradient + one large icon. No stock imagery, nothing to license.
const GROUNDS = [
  "from-[#fe5933] via-[#ff7a52] to-[#ffb36b]",
  "from-[#18181b] via-[#27272a] to-[#fe5933]",
  "from-[#ffb36b] via-[#ff7a52] to-[#fe5933]",
  "from-[#27272a] via-[#18181b] to-[#09090b]",
];

export default function PostCover({ post, index = 0, className = "" }: { post: Post; index?: number; className?: string }) {
  const Icon = ICONS[post.icon];
  return (
    <div aria-hidden className={`relative isolate grid place-items-center overflow-hidden bg-gradient-to-br ${GROUNDS[index % GROUNDS.length]} ${className}`}>
      <div className="absolute inset-0 -z-10 opacity-30 [background-image:radial-gradient(rgb(255_255_255/0.5)_1px,transparent_1px)] [background-size:18px_18px]" />
      <Icon className="size-1/3 min-w-10 text-white/95 transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-110 group-hover:-rotate-6" strokeWidth={1.5} />
    </div>
  );
}
