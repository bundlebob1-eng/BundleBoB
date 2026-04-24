"use client";
import { useScrollReveal } from "../useScrollReveal";

const testimonials = [
  { q: "They built our customer support chatbot in under 3 weeks. It now handles 80% of tickets automatically. The ROI was immediate.", name: "Sarah K. — CEO", co: "RetailTech Co." },
  { q: "The mobile app exceeded every expectation — clean, fast, and exactly what our users needed. From idea to App Store in 6 weeks.", name: "Marcus D. — Founder", co: "HealthApp Startup" },
  { q: "Our entire sales outreach now runs on their AI automation. We cut 20 hours of manual work per week and doubled our pipeline.", name: "Priya M. — VP Sales", co: "B2B SaaS Company" },
  { q: "Transparent, fast, and genuinely invested in our success. Not a vendor — a real technology partner. We're on our third project.", name: "James R. — COO", co: "Logistics Firm" },
];

export default function Testimonials() {
  const ref = useScrollReveal();

  return (
    <section id="testimonials" ref={ref} className="border-b border-white/[0.07] bg-[#08080a] px-4 py-28">
      <div className="container mx-auto">
        <div data-reveal className="reveal-item mb-10">
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#b8ff57]">/ Client Stories</span>
        </div>

        <div className="mb-16 flex flex-wrap items-end justify-between gap-8">
          <h2 data-reveal data-delay="60" className="reveal-item font-extrabold leading-[1.02] tracking-[-0.03em] text-white" style={{ fontSize: "clamp(32px,5vw,56px)" }}>
            What our<br />clients say
          </h2>
          <p data-reveal data-delay="120" className="reveal-item max-w-[400px] text-[15px] leading-7 text-gray-400">
            Real results from businesses that trusted BundleBOB to build their most important systems.
          </p>
        </div>

        <div className="grid grid-cols-1 border border-white/[0.07] sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <div
              key={i}
              data-reveal data-delay={`${i * 100}`}
              className={`reveal-item group relative overflow-hidden p-10 transition-all duration-500 hover:bg-[#b8ff57]/[0.03]
                ${i % 2 === 0 ? "sm:border-r sm:border-white/[0.07]" : ""}
                ${i < 2 ? "border-b border-white/[0.07]" : ""}
              `}
            >
              {/* Animated quote mark */}
              <div
                className="mb-6 font-serif text-5xl leading-none text-[#b8ff57] transition-all duration-300 group-hover:scale-110"
                style={{ lineHeight: 1 }}
              >
                &ldquo;
              </div>

              <p className="mb-8 text-[15px] font-light leading-[1.8] text-white/80">{t.q}</p>

              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#b8ff57]/30 bg-[#b8ff57]/10 font-mono text-[11px] font-bold text-[#b8ff57]">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-[#b8ff57]">{t.name}</div>
                  <div className="text-[11px] text-gray-500">{t.co}</div>
                </div>
              </div>

              {/* Bottom slide accent */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#b8ff57]/30 transition-all duration-700 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
