export default function CTA() {
  return (
    <section id="contact-cta" className="relative overflow-hidden bg-[#07070a] px-4 py-28 text-center border-b border-white/[0.06]">
      {[280,500,700].map((s,i)=>(
        <div key={i} className="pointer-events-none absolute left-1/2 top-1/2 rounded-full border border-[#b8ff57]/[0.07]"
          style={{width:s,height:s,animation:`pulseRing ${2.5+i*.6}s ease-in-out infinite`,animationDelay:`${i*.35}s`}} />
      ))}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{width:500,height:500,background:"radial-gradient(circle,rgba(184,255,87,0.06) 0%,transparent 65%)"}} />
      <div className="container relative mx-auto">
        <div data-reveal className="mb-5 flex justify-center"><span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[#b8ff57]">/ Get Started</span></div>
        <h2 data-reveal data-delay="60" className="mb-6 font-extrabold leading-[1.02] tracking-[-0.04em] text-white" style={{fontSize:"clamp(36px,6vw,72px)"}}>
          Ready to build<br />something with <span className="text-[#b8ff57]">AI?</span>
        </h2>
        <p data-reveal data-delay="120" className="mx-auto mb-12 max-w-[480px] text-[15px] leading-relaxed text-gray-400">
          Book a free 30-minute consultation. No commitment — just a real conversation about your goals.
        </p>
        <div data-reveal data-delay="180">
          <a href="/contact" className="btn-shine group inline-flex items-center gap-2 bg-[#b8ff57] px-10 py-4 font-mono text-[12px] font-bold uppercase tracking-widest text-black transition hover:shadow-[0_0_60px_rgba(184,255,87,0.4)]">
            Schedule Free AI Consultation →
          </a>
        </div>
        <div data-reveal data-delay="240" className="mt-10 flex flex-wrap items-center justify-center gap-8">
          {["US-registered LLC","Fixed-scope pricing","NDA on request","Irving, Texas"].map(x=>(
            <span key={x} className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wide text-gray-600">
              <span className="h-1.5 w-1.5 rounded-full bg-[#b8ff57]/50" />{x}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
