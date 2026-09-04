import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { M } from '../materials'
import { scroll } from '../progress'
import { fadeWindow, lerp, rangeT, smoothstep } from '../../lib/math'
import { sampleCamera } from '../curve'

/**
 * BEATS 2-4 — the flatbed. Side-on in the white void at beat 2, then the
 * focal object under a top-down camera for the haul.
 *
 * Wheels turn from scroll velocity, not a fixed loop, so a stopped scroll
 * stops the wheels.
 */
export function FlatbedTruck() {
  const group = useRef<THREE.Group>(null!)
  const wheels = useRef<THREE.Group>(null!)

  useFrame((_, dt) => {
    const p = scroll.current
    const vis = fadeWindow(p, 0.1, 0.58, 0.05)
    group.current.visible = vis > 0.01

    // Travel: parked in the yard, then hauls down the road through beat 3.
    //
    // During the haul the truck TRACKS the camera's aim rather than running a
    // fixed path. A fixed path loses the shot — the camera accelerates down
    // the curve toward the site far faster than any sane truck speed, and the
    // subject ends up behind the lens. This is what a real tracking shot does.
    const haul = smoothstep(0, 1, rangeT(p, 0.28, 0.34))
    const { lookAt } = sampleCamera(p)
    group.current.position.set(
      lerp(13, 2.5, haul),
      0,
      lerp(0, lookAt.z + 5, haul)
    )

    // Turn the wheels off real scroll speed.
    const speed = Math.abs(scroll.velocity)
    wheels.current.children.forEach((w) => {
      w.rotation.x += speed * dt * 26
    })
  })

  return (
    <group ref={group} position={[13, 0, 0]}>
      {/* deck */}
      <mesh material={M.steel} position={[0, 1.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[12.5, 0.35, 3.1]} />
      </mesh>
      {/* chassis rails */}
      <mesh material={M.ink} position={[0, 1.15, 0]}>
        <boxGeometry args={[12.0, 0.4, 2.2]} />
      </mesh>
      {/* cab */}
      <mesh material={M.hivis} position={[-5.1, 2.7, 0]} castShadow>
        <boxGeometry args={[2.6, 2.3, 2.9]} />
      </mesh>
      <mesh material={M.ink} position={[-6.2, 3.1, 0]}>
        <boxGeometry args={[0.5, 1.2, 2.6]} />
      </mesh>
      {/* the delivered bundle rides on the deck from beat 2 */}
      <DeckLoad />
      {/* wheels */}
      <group ref={wheels}>
        {[
          [-4.6, 0.95, 1.6],
          [-4.6, 0.95, -1.6],
          [3.0, 0.95, 1.6],
          [3.0, 0.95, -1.6],
          [4.6, 0.95, 1.6],
          [4.6, 0.95, -1.6],
        ].map((pos, i) => (
          <mesh
            key={i}
            material={M.rubber}
            position={pos as [number, number, number]}
            rotation={[0, 0, Math.PI / 2]}
            castShadow
          >
            <cylinderGeometry args={[0.95, 0.95, 0.5, 20]} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

function DeckLoad() {
  const g = useRef<THREE.Group>(null!)
  useFrame(() => {
    // Appears once the telehandler has set it down.
    const o = smoothstep(0, 1, rangeT(scroll.current, 0.24, 0.29))
    g.current.visible = o > 0.02
    g.current.scale.setScalar(lerp(0.9, 1, o))
  })
  return (
    <group ref={g} position={[0.4, 2.35, 0]}>
      <mesh material={M.steel} castShadow>
        <boxGeometry args={[6.2, 1.0, 1.3]} />
      </mesh>
      {/* hi-vis strap — the accent, used once */}
      <mesh material={M.hivis} position={[-1.6, 0, 0]}>
        <boxGeometry args={[0.16, 1.12, 1.42]} />
      </mesh>
      <mesh material={M.hivis} position={[1.6, 0, 0]}>
        <boxGeometry args={[0.16, 1.12, 1.42]} />
      </mesh>
    </group>
  )
}
