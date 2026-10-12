'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createLearningPath } from '@/lib/actions/curriculum.actions';

export default function GeneratePathForm() {
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    try {
      setIsGenerating(true);
      // Calls the server action to hit Groq and insert into Supabase
      await createLearningPath(topic);
      
      setTopic('');
      // Refresh the page to fetch the newly created data from the server
      router.refresh(); 
    } catch (error) {
      console.error("Failed to generate path", error);
      // Optional: Add a toast notification here for the hackathon UI
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <form onSubmit={handleGenerate} className="flex w-full max-w-2xl gap-2 max-sm:flex-col">
      <input 
        type="text" 
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="e.g., Next.js Architecture, Advanced Cyber Security..." 
        className="flex-1 px-6 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E90FF] text-black"
        disabled={isGenerating}
      />
      <button 
        type="submit" 
        disabled={isGenerating || !topic.trim()}
        className="btn-primary px-8 py-4 justify-center disabled:opacity-50"
      >
        {isGenerating ? 'Generating...' : 'Generate Path'}
      </button>
    </form>
  );
}