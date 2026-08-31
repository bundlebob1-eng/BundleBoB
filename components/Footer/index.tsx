import Link from "next/link";
import Pending from "@/components/Pending";

const NAV = [
  { label: "How it works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "Proof", href: "/proof" },
  { label: "Security", href: "/security" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.07] bg-[#040406]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 border-b border-white/[0.07] py-16 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center border border-[#b8ff57]/40 bg-[#b8ff57]/10 font-mono text-[10px] font-black text-[#b8ff57]">
                BB
              </div>
              <span className="font-syne text-lg font-extrabold text-white">
                Bundle<span className="text-[#b8ff57]">BoB</span>
              </span>
            </div>
            <p className="mb-6 max-w-[260px] font-mono text-[11px] leading-[1.8] text-gray-500">
              An embedded margin engineer for mid-market general contractors.
              Capture, then Control, then Intelligence.
            </p>
            <div className="space-y-2 text-[12px]">
              <div>
                <Pending>company email that actually receives mail</Pending>
              </div>
              <div>
                <Pending>US entity name and registration state</Pending>
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-5 font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-500">
              Site
            </h4>
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="mb-2.5 block font-mono text-[11px] text-gray-500 transition hover:text-[#b8ff57]"
              >
                {n.label}
              </Link>
            ))}
          </div>

          <div>
            <h4 className="mb-5 font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-500">
              What is not here yet
            </h4>
            <p className="max-w-[260px] font-mono text-[11px] leading-[1.8] text-gray-500">
              No blog, no careers page, no case studies, no legal pages. They go up
              when there is something real to put on them — and get linked only once
              the page exists.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 py-6">
          <span className="font-mono text-[10px] text-gray-600">
            © {new Date().getFullYear()} BundleBoB. This site states only what is true today.
          </span>
          <span className="font-mono text-[10px] text-gray-600">
            Built with AI in the loop. A person approves every action.
          </span>
        </div>
      </div>
    </footer>
  );
}
