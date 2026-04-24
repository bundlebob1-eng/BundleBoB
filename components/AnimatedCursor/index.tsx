"use client";
import { useEffect, useRef } from "react";

export default function AnimatedCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    let rx = -100, ry = -100;
    let dx = -100, dy = -100;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      dx = e.clientX;
      dy = e.clientY;
      dot.style.transform = `translate(${dx - 4}px, ${dy - 4}px)`;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      rx = lerp(rx, dx, 0.1);
      ry = lerp(ry, dy, 0.1);
      ring.style.transform = `translate(${rx - 20}px, ${ry - 20}px)`;
      raf = requestAnimationFrame(animate);
    };

    const onEnter = () => {
      dot.style.transform += " scale(0)";
      ring.style.width = "60px";
      ring.style.height = "60px";
      ring.style.marginLeft = "-10px";
      ring.style.marginTop = "-10px";
      ring.style.borderColor = "rgba(184,255,87,0.8)";
    };

    const onLeave = () => {
      ring.style.width = "40px";
      ring.style.height = "40px";
      ring.style.marginLeft = "0";
      ring.style.marginTop = "0";
      ring.style.borderColor = "rgba(184,255,87,0.4)";
    };

    document.querySelectorAll("a, button").forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    window.addEventListener("mousemove", onMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-[#b8ff57]"
        style={{ transition: "transform 0.05s", willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-10 w-10 rounded-full border border-[rgba(184,255,87,0.4)]"
        style={{ transition: "width 0.3s, height 0.3s, border-color 0.3s", willChange: "transform" }}
      />
    </>
  );
}
