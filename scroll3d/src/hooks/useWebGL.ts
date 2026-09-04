import { useEffect, useState } from 'react'

/**
 * Lazy WebGL capability probe. If the context cannot be created we fall back
 * to the static version silently — never an error card.
 */
export function useWebGLSupport() {
  const [ok, setOk] = useState<boolean | null>(null)
  useEffect(() => {
    try {
      const c = document.createElement('canvas')
      const gl =
        c.getContext('webgl2') ||
        c.getContext('webgl') ||
        c.getContext('experimental-webgl')
      setOk(!!gl)
      // Release the probe context immediately.
      const lose = (gl as WebGLRenderingContext | null)?.getExtension('WEBGL_lose_context')
      lose?.loseContext()
    } catch {
      setOk(false)
    }
  }, [])
  return ok
}
