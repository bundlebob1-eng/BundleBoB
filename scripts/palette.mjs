/* ============================================================
   PALETTE — enforce the three-colour rule across every sheet.

   The site is assembled from five stylesheets written at
   different times, carrying three incompatible palettes between
   them: a warm studio set, a cinematic enterprise set with two
   magenta-to-orange gradients, and the ink/paper/hi-vis set.
   That is 300+ hard-coded hex values, so the rule cannot be held
   by hand — every future edit would drift again.

   This maps every colour onto one of three families:

     ink    the ground      cool, hue 203
     paper  surfaces, type  warm, hue 41
     hi-vis the only accent hue 51

   WCAG relative luminance is preserved, so contrast ratios the
   designer established survive the remap; only hue and
   saturation are normalised. A five-stop magenta-to-orange
   gradient becomes a five-stop hi-vis gradient rather than
   collapsing to a flat fill.

   Luminance, not HSL lightness. Those are not the same thing and
   the difference is not cosmetic: a red and a yellow at the same
   HSL lightness differ enormously in how bright the eye finds
   them, because the luminance formula weights green at 0.72 and
   blue at 0.07. Holding HSL lightness constant while rotating a
   dark rust (#94371d, 7.0:1 on white) to the hi-vis hue produced
   #94821d at 3.7:1 -- a real contrast failure that axe caught on
   six page/theme pairs. Matching luminance instead lands it on a
   gold that still passes.

   Colours already in the palette are passed through untouched.
   ============================================================ */

const KEEP = new Set([
  '#f4f1ea', '#0e1820', '#ffd400', '#16242f', '#1e313e', '#e0b400'
]);

/* hue/saturation targets per family */
const INK   = { h: 203, s: 0.30 };
const PAPER = { h:  41, s: 0.22 };
const HIVIS = { h:  51, s: 1.00 };

/* Below this saturation a colour is a neutral: it carries no hue
   intent, so it joins the ink/paper ramp by lightness. Above it,
   the colour was chosen to be seen, which is what hi-vis is for. */
const CHROMA_FLOOR = 0.15;

function hexToRgb(hex) {
  let h = hex.slice(1);
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0));
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  return [h * 60, s, l];
}

function hslToHex(h, s, l) {
  h = ((h % 360) + 360) % 360;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let rgb;
  if (h < 60) rgb = [c, x, 0];
  else if (h < 120) rgb = [x, c, 0];
  else if (h < 180) rgb = [0, c, x];
  else if (h < 240) rgb = [0, x, c];
  else if (h < 300) rgb = [x, 0, c];
  else rgb = [c, 0, x];
  return '#' + rgb
    .map(v => Math.round((v + m) * 255).toString(16).padStart(2, '0'))
    .join('');
}

/* WCAG relative luminance of an sRGB triplet. */
function luminance(r, g, b) {
  const f = v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

/* Find the HSL lightness that puts (hue, sat) at the target
   luminance. Luminance rises monotonically with L at fixed hue
   and saturation, so a bisection converges quickly and exactly
   enough for 8-bit output. */
function lightnessForLuminance(h, s, targetY) {
  let lo = 0, hi = 1;
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    const [r, g, b] = hexToRgb(hslToHex(h, s, mid));
    if (luminance(r, g, b) < targetY) lo = mid; else hi = mid;
  }
  return (lo + hi) / 2;
}

/* A neutral's saturation is scaled down toward the family target
   so near-greys stay near-grey and only pick up a tint. */
function remapOne(hex) {
  const lower = hex.toLowerCase();
  if (KEEP.has(lower)) return hex;

  const [r, g, b] = hexToRgb(lower);
  const [, s, l] = rgbToHsl(r, g, b);
  const y = luminance(r, g, b);

  if (s >= CHROMA_FLOOR) {
    /* chromatic: the author wanted attention here, so it becomes
       hi-vis -- at the same luminance, so anything using it as
       text keeps the contrast ratio it had. */
    const sat = Math.min(s, HIVIS.s);
    return hslToHex(HIVIS.h, sat, lightnessForLuminance(HIVIS.h, sat, y));
  }

  /* neutral: joins the ink ramp below mid-lightness, paper above */
  const fam = l < 0.5 ? INK : PAPER;
  const tint = Math.min(s + 0.05, fam.s) * (l < 0.5 ? 1 : 0.7);
  return hslToHex(fam.h, tint, lightnessForLuminance(fam.h, tint, y));
}

export function enforcePalette(css) {
  const seen = new Map();

  /* Skip hex inside url(...) so encoded SVG data URIs are untouched. */
  const parts = css.split(/(url\([^)]*\))/g);

  const out = parts.map((part, i) => {
    if (i % 2 === 1) return part;               // the url(...) captures
    return part.replace(/#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g, (m) => {
      const to = remapOne(m);
      if (to.toLowerCase() !== m.toLowerCase()) seen.set(m.toLowerCase(), to);
      return to;
    });
  }).join('');

  return { css: out, remapped: seen };
}

export default enforcePalette;
