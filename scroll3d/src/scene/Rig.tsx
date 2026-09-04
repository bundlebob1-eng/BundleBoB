import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { sampleCamera, sampleEnvironment, sampleFov } from './curve'
import { scroll } from './progress'
import { damp } from '../lib/math'

/** ±0.3° of mouse drift, heavily damped. Any more and it reads as a gimmick. */
const PARALLAX_RAD = (0.3 * Math.PI) / 180

/**
 * The rig owns three things and nothing else:
 *   1. damping the raw scroll target into scroll.current
 *   2. placing the camera on the curve for that value
 *   3. interpolating background + fog colour
 *
 * It runs at priority -1 so scroll.current is settled before any object's
 * useFrame reads it in the same tick.
 */
export function Rig() {
  const { camera, scene, gl } = useThree()
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 })
  const bg = useRef(new THREE.Color('#FFFFFF'))

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.tx = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.ty = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  // One Fog instance for the lifetime of the scene; only its values change.
  useEffect(() => {
    scene.fog = new THREE.Fog('#FFFFFF', 60, 190)
    scene.background = bg.current
    return () => {
      scene.fog = null
    }
  }, [scene])

  useFrame((_, dt) => {
    const d = Math.min(dt, 1 / 20)

    // 1 ── damp the scrub. lambda 4 gives a flick weight without lag.
    scroll.current = damp(scroll.current, scroll.target, 4, d)
    const p = scroll.current

    // 2 ── camera on the curve
    const { position, lookAt } = sampleCamera(p)
    camera.position.copy(position)
    camera.lookAt(lookAt)

    const cam = camera as THREE.PerspectiveCamera
    const fovNext = sampleFov(p)
    if (Math.abs(cam.fov - fovNext) > 0.01) {
      cam.fov = fovNext
      cam.updateProjectionMatrix()
    }

    // micro-parallax, applied after lookAt so it is a true offset
    mouse.current.x = damp(mouse.current.x, mouse.current.tx, 2.2, d)
    mouse.current.y = damp(mouse.current.y, mouse.current.ty, 2.2, d)
    camera.rotateY(-mouse.current.x * PARALLAX_RAD)
    camera.rotateX(-mouse.current.y * PARALLAX_RAD)

    // 3 ── environment
    const env = sampleEnvironment(p)
    bg.current.set(env.background)
    gl.setClearColor(bg.current, 1)
    const fog = scene.fog as THREE.Fog | null
    if (fog) {
      fog.color.set(env.fog)
      fog.near = env.fogNear
      fog.far = env.fogFar
    }
  }, -1)

  return null
}
