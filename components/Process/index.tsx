const steps = [
  { n:"01", title:"Free Consultation",  desc:"30 minutes, zero obligation. We dig into your goals, pain points, and the exact results you need.", accent:"→ No commitment required" },
  { n:"02", title:"Scope & Proposal",   desc:"A clear project plan, timeline, and fixed-price quote. No vague estimates. You know exactly what you're getting.", accent:"→ Fixed price, no surprises" },
  { n:"03", title:"Build & Iterate",    desc:"Weekly demos and direct feedback loops. Real progress every step — no black-box development.", accent:"→ Weekly demos & check-ins" },
  { n:"04", title:"Launch & Support",   desc:"We deploy, monitor and support after launch. Your success metrics are our success metrics.", accent:"→ Ongoing support included" },
];

export default function Process() {
  return (
    <section id="process" className="border-b border-white/[0.06] bg-[#07070a] px-4 py-24">
      <div className="container mx-auto">
        <div data-reveal className="mb-10">
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[#b8ff57]">/ How it works</span>
        </div>
        <h2 data-reveal data-delay="60" className="mb-16 font-extrabold leading-[1.02] tracking-[-0.03em] text-white" style={{fontSize:"clamp(30px,5vw,52px)"}}>
          From idea to live product<br /><span className="text-[#b8ff57]">in 4 clear steps</span>
        </h2>

        {/* Connector line */}
        <div className="relative">
          <div className="pointer-events-none absolute left-0 right-0 top-[44px] hidden h-px bg-white/[0.06] md:block">
            <div className="h-full" style={{background:"linear-gradient(90deg,rgba(184,255,87,0),rgba(184,255,87,0.4),rgba(184,255,87,0))", animation:"shimmerLine 3s ease-in-out infinite"}} />
          </div>

          <div className="grid grid-cols-1 gap-0 border border-white/[0.06] md:grid-cols-4">
            {steps.map((s,i) => (
              <div key={i} data-reveal data-delay={`${i*100}`}
                className={`group relative p-8 transition hover:bg-[#b8ff57]/[0.03] ${i<3?"md:border-r md:border-white/[0.06]":""}`}>
                <div className="relative z-10 mb-6 flex h-11 w-11 items-center justify-center border border-white/10 bg-[#040406] font-mono text-base font-bold text-[#b8ff57] transition group-hover:border-[#b8ff57] group-hover:bg-[#b8ff57] group-hover:text-black">
                  {s.n}
                </div>
                <h3 className="mb-2.5 text-[14px] font-bold text-white transition group-hover:text-[#b8ff57]">{s.title}</h3>
                <p className="mb-4 text-[12px] leading-[1.7] text-gray-400">{s.desc}</p>
                <p className="font-mono text-[10px] tracking-wide text-[#b8ff57]/50 transition group-hover:text-[#b8ff57]">{s.accent}</p>
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#b8ff57] transition-all duration-500 group-hover:w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
