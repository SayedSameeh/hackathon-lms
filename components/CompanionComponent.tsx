"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Lightbulb, Loader2, Mic, MicOff, PhoneOff } from "lucide-react";
import { cn, configureAssistant } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import { addToSessionHistory } from "@/lib/actions/companion.actions";
import { markModuleCompleted } from "@/lib/actions/curriculum.actions";
import { generateSessionNotes } from "@/lib/actions/notes.actions";
import SessionNotes from "@/components/SessionNotes";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface CompanionComponentProps {
  companionId?: string;
  moduleId?: string;
  subject: string;
  topic: string;
  name: string;
  userName: string;
  userImage: string;
  style: string;
  voice: string;
  userInterest: string;
}

const formatTime = (s: number) =>
  `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

const CompanionComponent = ({
  companionId,
  moduleId,
  subject,
  topic,
  name,
  userName,
  userImage,
  style,
  voice,
  userInterest,
}: CompanionComponentProps) => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  // Newest first: generateSessionNotes expects this order
  const [messages, setMessages] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [seconds, setSeconds] = useState(0);

  const [isGeneratingNotes, setIsGeneratingNotes] = useState(false);
  const [sessionNotes, setSessionNotes] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  // Session clock
  useEffect(() => {
    if (callStatus !== CallStatus.ACTIVE) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [callStatus]);

  // Keep the newest line in view
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length]);

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);

    const onCallEnd = async () => {
      setCallStatus(CallStatus.FINISHED);
      setIsSpeaking(false);

      // An empty session shouldn't count as a completed lesson
      if (messages.length === 0) return;

      if (moduleId) {
        await markModuleCompleted(moduleId);

        setIsGeneratingNotes(true);
        try {
          setSessionNotes(await generateSessionNotes(moduleId, topic, messages));
        } catch (err) {
          console.error(err);
        } finally {
          setIsGeneratingNotes(false);
        }
      } else if (companionId) {
        await addToSessionHistory(companionId);
      }
    };

    const onMessage = (message: any) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [newMessage, ...prev]);
      }
    };

    const onError = (err: Error) => {
      console.log("Error", err);
      setError("We couldn't start the voice session. Check your microphone permission and try again.");
      setCallStatus(CallStatus.INACTIVE);
    };

    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("error", onError);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("error", onError);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
    };
  }, [moduleId, companionId, topic, messages]);

  const toggleMicrophone = () => {
    const next = !vapi.isMuted();
    vapi.setMuted(next);
    setIsMuted(next);
  };

  const handleCall = () => {
    setError("");
    setSeconds(0);
    setCallStatus(CallStatus.CONNECTING);

    const assistantOverrides = {
      variableValues: { subject, topic, style, userInterest },
      clientMessages: ["transcript"],
      serverMessages: [],
    };

    // @ts-expect-error
    vapi.start(configureAssistant(voice, style), assistantOverrides);
  };

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  // After the call: notes take over the whole panel
  if (callStatus === CallStatus.FINISHED && moduleId) {
    if (isGeneratingNotes) {
      return (
        <div
          role="status"
          className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-stone-200 bg-white py-24 text-zinc-600"
        >
          <Loader2 className="size-8 animate-spin text-primary" aria-hidden />
          <p className="font-semibold text-zinc-900">Writing your session notes…</p>
        </div>
      );
    }
    return (
      <div className="flex flex-col gap-4">
        {sessionNotes ? (
          <SessionNotes markdown={sessionNotes} />
        ) : (
          <p className="rounded-2xl border border-stone-200 bg-white p-8 text-zinc-600">
            {messages.length === 0
              ? "That session ended before you said anything, so nothing was saved."
              : "Your lesson is saved, but the notes couldn't be generated."}
          </p>
        )}
        <Link href="/dashboard" className="btn-primary w-fit">
          Back to overview
        </Link>
      </div>
    );
  }

  const live = callStatus === CallStatus.ACTIVE;
  const status =
    callStatus === CallStatus.CONNECTING
      ? "Connecting…"
      : live
        ? isSpeaking
          ? `${name} is speaking`
          : isMuted
            ? "Microphone off"
            : "Listening"
        : "Ready when you are";

  const chronological = [...messages].reverse();

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:h-[34rem]">
      {/* Stage */}
      <section
        aria-label="Voice session"
        className="relative flex flex-col items-center justify-between gap-6 overflow-hidden rounded-3xl bg-[#09090b] px-6 py-8 text-white min-h-[26rem]"
      >
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 transition-opacity duration-700",
            live ? "opacity-100" : "opacity-50",
          )}
          style={{
            background:
              "radial-gradient(50% 45% at 50% 38%, rgb(254 89 51 / 0.32), transparent 70%)",
          }}
        />

        <div className="relative flex w-full items-center justify-between text-sm">
          <span className="flex items-center gap-2 text-zinc-400">
            <span
              className={cn(
                "size-2 rounded-full",
                live ? "bg-emerald-400" : "bg-zinc-600",
              )}
            />
            {live ? "Live" : "Not started"}
          </span>
          <span className="tabular-nums text-zinc-400">{formatTime(seconds)}</span>
        </div>

        <div className="relative flex flex-col items-center gap-5 text-center">
          <span
            className={cn(
              "eq-orb transition-transform duration-500",
              isSpeaking && "scale-105",
              !isSpeaking && "[&>i]:[animation-play-state:paused]",
            )}
            style={{ fontSize: "11rem", width: "0.74em", height: "0.74em" }}
            aria-hidden
          >
            <i /><i /><i /><i /><i />
          </span>
          <div className="flex flex-col gap-1">
            <p className="text-xl font-semibold tracking-tight">{name}</p>
            <p role="status" aria-live="polite" className="text-sm text-zinc-400">
              {status}
            </p>
          </div>
        </div>

        <div className="relative flex w-full flex-col items-center gap-4">
          {error && (
            <p role="alert" className="text-center text-sm text-red-400">
              {error}
            </p>
          )}
          {callStatus === CallStatus.INACTIVE && userInterest && (
            <p className="flex items-center gap-2 text-sm text-zinc-400">
              <Lightbulb className="size-4 text-primary" aria-hidden />
              Analogies from {userInterest}
            </p>
          )}
          <div className="flex items-center gap-3">
            {live && (
              <button
                type="button"
                onClick={toggleMicrophone}
                aria-pressed={isMuted}
                aria-label={isMuted ? "Turn microphone on" : "Turn microphone off"}
                className="grid size-12 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              >
                {isMuted ? <MicOff className="size-5" /> : <Mic className="size-5" />}
              </button>
            )}
            {live ? (
              <button
                type="button"
                onClick={handleDisconnect}
                className="flex h-12 items-center gap-2 rounded-full bg-red-600 px-6 font-semibold transition-colors hover:bg-red-700"
              >
                <PhoneOff className="size-4" aria-hidden />
                End session
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCall}
                disabled={callStatus === CallStatus.CONNECTING}
                className="btn-primary h-12 rounded-full px-8"
              >
                {callStatus === CallStatus.CONNECTING ? "Connecting…" : "Start session"}
              </button>
            )}
          </div>
          {callStatus === CallStatus.INACTIVE && (
            <p className="text-xs text-zinc-500">
              Allow your microphone when asked. Notes are saved when you end.
            </p>
          )}
        </div>
      </section>

      {/* Transcript */}
      <section
        aria-label="Transcript"
        className="flex min-h-[20rem] flex-col overflow-hidden rounded-3xl border border-stone-200 bg-white"
      >
        <h2 className="border-b border-stone-200 px-5 py-4 text-sm font-semibold text-zinc-900">
          Transcript
        </h2>
        <div className="no-scrollbar flex flex-1 flex-col gap-4 overflow-y-auto p-5">
          {chronological.length === 0 ? (
            <p className="m-auto max-w-[16rem] text-center text-sm text-zinc-500">
              The conversation shows up here as you talk.
            </p>
          ) : (
            chronological.map((m, i) => {
              const tutor = m.role === "assistant";
              return (
                <div key={i} className={cn("flex gap-3", !tutor && "flex-row-reverse")}>
                  {tutor ? (
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-white">
                      {name[0]}
                    </span>
                  ) : (
                    <Image
                      src={userImage}
                      alt=""
                      width={32}
                      height={32}
                      className="size-8 shrink-0 rounded-full object-cover"
                    />
                  )}
                  <p
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed",
                      tutor
                        ? "rounded-tl-sm bg-stone-100 text-zinc-900"
                        : "rounded-tr-sm bg-primary/10 text-zinc-900",
                    )}
                  >
                    <span className="sr-only">{tutor ? name : userName}: </span>
                    {m.content}
                  </p>
                </div>
              );
            })
          )}
          <div ref={endRef} />
        </div>
      </section>
    </div>
  );
};

export default CompanionComponent;
