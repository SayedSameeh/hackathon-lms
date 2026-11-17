# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Hackathon LMS ("Converso" in the UI): an AI voice-tutoring app built on Adrian Hajdin / JavaScript Mastery's `saas-app` (https://github.com/adrianhajdin/saas-app), extended with AI-generated learning paths, interest-based analogies, and auto-generated session notes. Stack: Next.js 16 (App Router, React 19, Turbopack), TypeScript, Supabase, Clerk (auth + billing), Vapi (voice), Groq (LLM), Sentry, Tailwind v4, shadcn/ui (`base-luma` style, components in `components/ui`).

## Commands

pnpm is the active package manager (`pnpm-lock.yaml`, `pnpm-workspace.yaml`); a stale `package-lock.json` also exists and the README says `npm`.

- `pnpm dev` — dev server (Turbopack) at http://localhost:3000
- `pnpm build` / `pnpm start`
- `pnpm lint` — `next lint`
- Type check: `pnpm exec tsc --noEmit`

There is no test suite. Note `next.config.ts` sets `typescript.ignoreBuildErrors` and `eslint.ignoreDuringBuilds`, so `build` succeeding does not mean the code type-checks or lints clean — run `tsc`/`lint` explicitly.

## Environment

Copy `.env.example` to `.env.local`. Besides the vars listed there (Clerk, Supabase, Vapi, Sentry), `GROQ_API_KEY` is required by `lib/actions/curriculum.actions.ts` and `lib/actions/notes.actions.ts` but is missing from `.env.example`.

## Architecture

**Data access is all server actions** in `lib/actions/*.actions.ts` (`'use server'`), called directly from server components and client components. There are no API routes besides the Sentry example.

**Supabase + Clerk auth:** `lib/supabase.ts` `createSupabaseClient()` uses the anon key and passes the Clerk session token via `accessToken()`, so Supabase RLS sees the Clerk user (Clerk third-party auth integration). It calls Clerk's server `auth()`, so it only works server-side. User IDs stored in tables (`author`, `user_id`) are Clerk user IDs. There are no migrations in the repo; the schema lives in Supabase.

**Route protection:** `middleware.ts` protects `/dashboard(.*)` via `clerkMiddleware`. Plan/feature gating uses Clerk Billing `has({ plan })` / `has({ feature })` (see `newCompanionPermissions`).

**Two learning models coexist:**
1. *Companions* (original app) — tables `companions`, `session_history`, `bookmarks`; `companion.actions.ts`. Still used by `/dashboard/history`, `CompanionCard`, `CompanionForm`.
2. *Learning paths* (hackathon addition, the main dashboard flow) — tables `learning_paths` (`target_skill`, `user_interest`) and `path_modules` (`module_order`, `name`, `topic`, `duration`, `is_completed`, `session_notes`). `curriculum.actions.ts` asks Groq (`openai/gpt-oss-120b`, JSON mode) for 3–5 modules, then inserts the path and its modules. `/dashboard` shows the user's most recent path (`getActiveLearningPath`); `LearningPathTimeline` links to `/dashboard/lesson/module-<id>`, and the lesson page strips the `module-` prefix.

**Voice session flow** (`components/CompanionComponent.tsx`, client): a singleton Vapi client (`lib/vapi.sdk.ts`) starts a call with the assistant built by `configureAssistant()` in `lib/utils.ts`. That function holds the tutor system prompt (Deepgram transcriber, 11labs voice from `constants` `voices[voice][style]`, OpenAI model); the prompt uses `{{topic}}`, `{{subject}}`, `{{style}}`, `{{userInterest}}` templates, filled at call time via `variableValues` overrides. Final transcripts accumulate in state (newest first). On `call-end`: with a `moduleId`, it marks the module completed and calls `generateSessionNotes` (Groq summarizes the transcript into Markdown, appends the full transcript, saves to `path_modules.session_notes`, rendered with `react-markdown`); with a `companionId`, it records `session_history`.

**Types:** global ambient types (`Companion`, `CreateCompanion`, `SavedMessage`, …) are declared in `types/index.d.ts` without imports — use them directly.

**Sentry:** configured via `instrumentation.ts`, `instrumentation-client.ts`, `sentry.*.config.ts`, and `withSentryConfig` in `next.config.ts`.
