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
    <div className="pt-24">
      <section className="border-b border-white/[0.06] bg-[#040406] px-4 py-20">
        <div className="container mx-auto">
          <div className="mb-6 flex items-center gap-2.5">
            <span className="h-px w-8 bg-[#b8ff57]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b8ff57]">How it works</span>
          </div>
          <h1
            className="mb-6 max-w-[20ch] font-syne font-extrabold leading-tight tracking-[-0.04em] text-white"
            style={{ fontSize: "clamp(36px,7vw,80px)" }}
          >
            One engagement, three stages, in order
          </h1>
          <p className="max-w-[560px] text-[15px] leading-[1.85] text-gray-400">
            The embedded engineer runs the same arc in every firm: make the data trustworthy, then make it legible, then
            make it answer questions. Each stage stands on the one before it.
          </p>
        </div>
      </section>

      {STAGES.map((s, i) => (
        <section key={s.n} className={`border-b border-white/[0.06] px-4 py-20 ${i % 2 === 0 ? "bg-[#040406]" : "bg-[#07070a]"}`}>
          <div className="container mx-auto grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div data-reveal-left>
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center border border-[#b8ff57]/40 bg-[#b8ff57]/10 font-mono text-xl font-black text-[#b8ff57]">
                  {s.n}
                </div>
                <div className="font-syne text-[22px] font-bold text-white">{s.name}</div>
              </div>
              <p className="mb-6 text-[15px] leading-[1.85] text-gray-300">{s.goal}</p>
              <div className="border border-[#b8ff57]/20 bg-[#b8ff57]/5 p-5">
                <div className="mb-2 font-mono text-[9px] uppercase tracking-[0.16em] text-[#b8ff57]">Example deliverable</div>
                <p className="text-[13px] leading-[1.8] text-gray-300">{s.example}</p>
              </div>
            </div>
            <div data-reveal-right>
              <div className="border border-white/[0.07]">
                <div className="border-b border-white/[0.07] px-6 py-4 font-mono text-[9px] uppercase tracking-[0.16em] text-gray-500">
                  What the engineer does
                </div>
                {s.what.map((w, j) => (
                  <div
                    key={j}
                    className={`flex items-start gap-3 px-6 py-4 transition hover:bg-[#b8ff57]/[0.03] ${j < s.what.length - 1 ? "border-b border-white/[0.07]" : ""}`}
                  >
                    <span className="mt-0.5 shrink-0 text-[#b8ff57]">→</span>
                    <span className="text-[13px] leading-[1.7] text-gray-300">{w}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="border-b border-white/[0.06] bg-[#07070a] px-4 py-20">
        <div className="container mx-auto">
          <div data-reveal className="mb-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b8ff57]">/ How long each stage takes</span>
          </div>
          <p className="mb-4 max-w-[560px] text-[14px] leading-[1.85] text-gray-400">
            This depends on how many systems you run and the state they are in.
          </p>
          <div className="max-w-[720px]">
            <Pending block>
              realistic ranges from actual engagements once they exist — e.g. &ldquo;Capture: weeks 1&ndash;6; Control:
              weeks 4&ndash;12, overlapping; Intelligence: from around week 10&rdquo;. Do not publish a timeline you have
              not delivered against.
            </Pending>
          </div>
        </div>
      </section>

      <section className="bg-[#040406] px-4 py-24">
        <div className="container mx-auto">
          <h2
            data-reveal
            className="mb-8 max-w-[24ch] font-syne font-extrabold leading-[1.1] tracking-[-0.03em] text-white"
            style={{ fontSize: "clamp(26px,4vw,42px)" }}
          >
            The output at every stage is something a person on your team reads and acts on.
          </h2>
          <div data-reveal data-delay="120" className="flex flex-wrap gap-4">
            <Link
              href="/pricing"
              className="btn-shine bg-[#b8ff57] px-8 py-4 font-mono text-[12px] font-bold uppercase tracking-widest text-black transition hover:shadow-[0_0_40px_rgba(184,255,87,0.3)]"
            >
              What it costs →
            </Link>
            <Link
              href="/contact"
              className="border border-white/10 px-8 py-4 font-mono text-[12px] font-semibold text-white transition hover:border-[#b8ff57]/40 hover:text-[#b8ff57]"
            >
              Contact →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
