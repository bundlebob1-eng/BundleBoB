import type { Metadata } from "next";
import Link from "next/link";
import Pending from "@/components/Pending";

export const metadata: Metadata = {
  title: "Proof",
  description:
    "What is real right now: the founder's operating background, the state of our first engagements, and an honest statement of stage. No manufactured social proof.",
};

export default function Proof() {
  return (
    <>
      <section className="rule-b">
        <div className="container py-16 md:py-24">
          <p className="label">Proof</p>
          <h1 className="mt-5 max-w-[22ch] text-[36px] leading-tight md:text-[48px]">
            What is actually true today
          </h1>
          <p className="mt-6 lead">
            We do not have named client testimonials or published case studies yet.
            When a general contractor is willing to go on record, their name and
            results will be on this page. Until then, here is what is real.
          </p>
        </div>
      </section>

      <section className="rule-b">
        <div className="container py-14 md:py-20">
          <h2 className="text-[24px]">The people doing the work</h2>
          <div className="mt-4 max-w-prose prose-block">
            <p className="text-ink-soft">
              The trust anchor for this buyer is whether the person in their office
              has actually done construction operations or job-cost data work
              before. That belongs here, in specifics.
            </p>
            <Pending block>
              founder / lead engineer background — real name, and the concrete
              history: years in construction operations or accounting, the ERP and
              PM systems worked in directly, data / analytics engineering
              experience, and any job-cost or WIP responsibility held. Link to a
              real LinkedIn or bio. No claim that cannot be checked.
            </Pending>
          </div>
        </div>
      </section>

      <section className="rule-b">
        <div className="container py-14 md:py-20">
          <h2 className="text-[24px]">Engagements in progress</h2>
          <div className="mt-4 max-w-prose">
            <Pending block>
              current pilot / engagement status — e.g. &ldquo;running our first pilot
              with a mid-market GC in [region]; roughly [N] active jobs on the
              Capture stage&rdquo;. If there is no pilot yet, say that plainly:
              &ldquo;pre-pilot &mdash; the founder is doing this work directly with
              [N] firms while we formalise the engagement.&rdquo; Do not imply a
              product screenshot or a finished case study exists if it does not.
            </Pending>
          </div>
        </div>
      </section>

      <section className="rule-b bg-[color:var(--paper-2)]">
        <div className="container py-14 md:py-20">
          <h2 className="text-[24px]">What we will not put on this page</h2>
          <ul className="mt-4 space-y-2 max-w-prose text-ink-soft">
            <li>Satisfaction percentages or ROI multiples with no named source.</li>
            <li>Quotes attributed to &ldquo;a COO&rdquo; or &ldquo;a GC in the Midwest&rdquo; with no real name behind them.</li>
            <li>A &ldquo;case studies&rdquo; heading over anything that is not a documented, client-approved case.</li>
          </ul>
        </div>
      </section>

      <section>
        <div className="container py-16 md:py-20">
          <h2 className="max-w-[26ch] text-[26px] md:text-[32px]">
            If you would be an early client and are willing to be a reference later, that is the conversation we want.
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
