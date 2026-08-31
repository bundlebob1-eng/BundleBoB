"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV = [
  { label: "How it works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "Proof", href: "/proof" },
  { label: "Security", href: "/security" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-colors duration-200 ${
        scrolled ? "border-b border-line bg-bg/90 backdrop-blur-md" : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-5 py-4">
        <Link href="/" onClick={() => setOpen(false)} className="font-display text-[15px] font-semibold tracking-tight text-white">
          Bundle<span className="text-accent">BoB</span>
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-7">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className={`font-mono text-[11px] uppercase tracking-[0.12em] transition-colors hover:text-white ${
                    path === n.href ? "text-accent" : "text-muted"
                  }`}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="hidden border border-line px-4 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-white transition-colors hover:border-accent hover:text-accent md:block"
          >
            Talk to us
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="flex flex-col gap-[5px] p-1.5 md:hidden"
            aria-label="Menu"
            aria-expanded={open}
          >
            <span className={`h-px w-6 bg-white transition-all ${open ? "translate-y-[6px] rotate-45" : ""}`} />
            <span className={`h-px w-6 bg-white transition-all ${open ? "opacity-0" : ""}`} />
            <span className={`h-px w-6 bg-white transition-all ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-bg px-5 py-6 md:hidden">
          <ul className="flex flex-col gap-1">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className={`block py-2.5 font-mono text-[13px] uppercase tracking-[0.1em] ${
                    path === n.href ? "text-accent" : "text-white"
                  }`}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
