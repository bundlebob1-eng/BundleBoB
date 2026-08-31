"use client";
import { useEffect, useState } from "react";
export default function ScrollToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return show ? (
    <button onClick={() => window.scrollTo({ top:0, behavior:"smooth" })}
      aria-label="scroll to top"
      className="fixed bottom-8 right-8 z-[200] flex h-10 w-10 items-center justify-center border border-[#b8ff57]/30 bg-[#040406] text-[#b8ff57] shadow-lg transition hover:border-[#b8ff57] hover:bg-[#b8ff57]/10"
      style={{ animation:"glowPulse 3s ease-in-out infinite" }}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  ) : null;
}
