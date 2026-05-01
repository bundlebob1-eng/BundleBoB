const T = [
  {q:"They built our customer support chatbot in under 3 weeks. It now handles 80% of tickets automatically. ROI was immediate.", n:"Sarah K. — CEO", c:"RetailTech Co."},
  {q:"The mobile app exceeded every expectation — clean, fast, exactly what our users needed. Idea to App Store in 6 weeks.", n:"Marcus D. — Founder", c:"HealthApp Startup"},
  {q:"Our entire sales outreach now runs on their AI automation. Cut 20 hours of manual work per week and doubled our pipeline.", n:"Priya M. — VP Sales", c:"B2B SaaS Co."},
  {q:"Transparent, fast, and genuinely invested in our success. A real technology partner, not just a vendor. Third project now.", n:"James R. — COO", c:"Logistics Firm"},
];
export default function Testimonials() {
  return (
    <section id="testimonials" className="border-b border-white/[0.06] bg-[#07070a] px-4 py-24">
      <div className="container mx-auto">
        <div data-reveal className="mb-10"><span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[#b8ff57]">/ Client Stories</span></div>
        <div className="mb-14 flex flex-wrap items-end justify-between gap-8">
          <h2 data-reveal data-delay="60" className="font-extrabold leading-tight tracking-[-0.03em] text-white" style={{fontSize:"clamp(30px,5vw,52px)"}}>What our<br />clients say</h2>
          <p data-reveal data-delay="120" className="max-w-[360px] text-[14px] leading-7 text-gray-400">Real results from businesses that trusted BundleBOB to build their most important systems.</p>
        </div>
        <div className="grid grid-cols-1 border border-white/[0.06] sm:grid-cols-2">
          {T.map((t,i) => (
            <div key={i} data-reveal data-delay={`${i*90}`}
              className={`group relative overflow-hidden p-10 transition hover:bg-[#b8ff57]/[0.03] ${i%2===0?"sm:border-r sm:border-white/[0.06]":""} ${i<2?"border-b border-white/[0.06]":""}`}>
              <div className="mb-5 font-serif text-4xl leading-none text-[#b8ff57] transition group-hover:scale-110 inline-block">&ldquo;</div>
              <p className="mb-7 text-[14px] font-light leading-[1.85] text-white/75">{t.q}</p>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-[#b8ff57]/25 bg-[#b8ff57]/10 font-mono text-[10px] font-bold text-[#b8ff57]">{t.n[0]}</div>
                <div>
                  <div className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-[#b8ff57]">{t.n}</div>
                  <div className="font-mono text-[10px] text-gray-500">{t.c}</div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#b8ff57]/40 transition-all duration-700 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
