# BundleBoB implementation report

## 1. Run

```sh
npm start
```

Open http://127.0.0.1:8080. Node 18+ is required. No package installation is needed for the site itself. The local preview is running. Changes are committed locally; no production deployment was performed.

## 2. Measured quality gates

Measured on 21 September 2026, against the built `dist/` served with gzip and production-equivalent configured security headers. Lighthouse 12.6.1, mobile profile: 150 ms RTT, 1,638.4 Kbit/s simulated throughput, 4× CPU slowdown. This is a local lab run, not a measurement of production hosting or real-user experience.

| Gate | Required | Measured | Result |
|---|---:|---:|---|
| Lighthouse performance | ≥90 | 100 | Pass |
| Lighthouse accessibility | ≥95 | 100 | Pass |
| LCP, simulated mobile 4G | <2.0 seconds | 0.949 seconds | Pass |
| CLS | <0.05 | 0 | Pass |
| Homepage JavaScript, gzip | <180 KB | 4,601 bytes | Pass |
| Page horizontal overflow at 390px | None | 0 cases across all eleven pages, both themes | Pass |
| Keyboard behavior | Reachable, visible focus | Rail arrows/Home/End, menu/Escape, form errors/download, native controls; visible focus rules | Tested behaviors pass; not an exhaustive assistive-technology certification |
| Reduced motion | Correct static states | No running animations, final counts, hidden canvas, paused non-autoplay video, final diagram | Pass |
| Themes | Light and dark designed | 44 page/viewport/theme screenshots; 22 automated accessibility audits, zero violations | Pass in tested Chrome configurations |
| Hero idle CPU | <5% on a mid-range laptop | 0.051% Chrome main-thread task time over three idle seconds on this machine | Proxy passes; specified physical hardware not verified |
| Reconciliation animation weight | <15 KB | 5,365 bytes of markup and dedicated CSS, including mobile and reduced-motion styles | Pass |

Additional measurements: Lighthouse best practices 100, SEO 100, total blocking time 0 ms. Homepage transfer was 22,913 bytes across five requests including favicon and headers. There are no font downloads or third-party requests. Raw homepage JS is 12,119 bytes across `site.js` and `theme.js`; shared CSS is 9,667 bytes gzip. Network transfer totals and local gzip sizes use different header/compression accounting.

Browser checks covered eleven pages at 1440×900 and 390×900 in both themes. All 49 collected local links and fragments resolved. No JavaScript or console errors were reported. Mobile navigation and Escape focus return, keyboard rail movement, resource search and empty/reset states, required-field errors, inquiry download, and no unintended POST all passed. Both generated video formats loaded as 960×540, eight seconds, and their playback time advanced.

Blocking `site.js` left the content readable: zero invisible headings. Disabling motion displayed the final `2`, `$11,850`, and `1` statistics with zero running animations. Scroll progress was observed moving from 0.0009 to 0.9991. Internal `/README.md` returned 404 from the built server.

### Contrast measurements

The `/system` page computes these values from the active palette. Ratios use the WCAG relative-luminance formula, not visual estimates.

| Text / background | Light | Dark |
|---|---:|---:|
| Ink / paper | 12.98:1 | 14.25:1 |
| Muted / paper | 5.75:1 | 8.72:1 |
| Accent ink / paper | 6.70:1 | 8.87:1 |
| Positive / paper | 6.08:1 | 9.97:1 |
| Ink / surface | 14.40:1 | 12.03:1 |
| Muted / surface | 6.38:1 | 7.36:1 |

### Evidence and rerun commands

- `audit/lighthouse.html` and `audit/lighthouse.json`: full Lighthouse run.
- `audit/browser-results.json`: page, link, interaction, media, and motion measurements.
- `audit/accessibility.json`: 22 page/theme accessibility results.
- `audit/screenshots/`: 44 full-page captures.
- `docs/verification.json`: committed summary without machine-specific file paths.
- `docs/design-measurements.json`: palette and motion/component size measurements.

With the development dependencies and Playwright browser installed, run `npm run verify`, `node scripts/accessibility.mjs`, and `node scripts/lighthouse.mjs` while the local server is running. Use `CHROME_CHANNEL=chrome` for installed Chrome. Lighthouse's render-blocking suggestion estimates a further 150 ms saving, but all required measured page-performance thresholds already pass.

## 3. What was built

### Pages

- `/` — problem-led overview, synthetic job report, three outcomes, accessible capability rail, scroll sequence, one-time statistics, four-industry fit, comparison, and contact CTA.
- `/how-it-works` — mapping and reconciliation mechanics, responsive inline SVG example, engagement process, actual video, and integration scoping examples.
- `/solutions` — auto/equipment workshops, fabrication/manufacturing, field service/installation, and contractors/specialty trades; each has a concrete illustrative situation.
- `/why-bundlebob` — comparison, accurate customer/platform ownership split, ongoing engagement rhythm, and explicit compliance preparation status.
- `/resources` — three complete guides with search, result count, and an accessible empty state.
- `/resources/when-systems-disagree` — timing differences, both calculation rules, review ownership, and freshness, using the synthetic $11,850 example.
- `/resources/wip-review` — five concrete questions for a work-in-progress review.
- `/resources/mapping-first` — identifiers, cost rules, missing data, and ongoing mapping maintenance.
- `/about` — product purpose, operating principles, and a truthful pre-pilot status.
- `/contact` — accessible inquiry preparation, validation, downloadable text, and optional configured email-draft/booking destinations.
- `/system` — two palettes, computed contrast, two native font-family roles, type and spacing scales, component states, motion specifications, and rendered patterns.

