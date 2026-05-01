"use client";
import { useEffect, useRef } from "react";

export default function AnimatedCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot  = dotRef.current!;
    const ring = ringRef.current!;
    let tx = -200, ty = -200;   // target (mouse)
    let rx = -200, ry = -200;   // ring (lagged)
    let raf: number;
    let big = false;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX; ty = e.clientY;
      dot.style.transform = `translate(${tx - 4}px,${ty - 4}px)`;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const loop = () => {
      rx = lerp(rx, tx, 0.09);
      ry = lerp(ry, ty, 0.09);
      ring.style.transform = `translate(${rx - (big?30:20)}px,${ry - (big?30:20)}px)`;
      raf = requestAnimationFrame(loop);
    };

    const grow = () => {
      big = true;
      ring.style.width  = ring.style.height = "60px";
      ring.style.borderColor = "rgba(184,255,87,0.9)";
      ring.style.background  = "rgba(184,255,87,0.06)";
    };
    const shrink = () => {
      big = false;
      ring.style.width  = ring.style.height = "40px";
      ring.style.borderColor = "rgba(184,255,87,0.35)";
      ring.style.background  = "transparent";
    };

    document.querySelectorAll("a,button,[data-cursor]").forEach(el => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });

    window.addEventListener("mousemove", onMove);
    loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", onMove); };
  }, []);

  return (
    <>
      <div ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-[#b8ff57]"
        style={{ willChange:"transform" }}
      />
      <div ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-10 w-10 rounded-full border"
        style={{ borderColor:"rgba(184,255,87,0.35)", transition:"width .25s,height .25s,border-color .25s,background .25s", willChange:"transform" }}
      />
    </>
  );
}
