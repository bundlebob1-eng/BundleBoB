import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "The arc of an engagement: Capture, then Control, then Intelligence — with concrete examples from a mid-market general contractor's operations.",
};

const STAGES = [
  {
    n: "01",
    name: "Capture",
    goal: "One place for project, accounting, and field data that you can trust.",
    what: [
      "Inventory what you run: project management, ERP/accounting, payroll, field apps, and the spreadsheets that live on someone's desktop.",
      "Stand up connections into those systems — through their APIs where they exist, through the integration layer where that is cleaner than building a connector ourselves.",
      "Reconcile on a schedule and surface the disagreements: where committed cost, actuals, and change orders do not line up across systems.",
      "Fix the data-entry gaps that make the numbers wrong in the first place, working with your PMs and accounting team.",
    ],
    example:
      "By the end of the first month, committed cost and cost-to-date for every active job are pulled from Procore and Sage nightly into one table, with a short daily list of the jobs where the two systems disagree and why.",
  },
  {
    n: "02",
    name: "Control",
    goal: "The operational and financial picture, measured consistently, on current data.",
    what: [
      "Job costing and margin by job, phase, and cost code — same method on every job.",
      "Labour productivity against budgeted hours; where the field is losing time and on which activities.",
      "Subcontractor performance: on-time, rework, change-order volume, and default-risk signals.",
      "Change-order and RFI cycle time — how long paper sits, and where it sits.",
      "Cash: WIP and over/under billing, retainage held and owed, and a forward cash view.",
    ],
    example:
      "Before the monthly owner meeting, the PM gets a one-page job packet: current cost-to-complete, the change orders not yet in the owner's system, retainage exposure, and the two cost codes trending over budget — each figure linked to its source line items.",
  },
  {
    n: "03",
    name: "Intelligence",
    goal: "Plain-English answers and early warnings, with a person in the loop.",
    what: [
      "Ask questions in plain language and get answers computed against your data, with the underlying records attached.",
      "Margin-leak alerts: jobs fading faster than trend, unbilled work aging, productivity dropping on a specific crew or activity.",
      "Cost-to-complete and cash forecasts that update as the source data changes.",
      "Suggested actions — bill this, chase that change order, re-sequence this crew — that a named person reviews and approves before anything happens.",
    ],
    example:
      "Monday morning: “three jobs are fading margin faster than last month.” Each one links to the specific change orders, labour overruns, or vendor invoices driving it, and a suggested first step for the PM to accept or dismiss.",
  },
];

export default function HowItWorks() {
  return (
    <>
      <section className="border-b border-white/[0.06]">
        <div className="container mx-auto px-5 pb-14 pt-36 md:pb-20 md:pt-44">
          <p className="label">
            How it works
          </p>
          <h1
            className="mt-5 max-w-[20ch] font-syne font-semibold tracking-[-0.03em] text-white"
            style={{ fontSize: "clamp(30px,5vw,52px)" }}
          >
            One engagement, three stages, in order
          </h1>
          <p className="mt-5 max-w-[58ch] text-[15px] leading-[1.7] text-white/50">
            One Forward Deployed Engineer (FDE) — also known as an AI Integrator — runs the same arc in every
            firm: make the data trustworthy, then make it legible, then make it answer questions. Each stage
            stands on the one before it.
          </p>
        </div>
      </section>

      {STAGES.map((s) => (
        <section key={s.n} className="border-b border-white/[0.06]">
          <div className="container mx-auto grid grid-cols-1 gap-8 px-5 py-14 md:grid-cols-[1fr_1.3fr] md:py-20">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[13px] text-accent">{s.n}</span>
                <h2 className="font-syne text-[24px] font-semibold text-white">{s.name}</h2>
              </div>
              <p className="mt-4 max-w-[40ch] text-[15px] leading-[1.7] text-white/85">{s.goal}</p>
              <div className="mt-6 border border-white/[0.06] bg-bg2 p-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent/80">Example deliverable</div>
                <p className="mt-2 text-[13px] leading-[1.7] text-white/50">{s.example}</p>
              </div>
            </div>
            <div>
              <div className="border border-white/[0.06]">
                <div className="border-b border-white/[0.06] px-5 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-white/50">
                  What the FDE does
                </div>
                {s.what.map((w, j) => (
                  <div
                    key={j}
                    className={`flex gap-3 px-5 py-3.5 text-[13px] leading-[1.6] text-white/50 ${
                      j < s.what.length - 1 ? "border-b border-white/[0.06]" : ""
                    }`}
                  >
                    <span className="text-accent">→</span>
                    <span>{w}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="border-b border-white/[0.06] bg-bg2">
        <div className="container mx-auto px-5 py-14 md:py-20">
          <p className="label">
            How long each stage takes
          </p>
          <p className="mt-4 max-w-[58ch] text-[14px] leading-[1.7] text-white/50">
            This depends on how many systems you run and the state they are in.
          </p>
          <div className="mt-4 max-w-[70ch]">
            <p className="text-[14px] leading-[1.75] text-white/80">
              We are not quoting week-by-week ranges yet — we have not run enough engagements to give a number we
              would stand behind. What is fixed is the order: Capture is finished before Control leans on it, and
              Intelligence only starts once the underlying data is trusted. We will scope a realistic schedule
              for your systems on the first call.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto px-5 py-20 md:py-28">
          <h2
            className="max-w-[24ch] font-syne font-semibold tracking-[-0.03em] text-white"
            style={{ fontSize: "clamp(22px,3.2vw,34px)" }}
          >
            The output at every stage is something a person on your team reads and acts on.
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/pricing" className="btn btn-shine">
              What it costs
            </Link>
            <Link href="/contact" className="btn btn-ghost">How to reach us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
