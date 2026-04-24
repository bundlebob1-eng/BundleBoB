const Hero = () => {
  return (
    <section
      id="home"
      className="relative z-10 overflow-hidden border-b border-white/10 bg-[#080808] pb-24 pt-[150px] md:pt-[180px]"
    >
      {/* Decorative grid bg */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-[0.03]">
        <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
          <defs>
            <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#b8ff57" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="600" height="600" fill="url(#hero-grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4">
        {/* Eyebrow */}
        <div className="mb-9 flex items-center gap-3">
          <span className="h-px w-8 bg-[#b8ff57]" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#b8ff57]">
            AI Solutions for Your Business
          </span>
        </div>

        {/* Headline */}
        <h1 className="mb-9 max-w-[900px] font-extrabold leading-[0.95] tracking-[-0.04em] text-white"
          style={{ fontSize: "clamp(48px, 8vw, 96px)" }}>
          <span className="block">We Build Apps,</span>
          <span className="block">
            Websites &amp;{" "}
            <em className="not-italic text-[#b8ff57]">AI</em>
          </span>
          <span className="block">That Grow Your</span>
          <span className="block">Business.</span>
        </h1>

        {/* Body */}
        <p className="mb-12 max-w-[480px] text-[17px] leading-relaxed text-gray-400">
          BundleBOB delivers mobile apps, websites, intelligent chatbots, and full
          business automation — powered by AI and built for companies ready to move fast.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-[#b8ff57] px-8 py-4 text-sm font-bold tracking-wide text-black transition hover:opacity-90"
          >
            Schedule Free AI Consultation →
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-2 border border-white/10 px-7 py-4 text-sm font-semibold text-white transition hover:border-white/25"
          >
            Explore Services
          </a>
        </div>

        <p className="mt-5 text-xs tracking-wide text-gray-600">
          No commitment required &nbsp;·&nbsp; Response within 24 hours &nbsp;·&nbsp; US-based LLC
        </p>

        {/* Stats row */}
        <div className="mt-20 grid grid-cols-1 border border-white/10 sm:grid-cols-3">
          {[
            { num: "2+", label: "Projects Delivered", sub: "Apps, websites & AI systems shipped" },
            { num: "99%", label: "Client Satisfaction", sub: "Measured across every engagement" },
            { num: "2x", label: "Avg. ROI for Clients", sub: "Revenue impact in the first year" },
          ].map((stat, i) => (
            <div
              key={i}
              className={`px-8 py-12 ${i < 2 ? "border-b border-white/10 sm:border-b-0 sm:border-r" : ""}`}
            >
              <div className="font-extrabold leading-none tracking-[-0.04em] text-[#b8ff57]"
                style={{ fontSize: "clamp(40px, 6vw, 64px)" }}>
                {stat.num}
              </div>
              <div className="mt-2.5 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
                {stat.label}
              </div>
              <div className="mt-1.5 text-xs text-gray-600">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
