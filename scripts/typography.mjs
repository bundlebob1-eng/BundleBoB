/* ============================================================
   TYPOGRAPHY — a readable floor on real text.

   The stylesheets carry 183 font-size declarations below 11px,
   down to 6px. Anything that small is decoration pretending to
   be information: it fails older eyes and, at 6-8px, most eyes.

   This raises real text to a 12px floor.

   It deliberately does NOT touch the miniature interface
   mockups. Those are pictures of a dense UI, drawn at small
   scale on purpose; inflating their type would burst their
   fixed-height frames and make them look broken rather than
   readable. They carry no copy a visitor needs to read, and
   each is inside a labelled figure.
   ============================================================ */

const FLOOR = 12;

/* Selectors whose small type is a drawing of an interface,
   not prose. Matched as substrings against the rule's selector. */
const MOCKUP = [
  '.en-cost-preview',
  '.preview-',
  '.service-preview',
  '.en-detail-visual',
  '.report',
  '.diagram',
  '.tour-panel',
  '.swatch',
  '.space-scale',
  '.type-samples'
];

function isMockup(selector) {
  return MOCKUP.some(m => selector.includes(m));
}

export function enforceTypeFloor(css) {
  let raised = 0;
  const smallest = { before: 99 };

  /* Walk declaration blocks. At-rule preludes (@media ...) have no
     declarations of their own, so they fall through harmlessly. */
  const out = css.replace(/([^{}]+)\{([^{}]*)\}/g, (whole, selector, body) => {
    if (!/font-size:\s*\d/.test(body)) return whole;
    if (isMockup(selector)) return whole;

    const next = body.replace(/font-size:\s*(\d+(?:\.\d+)?)px/g, (m, px) => {
      const v = parseFloat(px);
      if (v < smallest.before) smallest.before = v;
      if (v >= FLOOR) return m;
      raised++;
      return `font-size:${FLOOR}px`;
    });

    return next === body ? whole : `${selector}{${next}}`;
  });

  return { css: out, raised, smallest: smallest.before };
}

export default enforceTypeFloor;
