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
    <footer className="rule-t bg-paper">
      <div className="container grid gap-10 py-14 sm:grid-cols-2">
        <div>
          <div className="font-serif text-lg">BundleBoB</div>
          <p className="mt-3 max-w-[38ch] text-[14px] text-ink-soft">
            An embedded margin engineer for mid-market general contractors.
            Capture, then Control, then Intelligence.
          </p>
          <p className="mt-4 text-[14px]">
            <Pending>company email that actually receives mail</Pending>
          </p>
          <p className="mt-1 text-[14px] text-ink-soft">
            <Pending>US entity name and registration state</Pending>
          </p>
        </div>

        <nav className="sm:justify-self-end">
          <ul className="space-y-2">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-[14px] link-underline">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="container rule-t py-6">
        <p className="label">
          &copy; {new Date().getFullYear()} BundleBoB. No blog, no careers page,
          no case studies yet &mdash; this site says only what is true today.
        </p>
      </div>
    </footer>
  );
}
