"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Pending from "@/components/Pending";

export default function Hero3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* ── particle sphere on Canvas 2D ── */
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let W = (canvas.width = canvas.offsetWidth);
    let H = (canvas.height = canvas.offsetHeight);
    let raf: number;

    const N = 180;
    type Pt = { theta: number; phi: number; x: number; y: number; z: number };
    const pts: Pt[] = Array.from({ length: N }, (_, i) => {
      const theta = Math.acos(1 - (2 * (i + 0.5)) / N);
      const phi = Math.PI * (1 + Math.sqrt(5)) * i;
      return { theta, phi, x: 0, y: 0, z: 0 };
    });

    let rotX = 0,
      rotY = 0;
    let mouseX = 0,
      mouseY = 0;
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
      return { sx: W / 2 + x * scale, sy: H / 2 + y * scale, scale };
    };

    const draw = () => {
      t += 0.004;
      rotY += (mouseX * 0.012 - rotY) * 0.04;
      rotX += (-mouseY * 0.008 - rotX) * 0.04;

      ctx.clearRect(0, 0, W, H);

      const cosY = Math.cos(t + rotY),
        sinY = Math.sin(t + rotY);
      const cosX = Math.cos(rotX),
        sinX = Math.sin(rotX);

      const projected: Array<{ sx: number; sy: number; scale: number; z: number }> = [];

      pts.forEach((p) => {
        const sx = Math.sin(p.theta) * Math.cos(p.phi);
        const sy = Math.sin(p.theta) * Math.sin(p.phi);
        const sz = Math.cos(p.theta);
        const x1 = sx * cosY - sz * sinY;
        const z1 = sx * sinY + sz * cosY;
        const y2 = sy * cosX - z1 * sinX;
        const z2 = sy * sinX + z1 * cosX;
        const wx = x1 * R,
          wy = y2 * R,
          wz = z2 * R;
        p.x = wx;
        p.y = wy;
        p.z = wz;
        projected.push({ ...project(wx, wy, wz), z: wz });
      });

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dz = pts[i].z - pts[j].z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < R * 0.38) {
            const a = projected[i],
              b = projected[j];
            const opacity = (1 - dist / (R * 0.38)) * 0.18 * ((a.scale + b.scale) / 2);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(184,255,87,${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(a.sx, a.sy);
            ctx.lineTo(b.sx, b.sy);
            ctx.stroke();
          }
        }
      }

      projected.forEach(({ sx, sy, scale, z }) => {
        const brightness = (z + R) / (2 * R);
        const radius = Math.max(0.5, 1.8 * scale);
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

  return (
    <section id="home" className="relative overflow-hidden bg-[#040406]" style={{ minHeight: "100vh" }}>
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" style={{ opacity: 0.95 }} />

      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 700,
          height: 700,
          background: "radial-gradient(circle, rgba(184,255,87,0.05) 0%, transparent 65%)",
          animation: "floatOrb 7s ease-in-out infinite",
        }}
      />
      <div
        className="pointer-events-none absolute left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg,transparent,rgba(184,255,87,0.4),transparent)",
          animation: "scanLine 9s ease-in-out infinite",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container relative mx-auto px-4 pb-28 pt-[160px] lg:pt-[190px]">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* LEFT — copy */}
          <div>
            <div className="mb-8 flex items-center gap-3" style={{ animation: "heroFadeUp .8s ease both", animationDelay: ".1s" }}>
              <span className="h-px w-10 bg-[#b8ff57]" />
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#b8ff57]">
                Embedded engineer · commercial construction
              </span>
            </div>

            <h1 className="mb-8 font-syne font-extrabold leading-[0.98] tracking-[-0.04em] text-white" style={{ fontSize: "clamp(40px,6vw,76px)" }}>
              {["An engineer inside", "your construction", "business — not a tool"].map((line, i) => (
                <span key={i} className="block overflow-hidden">
                  <span
                    className="block"
                    style={{ animation: `heroSlideUp .9s cubic-bezier(.16,1,.3,1) both`, animationDelay: `${0.2 + i * 0.1}s` }}
                  >
                    {line}
                  </span>
                </span>
              ))}
              <span className="block overflow-hidden">
                <span
                  className="relative block text-[#b8ff57]"
                  style={{ animation: `heroSlideUp .9s cubic-bezier(.16,1,.3,1) both`, animationDelay: ".55s" }}
                >
                  you log into.
                  <span
                    className="absolute -bottom-2 left-0 h-[3px] w-full origin-left bg-[#b8ff57]"
                    style={{ animation: "lineExpand .8s cubic-bezier(.16,1,.3,1) both", animationDelay: ".95s" }}
                  />
                </span>
              </span>
            </h1>

            <p
              className="mb-6 max-w-[460px] text-[16px] leading-[1.85] text-gray-400"
              style={{ animation: "heroFadeUp .9s ease both", animationDelay: ".65s" }}
            >
              We place one person in your firm to connect Procore, Sage, Foundation,
              QuickBooks, and your spreadsheets — then build the layer on top that
              shows where your margin is leaking. Capture, then Control, then
              Intelligence, in that order.
            </p>
            <p
              className="mb-10 max-w-[460px] text-[16px] leading-[1.85] text-gray-400"
              style={{ animation: "heroFadeUp .9s ease both", animationDelay: ".75s" }}
            >
              You are adding a data engineer who understands job costing to your
              headcount budget. You are not buying another piece of software.
            </p>

            <div className="flex flex-wrap items-center gap-4" style={{ animation: "heroFadeUp .9s ease both", animationDelay: ".85s" }}>
              <Link
                href="/contact"
                className="btn-shine group relative inline-flex items-center gap-2 bg-[#b8ff57] px-8 py-4 font-mono text-[12px] font-bold uppercase tracking-widest text-black transition hover:shadow-[0_0_50px_rgba(184,255,87,0.4)]"
              >
                Talk to us about an engagement →
              </Link>
              <Link
                href="/how-it-works"
                className="group flex items-center gap-2 border border-white/10 px-7 py-4 font-mono text-[12px] font-semibold text-white transition hover:border-[#b8ff57]/40 hover:text-[#b8ff57]"
              >
                How it works
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-6" style={{ animation: "heroFadeUp .9s ease both", animationDelay: ".95s" }}>
              {["Advisory, not autonomous", "Numbers trace to source", "Mid-market GCs only"].map((t) => (
                <span key={t} className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wide text-gray-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#b8ff57]/50" />
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT — arc cards */}
          <div className="relative hidden lg:block" style={{ height: 480, perspective: 1200 }}>
            {[
              { label: "Capture", sub: "Procore · Sage · field · spreadsheets", top: "0%", left: "6%", delay: "0s", z: "rotateY(-12deg) rotateX(6deg)" },
              { label: "Control", sub: "job cost · labour · subs · cash · retainage", top: "24%", left: "40%", delay: ".15s", z: "rotateY(8deg) rotateX(-4deg)" },
              { label: "Intelligence", sub: "plain-English answers · margin-leak alerts", top: "52%", left: "4%", delay: ".3s", z: "rotateY(-8deg) rotateX(5deg)" },
              { label: "A person approves", sub: "nothing sent, moved, or changed on its own", top: "70%", left: "42%", delay: ".45s", z: "rotateY(12deg) rotateX(-6deg)" },
            ].map((c, i) => (
              <div
                key={i}
                className="absolute w-56 border border-white/[0.08] bg-[#07070a]/90 p-5 backdrop-blur-sm"
                style={{
                  top: c.top,
                  left: c.left,
                  transform: c.z,
                  animation: `heroFadeUp 1s ease both`,
                  animationDelay: c.delay,
                  boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                }}
              >
                <div className="mb-3 flex h-8 w-8 items-center justify-center border border-[#b8ff57]/30 bg-[#b8ff57]/10 font-mono text-[11px] font-bold text-[#b8ff57]">
                  {i < 3 ? String(i + 1).padStart(2, "0") : "→"}
                </div>
                <div className="font-syne text-[14px] font-bold text-white">{c.label}</div>
                <div className="mt-1 font-mono text-[10px] leading-relaxed text-gray-500">{c.sub}</div>
                <div className="mt-3 h-px w-full bg-gradient-to-r from-[#b8ff57]/30 to-transparent" />
              </div>
            ))}
          </div>
        </div>

        {/* Honest stage line — no fabricated stats */}
        <div id="hero-stats" className="mt-24 border border-white/[0.07] p-7" data-reveal>
          <div className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-gray-500">Where we are right now</div>
          <div className="mt-3 max-w-[720px]">
            <Pending block>
              honest one-line statement of current stage — e.g. &ldquo;running our
              first pilot with a mid-market GC in the Southwest&rdquo;, or
              &ldquo;pre-pilot; the founder is doing this work directly with two
              firms&rdquo;. No client count or result until one is real and named.
            </Pending>
          </div>
        </div>
      </div>
    </section>
  );
}
