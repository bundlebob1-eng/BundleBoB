// AboutPreview
const tech = ["React / Next.js","Flutter","OpenAI","LangChain","Python","n8n","Node.js","Supabase","AWS","TypeScript"];

export default function AboutPreview() {
  return (
    <section id="about" className="border-b border-white/[0.06] bg-[#040406] px-4 py-24">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <div data-reveal className="mb-8">
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[#b8ff57]">/ About BundleBOB</span>
            </div>
            <h2 data-reveal data-delay="60" className="mb-7 font-extrabold leading-tight tracking-[-0.03em] text-white" style={{fontSize:"clamp(28px,4vw,46px)"}}>
              A modern LLC<br />built for the <span className="text-[#b8ff57]">AI era.</span>
            </h2>
            <div data-reveal data-delay="120" className="space-y-4 text-[14px] leading-[1.85] text-gray-400">
              <p>BundleBOB is a <strong className="text-white font-medium">US-registered LLC</strong> of engineers, designers, and AI specialists. We don&apos;t just consult — we build, ship, and deliver measurable results.</p>
              <p>Every app, automation, or AI system we build is tied directly to your <strong className="text-white font-medium">revenue and growth goals</strong> — not just a tech spec on paper.</p>
            </div>
            <div data-reveal data-delay="180" className="mt-8 flex flex-wrap gap-2">
              {tech.map((p,i) => (
                <span key={p} className="border border-white/[0.07] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-gray-500 transition hover:border-[#b8ff57]/40 hover:text-[#b8ff57]" style={{transitionDelay:`${i*25}ms`}}>{p}</span>
              ))}
            </div>
          </div>

          <div data-reveal-right data-delay="100">
            <div className="border border-white/[0.07]">
              <div className="border-b border-white/[0.07] px-6 py-4 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-gray-500">Why BundleBOB</div>
              {[
                {t:"AI-first, not AI-bolted-on",    d:"Every project architected with AI from day one."},
                {t:"Fixed-scope pricing",            d:"No surprise invoices. Full cost known before we write a line."},
                {t:"Startup speed, senior quality",  d:"MVPs in weeks, not months. Fast without cutting corners."},
                {t:"US-registered LLC",              d:"Proper contracts, NDAs, IP protection on every project."},
                {t:"End-to-end ownership",           d:"Strategy, design, code, QA, launch, support — one team."},
              ].map((x,i) => (
                <div key={i} className={`group flex gap-3 px-6 py-5 transition hover:bg-[#b8ff57]/[0.03] ${i<4?"border-b border-white/[0.07]":""}`}>
                  <span className="mt-0.5 shrink-0 text-[#b8ff57] opacity-40 transition group-hover:translate-x-0.5 group-hover:opacity-100">→</span>
                  <div>
                    <div className="text-[13px] font-medium text-white transition group-hover:text-[#b8ff57]">{x.t}</div>
                    <div className="mt-0.5 text-[11px] text-gray-500">{x.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
