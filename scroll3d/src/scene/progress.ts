/**
 * Scroll state lives in a module singleton, NOT React state.
 *
 * The scrub runs at 60fps; putting it in useState would re-render the entire
 * tree every frame. Lenis/ScrollTrigger write `target`, the render loop damps
 * `current` toward it, and everything that needs the value reads this object
 * inside useFrame or a rAF.
 */
export const scroll = {
  /** Raw normalised scroll 0..1, written by ScrollTrigger. */
  target: 0,
  /** Damped value the camera and scene actually use. */
  current: 0,
  /** Signed progress units per second, smoothed — drives the HUD readout. */
  velocity: 0,
  /** True once the loader has handed off. */
  ready: false,
}

type Listener = (p: number) => void
const listeners = new Set<Listener>()

/** Subscribe for throttled UI updates (panels, progress line) — not per-frame. */
export function subscribe(fn: Listener) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export function emit(p: number) {
  listeners.forEach((fn) => fn(p))
}
