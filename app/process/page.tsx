import type { Metadata } from "next";
import CTA from "@/components/CTA";
export const metadata: Metadata = { title:"Our Process", description:"How BundleBOB works: free consultation, fixed-scope proposal, build & iterate, launch & support." };

const phases = [
  { n:"01", title:"Free Consultation", duration:"30 minutes", desc:"We start with a real conversation — not a sales pitch. We dig into your business, your goals, and the exact outcomes you need. You'll leave with clarity on whether we're the right fit, even if you don't hire us.",
    details:["Deep-dive into your business model","Identify the highest-impact AI opportunities","Discuss budget, timeline, and constraints","Honest assessment of what's possible","No pressure, no obligation"], outcome:"You know exactly what AI can do for your business." },
  { n:"02", title:"Scope & Proposal",  duration:"2–3 business days", desc:"After the consultation, we prepare a detailed project proposal with a fixed price, clear deliverables, and a realistic timeline. Everything is in writing. No surprises.",
    details:["Complete technical specification","Fixed-price quote — no scope creep charges","Milestone-based delivery schedule","Technology stack recommendation","Risk identification and mitigation"], outcome:"A complete plan you can take to your team or board." },
  { n:"03", title:"Build & Iterate",   duration:"2–8 weeks", desc:"We work in 1-week sprints with live demos every Friday. You see real, working progress at every checkpoint. Changes are welcome — we'd rather adjust early than deliver the wrong thing.",
    details:["Weekly sprint demos — every Friday","Direct Slack channel with your team","Figma designs before any code","Staging environment from week 1","Testing at every stage"], outcome:"A product you've seen and approved at every step." },
  { n:"04", title:"Launch & Support",  duration:"Ongoing", desc:"We don't disappear at launch. We deploy, monitor, and support your product. Every project includes 30–60 days of post-launch support. After that, flexible retainer options keep us in your corner.",
    details:["Managed deployment to production","Performance monitoring setup","30–60 day post-launch support","Documentation & handoff","Optional ongoing retainer"], outcome:"A live product with a team behind it long-term." },
];

export default function ProcessPage() {
  return (
    <div className="pt-24">
      <section className="border-b border-white/[0.06] bg-[#040406] px-4 py-20">
        <div className="container mx-auto">
          <div className="mb-6 flex items-center gap-2.5"><span className="h-px w-8 bg-[#b8ff57]" /><span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b8ff57]">Process</span></div>
          <h1 className="mb-6 font-extrabold leading-tight tracking-[-0.04em] text-white" style={{fontSize:"clamp(40px,7vw,88px)"}}>
            How we<br />work <span className="text-[#b8ff57]">with you</span>
          </h1>
          <p className="max-w-[500px] text-[15px] leading-[1.85] text-gray-400">A clear, transparent process from first call to live product. No surprises, no black boxes — just steady, visible progress every step of the way.</p>
        </div>
      </section>

      {phases.map((p,i) => (
        <section key={i} className={`border-b border-white/[0.06] px-4 py-20 ${i%2===0?"bg-[#040406]":"bg-[#07070a]"}`}>
          <div className="container mx-auto">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              <div data-reveal-left>
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center border border-[#b8ff57]/40 bg-[#b8ff57]/10 font-mono text-xl font-black text-[#b8ff57]">{p.n}</div>
                  <div>
                    <div className="text-[17px] font-bold text-white">{p.title}</div>
                    <div className="font-mono text-[10px] text-[#b8ff57]/60">{p.duration}</div>
                  </div>
                </div>
                <p className="mb-6 text-[14px] leading-[1.85] text-gray-400">{p.desc}</p>
                <div className="border border-[#b8ff57]/20 bg-[#b8ff57]/5 p-5">
                  <div className="mb-2 font-mono text-[9px] uppercase tracking-[0.16em] text-[#b8ff57]">Outcome</div>
                  <p className="text-[13px] font-medium text-white">{p.outcome}</p>
                </div>
              </div>
              <div data-reveal-right>
                <div className="border border-white/[0.07]">
                  <div className="border-b border-white/[0.07] px-6 py-4 font-mono text-[9px] uppercase tracking-[0.16em] text-gray-500">What happens</div>
                  {p.details.map((d,j)=>(
                    <div key={j} className={`flex items-start gap-3 px-6 py-4 transition hover:bg-[#b8ff57]/[0.03] ${j<p.details.length-1?"border-b border-white/[0.07]":""}`}>
                      <span className="mt-0.5 text-[#b8ff57]">→</span>
                      <span className="text-[13px] text-gray-300">{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
      <CTA />
    </div>
  );
}
