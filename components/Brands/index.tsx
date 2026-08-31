const r1 = [
  "Procore",
  "Sage 300 CRE",
  "Foundation",
  "QuickBooks",
  "Viewpoint Vista",
  "CMiC",
  "Excel / Google Sheets",
  "Autodesk / PlanGrid",
];
const r2 = [
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
    <div className="overflow-hidden border-b border-white/[0.06] bg-[#07070a]">
      <div className="flex overflow-hidden border-b border-white/[0.06]" style={{ height: 48 }}>
        <div className="flex shrink-0" style={{ animation: "ticker 30s linear infinite", width: "max-content" }}>
          {[...r1, ...r1, ...r1].map((x, i) => (
            <div key={i} className="flex h-12 shrink-0 items-center gap-3 border-r border-white/[0.06] px-7">
              <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#b8ff57]">SYS</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-gray-500">{x}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex overflow-hidden" style={{ height: 48 }}>
        <div className="flex shrink-0" style={{ animation: "ticker 24s linear infinite reverse", width: "max-content" }}>
          {[...r2, ...r2, ...r2].map((x, i) => (
            <div
              key={i}
              className="flex h-12 shrink-0 items-center border-r border-white/[0.06] px-7 font-mono text-[9px] uppercase tracking-[0.14em] text-gray-500"
            >
              {x}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
