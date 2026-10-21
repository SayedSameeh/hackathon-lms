"use client";

import { useEffect, useRef, useState } from "react";
import { cn, configureAssistant, getSubjectColor } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import Image from "next/image";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import soundwaves from "@/constants/soundwaves.json";
import { addToSessionHistory } from "@/lib/actions/companion.actions";
import { markModuleCompleted } from "@/lib/actions/curriculum.actions";
import { generateSessionNotes } from "@/lib/actions/notes.actions";
import ReactMarkdown from "react-markdown";

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
  const [messages, setMessages] = useState<any[]>([]);

  const [isGeneratingNotes, setIsGeneratingNotes] = useState(false);
  const [sessionNotes, setSessionNotes] = useState<string | null>(null);

  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (lottieRef) {
      if (isSpeaking) {
        lottieRef.current?.play();
      } else {
        lottieRef.current?.stop();
      }
    }
  }, [isSpeaking, lottieRef]);

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);

    const onCallEnd = async () => {
      setCallStatus(CallStatus.FINISHED);

      if (moduleId) {
        await markModuleCompleted(moduleId);

        setIsGeneratingNotes(true);
        try {
          const generatedNotes = await generateSessionNotes(
            moduleId,
            topic,
            messages,
          );
          setSessionNotes(generatedNotes);
        } catch (error) {
          console.error(error);
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

    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);

    const onError = (error: Error) => console.log("Error", error);

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
  }, [moduleId, topic, messages]);

  const toggleMicrophone = () => {
    const isMuted = vapi.isMuted();
    vapi.setMuted(!isMuted);
    setIsMuted(!isMuted);
  };

  const handleCall = async () => {
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

  return (
    <section className="flex flex-col h-[70vh] min-h-125">
      <section className="flex gap-8 max-lg:flex-col h-full w-full mb-8">
        
        {/* Toggle between Avatar and Generated Notes */}
        {callStatus === CallStatus.FINISHED && moduleId ? (
          <div className="flex-1 bg-white rounded-2xl border border-gray-200 shadow-sm p-8 overflow-y-auto min-h-75">
            {isGeneratingNotes ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E90FF]"></div>
                <p className="font-bold text-lg">Compiling your session notes...</p>
              </div>
            ) : sessionNotes ? (
              <div className="prose prose-slate max-w-none text-left">
                <ReactMarkdown>{sessionNotes}</ReactMarkdown>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>Notes could not be generated.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="companion-section">
            <div
              className="companion-avatar"
              style={{ backgroundColor: getSubjectColor(subject) }}
            >
              <div
                className={cn(
                  "absolute transition-opacity duration-1000",
                  callStatus === CallStatus.FINISHED ||
                    callStatus === CallStatus.INACTIVE
                    ? "opacity-100"
                    : "opacity-0",
                  callStatus === CallStatus.CONNECTING &&
                    "opacity-100 animate-pulse",
                )}
              >
                <Image
                  src={`/icons/${subject}.svg`}
                  alt={subject}
                  width={150}
                  height={150}
                  className="max-sm:w-fit"
                />
              </div>

              <div
                className={cn(
                  "absolute transition-opacity duration-1000",
                  callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-0",
                )}
              >
                <Lottie
                  lottieRef={lottieRef}
                  animationData={soundwaves}
                  autoplay={false}
                  className="companion-lottie"
                />
              </div>
            </div>
            <p className="font-bold text-2xl">{name}</p>
          </div>
        )}

        {/* User Controls Panel */}
        <div className="user-section">
          <div className="user-avatar">
            <Image
              src={userImage}
              alt={userName}
              width={130}
              height={130}
              className="rounded-lg"
            />
            <p className="font-bold text-2xl">{userName}</p>
          </div>
          <button
            className="btn-mic"
            onClick={toggleMicrophone}
            disabled={callStatus !== CallStatus.ACTIVE}
          >
            <Image
              src={isMuted ? "/icons/mic-off.svg" : "/icons/mic-on.svg"}
              alt="mic"
              width={36}
              height={36}
            />
            <p className="max-sm:hidden">
              {isMuted ? "Turn on microphone" : "Turn off microphone"}
            </p>
          </button>
          <button
            className={cn(
              "rounded-lg py-2 cursor-pointer transition-colors w-full text-white font-bold",
              callStatus === CallStatus.ACTIVE ? "bg-red-600 hover:bg-red-700" : "bg-[#1E90FF] hover:bg-blue-600",
              callStatus === CallStatus.CONNECTING && "animate-pulse",
            )}
            onClick={
              callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall
            }
          >
            {callStatus === CallStatus.ACTIVE
              ? "End Session"
              : callStatus === CallStatus.CONNECTING
                ? "Connecting"
                : "Start Session"}
          </button>
        </div>
      </section>

      {/* Transcript Log */}
      <section className="transcript relative flex-1 min-h-50 border border-gray-100 rounded-xl bg-gray-50 overflow-hidden">
        <div className="transcript-message no-scrollbar p-6 h-full overflow-y-auto">
          {messages.map((message, index) => {
            if (message.role === "assistant") {
              return (
                <p key={index} className="max-sm:text-sm mb-4">
                  <span className="font-bold text-[#1E90FF]">{name.split(" ")[0]}:</span>{" "}
                  {message.content}
                </p>
              );
            } else {
              return (
                <p key={index} className="max-sm:text-sm mb-4 text-gray-700">
                  <span className="font-bold">{userName}:</span> {message.content}
                </p>
              );
            }
          })}
        </div>
        <div className="absolute bottom-0 w-full h-12 bg-linear-to-t from-gray-50 to-transparent pointer-events-none" />
      </section>
    </section>
  );
};

export default CompanionComponent;