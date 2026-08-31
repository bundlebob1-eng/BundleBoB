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
    <div className="pt-24">
      <section className="border-b border-white/[0.06] bg-[#040406] px-4 py-20">
        <div className="container mx-auto">
          <div className="mb-6 flex items-center gap-2.5">
            <span className="h-px w-8 bg-[#b8ff57]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b8ff57]">Proof</span>
          </div>
          <h1
            className="mb-6 max-w-[22ch] font-syne font-extrabold leading-tight tracking-[-0.04em] text-white"
            style={{ fontSize: "clamp(36px,7vw,80px)" }}
          >
            What is actually true today
          </h1>
          <p className="max-w-[600px] text-[15px] leading-[1.85] text-gray-400">
            We do not have named client testimonials or published case studies yet. When a general contractor is willing
            to go on record, their name and results will be on this page. Until then, here is what is real.
          </p>
        </div>
      </section>

      <section className="border-b border-white/[0.06] bg-[#040406] px-4 py-20">
        <div className="container mx-auto grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr]">
          <h2 className="font-syne text-[22px] font-bold text-white">The people doing the work</h2>
          <div className="max-w-[640px] space-y-4">
            <p className="text-[14px] leading-[1.85] text-gray-400">
              The trust anchor for this buyer is whether the person in their office has actually done construction
              operations or job-cost data work before. That belongs here, in specifics.
            </p>
            <Pending block>
              founder / lead engineer background — real name, and the concrete history: years in construction operations
              or accounting, the ERP and PM systems worked in directly, data / analytics engineering experience, and any
              job-cost or WIP responsibility held. Link to a real profile. No claim that cannot be checked.
            </Pending>
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.06] bg-[#07070a] px-4 py-20">
        <div className="container mx-auto grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr]">
          <h2 className="font-syne text-[22px] font-bold text-white">Engagements in progress</h2>
          <div className="max-w-[640px]">
            <Pending block>
              current pilot / engagement status — e.g. &ldquo;running our first pilot with a mid-market GC in [region];
              roughly [N] active jobs on the Capture stage&rdquo;. If there is no pilot yet, say that plainly:
              &ldquo;pre-pilot — the founder is doing this work directly with [N] firms while we formalise the
              engagement.&rdquo; Do not imply a product screenshot or a finished case study exists if it does not.
            </Pending>
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.06] bg-[#040406] px-4 py-20">
        <div className="container mx-auto">
          <h2 className="mb-5 font-syne text-[22px] font-bold text-white">What we will not put on this page</h2>
          <ul className="max-w-[620px] space-y-3 text-[13px] leading-[1.8] text-gray-400">
            <li className="flex gap-3"><span className="text-[#b8ff57]">→</span> Satisfaction percentages or ROI multiples with no named source.</li>
            <li className="flex gap-3"><span className="text-[#b8ff57]">→</span> Quotes attributed to &ldquo;a COO&rdquo; or &ldquo;a GC in the Midwest&rdquo; with no real name behind them.</li>
            <li className="flex gap-3"><span className="text-[#b8ff57]">→</span> A &ldquo;case studies&rdquo; heading over anything that is not a documented, client-approved case.</li>
          </ul>
        </div>
      </section>

      <section className="bg-[#07070a] px-4 py-24">
        <div className="container mx-auto">
          <h2
            data-reveal
            className="mb-8 max-w-[28ch] font-syne font-extrabold leading-[1.1] tracking-[-0.03em] text-white"
            style={{ fontSize: "clamp(26px,4vw,42px)" }}
          >
            If you would be an early client and are willing to be a reference later, that is the conversation we want.
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
