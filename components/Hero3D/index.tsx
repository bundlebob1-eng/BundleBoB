"use client";
import { useEffect, useRef } from "react";

export default function Hero3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* ── WebGL-style particle sphere on Canvas 2D ── */
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext("2d")!;
    let W = canvas.width  = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;
    let raf: number;

    /* Build sphere of points */
    const N = 180;
    type Pt = { theta: number; phi: number; x: number; y: number; z: number };
    const pts: Pt[] = Array.from({ length: N }, (_, i) => {
      const theta = Math.acos(1 - (2 * (i + 0.5)) / N);
      const phi   = Math.PI * (1 + Math.sqrt(5)) * i;
      return { theta, phi, x: 0, y: 0, z: 0 };
    });

    let rotX = 0, rotY = 0;
    let mouseX = 0, mouseY = 0;
    let t = 0;

    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / W - 0.5) * 2;
      mouseY = (e.clientY / H - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse);

    const R = Math.min(W, H) * 0.28;
    const FOV = 900;

    const project = (x: number, y: number, z: number) => {
      const scale = FOV / (FOV + z + R);
      return {
        sx: W / 2 + x * scale,
        sy: H / 2 + y * scale,
        scale,
      };
    };

    const draw = () => {
      t += 0.004;
      rotY += (mouseX * 0.012 - rotY) * 0.04;
      rotX += (-mouseY * 0.008 - rotX) * 0.04;

      ctx.clearRect(0, 0, W, H);

      const cosY = Math.cos(t + rotY), sinY = Math.sin(t + rotY);
      const cosX = Math.cos(rotX),     sinX = Math.sin(rotX);

      const projected: Array<{ sx: number; sy: number; scale: number; z: number }> = [];

      pts.forEach(p => {
        const sx = Math.sin(p.theta) * Math.cos(p.phi);
        const sy = Math.sin(p.theta) * Math.sin(p.phi);
        const sz = Math.cos(p.theta);
        // rotate Y
        const x1 = sx * cosY - sz * sinY;
        const z1 = sx * sinY + sz * cosY;
        // rotate X
        const y2 = sy * cosX - z1 * sinX;
        const z2 = sy * sinX + z1 * cosX;
        const wx = x1 * R, wy = y2 * R, wz = z2 * R;
        p.x = wx; p.y = wy; p.z = wz;
        projected.push({ ...project(wx, wy, wz), z: wz });
      });

      /* Draw connections */
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dz = pts[i].z - pts[j].z;
          const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
          if (dist < R * 0.38) {
            const a = projected[i], b = projected[j];
            const opacity = (1 - dist / (R * 0.38)) * 0.18 * ((a.scale + b.scale) / 2);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(184,255,87,${opacity})`;
            ctx.lineWidth   = 0.6;
            ctx.moveTo(a.sx, a.sy);
            ctx.lineTo(b.sx, b.sy);
            ctx.stroke();
          }
        }
      }

      /* Draw dots */
      projected.forEach(({ sx, sy, scale, z }) => {
        const brightness = (z + R) / (2 * R);
        const radius  = Math.max(0.5, 1.8 * scale);
        const opacity = 0.3 + brightness * 0.6;
        ctx.beginPath();
        ctx.arc(sx, sy, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(184,255,87,${opacity})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  /* ── Count-up ── */
  useEffect(() => {
    const items = [
      { id:"ct1", end:50,  suffix:"+" },
      { id:"ct2", end:98,  suffix:"%" },
      { id:"ct3", end:4,   suffix:"x" },
      { id:"ct4", end:24,  suffix:"h" },
    ];
    const dur = 2000;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        items.forEach(({ id, end, suffix }) => {
          const el = document.getElementById(id);
          if (el) el.textContent = Math.round(ease * end) + suffix;
        });
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      obs.disconnect();
    }, { threshold: 0.3 });
    const el = document.getElementById("hero-stats");
    if (el) obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="home" className="relative overflow-hidden bg-[#040406]" style={{ minHeight:"100vh" }}>

      {/* Canvas sphere */}
      <canvas ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ opacity:0.95 }}
      />

      {/* Deep space glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ width:700, height:700, background:"radial-gradient(circle, rgba(184,255,87,0.05) 0%, transparent 65%)", animation:"floatOrb 7s ease-in-out infinite" }} />

      {/* Scanning line */}
      <div className="pointer-events-none absolute left-0 right-0 h-px"
        style={{ background:"linear-gradient(90deg,transparent,rgba(184,255,87,0.4),transparent)", animation:"scanLine 9s ease-in-out infinite" }} />

      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0"
        style={{ backgroundImage:"linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)", backgroundSize:"60px 60px" }} />

      <div className="container relative mx-auto px-4 pb-28 pt-[160px] lg:pt-[180px]">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">

          {/* LEFT — copy */}
          <div>
            {/* Eyebrow */}
            <div className="mb-8 flex items-center gap-3" style={{ animation:"heroFadeUp .8s ease both", animationDelay:".1s" }}>
              <span className="h-px w-10 bg-[#b8ff57]" />
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#b8ff57]">
                Irving, Texas · AI Solutions Agency
              </span>
            </div>

            {/* Headline */}
            <h1 className="mb-8 font-extrabold leading-[0.93] tracking-[-0.04em] text-white"
              style={{ fontSize:"clamp(48px,7.5vw,96px)" }}>
              {["We Build", "Apps &", "Websites", "Powered by"].map((line, i) => (
                <span key={i} className="block overflow-hidden">
                  <span className="block" style={{ animation:`heroSlideUp .9s cubic-bezier(.16,1,.3,1) both`, animationDelay:`${.2+i*.1}s` }}>
                    {line}
                  </span>
                </span>
              ))}
              <span className="block overflow-hidden">
                <span className="relative block text-[#b8ff57]" style={{ animation:`heroSlideUp .9s cubic-bezier(.16,1,.3,1) both`, animationDelay:".6s" }}>
                  Real AI.
                  <span className="absolute -bottom-2 left-0 h-[3px] w-full origin-left bg-[#b8ff57]"
                    style={{ animation:"lineExpand .8s cubic-bezier(.16,1,.3,1) both", animationDelay:"1s" }} />
                </span>
              </span>
            </h1>

            <p className="mb-12 max-w-[440px] text-[16px] leading-[1.85] text-gray-400"
              style={{ animation:"heroFadeUp .9s ease both", animationDelay:".65s" }}>
              BundleBOB delivers mobile apps, intelligent chatbots, and full business
              automation — built for companies ready to win in the AI era.
            </p>

            <div className="flex flex-wrap items-center gap-4"
              style={{ animation:"heroFadeUp .9s ease both", animationDelay:".8s" }}>
              <a href="/contact"
                className="btn-shine group relative inline-flex items-center gap-2 bg-[#b8ff57] px-8 py-4 font-mono text-[12px] font-bold uppercase tracking-widest text-black transition hover:shadow-[0_0_50px_rgba(184,255,87,0.4)]">
                Schedule Free Consultation →
              </a>
              <a href="/services"
                className="group flex items-center gap-2 border border-white/10 px-7 py-4 font-mono text-[12px] font-semibold text-white transition hover:border-[#b8ff57]/40 hover:text-[#b8ff57]">
                Explore Services
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>

            {/* Trust row */}
            <div className="mt-8 flex flex-wrap gap-6" style={{ animation:"heroFadeUp .9s ease both", animationDelay:".95s" }}>
              {["US-Registered LLC","Fixed-scope pricing","NDA on request","Irving, TX"].map(t => (
                <span key={t} className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wide text-gray-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#b8ff57]/50" />{t}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT — 3D floating cards */}
          <div className="relative hidden lg:block" style={{ height:480, perspective:1200 }}>
            {[
              { label:"Mobile Apps",      sub:"iOS & Android",         top:"0%",   left:"5%",   delay:"0s",   z:"rotateY(-12deg) rotateX(6deg)" },
              { label:"AI Chatbots",       sub:"WhatsApp · Web · Slack", top:"15%",  left:"42%",  delay:".15s", z:"rotateY(8deg) rotateX(-4deg)" },
              { label:"Business Automation",sub:"n8n · Zapier · Make", top:"52%",  left:"0%",   delay:".3s",  z:"rotateY(-8deg) rotateX(5deg)" },
              { label:"AI Solutions",      sub:"OpenAI · LangChain",    top:"55%",  left:"45%",  delay:".45s", z:"rotateY(12deg) rotateX(-6deg)" },
            ].map((c,i) => (
              <div key={i} className="absolute w-52 border border-white/[0.08] bg-[#07070a]/90 p-5 backdrop-blur-sm"
                style={{ top:c.top, left:c.left, transform:c.z, animation:`heroFadeUp 1s ease both`, animationDelay:c.delay, boxShadow:"0 20px 60px rgba(0,0,0,0.5)" }}>
                <div className="mb-3 h-8 w-8 border border-[#b8ff57]/30 bg-[#b8ff57]/10 flex items-center justify-center font-mono text-[11px] font-bold text-[#b8ff57]">
                  {String(i+1).padStart(2,"0")}
                </div>
                <div className="text-[13px] font-bold text-white">{c.label}</div>
                <div className="mt-1 font-mono text-[10px] text-gray-500">{c.sub}</div>
                <div className="mt-3 h-px w-full bg-gradient-to-r from-[#b8ff57]/30 to-transparent" />
              </div>
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <div id="hero-stats" className="mt-24 grid grid-cols-2 border border-white/[0.07] sm:grid-cols-4">
          {[
            { id:"ct1", label:"Projects Delivered",  sub:"Apps, websites & AI systems" },
            { id:"ct2", label:"Client Satisfaction",  sub:"Across every engagement" },
            { id:"ct3", label:"Avg. Client ROI",      sub:"Revenue impact, year one" },
            { id:"ct4", label:"Hour Response",        sub:"On all support requests" },
          ].map((s,i) => (
            <div key={i} className={`group px-7 py-10 transition hover:bg-[#b8ff57]/[0.03] ${i<3?"border-r border-white/[0.07]":""}`}
              data-reveal data-delay={`${i*80}`}>
              <div id={s.id} className="font-extrabold leading-none tracking-[-0.04em] text-[#b8ff57]"
                style={{ fontSize:"clamp(34px,4.5vw,56px)" }}>0</div>
              <div className="mt-2 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-gray-500">{s.label}</div>
              <div className="mt-1 font-mono text-[10px] text-gray-600">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
