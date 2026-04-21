const testimonials = [
  {
    quote:
      "They built our customer support chatbot in under 3 weeks. It now handles 80% of tickets automatically. The ROI was immediate and the team was exceptional throughout.",
    name: "Sarah K. — CEO",
    company: "RetailTech Co.",
  },
  {
    quote:
      "The mobile app they delivered exceeded every expectation — clean, fast, and exactly what our users needed. We went from idea to App Store in 6 weeks. Remarkable team.",
    name: "Marcus D. — Founder",
    company: "HealthApp Startup",
  },
  {
    quote:
      "Our entire sales outreach now runs on their AI automation. We cut 20 hours of manual work per week and doubled our pipeline capacity. Game-changing for our operations.",
    name: "Priya M. — VP Sales",
    company: "B2B SaaS Company",
  },
  {
    quote:
      "Transparent, fast, and genuinely invested in our success. Not a vendor — a real technology partner. We're already on our third project with BundleBOB and each one exceeds the last.",
    name: "James R. — COO",
    company: "Logistics Firm",
  },
];

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="border-b border-white/10 bg-[#0f0f0f] px-4 py-24"
    >
      <div className="container mx-auto">
        <div className="mb-12 flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
          <span className="text-[#b8ff57]">/</span>
          Client Stories
        </div>

        <div className="mb-14 flex flex-wrap items-end justify-between gap-8">
          <h2
            className="font-extrabold leading-[1.05] tracking-[-0.03em] text-white"
            style={{ fontSize: "clamp(32px, 5vw, 56px)" }}
          >
            What our<br />clients say
          </h2>
          <p className="max-w-[400px] text-[15px] leading-7 text-gray-400">
            Real results from businesses that trusted BundleBOB to build and
            automate their most important systems.
          </p>
        </div>

        <div className="grid grid-cols-1 border border-white/10 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`p-11 transition hover:bg-[#161616]
                ${i % 2 === 0 ? "sm:border-r sm:border-white/10" : ""}
                ${i < testimonials.length - 2 ? "border-b border-white/10" : ""}
              `}
            >
              <p className="mb-7 text-[15px] font-light leading-[1.75] text-white before:mr-1 before:font-sans before:text-2xl before:leading-none before:text-[#b8ff57] before:content-['\u201c']">
                {t.quote}
              </p>
              <div className="text-[12px] text-gray-500">
                <span className="mb-0.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#b8ff57]">
                  {t.name}
                </span>
                {t.company}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
