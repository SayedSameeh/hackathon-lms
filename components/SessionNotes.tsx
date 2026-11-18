import ReactMarkdown from "react-markdown";
import { Card } from "@/components/dashboard";

export default function SessionNotes({ markdown }: { markdown: string }) {
  return (
    <Card className="p-6 md:p-10">
      <div className="prose prose-zinc max-w-none prose-headings:tracking-tight">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </Card>
  );
}
