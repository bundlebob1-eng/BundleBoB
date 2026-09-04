import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { M } from '../materials'
import { scroll } from '../progress'
import { fadeWindow, lerp, rangeT, smoothstep } from '../../lib/math'

/**
 * BEAT 5 — the tower crane swings a steel beam into place as the building
 * rises. The slew and the hoist are both driven by scroll, so the crane is
 * doing the work the visitor is scrolling through.
 */
export function TowerCrane() {
  const group = useRef<THREE.Group>(null!)
  const slew = useRef<THREE.Group>(null!)
  const hook = useRef<THREE.Group>(null!)
  const cable = useRef<THREE.Mesh>(null!)

  useFrame(() => {
    const p = scroll.current
    const vis = fadeWindow(p, 0.58, 1.02, 0.05)
    group.current.visible = vis > 0.01
    if (!group.current.visible) return

    // Slew: swings the load in over the deck across the rise.
    const t = smoothstep(0, 1, rangeT(p, 0.62, 0.85))
    slew.current.rotation.y = lerp(-0.9, 0.55, t)

    // Hoist: the beam rides up with the building.
    const y = lerp(6, 46, t)
    hook.current.position.y = y
    // Cable spans jib to hook.
    const len = Math.max(52 - y, 0.4)
    cable.current.scale.y = len
    cable.current.position.y = y + len / 2
  })

  return (
    <group ref={group} position={[-30, 0, -92]}>
      {/* mast */}
      <mesh material={M.hivis} position={[0, 26, 0]} castShadow>
        <boxGeometry args={[1.7, 52, 1.7]} />
      </mesh>

      <group ref={slew} position={[0, 52, 0]}>
        {/* operator cab */}
        <mesh material={M.ink} position={[0, -1.4, 0]} castShadow>
          <boxGeometry args={[2.2, 2.2, 2.4]} />
        </mesh>
        {/* jib */}
        <mesh material={M.hivis} position={[17, 0, 0]} castShadow>
          <boxGeometry args={[38, 1.1, 1.1]} />
        </mesh>
        {/* counter-jib + counterweight */}
        <mesh material={M.hivis} position={[-7, 0, 0]} castShadow>
          <boxGeometry args={[14, 0.9, 0.9]} />
        </mesh>
        <mesh material={M.ink} position={[-13, -0.7, 0]} castShadow>
          <boxGeometry args={[3.2, 2.4, 2.6]} />
        </mesh>
      </group>

      {/* hoist cable — the one place the accent reads as a line */}
      <mesh ref={cable} material={M.hivis} position={[18, 30, 0]}>
        <boxGeometry args={[0.09, 1, 0.09]} />
      </mesh>

      {/* the beam being placed */}
      <group ref={hook} position={[18, 6, 0]}>
        <mesh material={M.steel} castShadow>
          <boxGeometry args={[9.5, 0.55, 0.55]} />
        </mesh>
        <mesh material={M.ink} position={[0, 0.5, 0]}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
        </mesh>
      </group>
    </group>
  )
}
