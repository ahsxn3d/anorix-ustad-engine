"use client";
import { useEffect, useState } from "react";
import { Arrow } from "./kit/ui";

const links = [["Method", "#method"], ["Features", "#features"], ["Pricing", "#pricing"], ["FAQ", "#faq"]];
function Mark() { return <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true"><rect width="32" height="32" rx="9" fill="#1f1b16" /><path d="M9 9v8a7 7 0 0 0 14 0V9" fill="none" stroke="#f3ede1" strokeWidth="2.6" strokeLinecap="round" /><circle cx="23" cy="24" r="2.4" fill="#b3893b" /></svg>; }

export function Nav() {
  const [open, setOpen] = useState(false), [solid, setSolid] = useState(false);
  useEffect(() => { const f = () => setSolid(scrollY > 40); f(); addEventListener("scroll", f, { passive: true }); return () => removeEventListener("scroll", f); }, []);
  useEffect(() => { if (!open) return; const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false); addEventListener("keydown", k); document.documentElement.style.overflow = "hidden"; return () => { removeEventListener("keydown", k); document.documentElement.style.overflow = ""; }; }, [open]);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-[background,box-shadow] duration-500 ${solid && !open ? "bg-paper/85 shadow-[0_1px_0_rgba(31,27,22,.08)] backdrop-blur-md" : ""}`}>
      <div className="wrap relative z-10 flex h-[72px] items-center justify-between">
        <a href="#top" onClick={() => setOpen(false)} className="flex items-center gap-2.5" aria-label="Ustad Engine home"><Mark /><span className="serif text-[22px]">Ustad</span></a>
        <nav aria-label="Primary" className="hidden items-center gap-8 text-[15px] md:flex">
          {links.map(([l, h]) => <a key={l} href={h} className="text-ink/75 transition-colors hover:text-ink">{l}</a>)}
          <a href="#pricing" className="btn bg-ink px-5 py-2.5 text-paper hover:bg-ox">Start learning</a>
        </nav>
        <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="m-menu" aria-label={open ? "Close menu" : "Open menu"} className="grid h-11 w-11 place-items-center rounded-full ring-1 ring-ink/15 md:hidden">
          <span className="relative block h-3 w-5" aria-hidden="true"><span className={`absolute left-0 h-px w-5 bg-current transition-transform duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} /><span className={`absolute left-0 h-px w-5 bg-current transition-transform duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} /></span>
        </button>
      </div>
      <div id="m-menu" aria-hidden={!open} className={`fixed inset-0 bg-paper transition-opacity duration-300 motion-reduce:transition-none md:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}>
        <nav aria-label="Mobile" className="wrap flex h-full flex-col justify-center gap-1">
          {links.map(([l, h], i) => <a key={l} href={h} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)} className={`serif text-[48px] transition-[opacity,transform] duration-500 ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`} style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}>{l}</a>)}
          <a href="#pricing" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)} className="btn mt-8 self-start bg-ink text-paper">Start learning <Arrow /></a>
        </nav>
      </div>
    </header>
  );
}

