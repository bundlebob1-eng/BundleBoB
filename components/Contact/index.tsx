const Contact = () => {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-b border-white/10 bg-[#0f0f0f] px-4 py-[120px] text-center"
    >
      {/* Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(184,255,87,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="container relative mx-auto">
        <h2
          className="mb-5 font-extrabold leading-[1.05] tracking-[-0.03em] text-white"
          style={{ fontSize: "clamp(36px, 6vw, 72px)" }}
        >
          Ready to build<br />something with{" "}
          <em className="not-italic text-[#b8ff57]">AI?</em>
        </h2>

        <p className="mx-auto mb-12 max-w-[520px] text-base leading-relaxed text-gray-400">
          Book a free 30-minute consultation. No commitment, no pitch deck — just
          a real conversation about your goals and how we can help.
        </p>

        <a
          href="https://calendly.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#b8ff57] px-10 py-[18px] text-[15px] font-bold tracking-wide text-black transition hover:opacity-90"
        >
          Schedule Free AI Consultation →
        </a>

        <p className="mt-4 text-xs tracking-wide text-gray-600">
          No commitment required &nbsp;·&nbsp; Response within 24 hours &nbsp;·&nbsp;
          contact@bundlebob.com
        </p>

        {/* Trust badges */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-8">
          {[
            "US-registered LLC",
            "Fixed-scope pricing",
            "NDA on request",
            "Irving, Texas",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 text-[12px] text-gray-600">
              <span className="h-1.5 w-1.5 rounded-full bg-[#b8ff57]" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
