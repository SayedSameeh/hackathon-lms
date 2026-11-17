// Launch posts, kept as typed data: no CMS and no MDX dependency yet. Move to
// MDX or a CMS when the cadence is more than a post or two a month.

export type Block =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "callout"; title: string; text: string };

export type Post = {
  slug: string;
  title: string;
  description: string;
  tag: "Learning" | "Product" | "Study tips";
  date: string; // ISO
  icon: "brain" | "route" | "mic" | "notebook";
  body: Block[];
};

export const POSTS: Post[] = [
  {
    slug: "how-to-study-effectively",
    title: "How to study effectively: 9 methods that work for any subject",
    description: "A practical guide to studying better, not longer: active recall, spaced repetition, the Feynman technique, a weekly plan and the mistakes that quietly waste your time.",
    tag: "Study tips",
    date: "2026-11-18",
    icon: "brain",
    body: [
      { type: "p", text: "Most students are never taught how to study. They are taught what to study, then left to work out the rest. So they do what feels natural: read the chapter again, highlight the important bits, copy out the notes, and cram the night before. It feels like work, and it is work. It just isn't the kind of work that builds memory." },
      { type: "p", text: "This guide covers nine methods that hold up for almost any subject, from anatomy to algebra to a new language, followed by a weekly plan you can copy, a way to learn a topic from scratch, and the mistakes that waste the most time. You do not need all of it. Pick two or three methods, use them for two weeks, then add more." },

      { type: "h2", text: "Why most studying doesn't work" },
      { type: "p", text: "Rereading and highlighting share one problem: they are passive. Your eyes move over material you have already seen, it feels familiar, and familiarity gets mistaken for knowledge. You recognise the page, so you assume you could produce the answer. Then the exam asks a question with the page closed, and recognition is no use." },
      { type: "p", text: "Cramming has a similar trap. Information held for one night is easy to retrieve that night and mostly gone a week later. If the goal is to pass tomorrow's test and never use the material again, cramming works well enough. If the goal is to understand the subject, it is the most expensive way to study." },
      { type: "callout", title: "The one idea behind everything below", text: "Learning happens when you pull information out of your head, not when you push it in. Every method in this guide is a way of making yourself retrieve, explain, connect or apply, with the material closed." },

      { type: "h2", text: "1. Active recall: test yourself instead of rereading" },
      { type: "p", text: "Active recall means trying to produce an answer from memory before you check it. It is the single most reliable upgrade you can make, and it is simple: close the book and write down everything you remember. Then open the book and see what you missed." },
      { type: "ul", items: ["Turn headings into questions. \"Causes of the French Revolution\" becomes \"What were the main causes, and which mattered most?\"", "Write the question on one side of a card and the answer on the other. Keep each card to one idea.", "Use practice questions and past papers as early as possible, not as a final check.", "After a lecture, spend five minutes writing what you remember before you look at your notes."] },
      { type: "p", text: "It will feel harder than rereading, and that is the point. The effort of retrieving something is what strengthens it. If a session feels easy, you are probably recognising, not recalling." },

      { type: "h2", text: "2. Spaced repetition: review just before you forget" },
      { type: "p", text: "Memory fades over time, and the fade is steepest soon after you learn something. Reviewing at increasing gaps, rather than all at once, makes the memory last far longer for the same total time. This is the idea behind the forgetting curve, first described in the nineteenth century and since confirmed many times in different forms." },
      { type: "p", text: "A common pattern is to review the same day, then the next day, then after about three days, a week, and two weeks. You don't need to be exact. What matters is that each review happens when the material has started to feel a little fuzzy." },
      { type: "ul", items: ["Flashcard apps such as Anki schedule the reviews for you.", "On paper, keep a simple list of topics with the dates you last reviewed them.", "Mark cards you get wrong and see them more often. Retire the ones you always get right."] },

      { type: "h2", text: "3. Interleaving: mix topics instead of blocking them" },
      { type: "p", text: "Blocked practice means doing twenty problems of one type, then twenty of the next. It feels smooth because you can see the pattern. Interleaving means mixing the types in one session, so you have to work out which method each problem needs. That is harder, and it is also what the exam will ask of you." },
      { type: "ul", items: ["In maths and science, shuffle problems from different chapters into one set.", "In languages, mix vocabulary, grammar and listening in a session instead of finishing one before the next.", "For essays, alternate between planning, drafting and editing different pieces."] },
      { type: "p", text: "Expect your accuracy to drop at first. That drop is a sign that you are practising the real skill, not a sign that it isn't working." },

      { type: "h2", text: "4. The Feynman technique: explain it simply" },
      { type: "p", text: "Named after the physicist Richard Feynman, this method is a fast way to find out whether you understand something or only recognise the words. The whole technique fits in four steps." },
      { type: "ol", items: ["Pick one concept and write its name at the top of a blank page.", "Explain it in plain language, as if to a curious twelve-year-old. No jargon unless you can define it.", "Notice where you stall, hand-wave or reach for a technical term you can't explain. Those are your gaps.", "Go back to the source for those gaps only, then explain it again from the top."] },
      { type: "p", text: "You can do this alone, with a friend, or out loud to an empty room. Saying it aloud matters: it forces you to commit to full sentences, which silent thinking lets you skip." },

      { type: "h2", text: "5. Elaboration: connect new ideas to what you know" },
      { type: "p", text: "Facts with nothing to attach to are hard to hold. Facts connected to things you already understand are much easier to keep and to rebuild when a detail goes missing. Elaboration is the habit of asking how a new idea relates to something familiar." },
      { type: "ul", items: ["Ask \"why?\" and \"how does this connect to what I already know?\" after every new idea.", "Make an analogy from something you love. Sport, cooking, games and music all hide the same structures as many school subjects.", "Compare two ideas that look similar and write down exactly how they differ.", "Link new material to a concrete example you can picture."] },
      { type: "p", text: "Analogies are a bridge, not the destination. Use one to get in, then check where it breaks down, because the places where it fails are often where the real concept lives." },

      { type: "h2", text: "6. Practise under exam conditions" },
      { type: "p", text: "Doing a practice paper with your notes open is a different activity from doing it in the real format. Closed-book, timed practice shows you what you can actually retrieve and how you behave under pressure, and it makes the real thing less strange." },
      { type: "ul", items: ["Do at least a few full papers in the real time limit, with no notes.", "Mark them honestly, and keep a list of the mistakes by type: knowledge gap, careless slip, ran out of time.", "Fix the biggest category first. Most students find that one type of mistake causes most of their lost marks."] },
      { type: "callout", title: "Treat wrong answers as the point", text: "A question you get wrong in practice is the cheapest mistake you will ever make. Write down why it was wrong, then try a similar question a few days later." },

      { type: "h2", text: "7. Protect your focus" },
      { type: "p", text: "Two hours of focused study beat five hours of study with your phone beside you. Switching between tasks has a cost every time, and notifications are designed to cause switches." },
      { type: "ul", items: ["Study in blocks of 25 to 50 minutes with a clear goal for each block, then take a real break of five to ten minutes. The Pomodoro method is one popular version of this.", "Put your phone in another room, not just face down on the desk.", "Decide the goal of a block before you start: \"do the five questions on chapter 4\" works, \"study chemistry\" doesn't.", "Keep a notepad nearby for stray thoughts, so you can park them instead of chasing them.", "Use your best hours for your hardest subject. Most people have a clear peak in their day."] },

      { type: "h2", text: "8. Sleep, movement and food are part of studying" },
      { type: "p", text: "Sleep is when much of what you learned gets consolidated, so cutting it to fit in more study is usually a bad trade. The same goes for the basics: regular meals, water, and some movement each day. None of this is a trick, but all of it affects how well your focus and memory work when you sit down." },
      { type: "ul", items: ["Aim for a regular sleep schedule, especially in the week before an exam.", "Avoid all-nighters. A tired brain retrieves poorly, and the extra hours rarely make up for it.", "A short walk between study blocks is a good way to reset."] },

      { type: "h2", text: "9. Take notes that help you recall" },
      { type: "p", text: "The best notes are not a copy of the textbook. They are a tool for testing yourself later. If your notes are long and neat but you never use them, they are decoration." },
      { type: "ul", items: ["Write in your own words. Copying forces no thinking, rephrasing does.", "Leave a margin and add questions the notes answer. Later, cover the notes and answer the questions.", "Try the Cornell layout: notes on the right, cues and questions on the left, and a two-line summary at the bottom.", "Keep them short. If it's a page, it's probably a summary of a summary you could have drawn as a diagram."] },
      { type: "p", text: "Diagrams and sketches are worth using for processes and systems. Drawing a cycle, a timeline or a flow from memory is active recall with a picture attached." },

      { type: "h2", text: "A simple weekly study plan" },
      { type: "p", text: "Methods only work if they fit into a week. This plan is deliberately modest. Adjust the times to your schedule, then keep it for two weeks before changing anything." },
      { type: "ol", items: ["Sunday, 20 minutes: list the week's topics and the dates of any tests. Pick one goal per subject.", "Monday to Friday, 2 or 3 focused blocks per day: one new topic block, one review block of older material using flashcards or questions, and one practice block mixing topics.", "Every study day, 5 minutes at the end: write down three things you remember without looking, and one thing you don't.", "Saturday, 45 minutes: do a timed set of practice questions without notes, then mark it and write down your mistakes.", "Sleep properly and take at least one proper rest day. Rest is part of the plan."] },

      { type: "h2", text: "How to learn a topic from scratch" },
      { type: "p", text: "Starting a brand new subject is where most people stall, because the whole thing looks huge. The fix is to make it smaller before you start." },
      { type: "ol", items: ["Write one sentence about what you want to be able to do when you're done. \"Read a balance sheet\" is a goal. \"Learn accounting\" is a mood.", "Skim two or three good sources to see the shape of the topic. Don't try to learn anything yet.", "Cut it into three to five pieces, in the order each one depends on the last.", "Take one piece at a time. Learn it, test yourself on it, then explain it out loud.", "Start practising early, with real problems or a small project, instead of waiting until you feel ready.", "Review earlier pieces on a spaced schedule as you move forward."] },
      { type: "p", text: "That structure is exactly why Converso builds a learning path of three to five short modules and has you talk through each one. If you'd like to see it applied to a topic you're stuck on, you can start a path in under a minute." },

      { type: "h2", text: "Common mistakes that waste study time" },
      { type: "ul", items: ["Rereading and highlighting as the main method.", "Studying one subject for hours at a stretch instead of mixing and spacing it.", "Spending most of the time on topics you already know, because they feel good.", "Making beautiful notes you never test yourself on.", "Studying with your phone nearby and counting the time anyway.", "Leaving practice papers until the final week.", "Cutting sleep to fit in more hours.", "Planning in hours instead of goals, so a long session can end with nothing done."] },

      { type: "h2", text: "Quick answers to common questions" },
      { type: "ul", items: ["How many hours a day should I study? It depends on your goals and age, but focused hours matter far more than total hours. Three good blocks usually beat six distracted ones.", "What is the best time of day? Whenever you are most alert. Use that time for your hardest subject.", "Should I listen to music? Music without lyrics works for many people, but anything that competes with reading or writing tends to hurt. Test it for yourself on a hard task.", "Is it better to study alone or in a group? Alone for learning new material, in a group for testing each other and explaining ideas. Both have a place.", "How do I stop procrastinating? Make the first step tiny. \"Open the textbook and do one question\" is easier to start than \"study chemistry\", and starting is most of the work.", "How do I remember what I read? Stop after each section and say or write the main idea from memory. If you can't, read it again with that question in mind."] },

      { type: "h2", text: "Start small, then build" },
      { type: "p", text: "You don't need a perfect system. You need a better habit than the one you have now. This week, replace one hour of rereading with one hour of self-testing, and say one topic out loud as if you were teaching it. Notice where you stall, fix only that, and repeat." },
      { type: "callout", title: "Try this today", text: "Pick something you studied this week. Close everything and write down all you remember in five minutes. Then check your notes. What you missed is exactly what to study next." },
    ],
  },
  {
    slug: "learn-through-what-you-love",
    title: "Why explaining things through your hobby makes them stick",
    description: "New ideas stick when they hang on something you already know. Here is how to use that on purpose.",
    tag: "Learning",
    date: "2026-11-03",
    icon: "brain",
    body: [
      { type: "p", text: "Most of us have had the experience of not understanding a concept for weeks, then getting it in thirty seconds when someone said, “it’s like…”. That sentence did something the textbook could not: it attached a new idea to something you already understood." },
      { type: "h2", text: "A new idea needs somewhere to land" },
      { type: "p", text: "A concept with nothing to connect to has to be held in memory as a bare fact. A concept attached to something familiar can be rebuilt from that familiar thing, even when the details fade. That is the whole job of an analogy." },
      { type: "h2", text: "Your interest is a ready-made library of examples" },
      { type: "p", text: "If you love Formula 1, you already understand telemetry, tyre strategy, pit stops and lap times. Those are loops, state, queues and counters in disguise. If you bake, you already understand timing, ratios, proving and iteration." },
      { type: "ul", items: ["State in React is the live telemetry on the pit wall.", "A loop in Python is kneading: the same fold until the dough is smooth.", "Pacing in a talk is tyre management: don’t spend everything in the first stint."] },
      { type: "h2", text: "How to do it yourself" },
      { type: "ul", items: ["Pick the one concept you are stuck on, not the whole topic.", "Name three things you know well from something you love.", "Ask which of them behaves like the concept, and where the comparison breaks.", "Say the analogy out loud, then say where it fails. The failure points are where the real concept lives."] },
      { type: "callout", title: "Analogies are a bridge, not the destination", text: "Use the comparison to get in, then drop it. If you keep leaning on it, you will start to believe the concept works exactly like your hobby, and it never quite does." },
      { type: "p", text: "That is the idea behind Converso: you name the skill and the thing you love, and the coach explains with it, then checks that you understood the real concept, not just the comparison." },
    ],
  },
  {
    slug: "learn-a-skill-in-five-modules",
    title: "How to break any skill into three to five modules",
    description: "A skill feels huge until you split it. A short method for cutting it into pieces you can finish.",
    tag: "Study tips",
    date: "2026-11-10",
    icon: "route",
    body: [
      { type: "p", text: "“Learn Python” is not a plan. It is a mood. A plan has an order, a size and a finish line. Here is a way to turn a big skill into a short path you will actually complete." },
      { type: "h2", text: "Start from what you want to do" },
      { type: "p", text: "Write one sentence about what you want to be able to do when you are done: “automate my spreadsheet”, “give a five-minute talk without notes”, “edit a photo so it looks the way I saw it”. Every module has to earn its place against that sentence." },
      { type: "h2", text: "Cut it into three to five pieces" },
      { type: "ul", items: ["Fewer than three and each piece is still too big to finish in a sitting.", "More than five and you spend more time managing the plan than learning.", "Each piece should be something you can explain to someone else when it is done."] },
      { type: "h2", text: "Order by dependency, not by difficulty" },
      { type: "p", text: "Put first the thing every later piece uses. In programming that is variables before loops before functions. In photography it is light before composition before editing. If you can swap two modules and nothing breaks, their order doesn’t matter. If something breaks, the broken one goes second." },
      { type: "h2", text: "Keep each module short" },
      { type: "p", text: "A module you can finish in one focused session gets finished. A module that needs a whole weekend gets postponed. When a piece runs long, that is a sign it is really two." },
      { type: "callout", title: "A check before you begin", text: "Read your list of modules as a sentence: “First I learn A, so I can do B, which lets me do C.” If the sentence doesn’t make sense, the order is wrong." },
    ],
  },
  {
    slug: "why-saying-it-out-loud-works",
    title: "Say it out loud: why talking finds the gaps reading hides",
    description: "Reading feels like understanding. Explaining shows whether you actually have it.",
    tag: "Learning",
    date: "2026-11-14",
    icon: "mic",
    body: [
      { type: "p", text: "You can read a page three times and feel certain you understand it. Then someone asks one question and the certainty disappears. Reading is comfortable because it never asks you to produce anything." },
      { type: "h2", text: "Explaining forces you to produce" },
      { type: "p", text: "When you say an idea aloud, you have to pick the first word, the next word, the order. Wherever you stall, hedge or reach for “the thing that…”, that is a gap. Silent reading lets those gaps stay hidden." },
      { type: "h2", text: "A conversation adds the missing ingredient: a response" },
      { type: "p", text: "Explaining to yourself helps. Explaining to someone who asks “why?” helps more, because a good question lands right where your explanation is thin." },
      { type: "ul", items: ["Explain the idea in plain words, with no jargon.", "Notice where you slow down. Mark it.", "Go back to the source only for those marked spots.", "Say it again, start to finish."] },
      { type: "h2", text: "What this looks like in a voice session" },
      { type: "p", text: "In Converso the coach listens, asks a follow-up where your answer was thin, and moves on when you have it. You can interrupt, ask again and change direction mid-sentence, which is hard to do with a video." },
      { type: "callout", title: "Try it today", text: "Pick something you studied this week. Set a timer for two minutes and explain it out loud without notes. Whatever you couldn’t explain is your next thing to study." },
    ],
  },
  {
    slug: "how-converso-builds-your-path",
    title: "How Converso builds your learning path and writes your notes",
    description: "From a skill and an interest to a path, a voice session and a saved summary. What happens at each step.",
    tag: "Product",
    date: "2026-11-18",
    icon: "notebook",
    body: [
      { type: "p", text: "Converso has one job: take what you want to learn and what you already love, and turn them into a short path you can talk your way through. Here is what happens, in order." },
      { type: "h2", text: "1. You name a skill and an interest" },
      { type: "p", text: "That is the whole form. A skill (“React hooks”) and something you care about (“Formula 1”). There are no placement quizzes and no long onboarding." },
      { type: "h2", text: "2. A path of three to five modules is generated" },
      { type: "p", text: "Converso asks a language model for a short ordered path. Each module has a name, a topic and a duration. The path is saved to your account and your dashboard opens on it." },
      { type: "h2", text: "3. You talk through a module" },
      { type: "p", text: "Each module is a live voice session in the browser. The coach explains with analogies from your interest, listens to your answers and asks follow-ups. You end the session when you are done." },
      { type: "h2", text: "4. The module is marked complete and your notes are written" },
      { type: "p", text: "When you hang up, the module is ticked off. The conversation is summarised into Markdown notes, and the full transcript is attached underneath. You can reopen the lesson later and read what was said." },
      { type: "callout", title: "What it is not", text: "Converso is an AI tutor. It can make mistakes, and it is not a substitute for certified instruction. Check anything important against a trusted source." },
    ],
  },
];

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);
export const TAGS = ["All", ...Array.from(new Set(POSTS.map((p) => p.tag)))] as const;

export function readingMinutes(p: Post) {
  const words = p.body.map((b) => ("text" in b ? b.text : b.type === "ul" || b.type === "ol" ? b.items.join(" ") : "")).join(" ").split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
