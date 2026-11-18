'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createLearningPath } from '@/lib/actions/curriculum.actions';
import { Loader2, ArrowRight } from 'lucide-react';

export default function GeneratePathForm({ defaultInterest = '' }: { defaultInterest?: string }) {
  const [topic, setTopic] = useState('');
  const [interest, setInterest] = useState(defaultInterest);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    try {
      setIsGenerating(true);
      setError('');
      await createLearningPath(topic.trim(), interest.trim());
      setTopic('');
      router.refresh();
    } catch (err) {
      console.error('Failed to generate path', err);
      setError('Could not build your path. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <form
      onSubmit={handleGenerate}
      className="flex flex-col gap-4 rounded-2xl border border-stone-200 bg-white p-6"
    >
      <div className="grid gap-4 md:grid-cols-[3fr_2fr]">
        <label className="flex flex-col gap-1.5 text-sm font-medium text-zinc-700">
          What do you want to learn?
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Next.js architecture"
            className="input"
            disabled={isGenerating}
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-zinc-700">
          Explain it through
          <input
            type="text"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            placeholder="e.g. Formula 1, cooking"
            className="input"
            disabled={isGenerating}
          />
        </label>
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isGenerating || !topic.trim()}
        className="btn-primary w-full md:w-fit md:self-end"
      >
        {isGenerating ? (
          <>
            <Loader2 className="size-4 animate-spin mr-2" aria-hidden />
            Building your path…
          </>
        ) : (
          <>
            Generate path
            <ArrowRight className="size-4 ml-2" aria-hidden />
          </>
        )}
      </button>
    </form>
  );
}
