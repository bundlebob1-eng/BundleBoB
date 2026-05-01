"use client";
import { useState } from "react";
const P = [
  { name:"Starter", tag:"Launch-ready web presence", price:1500, desc:"Perfect for small businesses needing a professional website and basic automation to get off the ground fast.",
    features:["Custom Next.js website (5 pages)","Mobile-responsive design","Basic SEO optimization","Contact form & CRM integration","1 AI chatbot (web)","2-week delivery","30-day support"], hot:false },
  { name:"Growth",  tag:"AI-powered business system", price:4500, desc:"For businesses ready to scale with AI. Full product build plus automation and AI integration.",
    features:["Everything in Starter","Mobile app (iOS + Android)","AI chatbot (WhatsApp + Web + Slack)","Business automation (n8n/Zapier)","Custom AI integration","Analytics dashboard","60-day support"], hot:true },
  { name:"Enterprise", tag:"Full AI transformation", price:0, desc:"End-to-end AI transformation for established businesses. Custom scope, dedicated team, ongoing partnership.",
    features:["Everything in Growth","Dedicated engineering team","Custom AI model development","Full business process automation","AI-driven marketing systems","Ongoing retainer & support","NDA + IP protection"], hot:false },
];
export default function Pricing() {
  const [yearly, setYearly] = useState(false);
  return (
    <section id="pricing" className="border-b border-white/[0.06] bg-[#040406] px-4 py-24">
      <div className="container mx-auto">
        <div data-reveal className="mb-10"><span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[#b8ff57]">/ Pricing</span></div>
        <div data-reveal data-delay="60" className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-extrabold leading-tight tracking-[-0.03em] text-white" style={{fontSize:"clamp(30px,5vw,52px)"}}>Simple &amp;<br />transparent pricing</h2>
          <div className="flex items-center gap-3">
            <span className={`font-mono text-[11px] ${!yearly?"text-white":"text-gray-500"}`}>One-time</span>
            <button onClick={()=>setYearly(!yearly)} className={`relative h-6 w-11 rounded-full border transition ${yearly?"border-[#b8ff57] bg-[#b8ff57]/15":"border-white/15 bg-white/5"}`}>
              <span className={`absolute top-0.5 h-5 w-5 rounded-full transition-all ${yearly?"left-5 bg-[#b8ff57]":"left-0.5 bg-gray-500"}`} />
            </button>
            <span className={`font-mono text-[11px] ${yearly?"text-white":"text-gray-500"}`}>Retainer <span className="rounded bg-[#b8ff57]/10 px-1.5 py-0.5 text-[9px] font-bold text-[#b8ff57]">-15%</span></span>
          </div>
        </div>
        <div className="grid grid-cols-1 border border-white/[0.06] md:grid-cols-3">
          {P.map((p,i)=>(
            <div key={i} data-reveal data-delay={`${i*80}`}
              className={`flex flex-col p-8 transition ${i<2?"border-b border-white/[0.06] md:border-b-0 md:border-r":""} ${p.hot?"bg-[#07070a]":""}`}>
              {p.hot && <div className="mb-4 w-fit bg-[#b8ff57] px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-black">Most Popular</div>}
              <div className="mb-1 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-gray-500">{p.name}</div>
              <div className="mb-3 text-[15px] font-bold text-white">{p.tag}</div>
              <div className="mb-4">
                {p.price ? (
                  <div className="flex items-baseline gap-1">
                    <span className="font-extrabold leading-none tracking-tight text-[#b8ff57]" style={{fontSize:38}}>${yearly ? Math.round(p.price*.85).toLocaleString() : p.price.toLocaleString()}</span>
                    <span className="font-mono text-[11px] text-gray-500">{yearly?"/mo retainer":" project"}</span>
                  </div>
                ) : <div className="font-extrabold text-3xl text-white tracking-tight">Custom</div>}
              </div>
              <p className="mb-6 font-mono text-[11px] leading-relaxed text-gray-500">{p.desc}</p>
              <ul className="mb-8 flex-1 space-y-2.5">
                {p.features.map(f=>(
                  <li key={f} className="flex items-start gap-2 font-mono text-[11px] text-gray-400">
                    <span className="mt-0.5 shrink-0 text-[#b8ff57]">✓</span>{f}
                  </li>
                ))}
              </ul>
              <a href="/contact" className={`block w-full px-5 py-3 text-center font-mono text-[10px] font-bold uppercase tracking-wider transition ${p.hot?"bg-[#b8ff57] text-black hover:opacity-90":"border border-white/15 text-white hover:border-[#b8ff57]/50 hover:text-[#b8ff57]"}`}>
                Get Started →
              </a>
            </div>
          ))}
        </div>
        <p className="mt-5 text-center font-mono text-[10px] text-gray-600">All prices are estimates. Final pricing determined after free consultation. Fixed-scope contracts only.</p>
      </div>
    </section>
  );
}
