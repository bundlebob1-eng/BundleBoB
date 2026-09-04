import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { sampleEnvironment } from './curve'
import { scroll } from './progress'
import { lerp } from '../lib/math'

/**
 * Beats 1-3 are lit by ambient + fill only, so the white void stays clean and
 * never goes grey. The directional key and its shadows ramp in from beat 4,
 * and the warm dusk fill arrives with beat 5.
 *
 * Exposure is clamped in <Canvas> (toneMappingExposure) for the same reason.
 */
export function Lights() {
  const key = useRef<THREE.DirectionalLight>(null!)
  const ambient = useRef<THREE.AmbientLight>(null!)
  const fill = useRef<THREE.DirectionalLight>(null!)
  const warm = useRef<THREE.PointLight>(null!)

  useFrame(() => {
    const k = sampleEnvironment(scroll.current).keyLight
    key.current.intensity = lerp(0.15, 2.4, k)
    key.current.castShadow = k > 0.35
    ambient.current.intensity = lerp(1.55, 0.5, k)
    fill.current.intensity = lerp(1.1, 0.35, k)
    warm.current.intensity = Math.max(0, (k - 0.75) * 4) * 60
  })

  return (
    <>
      <ambientLight ref={ambient} intensity={1.55} />
      <directionalLight ref={fill} position={[-30, 24, 40]} intensity={1.1} />
      <directionalLight
        ref={key}
        position={[42, 60, 18]}
        intensity={0.15}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-70}
        shadow-camera-right={70}
        shadow-camera-top={70}
        shadow-camera-bottom={-70}
        shadow-camera-far={220}
        shadow-bias={-0.0005}
      />
      {/* warm practicals spilling out of the tower at dusk */}
      <pointLight ref={warm} position={[0, 24, -92]} color="#FFC978" intensity={0} distance={120} decay={2} />
    </>
  )
}
