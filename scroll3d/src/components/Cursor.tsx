import { useEffect, useRef, useState } from 'react'

/**
 * A small hollow ring that scales up over interactive elements and shows a
 * scroll hint over the canvas. Pointer-fine only — never on touch.
 */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null)
  const [hint, setHint] = useState(false)
  const [over, setOver] = useState(false)
  const [fine, setFine] = useState(false)

  useEffect(() => {
    setFine(window.matchMedia('(pointer: fine)').matches)
  }, [])

  useEffect(() => {
    if (!fine) return
    const pos = { x: innerWidth / 2, y: innerHeight / 2, tx: innerWidth / 2, ty: innerHeight / 2 }

    const onMove = (e: PointerEvent) => {
      pos.tx = e.clientX
      pos.ty = e.clientY
      const el = e.target as HTMLElement
      const interactive = !!el.closest('a,button,[role="button"],input,label')
      setOver(interactive)
      setHint(!interactive && !!el.closest('[data-canvas-hint]'))
    }
    addEventListener('pointermove', onMove, { passive: true })

    let raf = 0
    const loop = () => {
      pos.x += (pos.tx - pos.x) * 0.22
      pos.y += (pos.ty - pos.y) * 0.22
      if (ring.current) {
        ring.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [fine])

  if (!fine) return null

  return (
    <div
      ref={ring}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-50 hidden md:block"
    >
      <div
        className="flex items-center justify-center rounded-full border transition-all duration-200 ease-out"
        style={{
          width: over ? 52 : hint ? 68 : 22,
          height: over ? 52 : hint ? 68 : 22,
          borderColor: over ? '#FFB800' : 'rgba(16,18,21,0.45)',
          borderWidth: over ? 2 : 1,
        }}
      >
        {hint && (
          <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-ink/70">
            scroll
          </span>
        )}
      </div>
    </div>
  )
}
