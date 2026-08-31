import Link from "next/link";
import Pending from "@/components/Pending";

const ARC = [
  { n: "01", name: "Capture", sub: "Unify project, accounting, field and spreadsheet data into one place you can trust." },
  { n: "02", name: "Control", sub: "Job costing, labour, subcontractors, change orders, cash and retainage — on current data." },
  { n: "03", name: "Intelligence", sub: "Plain-English answers and margin-leak alerts. A person approves every action." },
];

export default function Hero() {
  return (
    <section className="border-b border-line">
      <div className="container mx-auto px-5 pb-20 pt-36 md:pb-28 md:pt-44">
        <p className="label">
          Forward Deployed Engineer · commercial construction
        </p>

        <h1
          className="mt-6 max-w-[20ch] font-display font-semibold leading-[1.08] tracking-[-0.03em] text-white"
          style={{ fontSize: "clamp(34px,5.5vw,60px)" }}
        >
          One Forward Deployed Engineer inside your construction business — not a tool you log into.
        </h1>

        <div className="mt-7 max-w-[62ch] space-y-4 text-[16px] leading-[1.7] text-muted">
          <p>
            We place one Forward Deployed Engineer (FDE) — also known as an AI Integrator — in your firm to
            connect Procore, Sage, Foundation, QuickBooks and your spreadsheets, then build the layer on top
            that shows where your margin is leaking. Capture, then Control, then Intelligence, in that order.
          </p>
          <p className="text-[15px]">
            You are adding one FDE to your headcount budget — a person who understands job costing. You are not
            buying another piece of software.
          </p>
        </div>

        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/contact" className="btn">
            Talk to us
          </Link>
          <Link href="/how-it-works" className="btn btn-ghost">
            How it works
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 border-t border-line sm:grid-cols-3">
          {ARC.map((s, i) => (
            <div
              key={s.n}
              className={`px-1 py-6 sm:px-6 ${i < 2 ? "border-b border-line sm:border-b-0 sm:border-r" : ""} ${i === 0 ? "sm:pl-0" : ""}`}
            >
              <div className="font-mono text-[12px] text-accent">{s.n}</div>
              <div className="mt-1 font-display text-[17px] font-semibold text-white">{s.name}</div>
              <p className="mt-2 text-[13.5px] leading-[1.6] text-muted">{s.sub}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 border border-line bg-bg-2 p-5">
          <div className="label !text-muted">Where we are right now</div>
          <div className="mt-2 max-w-[70ch]">
            <Pending block>
              honest one-line statement of current stage — e.g. &ldquo;running our first pilot with a
              mid-market GC in the Southwest&rdquo;, or &ldquo;pre-pilot; the founder is doing this work
              directly with two firms&rdquo;. No client count or result until one is real and named.
            </Pending>
          </div>
        </div>
      </div>
    </section>
  );
}
