import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { M } from '../materials'
import { scroll } from '../progress'
import { clamp01, fadeWindow, lerp, rangeT, smoothstep } from '../../lib/math'

/**
 * BEAT 5 — the rise. This is the emotional peak of the page.
 *
 * The building assembles as you scroll: floor plates stack, columns extend,
 * curtain wall panels appear bottom-to-top, and warm practical lights come on
 * inside the completed floors at dusk.
 *
 * Everything repeated is instanced — 14 plates, 56 columns, 168 wall panels
 * and 14 light planes are 4 draw calls, not 252.
 *
 * Per-instance opacity would need a custom shader, so panels scale in from
 * zero instead. That also happens to be what curtain wall installation
 * actually looks like.
 */

const FLOORS = 14
const FLOOR_H = 3.4
const W = 26
const D = 20
const PANELS_PER_FLOOR = 12

/** When floor `i` starts and finishes assembling, in global progress. */
function floorWindow(i: number): [number, number] {
  const start = 0.63 + (i / FLOORS) * 0.17
  return [start, start + 0.035]
}

export function Building() {
  const group = useRef<THREE.Group>(null!)
  const plates = useRef<THREE.InstancedMesh>(null!)
  const columns = useRef<THREE.InstancedMesh>(null!)
  const walls = useRef<THREE.InstancedMesh>(null!)
  const lights = useRef<THREE.InstancedMesh>(null!)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  useFrame(() => {
    const p = scroll.current
    const vis = fadeWindow(p, 0.6, 1.02, 0.04)
    group.current.visible = vis > 0.01
    if (!group.current.visible) return

    for (let f = 0; f < FLOORS; f++) {
      const [a, b] = floorWindow(f)
      const t = smoothstep(0, 1, rangeT(p, a, b))
      const y = f * FLOOR_H

      // ── floor plate: drops the last half metre into place
      dummy.position.set(0, y + lerp(0.6, 0, t), 0)
      dummy.scale.set(t, Math.max(t, 0.001), t)
      dummy.rotation.set(0, 0, 0)
      dummy.updateMatrix()
      plates.current.setMatrixAt(f, dummy.matrix)

      // ── four corner columns extend upward from the plate below
      const corners: Array<[number, number]> = [
        [-W / 2 + 0.7, -D / 2 + 0.7],
        [W / 2 - 0.7, -D / 2 + 0.7],
        [-W / 2 + 0.7, D / 2 - 0.7],
        [W / 2 - 0.7, D / 2 - 0.7],
      ]
      corners.forEach(([cx, cz], c) => {
        dummy.position.set(cx, y + (FLOOR_H * t) / 2, cz)
        dummy.scale.set(1, Math.max(t, 0.001), 1)
        dummy.updateMatrix()
        columns.current.setMatrixAt(f * 4 + c, dummy.matrix)
      })

      // ── curtain wall, one ring per floor, lagging the structure slightly
      const wallT = smoothstep(0, 1, rangeT(p, a + 0.012, b + 0.022))
      for (let k = 0; k < PANELS_PER_FLOOR; k++) {
        const side = Math.floor(k / 3)
        const j = (k % 3) - 1
        if (side === 0) dummy.position.set(j * (W / 3), y + FLOOR_H / 2, -D / 2)
        if (side === 1) dummy.position.set(j * (W / 3), y + FLOOR_H / 2, D / 2)
        if (side === 2) dummy.position.set(-W / 2, y + FLOOR_H / 2, j * (D / 3))
        if (side === 3) dummy.position.set(W / 2, y + FLOOR_H / 2, j * (D / 3))
        dummy.rotation.set(0, side > 1 ? Math.PI / 2 : 0, 0)
        dummy.scale.set(wallT, wallT, 1)
        dummy.updateMatrix()
        walls.current.setMatrixAt(f * PANELS_PER_FLOOR + k, dummy.matrix)
      }

      // ── warm practical light, on only after the floor is enclosed and dusk
      // has arrived. Staggered so the tower lights unevenly, like a real one.
      const dusk = smoothstep(0, 1, rangeT(p, 0.72, 0.86))
      const stagger = clamp01(dusk * 1.5 - (f % 5) * 0.09)
      const on = wallT * stagger
      dummy.position.set(0, y + FLOOR_H / 2, 0)
      dummy.rotation.set(0, 0, 0)
      dummy.scale.set(on * (W - 2.2), on * 1.5, on * (D - 2.2))
      dummy.updateMatrix()
      lights.current.setMatrixAt(f, dummy.matrix)
    }

    plates.current.instanceMatrix.needsUpdate = true
    columns.current.instanceMatrix.needsUpdate = true
    walls.current.instanceMatrix.needsUpdate = true
    lights.current.instanceMatrix.needsUpdate = true
  })

  return (
    <group ref={group} position={[0, 0, -62]}>
      <instancedMesh
        ref={plates}
        args={[undefined, undefined, FLOORS]}
        material={M.concrete}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[W, 0.45, D]} />
      </instancedMesh>

      <instancedMesh
        ref={columns}
        args={[undefined, undefined, FLOORS * 4]}
        material={M.steel}
        castShadow
      >
        <boxGeometry args={[0.7, FLOOR_H, 0.7]} />
      </instancedMesh>

      <instancedMesh
        ref={walls}
        args={[undefined, undefined, FLOORS * PANELS_PER_FLOOR]}
        material={M.glass}
      >
        <boxGeometry args={[W / 3 - 0.25, FLOOR_H - 0.5, 0.14]} />
      </instancedMesh>

      <instancedMesh ref={lights} args={[undefined, undefined, FLOORS]} material={M.lit}>
        <boxGeometry args={[1, 1, 1]} />
      </instancedMesh>
    </group>
  )
}
