"use client";
import { useScrollReveal } from "../useScrollReveal";

const steps = [
  { num: "01", title: "Free Consultation", desc: "30 minutes. No pitch, no commitment. We dig into your goals and the results you need.", accent: "→ Zero obligation" },
  { num: "02", title: "Scope & Proposal", desc: "A clear plan, timeline, and fixed-price quote. No vague estimates, no hidden fees.", accent: "→ Fixed price always" },
  { num: "03", title: "Build & Iterate", desc: "Weekly demos. Direct feedback loops. You see real progress every step of the way.", accent: "→ Weekly check-ins" },
  { num: "04", title: "Launch & Support", desc: "We deploy, monitor, and support after launch. Your success is our success.", accent: "→ Support included" },
];

export default function Process() {
  const ref = useScrollReveal();

  return (
    <section id="process" ref={ref} className="border-b border-white/[0.07] bg-[#08080a] px-4 py-28">
      <div className="container mx-auto">
        <div data-reveal className="reveal-item mb-10">
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#b8ff57]">/ How it works</span>
        </div>

        <h2
          data-reveal data-delay="60"
          className="reveal-item mb-16 font-extrabold leading-[1.02] tracking-[-0.03em] text-white"
          style={{ fontSize: "clamp(32px,5vw,56px)" }}
        >
          From idea to live product<br />
          <span className="text-[#b8ff57]">in 4 clear steps</span>
        </h2>

        {/* Steps with animated connector */}
        <div className="relative grid grid-cols-1 gap-0 md:grid-cols-4">
          {/* Connector line */}
          <div className="pointer-events-none absolute left-0 right-0 top-[28px] hidden h-px bg-white/[0.07] md:block">
            <div
              className="h-full bg-gradient-to-r from-[#b8ff57]/0 via-[#b8ff57]/40 to-[#b8ff57]/0"
              style={{ animation: "shimmer 3s ease-in-out infinite" }}
            />
          </div>

          {steps.map((step, i) => (
            <div
              key={i}
              data-reveal data-delay={`${i * 120}`}
              className={`reveal-item group relative border border-white/[0.07] p-8 transition-all duration-500 hover:bg-[#b8ff57]/[0.03] hover:border-[#b8ff57]/20
                ${i < 3 ? "md:border-r-0" : ""}
              `}
            >
              {/* Number bubble */}
              <div className="relative z-10 mb-6 inline-flex h-14 w-14 items-center justify-center border border-white/10 bg-[#060608] font-mono text-lg font-bold text-[#b8ff57] transition-all duration-300 group-hover:border-[#b8ff57] group-hover:bg-[#b8ff57] group-hover:text-black">
                {step.num}
              </div>

              <h3 className="mb-3 text-[16px] font-bold text-white transition-colors group-hover:text-[#b8ff57]">
                {step.title}
              </h3>
              <p className="mb-4 text-[13px] leading-[1.7] text-gray-400">{step.desc}</p>
              <p className="font-mono text-[11px] tracking-wide text-[#b8ff57]/60 transition-colors group-hover:text-[#b8ff57]">
                {step.accent}
              </p>

              {/* Animated bottom accent */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#b8ff57] transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
