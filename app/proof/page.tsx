import type { Metadata } from "next";
import Link from "next/link";
import Pending from "@/components/Pending";

export const metadata: Metadata = {
  title: "Proof",
  description:
    "What is real right now: the founder's operating background, the state of our first engagements, and an honest statement of stage. No manufactured social proof.",
};

const SECTIONS = [
  {
    h: "The Forward Deployed Engineer",
    intro:
      "One role, embedded in your firm — the Forward Deployed Engineer, also known as an AI Integrator. The trust anchor for this buyer is whether that person has actually done construction operations or job-cost data work before. That belongs here, in specifics.",
    pending:
      "founder / Forward Deployed Engineer background — real name, and the concrete history: years in construction operations or accounting, the ERP and PM systems worked in directly, data / analytics engineering experience, and any job-cost or WIP responsibility held. Link to a real profile. No claim that cannot be checked.",
  },
  {
    h: "Engagements in progress",
    intro: null,
    pending:
      "current pilot / engagement status — e.g. “running our first pilot with a mid-market GC in [region]; roughly [N] active jobs on the Capture stage”. If there is no pilot yet, say that plainly: “pre-pilot — the founder is doing this work directly with [N] firms while we formalise the engagement.” Do not imply a product screenshot or a finished case study exists if it does not.",
  },
];

export default function Proof() {
  return (
    <>
      <section className="border-b border-line">
        <div className="container mx-auto px-5 pb-14 pt-36 md:pb-20 md:pt-44">
          <p className="label">
            Proof
          </p>
          <h1
            className="mt-5 max-w-[22ch] font-display font-semibold tracking-[-0.03em] text-white"
            style={{ fontSize: "clamp(30px,5vw,52px)" }}
          >
            What is actually true today
          </h1>
          <p className="mt-5 max-w-[60ch] text-[15px] leading-[1.7] text-muted">
            We do not have named client testimonials or published case studies yet. When a general contractor is
            willing to go on record, their name and results will be on this page. Until then, here is what is
            real.
          </p>
        </div>
      </section>

      {SECTIONS.map((s) => (
        <section key={s.h} className="border-b border-line">
          <div className="container mx-auto grid grid-cols-1 gap-8 px-5 py-14 md:grid-cols-[280px_1fr] md:py-20">
            <h2 className="font-display text-[20px] font-semibold text-white">{s.h}</h2>
            <div className="max-w-[64ch] space-y-4">
              {s.intro && <p className="text-[14px] leading-[1.75] text-muted">{s.intro}</p>}
              <Pending block>{s.pending}</Pending>
            </div>
          </div>
        </section>
      ))}

      <section className="border-b border-line bg-bg-2">
        <div className="container mx-auto px-5 py-14 md:py-20">
          <h2 className="font-display text-[20px] font-semibold text-white">
            What we will not put on this page
          </h2>
          <ul className="mt-4 max-w-[60ch] space-y-2.5 text-[13px] leading-[1.7] text-muted">
            <li className="flex gap-3"><span className="text-accent">→</span> Satisfaction percentages or ROI multiples with no named source.</li>
            <li className="flex gap-3"><span className="text-accent">→</span> Quotes attributed to &ldquo;a COO&rdquo; or &ldquo;a GC in the Midwest&rdquo; with no real name behind them.</li>
            <li className="flex gap-3"><span className="text-accent">→</span> A &ldquo;case studies&rdquo; heading over anything that is not a documented, client-approved case.</li>
          </ul>
        </div>
      </section>

      <section>
        <div className="container mx-auto px-5 py-20 md:py-28">
          <h2
            className="max-w-[28ch] font-display font-semibold tracking-[-0.03em] text-white"
            style={{ fontSize: "clamp(22px,3.2vw,34px)" }}
          >
            If you would be an early client and are willing to be a reference later, that is the conversation we
            want.
          </h2>
          <Link href="/contact" className="btn mt-8">
            Contact
          </Link>
        </div>
      </section>
    </>
  );
}
