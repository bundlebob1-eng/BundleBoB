import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Proof",
  description:
    "What is real right now: the founder's operating background, the state of our first engagements, and an honest statement of stage. No manufactured social proof.",
};

const SECTIONS = [
  {
    h: "The Forward Deployed Engineer",
    intro:
      "One role, embedded in your firm — the Forward Deployed Engineer, also known as an AI Integrator. The trust anchor for this buyer is whether that person has actually done construction operations or job-cost data work before.",
    detail:
      "Team bios are not published here yet. We will name the person doing the work — with their construction-operations and data-engineering background, and a profile you can check — before any firm is asked to sign. Ask us directly in the meantime.",
  },
  {
    h: "Engagements in progress",
    intro: null,
    detail:
      "We are not publishing a client count, a pilot location, or results yet. When there is a named engagement we can point to, it will be on this page — with the client's agreement, not before.",
  },
];

export default function Proof() {
  return (
    <>
      <section className="border-b border-white/[0.06]">
        <div className="container mx-auto px-5 pb-14 pt-36 md:pb-20 md:pt-44">
          <p className="label">Proof</p>
          <h1
            className="mt-5 max-w-[22ch] font-syne font-semibold tracking-[-0.03em] text-white"
            style={{ fontSize: "clamp(30px,5vw,52px)" }}
          >
            What is actually true today
          </h1>
          <p className="mt-5 max-w-[60ch] text-[15px] leading-[1.7] text-white/50">
            We do not have named client testimonials or published case studies yet. When a general contractor is
            willing to go on record, their name and results will be on this page. Until then, here is what is
            real.
          </p>
        </div>
      </section>

      {SECTIONS.map((s) => (
        <section key={s.h} className="border-b border-white/[0.06]">
          <div className="container mx-auto grid grid-cols-1 gap-8 px-5 py-14 md:grid-cols-[280px_1fr] md:py-20">
            <h2 className="font-syne text-[20px] font-semibold text-white">{s.h}</h2>
            <div className="max-w-[64ch] space-y-4">
              {s.intro && <p className="text-[14px] leading-[1.75] text-white/50">{s.intro}</p>}
              <p className="text-[14px] leading-[1.75] text-white/80">{s.detail}</p>
            </div>
          </div>
        </section>
      ))}

      <section className="border-b border-white/[0.06] bg-bg2">
        <div className="container mx-auto px-5 py-14 md:py-20">
          <h2 className="font-syne text-[20px] font-semibold text-white">What we will not put on this page</h2>
          <ul className="mt-4 max-w-[60ch] space-y-2.5 text-[13px] leading-[1.7] text-white/50">
            <li className="flex gap-3"><span className="text-accent">→</span> Satisfaction percentages or ROI multiples with no named source.</li>
            <li className="flex gap-3"><span className="text-accent">→</span> Quotes attributed to &ldquo;a COO&rdquo; or &ldquo;a GC in the Midwest&rdquo; with no real name behind them.</li>
            <li className="flex gap-3"><span className="text-accent">→</span> A &ldquo;case studies&rdquo; heading over anything that is not a documented, client-approved case.</li>
          </ul>
        </div>
      </section>

      <section>
        <div className="container mx-auto px-5 py-20 md:py-28">
          <h2
            className="max-w-[28ch] font-syne font-semibold tracking-[-0.03em] text-white"
            style={{ fontSize: "clamp(22px,3.2vw,34px)" }}
          >
            If you would be an early client and are willing to be a reference later, that is the conversation we
            want.
          </h2>
          <Link href="/contact" className="btn btn-shine mt-8">How to reach us</Link>
        </div>
      </section>
    </>
  );
}
