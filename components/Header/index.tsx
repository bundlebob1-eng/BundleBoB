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
  const [sticky, setSticky] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setSticky(window.scrollY > 40);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-[500] w-full transition-all duration-300 ${
        sticky
          ? "border-b border-white/[0.06] bg-[#040406]/90 shadow-[0_4px_40px_rgba(0,0,0,0.6)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className={`flex items-center justify-between transition-all ${sticky ? "py-3.5" : "py-6"}`}>
          <Link href="/" onClick={() => setOpen(false)} className="group flex items-center gap-2">
            <span className="relative flex h-8 w-8 items-center justify-center border border-accent/40 bg-accent/10 font-mono text-[11px] font-black text-accent transition group-hover:bg-accent group-hover:text-black">
              BB
              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-accent" style={{ animation: "glowPulse 2s ease-in-out infinite" }} />
            </span>
            <span className="font-syne text-xl font-extrabold tracking-tight text-white">
              Bundle<span className="text-accent">BoB</span>
            </span>
          </Link>

          <nav className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className={`relative font-mono text-[11px] uppercase tracking-[0.14em] transition-colors hover:text-accent ${
                      path === n.href ? "text-accent" : "text-white/45"
                    }`}
                  >
                    {n.label}
                    {path === n.href && <span className="absolute -bottom-1 left-0 h-px w-full bg-accent" />}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="btn-shine hidden border border-accent/50 px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-widest text-accent transition hover:bg-accent hover:text-black lg:block"
            >
              Talk to us
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="flex flex-col gap-[5px] p-2 lg:hidden"
              aria-label="Menu"
              aria-expanded={open}
            >
              <span className={`h-px w-6 bg-white transition-all ${open ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`h-px w-6 bg-white transition-all ${open ? "opacity-0" : ""}`} />
              <span className={`h-px w-6 bg-white transition-all ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-white/[0.07] bg-[#040406]/98 px-2 py-6 backdrop-blur-xl lg:hidden">
            <ul className="flex flex-col">
              {NAV.map((n) => (
                <li key={n.href} className="border-b border-white/[0.06] last:border-b-0">
                  <Link
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className={`block py-3 font-mono text-[13px] font-bold uppercase tracking-widest ${
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
      </div>
    </header>
  );
}
