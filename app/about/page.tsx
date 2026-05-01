import type { Metadata } from "next";
import CTA from "@/components/CTA";
export const metadata: Metadata = { title:"About", description:"BundleBOB is a US-registered LLC of engineers, designers, and AI specialists based in Irving, Texas." };

const team = [
  { role:"Founder & CEO",       focus:"Strategy, AI Architecture, Client Partnerships" },
  { role:"Lead Mobile Engineer", focus:"Flutter, React Native, iOS & Android" },
  { role:"AI/ML Engineer",       focus:"OpenAI, LangChain, Python, Vector DBs" },
  { role:"Full-Stack Developer", focus:"Next.js, Node.js, Supabase, PostgreSQL" },
  { role:"Automation Engineer",  focus:"n8n, Zapier, Make, Business Workflows" },
  { role:"UI/UX Designer",       focus:"Figma, Design Systems, User Research" },
];

const values = [
  { t:"Ship fast, ship right",     d:"We believe speed and quality aren't opposites. We move fast without cutting corners — because your time and reputation matter." },
  { t:"AI-native thinking",        d:"We don't bolt AI on at the end. We start every engagement by asking how AI can make it fundamentally better." },
  { t:"Radical transparency",      d:"No surprises. No vague estimates. Fixed scopes, honest timelines, and direct communication from day one." },
  { t:"Outcomes over outputs",     d:"We measure success by your business results — not lines of code or features shipped." },
  { t:"Long-term partnerships",    d:"Our best clients are the ones who come back. We build relationships, not transactions." },
];

export default function AboutPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="border-b border-white/[0.06] bg-[#040406] px-4 py-20">
        <div className="container mx-auto grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-6 flex items-center gap-2.5"><span className="h-px w-8 bg-[#b8ff57]" /><span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b8ff57]">About</span></div>
            <h1 className="mb-7 font-extrabold leading-tight tracking-[-0.04em] text-white" style={{fontSize:"clamp(38px,6vw,76px)"}}>
              Built by builders,<br />for <span className="text-[#b8ff57]">real businesses.</span>
            </h1>
            <p className="text-[15px] leading-[1.85] text-gray-400 max-w-[480px]">BundleBOB is a US-registered LLC of engineers, designers, and AI specialists based in Irving, Texas. We build things that actually work — and tie every project to your revenue and growth.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[{v:"50+",l:"Projects delivered"},{v:"98%",l:"Client satisfaction"},{v:"4x",l:"Average client ROI"},{v:"2025",l:"Founded"}].map(x=>(
              <div key={x.l} className="border border-white/[0.07] p-6">
                <div className="font-extrabold leading-none tracking-tight text-[#b8ff57]" style={{fontSize:40}}>{x.v}</div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-gray-500">{x.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="border-b border-white/[0.06] bg-[#07070a] px-4 py-20">
        <div className="container mx-auto max-w-3xl text-center">
          <div data-reveal className="mb-8"><span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b8ff57]">/ Our Mission</span></div>
          <blockquote data-reveal data-delay="60" className="font-extrabold leading-tight tracking-[-0.03em] text-white" style={{fontSize:"clamp(24px,4vw,46px)"}}>
            &ldquo;To make AI-powered technology accessible to every business — not just the ones with $500k engineering budgets.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* Values */}
      <section className="border-b border-white/[0.06] bg-[#040406] px-4 py-20">
        <div className="container mx-auto">
          <div data-reveal className="mb-10"><span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b8ff57]">/ Our Values</span></div>
          <div className="grid grid-cols-1 gap-0 border border-white/[0.07] sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v,i)=>(
              <div key={i} data-reveal data-delay={`${i*70}`}
                className={`group p-8 transition hover:bg-[#b8ff57]/[0.03] relative overflow-hidden ${i%3!==2?"lg:border-r lg:border-white/[0.07]":""} ${i%2===0?"sm:border-r sm:border-white/[0.07] lg:border-r-0":""} ${i<values.length-3?"lg:border-b lg:border-white/[0.07]":""} border-b border-white/[0.07] last:border-b-0`}>
                <h3 className="mb-3 text-[15px] font-bold text-white transition group-hover:text-[#b8ff57]">{v.t}</h3>
                <p className="text-[13px] leading-[1.7] text-gray-400">{v.d}</p>
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#b8ff57] transition-all duration-500 group-hover:w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="border-b border-white/[0.06] bg-[#07070a] px-4 py-20">
        <div className="container mx-auto">
          <div data-reveal className="mb-10"><span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b8ff57]">/ The Team</span></div>
          <h2 data-reveal data-delay="60" className="mb-12 font-extrabold tracking-[-0.03em] text-white" style={{fontSize:"clamp(28px,4vw,46px)"}}>Senior specialists,<br />no juniors on your project</h2>
          <div className="grid grid-cols-1 gap-0 border border-white/[0.07] sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m,i)=>(
              <div key={i} data-reveal data-delay={`${i*60}`}
                className={`group p-7 transition hover:bg-[#b8ff57]/[0.03] ${i%3!==2?"lg:border-r lg:border-white/[0.07]":""} ${i%2===0?"sm:border-r sm:border-white/[0.07] lg:border-r-0":""} border-b border-white/[0.07]`}>
                <div className="mb-4 flex h-11 w-11 items-center justify-center border border-[#b8ff57]/25 bg-[#b8ff57]/10 font-mono text-[11px] font-bold text-[#b8ff57]">
                  {String(i+1).padStart(2,"0")}
                </div>
                <h3 className="mb-1.5 text-[14px] font-bold text-white transition group-hover:text-[#b8ff57]">{m.role}</h3>
                <p className="font-mono text-[10px] text-gray-500">{m.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </div>
  );
}
