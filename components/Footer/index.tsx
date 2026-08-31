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
    <footer className="border-t border-line">
      <div className="container mx-auto grid grid-cols-1 gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <div className="font-display text-[15px] font-semibold text-white">
            Bundle<span className="text-accent">BoB</span>
          </div>
          <p className="mt-3 max-w-[34ch] text-[13px] leading-[1.7] text-muted">
            An embedded margin engineer for mid-market general contractors. Capture, then Control, then
            Intelligence.
          </p>
          <div className="mt-4 space-y-2 text-[12px]">
            <div>
              <Pending>company email that actually receives mail</Pending>
            </div>
            <div>
              <Pending>US entity name and registration state</Pending>
            </div>
          </div>
        </div>

        <div>
          <div className="label !text-muted">Site</div>
          <ul className="mt-4 space-y-2">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-[13px] text-muted transition-colors hover:text-white">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="label !text-muted">Not here yet</div>
          <p className="mt-4 max-w-[34ch] text-[13px] leading-[1.7] text-muted">
            No blog, no careers page, no case studies, no legal pages. They go up when there is something real
            to put on them — and get linked only once the page exists.
          </p>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 px-5 py-5">
          <span className="font-mono text-[10px] text-muted">
            © {new Date().getFullYear()} BundleBoB. This site states only what is true today.
          </span>
          <span className="font-mono text-[10px] text-muted">AI in the loop. A person approves every action.</span>
        </div>
      </div>
    </footer>
  );
}
