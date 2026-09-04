import { useEffect, useRef } from 'react'
import { ALL_PANELS, BEATS } from '../scene/beats'
import { scroll } from '../scene/progress'
import { fadeWindow, lerp } from '../lib/math'

/**
 * The 2D layer. Every headline and every panel is REAL HTML in the DOM at all
 * times, in correct heading order — the 3D is decoration. Only opacity and
 * transform are touched, from one rAF loop, so nothing here re-renders.
 *
 * The whole layer is pointer-events-none; individual controls opt back in.
 */
export function Overlay() {
  const refs = useRef<Map<string, HTMLElement>>(new Map())
  const set = (k: string) => (el: HTMLElement | null) => {
    if (el) refs.current.set(k, el)
    else refs.current.delete(k)
  }

  useEffect(() => {
    let raf = 0
    const loop = () => {
      const p = scroll.current

      // Beat headlines
      for (const b of BEATS) {
        const el = refs.current.get(`beat-${b.id}`)
        if (!el || !b.content.headline) continue
        const [a, z] = b.range
        const o = fadeWindow(p, a, z, 0.035)
        el.style.opacity = String(o)
        el.style.transform = `translate3d(0, ${lerp(28, 0, o)}px, 0)`
        el.style.visibility = o < 0.01 ? 'hidden' : 'visible'
      }

      // Sliding panels
      for (const panel of ALL_PANELS) {
        const el = refs.current.get(`panel-${panel.key}`)
        if (!el) continue
        const [a, z] = panel.global
        const o = fadeWindow(p, a, z, 0.02)
        const dir = panel.side === 'left' ? -1 : 1
        el.style.opacity = String(o)
        el.style.transform = `translate3d(${lerp(60 * dir, 0, o)}px, 0, 0)`
        el.style.visibility = o < 0.01 ? 'hidden' : 'visible'
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-10">
      {BEATS.filter((b) => b.content.headline).map((b, i) => {
        // First headline on the page is the h1; the rest are h2. Heading order
        // has to survive the fact that these are absolutely positioned.
        const Heading = (i === 0 ? 'h1' : 'h2') as 'h1' | 'h2'
        return (
        <section
          key={b.id}
          ref={set(`beat-${b.id}`)}
          aria-label={b.label}
          className={[
            'absolute inset-x-0 top-1/2 -translate-y-1/2 px-6 md:px-14',
            b.content.align === 'right' ? 'text-right' : '',
            b.content.align === 'center' ? 'text-center' : '',
          ].join(' ')}
          style={{ opacity: 0, visibility: 'hidden' }}
        >
          <div
            className={[
              'max-w-xl',
              b.content.align === 'right' ? 'ml-auto' : '',
              b.content.align === 'center' ? 'mx-auto' : '',
            ].join(' ')}
          >
            {b.content.eyebrow && (
              <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.24em] text-ink/55">
                {b.content.eyebrow}
              </p>
            )}
            <Heading className="font-display text-[13vw] uppercase leading-[0.86] tracking-[-0.02em] text-ink md:text-[8vw]">
              {b.content.headline}
            </Heading>
            {b.content.sub && (
              <p className="mt-6 max-w-md font-body text-base leading-relaxed text-ink/70 md:text-lg">
                {b.content.sub}
              </p>
            )}
          </div>
        </section>
        )
      })}

      {ALL_PANELS.map((panel) => (
        <article
          key={panel.key}
          ref={set(`panel-${panel.key}`)}
          className={[
            'absolute top-1/2 w-[min(30rem,32vw)] -translate-y-1/2 bg-white p-10',
            panel.side === 'left' ? 'left-6 md:left-14' : 'right-6 md:right-14',
          ].join(' ')}
          style={{ opacity: 0, visibility: 'hidden' }}
        >
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.24em] text-hivis">
            {panel.eyebrow}
          </p>
          <h3 className="font-display text-3xl uppercase leading-none tracking-tight text-ink">
            {panel.heading}
          </h3>
          {panel.body.map((line, i) => (
            <p key={i} className="mt-4 font-body text-[15px] leading-relaxed text-ink/70">
              {line}
            </p>
          ))}
        </article>
      ))}
    </div>
  )
}
