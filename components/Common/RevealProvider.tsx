"use client";
import { useEffect } from "react";

export default function RevealProvider() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(
      "[data-reveal],[data-reveal-left],[data-reveal-right],[data-reveal-scale]"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const delay = parseInt(el.dataset.delay ?? "0");
          setTimeout(() => el.classList.add("in"), delay);
          observer.unobserve(el);
        });
      },
      { threshold: 0.12 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
