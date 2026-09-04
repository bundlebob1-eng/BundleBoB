import * as THREE from 'three'
import { BEATS, FINAL_CAMERA, type BeatEnvironment } from './beats'
import { clamp01, lerp, mixHex, smoothstep } from '../lib/math'

/**
 * CAMERA PATH
 *
 * Both the camera position and its lookAt target are sampled from
 * CatmullRomCurve3s built out of the beat keyframes in beats.ts. There are
 * N+1 keyframes for N beats, so the final beat has somewhere to travel to.
 *
 * Mapping progress -> curve parameter is the part worth understanding.
 * We deliberately use getPoint(u) (uniform parameter) rather than getPointAt(u)
 * (arc-length). Arc-length would give constant camera SPEED but would decouple
 * the camera from the beat ranges — beat 3 would no longer be guaranteed to
 * start at p=0.30. Uniform parameter keeps keyframe i pinned to u = i/N, so a
 * beat's range in beats.ts maps exactly onto its segment of the curve.
 */

const N = BEATS.length

const positions = [...BEATS.map((b) => b.camera.position), FINAL_CAMERA.position]
const lookAts = [...BEATS.map((b) => b.camera.lookAt), FINAL_CAMERA.lookAt]
const fovs = [...BEATS.map((b) => b.camera.fov), FINAL_CAMERA.fov]

const toVec = (v: readonly number[]) => new THREE.Vector3(v[0], v[1], v[2])

export const POSITION_CURVE = new THREE.CatmullRomCurve3(
  positions.map(toVec),
  false,
  'catmullrom',
  0.5
)

export const LOOKAT_CURVE = new THREE.CatmullRomCurve3(
  lookAts.map(toVec),
  false,
  'catmullrom',
  0.5
)

/** Which beat index contains this progress, and how far through it we are. */
export function locate(p: number): { index: number; local: number } {
  const c = clamp01(p)
  for (let i = 0; i < N; i++) {
    const [a, b] = BEATS[i].range
    if (c >= a && c < b) return { index: i, local: (c - a) / (b - a || 1e-6) }
  }
  return { index: N - 1, local: 1 }
}

/** Global progress -> uniform curve parameter, honouring beat ranges exactly. */
export function curveU(p: number): number {
  const { index, local } = locate(p)
  return clamp01((index + local) / N)
}

const _pos = new THREE.Vector3()
const _look = new THREE.Vector3()

export function sampleCamera(p: number) {
  const u = curveU(p)
  POSITION_CURVE.getPoint(u, _pos)
  LOOKAT_CURVE.getPoint(u, _look)
  return { position: _pos, lookAt: _look }
}

export function sampleFov(p: number): number {
  const { index, local } = locate(p)
  const a = fovs[index]
  const b = fovs[Math.min(index + 1, fovs.length - 1)]
  return lerp(a, b, smoothstep(0, 1, local))
}

/**
 * Environment (background, fog, key-light strength) interpolated across the
 * beat boundary so colour never pops. Beat 4 is where white becomes concrete
 * and beat 5 is where concrete becomes dusk; both are just lerps here.
 */
export function sampleEnvironment(p: number): BeatEnvironment {
  const { index, local } = locate(p)
  const a = BEATS[index].environment
  const b = BEATS[Math.min(index + 1, N - 1)].environment
  const t = smoothstep(0, 1, local)
  return {
    background: mixHex(a.background, b.background, t),
    fog: mixHex(a.fog, b.fog, t),
    fogNear: lerp(a.fogNear, b.fogNear, t),
    fogFar: lerp(a.fogFar, b.fogFar, t),
    keyLight: lerp(a.keyLight, b.keyLight, t),
  }
}
