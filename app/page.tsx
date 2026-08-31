import Link from "next/link";
import Pending from "@/components/Pending";

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

const SYSTEMS = ["Procore", "Sage 300 CRE", "Foundation", "QuickBooks", "Excel / Google Sheets", "Autodesk / PlanGrid field data"];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="rule-b">
        <div className="container py-20 md:py-28">
          <p className="label">Embedded engineer &middot; commercial construction</p>
          <h1 className="mt-6 max-w-[18ch] text-[40px] leading-[1.1] md:text-[56px]">
            An engineer who works inside your construction business, not a tool you log into.
          </h1>
          <div className="mt-8 prose-block">
            <p className="lead">
              We place one person in your firm to connect Procore, Sage, Foundation,
              QuickBooks, and your spreadsheets, then build the layer on top that
              shows where your margin is leaking &mdash; Capture, then Control, then
              Intelligence, in that order.
            </p>
            <p className="lead">
              You are adding a data engineer who understands job costing to your
              headcount budget. You are not buying another piece of software.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/contact" className="btn">
              Talk to us about an engagement
            </Link>
            <Link href="/how-it-works" className="btn btn-ghost">
              How it works
            </Link>
          </div>
        </div>
      </section>

      {/* The arc */}
      <section className="rule-b">
        <div className="container py-16 md:py-20">
          <h2 className="text-[28px] md:text-[34px]">The arc</h2>
          <p className="mt-3 max-w-prose text-ink-soft">
            One engagement, three stages. We do not skip ahead &mdash; there is no
            useful intelligence on data you cannot trust yet.
          </p>

          <div className="mt-12 space-y-12">
            {ARC.map((s) => (
              <div key={s.n} className="grid gap-6 md:grid-cols-[7rem_1fr]">
                <div>
                  <div className="label">{s.n}</div>
                  <div className="mt-1 font-serif text-2xl">{s.name}</div>
                </div>
                <div className="prose-block">
                  <p className="text-[19px] leading-snug">{s.line}</p>
                  <p className="text-ink-soft">{s.body}</p>
                  <p className="border-l-2 border-rule pl-4 text-[15px] text-ink-soft">
                    <span className="label">Example</span>
                    <br />
                    {s.example}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory, not autonomous */}
      <section className="rule-b bg-[color:var(--paper-2)]">
        <div className="container py-16 md:py-20">
          <h2 className="text-[26px] md:text-[32px]">Every number traces back to a source record</h2>
          <div className="mt-4 prose-block">
            <p className="text-ink-soft">
              A financial figure a client sees on a screen is only useful if you can
              click into the invoice, timecard, or commitment it was built from. That
              is the standard we hold: no summary number without its line items.
            </p>
            <p className="text-ink-soft">
              The AI drafts answers, alerts, and suggested next steps. It does not
              send email, move money, update your ERP, or notify a subcontractor. A
              named person approves each action first.
            </p>
          </div>
        </div>
      </section>

      {/* Who */}
      <section className="rule-b">
        <div className="container grid gap-10 py-16 md:grid-cols-2 md:py-20">
          <div className="prose-block">
            <h2 className="text-[24px]">Who this is for</h2>
            <p className="text-ink-soft">
              Mid-market general contractors who already run Procore, Sage,
              Foundation, or QuickBooks and do not have anyone whose job is to make
              those systems agree with each other &mdash; or to turn what comes out
              of them into a decision.
            </p>
          </div>
          <div className="prose-block">
            <h2 className="text-[24px]">Who it is not for</h2>
            <p className="text-ink-soft">
              Not startups. Not retail, SaaS, or e-commerce. Not firms looking for a
              website, an app, or a chatbot. If an offer would make sense for a
              company outside commercial construction, it is not this one.
            </p>
          </div>
        </div>
      </section>

      {/* Systems */}
      <section className="rule-b">
        <div className="container py-16 md:py-20">
          <h2 className="text-[24px]">Systems we connect</h2>
          <p className="mt-3 max-w-prose text-ink-soft">
            The question that matters is whether this works with what you already
            own. These are the systems we expect to sit on top of. If yours is not
            listed, tell us what you run.
          </p>
          <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2 md:grid-cols-3">
            {SYSTEMS.map((s) => (
              <li key={s} className="rule-b py-2 font-mono text-[14px]">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Stage */}
      <section className="rule-b">
        <div className="container py-16 md:py-20">
          <h2 className="text-[24px]">Where we are right now</h2>
          <div className="mt-4 max-w-prose">
            <Pending block>
              honest one-line statement of current stage &mdash; e.g. &ldquo;running
              our first pilot with a mid-market GC in the Southwest&rdquo;, or
              &ldquo;pre-pilot; founder is doing this work directly with two firms&rdquo;.
              Do not publish a number of clients or a result until one is real and
              named.
            </Pending>
          </div>
        </div>
      </section>

      {/* Close */}
      <section>
        <div className="container py-16 md:py-20">
          <h2 className="max-w-[20ch] text-[28px] md:text-[34px]">
            If your month-end close is where you find out what a job actually made, we should talk.
          </h2>
          <div className="mt-8">
            <Link href="/contact" className="btn">
              Contact
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
