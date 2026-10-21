'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createLearningPath } from '@/lib/actions/curriculum.actions';
import { Loader2, Target, Lightbulb, ArrowRight } from 'lucide-react';

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
    <form onSubmit={handleGenerate} className="flex flex-col w-full max-w-3xl gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
      <div className="flex w-full gap-4 max-sm:flex-col">
        
        {/* Topic Input */}
        <div className="relative flex-[3]">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Target className="h-5 w-5 text-slate-400" />
          </div>
          <input 
            type="text" 
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="What do you want to learn? (e.g. Next.js Architecture)" 
            className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-semibold placeholder:font-medium placeholder:text-slate-400"
            disabled={isGenerating}
          />
        </div>
        
        {/* Interest Input */}
        <div className="relative flex-[2]">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Lightbulb className="h-5 w-5 text-slate-400" />
          </div>
          <input 
            type="text" 
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            placeholder="Analogy (e.g. Formula 1, Cooking)" 
            className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-semibold placeholder:font-medium placeholder:text-slate-400"
            disabled={isGenerating}
          />
        </div>
      </div>
      
      {/* Submit Button */}
      <button 
        type="submit" 
        disabled={isGenerating || !topic.trim()}
        className="btn-primary w-full py-4 text-lg mt-2 group"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            Architecting your curriculum...
          </>
        ) : (
          <>
            Generate Personalized Path
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>
    </form>
  );
}