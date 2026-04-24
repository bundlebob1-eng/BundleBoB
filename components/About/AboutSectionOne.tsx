const techPills = [
  "React / Next.js",
  "Flutter",
  "OpenAI",
  "LangChain",
  "Python",
  "n8n",
  "Node.js",
  "Supabase",
  "PostgreSQL",
  "AWS / Vercel",
];

const whyItems = [
  {
    title: "AI-first, not AI-bolted-on",
    desc: "We architect every project with AI embedded from day one — not added as an afterthought.",
  },
  {
    title: "Fixed-scope pricing",
    desc: "No surprise invoices. You know the full cost before we write a single line of code.",
  },
  {
    title: "Startup speed, senior quality",
    desc: "MVPs in weeks, not months. We move at your pace without cutting corners on quality.",
  },
  {
    title: "US-registered LLC",
    desc: "Proper contracts, NDAs, IP protection, and full legal accountability on every project.",
  },
  {
    title: "End-to-end ownership",
    desc: "Strategy, design, code, QA, launch, and support — one team, zero handoff chaos.",
  },
];

const AboutSectionOne = () => {
  return (
    <section id="about" className="border-b border-white/10 bg-[#080808] px-4 py-24">
      <div className="container mx-auto">
        <div className="mb-12 flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
          <span className="text-[#b8ff57]">/</span>
          About BundleBOB
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left */}
          <div>
            <h2
              className="mb-8 font-extrabold leading-tight tracking-[-0.03em] text-white"
              style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
            >
              A modern LLC<br />built for the<br />
              <em className="not-italic text-[#b8ff57]">AI era.</em>
            </h2>
            <div className="space-y-5 text-[15px] leading-[1.85] text-gray-400">
              <p>
                BundleBOB is a{" "}
                <strong className="font-medium text-white">US-registered LLC</strong> of
                engineers, designers, and AI specialists who are obsessed with building
                things that actually work. We don&apos;t just consult — we build, ship,
                and deliver measurable results.
              </p>
              <p>
                We combine deep technical expertise with sharp business thinking. Every
                app, automation, or AI system we build is tied directly to{" "}
                <strong className="font-medium text-white">
                  your revenue and growth goals
                </strong>{" "}
                — not just a tech spec on paper.
              </p>
              <p>
                We&apos;ve helped startups and established businesses reduce operational
                costs by eliminating manual work, launch new revenue streams through AI
                products, and outpace competitors with technology that would have cost
                10× more two years ago.
              </p>
            </div>

            {/* Tech pills */}
            <div className="mt-9 flex flex-wrap gap-2">
              {techPills.map((pill) => (
                <span
                  key={pill}
                  className="border border-white/10 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.08em] text-gray-600 transition hover:border-[#b8ff57] hover:text-[#b8ff57]"
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>

          {/* Right — Why box */}
          <div>
            <div className="border border-white/10">
              <div className="border-b border-white/10 px-7 py-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-500">
                Why BundleBOB
              </div>
              {whyItems.map((item, i) => (
                <div
                  key={i}
                  className={`flex gap-4 px-7 py-6 transition hover:bg-[#161616] ${
                    i < whyItems.length - 1 ? "border-b border-white/10" : ""
                  }`}
                >
                  <span className="mt-0.5 shrink-0 text-base text-[#b8ff57]">→</span>
                  <div>
                    <div className="mb-1 text-[14px] font-medium text-white">{item.title}</div>
                    <div className="text-[12px] leading-relaxed text-gray-500">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionOne;
