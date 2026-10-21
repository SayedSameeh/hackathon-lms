'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createLearningPath } from '@/lib/actions/curriculum.actions';

export default function GeneratePathForm() {
  const [topic, setTopic] = useState('');
  const [interest, setInterest] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    try {
      setIsGenerating(true);
      await createLearningPath(topic, interest);
      setTopic('');
      setInterest('');
      router.refresh(); 
    } catch (error) {
      console.error("Failed to generate path", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <form onSubmit={handleGenerate} className="flex flex-col w-full max-w-2xl gap-3">
      <div className="flex w-full gap-2 max-sm:flex-col">
        <input 
          type="text" 
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Topic: e.g., Next.js Architecture" 
          className="flex-2 px-6 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E90FF] text-black"
          disabled={isGenerating}
        />
        <input 
          type="text" 
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          placeholder="Explain it using: e.g., Formula 1, Marvel, Cooking" 
          className="flex-1 px-6 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E90FF] text-black"
          disabled={isGenerating}
        />
      </div>
      <button 
        type="submit" 
        disabled={isGenerating || !topic.trim()}
        className="btn-primary px-8 py-4 justify-center disabled:opacity-50 w-full"
      >
        {isGenerating ? 'Generating Roadmap...' : 'Generate Path'}
      </button>
    </form>
  );
}