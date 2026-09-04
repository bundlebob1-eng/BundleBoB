import { useProgress } from '@react-three/drei'
import { useEffect, useState } from 'react'
import { scroll } from '../scene/progress'

/**
 * Real percentage, not a spinner. The first frame the visitor sees must be the
 * finished first shot, so we hold until drei reports 100 and then give the
 * renderer one extra frame to present.
 */
export function Loader() {
  const { progress, active } = useProgress()
  const [gone, setGone] = useState(false)

  useEffect(() => {
    if (!active && progress >= 100) {
      const t = setTimeout(() => {
        scroll.ready = true
        setGone(true)
      }, 420)
      return () => clearTimeout(t)
    }
  }, [active, progress])

  return (
    <div
      className="fixed inset-0 z-40 flex items-end justify-between bg-white px-8 pb-8 transition-opacity duration-700 md:px-14 md:pb-14"
      style={{ opacity: gone ? 0 : 1, pointerEvents: gone ? 'none' : 'auto' }}
      aria-hidden={gone}
      role="status"
      aria-live="polite"
    >
      <p className="font-display text-[12vw] uppercase leading-none tracking-tight text-ink md:text-[7vw]">
        Built to
        <br />
        sequence
      </p>
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/60">
        {Math.round(progress)}%
      </p>
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-ink/10">
        <div
          className="h-full origin-left bg-hivis transition-transform duration-200"
          style={{ transform: `scaleX(${progress / 100})` }}
        />
      </div>
    </div>
  )
}
