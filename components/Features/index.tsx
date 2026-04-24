"use client";
import { useEffect, useRef } from "react";
import { useScrollReveal } from "../useScrollReveal";

const services = [
  { num: "01", title: "Mobile App Development", desc: "Native-quality iOS & Android apps built with Flutter or React Native. From concept to App Store — fast, polished, scalable.", tags: ["Flutter", "React Native"], icon: "M" },
  { num: "02", title: "Website Development", desc: "High-performance websites. SEO-optimized, conversion-driven, built to represent your brand at its absolute best.", tags: ["Next.js", "React"], icon: "W" },
  { num: "03", title: "AI Solutions", desc: "Custom AI models, LLM integrations, and GPT-powered tools — tailored to your business challenges and workflows.", tags: ["OpenAI", "LangChain"], icon: "A" },
  { num: "04", title: "Business Automation", desc: "Eliminate repetitive work. AI-powered workflows reduce costs and free your team for what actually matters.", tags: ["n8n", "Zapier"], icon: "B" },
  { num: "05", title: "AI-Driven Growth", desc: "AI-powered marketing, lead gen, and revenue systems. Build the growth engine your competitors wish they had.", tags: ["Analytics", "CRM AI"], icon: "G" },
  { num: "06", title: "Chatbot Creation", desc: "Intelligent chatbots for WhatsApp, web, and Slack. 24/7 customer support and lead capture — live in days.", tags: ["WhatsApp", "Web"], icon: "C" },
];

export default function Services() {
  const sectionRef = useScrollReveal();

  /* 3D tilt on each card */
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".tilt-card");
    const handlers: Array<{ el: HTMLElement; enter: () => void; move: (e: MouseEvent) => void; leave: () => void }> = [];

    cards.forEach(card => {
      const enter = () => {};
      const move = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const rx = ((e.clientY - cy) / (rect.height / 2)) * -8;
        const ry = ((e.clientX - cx) / (rect.width / 2)) * 8;
        card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
        const glare = card.querySelector<HTMLElement>(".card-glare");
        if (glare) {
          const gx = ((e.clientX - rect.left) / rect.width) * 100;
          const gy = ((e.clientY - rect.top) / rect.height) * 100;
          glare.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(184,255,87,0.12) 0%, transparent 60%)`;
        }
      };
      const leave = () => {
        card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
        const glare = card.querySelector<HTMLElement>(".card-glare");
        if (glare) glare.style.background = "transparent";
      };
      card.addEventListener("mouseenter", enter);
      card.addEventListener("mousemove", move);
      card.addEventListener("mouseleave", leave);
      handlers.push({ el: card, enter, move, leave });
    });

    return () => {
      handlers.forEach(({ el, enter, move, leave }) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return (
    <section id="services" ref={sectionRef} className="border-b border-white/[0.07] bg-[#060608] px-4 py-28">
      <div className="container mx-auto">
        {/* Label */}
        <div data-reveal data-delay="0" className="reveal-item mb-10 flex items-center gap-2.5">
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#b8ff57]">/ Services</span>
        </div>

        {/* Heading */}
        <div className="mb-16 flex flex-wrap items-end justify-between gap-8">
          <h2
            data-reveal data-delay="0"
            className="reveal-item font-extrabold leading-[1.02] tracking-[-0.03em] text-white"
            style={{ fontSize: "clamp(32px,5vw,56px)" }}
          >
            What we<br />build for you
          </h2>
          <p data-reveal data-delay="100" className="reveal-item max-w-[400px] text-[15px] leading-[1.85] text-gray-400">
            From idea to deployed product — every layer of the stack, powered by the latest AI tools.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 border border-white/[0.07] sm:grid-cols-2 lg:grid-cols-3">
          {services.map((svc, i) => (
            <div
              key={i}
              data-reveal data-delay={`${i * 80}`}
              className={`reveal-item tilt-card group relative cursor-pointer overflow-hidden border-white/[0.07] p-8 transition-all duration-500
                ${i % 3 !== 2 ? "lg:border-r" : ""}
                ${i % 2 === 0 ? "sm:border-r lg:border-r-0" : ""}
                ${i % 3 !== 2 ? "lg:border-r" : ""}
                ${i < 4 ? "sm:border-b lg:border-b-0" : ""}
                ${i < 3 ? "lg:border-b" : ""}
                border-b last:border-b-0
              `}
              style={{ transition: "transform 0.15s ease, background 0.3s" }}
            >
              {/* Glare overlay */}
              <div className="card-glare pointer-events-none absolute inset-0 transition-all duration-300" />

              {/* Animated corner accent */}
              <div
                className="absolute right-0 top-0 h-16 w-16 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "linear-gradient(225deg, rgba(184,255,87,0.08) 0%, transparent 60%)" }}
              />

              <div className="mb-6 flex h-10 w-10 items-center justify-center border border-white/10 font-mono text-sm font-bold text-[#b8ff57] transition-colors duration-300 group-hover:border-[#b8ff57] group-hover:bg-[#b8ff57]/10">
                {svc.icon}
              </div>

              <div className="mb-2 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-[#b8ff57]/60">
                {svc.num}
              </div>
              <div className="mb-3 text-[17px] font-bold tracking-[-0.01em] text-white transition-colors group-hover:text-[#b8ff57]">
                {svc.title}
              </div>
              <div className="flex-1 text-[13px] leading-[1.7] text-gray-400">{svc.desc}</div>

              <div className="mt-6 flex items-center justify-between border-t border-white/[0.07] pt-5">
                <div className="flex flex-wrap gap-1.5">
                  {svc.tags.map(tag => (
                    <span key={tag} className="border border-white/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-gray-600 transition-colors group-hover:border-[#b8ff57]/30 group-hover:text-[#b8ff57]/60">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-[#b8ff57] opacity-30 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
