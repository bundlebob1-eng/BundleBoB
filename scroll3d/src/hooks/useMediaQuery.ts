import { useEffect, useState } from 'react'

function match(q: string) {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia(q).matches
}

export function useMediaQuery(query: string) {
  const [hit, setHit] = useState(() => match(query))
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setHit(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])
  return hit
}

/**
 * prefers-reduced-motion disables the scrub entirely. This is the most
 * commonly skipped part of sites like this, so it is a first-class branch:
 * the page renders as ordinary stacked sections, not a crippled 3D scene.
 */
export const useReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')

/** Under 768px we never ship WebGL — a different experience, not a broken one. */
export const useIsMobile = () => useMediaQuery('(max-width: 767px)')
