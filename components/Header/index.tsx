"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

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
  const [open, setOpen] = useState(false);

  return (
    <header className="rule-b bg-paper">
      <div className="container flex items-center justify-between py-5">
        <Link href="/" className="font-serif text-xl tracking-tight" onClick={() => setOpen(false)}>
          BundleBoB
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-7">
            {NAV.map((n) => {
              const active = path === n.href;
              return (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className={`text-[14px] link-underline ${active ? "text-ink" : "text-ink-soft"}`}
                    style={active ? { textDecorationColor: "var(--accent)" } : undefined}
                  >
                    {n.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="label md:hidden"
          aria-expanded={open}
          aria-label="Menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav className="rule-t bg-paper md:hidden">
          <ul className="container flex flex-col py-2">
            {NAV.map((n) => (
              <li key={n.href} className="rule-b last:border-b-0">
                <Link
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-[15px]"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
