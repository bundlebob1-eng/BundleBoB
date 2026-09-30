# September 29 — natural scrolling refinement

- Removed the pinned workflow, rotating card surfaces, progress-selected steps and horizontal service carousel. All services, examples and workflow steps follow ordinary document flow, including when JavaScript is disabled.
- Rechecked the live O.C. Tanner and Briq homepages at desktop and phone sizes. Current reference and implementation screenshots: `audit/scrolling/`.
- Build: 20 public pages and five redirects. Full Chrome regression: **160** route/viewport/preference combinations and **96** local links; no layout/browser errors or external runtime requests. Navigation, resource search, contact validation and enquiry download passed.
- Scrolling: **16** engine/device/motion combinations across Chrome and WebKit, phone, portrait iPad, landscape iPad and desktop. A 240px document scroll moved each tested service/workflow element by the same 240px. No pinned, transformed, blurred, overlapping or horizontally overflowing content in either rebuilt section.
- Wheel and Page Down input passed in Chrome and desktop WebKit. Mobile WebKit’s automation interface does not support wheel events; those layouts were checked through document scrolling, geometry, links and rendered screenshots. This is not a physical touch-device test.
- All three service links and the hero’s service anchor passed on every tested device/engine. Additional checks passed at 320px and with JavaScript disabled in both engines.
- Homepage accessibility: four viewport scans, no automated violations. Existing reduced-motion media preferences remain in place. Automated scans do not establish full conformance.
- Homepage acceptance: 11 widths from 320–1,920px; video playback/loop/resume, navigation hide/return, open-menu behavior and reduced-motion deferral all passed. The two existing supporting films are 1280px-wide HD exports, 10 and 8 seconds; stale assertions for an older 1920px/12-second export were corrected.
- The marketing handoff was regenerated and its three-page count/content verified. No new media export or Lighthouse run was needed for this layout change; earlier performance/media results below belong to the preceding release.

Earlier records below describe their respective iterations; the pinned/rotating workflow and service selectors are superseded.

---

# September 29 — final media, motion and enquiry patch

- Production build: 20 public pages and five redirects; the configured public address is `contact@bundlebob.com`.
- Full Chrome review: **160** route/viewport/preference combinations across phone, portrait tablet, landscape tablet and desktop; **96** local links. No browser/layout errors or external runtime requests. Keyboard navigation, resource search, validation and local download passed.
- Final targeted checks: dedicated high-resolution source selection on four screen shapes, supporting-film playback, construction media, service controls, non-overlapping cards and untransformed foreground text. Decorative surfaces retain three distinct scroll states; reduced motion removes them.
- WebKit: phone, iPad and desktop continuous playback, offscreen resume and reduced motion passed. iPad portrait → landscape → portrait source switching preserved playback.
- Slow mobile connection: 1.6 Mbps / 100ms latency, lower-bandwidth portrait source, a complete loop, **0 dropped frames / 404 decoded frames**; one waiting event recorded. Save-Data loads a poster without a video request.
- Accessibility: 48 route/preference checks reported no violations. Four final route checks cover the updated home, contact, privacy and construction pages. Automated scans are not a full conformance assessment.
- Rendered palette audit: all 20 public routes; no saturated interface hue outside the orange family. Purple removed, with ink/ivory/orange and neutral tints retained.
- Local Lighthouse mobile lab: **Performance 96, Accessibility 100, Best Practices 100, SEO 100**. FCP 1.4s, LCP 2.7s, TBT 0ms, CLS 0. This is one local simulated run, not production field data. Initial transferred data in the run: approximately 509 KiB.
- Contact preparation creates a `mailto:contact@bundlebob.com` draft with the visitor’s details and focuses the primary email action. No email was sent; mailbox delivery is not independently asserted.
- The marketing handoff remains three pages. Current screenshots and detailed reports: `audit/final-patch/`; decisions: [final-quality-review.md](final-quality-review.md).

Earlier records below describe their respective iterations and may contain superseded palettes, media and release status.

---

# September 29 — new identity, reference palette and visible scroll narrative

