import Link from "next/link";

const ARC = [
  { n: "01", name: "Capture", sub: "Unify project, accounting, field and spreadsheet data into one place you can trust." },
  { n: "02", name: "Control", sub: "Job costing, labour, subcontractors, change orders, cash and retainage — on current data." },
  { n: "03", name: "Intelligence", sub: "Plain-English answers and margin-leak alerts. A person approves every action." },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.06] bg-bg">
      {/* decorative layers — pure CSS, no JS */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 rounded-full"
        style={{
          width: 640,
          height: 640,
          background: "radial-gradient(circle, rgba(184,255,87,0.05) 0%, transparent 65%)",
          animation: "floatOrb 7s ease-in-out infinite",
        }}
      />
      <div
        className="pointer-events-none absolute left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg,transparent,rgba(184,255,87,0.35),transparent)",
          animation: "scanLine 9s ease-in-out infinite",
        }}
      />

      <div className="container relative mx-auto px-4 pb-20 pt-36 md:pb-28 md:pt-44">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.15fr_1fr]">
          {/* LEFT — copy */}
          <div>
            <div className="mb-7 flex items-center gap-3" style={{ animation: "heroFadeUp .7s ease both" }}>
              <span className="h-px w-10 bg-accent" />
              <span className="label">Forward Deployed Engineer · commercial construction</span>
            </div>

            <h1
              className="mb-7 font-syne font-extrabold leading-[1.05] tracking-[-0.04em] text-white"
              style={{ fontSize: "clamp(34px,5.4vw,58px)", animation: "heroFadeUp .8s ease both", animationDelay: ".05s" }}
            >
              One Forward Deployed Engineer inside your construction business{" "}
              <span className="relative inline-block text-accent">
                — not a tool you log into.
                <span
                  className="absolute -bottom-1 left-0 h-[3px] w-full origin-left bg-accent"
                  style={{ animation: "lineExpand .8s cubic-bezier(.16,1,.3,1) both", animationDelay: ".6s" }}
                />
              </span>
            </h1>

            <div
              className="mb-9 max-w-[60ch] space-y-4 text-[15px] leading-[1.8] text-white/55"
              style={{ animation: "heroFadeUp .8s ease both", animationDelay: ".15s" }}
            >
              <p>
                We place one Forward Deployed Engineer (FDE) — also known as an AI Integrator — in your firm to
                connect Procore, Sage, Foundation, QuickBooks and your spreadsheets, then build the layer on top
                that shows where your margin is leaking. Capture, then Control, then Intelligence, in that order.
              </p>
              <p className="text-[14px]">
                You are adding one FDE to your headcount budget — a person who understands job costing. You are
                not buying another piece of software.
              </p>
            </div>

            <div className="flex flex-wrap gap-4" style={{ animation: "heroFadeUp .8s ease both", animationDelay: ".25s" }}>
              <Link href="/how-it-works" className="btn btn-shine">
                How it works
              </Link>
              <Link href="/pricing" className="btn btn-ghost">
                Pricing
              </Link>
            </div>
          </div>

          {/* RIGHT — arc cards */}
          <div className="grid gap-3" style={{ animation: "heroFadeUp 1s ease both", animationDelay: ".3s" }}>
            {ARC.map((s) => (
              <div
                key={s.n}
                data-tilt
                className="tilt relative overflow-hidden border border-white/[0.08] bg-bg2/90 p-5 hover:border-accent/30"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[12px] text-accent">{s.n}</span>
                  <span className="font-syne text-[16px] font-bold text-white">{s.name}</span>
                </div>
                <p className="mt-2 text-[12.5px] leading-[1.6] text-white/45">{s.sub}</p>
                <span className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-accent/30 to-transparent" />
              </div>
            ))}
          </div>
        </div>

        {/* Honest stage line */}
        <div
          className="mt-16 border border-white/[0.07] bg-bg2 p-5"
          style={{ animation: "heroFadeUp .9s ease both", animationDelay: ".4s" }}
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/35">Where we are right now</div>
          <p className="mt-2 max-w-[70ch] text-[13px] leading-[1.7] text-white/60">
            Early stage. We are not publishing a client count, a pilot location, or results yet — when there is a
            named engagement we can point to, it will be on the{" "}
            <Link href="/proof" className="text-accent underline underline-offset-2">
              Proof
            </Link>{" "}
            page, with the client&rsquo;s agreement and not before.
          </p>
        </div>
      </div>
    </section>
  );
}