Seven old marketing routes redirect. The sitemap, robots file, authored favicon, authored Open Graph image, and a designed 404 page are included. Only `dist/` is published; internal source, build scripts, documentation, and the retired 3D experiment remain outside it.

### Motion

| Moment | Technique and measured dedicated weight | Reduced-motion state |
|---|---|---|
| Ambient hero field | Authored Canvas dots respond to pointer position and settle; 1,810 bytes JS. No continuous idle rendering. | Canvas hidden; static CSS background remains |
| Reconciliation | Inline SVG rows, crossfaded values, then conflict entry; 3,648 bytes markup + 1,717 bytes dedicated CSS | Final values and explanation visible |
| Scroll sequence | Viewport progress with frame-rate-adjusted damping, stage highlights, progress line, and explanatory readout; 1,568 bytes JS | Final diagram and all explanatory steps |
| Micro-interactions | Shared hover, focus, press, disabled, busy, success, and error rules; 1,836 bytes core CSS | Immediate state changes, no animation |
| Statistics | IntersectionObserver triggers a single eased count per visit; numbers are explicitly illustrative | Final numbers in the original HTML |

Weights for individual motion parts exclude shared helpers. The page-level 4,601-byte gzip total includes all production JavaScript. Native video controls and their browser implementation are not JavaScript shipped by this site.

### Video and production package

- `assets/video/reconciliation.mp4` — **92,393 bytes**, H.264, 960×540, 24 fps, eight seconds.
- `assets/video/reconciliation.webm` — **113,145 bytes**, VP9, same dimensions and duration.
- `assets/video/reconciliation-poster.png` — **53,192 bytes**, rendered from the authored sequence.
- `assets/video/reconciliation.vtt` — **338 bytes**, English captions.
- `scripts/render-video.mjs` — deterministic Canvas frame generation and ffmpeg encoding; run **`npm run video`** with Playwright/Chromium and ffmpeg installed. `FFMPEG_PATH` can specify the encoder executable.
- `docs/film-production.md` — twelve shots totaling sixty seconds; framing, motion, light, audio, intent, edit order, timed voiceover, twelve ready-to-paste prompts, negatives, and explicit recommendations to film/code-render difficult shots.

The procedural loop retains the conflict; it does not falsely animate an unapproved write-back. Physical footage was specified, not fabricated or referenced as if it existed.

## 4. Where corners were cut

1. **No automatic contact delivery.** A real inbox or booking destination was not supplied. The form genuinely creates a downloadable inquiry and says nothing was sent. `CONTACT_EMAIL` adds a reviewed mail-client draft; automatic server delivery needs a separately configured endpoint.
2. **No financial-data backend.** This is a complete marketing implementation. It does not authenticate to customer systems or accept financial exports. The site describes preparation and delivery requirements without claiming implemented backend controls.
3. **Native typography rather than shipped fonts.** Two font-family roles are documented, but exact glyph metrics vary by operating system. No third-party or ungenerated font file is requested.
4. **Local browser evidence.** Chrome desktop/mobile emulation and automated accessibility checks do not replace physical Safari/Android testing, a screen-reader session, or production-network measurements.
5. **Executive reading time.** The homepage contains 578 words of main content including chart labels, all rail cards, comparison cells, and disclosures. The hierarchy supports scanning, but a sub-two-minute complete read was not measured with an executive.
6. **Audit-tool advisories.** The production dependency audit reports zero vulnerabilities. The pinned optional Lighthouse development dependency chain still reports four high-severity advisory nodes involving its archive-download tooling. The checks use installed Chrome and these packages are not installed or shipped in production. Do not treat them as a verified-safe general-purpose archive downloader.

## 5. Another four hours, ranked

1. **Wire the approved contact destination and test delivery end to end — 1 hour.** Highest conversion value; requires the actual monitored destination.
2. **Test on physical iPhone/Android and with VoiceOver, fix the highest-impact issue — 1.5 hours.** Browser automation does not settle touch ergonomics or spoken reading order.
3. **Run an executive read-through and trim the weakest homepage section — 0.75 hour.** Validate speed of understanding with a workshop owner and an operations/finance buyer.
4. **Measure the deployed output, redirect policy, and headers; refresh optional audit tooling — 0.75 hour.** Local results are a baseline, not a production claim.

## 6. Self-assessment

| Dimension | Score / 5 | Reason |
|---|---:|---|
| It runs | 5 | One command, all pages and tested links load, no console errors |
| Performance | 4 | All measured page gates pass; physical target hardware and production latency remain unverified |
| Accessibility | 4 | Lighthouse 100 and zero automated violations; no manual screen-reader session |
| Visual craft | 4 | Consistent original layout, two themes, authored diagrams; native font metrics vary |
| Motion quality | 4 | Motion explains sources and disagreements and rests when idle; it is intentionally restrained |
| Video | 5 | Two actual encoded formats, poster/captions, working player, reproducible generator, detailed production package |
| Copy | 4 | Concrete job-based examples and clear ownership; executive comprehension needs external validation |
| Breadth without mush | 5 | Four industries tied to specific operational gaps |
| Executive shape | 4 | Outcome-first hierarchy, operational depth in subpages; 578 words including diagram/table content |
| Honesty | 5 | Synthetic figures disclosed, no invented people/customers, preparation distinguished from implemented controls |
| Responsive | 4 | 44 screenshot combinations, dedicated mobile reconciliation, no page overflow; physical touch validation pending |
| Self-knowledge | 5 | Contact, hardware, tooling, and delivery limits are stated directly |
| **Total** | **53 / 60** | |

The most generous score is visual craft: consistency and clean screenshots are not proof that this matches a mature enterprise brand in an executive's judgment. Accessibility could also be lower if a real screen-reader session exposes interaction problems that automated checks missed.
