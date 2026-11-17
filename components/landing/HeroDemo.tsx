"use client";

import { Flag, Lock, Mic, PhoneOff, FileText } from 'lucide-react'
import { Badge, Bar, Button, Check, Phone, Roll, Stage, Stream, Text, Window, type Act } from '@/components/stageshow/kit'
import './hero-demo.css'

// Converso's landing hero: a live voice lesson inside a learning path.
// Beats: the student's question is on screen; the tutor answers in an
// analogy from the student's interest (F1), streaming as it speaks; the
// student ends the session; the module ticks done in the path and the next
// one unlocks; the auto-written session notes arrive over the path's margin.
// Plays once; the payoff holds as the still.
//
// Real strings: the path, three module names, the lesson title, the interest
// chip, the question, the answer, the notes' title and two takeaways.

const Q = 'Wait, why does the whole component re-render?'
const A =
  'Think of state as live telemetry. When the tyre temperature changes, the pit-wall screen redraws with the new reading. That redraw is a re-render, and React does it every time state changes.'
const WORDS = A.split(' ').length

type S = { words: number; speaking: boolean; ended: boolean; notes: boolean }

const OPEN = 6 // the first sentence is already spoken when the scene opens
const initial: S = { words: OPEN, speaking: false, ended: false, notes: false }
const poster: S = { words: WORDS, speaking: false, ended: true, notes: true }

async function script(a: Act<S>) {
  await a.wait(900)
  a.mark('speak')
  a.put({ speaking: true })
  await a.wait(350)
  for (let i = OPEN + 1; i <= WORDS; i++) {
    a.put({ words: i })
    await a.wait(85)
  }
  await a.wait(250)
  a.put({ speaking: false })
  await a.wait(500)
  a.mark('end')
  await a.move({ at: 'end', x: 0.14, y: 0.6 })
  await a.wait(250)
  await a.click()
  await a.set({ ended: true })
  await a.wait(500)
  a.mark('notes')
  a.move('rest')
  await a.set({ notes: true })
  await a.wait(2600)
}

const MODULES = [
  { name: 'Components as car parts', state: 'done' },
  { name: 'State & re-renders', state: 'now' },
  { name: 'Effects & side effects', state: 'locked' },
  { name: null, state: 'locked' },
] as const

export default function HeroDemo() {
  return (
    <Stage<S>
      width={1040}
      height={540}
      compact={{ below: 760, width: 358, height: 560 }}
      theme="dark"
      initial={initial}
      poster={poster}
      script={script}
      play="once"
      cursor={{ at: { wide: { x: 760, y: 300 }, compact: { x: 250, y: 250 } } }}
      className="cv"
    >
      {(s, _rect, layout) => (
        <>
          {layout === 'wide' ? (
            <Window url="converso.app/lesson" className="cv-win">
              <div className="cv-app">
                <Path s={s} />
                <Session s={s} />
              </div>
            </Window>
          ) : (
            <Phone width={310} dark className="cv-phone">
              <div className="cv-app">
                <Session s={s} />
              </div>
            </Phone>
          )}
          <Notes on={s.notes} />
          <span data-target="rest" style={{ position: 'absolute', left: layout === 'wide' ? 760 : 250, top: layout === 'wide' ? 300 : 250 }} />
        </>
      )}
    </Stage>
  )
}

function Path({ s }: { s: S }) {
  return (
    <aside className="cv-path">
      <span className="cv-eyebrow">Your path</span>
      <div className="cv-path-title">React, through F1</div>
      <ol className="cv-modules">
        {MODULES.map((m, i) => {
          const done = m.state === 'done' || (m.state === 'now' && s.ended)
          const now = (m.state === 'now' && !s.ended) || (i === 2 && s.ended)
          return (
            <li key={i} className="cv-mod" data-now={now || undefined} data-done={done || undefined}>
              {/* The lock and the ring share one cell and crossfade as the module unlocks */}
              <span className="cv-node" data-locked={(m.state === 'locked' && !(i === 2 && s.ended)) || undefined}>
                <Lock size={12} strokeWidth={2.25} />
                <Check on={done} size={16} />
              </span>
              {m.name ? <span className="cv-mod-name">{m.name}</span> : <Bar w={110} h={7} tone={1} />}
            </li>
          )
        })}
      </ol>
    </aside>
  )
}

function Session({ s }: { s: S }) {
  return (
    <section className="cv-main">
      <header className="cv-head">
        <div className="cv-head-text">
          <span className="cv-eyebrow">Module 2</span>
          <div className="cv-title">State &amp; re-renders</div>
          <span className="cv-interest">
            <Flag size={12} strokeWidth={2.25} />
            Explained through Formula 1
          </span>
        </div>
        <div className="cv-status">
          <Badge tone={s.ended ? 'neutral' : 'accent'} dot className="cv-live">
            <Roll variant="fade">{s.ended ? 'Ended' : 'Live'}</Roll>
          </Badge>
        </div>
      </header>

      <div className="cv-thread">
        <div className="cv-q">
          <Text wrap>{Q}</Text>
        </div>
        <div className="cv-tutor">
          <span className="cv-orb" data-speaking={s.speaking || undefined}>
            {[0, 1, 2, 3, 4].map((i) => (
              <i key={i} style={{ animationDelay: `${i * 110}ms` }} />
            ))}
          </span>
          <div className="cv-answer">
            <span className="cv-who">
              Coach Nova
              <span className="cv-speaking" data-on={s.speaking || undefined}>Speaking</span>
            </span>
            <Stream className="cv-stream" text={A} count={s.words} />
          </div>
        </div>
      </div>

      <footer className="cv-controls">
        <Button size="large" icon={<Mic size={14} strokeWidth={2.25} />} className="cv-mic">
          Mute
        </Button>
        <Button
          size="large"
          variant={s.ended ? 'secondary' : 'danger'}
          icon={<PhoneOff size={14} strokeWidth={2.25} />}
          className="cv-end"
          data-target="end"
          data-cursor="pointer"
        >
          {s.ended ? 'Session ended' : 'End session'}
        </Button>
      </footer>
    </section>
  )
}

function Notes({ on }: { on: boolean }) {
  return (
    <div className="cv-notes" data-on={on || undefined}>
      <div className="cv-notes-head">
        <FileText size={14} strokeWidth={2.25} />
        <span>Session notes</span>
        <span className="cv-notes-meta">9 min</span>
      </div>
      <div className="cv-notes-title">State &amp; re-renders</div>
      <ul className="cv-notes-list">
        <li>State is live telemetry: change it and the screen redraws.</li>
        <li>Every state update triggers a re-render.</li>
      </ul>
      <div className="cv-notes-foot">
        <span>Full transcript included</span>
      </div>
    </div>
  )
}
