import { useEffect, type RefObject } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { scroll, emit } from '../scene/progress'

gsap.registerPlugin(ScrollTrigger)

/**
 * Lenis smooths the wheel; ScrollTrigger turns scroll over the spacer element
 * into a single normalised 0..1 that everything else reads.
 *
 * There is deliberately no scroll-jacking and no snapping — the user keeps
 * control of the scroll bar, we only decide what that scroll bar means. The
 * scrub covers the spacer only, so the flat handover section below it scrolls
 * like an ordinary page.
 */
export function useScrollProgress(enabled: boolean, trigger: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!enabled || !trigger.current) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
    })

    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    const st = ScrollTrigger.create({
      trigger: trigger.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        scroll.target = self.progress
      },
    })

    // Velocity comes off the raw target, not the damped value, so the HUD
    // reacts to a flick immediately instead of trailing the camera.
    let last = scroll.target
    let lastT = performance.now()
    let raf = 0
    const measure = () => {
      const now = performance.now()
      const dt = Math.max((now - lastT) / 1000, 1 / 240)
      const v = (scroll.target - last) / dt
      scroll.velocity += (v - scroll.velocity) * 0.12
      last = scroll.target
      lastT = now
      emit(scroll.target)
      raf = requestAnimationFrame(measure)
    }
    raf = requestAnimationFrame(measure)

    ScrollTrigger.refresh()

    return () => {
      cancelAnimationFrame(raf)
      st.kill()
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [enabled, trigger])
}
