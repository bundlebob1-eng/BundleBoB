"use client";
import { useScrollReveal } from "../useScrollReveal";

const tech = ["React / Next.js","Flutter","OpenAI","LangChain","Python","n8n","Node.js","Supabase","PostgreSQL","AWS / Vercel","TypeScript","Tailwind CSS"];
const why = [
  { t: "AI-first, not AI-bolted-on", d: "Every project is architected with AI from day one — not added as an afterthought." },
  { t: "Fixed-scope pricing", d: "No surprise invoices. You know the full cost before we write a single line." },
  { t: "Startup speed, senior quality", d: "MVPs in weeks, not months. We move at your pace without cutting corners." },
  { t: "US-registered LLC", d: "Proper contracts, NDAs, IP protection, and full legal accountability." },
  { t: "End-to-end ownership", d: "Strategy, design, code, QA, launch, and support — one team, zero chaos." },
];

export default function About() {
  const ref = useScrollReveal();

  return (
    <section id="about" ref={ref} className="border-b border-white/[0.07] bg-[#060608] px-4 py-28">
      <div className="container mx-auto">
        <div data-reveal className="reveal-item mb-10">
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#b8ff57]">/ About BundleBOB</span>
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left */}
          <div>
            <h2
              data-reveal data-delay="60"
              className="reveal-item mb-8 font-extrabold leading-tight tracking-[-0.03em] text-white"
              style={{ fontSize: "clamp(28px,4vw,48px)" }}
            >
              A modern LLC<br />built for the<br />
              <span className="text-[#b8ff57]">AI era.</span>
            </h2>

            <div data-reveal data-delay="120" className="reveal-item space-y-5 text-[15px] leading-[1.85] text-gray-400">
              <p>
                BundleBOB is a <strong className="font-medium text-white">US-registered LLC</strong> of engineers,
                designers, and AI specialists obsessed with building things that actually work.
                We don&apos;t just consult — we build, ship, and deliver measurable results.
              </p>
              <p>
                We combine deep technical expertise with sharp business thinking. Every
                app, automation, or AI system we build is tied directly to{" "}
                <strong className="font-medium text-white">your revenue and growth goals.</strong>
              </p>
            </div>

            {/* Tech pills with stagger */}
            <div data-reveal data-delay="180" className="reveal-item mt-9 flex flex-wrap gap-2">
              {tech.map((pill, i) => (
                <span
                  key={pill}
                  className="group cursor-default border border-white/[0.08] px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-gray-500 transition-all duration-300 hover:border-[#b8ff57]/50 hover:bg-[#b8ff57]/5 hover:text-[#b8ff57]"
                  style={{ transitionDelay: `${i * 30}ms` }}
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>

          {/* Right */}
          <div data-reveal data-delay="100" className="reveal-item">
            <div className="border border-white/[0.07]">
              <div className="border-b border-white/[0.07] px-7 py-5 font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-gray-500">
                Why BundleBOB
              </div>
              {why.map((item, i) => (
                <div
                  key={i}
                  className={`group flex gap-4 px-7 py-6 transition-all duration-300 hover:bg-[#b8ff57]/[0.03] ${i < why.length - 1 ? "border-b border-white/[0.07]" : ""}`}
                >
                  <span className="mt-0.5 shrink-0 text-[#b8ff57] opacity-40 transition-all group-hover:translate-x-1 group-hover:opacity-100">→</span>
                  <div>
                    <div className="mb-1 text-[14px] font-medium text-white transition-colors group-hover:text-[#b8ff57]">{item.t}</div>
                    <div className="text-[12px] leading-relaxed text-gray-500">{item.d}</div>
                  </div>
                  {/* Slide-in underline */}
                  <div className="absolute bottom-0 left-0 h-px w-0 bg-[#b8ff57]/20 transition-all duration-500 group-hover:w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
