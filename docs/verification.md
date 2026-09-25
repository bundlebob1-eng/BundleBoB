# September 24 studio revision verification

The current design is documented in [studio-direction.md](studio-direction.md). `npm run build` produces 13 pages and 6 redirects. This is a local preview, not a deployment.

- Automated accessibility: zero violations across 26 page/theme pairs after contrast and heading-order fixes.
- Browser acceptance: 52 page/theme/viewport combinations; 53 local links; no layout, link, or browser errors.
- Inquiry validation/download, resource search, mobile menu, native disclosures, and both video formats passed.
- Responsive review: 320, 390, 768, 900, 1024, 1440, and 1920px; no horizontal page overflow.
- Keyboard menus, Escape/focus restoration, pointer tilt, reduced-motion reset, and disclosures without JavaScript passed.
- Reduced-motion home: zero running animations. Idle main-thread use: approximately 0.04% in the local browser sample.

The older Lighthouse scores below belong to the previous design and are not measurements of this revision.

---

# BundleBoB final draft verification

This draft continues the site and video checkpoint at `86eaaff`, applying the O.C. Tanner visual direction requested by the user. Montserrat and Roboto Slab are the approved open-font alternatives. The implementation and reference mapping are in [visual-direction.md](visual-direction.md); generated image paths and prompts are in [image-prompts.md](image-prompts.md).

## Run and review

```sh
npm start
```

Open http://127.0.0.1:8080. Node 18+ is required; the site itself needs no dependency installation. Eleven pages and seven legacy redirects build into `dist/`. The draft is local, not a production deployment.

## Current measurements

Lighthouse 12.6.1 on 21 September 2026 local time (22 September UTC). Built output served locally with gzip; mobile profile, 150 ms RTT, 1,638.4 Kbit/s simulated throughput, and 4× CPU slowdown. These are lab results, not production or real-user measurements.

| Check | Result |
|---|---|
| Mobile performance | 99 / 100 |
| Accessibility | 100 / 100 |
| Best practices | 100 / 100 |
| SEO | 100 / 100 |
| First contentful paint | 0.902 seconds |
| Largest contentful paint | 2.027 seconds |
| Cumulative layout shift | 0 |
| Total blocking time | 0 ms |
| Production JavaScript | 5,037 bytes gzip; 13,852 bytes raw |
| Page/theme/viewport checks | 44 combinations passed |
| Local links and fragments | 50 checked; all resolved |
| Automated accessibility | 22 page/theme pairs; zero violations |
| Homepage overflow | None at 320, 390, 768, 900, 1024, 1280, or 1440px |
| Browser errors | None in the full-site run |
| Third-party runtime requests | None |

**The original brief’s strict LCP target of less than 2.0 seconds is narrowly missed by 27 ms in this run.** The score and CLS targets pass. The new photographic homepage carries more imagery and local fonts than the earlier diagram-led version; the previous version’s 0.949-second result is not a measurement of this design.

## Interaction and content checks

- Desktop disclosure menus open by keyboard, close with Escape and return focus, close on an outside click, and keep one panel open at a time.
- Mobile navigation, Escape focus return, and light/dark theme switching work.
- Industry tabs support pointer selection, arrow keys, Home, End, and four independently accessible panels. All four examples remain readable with JavaScript disabled.
- Capability-rail keyboard navigation, resource search and reset, form validation, inquiry download, and absence of unintended submissions pass.
- Both original video formats load as eight seconds, 960×540, and play. Their committed bytes are unchanged from `86eaaff`.
- The video poster, captions, and media sources load near the player. A lossless WebP poster copy reduces transfer while preserving the original PNG asset.
- Reduced motion has no running animations, hides the ambient canvas, shows final illustrative counts, and keeps the video paused.
- Blocking the interaction script leaves the page content readable with no invisible headings.
- Montserrat and Roboto Slab load locally. Responsive image sources return 200.

The hero is a still generated photograph, with a smaller portrait crop on phones. The existing procedural reconciliation video is preserved on the homepage and How It Works page. Photographs illustrate business settings; they are not customer portraits or endorsements.

## Evidence and reproduction

The local `audit/` directory is excluded from commits and deployment:

- `lighthouse.html`, `lighthouse.json`, `lighthouse-summary.json`: performance and quality audit.
- `browser-results.json` and `screenshots/`: 44 page/viewport/theme captures and shared interaction checks.
- `accessibility.json`: 22 page/theme results.
- `editorial/results.json` and `editorial/`: new navigation, tab, font, image, and seven-width checks, plus review screenshots.
- `reference/`: inspected reference screenshots and computed styles.

With development dependencies installed and the preview running:

```sh
CHROME_CHANNEL=chrome npm run verify
node scripts/editorial-check.mjs
node scripts/accessibility.mjs
node scripts/lighthouse.mjs
```

Run Lighthouse separately from other browser work for a useful performance measurement. `docs/verification.json` commits the current result summary. `docs/design-measurements.json` records palette contrast, source weights, and font/image sizes. All six measured palette text/background pairs exceed 4.5:1 in both themes.

## Remaining boundaries

Contact prepares a downloadable inquiry until a monitored business email or booking destination is supplied. Physical Safari/Android testing, a manual screen-reader session, and production hosting measurements remain unperformed. The Chrome main-thread idle proxy was 0.325% over the sampled interval; this is not a calibrated whole-device CPU measurement. The unchanged optional Lighthouse development dependency chain has previously documented archive-tool advisories; it is not shipped as a production dependency.
