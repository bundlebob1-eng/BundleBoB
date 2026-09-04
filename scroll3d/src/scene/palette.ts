/**
 * The whole site runs on five colours. One accent only — hi-vis is the
 * construction vernacular and it stops reading as a signal the moment it is
 * used for decoration.
 */
export const PALETTE = {
  void: '#FFFFFF',     // beats 1-3 background
  concrete: '#C9C6BE', // ground from beat 4
  ink: '#101215',      // type, dark UI
  hivis: '#FFB800',    // single accent — crane cables, HUD, buttons, hover
  dusk: '#16233A',     // sky from beat 5
} as const

export type PaletteKey = keyof typeof PALETTE