- Production build: 20 public pages and five redirects.
- Complete browser review: 80 route/viewport/preference combinations and 96 local links; no browser/layout errors or external runtime requests. Keyboard navigation, resource search, validation and inquiry download passed.
- Responsive design review: ten widths from 320 to 1,920px; no horizontal overflow. Desktop header is 1,180px at a 1,440px viewport; mobile menu works through 1,100px. All service selectors remain correct, including wide screens where multiple cards share the last scroll position.
- Scroll narrative: three distinct start/middle/end transforms, ending at identity. Reduced motion removes the transforms and sticky positioning; no running animations under that preference.
- Accessibility: 48 route/preference scans, no automated violations. These do not establish full WCAG conformance.
- Updated original SVG logo, favicon and social image. Marketing handoff regenerated as a three-page PDF and verified for page count/content.
- Screenshots: `audit/oct-direction/`. Full browser data: `audit/browser-results.json`.
- Review branch only: PR #41. Physical mobile testing and the public enquiry destination remain release dependencies; see [marketing-handoff.md](marketing-handoff.md).

Earlier verification records below describe their respective iterations, including superseded colors and motion.

---

# Marketing handoff — independent review and finishing pass

- Production: 20 public pages and five redirects; `/system` and `/theme-lab` excluded from normal builds.
- Full browser acceptance: 80 route/viewport/preference combinations and 96 local links; no browser/layout errors, no external requests.
- Accessibility: 48 route/preference scans clear. Eight additional checks cover the restored photographic closing, service pages, About and Contact at mobile and desktop widths.
- Targeted owner review: service selectors at 320/390/1024/1440px, non-transformed service diagrams, consistent CTA color, stable walkthrough controls, mobile scroll locking and restore, scroll-up navigation, decorative-only depth with reduced-motion fallback, unique metadata across 20 pages, and mobile-only video requests. All passed.
- Both re-exported 1080p workflow films decode, animate, autoplay in view and pause offscreen. No baked-in text is produced by the renderer.
- Mobile hero is approximately 1.6 MB; workflow films approximately 1 MB each. Desktop hero unchanged.
- Marketing handoff and remaining business dependencies: [marketing-handoff.md](marketing-handoff.md). Screenshots and targeted evidence: `audit/owner-review/`.

---

# September 29 — real client story and launch polish

- Production build: 21 pages, five redirects; client story is indexable and included in the sitemap.
- Browser acceptance: 84 route/viewport/preference combinations, 100 local links, zero browser or layout errors, zero external runtime requests.
- Accessibility review covered 50 route/preference combinations. The sole finding was a dark-section paragraph on the new story; corrected to ivory and rechecked with the complete story at five widths (320–1440px), with no violations.
- Story-specific checks: real route (no About redirect), keyboard disclosures, five role steps, incoming links, no pre-pilot/fictional/AI-generated framing, exact bright accent, design lab excluded.
- Story screenshots: `audit/launch/`. Source mapping and remaining contact destination dependency: [client-story-launch-review.md](client-story-launch-review.md).

---

# September 29 — brand, media, and all-page refinement

Current direction: [site-polish-review.md](site-polish-review.md). Earlier records below describe superseded media controls and palettes.

- All 20 routes passed desktop/mobile layout, link, form, and browser checks (80 combinations; 96 local links; no errors). Both system-color preferences now receive the same art-directed appearance.
- New interaction checks: navigation hide/return and menu persistence; service selection and workflow disclosure; eleven viewport widths; no removed film/theme controls.
- Both new films: 1920×1080, 12 seconds, explicit play, deferred download, offscreen pause. The generated source images are 1672×941.
- Hero playback advances beyond five seconds, loops at the end, and resumes after returning onscreen; reduced motion keeps the poster; mobile supports inline autoplay.
- Accessibility: all 48 route/preference checks clear after rechecking the two corrected video-button labels.
- Construction tour, keyboard navigation, FAQ, no-script fallback, and reduced-motion loading checks passed. Both workflow films decode distinct animated frames and pause offscreen.
- Screenshots and review boards: audit/polish/.

---

# September 29 primary-reference redesign

Current direction: [primary-reference-direction.md](primary-reference-direction.md). The prior globe and dark-homepage measurements below are historical.

