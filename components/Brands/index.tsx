const SYS = ["Procore", "Sage 300 CRE", "Foundation", "QuickBooks", "Viewpoint Vista", "CMiC", "Autodesk / PlanGrid", "Excel / Google Sheets"];
const METRICS = [
  "Job costing",
  "Labour productivity",
  "Subcontractor performance",
  "Change-order cycle time",
  "RFI cycle time",
  "WIP & over/under billing",
  "Retainage",
  "Cost-to-complete forecast",
];

export default function Brands() {
  return (
    <div className="overflow-hidden border-b border-white/[0.06] bg-bg2">
      <div className="flex overflow-hidden border-b border-white/[0.06]" style={{ height: 46 }}>
        <div className="flex shrink-0" style={{ animation: "ticker 34s linear infinite", width: "max-content" }}>
          {[...SYS, ...SYS, ...SYS].map((x, i) => (
            <div key={i} className="flex h-[46px] shrink-0 items-center gap-3 border-r border-white/[0.06] px-7">
              <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-accent">Sys</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/40">{x}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex overflow-hidden" style={{ height: 46 }}>
        <div className="flex shrink-0" style={{ animation: "ticker 28s linear infinite reverse", width: "max-content" }}>
          {[...METRICS, ...METRICS, ...METRICS].map((x, i) => (
            <div
              key={i}
              className="flex h-[46px] shrink-0 items-center border-r border-white/[0.06] px-7 font-mono text-[9px] uppercase tracking-[0.14em] text-white/40"
            >
              {x}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
