const Breadcrumb = ({
  pageName,
  description,
}: {
  pageName: string;
  description?: string;
}) => {
  return (
    <section className="relative z-10 overflow-hidden border-b border-white/10 bg-[#0f0f0f] pb-20 pt-[160px]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-start">
          <p className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
            <span className="text-[#b8ff57]">/</span>
            BundleBOB
            <span className="text-[#b8ff57]">/</span>
            {pageName}
          </p>
          <h1
            className="max-w-2xl font-extrabold leading-tight tracking-[-0.03em] text-white"
            style={{ fontSize: "clamp(32px, 5vw, 56px)" }}
          >
            {pageName}
          </h1>
          {description && (
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-gray-400">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Decorative grid */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/3 opacity-[0.025]">
        <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
          <defs>
            <pattern id="bc-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#b8ff57" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="400" height="400" fill="url(#bc-grid)" />
        </svg>
      </div>
    </section>
  );
};

export default Breadcrumb;
