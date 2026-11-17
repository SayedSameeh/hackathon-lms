"use client";

import { Lock, Play } from "lucide-react";
import { Badge, Bar, Button, Check, Stage, Window } from "@/components/stageshow/kit";
import "./bento.css";

// The hero tile: one real screen, the only window chrome in the grid.
const MODULES = [
  { name: "Variables & types", state: "done" },
  { name: "Loops & conditions", state: "now" },
  { name: "Functions", state: "locked" },
  { name: "Files & errors", state: "locked" },
] as const;

export default function PathTile() {
  return (
    <div className="bt bt-slot">
      <Stage width={596} height={500} compact={{ below: 480, width: 340, height: 340 }} theme="dark" fill>
        {(_s, _r, layout) => (
          <Window url="converso.app/path" className="bt-win" style={layout === "compact" ? { left: 16, width: 420, height: 400 } : undefined}>
            <div style={{ padding: "22px 22px 0" }}>
              <span className="bt-eyebrow">Your path</span>
              <div className="bt-ptitle">Python, through Baking</div>
              <ol style={{ display: "grid", gap: 2, margin: 0, padding: 0, listStyle: "none" }}>
                {MODULES.map((m) => (
                  <li key={m.name} className="bt-mod" data-now={m.state === "now" || undefined}>
                    {m.state === "locked" ? <span className="bt-lock"><Lock size={9} strokeWidth={2.5} /></span> : <Check on={m.state === "done"} size={16} />}
                    <span className="grow">{m.name}</span>
                    {m.state === "now" && <Badge tone="accent" dot>In session</Badge>}
                  </li>
                ))}
              </ol>
              <div style={{ marginTop: 18, padding: 16, borderRadius: 12, background: "rgb(255 255 255 / 0.04)", border: "1px solid var(--ss-line)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--ss-text-faint)", marginBottom: 10 }}>
                  <span>Module 2 of 4</span><span>Half way</span>
                </div>
                <div className="bt-bar"><i style={{ ["--w" as string]: "50%" }} /></div>
                <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
                  <Button size="large" variant="primary" icon={<Play size={13} strokeWidth={2.5} />}>Resume session</Button>
                  <Bar w={90} h={8} tone={1} />
                </div>
              </div>
            </div>
          </Window>
        )}
      </Stage>
    </div>
  );
}