- Homepage: 84px / 92.4px display type at 1440px; medium weight, sentence case. Outfit is the current font substitute for licensed Gotham SSm.
- Eleven viewport widths passed; no horizontal page overflow. Native carousel buttons and keyboard controls passed.
- Four distinct hero-film scenes, 20-second loop, and offscreen pause passed. Mobile and reduced-motion visits defer video loading.
- FDE responsibilities, illustrative engagement story, and all thirteen industry links passed.
- Accessibility: 48 checks across pages, themes, and motion preferences; no automated violations after shared text-color corrections.
- Full browser verification: 80 page/theme/viewport combinations, 96 local links, no browser or layout errors. Contact download, navigation, FAQ, search, and reconciliation media passed.
- Visual evidence: audit/reference/ and audit/film/.

---

# September 28 reference-led experience verification

Film replacement verified: four scene boundaries, 20-second looping, pause/resume, mobile poster without automatic video download, and explicit mobile playback passed. Final optimized assets were checked with the 80-combination browser suite, 48 accessibility checks, and enterprise controls suite; no errors or violations. Desktop/mobile and individual scene captures are in `audit/film/`. The experience suite also passed all eleven responsive widths.

Current direction: [reference-experience.md](reference-experience.md). This supersedes the visual measurements below.

- Build: 20 pages and 6 redirects; palette lab, retired particle renderer, and generated business photographs are excluded from normal output.
- Browser acceptance: 80 page/theme/viewport combinations; 96 local links; no browser, layout, link, or external-request errors.
- Accessibility: zero automated violations in 48 checks — all 20 pages in both themes with reduced motion, plus the homepage, services, industries, and FDE page in both themes with normal motion. Spoken-label matching is explicitly enabled.
- Before the film replacement, Lighthouse 12.6.1 mobile lab profile: Performance **94**, Accessibility **100**, Best Practices **100**, SEO **100**. LCP 3.0s, total blocking time 22ms, cumulative layout shift 0. These are local simulated measurements, not production field data.
- Reference-experience checks: actual globe frame changes, paused frames staying unchanged, capability selection by mouse and keyboard, service destinations, scroll depth, offscreen suspension, and the FDE film passed.
- Responsive label/copy collision checks passed at 320, 390, 600, 760, 761, 900, 1024, 1100, 1280, 1440, and 1920px.
- JavaScript-disabled and WebGL-unavailable visits keep the globe illustration, useful content, and service links. Reduced motion has no running animations.
- Background-video controls, mobile navigation, construction tour deep links and keyboard controls, FAQs, inquiry download, resource search, and both reconciliation video formats passed.
- FDE checks confirmed Figtree/Inter loading, all thirteen industry links, eight responsibilities, the five-step illustrative client story, and changing scroll transforms.
- The social image was regenerated using Figtree and the original globe. Screenshots and machine-readable evidence are in `audit/experience/`, `audit/enterprise/`, `audit/fde/`, and the root `audit/` reports.

The normal-motion audit caught text fading through insufficient contrast and media controls with mismatched visible/spoken labels. Text now moves at full contrast; labels match their accessible names. The accessibility and Lighthouse checks above were rerun after those corrections.

Local preview only. Contact prepares a local inquiry download until a monitored destination is configured. The construction example and FDE story are explicitly illustrative; named client proof remains unpublished.

Earlier measurements below are historical and do not describe the current build.

---

# September 26 cinematic enterprise verification

Current implementation: [enterprise-direction.md](enterprise-direction.md). Media provenance: [media-sources.md](media-sources.md).

- Build: 17 pages and 6 redirects.
- Lighthouse 12.6.1 mobile lab audit on September 26: Performance 96, Accessibility 100, Best Practices 100, SEO 100. LCP 2.7s, total blocking time 0ms. These are local simulated results, not production field measurements.
- Browser acceptance: 68 page/theme/viewport combinations and 77 local links; no layout, link, or browser errors.
- Automated accessibility: zero violations across 34 page/theme pairs.
- Hero video: muted playback, pause/resume, offscreen pause, and reduced-motion handling verified.
- Reduced-motion visits do not download the background movie automatically; poster and text remain visible.
- Construction tour: deep-linked steps, keyboard navigation, previous/next controls, and no-script fallback verified.
- Service FAQs, mobile navigation, inquiry validation/download, resource search, and reconciliation playback passed.
- Visual inspection: home at desktop/mobile, construction page, and AI service page. Evidence is in `audit/enterprise/` and `audit/screenshots/`.

This is a local preview. Contact delivery and real project case studies still require the business inputs requested from the owner.

Earlier measurements below are archived and refer to previous visual directions.

---

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
