import type { Metadata } from "next";
import CTA from "@/components/CTA";

export const metadata: Metadata = { title:"Services", description:"BundleBOB offers mobile app development, website development, AI solutions, business automation, chatbot creation, and AI-driven growth services." };

const services = [
  { n:"01", title:"Mobile App Development", hero:"Cross-platform apps that feel native", desc:"We build iOS and Android apps using Flutter and React Native that perform like native apps at a fraction of the cost and time. From MVP to full-scale product — we handle the entire lifecycle.", detail:["Flutter & React Native","App Store & Play Store launch","Push notifications & offline support","Payment integration (Stripe, PayPal)","Analytics & crash reporting","Post-launch maintenance"], tags:["Flutter","React Native","Dart","Firebase"] },
  { n:"02", title:"Website Development",     hero:"High-performance web presence", desc:"Modern, fast, SEO-optimized websites and web apps built on Next.js and React. Every site we build is conversion-focused, mobile-first, and designed to grow your business.", detail:["Next.js & React","SEO-optimized from day one","CMS integration (Sanity, Contentful)","E-commerce (Shopify, custom)","Performance scores 90+","Analytics & A/B testing"], tags:["Next.js","React","TypeScript","Tailwind"] },
  { n:"03", title:"AI Solutions",            hero:"Custom AI built for your business", desc:"We build custom AI systems using OpenAI, LangChain, and open-source models. From intelligent search to document analysis to fully autonomous AI agents — purpose-built for your exact use case.", detail:["LLM integration & fine-tuning","RAG systems & vector databases","AI agents & autonomous workflows","Custom model training","OpenAI / Anthropic / Gemini APIs","AI-powered search & recommendations"], tags:["OpenAI","LangChain","Python","Pinecone"] },
  { n:"04", title:"Business Automation",     hero:"Eliminate manual work with AI", desc:"We map your most time-consuming processes and automate them using n8n, Zapier, Make, and custom Python scripts. Most clients save 15–30 hours per week in the first month.", detail:["n8n, Zapier & Make workflows","CRM automation (HubSpot, Salesforce)","Email & lead nurture sequences","Data sync between platforms","Invoice & billing automation","Custom Python/Node.js scripts"], tags:["n8n","Zapier","Make","Python"] },
  { n:"05", title:"AI-Driven Growth",        hero:"Revenue systems powered by AI", desc:"We build AI-powered marketing and revenue systems that generate, nurture, and convert leads at scale. From automated outreach to AI-scored pipelines — we build the growth engine.", detail:["AI lead generation systems","Automated outreach campaigns","AI-powered lead scoring","Customer segmentation with ML","Predictive analytics dashboards","Retention & churn prevention AI"], tags:["Analytics","OpenAI","HubSpot","Python"] },
  { n:"06", title:"Chatbot Creation",        hero:"24/7 AI customer support", desc:"We build intelligent chatbots for WhatsApp, your website, Slack, and more. From simple FAQ bots to fully autonomous support agents that handle complex queries, bookings, and transactions.", detail:["WhatsApp Business API integration","Web widget deployment","Slack & Teams bots","Booking & reservation bots","Lead capture & qualification","Multi-language support"], tags:["Voiceflow","OpenAI","WhatsApp","Botpress"] },
];

export default function ServicesPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="border-b border-white/[0.06] bg-[#040406] px-4 py-20">
        <div className="container mx-auto">
          <div className="mb-6 flex items-center gap-2.5"><span className="h-px w-8 bg-[#b8ff57]" /><span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b8ff57]">Services</span></div>
          <h1 className="mb-6 font-extrabold leading-tight tracking-[-0.04em] text-white" style={{fontSize:"clamp(40px,7vw,88px)"}}>
            Everything you<br />need to <span className="text-[#b8ff57]">grow with AI</span>
          </h1>
          <p className="max-w-[520px] text-[15px] leading-[1.85] text-gray-400">Six core services. One agency. From idea to deployed product — we handle every layer of the stack, powered by the latest AI tools and frameworks.</p>
        </div>
      </section>

      {/* Services detail */}
      {services.map((s,i) => (
        <section key={i} className={`border-b border-white/[0.06] px-4 py-20 ${i%2===0?"bg-[#040406]":"bg-[#07070a]"}`}>
          <div className="container mx-auto">
            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
              <div data-reveal-left>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center border border-[#b8ff57]/30 bg-[#b8ff57]/10 font-mono text-[11px] font-bold text-[#b8ff57]">{s.n}</div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-gray-500">{s.hero}</span>
                </div>
                <h2 className="mb-5 font-extrabold leading-tight tracking-[-0.03em] text-white" style={{fontSize:"clamp(26px,3.5vw,42px)"}}>{s.title}</h2>
                <p className="mb-8 text-[14px] leading-[1.85] text-gray-400">{s.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map(t=><span key={t} className="border border-[#b8ff57]/20 px-3 py-1 font-mono text-[9px] uppercase tracking-wide text-[#b8ff57]/60">{t}</span>)}
                </div>
              </div>
              <div data-reveal-right>
                <div className="border border-white/[0.07]">
                  <div className="border-b border-white/[0.07] px-6 py-4 font-mono text-[9px] uppercase tracking-[0.16em] text-gray-500">What&apos;s included</div>
                  {s.detail.map((d,j)=>(
                    <div key={j} className={`flex items-start gap-3 px-6 py-4 transition hover:bg-[#b8ff57]/[0.03] ${j<s.detail.length-1?"border-b border-white/[0.07]":""}`}>
                      <span className="mt-0.5 shrink-0 text-[#b8ff57]">→</span>
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
