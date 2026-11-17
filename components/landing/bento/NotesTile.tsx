"use client";

import { FileText } from "lucide-react";
import { Badge, Bar, Stage } from "@/components/stageshow/kit";
import "./bento.css";

export default function NotesTile() {
  return (
    <div className="bt bt-slot bt-fade">
      <Stage width={596} height={218} compact={{ below: 480, width: 340, height: 230 }} theme="dark" fill>
        {(_s, _r, layout) => (
          <div className="bt-doc" style={layout === "compact" ? { left: 16, width: 380 } : undefined}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "space-between" }}>
              <span className="bt-eyebrow" style={{ display: "inline-flex", gap: 6, alignItems: "center" }}><FileText size={13} strokeWidth={2.25} />Session notes</span>
              <Badge tone="success" dot>Saved</Badge>
            </div>
            <h4>Pacing &amp; pauses</h4>
            <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
              <li>Pause before the line that matters.</li>
              <li>Vary your pace between ideas.</li>
              <li>Open the next idea with a question.</li>
              <li><Bar w={220} h={8} tone={2} /></li>
            </ul>
          </div>
        )}
      </Stage>
    </div>
  );
}
