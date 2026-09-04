import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { scroll } from './progress'

/**
 * Signals that the renderer has actually presented frames.
 *
 * This exists because the scene is 100% procedural — there is not a single
 * texture or model to load — so THREE.DefaultLoadingManager never fires and
 * drei's useProgress() sits at 0 forever. Asset progress cannot be the thing
 * the loader waits on. Rendered frames can.
 *
 * Three frames rather than one: the first frame compiles shaders, so waiting
 * for it alone can still hand off to a stutter.
 */
export function ReadySignal() {
  const frames = useRef(0)
  useFrame(() => {
    if (scroll.ready) return
    frames.current += 1
    if (frames.current >= 3) scroll.ready = true
  })
  return null
}
