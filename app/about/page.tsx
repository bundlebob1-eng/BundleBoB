import type { Metadata } from "next";
import Link from "next/link";
import Pending from "@/components/Pending";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who is doing this work, and why an embedded engineer is the right shape for mid-market construction — real names and real backgrounds.",
};

export default function About() {
  return (
    <>
      <section className="rule-b">
        <div className="container py-16 md:py-24">
          <p className="label">About</p>
          <h1 className="mt-5 max-w-[24ch] text-[36px] leading-tight md:text-[48px]">
            Built by people who have done construction operations, not just software
          </h1>
          <p className="mt-6 lead">
            The reason this works is that the person in your office already knows
            what a WIP schedule is, why a change order sits for six weeks, and where
            job-cost data goes wrong. That is the background this page needs to show.
          </p>
        </div>
      </section>

      <section className="rule-b">
        <div className="container py-14 md:py-20">
          <h2 className="text-[24px]">Who is doing this work</h2>
          <div className="mt-4 max-w-prose">
            <Pending block>
              real names and roles of the founder(s) and any engineers. For each:
              years and firms in commercial construction operations or accounting,
              the specific PM / ERP systems worked in, data or analytics engineering
              background, and any direct job-cost, WIP, or estimating
              responsibility. Link each person to a real profile.
            </Pending>
          </div>
        </div>
      </section>

      <section className="rule-b bg-[color:var(--paper-2)]">
        <div className="container py-14 md:py-20">
          <h2 className="text-[24px]">Why embedded, and why one person</h2>
          <div className="mt-4 max-w-prose prose-block">
            <p className="text-ink-soft">
              A consultancy sends a team, writes a report, and leaves. A software
              vendor sells you a login and a support queue. Neither one sits with
              your controller long enough to learn how your firm actually runs.
            </p>
            <p className="text-ink-soft">
              One engineer, embedded, accountable to your finance lead, is the
              smallest thing that can connect the systems and stay long enough to
              make the output trustworthy. Anything we build for a third client that
              would help every client becomes part of the core &mdash; so each
              engagement starts further along than the last, instead of from zero.
            </p>
          </div>
        </div>
      </section>

      <section className="rule-b">
        <div className="container py-14 md:py-20">
          <h2 className="text-[24px]">The company</h2>
          <div className="mt-4 max-w-prose prose-block">
            <p className="text-ink-soft">
              <Pending>legal entity name, structure, US state of registration, and year formed &mdash; only stated once it is checkable</Pending>
            </p>
            <p className="text-ink-soft">
              <Pending>where the team is based, and where clients are located today</Pending>
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="container py-16 md:py-20">
          <h2 className="max-w-[24ch] text-[26px] md:text-[32px]">
            If your background is construction finance and this is the job you wish existed, talk to us too.
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
