import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import { PALETTE } from '../palette'
import { scroll } from '../progress'
import { fadeWindow } from '../../lib/math'

/**
 * BEAT 3 — enormous outlined display type living IN the scene, lying flat on
 * the haul road so the truck passes over it and half-occludes it.
 *
 * Grey-box note: this is SDF text (troika) with an outline, standing in for
 * real extruded geometry. Swap to <Text3D> + an Anton typeface JSON — see
 * MODELS.md. Kept as one draw call either way.
 */
export function DisplayType() {
  const group = useRef<THREE.Group>(null!)
  const textRef = useRef<any>(null)

  useFrame(() => {
    const p = scroll.current
    const vis = fadeWindow(p, 0.3, 0.46, 0.035)
    group.current.visible = vis > 0.01
    if (textRef.current) {
      textRef.current.fillOpacity = vis * 0.14
      textRef.current.outlineOpacity = vis * 0.85
    }
  })

  return (
    <group ref={group} position={[2.5, 0.04, -34]} rotation={[-Math.PI / 2, 0, 0]}>
      <Text
        ref={textRef}
        fontSize={9}
        letterSpacing={-0.04}
        maxWidth={70}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
        color={PALETTE.ink}
        outlineWidth={0.13}
        outlineColor={PALETTE.ink}
        fillOpacity={0.14}
      >
        BUILT TO{'\n'}SEQUENCE
      </Text>
    </group>
  )
}
