const SYSTEMS = [
  "Procore",
  "Sage 300 CRE",
  "Foundation",
  "QuickBooks",
  "Viewpoint Vista",
  "CMiC",
  "Autodesk / PlanGrid",
  "Excel / Google Sheets",
];

export default function Brands() {
  return (
    <section className="border-b border-line bg-bg-2">
      <div className="container mx-auto px-5 py-10">
        <div className="label !text-muted">Systems we connect</div>
        <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
          {SYSTEMS.map((s) => (
            <li key={s} className="font-mono text-[13px] text-muted">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
