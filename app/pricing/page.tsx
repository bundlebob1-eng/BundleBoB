import type { Metadata } from "next";
import Link from "next/link";
import Pending from "@/components/Pending";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Priced against the analytics engineer you would otherwise hire — a monthly headcount line, not a project quote.",
};

const HIRE = [
  { dt: "Fully loaded annual cost", dd: <Pending>market range for a data/analytics engineer with a construction background in your region — salary + benefits + overhead</Pending> },
  { dt: "Time to hire", dd: "Months of searching for someone who knows both data work and job costing." },
  { dt: "Time to useful", dd: "Ramp on your systems and your jobs before the first real output." },
  { dt: "Risk", dd: "One person. If they leave, the knowledge leaves with them." },
];

const EMBED = [
  { dt: "Monthly fee", dd: <Pending>monthly engagement fee, and how it compares to the loaded cost on the left</Pending> },
  { dt: "Term", dd: <Pending>month-to-month, or minimum term — state which</Pending> },
  { dt: "Time to useful", dd: "Weeks. The engineer has run the Capture → Control → Intelligence arc before." },
  { dt: "Risk", dd: <>What the engineer builds is documented and stays with you — backed by the team behind them, not a single point of failure. <Pending>continuity / handover terms if the engagement ends</Pending></> },
];

const EMBEDDED_MEANS = [
  { l: "On-site vs remote", v: <Pending>the actual split — e.g. on-site the first two weeks, one day a month after, remote otherwise</Pending> },
  { l: "Hours per week", v: <Pending>dedicated hours per week per client, and whether the engineer is shared across firms</Pending> },
  { l: "Reporting line", v: <Pending>who the engineer reports to inside the firm — e.g. CFO or controller — and the standing weekly meeting</Pending> },
  { l: "What you provide", v: <Pending>access, a point of contact in accounting and operations, and any equipment or seat requirements</Pending> },
];

export default function Pricing() {
  return (
    <div className="pt-24">
      <section className="border-b border-white/[0.06] bg-[#040406] px-4 py-20">
        <div className="container mx-auto">
          <div className="mb-6 flex items-center gap-2.5">
            <span className="h-px w-8 bg-[#b8ff57]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b8ff57]">Engagement model</span>
          </div>
          <h1
            className="mb-6 max-w-[22ch] font-syne font-extrabold leading-tight tracking-[-0.04em] text-white"
            style={{ fontSize: "clamp(36px,7vw,80px)" }}
          >
            Priced against a hire, not a project
          </h1>
          <p className="max-w-[560px] text-[15px] leading-[1.85] text-gray-400">
            The right comparison is not &ldquo;what does this software cost.&rdquo; It is &ldquo;what would it cost to
            hire a data engineer who understands construction operations, and how long until they are useful.&rdquo;
          </p>
        </div>
      </section>

      {/* Comparison */}
      <section className="border-b border-white/[0.06] bg-[#040406] px-4 py-20">
        <div className="container mx-auto grid grid-cols-1 border border-white/[0.06] md:grid-cols-2">
          <div className="border-b border-white/[0.06] p-10 md:border-b-0 md:border-r">
            <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-gray-500">Hiring your own</div>
            <h2 className="mt-1 font-syne text-[22px] font-bold text-white">Data / analytics engineer</h2>
            <dl className="mt-6 space-y-5">
              {HIRE.map((r) => (
                <div key={r.dt}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-gray-500">{r.dt}</dt>
                  <dd className="mt-1 text-[13px] leading-[1.75] text-gray-300">{r.dd}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="bg-[#07070a] p-10">
            <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#b8ff57]">BundleBoB engagement</div>
            <h2 className="mt-1 font-syne text-[22px] font-bold text-white">An embedded engineer</h2>
            <dl className="mt-6 space-y-5">
              {EMBED.map((r) => (
                <div key={r.dt}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-gray-500">{r.dt}</dt>
                  <dd className="mt-1 text-[13px] leading-[1.75] text-gray-300">{r.dd}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* What embedded means */}
      <section className="border-b border-white/[0.06] bg-[#07070a] px-4 py-20">
        <div className="container mx-auto">
          <div data-reveal className="mb-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b8ff57]">/ What &ldquo;embedded&rdquo; means in practice</span>
          </div>
          <div className="grid grid-cols-1 border border-white/[0.06] sm:grid-cols-2">
            {EMBEDDED_MEANS.map((x, i) => (
              <div
                key={x.l}
                className={`p-8 ${i % 2 === 0 ? "sm:border-r sm:border-white/[0.06]" : ""} ${i < 2 ? "border-b border-white/[0.06]" : ""}`}
              >
                <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-gray-500">{x.l}</div>
                <div className="mt-2 text-[13px] leading-[1.75] text-gray-300">{x.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we don't do */}
      <section className="border-b border-white/[0.06] bg-[#040406] px-4 py-20">
        <div className="container mx-auto">
          <h2 className="mb-5 font-syne text-[22px] font-bold text-white">What we do not do</h2>
          <ul className="max-w-[620px] space-y-3 text-[13px] leading-[1.8] text-gray-400">
            <li className="flex gap-3"><span className="text-[#b8ff57]">→</span> No fixed-scope project quotes — &ldquo;$X for a dashboard, $Y for an integration.&rdquo;</li>
            <li className="flex gap-3"><span className="text-[#b8ff57]">→</span> No menu of deliverables. There is one offer: the embedded engineer and the arc.</li>
            <li className="flex gap-3"><span className="text-[#b8ff57]">→</span> No per-seat software licensing. You are paying for a person and the work they do.</li>
          </ul>
        </div>
      </section>

      <section className="bg-[#07070a] px-4 py-24">
        <div className="container mx-auto">
          <h2
            data-reveal
            className="mb-8 max-w-[26ch] font-syne font-extrabold leading-[1.1] tracking-[-0.03em] text-white"
            style={{ fontSize: "clamp(26px,4vw,42px)" }}
          >
            Tell us the role you have been trying to fill, and we will show you the comparison on your numbers.
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
