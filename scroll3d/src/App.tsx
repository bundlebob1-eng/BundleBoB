import { Suspense, lazy } from 'react'
import { useIsMobile, useReducedMotion } from './hooks/useMediaQuery'
import { useWebGLSupport } from './hooks/useWebGL'
import { StaticSite } from './components/StaticSite'

/**
 * three.js and the whole scene sit behind a dynamic import. A phone, a
 * reduced-motion visitor or a machine without WebGL never downloads them.
 */
const Scrubbed = lazy(() => import('./components/Scrubbed'))

export default function App() {
  const reduced = useReducedMotion()
  const mobile = useIsMobile()
  const webgl = useWebGLSupport()

  // null while probing — hold on white rather than flash the wrong path.
  if (webgl === null) return <div className="min-h-screen bg-white" />

  if (reduced) return <StaticSite reason="reduced-motion" />
  if (mobile) return <StaticSite reason="mobile" />
  if (!webgl) return <StaticSite reason="no-webgl" />

  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <Scrubbed />
    </Suspense>
  )
}
