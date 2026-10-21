'use server';

import Groq from 'groq-sdk';
import { createSupabaseClient } from '../supabase';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

interface Message {
  role: string;
  content: string;
}

export const generateSessionNotes = async (moduleId: string, topic: string, transcript: Message[]) => {
    // 1. Format the transcript into a readable string
    const formattedTranscript = transcript
        .reverse() // Reverse it if your UI state holds newest messages first
        .map(m => `**${m.role === 'assistant' ? 'AI Mentor' : 'Student'}**: ${m.content}`)
        .join('\n\n');

    const prompt = `You are an expert technical tutor. Based on the following transcript of a live teaching session about "${topic}", generate a structured study guide in Markdown format.

    Include exactly these sections:
    # 📝 Session Summary
    (A concise bulleted list of the core technical concepts actually discussed)

    # 💡 Key Takeaways
    (2-3 main lessons the student learned)

    # 🔗 Recommended Resources
    (3-4 specific concepts, tools, or official docs the student should look up next to master this)

    Here is the live session transcript to analyze:
    ${formattedTranscript}
    `;

    try {
        // 2. Generate the summary using Mixtral
        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'openai/gpt-oss-120b', 
            temperature: 0.3, // Low temperature for factual summarization
        });

        const markdownSummary = chatCompletion.choices[0]?.message?.content;
        if (!markdownSummary) throw new Error("No content generated");

        // 3. Compile the final complete document
        const finalDocument = `${markdownSummary}\n\n---\n\n# 🎙️ Full Session Transcript\n\n${formattedTranscript}`;

        // 4. Save it to the database
        const supabase = createSupabaseClient();
        const { error } = await supabase
            .from('path_modules')
            .update({ session_notes: finalDocument })
            .eq('id', moduleId);

        if (error) throw new Error(error.message);

        return finalDocument;

    } catch (error) {
        console.error("Failed to generate notes:", error);
        throw new Error("Failed to compile session notes.");
    }
}