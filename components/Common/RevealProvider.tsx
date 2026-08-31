"use client";
import { useEffect } from "react";

/**
 * Adds `.in` to every [data-reveal] element as it scrolls into view.
 * Defensive on purpose: if IntersectionObserver is missing, the tab is
 * backgrounded, or anything throws, every element is revealed so content
 * is never left stuck at opacity:0.
 */
export default function RevealProvider() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!els.length) return;

    const revealAll = () => els.forEach((el) => el.classList.add("in"));

    if (typeof IntersectionObserver === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealAll();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -8% 0px" }
    );

    els.forEach((el) => io.observe(el));

    // Safety net: if something is still hidden after 3s, show it.
    const t = window.setTimeout(revealAll, 3000);

    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  return null;
}
