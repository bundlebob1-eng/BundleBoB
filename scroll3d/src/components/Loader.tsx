import { useProgress } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import { scroll } from '../scene/progress'

/** Nothing may keep the page behind the loader longer than this, ever. */
const FAILSAFE_MS = 4000
/** Don't flash — hold briefly even when readiness is instant. */
const MIN_SHOW_MS = 650

/**
 * Real percentage, not a spinner. The first frame the visitor sees must be the
 * finished first shot.
 *
 * What we wait on depends on what there is to wait for:
 *   - `total > 0`  — real assets registered with THREE.DefaultLoadingManager,
 *     so drei's useProgress is meaningful; wait for it.
 *   - `total === 0` — the scene is entirely procedural (this is the current
 *     grey-box state), the loading manager never fires and useProgress sits at
 *     0 forever. Wait on rendered frames instead, via ReadySignal.
 *
 * Plus an unconditional failsafe: whatever happens, the loader dismisses. A
 * loading screen that can hang is worse than no loading screen.
 */
export function Loader() {
  const { progress, active, total } = useProgress()
  const [gone, setGone] = useState(false)
  const [shown, setShown] = useState(0)
  const mounted = useRef(performance.now())

  // Failsafe — independent of every other condition.
  useEffect(() => {
    const t = setTimeout(() => {
      scroll.ready = true
      setGone(true)
    }, FAILSAFE_MS)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    let raf = 0
    let value = 0
    const loop = () => {
      const assetsDone = total === 0 ? true : !active && progress >= 100
      const framesDone = scroll.ready

      // Target the real number when there are assets; otherwise let rendered
      // frames drive it, so the readout still means something.
      const target = total > 0 ? progress : framesDone ? 100 : 20
      value += (target - value) * 0.18
      setShown(value)

      if (assetsDone && framesDone && performance.now() - mounted.current > MIN_SHOW_MS) {
        setGone(true)
        return
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [active, progress, total])

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
        {Math.round(shown)}%
      </p>
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-ink/10">
        <div
          className="h-full origin-left bg-hivis"
          style={{ transform: `scaleX(${shown / 100})` }}
        />
      </div>
    </div>
  )
}
