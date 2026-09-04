import { useEffect, useRef } from 'react'
import { scroll } from '../scene/progress'
import { fadeWindow } from '../lib/math'

/**
 * BEAT 3 — a live readout in the top-left corner. The number ticks off real
 * scroll velocity, not a fake loop: stop scrolling and it falls to zero.
 */
export function Hud() {
  const box = useRef<HTMLDivElement>(null)
  const kmh = useRef<HTMLSpanElement>(null)
  const dist = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let raf = 0
    let shown = 0
    const loop = () => {
      const p = scroll.current
      // Live for the haul and the arrival.
      const vis = fadeWindow(p, 0.28, 0.66, 0.03)
      if (box.current) box.current.style.opacity = String(vis)
      if (kmh.current) {
        // progress-units/sec -> a plausible haul speed, damped for legibility.
        const target = Math.min(Math.abs(scroll.velocity) * 620, 96)
        shown += (target - shown) * 0.14
        kmh.current.textContent = String(Math.round(shown)).padStart(2, '0')
      }
      if (dist.current) {
        dist.current.textContent = (p * 42).toFixed(1)
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div
      ref={box}
      aria-hidden="true"
      className="fixed left-6 top-6 z-20 font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-ink opacity-0 md:left-10 md:top-10"
    >
      <div className="flex items-baseline gap-1.5">
        <span ref={kmh} className="text-[26px] font-medium leading-none tracking-tight">
          00
        </span>
        <span className="text-hivis">km/h</span>
      </div>
      <div className="mt-2 h-px w-16 bg-ink/25" />
      <div className="mt-2 opacity-60">
        Haul <span ref={dist}>0.0</span> km
      </div>
      <div className="opacity-60">Load 14.2 t</div>
    </div>
  )
}
