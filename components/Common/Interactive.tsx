"use client";
import { useEffect } from "react";

/**
 * Progressive enhancement only. Every element it touches is fully visible and
 * usable without this running — it just adds a pointer-reactive 3D tilt + glare
 * to any element marked [data-tilt]. Mounted once from the root layout.
 */
export default function Interactive() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-tilt]"));
    const cleanups: Array<() => void> = [];

    cards.forEach((card) => {
      let glare = card.querySelector<HTMLElement>(".glare");
      if (!glare) {
        glare = document.createElement("span");
        glare.className = "glare";
        Object.assign(glare.style, {
          position: "absolute",
          inset: "0",
          pointerEvents: "none",
          transition: "background 0.2s ease",
        } as CSSStyleDeclaration);
        card.appendChild(glare);
      }

      const move = (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        const rx = ((e.clientY - r.top - r.height / 2) / (r.height / 2)) * -4;
        const ry = ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 4;
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        const gx = ((e.clientX - r.left) / r.width) * 100;
        const gy = ((e.clientY - r.top) / r.height) * 100;
        glare!.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(184,255,87,0.08) 0%, transparent 55%)`;
      };
      const leave = () => {
        card.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
        glare!.style.background = "transparent";
      };

      card.addEventListener("mousemove", move);
      card.addEventListener("mouseleave", leave);
      cleanups.push(() => {
        card.removeEventListener("mousemove", move);
        card.removeEventListener("mouseleave", leave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
