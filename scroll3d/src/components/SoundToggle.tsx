import { useCallback, useEffect, useRef, useState } from 'react'
import { ALL_PANELS } from '../scene/beats'
import { scroll } from '../scene/progress'
import { fadeWindow } from '../lib/math'

/**
 * Ambient site noise, off by default.
 *
 * Grey-box: the bed is generated with WebAudio (filtered brown noise plus a
 * low rumble) so there is no audio asset to ship yet. Replace with a real
 * site recording — see MODELS.md. Ducks while a content panel is open.
 */
export function SoundToggle() {
  const [on, setOn] = useState(false)
  const ctx = useRef<AudioContext | null>(null)
  const gain = useRef<GainNode | null>(null)

  const start = useCallback(() => {
    const AC = window.AudioContext || (window as any).webkitAudioContext
    if (!AC) return
    const c: AudioContext = new AC()
    const bufferSize = 2 * c.sampleRate
    const buf = c.createBuffer(1, bufferSize, c.sampleRate)
    const data = buf.getChannelData(0)
    let lastOut = 0
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1
      // brown noise — closer to plant/wind than white hiss
      data[i] = (lastOut + 0.02 * white) / 1.02
      lastOut = data[i]
      data[i] *= 3.2
    }
    const src = c.createBufferSource()
    src.buffer = buf
    src.loop = true

    const lp = c.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 640

    const g = c.createGain()
    g.gain.value = 0.0001

    src.connect(lp).connect(g).connect(c.destination)
    src.start()

    ctx.current = c
    gain.current = g
  }, [])

  const toggle = () => {
    if (!on) {
      if (!ctx.current) start()
      ctx.current?.resume()
    }
    setOn((v) => !v)
  }

  useEffect(() => {
    let raf = 0
    const loop = () => {
      if (gain.current && ctx.current) {
        const p = scroll.current
        // duck while any panel is open
        const panelOpen = ALL_PANELS.some(
          (pan) => fadeWindow(p, pan.global[0], pan.global[1], 0.02) > 0.35
        )
        const target = on ? (panelOpen ? 0.02 : 0.075) : 0.0001
        gain.current.gain.setTargetAtTime(target, ctx.current.currentTime, 0.35)
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [on])

  useEffect(() => () => void ctx.current?.close(), [])

  return (
    <button
      onClick={toggle}
      aria-pressed={on}
      className="pointer-events-auto fixed bottom-6 right-8 z-30 flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/70 transition-colors hover:text-ink md:bottom-10 md:right-14"
    >
      <span
        className="block h-2 w-2 rounded-full transition-colors"
        style={{ background: on ? '#FFB800' : 'rgba(16,18,21,0.25)' }}
      />
      Sound {on ? 'on' : 'off'}
    </button>
  )
}
