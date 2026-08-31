import Link from "next/link";
import Hero3D from "@/components/Hero3D";
import Brands from "@/components/Brands";

const ARC = [
  {
    n: "01",
    name: "Capture",
    line: "Get every project's numbers into one place you can trust.",
    body: "We connect your project management, accounting, field data, and the spreadsheets nobody officially owns, and reconcile them on a schedule. The job-cost report stops being three weeks stale.",
    example:
      "Pull committed cost, invoiced-to-date, and approved change orders out of Procore and Sage every night, and flag the three jobs where the two systems disagree.",
  },
  {
    n: "02",
    name: "Control",
    line: "See where the margin actually is, on current data.",
    body: "Job costing, labour productivity, subcontractor performance, change-order and RFI cycle time, cash, and retainage — measured the same way on every job, updated daily instead of at month-end.",
    example:
      "Reconcile three subcontractors' change-order paperwork against the job-cost report by Friday, so the PM walks into the owner meeting knowing the real number.",
  },
  {
    n: "03",
    name: "Intelligence",
    line: "Ask in plain English. A person approves before anything moves.",
    body: "Margin-leak alerts, cost-to-complete forecasts, and suggested actions — each one tied back to the source records it came from. Nothing is sent, posted, or changed without someone signing off.",
    example:
      "“Which jobs are fading margin faster than last month, and what changed?” — answered against your data, with the underlying line items attached.",
  },
];

export default function Home() {
  return (
    <>
      <Hero3D />
      <Brands />

      {/* The arc */}
      <section className="border-b border-white/[0.06] bg-[#040406] px-4 py-24">
        <div className="container mx-auto">
          <div data-reveal className="mb-4">
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[#b8ff57]">/ The arc</span>
          </div>
          <h2
            data-reveal
            data-delay="60"
            className="mb-4 font-syne font-extrabold leading-[1.05] tracking-[-0.03em] text-white"
            style={{ fontSize: "clamp(30px,5vw,52px)" }}
          >
            One engagement, three stages
          </h2>
          <p data-reveal data-delay="100" className="mb-16 max-w-[560px] text-[15px] leading-[1.85] text-gray-400">
            We do not skip ahead. There is no useful intelligence on data you cannot trust yet.
          </p>

          <div className="grid grid-cols-1 border border-white/[0.06] md:grid-cols-3">
            {ARC.map((s, i) => (
              <div
                key={s.n}
                data-reveal
                data-delay={`${i * 90}`}
                className={`group relative p-8 transition hover:bg-[#b8ff57]/[0.03] ${i < 2 ? "border-b border-white/[0.06] md:border-b-0 md:border-r" : ""}`}
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center border border-white/10 bg-[#040406] font-mono text-base font-bold text-[#b8ff57] transition group-hover:border-[#b8ff57] group-hover:bg-[#b8ff57] group-hover:text-black">
                  {s.n}
                </div>
                <div className="font-syne text-xl font-bold text-white">{s.name}</div>
                <p className="mt-3 text-[13px] leading-[1.7] text-gray-300">{s.line}</p>
                <p className="mt-3 text-[13px] leading-[1.7] text-gray-500">{s.body}</p>
                <div className="mt-5 border-l border-[#b8ff57]/30 pl-4">
                  <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#b8ff57]/70">Example</div>
                  <p className="mt-1.5 font-mono text-[11px] leading-[1.7] text-gray-500">{s.example}</p>
                </div>
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#b8ff57] transition-all duration-500 group-hover:w-full" />
              </div>
            ))}
          </div>

          <div data-reveal className="mt-8">
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 border border-white/10 px-6 py-3 font-mono text-[10px] uppercase tracking-wider text-gray-400 transition hover:border-[#b8ff57]/50 hover:text-[#b8ff57]"
            >
              The arc in detail →
            </Link>
          </div>
        </div>
      </section>

      {/* Advisory, not autonomous */}
      <section className="border-b border-white/[0.06] bg-[#07070a] px-4 py-24">
        <div className="container mx-auto grid grid-cols-1 gap-14 lg:grid-cols-2">
          <div>
            <div data-reveal className="mb-6">
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[#b8ff57]">/ Advisory, not autonomous</span>
            </div>
            <h2
              data-reveal
              data-delay="60"
              className="font-syne font-extrabold leading-[1.1] tracking-[-0.03em] text-white"
              style={{ fontSize: "clamp(26px,4vw,40px)" }}
            >
              Every number traces back to a source record
            </h2>
          </div>
          <div data-reveal data-delay="120" className="space-y-4 text-[14px] leading-[1.85] text-gray-400">
            <p>
              A financial figure you see on a screen is only useful if you can click into the invoice, timecard, or
              commitment it was built from. That is the standard: no summary number without its line items.
            </p>
            <p>
              The AI drafts answers, alerts, and suggested next steps. It does not send email, move money, update your
              ERP, or notify a subcontractor. A named person approves each action first.
            </p>
          </div>
        </div>
      </section>

      {/* Who */}
      <section className="border-b border-white/[0.06] bg-[#040406] px-4 py-24">
        <div className="container mx-auto grid grid-cols-1 border border-white/[0.06] md:grid-cols-2">
          <div data-reveal className="border-b border-white/[0.06] p-10 md:border-b-0 md:border-r">
            <h2 className="mb-4 font-syne text-[22px] font-bold text-white">Who this is for</h2>
            <p className="text-[13px] leading-[1.85] text-gray-400">
              Mid-market general contractors who already run Procore, Sage, Foundation, or QuickBooks and do not have
              anyone whose job is to make those systems agree with each other — or to turn what comes out of them into a
              decision.
            </p>
          </div>
          <div data-reveal data-delay="80" className="p-10">
            <h2 className="mb-4 font-syne text-[22px] font-bold text-white">Who it is not for</h2>
            <p className="text-[13px] leading-[1.85] text-gray-400">
              Not startups. Not retail, SaaS, or e-commerce. Not firms looking for a website, an app, or a chatbot. If an
              offer would make sense for a company outside commercial construction, it is not this one.
            </p>
          </div>
        </div>
      </section>

      {/* Close */}
      <section className="relative overflow-hidden border-b border-white/[0.06] bg-[#07070a] px-4 py-28 text-center">
        {[280, 500, 700].map((s, i) => (
          <div
            key={i}
            className="pointer-events-none absolute left-1/2 top-1/2 rounded-full border border-[#b8ff57]/[0.07]"
            style={{ width: s, height: s, animation: `pulseRing ${2.5 + i * 0.6}s ease-in-out infinite`, animationDelay: `${i * 0.35}s` }}
          />
        ))}
        <div className="container relative mx-auto">
          <h2
            data-reveal
            className="mx-auto mb-8 max-w-[20ch] font-syne font-extrabold leading-[1.05] tracking-[-0.04em] text-white"
            style={{ fontSize: "clamp(30px,5vw,56px)" }}
          >
            If month-end is where you find out what a job made, we should talk.
          </h2>
          <div data-reveal data-delay="120">
            <Link
              href="/contact"
              className="btn-shine inline-flex items-center gap-2 bg-[#b8ff57] px-10 py-4 font-mono text-[12px] font-bold uppercase tracking-widest text-black transition hover:shadow-[0_0_60px_rgba(184,255,87,0.4)]"
            >
              Contact →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
