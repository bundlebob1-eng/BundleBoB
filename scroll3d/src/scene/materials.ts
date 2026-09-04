import * as THREE from 'three'
import { PALETTE } from './palette'

/**
 * Shared materials. Every repeated object references one of these so the
 * renderer can batch, and so a material tweak lands everywhere at once.
 * Grey-box phase: these stand in for the real PBR sets listed in MODELS.md.
 */

export const M = {
  /** Default grey-box body. Slightly off-white so it reads against the void. */
  box: new THREE.MeshStandardMaterial({
    color: '#E4E2DD',
    roughness: 0.75,
    metalness: 0.02,
  }),
  /** Darker structural members — steel, chassis, columns. */
  steel: new THREE.MeshStandardMaterial({
    color: '#8A8F96',
    roughness: 0.45,
    metalness: 0.65,
  }),
  ink: new THREE.MeshStandardMaterial({
    color: PALETTE.ink,
    roughness: 0.6,
    metalness: 0.1,
  }),
  concrete: new THREE.MeshStandardMaterial({
    color: PALETTE.concrete,
    roughness: 0.95,
    metalness: 0,
  }),
  /** The one accent. Crane cables, hazard stripes, machine bodywork. */
  hivis: new THREE.MeshStandardMaterial({
    color: PALETTE.hivis,
    roughness: 0.5,
    metalness: 0.1,
  }),
  rubber: new THREE.MeshStandardMaterial({
    color: '#1A1C1F',
    roughness: 0.9,
    metalness: 0,
  }),
  /** Curtain wall — fades in per panel, so it needs transparency. */
  glass: new THREE.MeshStandardMaterial({
    color: '#9FB3C8',
    roughness: 0.15,
    metalness: 0.4,
    transparent: true,
    opacity: 0.55,
  }),
  /** Warm practical light inside the floor plates at dusk. */
  lit: new THREE.MeshBasicMaterial({ color: '#FFD9A0' }),
} as const

export function disposeMaterials() {
  Object.values(M).forEach((m) => m.dispose())
}
