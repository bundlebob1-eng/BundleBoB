# Built to Sequence — scroll-driven 3D construction site

One continuous WebGL scene. Scrolling does not move a document — it scrubs a
camera along a fixed path through a single 3D world, and HTML content panels
fade in and out over that world as the camera travels. The scroll bar is a
timeline.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build
npm run preview
```

Requires Node 18+.

---

## How the scroll mechanic works

There is exactly **one number**: normalised scroll progress `0 → 1`.

1. **Lenis** smooths the wheel.
2. **GSAP ScrollTrigger** scrubs over the 700vh spacer element and writes
   `scroll.target`.
3. **`Rig`** damps that into `scroll.current` (`MathUtils.damp`-equivalent,
   lambda 4) once per frame at priority `-1`, so every other `useFrame` in the
   same tick reads a settled value.
4. Everything else — camera, fog, colours, objects, panels — is a pure function
   of `scroll.current`.

`scroll` is a **module singleton, not React state** (`src/scene/progress.ts`).
The scrub runs at 60fps; putting it in `useState` would re-render the tree every
frame. Overlay elements are updated by writing `style.opacity` / `style.transform`
directly from one rAF loop.

There is no scroll-jacking and no snapping. The user keeps the scroll bar.

### Progress → camera

`src/scene/curve.ts` builds two `CatmullRomCurve3`s from the beat keyframes —
one for camera position, one for the lookAt target — with `N+1` points for `N`
beats so the last beat has somewhere to travel to.

Mapping progress to the curve parameter is the part worth understanding:

```
beatIndex, local = locate(p)          // which beat, and how far through it
u = (beatIndex + local) / N           // curve parameter
```

We use **`getPoint(u)` (uniform), not `getPointAt(u)` (arc-length)**.
Arc-length would give constant camera *speed* but would decouple the camera
from the beat ranges — beat 3 would no longer be guaranteed to begin exactly at
`p = 0.30`. Uniform parameter pins keyframe `i` to `u = i/N`, so a range edited
in `beats.ts` moves the camera exactly where you said.

---

## Editing the storyboard

**`src/scene/beats.ts` is the whole page.** No component code needs to change
to retime, reorder, re-aim or rewrite a beat.

```ts
{
  id: 'haul',
  label: '3 · The haul',
  range: [0.30, 0.45],                       // global progress, contiguous
  camera: {
    position: [3, 31, -12],                  // at the START of this beat
    lookAt:   [3,  0, -17],
    fov: 40,                                 // interpolated to the next beat
  },
  environment: {
    background: PALETTE.void,                // lerped across the boundary
    fog: PALETTE.void,
    fogNear: 70, fogFar: 210,
    keyLight: 0.25,                          // 0 = studio only, 1 = full key
  },
  content: {
    panels: [{
      eyebrow: '01 / Capacity',
      heading: 'Self-perform capacity',
      body: ['line one', 'line two'],
      side: 'left',
      at: [0.18, 0.62],                      // fraction of THIS beat, not global
    }],
  },
}
```

### To retime a beat
Edit `range`. Panel positions are **beat-relative** (`at`), so they move with
the beat automatically. Keep ranges contiguous and ascending — `beatAt()` and
`locate()` assume it.

### To add a beat
1. Insert the object in `BEATS` at the right position.
2. Adjust the neighbouring `range` values so the array still covers `0 → 1`
   with no gaps.
3. That is it. The camera curve rebuilds itself from the keyframes, and
   `StaticSite` picks the new content up for the no-3D path.

### To reorder beats
Move the array entries and swap their `range` values. The curve follows.

### To change what the camera does
Only `camera.position` / `camera.lookAt` / `camera.fov`. `FINAL_CAMERA` is the
terminal keyframe the last beat travels toward.

### To change page length
`SCROLL_VH` in `beats.ts`. 700vh ≈ six beats with room to read each one.

### Debugging a beat
Objects decide their own visibility from progress, so to inspect one in
isolation, temporarily widen its `fadeWindow` in the relevant object file.

---

## Project layout

```
src/
  scene/
    beats.ts        ← THE STORYBOARD. Edit this.
    curve.ts        camera path + progress→u mapping + env interpolation
    materials.ts    shared materials (one instance each, batched)
    palette.ts      the five colours
    progress.ts     the scroll singleton
    Rig.tsx         damping, camera placement, fog/background
    Lights.tsx      studio → key-light ramp
    Scene.tsx       assembles the world
    objects/        grey-box geometry, one file per beat cluster
  components/
    Scrubbed.tsx    the WebGL path (dynamically imported)
    Overlay.tsx     headlines + sliding panels (real DOM, rAF-driven styles)
    StaticSite.tsx  the no-3D path
    Handover.tsx    the flat HTML ending
    Hud / Cursor / ProgressLine / Loader / SoundToggle
  hooks/
    useScrollProgress.ts  Lenis + ScrollTrigger
    useMediaQuery.ts      reduced-motion, mobile
    useWebGL.ts           capability probe
```

---

## The three non-3D paths

`App.tsx` branches **before** importing three.js. `Scrubbed` is behind
`React.lazy`, so none of these download the 190 KB three chunk:

| Condition | Result |
|---|---|
| `prefers-reduced-motion: reduce` | `StaticSite` — ordinary stacked sections |
| viewport `< 768px` | `StaticSite` — never ship WebGL to a mid-range Android |
| WebGL unavailable | `StaticSite`, silently — never an error card |

Entry chunk is **~3.6 KB gzip**; the static path costs about 7 KB total.

`StaticSite` renders from the same `BEATS` array, so the text can never drift
between the two paths. **The DOM contains all the real copy in both cases** —
`h1` then `h2`s in order, real links — because the 3D is decoration.

### Swapping mobile to an image sequence
The spec allows either. To use ~60 scrubbed WebP frames instead of stacked
sections, drop them in `public/seq/0001.webp …` and replace the body of
`StaticSite` for `reason === 'mobile'` with a canvas that draws
`frame[Math.floor(progress * 59)]`. Keep the text in the DOM regardless.

---

## Performance

Budget: **60fps on a 2021 MacBook Air, under 150k triangles.**

- Everything repeated is instanced: 14 floor plates, 56 columns, 168 curtain
  wall panels, 14 light volumes, 44 rebar bars, 16 form panels, 26 lane dashes,
  9 joists — **8 draw calls, not 347.**
- Grey-box geometry is currently ~12k triangles. The budget in `MODELS.md` is
  what you may spend replacing it.
- `dpr` capped at 1.75, `AdaptiveDpr` drops it further under load.
- Objects are always mounted and toggle `.visible` — mounting mid-scroll would
  cause a shader compile hitch exactly when the camera is moving.
- Shadows only switch on from beat 4 (`keyLight > 0.35`).
- `toneMappingExposure` is clamped so the white void never goes grey.

### Per-instance opacity
`InstancedMesh` cannot fade instances individually without a custom shader, so
curtain wall panels **scale in** from zero instead. That is also what curtain
wall installation actually looks like.

---

## Known grey-box substitutions

| Thing | Now | Should be |
|---|---|---|
| All geometry | boxes + cylinders | see `MODELS.md` |
| `BUILT TO SEQUENCE` | SDF text (troika) with outline | `<Text3D>` + extruded Anton typeface |
| Ambient audio | WebAudio-generated brown noise | a real site recording |
| Testimonials / client logos | marked placeholder | approved copy only |

`Handover.tsx` content is **placeholder and labelled as such**. Do not ship it
as real endorsements.
