"use client";
import { useScrollReveal } from "../useScrollReveal";

export default function Contact() {
  const ref = useScrollReveal();

  return (
    <section id="contact" ref={ref} className="relative overflow-hidden border-b border-white/[0.07] bg-[#060608] px-4 py-[120px] text-center">

      {/* Animated rings */}
      {[1, 2, 3].map(i => (
        <div
          key={i}
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#b8ff57]/10"
          style={{
            width: i * 280,
            height: i * 280,
            animation: `ringPulse ${2 + i * 0.7}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}

      {/* Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ width: 500, height: 500, background: "radial-gradient(circle, rgba(184,255,87,0.07) 0%, transparent 65%)" }} />

      <div className="container relative mx-auto">
        <div data-reveal className="reveal-item mb-5 flex justify-center">
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#b8ff57]">/ Get Started</span>
        </div>

        <h2
          data-reveal data-delay="60"
          className="reveal-item mb-6 font-extrabold leading-[1.02] tracking-[-0.03em] text-white"
          style={{ fontSize: "clamp(36px,6vw,72px)" }}
        >
          Ready to build<br />something with{" "}
          <span className="text-[#b8ff57]">AI?</span>
        </h2>

        <p data-reveal data-delay="120" className="reveal-item mx-auto mb-12 max-w-[500px] text-base leading-relaxed text-gray-400">
          Book a free 30-minute consultation. No commitment — just a real conversation about your goals.
        </p>

        <div data-reveal data-delay="180" className="reveal-item">
          <a
            href="https://calendly.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-block overflow-hidden bg-[#b8ff57] px-10 py-4 text-[14px] font-bold uppercase tracking-widest text-black transition-all hover:shadow-[0_0_60px_rgba(184,255,87,0.4)]"
          >
            <span className="relative z-10">Schedule Free AI Consultation →</span>
            <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0" />
          </a>
        </div>

        <div data-reveal data-delay="240" className="reveal-item mt-10 flex flex-wrap items-center justify-center gap-8">
          {["US-registered LLC","Fixed-scope pricing","NDA on request","Irving, Texas"].map(item => (
            <div key={item} className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide text-gray-600">
              <span className="h-1.5 w-1.5 rounded-full bg-[#b8ff57]/60" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
