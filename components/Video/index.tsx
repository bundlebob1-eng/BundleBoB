const steps = [
  {
    num: "01",
    title: "Free Consultation",
    desc: "We dig into your goals, pain points, and the results you need. No pitch, no commitment — just a real conversation about your business.",
    accent: "→ 30 min call, zero obligation",
  },
  {
    num: "02",
    title: "Scope & Proposal",
    desc: "You receive a clear project plan, timeline, and fixed-price quote. No vague estimates, no hidden fees. You know exactly what you're getting.",
    accent: "→ Fixed scope, no surprises",
  },
  {
    num: "03",
    title: "Build & Iterate",
    desc: "Weekly demos and direct feedback loops. You see real progress every step of the way — no black box development, ever.",
    accent: "→ Weekly demos & check-ins",
  },
  {
    num: "04",
    title: "Launch & Support",
    desc: "We deploy, monitor, and support your product after launch. Your success metrics are our success metrics — the relationship doesn't end at go-live.",
    accent: "→ Ongoing support included",
  },
];

const Video = () => {
  return (
    <section id="process" className="border-b border-white/10 bg-[#0f0f0f] px-4 py-24">
      <div className="container mx-auto">
        <div className="mb-12 flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
          <span className="text-[#b8ff57]">/</span>
          How it works
        </div>

        <h2
          className="font-extrabold leading-[1.05] tracking-[-0.03em] text-white"
          style={{ fontSize: "clamp(32px, 5vw, 56px)" }}
        >
          From idea to live product<br />in 4 clear steps
        </h2>

        <div className="mt-12 grid grid-cols-1 border border-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`p-8 ${
                i < steps.length - 1
                  ? "border-b border-white/10 lg:border-b-0 lg:border-r"
                  : ""
              } ${
                i % 2 === 0 && i < 2
                  ? "sm:border-b sm:border-r lg:border-r"
                  : ""
              }`}
            >
              <div
                className="mb-6 font-extrabold leading-none tracking-[-0.04em]"
                style={{ fontSize: 48, color: "rgba(255,255,255,0.08)" }}
              >
                {step.num}
              </div>
              <div className="mb-2.5 text-[15px] font-bold text-white">{step.title}</div>
              <div className="text-[13px] leading-[1.65] text-gray-400">{step.desc}</div>
              <p className="mt-3.5 text-[12px] tracking-wide text-[#b8ff57]">{step.accent}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Video;
