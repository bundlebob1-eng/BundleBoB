"use client";
import { useState } from "react";

const services = [
  "Mobile App Development",
  "Website Development",
  "AI Solutions",
  "Business Automation",
  "AI Chatbot",
  "AI-Driven Growth",
  "Not sure yet",
];

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "", email: "", company: "", service: "", budget: "", message: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="pt-24">
      <section className="border-b border-white/[0.06] bg-[#040406] px-4 py-20">
        <div className="container mx-auto grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Info */}
          <div>
            <div className="mb-6 flex items-center gap-2.5">
              <span className="h-px w-8 bg-[#b8ff57]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b8ff57]">Contact</span>
            </div>
            <h1
              className="mb-7 font-extrabold leading-tight tracking-[-0.04em] text-white"
              style={{ fontSize: "clamp(38px,6vw,72px)" }}
            >
              Let&apos;s build<br />something <span className="text-[#b8ff57]">great.</span>
            </h1>
            <p className="mb-10 max-w-[420px] text-[15px] leading-[1.85] text-gray-400">
              Tell us what you&apos;re working on. We&apos;ll get back to you within 24 hours
              with honest feedback and next steps.
            </p>
            <div className="space-y-4">
              {[
                { l: "Email",         v: "contact@bundlebob.com" },
                { l: "Location",      v: "Irving, Texas, USA" },
                { l: "Response time", v: "Within 24 hours" },
                { l: "Consultation",  v: "Free · 30 min · zero obligation" },
              ].map((x) => (
                <div key={x.l} className="flex items-start gap-3">
                  <span className="mt-0.5 text-[#b8ff57]">→</span>
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-gray-500">{x.l}</div>
                    <div className="text-[13px] text-white">{x.v}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div>
            {sent ? (
              <div className="border border-[#b8ff57]/30 bg-[#b8ff57]/5 p-10 text-center">
                <div className="mb-4 text-4xl">✓</div>
                <h3 className="mb-2 text-xl font-bold text-[#b8ff57]">Message sent!</h3>
                <p className="text-[14px] text-gray-400">
                  We&apos;ll get back to you within 24 hours at {form.email}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 border border-white/[0.07] p-8">
                <h3 className="mb-6 font-mono text-[10px] uppercase tracking-[0.2em] text-gray-500">
                  Send us a message
                </h3>

                {[
                  { id: "name",    label: "Your Name *",       type: "text",  required: true  },
                  { id: "email",   label: "Email Address *",   type: "email", required: true  },
                  { id: "company", label: "Company / Project", type: "text",  required: false },
                ].map((f) => (
                  <div key={f.id}>
                    <label className="mb-1.5 block font-mono text-[9px] uppercase tracking-[0.14em] text-gray-500">
                      {f.label}
                    </label>
                    <input
                      type={f.type}
                      required={f.required}
                      value={(form as any)[f.id]}
                      onChange={(e) => setForm((p) => ({ ...p, [f.id]: e.target.value }))}
                      placeholder={f.label.replace(" *", "")}
                      className="w-full border border-white/[0.08] bg-[#07070a] px-4 py-3 font-mono text-[12px] text-white outline-none transition placeholder:text-gray-600 focus:border-[#b8ff57]/50"
                    />
                  </div>
                ))}

                <div>
                  <label className="mb-1.5 block font-mono text-[9px] uppercase tracking-[0.14em] text-gray-500">
                    Service Needed
                  </label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm((p) => ({ ...p, service: e.target.value }))}
                    className="w-full border border-white/[0.08] bg-[#07070a] px-4 py-3 font-mono text-[12px] text-white outline-none focus:border-[#b8ff57]/50"
                  >
                    <option value="">Select a service...</option>
                    {services.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block font-mono text-[9px] uppercase tracking-[0.14em] text-gray-500">
                    Budget Range
                  </label>
                  <select
                    value={form.budget}
                    onChange={(e) => setForm((p) => ({ ...p, budget: e.target.value }))}
                    className="w-full border border-white/[0.08] bg-[#07070a] px-4 py-3 font-mono text-[12px] text-white outline-none focus:border-[#b8ff57]/50"
                  >
                    <option value="">Select budget...</option>
                    {["Under $2,000","$2,000 – $5,000","$5,000 – $15,000","$15,000 – $50,000","$50,000+","Not sure yet"].map((b) => (
                      <option key={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block font-mono text-[9px] uppercase tracking-[0.14em] text-gray-500">
                    Tell us about your project *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    placeholder="What are you building? What problem are you solving?"
                    className="w-full resize-none border border-white/[0.08] bg-[#07070a] px-4 py-3 font-mono text-[12px] text-white outline-none transition placeholder:text-gray-600 focus:border-[#b8ff57]/50"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-shine w-full bg-[#b8ff57] py-4 font-mono text-[11px] font-bold uppercase tracking-widest text-black transition hover:shadow-[0_0_40px_rgba(184,255,87,0.3)]"
                >
                  Send Message →
                </button>
                <p className="text-center font-mono text-[9px] text-gray-600">
                  We respond within 24 hours · No spam · Your info is private
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
