import { Suspense } from 'react'
import { ContactShadows, AdaptiveDpr, Preload } from '@react-three/drei'
import { Rig } from './Rig'
import { Lights } from './Lights'
import { Yard } from './objects/Yard'
import { FlatbedTruck } from './objects/Truck'
import { Ground, LaneMarkings, SiteWorks } from './objects/Ground'
import { DisplayType } from './objects/DisplayType'
import { TowerCrane } from './objects/TowerCrane'
import { Building } from './objects/Building'

/**
 * One continuous world. Every object is always mounted and decides its own
 * visibility from scroll progress — mounting/unmounting mid-scroll would
 * cause a shader compile hitch exactly when the camera is moving.
 */
export function Scene() {
  return (
    <Suspense fallback={null}>
      <Rig />
      <Lights />

      {/* Beats 1-2 — the white void. Contact shadow only, no ground plane. */}
      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.34}
        scale={54}
        blur={2.1}
        far={13}
        resolution={512}
        color="#8A8A8A"
      />
      <Yard />
      <FlatbedTruck />

      {/* Beats 3-4 — road, type, site works */}
      <Ground />
      <LaneMarkings />
      <DisplayType />
      <SiteWorks />

      {/* Beats 5-6 — the rise */}
      <TowerCrane />
      <Building />

      <AdaptiveDpr pixelated />
      <Preload all />
    </Suspense>
  )
}
