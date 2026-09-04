import { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { Scene } from '../scene/Scene'
import { SCROLL_VH, BEATS } from '../scene/beats'
import { scroll } from '../scene/progress'
import { useScrollProgress } from '../hooks/useScrollProgress'
import { Overlay } from './Overlay'
import { Hud } from './Hud'
import { ProgressLine } from './ProgressLine'
import { Cursor } from './Cursor'
import { SoundToggle } from './SoundToggle'
import { Loader } from './Loader'
import { Handover } from './Handover'

/**
 * The WebGL path. Lives behind a dynamic import in App.tsx so that the static
 * path — mobile, reduced-motion, no-WebGL — never downloads three.js at all.
 */
export default function Scrubbed() {
  const spacer = useRef<HTMLDivElement>(null)
  const canvasWrap = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useScrollProgress(true, spacer)
  useEffect(() => setMounted(true), [])

  // Fade the 3D out as the flat handover section arrives.
  useEffect(() => {
    let raf = 0
    const loop = () => {
      if (canvasWrap.current) {
        const p = scroll.current
        canvasWrap.current.style.opacity = String(1 - Math.max(0, (p - 0.955) / 0.045))
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <>
      <div ref={canvasWrap} data-canvas-hint className="fixed inset-0 z-0" aria-hidden="true">
        <Canvas
          shadows
          // Capped for the 60fps-on-a-2021-Air budget; AdaptiveDpr drops it
          // further under load.
          dpr={[1, 1.75]}
          gl={{
            antialias: true,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            // Clamped so the white void never blows out or goes grey.
            toneMappingExposure: 1.0,
          }}
          camera={{
            fov: BEATS[0].camera.fov,
            near: 0.5,
            far: 400,
            position: BEATS[0].camera.position,
          }}
        >
          <Scene />
        </Canvas>
      </div>

      <Overlay />
      <Hud />
      <ProgressLine />
      <Cursor />
      <SoundToggle />
      {mounted && <Loader />}

      {/* The scrub spacer. Everything above is fixed; this is what actually
          scrolls, and ScrollTrigger measures it. */}
      <div ref={spacer} style={{ height: `${SCROLL_VH}vh` }} aria-hidden="true" />

      {/* Ordinary document flow resumes here. */}
      <Handover />
    </>
  )
}