const steps = [
  ["Ask", "Bring any question: a homework problem, a work report you need to understand, a concept from a lecture."],
  ["Try", "Ustad asks what you already think, then gives the smallest hint that moves you forward. You do the reasoning."],
  ["Keep", "What you struggled with becomes a short review, scheduled just before you would forget it."],
];
export function Method() {
  return (
    <section id="method" className="border-y border-rule bg-sheet py-[clamp(88px,10vw,150px)]">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-12">
          <p className="eyebrow text-ox lg:col-span-3">01 · The method</p>
          <h2 className="serif text-[clamp(40px,5vw,80px)] lg:col-span-8" data-reveal="lines">Good teachers rarely give the answer first. Neither does Ustad.</h2>
        </div>
        <ol className="mt-16 grid gap-px overflow-hidden rounded-[24px] bg-rule ring-1 ring-rule md:grid-cols-3">
          {steps.map(([t, d], i) => (
            <li key={t} className="bg-sheet p-8 md:p-10" data-fade data-delay={i * 0.08}>
              <p className="mono text-mute">0{i + 1}</p>
              <h3 className="serif mt-10 text-[44px]">{t}</h3>
              <p className="mt-4 max-w-[36ch] text-[16px] leading-[1.65] text-ink/70">{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- feature illustrations, drawn in code ---------- */
function HintLadder() {
  const [k, setK] = useState(1);
  const hints = ["What do you get if you test it with real numbers?", "Try 2 < 5, then multiply both sides by −1.", "Negatives mirror the number line, so order reverses."];
  return (
    <div className="rounded-[22px] bg-sheet p-6 ring-1 ring-rule">
      <p className="mono text-mute">Hint ladder</p>
      <ol className="mt-4 space-y-2">
        {hints.map((h, i) => <li key={h} className={`rounded-[14px] px-4 py-3 text-[15px] transition-all duration-500 ${i < k ? "bg-paper text-ink ring-1 ring-rule" : "bg-paper/40 text-transparent [text-shadow:0_0_8px_rgba(31,27,22,.35)] select-none"}`} aria-hidden={i >= k}><span className="mono mr-2 text-brass">{i + 1}</span>{h}</li>)}
      </ol>
      <button type="button" onClick={() => setK((v) => (v >= 3 ? 1 : v + 1))} className="mt-4 rounded-full border border-ink/20 px-4 py-2 text-[14px] transition-colors hover:border-ink">{k >= 3 ? "Start over" : "I need another hint"}</button>
    </div>
  );
}
function Working() {
  const lines = [["3(x − 2) = 2x + 5", ""], ["3x − 6 = 2x + 5", "ok"], ["3x − 2x = 5 − 6", "bad"], ["x = −1", "bad"]];
  return (
    <div className="ruled rounded-[22px] bg-sheet p-6 ring-1 ring-rule">
      <p className="mono text-mute">Your working</p>
      <div className="mt-4 space-y-1">
        {lines.map(([l, s], i) => (
          <div key={l} className="flex items-center justify-between gap-4 py-1.5">
            <span className={`mono text-[16px] ${s === "bad" ? "text-ox line-through decoration-ox/60" : "text-ink"}`}>{l}</span>
            {s === "ok" && <span className="text-[13px] text-baize">✓ expanded correctly</span>}
            {i === 2 && <span className="max-w-[22ch] text-right font-serif text-[15px] italic leading-snug text-ox">Moving −6 across makes it +6. Try this line again.</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
function Review() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const items = [["Inequalities", 1, "due"], ["Moles & molar mass", 3, ""], ["Present perfect", 4, ""], ["Ohm's law", 6, ""]] as const;
  return (
    <div className="rounded-[22px] bg-sheet p-6 ring-1 ring-rule">
      <div className="flex items-center justify-between"><p className="mono text-mute">This week&apos;s reviews</p><span className="mono text-mute">sample</span></div>
      <div className="mt-5 grid grid-cols-7 gap-1.5 text-center">{days.map((d) => <span key={d} className="mono text-[11px] text-mute">{d}</span>)}</div>
      <div className="mt-2 space-y-2">
        {items.map(([t, d, s]) => (
          <div key={t} className="grid grid-cols-7 gap-1.5">
            <div className={`rounded-[10px] px-3 py-2 text-[13px] ${s === "due" ? "bg-ox text-paper" : "bg-paper ring-1 ring-rule"}`} style={{ gridColumn: `${d} / span 2` }}>{t}{s === "due" && <span className="ml-2 opacity-75">· 4 min</span>}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
function Classroom() {
  const topics = ["Linear equations", "Inequalities", "Quadratics", "Graphs"];
  const grid = [[3, 2, 1, 2], [3, 3, 2, 1], [2, 1, 1, 0], [3, 2, 2, 2], [3, 3, 3, 2]];
  const col = ["bg-rule", "bg-ox/70", "bg-brass/80", "bg-baize"];
  return (
    <div className="rounded-[22px] bg-sheet p-6 ring-1 ring-rule">
      <div className="flex items-center justify-between"><p className="mono text-mute">Class overview · Grade 9 algebra</p><span className="mono text-mute">sample</span></div>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[380px] border-separate border-spacing-1.5 text-left text-[13px]">
          <thead><tr><th className="font-normal text-mute">Student</th>{topics.map((t) => <th key={t} className="font-normal text-mute">{t}</th>)}</tr></thead>
          <tbody>{grid.map((r, i) => <tr key={i}><td className="pr-3">Student {String.fromCharCode(65 + i)}</td>{r.map((v, j) => <td key={j}><span className={`block h-6 rounded-[6px] ${col[v]}`} aria-label={["not started", "struggling", "practising", "secure"][v]} /></td>)}</tr>)}</tbody>
        </table>
      </div>
      <div className="mt-4 flex flex-wrap gap-4 text-[12px] text-mute">{["Struggling", "Practising", "Secure"].map((l, i) => <span key={l} className="flex items-center gap-2"><span className={`h-2.5 w-2.5 rounded-full ${col[i + 1]}`} />{l}</span>)}</div>
    </div>
  );
}
const feats = [
  { k: "Tutor chat", t: "Hints, not answers.", d: "Every reply is the smallest step that keeps you thinking. Ask for another hint when you're stuck, or for the full explanation when you're done trying.", c: <HintLadder /> },
  { k: "Checks your working", t: "It reads every line.", d: "Paste or photograph your solution. Ustad finds the exact line where it went wrong and writes in the margin, like a teacher with a red pen.", c: <Working /> },
  { k: "Spaced review", t: "Remembers what you found hard.", d: "Topics you struggled with come back as four-minute reviews, timed just before you'd forget them. Nothing to plan.", c: <Review /> },
  { k: "For classrooms", t: "See where the class is stuck.", d: "Teachers set topics, then see who is struggling, practising or secure, without marking a single worksheet.", c: <Classroom /> },
];
export function Features() {
  return (
    <section id="features" className="py-[clamp(88px,10vw,150px)]">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-12"><p className="eyebrow text-ox lg:col-span-3">02 · Features</p><h2 className="serif text-[clamp(40px,5vw,80px)] lg:col-span-8" data-reveal="lines">Four habits of a great teacher, built in.</h2></div>
        <div className="mt-16 divide-y divide-rule border-y border-rule">
          {feats.map((f, i) => (
            <article key={f.k} className="grid items-center gap-10 py-14 lg:grid-cols-12 lg:gap-12 lg:py-20">
              <div className={`lg:col-span-5 ${i % 2 ? "lg:order-2 lg:col-start-8" : ""}`} data-fade>
                <p className="mono text-mute">0{i + 1} · {f.k}</p>
                <h3 className="serif mt-5 text-[clamp(34px,3.6vw,56px)]">{f.t}</h3>
                <p className="mt-5 max-w-[44ch] text-[17px] leading-[1.65] text-ink/70">{f.d}</p>
              </div>
              <div className={`lg:col-span-6 ${i % 2 ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"}`} data-fade data-delay="0.1">{f.c}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const plans = [
  { n: "Students", f: "For school and university", items: ["Tutor chat across subjects", "Working checks by photo or text", "Spaced review", "Exam-week mode"], cta: "Join the waitlist" },
  { n: "Workers", f: "For learning on the job", items: ["Everything in Students", "Explain any doc, report or spec", "Short daily lessons", "Private by default"], cta: "Join the waitlist" },
  { n: "Teams", f: "For companies that train people", items: ["Everything in Workers", "Shared course library", "Progress by team", "SSO and admin controls"], cta: "Talk to us", hot: true },
  { n: "Teachers", f: "For classrooms", items: ["Set topics and practice", "Class overview", "Ustad guides, never does the homework", "Student data stays with the school"], cta: "Talk to us" },
];
export function Pricing() {
  return (
    <section id="pricing" className="bg-night py-[clamp(88px,10vw,150px)] text-paper">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-12"><p className="eyebrow text-brass lg:col-span-3">03 · Pricing</p><div className="lg:col-span-8"><h2 className="serif text-[clamp(40px,5vw,80px)]" data-reveal="lines">One tutor, four ways in.</h2><p className="mt-6 max-w-[52ch] text-[17px] text-paper/65">Ustad Engine is a concept in development. Prices will be set at launch; join the waitlist to hear first.</p></div></div>
        <div className="mt-16 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((p, i) => (
            <div key={p.n} className={`flex flex-col rounded-[24px] p-7 ${p.hot ? "bg-paper text-ink" : "bg-paper/[.04] ring-1 ring-paper/12"}`} data-fade data-delay={i * 0.06}>
              <p className={`mono ${p.hot ? "text-ox" : "text-brass"}`}>{p.f}</p>
              <h3 className="serif mt-4 text-[40px]">{p.n}</h3>
              <p className={`mt-4 text-[15px] ${p.hot ? "text-mute" : "text-paper/55"}`}>Price at launch</p>
              <ul className={`mt-6 flex-1 space-y-3 border-t pt-6 text-[15px] ${p.hot ? "border-rule" : "border-paper/12"}`}>{p.items.map((it) => <li key={it} className="flex gap-3"><span className={p.hot ? "text-baize" : "text-brass"} aria-hidden="true">✓</span>{it}</li>)}</ul>
              <a href="#footer" className={`btn mt-8 justify-center ${p.hot ? "bg-ink text-paper hover:bg-ox" : "border border-paper/25 hover:border-paper"}`}>{p.cta}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const faqs = [
  ["Will it just do my homework?", "No. Ustad is built to guide: it asks, hints and checks. You can ask for a full worked explanation after you've tried, and teachers can turn that off for their classes."],
  ["Which subjects does it cover?", "The plan is maths, sciences and languages first, then any text you bring: a report, a contract, a chapter. Coverage will be listed at launch."],
  ["How does it know what I find hard?", "It notes the steps where you needed hints or made mistakes, and turns those into short reviews. You can see and delete that history at any time."],
  ["Is my data private?", "Your sessions are yours. For schools, student data stays under the school's control. Full details will be published with the privacy policy at launch."],
];
export function Faq() {
  const [o, setO] = useState<number | null>(0);
  return (
    <section id="faq" className="py-[clamp(88px,10vw,150px)]">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4"><p className="eyebrow text-ox">04 · Questions</p><h2 className="serif mt-6 text-[clamp(40px,4.6vw,72px)]" data-reveal="lines">Asked and answered.</h2></div>
        <div className="divide-y divide-rule border-y border-rule lg:col-span-7 lg:col-start-6">
          {faqs.map(([q, a], i) => (
            <div key={q}>
              <h3><button type="button" onClick={() => setO(o === i ? null : i)} aria-expanded={o === i} aria-controls={`faq-${i}`} className="flex w-full items-center justify-between gap-6 py-6 text-left text-[19px] font-medium">{q}<span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ring-1 ring-ink/15 transition-transform duration-300 ${o === i ? "rotate-45" : ""}`} aria-hidden="true">+</span></button></h3>
              <div id={`faq-${i}`} role="region" hidden={o !== i} className="pb-6 pr-12 text-[16px] leading-[1.7] text-ink/70">{a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer id="footer" className="border-t border-rule bg-sheet">
      <div className="wrap py-[clamp(80px,9vw,140px)]">
        <h2 className="serif max-w-[14ch] text-[clamp(48px,7vw,120px)]" data-reveal="lines">Start with one <em className="italic text-ox">good</em> question.</h2>
        <div className="mt-10 flex flex-wrap gap-3"><a href="#top" className="btn bg-ink text-paper hover:bg-ox">Join the waitlist <Arrow /></a><a href="#method" className="btn border border-ink/20 hover:border-ink">See how it teaches</a></div>
        <p className="mono mt-6 text-mute">Waitlist opens at launch. No email is collected on this preview.</p>
      </div>
      <div className="wrap flex flex-col justify-between gap-3 border-t border-rule py-8 text-[13px] text-mute md:flex-row"><span>© 2026 Ustad Engine, a concept by Anorix.</span><span>Designed &amp; built by Anorix</span></div>
    </footer>
  );
}
