const services = [
  {
    num: "01",
    title: "Mobile App Development",
    desc: "Native-quality iOS & Android apps built with Flutter or React Native. From concept to App Store launch — fast, polished, and scalable.",
    tags: ["Flutter", "React Native"],
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-[#b8ff57]" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth={2} />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Website Development",
    desc: "High-performance websites and web apps. SEO-optimized, conversion-driven, and built to represent your brand at its absolute best.",
    tags: ["Next.js", "React"],
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-[#b8ff57]" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "AI Solutions",
    desc: "Custom AI models, LLM integrations, and GPT-powered tools — all tailored to your specific business challenges and workflows.",
    tags: ["OpenAI", "LangChain"],
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-[#b8ff57]" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Business Automation",
    desc: "Eliminate repetitive work. We automate your most time-consuming processes using AI workflows — reducing costs and freeing your team for what matters.",
    tags: ["n8n", "Zapier", "Make"],
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-[#b8ff57]" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    num: "05",
    title: "AI-Driven Growth",
    desc: "AI-powered marketing, lead gen, customer segmentation, and revenue systems. We build the growth engine your competitors wish they had.",
    tags: ["Analytics", "CRM AI"],
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-[#b8ff57]" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
  {
    num: "06",
    title: "Chatbot Creation",
    desc: "Intelligent chatbots for WhatsApp, web, Slack, and more. 24/7 customer support, lead capture, and sales qualification — live in days, not months.",
    tags: ["WhatsApp", "Web", "Slack"],
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-[#b8ff57]" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
];

const Services = () => {
  return (
    <section id="services" className="border-b border-white/10 bg-[#080808] px-4 py-24">
      <div className="container mx-auto">
        <div className="mb-12 flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
          <span className="text-[#b8ff57]">/</span>
          Services
        </div>

        <div className="mb-14 flex flex-wrap items-end justify-between gap-8">
          <h2 className="font-extrabold leading-[1.05] tracking-[-0.03em] text-white"
            style={{ fontSize: "clamp(32px, 5vw, 56px)" }}>
            What we<br />build for you
          </h2>
          <p className="max-w-[400px] text-[15px] leading-7 text-gray-400">
            From idea to deployed product — we handle every layer of the stack,
            powered by the latest AI tools and frameworks.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 border border-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((svc, i) => (
            <div
              key={i}
              className={`group flex cursor-pointer flex-col gap-0 border-white/10 p-8 transition hover:bg-[#161616]
                ${i % 3 !== 2 ? "lg:border-r" : ""}
                ${i % 2 !== 1 ? "sm:border-r lg:border-r-0" : "sm:border-r-0"}
                ${i < services.length - 3 ? "lg:border-b" : ""}
                ${i < services.length - 2 ? "sm:border-b lg:border-b-0" : ""}
                ${i < services.length - 1 ? "border-b" : ""}
              `}
            >
              <div className="mb-6 flex h-11 w-11 items-center justify-center border border-white/10 transition group-hover:border-[#b8ff57]">
                {svc.icon}
              </div>
              <div className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#b8ff57]">
                {svc.num} —
              </div>
              <div className="mb-3 text-[17px] font-bold tracking-[-0.01em] text-white">
                {svc.title}
              </div>
              <div className="flex-1 text-[13px] leading-[1.65] text-gray-400">
                {svc.desc}
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                <div className="flex flex-wrap gap-1.5">
                  {svc.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-lg text-[#b8ff57] opacity-40 transition group-hover:translate-x-1 group-hover:opacity-100">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
