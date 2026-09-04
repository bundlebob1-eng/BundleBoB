import { BEATS } from '../scene/beats'
import { Handover } from './Handover'

/**
 * The no-3D path. Used for prefers-reduced-motion, for viewports under 768px,
 * and when WebGL cannot be initialised.
 *
 * It is not a degraded version of the scrub — it is an ordinary stacked page
 * carrying exactly the same text, in the same order, from the same beats.ts.
 * That is also what a crawler and a screen reader get.
 *
 * To use the pre-rendered image-sequence variant on mobile instead, drop 60
 * WebP frames into /public/seq and scrub them here — see README.md.
 */
export function StaticSite({ reason }: { reason: 'reduced-motion' | 'mobile' | 'no-webgl' }) {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-6 pb-24 pt-32 md:px-10 md:pt-44">
        <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.24em] text-ink/50">
          {BEATS[0].content.eyebrow}
        </p>
        <h1 className="font-display text-[16vw] uppercase leading-[0.86] tracking-[-0.02em] text-ink md:text-[9vw]">
          {BEATS[0].content.headline}
        </h1>
        <p className="mt-8 max-w-xl font-body text-lg leading-relaxed text-ink/70">
          {BEATS[0].content.sub}
        </p>
      </section>

      {BEATS.slice(1).map((b) => {
        const panels = b.content.panels ?? []
        if (!b.content.headline && panels.length === 0) return null
        return (
          <section
            key={b.id}
            aria-label={b.label}
            className="mx-auto max-w-6xl border-t border-ink/10 px-6 py-20 md:px-10 md:py-28"
          >
            {b.content.headline && (
              <>
                <h2 className="max-w-3xl font-display text-[11vw] uppercase leading-[0.9] tracking-tight text-ink md:text-[5vw]">
                  {b.content.headline}
                </h2>
                {b.content.sub && (
                  <p className="mt-6 max-w-xl font-body text-lg leading-relaxed text-ink/70">
                    {b.content.sub}
                  </p>
                )}
              </>
            )}
            {panels.length > 0 && (
              <div className="grid gap-12 md:grid-cols-2">
                {panels.map((p, i) => (
                  <article key={i}>
                    <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.24em] text-hivis">
                      {p.eyebrow}
                    </p>
                    <h3 className="font-display text-3xl uppercase leading-none tracking-tight text-ink">
                      {p.heading}
                    </h3>
                    {p.body.map((line, j) => (
                      <p key={j} className="mt-4 font-body text-[15px] leading-relaxed text-ink/70">
                        {line}
                      </p>
                    ))}
                  </article>
                ))}
              </div>
            )}
          </section>
        )
      })}

      <Handover />
      <p className="sr-only">Static layout served: {reason}.</p>
    </main>
  )
}
