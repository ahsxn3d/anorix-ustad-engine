"use client";
import { useEffect, useRef, useState } from "react";

type Msg = { who: "you" | "ustad"; text: React.ReactNode; extra?: "line" };
// A scripted demo of the tutoring style (ask, test, explain), not a live model.
const script: Msg[] = [
  { who: "you", text: "Why do we flip the inequality sign when we divide by a negative? I just memorised it." },
  { who: "ustad", text: <>Let&apos;s test it instead of memorising. Is <span className="mono text-[13px] text-ink">2 &lt; 5</span> true?</> },
  { who: "you", text: "Yes." },
  { who: "ustad", text: <>Now multiply both sides by <span className="mono text-[13px] text-ink">−1</span>. Is <span className="mono text-[13px] text-ink">−2 &lt; −5</span> still true?</> },
  { who: "you", text: "No. −2 is bigger than −5." },
  { who: "ustad", text: <>Exactly. Multiplying by a negative mirrors the number line, so the order reverses. Flipping the sign keeps the statement true.</>, extra: "line" },
];
const chips = ["Give me a hint", "Explain it simpler", "Quiz me on this"];

function NumberLine() {
  return (
    <svg viewBox="0 0 320 70" className="mt-3 w-full" role="img" aria-label="Number line: 2 and 5 on the right mirror to −2 and −5 on the left, so their order reverses">
      <line x1="10" y1="40" x2="310" y2="40" stroke="#1f1b16" strokeOpacity=".35" />
      {[-5, -2, 0, 2, 5].map((n) => { const x = 160 + n * 28; return <g key={n}><line x1={x} y1="35" x2={x} y2="45" stroke="#1f1b16" strokeOpacity=".5" /><text x={x} y="62" textAnchor="middle" fontSize="11" fontFamily="var(--f-mono)" fill="#6b6357">{n}</text></g>; })}
      <circle cx="216" cy="40" r="4.5" fill="#2e4a3c" /><circle cx="300" cy="40" r="4.5" fill="#2e4a3c" />
      <circle cx="104" cy="40" r="4.5" fill="#8a2e22" /><circle cx="20" cy="40" r="4.5" fill="#8a2e22" />
      <path d="M216 30 C 190 6, 130 6, 104 30" fill="none" stroke="#b3893b" strokeWidth="1.4" strokeDasharray="3 3" />
      <path d="M300 30 C 240 -6, 80 -6, 20 30" fill="none" stroke="#b3893b" strokeWidth="1.4" strokeDasharray="3 3" />
    </svg>
  );
}

export default function TutorChat() {
  const root = useRef<HTMLDivElement>(null), list = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(0), [typing, setTyping] = useState(false), [run, setRun] = useState(0);
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setN(script.length); return; }
    let timers: number[] = [], started = false;
    const play = () => {
      started = true; let t = 400;
      script.forEach((m, i) => {
        if (m.who === "ustad") { timers.push(window.setTimeout(() => setTyping(true), t)); t += 1100; }
        timers.push(window.setTimeout(() => { setTyping(false); setN(i + 1); }, t)); t += m.who === "you" ? 900 : 1500;
      });
    };
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) play(); }, { threshold: 0.35 });
    io.observe(root.current!);
    return () => { io.disconnect(); timers.forEach(clearTimeout); timers = []; };
  }, [run]);
  useEffect(() => { const l = list.current; if (l) l.scrollTo({ top: l.scrollHeight, behavior: "smooth" }); }, [n, typing]);
  const done = n >= script.length;
  return (
    <div ref={root} className="relative rounded-[28px] bg-sheet shadow-[0_1px_0_rgba(31,27,22,.06),0_30px_80px_-30px_rgba(31,27,22,.35)] ring-1 ring-rule">
      <div className="flex items-center justify-between border-b border-rule px-5 py-4">
        <div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-paper serif text-[18px]">U</span><div><p className="text-[14px] font-medium">Ustad</p><p className="mono text-mute">Algebra · inequalities</p></div></div>
        <span className="eyebrow rounded-full bg-paper px-3 py-1.5 text-[10px] text-mute">Demo</span>
      </div>
      <div ref={list} className="ruled h-[380px] space-y-3 overflow-y-auto overscroll-contain px-5 py-5 [scrollbar-width:thin] sm:h-[420px]" aria-live="polite">
        {script.slice(0, n).map((m, i) => (
          <div key={i} className={`flex ${m.who === "you" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[86%] rounded-[18px] px-4 py-3 text-[15px] leading-[1.55] ${m.who === "you" ? "rounded-br-[6px] bg-ink text-paper" : "rounded-bl-[6px] bg-paper text-ink ring-1 ring-rule"}`}>
              {m.text}{m.extra === "line" && <NumberLine />}
            </div>
          </div>
        ))}
        {typing && <div className="flex"><div className="flex gap-1 rounded-[18px] rounded-bl-[6px] bg-paper px-4 py-4 ring-1 ring-rule" aria-label="Ustad is typing">{[0, 1, 2].map((d) => <span key={d} className="dot h-1.5 w-1.5 rounded-full bg-mute" style={{ animationDelay: `${d * 0.15}s` }} />)}</div></div>}
      </div>
      <div className="flex flex-wrap items-center gap-2 border-t border-rule px-5 py-4">
        {chips.map((c) => <span key={c} className="rounded-full border border-rule px-3 py-1.5 text-[13px] text-mute">{c}</span>)}
        <button type="button" onClick={() => { setN(0); setTyping(false); setRun((r) => r + 1); }} disabled={!done} className="ml-auto rounded-full px-3 py-1.5 text-[13px] font-medium text-ox transition-opacity disabled:opacity-0">Replay ↺</button>
      </div>
    </div>
  );
}
