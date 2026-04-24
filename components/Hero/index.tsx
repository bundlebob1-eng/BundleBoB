"use client";
import { useEffect, useRef } from "react";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  /* ── Three.js particle sphere ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    let W = (canvas.width = canvas.offsetWidth);
    let H = (canvas.height = canvas.offsetHeight);

    const PARTICLES = 120;
    type P = { x: number; y: number; z: number; vx: number; vy: number; size: number; opacity: number };
    const pts: P[] = Array.from({ length: PARTICLES }, () => ({
      x: (Math.random() - 0.5) * W * 1.8,
      y: (Math.random() - 0.5) * H * 1.8,
      z: Math.random() * 600 + 100,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.6 + 0.2,
    }));

    let mouseX = W / 2;
    let mouseY = H / 2;
    const onMouse = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };
    window.addEventListener("mousemove", onMouse);

    const project = (p: P) => {
      const fov = 500;
      const scale = fov / (fov + p.z);
      return { sx: W / 2 + p.x * scale, sy: H / 2 + p.y * scale, scale };
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const dx = (mouseX - W / 2) * 0.0003;
      const dy = (mouseY - H / 2) * 0.0003;

      pts.forEach(p => {
        p.x += p.vx + dx * p.z * 0.05;
        p.y += p.vy + dy * p.z * 0.05;
        p.z -= 0.4;
        if (p.z < 1) p.z = 700;
        if (p.x > W || p.x < -W) p.vx *= -1;
        if (p.y > H || p.y < -H) p.vy *= -1;
      });

      /* connections */
      for (let i = 0; i < pts.length; i++) {
        const a = project(pts[i]);
        for (let j = i + 1; j < pts.length; j++) {
          const b = project(pts[j]);
          const dist = Math.hypot(a.sx - b.sx, a.sy - b.sy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(184,255,87,${(1 - dist / 120) * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(a.sx, a.sy);
            ctx.lineTo(b.sx, b.sy);
            ctx.stroke();
          }
        }
      }

      /* dots */
      pts.forEach(p => {
        const { sx, sy, scale } = project(p);
        ctx.beginPath();
        ctx.arc(sx, sy, p.size * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(184,255,87,${p.opacity * scale})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  /* ── Scroll parallax ── */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const onScroll = () => {
      const y = window.scrollY;
      (hero.querySelector(".hero-headline") as HTMLElement).style.transform = `translateY(${y * 0.18}px)`;
      (hero.querySelector(".hero-sub") as HTMLElement).style.transform = `translateY(${y * 0.1}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Count-up ── */
  useEffect(() => {
    const targets = [
      { id: "c1", end: 50, suffix: "+" },
      { id: "c2", end: 98, suffix: "%" },
      { id: "c3", end: 4, suffix: "x" },
    ];
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      targets.forEach(({ id, end, suffix }) => {
        const el = document.getElementById(id);
        if (el) el.textContent = Math.round(ease * end) + suffix;
      });
      if (t < 1) requestAnimationFrame(tick);
    };
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { requestAnimationFrame(tick); obs.disconnect(); }
    }, { threshold: 0.3 });
    const el = document.getElementById("stats-row");
    if (el) obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative z-10 overflow-hidden bg-[#060608]"
      style={{ minHeight: "100vh" }}
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ opacity: 0.9 }}
      />

      {/* Radial glow centre */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 800, height: 800,
          background: "radial-gradient(circle, rgba(184,255,87,0.06) 0%, transparent 65%)",
        }}
      />

      {/* Horizontal scan line */}
      <div
        className="pointer-events-none absolute left-0 right-0"
        style={{
          height: 1,
          background: "linear-gradient(90deg,transparent,rgba(184,255,87,0.3),transparent)",
          animation: "scan 8s ease-in-out infinite",
          top: "40%",
        }}
      />

      <div className="container relative mx-auto px-4 pb-24 pt-[160px]">
        {/* Eyebrow */}
        <div
          className="hero-sub mb-8 flex items-center gap-3"
          style={{ animation: "fadeUp 0.8s ease both", animationDelay: "0.1s" }}
        >
          <span className="inline-block h-px w-12 bg-[#b8ff57]" />
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[#b8ff57]">
            Irving, Texas · AI Solutions Agency
          </span>
        </div>

        {/* Headline */}
        <h1
          className="hero-headline mb-8 font-extrabold leading-[0.92] tracking-[-0.04em] text-white"
          style={{
            fontSize: "clamp(52px,9vw,104px)",
            animation: "fadeUp 0.9s ease both",
            animationDelay: "0.2s",
          }}
        >
          <span className="block overflow-hidden">
            <span className="block" style={{ animation: "slideUp 0.9s cubic-bezier(0.16,1,0.3,1) both", animationDelay: "0.25s" }}>
              We Build
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="block text-[#b8ff57]" style={{ animation: "slideUp 0.9s cubic-bezier(0.16,1,0.3,1) both", animationDelay: "0.35s" }}>
              Apps, Websites
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="block" style={{ animation: "slideUp 0.9s cubic-bezier(0.16,1,0.3,1) both", animationDelay: "0.45s" }}>
              &amp; AI That
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="block" style={{ animation: "slideUp 0.9s cubic-bezier(0.16,1,0.3,1) both", animationDelay: "0.55s" }}>
              <span className="relative inline-block">
                Grows
                <span
                  className="absolute -bottom-2 left-0 h-[3px] w-full bg-[#b8ff57]"
                  style={{ animation: "expandX 0.8s cubic-bezier(0.16,1,0.3,1) both", animationDelay: "1s", transformOrigin: "left" }}
                />
              </span>{" "}
              Business.
            </span>
          </span>
        </h1>

        {/* Body */}
        <p
          className="hero-sub mb-12 max-w-[480px] text-[17px] leading-[1.8] text-gray-400"
          style={{ animation: "fadeUp 0.9s ease both", animationDelay: "0.6s" }}
        >
          BundleBOB delivers mobile apps, intelligent chatbots, and full business
          automation — powered by AI and built for companies ready to move fast.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-wrap items-center gap-4"
          style={{ animation: "fadeUp 0.9s ease both", animationDelay: "0.75s" }}
        >
          <a
            href="#contact"
            className="magnetic-btn group relative overflow-hidden bg-[#b8ff57] px-8 py-4 text-[13px] font-bold uppercase tracking-widest text-black transition-all hover:shadow-[0_0_40px_rgba(184,255,87,0.4)]"
          >
            <span className="relative z-10">Schedule Free AI Consultation →</span>
            <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0" />
          </a>
          <a
            href="#services"
            className="group flex items-center gap-2 border border-white/10 px-7 py-4 text-[13px] font-semibold text-white transition-all hover:border-[#b8ff57]/40"
          >
            Explore Services
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>

        {/* Stats */}
        <div
          id="stats-row"
          className="mt-20 grid grid-cols-3 border border-white/[0.08]"
          style={{ animation: "fadeUp 0.9s ease both", animationDelay: "0.9s" }}
        >
          {[
            { id: "c1", label: "Projects Delivered" },
            { id: "c2", label: "Client Satisfaction" },
            { id: "c3", label: "Avg. ROI for Clients" },
          ].map((s, i) => (
            <div
              key={i}
              className={`group px-6 py-10 transition-colors hover:bg-[#b8ff57]/5 ${i < 2 ? "border-r border-white/[0.08]" : ""}`}
            >
              <div
                id={s.id}
                className="font-extrabold leading-none tracking-[-0.04em] text-[#b8ff57]"
                style={{ fontSize: "clamp(36px,5vw,60px)" }}
              >
                0
              </div>
              <div className="mt-2 text-[11px] font-medium uppercase tracking-[0.12em] text-gray-500">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
