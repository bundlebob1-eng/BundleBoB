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
    <div className="pt-24">
      <section className="border-b border-white/[0.06] bg-[#040406] px-4 py-20">
        <div className="container mx-auto">
          <div className="mb-6 flex items-center gap-2.5">
            <span className="h-px w-8 bg-[#b8ff57]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b8ff57]">About</span>
          </div>
          <h1
            className="mb-6 max-w-[24ch] font-syne font-extrabold leading-tight tracking-[-0.04em] text-white"
            style={{ fontSize: "clamp(34px,6vw,72px)" }}
          >
            Built by people who have done construction operations, not just software
          </h1>
          <p className="max-w-[620px] text-[15px] leading-[1.85] text-gray-400">
            The reason this works is that the person in your office already knows what a WIP schedule is, why a change
            order sits for six weeks, and where job-cost data goes wrong. That is the background this page needs to show.
          </p>
        </div>
      </section>

      <section className="border-b border-white/[0.06] bg-[#040406] px-4 py-20">
        <div className="container mx-auto grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr]">
          <h2 className="font-syne text-[22px] font-bold text-white">Who is doing this work</h2>
          <div className="max-w-[640px]">
            <Pending block>
              real names and roles of the founder(s) and any engineers. For each: years and firms in commercial
              construction operations or accounting, the specific PM / ERP systems worked in, data or analytics
              engineering background, and any direct job-cost, WIP, or estimating responsibility. Link each person to a
              real profile.
            </Pending>
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.06] bg-[#07070a] px-4 py-20">
        <div className="container mx-auto grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr]">
          <h2 className="font-syne text-[22px] font-bold text-white">Why embedded, and why one person</h2>
          <div className="max-w-[640px] space-y-4 text-[14px] leading-[1.85] text-gray-400">
            <p>
              A consultancy sends a team, writes a report, and leaves. A software vendor sells you a login and a support
              queue. Neither one sits with your controller long enough to learn how your firm actually runs.
            </p>
            <p>
              One engineer, embedded, accountable to your finance lead, is the smallest thing that can connect the
              systems and stay long enough to make the output trustworthy. Anything we build for a third client that
              would help every client becomes part of the core — so each engagement starts further along than the last,
              instead of from zero.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.06] bg-[#040406] px-4 py-20">
        <div className="container mx-auto grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr]">
          <h2 className="font-syne text-[22px] font-bold text-white">The company</h2>
          <div className="max-w-[640px] space-y-3">
            <p className="text-[14px] leading-[1.85] text-gray-400">
              <Pending>legal entity name, structure, US state of registration, and year formed — only stated once it is checkable</Pending>
            </p>
            <p className="text-[14px] leading-[1.85] text-gray-400">
              <Pending>where the team is based, and where clients are located today</Pending>
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#07070a] px-4 py-24">
        <div className="container mx-auto">
          <h2
            data-reveal
            className="mb-8 max-w-[26ch] font-syne font-extrabold leading-[1.1] tracking-[-0.03em] text-white"
            style={{ fontSize: "clamp(26px,4vw,42px)" }}
          >
            If your background is construction finance and this is the job you wish existed, talk to us too.
          </h2>
          <Link
            href="/contact"
            className="btn-shine inline-flex bg-[#b8ff57] px-8 py-4 font-mono text-[12px] font-bold uppercase tracking-widest text-black transition hover:shadow-[0_0_40px_rgba(184,255,87,0.3)]"
          >
            Contact →
          </Link>
        </div>
      </section>
    </div>
  );
}
