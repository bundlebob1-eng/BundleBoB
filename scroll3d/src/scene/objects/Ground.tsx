import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { M } from '../materials'
import { PALETTE } from '../palette'
import { scroll } from '../progress'
import { fadeWindow, lerp, mixHex, rangeT, smoothstep } from '../../lib/math'

/**
 * BEATS 3-4 — the ground.
 *
 * White void becomes a haul road, the haul road becomes a poured slab, the
 * slab becomes an excavated site with a rebar mat and formwork. It is one
 * plane whose colour and detail interpolate, not four separate objects, so
 * there is never a cut.
 */
export function Ground() {
  const road = useRef<THREE.Mesh>(null!)
  const mat = useRef<THREE.MeshStandardMaterial>(null!)

  useFrame(() => {
    const p = scroll.current
    // Fades up as the camera lifts to the aerial at beat 3.
    const vis = fadeWindow(p, 0.26, 1.01, 0.06)
    road.current.visible = vis > 0.01

    // white -> asphalt -> concrete
    const toAsphalt = smoothstep(0, 1, rangeT(p, 0.28, 0.4))
    const toConcrete = smoothstep(0, 1, rangeT(p, 0.45, 0.6))
    const c = mixHex(mixHex(PALETTE.void, '#6E7075', toAsphalt), PALETTE.concrete, toConcrete)
    mat.current.color.set(c)
    mat.current.opacity = vis
  })

  return (
    <mesh
      ref={road}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.02, -50]}
      receiveShadow
    >
      <planeGeometry args={[120, 260]} />
      <meshStandardMaterial ref={mat} roughness={0.95} metalness={0} transparent />
    </mesh>
  )
}

/** Lane markings, instanced, scrolling with the haul. */
export function LaneMarkings() {
  const mesh = useRef<THREE.InstancedMesh>(null!)
  const COUNT = 26
  const dummy = useMemo(() => new THREE.Object3D(), [])

  useFrame(() => {
    const p = scroll.current
    const vis = fadeWindow(p, 0.29, 0.5, 0.04)
    mesh.current.visible = vis > 0.01
    if (!mesh.current.visible) return

    // Scroll the dashes along Z with progress so the road appears to move.
    const offset = (p - 0.3) * 420
    for (let i = 0; i < COUNT; i++) {
      const z = ((i * 9 + offset) % 234) - 117
      dummy.position.set(0, 0.02, -50 + z)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    }
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, COUNT]} material={M.box}>
      <boxGeometry args={[0.42, 0.02, 4.2]} />
    </instancedMesh>
  )
}

/**
 * BEAT 4 — rebar mat and formwork on the excavated site. Both instanced:
 * 44 bars + 16 form panels is 60 objects in 2 draw calls.
 */
export function SiteWorks() {
  const bars = useRef<THREE.InstancedMesh>(null!)
  const forms = useRef<THREE.InstancedMesh>(null!)
  const group = useRef<THREE.Group>(null!)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const BARS = 44
  const FORMS = 16

  useFrame(() => {
    const p = scroll.current
    const vis = fadeWindow(p, 0.44, 0.78, 0.05)
    group.current.visible = vis > 0.01
    if (!group.current.visible) return
    group.current.scale.setScalar(lerp(0.97, 1, vis))

    if (!bars.current.userData.placed) {
      let n = 0
      // 22 bars each way — a mat, not a grid of cubes.
      for (let i = 0; i < 22; i++) {
        dummy.position.set(-21 + i * 2, 0.06, 0)
        dummy.rotation.set(0, 0, 0)
        dummy.scale.set(1, 1, 1)
        dummy.updateMatrix()
        bars.current.setMatrixAt(n++, dummy.matrix)
      }
      for (let i = 0; i < 22; i++) {
        dummy.position.set(0, 0.12, -21 + i * 2)
        dummy.rotation.set(0, Math.PI / 2, 0)
        dummy.updateMatrix()
        bars.current.setMatrixAt(n++, dummy.matrix)
      }
      bars.current.instanceMatrix.needsUpdate = true
      bars.current.userData.placed = true

      // Formwork ringing the pour.
      for (let i = 0; i < FORMS; i++) {
        const side = Math.floor(i / 4)
        const k = (i % 4) * 11 - 16.5
        const r = 23
        if (side === 0) dummy.position.set(k, 0.7, -r)
        if (side === 1) dummy.position.set(k, 0.7, r)
        if (side === 2) dummy.position.set(-r, 0.7, k)
        if (side === 3) dummy.position.set(r, 0.7, k)
        dummy.rotation.set(0, side > 1 ? Math.PI / 2 : 0, 0)
        dummy.updateMatrix()
        forms.current.setMatrixAt(i, dummy.matrix)
      }
      forms.current.instanceMatrix.needsUpdate = true
    }
  })

  return (
    <group ref={group} position={[0, 0, -92]}>
      <instancedMesh ref={bars} args={[undefined, undefined, BARS]} material={M.steel} castShadow>
        <boxGeometry args={[44, 0.09, 0.09]} />
      </instancedMesh>
      <instancedMesh ref={forms} args={[undefined, undefined, FORMS]} material={M.box} castShadow>
        <boxGeometry args={[10.6, 1.4, 0.3]} />
      </instancedMesh>
    </group>
  )
}
