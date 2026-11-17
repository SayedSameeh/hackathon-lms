"use client";

import { Mic, PhoneOff } from "lucide-react";
import { Badge, Button, Stage } from "@/components/stageshow/kit";
import "./bento.css";

export default function VoiceTile() {
  return (
    <div className="bt bt-slot">
      <Stage width={290} height={190} theme="dark" fill>
        {() => (
          <div style={{ position: "absolute", left: 28, top: 10, right: -40, padding: 18, borderRadius: "14px 0 0 14px", background: "var(--ss-surface)", border: "1px solid var(--ss-line)", borderRight: 0, height: 200 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span className="bt-orb" aria-hidden><i /><i /><i /><i /><i /></span>
              <div>
                <div style={{ color: "var(--ss-text-strong)", fontSize: 14, fontWeight: 600, marginBottom: 6 }}>Coach Nova</div>
                <Badge tone="accent" dot>Speaking</Badge>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
              <Button size="large" icon={<Mic size={13} strokeWidth={2.25} />}>Mute</Button>
              <Button size="large" variant="danger" icon={<PhoneOff size={13} strokeWidth={2.25} />}>End</Button>
            </div>
          </div>
        )}
      </Stage>
    </div>
  );
}
