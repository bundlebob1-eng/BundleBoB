import { useEffect, useRef } from 'react'
import { scroll } from '../scene/progress'

/** Thin hi-vis line pinned to the right edge. */
export function ProgressLine() {
  const bar = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let raf = 0
    const loop = () => {
      if (bar.current) bar.current.style.transform = `scaleY(${scroll.current})`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])
  return (
    <div
      aria-hidden="true"
      className="fixed right-0 top-0 z-20 h-screen w-[2px] bg-ink/10"
    >
      <div ref={bar} className="h-full w-full origin-top bg-hivis" style={{ transform: 'scaleY(0)' }} />
    </div>
  )
}
