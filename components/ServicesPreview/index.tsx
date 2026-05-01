"use client";
import Link from "next/link";
import { useEffect } from "react";

const services = [
  { n:"01", title:"Mobile App Development", desc:"Native-quality iOS & Android apps built with Flutter or React Native. Concept to App Store — fast, polished, scalable.", tags:["Flutter","React Native"] },
  { n:"02", title:"Website Development",    desc:"High-performance Next.js websites. SEO-optimized, conversion-driven, and built to represent your brand at its best.", tags:["Next.js","React"] },
  { n:"03", title:"AI Solutions",           desc:"Custom AI models, LLM integrations, and GPT-powered tools tailored to your exact business challenges.", tags:["OpenAI","LangChain"] },
  { n:"04", title:"Business Automation",    desc:"Eliminate repetitive work. AI workflows that reduce costs and free your team for high-value work.", tags:["n8n","Zapier","Make"] },
  { n:"05", title:"AI-Driven Growth",       desc:"AI-powered marketing, lead gen, and revenue systems. Build the growth engine your competitors wish they had.", tags:["Analytics","CRM AI"] },
  { n:"06", title:"Chatbot Creation",       desc:"Intelligent chatbots for WhatsApp, web, Slack and more. 24/7 support and lead capture — live in days.", tags:["WhatsApp","Web","Slack"] },
];

export default function ServicesPreview() {
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".svc-card");
    cards.forEach(card => {
      const move = (e: MouseEvent) => {
        const r  = card.getBoundingClientRect();
        const rx = ((e.clientY - r.top  - r.height/2) / (r.height/2)) * -7;
        const ry = ((e.clientX - r.left - r.width /2) / (r.width /2)) *  7;
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
        const gl = card.querySelector<HTMLElement>(".svc-glare");
        if (gl) { const gx=((e.clientX-r.left)/r.width)*100; const gy=((e.clientY-r.top)/r.height)*100; gl.style.background=`radial-gradient(circle at ${gx}% ${gy}%,rgba(184,255,87,0.1) 0%,transparent 55%)`; }
      };
      const leave = () => { card.style.transform="perspective(900px) rotateX(0) rotateY(0) scale(1)"; const gl=card.querySelector<HTMLElement>(".svc-glare"); if(gl) gl.style.background="transparent"; };
      card.addEventListener("mousemove",move);
      card.addEventListener("mouseleave",leave);
    });
  }, []);

  return (
    <section id="services" className="border-b border-white/[0.06] bg-[#040406] px-4 py-24">
      <div className="container mx-auto">
        <div data-reveal className="mb-10">
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[#b8ff57]">/ Services</span>
        </div>
        <div className="mb-14 flex flex-wrap items-end justify-between gap-8">
          <h2 data-reveal data-delay="60" className="font-extrabold leading-[1.02] tracking-[-0.03em] text-white" style={{fontSize:"clamp(30px,5vw,52px)"}}>
            What we<br />build for you
          </h2>
          <div data-reveal data-delay="120" className="flex items-center gap-4">
            <p className="max-w-[360px] text-[14px] leading-[1.85] text-gray-400">Every layer of the stack, powered by the latest AI tools and frameworks.</p>
            <Link href="/services" className="shrink-0 border border-white/10 px-5 py-2.5 font-mono text-[10px] uppercase tracking-wider text-gray-400 transition hover:border-[#b8ff57]/50 hover:text-[#b8ff57]">All Services →</Link>
          </div>
        </div>

        <div className="grid grid-cols-1 border border-white/[0.06] sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s,i) => (
            <div key={i} data-reveal data-delay={`${i*70}`}
              className={`svc-card group relative overflow-hidden border-white/[0.06] p-8 transition-all duration-150 hover:bg-[#b8ff57]/[0.02]
                ${i%3!==2?"lg:border-r":""}  ${i%2===0?"sm:border-r lg:border-r-0":""}
                ${i<3?"lg:border-b":""} ${i<4?"sm:border-b lg:border-b-0":""} border-b last:border-b-0`}
              style={{transition:"transform .12s ease"}}>
              <div className="svc-glare pointer-events-none absolute inset-0 transition-all duration-200" />
              <div className="mb-5 flex h-9 w-9 items-center justify-center border border-white/10 font-mono text-[11px] font-bold text-[#b8ff57] transition group-hover:border-[#b8ff57] group-hover:bg-[#b8ff57]/10">
                {s.n}
              </div>
              <h3 className="mb-2.5 text-[15px] font-bold text-white transition group-hover:text-[#b8ff57]">{s.title}</h3>
              <p className="mb-5 text-[12px] leading-[1.7] text-gray-400">{s.desc}</p>
              <div className="flex items-center justify-between border-t border-white/[0.06] pt-4">
                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map(t=><span key={t} className="border border-white/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wide text-gray-600 transition group-hover:border-[#b8ff57]/25 group-hover:text-[#b8ff57]/60">{t}</span>)}
                </div>
                <span className="text-[#b8ff57] opacity-30 transition group-hover:translate-x-1 group-hover:opacity-100">→</span>
              </div>
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#b8ff57] transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
