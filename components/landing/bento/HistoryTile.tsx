"use client";

import { Check, Stage } from "@/components/stageshow/kit";
import "./bento.css";

const ROWS = [
  ["State & re-renders", "React · Formula 1", "9 min"],
  ["Effects & side effects", "React · Formula 1", "12 min"],
  ["Components as parts", "React · Formula 1", "8 min"],
  ["Props & data flow", "React · Formula 1", "10 min"],
];

export default function HistoryTile() {
  return (
    <div className="bt bt-slot bt-fade">
      <Stage width={596} height={218} compact={{ below: 480, width: 340, height: 230 }} theme="dark" fill>
        {(_s, _r, layout) => (
          <div style={{ position: "absolute", inset: 0, paddingTop: 4 }}>
            {ROWS.map(([title, sub, meta]) => (
              <div key={title} className="bt-row" style={layout === "compact" ? { margin: "0 16px" } : undefined}>
                <Check on size={16} />
                <div><b>{title}</b><span className="sub">{sub}</span></div>
                <span className="meta">{meta}</span>
              </div>
            ))}
          </div>
        )}
      </Stage>
    </div>
  );
}
