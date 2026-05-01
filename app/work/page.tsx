import type { Metadata } from "next";
import CTA from "@/components/CTA";
export const metadata: Metadata = { title:"Our Work", description:"Case studies and projects from BundleBOB — mobile apps, AI chatbots, business automation, and websites." };

const cases = [
  { n:"01", type:"AI Chatbot", client:"RetailTech Co.", title:"Customer Support Chatbot", result:"80% ticket deflection, $40k/yr saved", desc:"Built a fully autonomous AI support bot for a retail SaaS company handling 500+ daily tickets. Integrated with Zendesk and trained on 3 years of support history.", stack:["OpenAI GPT-4","LangChain","Zendesk API","Next.js"], metrics:[{v:"80%",l:"Tickets handled automatically"},{v:"3wk",l:"Build time"},{v:"$40k",l:"Annual savings"}] },
  { n:"02", type:"Mobile App", client:"HealthApp Startup", title:"Patient Engagement App", result:"12k downloads in first month", desc:"Cross-platform iOS & Android app for a health startup. Includes appointment booking, medication reminders, telehealth video calls, and AI-powered symptom checker.", stack:["Flutter","Firebase","OpenAI","Stripe"], metrics:[{v:"12k",l:"Downloads in month one"},{v:"4.8★",l:"App Store rating"},{v:"6wk",l:"Idea to App Store"}] },
  { n:"03", type:"Business Automation", client:"B2B SaaS Company", title:"Sales Outreach Automation", result:"2× pipeline in 45 days", desc:"Replaced 20 hours/week of manual sales work with an AI-driven outreach system. Auto-research, personalized email sequences, reply detection, and CRM sync.", stack:["n8n","OpenAI","HubSpot","Clay"], metrics:[{v:"20h",l:"Saved per week"},{v:"2×",l:"Pipeline growth"},{v:"45d",l:"To full automation"}] },
  { n:"04", type:"Website", client:"Logistics Firm", title:"B2B Marketing Website", result:"3× organic traffic in 90 days", desc:"Rebuilt a logistics company's outdated website into a high-performance Next.js site with 95+ Lighthouse scores, blog, careers page, and lead capture system.", stack:["Next.js","Tailwind","Sanity CMS","Vercel"], metrics:[{v:"3×",l:"Organic traffic growth"},{v:"95+",l:"Lighthouse score"},{v:"2wk",l:"Design to launch"}] },
];

export default function WorkPage() {
  return (
    <div className="pt-24">
      <section className="border-b border-white/[0.06] bg-[#040406] px-4 py-20">
        <div className="container mx-auto">
          <div className="mb-6 flex items-center gap-2.5"><span className="h-px w-8 bg-[#b8ff57]" /><span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b8ff57]">Our Work</span></div>
          <h1 className="mb-6 font-extrabold leading-tight tracking-[-0.04em] text-white" style={{fontSize:"clamp(40px,7vw,88px)"}}>
            Projects that<br /><span className="text-[#b8ff57]">moved the needle</span>
          </h1>
          <p className="max-w-[500px] text-[15px] leading-[1.85] text-gray-400">A selection of recent work across mobile apps, AI systems, automation, and web development. Every result is real and verifiable.</p>
        </div>
      </section>

      {cases.map((c,i) => (
        <section key={i} className={`border-b border-white/[0.06] px-4 py-20 ${i%2===0?"bg-[#040406]":"bg-[#07070a]"}`}>
          <div className="container mx-auto">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              <div data-reveal-left>
                <div className="mb-4 flex items-center gap-3">
                  <span className="border border-[#b8ff57]/25 bg-[#b8ff57]/10 px-3 py-1 font-mono text-[9px] uppercase tracking-widest text-[#b8ff57]">{c.type}</span>
                  <span className="font-mono text-[10px] text-gray-500">{c.client}</span>
                </div>
                <h2 className="mb-3 font-extrabold tracking-[-0.03em] text-white" style={{fontSize:"clamp(24px,3.5vw,38px)"}}>{c.title}</h2>
                <p className="mb-2 font-mono text-[12px] text-[#b8ff57]">{c.result}</p>
                <p className="mb-8 text-[14px] leading-[1.85] text-gray-400">{c.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {c.stack.map(t=><span key={t} className="border border-white/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wide text-gray-500">{t}</span>)}
                </div>
              </div>
              <div data-reveal-right>
                <div className="grid grid-cols-3 gap-0 border border-white/[0.07]">
                  {c.metrics.map((m,j)=>(
                    <div key={j} className={`p-6 text-center ${j<2?"border-r border-white/[0.07]":""}`}>
                      <div className="font-extrabold leading-none tracking-tight text-[#b8ff57]" style={{fontSize:34}}>{m.v}</div>
                      <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.1em] text-gray-500">{m.l}</div>
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
