import type { Metadata } from "next";
import Link from "next/link";
import Pending from "@/components/Pending";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who is doing this work, and why one Forward Deployed Engineer (AI Integrator) is the right shape for mid-market construction — real names and real backgrounds.",
};

export default function About() {
  return (
    <>
      <section className="border-b border-white/[0.06]">
        <div className="container mx-auto px-5 pb-14 pt-36 md:pb-20 md:pt-44">
          <p className="label">
            About
          </p>
          <h1
            className="mt-5 max-w-[24ch] font-syne font-semibold tracking-[-0.03em] text-white"
            style={{ fontSize: "clamp(28px,4.6vw,48px)" }}
          >
            Built by people who have done construction operations, not just software
          </h1>
          <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-white/50">
            The reason this works is that the person in your office already knows what a WIP schedule is, why a
            change order sits for six weeks, and where job-cost data goes wrong. That is the background this page
            needs to show.
          </p>
        </div>
      </section>

      <section className="border-b border-white/[0.06]">
        <div className="container mx-auto grid grid-cols-1 gap-8 px-5 py-14 md:grid-cols-[280px_1fr] md:py-20">
          <h2 className="font-syne text-[20px] font-semibold text-white">Who is doing this work</h2>
          <div className="max-w-[64ch]">
            <Pending block>
              real name(s) of the founder and the Forward Deployed Engineer(s) who do the embedding. For each:
              years and firms in commercial construction operations or accounting, the specific PM / ERP systems
              worked in, data or analytics engineering background, and any direct job-cost, WIP, or estimating
              responsibility. Link each person to a real profile.
            </Pending>
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.06] bg-bg2">
        <div className="container mx-auto grid grid-cols-1 gap-8 px-5 py-14 md:grid-cols-[280px_1fr] md:py-20">
          <h2 className="font-syne text-[20px] font-semibold text-white">
            Why one Forward Deployed Engineer
          </h2>
          <div className="max-w-[64ch] space-y-4 text-[14px] leading-[1.75] text-white/50">
            <p>
              The offer is a single role: a Forward Deployed Engineer, also known as an AI Integrator. Not a
              team, not a platform, not a rotating bench — one named person embedded in your firm.
            </p>
            <p>
              A consultancy sends a team, writes a report, and leaves. A software vendor sells you a login and a
              support queue. Neither one sits with your controller long enough to learn how your firm actually
              runs.
            </p>
            <p>
              One Forward Deployed Engineer, accountable to your finance lead, is the smallest thing that can
              connect the systems and stay long enough to make the output trustworthy. Anything we build for a
              third client that would help every client becomes part of the core — so each engagement starts
              further along than the last, instead of from zero.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.06]">
        <div className="container mx-auto grid grid-cols-1 gap-8 px-5 py-14 md:grid-cols-[280px_1fr] md:py-20">
          <h2 className="font-syne text-[20px] font-semibold text-white">The company</h2>
          <div className="max-w-[64ch] space-y-3">
            <p className="text-[14px] leading-[1.75] text-white/50">
              <Pending>legal entity name, structure, US state of registration, and year formed — only stated once it is checkable</Pending>
            </p>
            <p className="text-[14px] leading-[1.75] text-white/50">
              <Pending>where the team is based, and where clients are located today</Pending>
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto px-5 py-20 md:py-28">
          <h2
            className="max-w-[28ch] font-syne font-semibold tracking-[-0.03em] text-white"
            style={{ fontSize: "clamp(22px,3.2vw,34px)" }}
          >
            If your background is construction finance and this is the job you wish existed, talk to us too.
          </h2>
          <Link href="/contact" className="btn btn-shine mt-8">
            Contact
          </Link>
        </div>
      </section>
    </>
  );
}
