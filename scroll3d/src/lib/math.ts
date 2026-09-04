/** Small pure helpers shared by the scene and the overlay. */

export const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t

export const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = clamp01((x - edge0) / (edge1 - edge0 || 1e-6))
  return t * t * (3 - 2 * t)
}

/** Normalised 0..1 position inside an arbitrary range, clamped. */
export const rangeT = (p: number, a: number, b: number) => clamp01((p - a) / (b - a || 1e-6))

/**
 * A fade window: 0 outside [a,b], 1 inside, with `fade` of smooth ramp on each
 * edge. This is how every panel, object and colour enters and leaves — nothing
 * in this project is allowed to pop.
 */
export const fadeWindow = (p: number, a: number, b: number, fade = 0.025) =>
  Math.min(smoothstep(a, a + fade, p), 1 - smoothstep(b - fade, b, p))

/** Frame-rate independent damping (same curve as THREE.MathUtils.damp). */
export const damp = (current: number, target: number, lambda: number, dt: number) =>
  lerp(current, target, 1 - Math.exp(-lambda * dt))

/** Mix two hex colours. Used for fog/background interpolation across beats. */
export function mixHex(a: string, b: string, t: number): string {
  const pa = parseInt(a.slice(1), 16)
  const pb = parseInt(b.slice(1), 16)
  const ar = (pa >> 16) & 255, ag = (pa >> 8) & 255, ab = pa & 255
  const br = (pb >> 16) & 255, bg = (pb >> 8) & 255, bb = pb & 255
  const r = Math.round(lerp(ar, br, t))
  const g = Math.round(lerp(ag, bg, t))
  const bl = Math.round(lerp(ab, bb, t))
  return `#${((r << 16) | (g << 8) | bl).toString(16).padStart(6, '0')}`
}
