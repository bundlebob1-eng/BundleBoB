import { PALETTE } from './palette'

export type Vec3 = [number, number, number]

export interface BeatCamera {
  /** Camera world position at the START of this beat. */
  position: Vec3
  /** Point the camera looks at, at the START of this beat. */
  lookAt: Vec3
  /** Vertical FOV in degrees. Beat 1 is narrow so the yard reads orthographic. */
  fov: number
}

export interface BeatEnvironment {
  /** Clear colour + fog colour. Interpolated across the beat boundary. */
  background: string
  fog: string
  fogNear: number
  fogFar: number
  /** 0 = studio HDRI only (clean white void), 1 = full directional key + shadows. */
  keyLight: number
}

export interface BeatPanel {
  eyebrow: string
  heading: string
  body: string[]
  side: 'left' | 'right'
  /**
   * Where the panel is pinned, as a fraction of THIS beat (0..1).
   * Beat-relative on purpose: retime a beat and its panels move with it.
   */
  at: [number, number]
}

export interface BeatContent {
  eyebrow?: string
  headline?: string
  sub?: string
  /** Which third of the screen the headline occupies. */
  align?: 'left' | 'center' | 'right'
  panels?: BeatPanel[]
}

export interface Beat {
  id: string
  /** Human label, shown in the dev beat-scrubber (?debug=1). */
  label: string
  /** Global scroll progress range, 0..1. Must be contiguous and ascending. */
  range: [number, number]
  camera: BeatCamera
  environment: BeatEnvironment
  content: BeatContent
}

/* ────────────────────────────────────────────────────────────────────────────
   THE STORYBOARD

   This array is the whole page. Retime a beat by editing `range`; move the
   camera by editing `camera`; change what the visitor reads by editing
   `content`. No component code needs to be touched. See README.md.
   ──────────────────────────────────────────────────────────────────────────── */

export const BEATS: Beat[] = [
  {
    id: 'yard',
    label: '1 · The yard',
    range: [0.0, 0.15],
    camera: { position: [-30, 5, 20], lookAt: [-14, 3, 0], fov: 24 },
    environment: {
      background: PALETTE.void,
      fog: PALETTE.void,
      fogNear: 60,
      fogFar: 190,
      keyLight: 0,
    },
    content: {
      eyebrow: 'Commercial construction · Pacific Northwest',
      headline: 'Built to sequence',
      sub: 'Steel, concrete and curtain wall on a schedule that holds. Self-performed by crews on our own payroll.',
      align: 'left',
    },
  },
  {
    id: 'load',
    label: '2 · The load',
    range: [0.15, 0.3],
    camera: { position: [4, 4.5, 20], lookAt: [13, 2, 0], fov: 30 },
    environment: {
      background: PALETTE.void,
      fog: PALETTE.void,
      fogNear: 60,
      fogFar: 190,
      keyLight: 0,
    },
    content: {
      eyebrow: 'Loaded',
      headline: 'Nothing waits on a truck',
      sub: 'Material staged to the sequence, not to the yard.',
      align: 'right',
    },
  },
  {
    id: 'haul',
    label: '3 · The haul',
    range: [0.3, 0.45],
    camera: { position: [3, 31, -12], lookAt: [3, 0, -17], fov: 40 },
    environment: {
      background: PALETTE.void,
      fog: PALETTE.void,
      fogNear: 70,
      fogFar: 210,
      keyLight: 0.25,
    },
    content: {
      panels: [
        {
          eyebrow: '01 / Capacity',
          heading: 'Self-perform capacity',
          body: [
            'Concrete, steel erection and carpentry run by crews on our own payroll.',
            'Not a subcontract chain with four numbers between you and the work.',
          ],
          side: 'left',
          at: [0.18, 0.62],
        },
      ],
    },
  },
  {
    id: 'arrival',
    label: '4 · Arrival',
    range: [0.45, 0.62],
    camera: { position: [0, 36, -50], lookAt: [0, 0, -60], fov: 44 },
    environment: {
      background: PALETTE.concrete,
      fog: PALETTE.concrete,
      fogNear: 60,
      fogFar: 200,
      keyLight: 0.7,
    },
    content: {
      panels: [
        {
          eyebrow: '02 / Schedule',
          heading: 'Schedule you can build to',
          body: [
            'Sequencing committed at preconstruction, then held.',
            'When it moves you hear it from us first, with the recovery already drawn.',
          ],
          side: 'right',
          at: [0.12, 0.5],
        },
      ],
    },
  },
  {
    id: 'rise',
    label: '5 · The rise',
    range: [0.62, 0.85],
    camera: { position: [4, 24, -20], lookAt: [0, 10, -62], fov: 46 },
    environment: {
      background: PALETTE.dusk,
      fog: PALETTE.dusk,
      fogNear: 50,
      fogFar: 240,
      keyLight: 1,
    },
    content: {
      panels: [
        {
          eyebrow: '03 / Field',
          heading: '24/7 field support',
          body: [
            'A superintendent who answers the phone.',
            'Not a ticket queue and a response-time target.',
          ],
          side: 'left',
          at: [0.08, 0.42],
        },
        {
          eyebrow: '04 / Cost',
          heading: 'Transparent cost',
          body: [
            'Open-book pricing, subcontractor bids visible, markup stated once.',
            'No change-order theatre at month nine.',
          ],
          side: 'right',
          at: [0.5, 0.86],
        },
      ],
    },
  },
  {
    id: 'handover',
    label: '6 · Handover',
    range: [0.85, 1.0],
    camera: { position: [34, 13, -12], lookAt: [0, 16, -62], fov: 46 },
    environment: {
      background: PALETTE.dusk,
      fog: PALETTE.dusk,
      fogNear: 60,
      fogFar: 260,
      keyLight: 1,
    },
    content: {
      eyebrow: 'Handover',
      headline: 'Trusted by builders across the Northwest',
      align: 'center',
    },
  },
]

/**
 * Terminal camera keyframe. The curve needs one more point than there are
 * beats so the final beat has somewhere to travel TO.
 */
export const FINAL_CAMERA: BeatCamera = {
  position: [42, 14, 2],
  lookAt: [0, 17, -62],
  fov: 46,
}

/** Total page height. 700vh ≈ six beats with room to read each one. */
export const SCROLL_VH = 700

export const beatAt = (p: number): Beat =>
  BEATS.find((b) => p >= b.range[0] && p < b.range[1]) ?? BEATS[BEATS.length - 1]

/** Global progress range of a beat-relative panel window. */
export const panelRange = (beat: Beat, panel: BeatPanel): [number, number] => {
  const span = beat.range[1] - beat.range[0]
  return [beat.range[0] + panel.at[0] * span, beat.range[0] + panel.at[1] * span]
}

/** Every panel on the page, with ranges resolved to global progress. */
export const ALL_PANELS: Array<BeatPanel & { key: string; global: [number, number] }> =
  BEATS.flatMap((b) =>
    (b.content.panels ?? []).map((p, i) => ({
      ...p,
      key: `${b.id}-${i}`,
      global: panelRange(b, p),
    }))
  )
