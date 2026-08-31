import type { Metadata } from "next";
import Link from "next/link";
import Pending from "@/components/Pending";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Priced against the analytics engineer you would otherwise hire — a monthly headcount line, not a project quote.",
};

export default function Pricing() {
  return (
    <>
      <section className="rule-b">
        <div className="container py-16 md:py-24">
          <p className="label">Engagement model</p>
          <h1 className="mt-5 max-w-[22ch] text-[36px] leading-tight md:text-[48px]">
            Priced against a hire, not a project
          </h1>
          <p className="mt-6 lead">
            The right comparison is not &ldquo;what does this software cost.&rdquo;
            It is &ldquo;what would it cost to hire a data engineer who understands
            construction operations, and how long until they are useful.&rdquo;
          </p>
        </div>
      </section>

      {/* Comparison */}
      <section className="rule-b">
        <div className="container grid gap-0 py-0 md:grid-cols-2">
          <div className="border-b border-rule md:border-b-0 md:border-r">
            <div className="px-0 py-12 md:pr-10">
              <h2 className="text-[22px]">Hiring your own</h2>
              <p className="mt-2 label">Data / analytics engineer, construction background</p>
              <dl className="mt-6 space-y-4 text-[15px]">
                <div>
                  <dt className="text-ink-soft">Fully loaded annual cost</dt>
                  <dd>
                    <Pending>market range for this role in your region, salary + benefits + overhead</Pending>
                  </dd>
                </div>
                <div>
                  <dt className="text-ink-soft">Time to hire</dt>
                  <dd>Months of searching for someone who knows both data work and job costing.</dd>
                </div>
                <div>
                  <dt className="text-ink-soft">Time to useful</dt>
                  <dd>Ramp on your systems and your jobs before the first real output.</dd>
                </div>
                <div>
                  <dt className="text-ink-soft">Risk</dt>
                  <dd>One person. If they leave, the knowledge leaves with them.</dd>
                </div>
              </dl>
            </div>
          </div>

          <div>
            <div className="px-0 py-12 md:pl-10">
              <h2 className="text-[22px]">An embedded engineer</h2>
              <p className="mt-2 label">BundleBoB engagement</p>
              <dl className="mt-6 space-y-4 text-[15px]">
                <div>
                  <dt className="text-ink-soft">Monthly fee</dt>
                  <dd>
                    <Pending>monthly engagement fee, and how it compares to the loaded cost above</Pending>
                  </dd>
                </div>
                <div>
                  <dt className="text-ink-soft">Term</dt>
                  <dd>
                    <Pending>month-to-month, or minimum term — state which</Pending>
                  </dd>
                </div>
                <div>
                  <dt className="text-ink-soft">Time to useful</dt>
                  <dd>Weeks. The engineer has run the Capture &rarr; Control &rarr; Intelligence arc before.</dd>
                </div>
                <div>
                  <dt className="text-ink-soft">Risk</dt>
                  <dd>
                    What the engineer builds is documented and stays with you. Backed by the team behind them, not a single point of failure.
                    <span className="block mt-1"><Pending>continuity / handover terms if the engagement ends</Pending></span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* What embedded means */}
      <section className="rule-b bg-[color:var(--paper-2)]">
        <div className="container py-14 md:py-20">
          <h2 className="text-[24px]">What &ldquo;embedded&rdquo; means in practice</h2>
          <dl className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <dt className="label">On-site vs remote</dt>
              <dd className="mt-1 text-[15px] text-ink-soft">
                <Pending>the actual split — e.g. on-site the first two weeks and one day a month after, remote otherwise</Pending>
              </dd>
            </div>
            <div>
              <dt className="label">Hours per week</dt>
              <dd className="mt-1 text-[15px] text-ink-soft">
                <Pending>dedicated hours per week per client, and whether the engineer is shared across firms</Pending>
              </dd>
            </div>
            <div>
              <dt className="label">Reporting line</dt>
              <dd className="mt-1 text-[15px] text-ink-soft">
                <Pending>who the engineer reports to inside the firm — e.g. CFO or controller — and the standing weekly meeting</Pending>
              </dd>
            </div>
            <div>
              <dt className="label">What you provide</dt>
              <dd className="mt-1 text-[15px] text-ink-soft">
                <Pending>access, a point of contact in accounting and operations, and any equipment or seat requirements</Pending>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="rule-b">
        <div className="container py-14 md:py-20">
          <h2 className="text-[22px]">What we do not do</h2>
          <ul className="mt-4 space-y-2 max-w-prose text-ink-soft">
            <li>No fixed-scope project quotes &mdash; &ldquo;$X for a dashboard, $Y for an integration.&rdquo;</li>
            <li>No menu of deliverables. There is one offer: the embedded engineer and the arc.</li>
            <li>No per-seat software licensing. You are paying for a person and the work they do.</li>
          </ul>
        </div>
      </section>

      <section>
        <div className="container py-16 md:py-20">
          <h2 className="max-w-[24ch] text-[26px] md:text-[32px]">
            Tell us the role you have been trying to fill, and we will show you the comparison on your numbers.
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
