import TutorChat from "./TutorChat";
import { Arrow } from "./kit/ui";
export default function Hero() {
  return (
    <section id="top" className="grain relative overflow-hidden pb-[clamp(72px,8vw,120px)] pt-[clamp(120px,12vw,168px)]">
      <div className="wrap grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6 xl:col-span-6">
          <p className="eyebrow text-ox kit-soft">Ustad Engine · AI study platform</p>
          <h1 className="serif mt-6 text-[clamp(52px,7vw,112px)]"><span className="kit-mask"><span className="kit-line">A patient teacher</span></span><span className="kit-mask"><span className="kit-line" style={{ animationDelay: ".08s" }}>for <em className="italic text-ox">every</em> question.</span></span></h1>
          <p className="kit-soft mt-7 max-w-[46ch] text-[18px] leading-[1.6] text-ink/75">Ustad asks before it tells, checks your working line by line, and remembers what you found hard, so the next session starts there.</p>
          <div className="kit-soft mt-9 flex flex-wrap gap-3">
            <a href="#pricing" className="btn bg-ink text-paper hover:bg-ox">Start learning <Arrow /></a>
            <a href="#method" className="btn border border-ink/20 hover:border-ink">How it teaches</a>
          </div>
          <p className="kit-soft mono mt-8 text-mute">Concept preview · not yet available</p>
        </div>
        <div className="lg:col-span-6 xl:col-span-5 xl:col-start-8" data-fade data-delay="0.3"><TutorChat /></div>
      </div>
    </section>
  );
}
