import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { M } from '../materials'
import { scroll } from '../progress'
import { fadeWindow, lerp, rangeT, smoothstep } from '../../lib/math'

/**
 * BEAT 1 — the yard. A telehandler lifts a bundle of steel joists off a stack
 * of palletised material. Everything floats in a white nowhere; the emptiness
 * is the point, so there is no ground plane here and only a contact shadow.
 *
 * Grey-box: boxes and cylinders. See MODELS.md for the real assets.
 */
export function Yard() {
  const group = useRef<THREE.Group>(null!)
  const boom = useRef<THREE.Group>(null!)
  const bundle = useRef<THREE.Group>(null!)

  useFrame(() => {
    const p = scroll.current
    // Present through beats 1-2, gone by the time the camera lifts.
    const vis = fadeWindow(p, -0.02, 0.3, 0.05)
    group.current.visible = vis > 0.01
    group.current.scale.setScalar(lerp(0.94, 1, vis))

    // Boom raises across beat 1, then holds.
    const lift = smoothstep(0, 1, rangeT(p, 0.02, 0.15))
    boom.current.rotation.z = lerp(-0.22, 0.12, lift)

    // The joist bundle travels from the stack to the flatbed across beat 2.
    const carry = smoothstep(0, 1, rangeT(p, 0.15, 0.27))
    bundle.current.position.x = lerp(0.4, 12.6, carry)
    bundle.current.position.y = lerp(3.6, 2.35, carry)
  })

  return (
    <group ref={group}>
      {/* ── Telehandler ────────────────────────────────────────────── */}
      <group position={[-7.5, 0, 0]}>
        {/* chassis */}
        <mesh material={M.hivis} position={[0, 1.5, 0]} castShadow>
          <boxGeometry args={[5.4, 1.7, 2.4]} />
        </mesh>
        {/* cab */}
        <mesh material={M.ink} position={[-0.7, 3.0, 0]} castShadow>
          <boxGeometry args={[2.0, 1.6, 2.2]} />
        </mesh>
        {/* boom, pivots at the rear */}
        <group ref={boom} position={[-2.0, 2.6, 0]}>
          <mesh material={M.steel} position={[3.4, 0, 0]} castShadow>
            <boxGeometry args={[7.4, 0.62, 0.7]} />
          </mesh>
          {/* fork carriage */}
          <mesh material={M.steel} position={[7.0, -0.45, 0]} castShadow>
            <boxGeometry args={[0.3, 1.3, 1.9]} />
          </mesh>
        </group>
        {/* wheels */}
        {[
          [-1.7, 0.85, 1.35],
          [-1.7, 0.85, -1.35],
          [1.9, 0.85, 1.35],
          [1.9, 0.85, -1.35],
        ].map((pos, i) => (
          <mesh
            key={i}
            material={M.rubber}
            position={pos as [number, number, number]}
            rotation={[Math.PI / 2, 0, 0]}
            castShadow
          >
            <cylinderGeometry args={[0.85, 0.85, 0.62, 18]} />
          </mesh>
        ))}
      </group>

      {/* ── Bundle of steel joists (instanced bars) ─────────────────── */}
      <group ref={bundle} position={[0.4, 3.6, 0]}>
        <JoistBundle />
      </group>

      {/* ── Palletised material stack ───────────────────────────────── */}
      <group position={[0.4, 0, 0]}>
        {[0, 1, 2].map((i) => (
          <group key={i} position={[0, 0.55 + i * 1.05, 0]}>
            <mesh material={M.box} castShadow receiveShadow>
              <boxGeometry args={[3.6, 0.9, 2.6]} />
            </mesh>
            <mesh material={M.ink} position={[0, -0.52, 0]}>
              <boxGeometry args={[3.7, 0.14, 2.7]} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  )
}

/** 9 joists, instanced — the spec asks for anything repeated to be instanced. */
export function JoistBundle() {
  const mesh = useRef<THREE.InstancedMesh>(null!)
  const dummy = new THREE.Object3D()

  useFrame(() => {
    if (!mesh.current || mesh.current.userData.placed) return
    let n = 0
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        dummy.position.set(0, row * 0.34, (col - 1) * 0.42)
        dummy.rotation.set(0, 0, 0)
        dummy.updateMatrix()
        mesh.current.setMatrixAt(n++, dummy.matrix)
      }
    }
    mesh.current.instanceMatrix.needsUpdate = true
    mesh.current.userData.placed = true
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, 9]} material={M.steel} castShadow>
      <boxGeometry args={[6.2, 0.26, 0.26]} />
    </instancedMesh>
  )
}
