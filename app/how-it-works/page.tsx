import type { Metadata } from "next";
import Link from "next/link";
import Pending from "@/components/Pending";

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
      <section className="rule-b">
        <div className="container py-16 md:py-24">
          <p className="label">How it works</p>
          <h1 className="mt-5 max-w-[20ch] text-[36px] leading-tight md:text-[48px]">
            One engagement, three stages, in order
          </h1>
          <p className="mt-6 lead">
            The embedded engineer runs the same arc in every firm: make the data
            trustworthy, then make it legible, then make it answer questions. Each
            stage stands on the one before it.
          </p>
        </div>
      </section>

      {STAGES.map((s) => (
        <section key={s.n} className="rule-b">
          <div className="container grid gap-8 py-14 md:grid-cols-[8rem_1fr] md:py-20">
            <div>
              <div className="label">{s.n}</div>
              <div className="mt-1 font-serif text-3xl">{s.name}</div>
            </div>
            <div>
              <p className="text-[20px] leading-snug">{s.goal}</p>

              <div className="mt-6 label">What the engineer does</div>
              <ul className="mt-3 space-y-3">
                {s.what.map((w) => (
                  <li key={w} className="flex gap-3 text-ink-soft">
                    <span aria-hidden className="mt-2 h-px w-4 shrink-0 bg-rule" />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 border-l-2 border-rule pl-4">
                <div className="label">Example deliverable</div>
                <p className="mt-2 text-[15px] text-ink-soft">{s.example}</p>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="rule-b bg-[color:var(--paper-2)]">
        <div className="container py-14 md:py-20">
          <h2 className="text-[24px]">How long each stage takes</h2>
          <p className="mt-3 max-w-prose text-ink-soft">
            This depends on how many systems you run and the state they are in.
          </p>
          <div className="mt-4 max-w-prose">
            <Pending block>
              realistic ranges from actual engagements once they exist — e.g.
              &ldquo;Capture: weeks 1&ndash;6; Control: weeks 4&ndash;12, overlapping;
              Intelligence: from around week 10&rdquo;. Do not publish a timeline you
              have not delivered against.
            </Pending>
          </div>
        </div>
      </section>

      <section>
        <div className="container py-16 md:py-20">
          <h2 className="max-w-[24ch] text-[26px] md:text-[32px]">
            The output at every stage is something a person on your team reads and acts on.
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/pricing" className="btn">
              What it costs
            </Link>
            <Link href="/contact" className="btn btn-ghost">
              Contact
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
