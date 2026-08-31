import type { Metadata } from "next";
import Link from "next/link";
import Pending from "@/components/Pending";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "One Forward Deployed Engineer (AI Integrator), priced against the data/analytics engineer you would otherwise hire — a monthly headcount line, not a project quote.",
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
  { dt: "Time to useful", dd: "Weeks. The FDE has run the Capture → Control → Intelligence arc before." },
  { dt: "Risk", dd: <>What the FDE builds is documented and stays with you — backed by the team behind them, not a single point of failure. <Pending>continuity / handover terms if the engagement ends</Pending></> },
];

const EMBEDDED_MEANS = [
  { l: "On-site vs remote", v: <Pending>the actual split — e.g. on-site the first two weeks, one day a month after, remote otherwise</Pending> },
  { l: "Hours per week", v: <Pending>dedicated hours per week per client, and whether the FDE is shared across firms</Pending> },
  { l: "Reporting line", v: <Pending>who the FDE reports to inside the firm — e.g. CFO or controller — and the standing weekly meeting</Pending> },
  { l: "What you provide", v: <Pending>access, a point of contact in accounting and operations, and any equipment or seat requirements</Pending> },
];

export default function Pricing() {
  return (
    <>
      <section className="border-b border-line">
        <div className="container mx-auto px-5 pb-14 pt-36 md:pb-20 md:pt-44">
          <p className="label" data-reveal>
            Engagement model
          </p>
          <h1
            data-reveal
            className="mt-5 max-w-[22ch] font-display font-semibold tracking-[-0.03em] text-white"
            style={{ fontSize: "clamp(30px,5vw,52px)" }}
          >
            Priced against a hire, not a project
          </h1>
          <p data-reveal className="mt-5 max-w-[58ch] text-[15px] leading-[1.7] text-muted">
            The right comparison is not &ldquo;what does this software cost.&rdquo; It is &ldquo;what would it
            cost to hire a data engineer who understands construction operations, and how long until they are
            useful.&rdquo;
          </p>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="container mx-auto grid grid-cols-1 gap-px border-y border-line bg-line md:grid-cols-2">
          <div data-reveal className="bg-bg p-8 md:p-10">
            <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Hiring your own</div>
            <h2 className="mt-1 font-display text-[20px] font-semibold text-white">Data / analytics engineer</h2>
            <dl className="mt-6 space-y-5">
              {HIRE.map((r) => (
                <div key={r.dt}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">{r.dt}</dt>
                  <dd className="mt-1 text-[13px] leading-[1.7] text-white/85">{r.dd}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div data-reveal className="bg-bg-2 p-8 md:p-10">
            <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">BundleBoB engagement · a.k.a. AI Integrator</div>
            <h2 className="mt-1 font-display text-[20px] font-semibold text-white">One Forward Deployed Engineer</h2>
            <dl className="mt-6 space-y-5">
              {EMBED.map((r) => (
                <div key={r.dt}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">{r.dt}</dt>
                  <dd className="mt-1 text-[13px] leading-[1.7] text-white/85">{r.dd}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-bg-2">
        <div className="container mx-auto px-5 py-14 md:py-20">
          <p className="label" data-reveal>
            What &ldquo;embedded&rdquo; means in practice
          </p>
          <div className="mt-6 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
            {EMBEDDED_MEANS.map((x) => (
              <div key={x.l} data-reveal className="bg-bg-2 p-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{x.l}</div>
                <div className="mt-2 text-[13px] leading-[1.7] text-white/85">{x.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="container mx-auto px-5 py-14 md:py-20">
          <h2 data-reveal className="font-display text-[20px] font-semibold text-white">What we do not do</h2>
          <ul data-reveal className="mt-4 max-w-[60ch] space-y-2.5 text-[13px] leading-[1.7] text-muted">
            <li className="flex gap-3"><span className="text-accent">→</span> No fixed-scope project quotes — &ldquo;$X for a dashboard, $Y for an integration.&rdquo;</li>
            <li className="flex gap-3"><span className="text-accent">→</span> No menu of deliverables. There is one offer: one Forward Deployed Engineer and the arc.</li>
            <li className="flex gap-3"><span className="text-accent">→</span> No per-seat software licensing. You are paying for a person and the work they do.</li>
          </ul>
        </div>
      </section>

      <section>
        <div className="container mx-auto px-5 py-20 md:py-28">
          <h2
            data-reveal
            className="max-w-[26ch] font-display font-semibold tracking-[-0.03em] text-white"
            style={{ fontSize: "clamp(22px,3.2vw,34px)" }}
          >
            Tell us the role you have been trying to fill, and we will show you the comparison on your numbers.
          </h2>
          <Link href="/contact" data-reveal className="btn mt-8">
            Contact
          </Link>
        </div>
      </section>
    </>
  );
}
