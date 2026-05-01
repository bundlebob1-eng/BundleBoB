"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV = [
  { label:"Services",  href:"/services" },
  { label:"Work",      href:"/work" },
  { label:"Process",   href:"/process" },
  { label:"About",     href:"/about" },
  { label:"Contact",   href:"/contact" },
];

export default function Header() {
  const path = usePathname();
  const [sticky, setSticky]     = useState(false);
  const [open,   setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => { setSticky(window.scrollY > 60); setScrolled(window.scrollY > 10); };
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header className={`left-0 top-0 z-[500] w-full transition-all duration-300 ${
      sticky ? "fixed bg-[#040406]/90 backdrop-blur-md border-b border-white/[0.06] shadow-[0_4px_40px_rgba(0,0,0,0.6)]"
             : "absolute bg-transparent"
    }`}>
      <div className="container mx-auto px-4">
        <div className={`flex items-center justify-between transition-all ${sticky ? "py-4" : "py-6"}`}>

          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <div className="relative flex h-8 w-8 items-center justify-center border border-[#b8ff57]/40 bg-[#b8ff57]/10 font-mono text-[11px] font-black text-[#b8ff57] transition group-hover:bg-[#b8ff57] group-hover:text-black">
              BB
              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-[#b8ff57]" style={{ animation:"glowPulse 2s ease-in-out infinite" }} />
            </div>
            <span className="font-syne text-xl font-extrabold tracking-tight text-white">
              Bundle<span className="text-[#b8ff57]">BOB</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {NAV.map(n => (
                <li key={n.href}>
                  <Link href={n.href}
                    className={`relative font-mono text-[11px] uppercase tracking-[0.16em] transition-colors hover:text-[#b8ff57] ${
                      path===n.href ? "text-[#b8ff57]" : "text-gray-400"
                    }`}>
                    {n.label}
                    {path===n.href && (
                      <span className="absolute -bottom-1 left-0 h-px w-full bg-[#b8ff57]" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/contact"
              className="btn-shine hidden border border-[#b8ff57]/50 px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-widest text-[#b8ff57] transition hover:bg-[#b8ff57] hover:text-black lg:block">
              Free Consult →
            </Link>

            {/* Hamburger */}
            <button onClick={() => setOpen(!open)} className="flex flex-col gap-[5px] p-2 lg:hidden" aria-label="menu">
              <span className={`h-px w-6 bg-white transition-all ${open ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`h-px w-6 bg-white transition-all ${open ? "opacity-0" : ""}`} />
              <span className={`h-px w-6 bg-white transition-all ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="absolute left-0 right-0 top-full border-t border-white/[0.07] bg-[#040406]/98 px-6 py-8 backdrop-blur-xl lg:hidden">
            <ul className="flex flex-col gap-6 mb-8">
              {NAV.map(n => (
                <li key={n.href}>
                  <Link href={n.href} onClick={() => setOpen(false)}
                    className={`font-mono text-sm font-bold uppercase tracking-widest transition hover:text-[#b8ff57] ${path===n.href?"text-[#b8ff57]":"text-white"}`}>
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/contact" onClick={() => setOpen(false)}
              className="inline-block border border-[#b8ff57] px-6 py-3 font-mono text-[11px] font-bold uppercase tracking-widest text-[#b8ff57]">
              Free Consultation →
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
