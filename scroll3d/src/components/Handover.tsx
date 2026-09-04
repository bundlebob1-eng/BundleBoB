/**
 * BEAT 6 — the page ends on flat, ordinary HTML. Landing on a normal document
 * after 700vh of scrubbed 3D is what makes the 3D read as deliberate rather
 * than as a gimmick you have to sit through.
 *
 * NOTE: testimonial and client content below is PLACEHOLDER. Replace with
 * approved copy before this goes anywhere near production.
 */
const TESTIMONIALS = [
  {
    quote:
      'Placeholder testimonial — replace with approved client copy before launch.',
    name: 'Client name',
    role: 'Role, Company',
  },
  {
    quote:
      'Placeholder testimonial — replace with approved client copy before launch.',
    name: 'Client name',
    role: 'Role, Company',
  },
  {
    quote:
      'Placeholder testimonial — replace with approved client copy before launch.',
    name: 'Client name',
    role: 'Role, Company',
  },
]

const CLIENTS = ['Client 01', 'Client 02', 'Client 03', 'Client 04', 'Client 05', 'Client 06']

export function Handover() {
  return (
    <div className="relative z-10 bg-white">
      <section className="mx-auto max-w-6xl px-6 py-28 md:px-10 md:py-40">
        <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.24em] text-ink/50">
          Handover
        </p>
        <h2 className="max-w-4xl font-display text-[10vw] uppercase leading-[0.88] tracking-[-0.02em] text-ink md:text-[5.4vw]">
          Trusted by builders across the Northwest
        </h2>

        <ul className="mt-20 grid gap-10 border-t border-ink/10 pt-14 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <li key={i}>
              <blockquote className="font-body text-lg leading-relaxed text-ink/80">
                {t.quote}
              </blockquote>
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50">
                {t.name} · {t.role}
              </p>
            </li>
          ))}
        </ul>

        <ul className="mt-24 grid grid-cols-2 gap-px border border-ink/10 bg-ink/10 md:grid-cols-6">
          {CLIENTS.map((c) => (
            <li
              key={c}
              className="flex h-24 items-center justify-center bg-white font-mono text-[10px] uppercase tracking-[0.2em] text-ink/35"
            >
              {c}
            </li>
          ))}
        </ul>

        <div className="mt-24 flex flex-wrap items-center gap-5 border-t border-ink/10 pt-14">
          <a
            href="#contact"
            className="pointer-events-auto bg-ink px-9 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-hivis hover:text-ink"
          >
            Start a conversation
          </a>
          <a
            href="#capabilities"
            className="pointer-events-auto border border-ink/20 px-9 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink transition-colors hover:border-ink"
          >
            Capability statement
          </a>
        </div>
      </section>

      <footer id="contact" className="border-t border-ink/10">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-4 md:px-10">
          <div>
            <p className="font-display text-2xl uppercase tracking-tight text-ink">
              Built to sequence
            </p>
            <p className="mt-3 font-body text-sm text-ink/55">
              Commercial general contractor. Placeholder company details.
            </p>
          </div>
          {[
            { h: 'Sectors', items: ['Healthcare', 'Advanced manufacturing', 'Education', 'Multifamily'] },
            { h: 'Services', items: ['Preconstruction', 'Self-perform concrete', 'Steel erection', 'Design-build'] },
            { h: 'Company', items: ['About', 'Careers', 'Safety', 'Contact'] },
          ].map((col) => (
            <nav key={col.h} aria-label={col.h}>
              <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45">
                {col.h}
              </h3>
              <ul className="mt-4 space-y-2">
                {col.items.map((i) => (
                  <li key={i}>
                    <a
                      href="#contact"
                      className="pointer-events-auto font-body text-sm text-ink/70 transition-colors hover:text-ink"
                    >
                      {i}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mx-auto max-w-6xl px-6 pb-14 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/35 md:px-10">
          Placeholder site · grey-box build · not for production use
        </div>
      </footer>
    </div>
  )
}
