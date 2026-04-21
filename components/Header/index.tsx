"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);

  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) setSticky(true);
    else setSticky(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
    return () => window.removeEventListener("scroll", handleStickyNavbar);
  }, []);

  return (
    <header
      className={`header left-0 top-0 z-40 flex w-full items-center ${
        sticky
          ? "fixed z-[9999] bg-gray-900/95 shadow-lg backdrop-blur-sm transition"
          : "absolute bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="relative -mx-4 flex items-center justify-between">
          {/* Logo */}
          <div className="w-60 max-w-full px-4 xl:mr-12">
            <Link
              href="/"
              className={`header-logo block w-full ${sticky ? "py-4" : "py-6"}`}
            >
              <span className="text-2xl font-extrabold tracking-tight text-white">
                Bundle<span className="text-[#b8ff57]">BOB</span>
                <span className="ml-1 inline-block h-2 w-2 rounded-full bg-[#b8ff57] align-middle" />
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="flex w-full items-center justify-between px-4">
            <nav className="hidden lg:block">
              <ul className="flex gap-10">
                {[
                  { label: "Services", href: "/#services" },
                  { label: "Process", href: "/#process" },
                  { label: "About", href: "/#about" },
                  { label: "Clients", href: "/#testimonials" },
                  { label: "Contact", href: "/#contact" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="py-2 text-sm font-medium text-gray-400 transition hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              <Link
                href="/#contact"
                className="hidden rounded-none bg-[#b8ff57] px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-black transition hover:opacity-90 lg:block"
              >
                Free Consultation
              </Link>

              {/* Hamburger */}
              <button
                onClick={() => setNavbarOpen(!navbarOpen)}
                className="block rounded-sm px-3 py-1.5 ring-primary focus:ring-2 lg:hidden"
                aria-label="toggle menu"
              >
                <span
                  className={`relative my-1.5 block h-0.5 w-[22px] bg-white transition-all ${
                    navbarOpen ? "top-[7px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`relative my-1.5 block h-0.5 w-[22px] bg-white transition-all ${
                    navbarOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`relative my-1.5 block h-0.5 w-[22px] bg-white transition-all ${
                    navbarOpen ? "top-[-8px] -rotate-45" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden ${navbarOpen ? "block" : "hidden"} absolute left-0 right-0 top-full z-50 border-t border-white/10 bg-gray-900 px-6 py-6 shadow-xl`}
        >
          <ul className="flex flex-col gap-4">
            {[
              { label: "Services", href: "/#services" },
              { label: "Process", href: "/#process" },
              { label: "About", href: "/#about" },
              { label: "Clients", href: "/#testimonials" },
              { label: "Contact", href: "/#contact" },
            ].map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setNavbarOpen(false)}
                  className="block text-lg font-bold text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <Link
                href="/#contact"
                onClick={() => setNavbarOpen(false)}
                className="inline-block bg-[#b8ff57] px-6 py-3 text-xs font-bold uppercase tracking-widest text-black"
              >
                Free Consultation →
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
