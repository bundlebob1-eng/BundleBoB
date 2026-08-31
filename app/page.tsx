import Link from "next/link";
import Hero from "@/components/Hero";
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
      <Hero />
      <Brands />

      {/* The arc */}
      <section className="border-b border-line">
        <div className="container mx-auto px-5 py-16 md:py-24">
          <p className="label" data-reveal>
            The arc
          </p>
          <h2
            data-reveal
            className="mt-4 max-w-[20ch] font-display font-semibold tracking-[-0.03em] text-white"
            style={{ fontSize: "clamp(26px,4vw,40px)" }}
          >
            One engagement, three stages
          </h2>
          <p data-reveal className="mt-3 max-w-[55ch] text-[15px] leading-[1.7] text-muted">
            We do not skip ahead. There is no useful intelligence on data you cannot trust yet.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-3">
            {ARC.map((s) => (
              <div key={s.n} data-reveal className="bg-bg p-6">
                <div className="font-mono text-[12px] text-accent">{s.n}</div>
                <div className="mt-1 font-display text-[18px] font-semibold text-white">{s.name}</div>
                <p className="mt-3 text-[13.5px] leading-[1.6] text-white/85">{s.line}</p>
                <p className="mt-2 text-[13px] leading-[1.6] text-muted">{s.body}</p>
                <p className="mt-4 border-l border-accent/40 pl-3 text-[12px] leading-[1.6] text-muted">
                  <span className="font-mono uppercase tracking-[0.1em] text-accent/70">Example</span>
                  <br />
                  {s.example}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/how-it-works"
            data-reveal
            className="mt-8 inline-block border border-line px-5 py-3 font-mono text-[11px] uppercase tracking-[0.1em] text-muted transition-colors hover:border-accent hover:text-accent"
          >
            The arc in detail →
          </Link>
        </div>
      </section>

      {/* Advisory */}
      <section className="border-b border-line bg-bg-2">
        <div className="container mx-auto grid grid-cols-1 gap-10 px-5 py-16 md:grid-cols-[1fr_1.4fr] md:py-24">
          <div data-reveal>
            <p className="label">Advisory, not autonomous</p>
            <h2
              className="mt-4 font-display font-semibold tracking-[-0.03em] text-white"
              style={{ fontSize: "clamp(22px,3vw,32px)" }}
            >
              Every number traces back to a source record
            </h2>
          </div>
          <div data-reveal className="space-y-4 text-[14.5px] leading-[1.75] text-muted">
            <p>
              A financial figure you see on a screen is only useful if you can click into the invoice, timecard,
              or commitment it was built from. That is the standard: no summary number without its line items.
            </p>
            <p>
              The AI drafts answers, alerts, and suggested next steps. It does not send email, move money, update
              your ERP, or notify a subcontractor. A named person approves each action first.
            </p>
          </div>
        </div>
      </section>

      {/* Who */}
      <section className="border-b border-line">
        <div className="container mx-auto grid grid-cols-1 gap-px border-y border-line bg-line px-0 md:grid-cols-2">
          <div data-reveal className="bg-bg p-8 md:p-10">
            <h2 className="font-display text-[20px] font-semibold text-white">Who this is for</h2>
            <p className="mt-3 text-[13.5px] leading-[1.7] text-muted">
              Mid-market general contractors who already run Procore, Sage, Foundation, or QuickBooks and do not
              have anyone whose job is to make those systems agree with each other — or to turn what comes out of
              them into a decision.
            </p>
          </div>
          <div data-reveal className="bg-bg p-8 md:p-10">
            <h2 className="font-display text-[20px] font-semibold text-white">Who it is not for</h2>
            <p className="mt-3 text-[13.5px] leading-[1.7] text-muted">
              Not startups. Not retail, SaaS, or e-commerce. Not firms looking for a website, an app, or a
              chatbot. If an offer would make sense for a company outside commercial construction, it is not this
              one.
            </p>
          </div>
        </div>
      </section>

      {/* Close */}
      <section>
        <div className="container mx-auto px-5 py-20 md:py-28">
          <h2
            data-reveal
            className="max-w-[22ch] font-display font-semibold tracking-[-0.03em] text-white"
            style={{ fontSize: "clamp(24px,3.5vw,40px)" }}
          >
            If month-end is where you find out what a job made, we should talk.
          </h2>
          <Link href="/contact" data-reveal className="btn mt-8">
            Contact
          </Link>
        </div>
      </section>
    </>
  );
}
