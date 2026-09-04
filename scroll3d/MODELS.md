# Models required

Grey-box first, on purpose. Every object below is currently a box or a cylinder
so the camera path, the scrub, the beat system and the overlay could be judged
before anyone fell in love with an asset. Swap geometry in one object at a
time, re-measure, then move on.

**Total budget: 150,000 triangles for the whole scene.** Current grey-box usage
is roughly 12k, so ~138k is available.

## Pipeline for every asset

1. Retopo to the budget below. Raw Sketchfab models are routinely 2M triangles
   and will destroy the framerate — assume a day of cleanup per hero asset.
2. `gltf-transform` → Draco for geometry, KTX2/Basis for textures.
3. Bake to a single material per object where possible; the scene already
   shares materials via `src/scene/materials.ts`.
4. Drop in `public/models/`, load with `useGLTF` inside the existing component,
   keep the component's `useFrame` animation logic unchanged.

```bash
npx @gltf-transform/cli optimize in.glb out.glb --compress draco --texture-compress ktx2
```

## Asset list

| # | Asset | Used in | Beat | Tri budget | Notes |
|---|---|---|---|---|---|
| 1 | Telehandler | `objects/Yard.tsx` | 1 | 18,000 | Boom must be a separate node — it is rotated by scroll. Wheels separate. |
| 2 | Joist bundle | `objects/Yard.tsx` | 1–2 | 3,000 | One joist, instanced ×9. Do **not** model the bundle as one mesh. |
| 3 | Pallet + material stack | `objects/Yard.tsx` | 1 | 4,000 | One pallet unit, instanced ×3. |
| 4 | Flatbed truck | `objects/Truck.tsx` | 2–4 | 26,000 | Cab, deck, chassis one mesh; **wheels a separate group** — they spin off scroll velocity. |
| 5 | Road surface + markings | `objects/Ground.tsx` | 3–4 | 500 | Plane + instanced dashes. Asphalt is a texture job, not geometry. |
| 6 | `BUILT TO SEQUENCE` type | `objects/DisplayType.tsx` | 3 | 6,000 | Extruded Anton via `<Text3D>` + `anton.typeface.json`. Currently troika SDF text with an outline. |
| 7 | Rebar mat | `objects/Ground.tsx` | 4 | 2,000 | One bar, instanced ×44. Already correct — only the profile changes. |
| 8 | Formwork panel | `objects/Ground.tsx` | 4 | 3,000 | One panel, instanced ×16. |
| 9 | Excavator | *(not yet placed)* | 4 | 20,000 | Optional dressing for the site. Add to `SiteWorks`. |
| 10 | Tower crane | `objects/TowerCrane.tsx` | 5 | 24,000 | Mast, slew group, jib, hook block must stay separate nodes — slew and hoist are both scroll-driven. Lattice as normal-mapped planes, not real lattice geometry. |
| 11 | Floor plate | `objects/Building.tsx` | 5 | 1,200 | Instanced ×14. |
| 12 | Column | `objects/Building.tsx` | 5 | 400 | Instanced ×56. |
| 13 | Curtain wall panel | `objects/Building.tsx` | 5 | 300 | Instanced ×168 — this is why the budget is tight. Keep it a quad with a frame. |
| 14 | Steel beam (hook load) | `objects/TowerCrane.tsx` | 5 | 1,500 | |

Instanced subtotal at these budgets ≈ 118k triangles worst case. Measure with
`renderer.info.render.triangles` before adding #9.

## Non-geometry assets

| Asset | Purpose | Notes |
|---|---|---|
| Studio HDRI (`.hdr`, 1k) | Beats 1–3 lighting | Keeps the white void clean. Poly Haven `studio_small_*`. |
| `anton.typeface.json` | Extruded display type | Generate from the Anton woff with facetype.js. |
| Site ambience (`.webm`/`.mp3`, ~40s loop) | `SoundToggle` | Currently WebAudio brown noise. Should duck to −12 dB when a panel opens; that logic already exists. |
| 60 × WebP frames, 1080×1920 | Optional mobile image sequence | See README "Swapping mobile to an image sequence". |

## Sourcing

- **Poly Haven** — CC0, best for HDRIs and surface textures.
- **Quaternius** — CC0, low-poly vehicles and machinery; closest to this budget already.
- **Sketchfab** — filter to CC licences. Highest quality, worst triangle counts.

Check the licence on every asset before it ships, and record it here.
