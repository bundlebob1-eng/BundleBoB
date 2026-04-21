"use client";
import { useState } from "react";

const packages = [
  {
    name: "Starter",
    tagline: "Launch-ready web presence",
    price: { monthly: 1500, yearly: 1200 },
    description:
      "Perfect for small businesses or startups who need a professional website and basic automation to get off the ground fast.",
    features: [
      "Custom Next.js website (up to 5 pages)",
      "Mobile-responsive design",
      "Basic SEO optimization",
      "Contact form & CRM integration",
      "1 simple AI chatbot (web)",
      "2 weeks delivery",
      "30-day post-launch support",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Growth",
    tagline: "AI-powered business system",
    price: { monthly: 4500, yearly: 3800 },
    description:
      "For businesses ready to scale with AI. Includes a full product build plus automation and AI integration tailored to your workflows.",
    features: [
      "Everything in Starter",
      "Mobile app (iOS + Android)",
      "AI chatbot (WhatsApp + Web + Slack)",
      "Business automation (n8n / Zapier)",
      "Custom AI solution or LLM integration",
      "Analytics & performance dashboard",
      "60-day post-launch support",
    ],
    cta: "Most Popular",
    highlight: true,
  },
  {
    name: "Enterprise",
    tagline: "Full AI transformation",
    price: { monthly: null, yearly: null },
    description:
      "End-to-end AI transformation for established businesses. Custom scope, dedicated team, and ongoing partnership.",
    features: [
      "Everything in Growth",
      "Dedicated engineering team",
      "Custom AI model development",
      "Full business process automation",
      "AI-driven marketing & growth systems",
      "Ongoing retainer & support",
      "NDA + IP protection included",
    ],
    cta: "Talk to Us",
    highlight: false,
  },
];

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="border-b border-white/10 bg-[#080808] px-4 py-24">
      <div className="container mx-auto">
        <div className="mb-12 flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
          <span className="text-[#b8ff57]">/</span>
          Pricing
        </div>

        <div className="mb-14 flex flex-wrap items-end justify-between gap-8">
          <h2
            className="font-extrabold leading-[1.05] tracking-[-0.03em] text-white"
            style={{ fontSize: "clamp(32px, 5vw, 56px)" }}
          >
            Simple &amp;<br />transparent pricing
          </h2>
          <div className="flex items-center gap-4">
            <span className={`text-sm ${!isYearly ? "text-white" : "text-gray-500"}`}>
              One-time
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative h-6 w-11 rounded-full border transition ${
                isYearly ? "border-[#b8ff57] bg-[#b8ff57]/20" : "border-white/20 bg-white/5"
              }`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full transition-all ${
                  isYearly ? "left-5 bg-[#b8ff57]" : "left-0.5 bg-gray-500"
                }`}
              />
            </button>
            <span className={`text-sm ${isYearly ? "text-white" : "text-gray-500"}`}>
              Retainer{" "}
              <span className="rounded bg-[#b8ff57]/10 px-1.5 py-0.5 text-[10px] font-bold text-[#b8ff57]">
                -15%
              </span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-0 border border-white/10 md:grid-cols-3">
          {packages.map((pkg, i) => (
            <div
              key={i}
              className={`flex flex-col p-8 transition ${
                i < 2 ? "border-b border-white/10 md:border-b-0 md:border-r" : ""
              } ${pkg.highlight ? "bg-[#0f0f0f]" : ""}`}
            >
              {pkg.highlight && (
                <div className="mb-4 inline-block w-fit bg-[#b8ff57] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black">
                  Most Popular
                </div>
              )}
              <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-500">
                {pkg.name}
              </div>
              <div className="mb-3 text-lg font-bold text-white">{pkg.tagline}</div>

              {/* Price */}
              <div className="mb-4">
                {pkg.price.monthly ? (
                  <div className="flex items-baseline gap-1">
                    <span
                      className="font-extrabold leading-none tracking-tight text-[#b8ff57]"
                      style={{ fontSize: 40 }}
                    >
                      ${isYearly ? pkg.price.yearly?.toLocaleString() : pkg.price.monthly?.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500">
                      {isYearly ? "/mo retainer" : " project"}
                    </span>
                  </div>
                ) : (
                  <div className="text-3xl font-extrabold tracking-tight text-white">
                    Custom
                  </div>
                )}
              </div>

              <p className="mb-6 text-[13px] leading-relaxed text-gray-400">{pkg.description}</p>

              <ul className="mb-8 flex-1 space-y-3">
                {pkg.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-[13px] text-gray-400">
                    <span className="mt-0.5 shrink-0 text-[#b8ff57]">✓</span>
                    {feat}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`block w-full px-6 py-3 text-center text-sm font-bold uppercase tracking-wider transition ${
                  pkg.highlight
                    ? "bg-[#b8ff57] text-black hover:opacity-90"
                    : "border border-white/20 text-white hover:border-[#b8ff57] hover:text-[#b8ff57]"
                }`}
              >
                {pkg.cta} →
              </a>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-gray-600">
          All prices are estimates. Final scope and pricing determined after your free consultation.
          &nbsp;·&nbsp; Fixed-scope contracts only — no surprise invoices.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
