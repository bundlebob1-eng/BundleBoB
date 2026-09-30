# BundleBoB

Latest: [Marketing design handoff](docs/marketing-handoff.md) — black/ivory/orange/purple palette, new bundled-work logo, compact navigation, visible scroll narrative and clearer service cards.

Current client story and launch review: [Hours from the field](docs/client-story-launch-review.md).

The current direction uses O.C. Tanner as the UI reference and Avathon for business context. Locally hosted Outfit, photographic backgrounds, native scrolling, a desktop 3D card sequence with a static reduced-motion fallback, and no night-mode control. See `assets/oct-direction.css` and `site/work-story.mjs` for the latest visual layer.

A service-led marketing site for custom software, practical AI, and systems integration. Construction technology is a featured specialty. The reconciliation demonstration uses synthetic data; the client story at `/client-story` describes the owner-confirmed mechanical/HVAC platform engagement.

## Run

```sh
npm start
```

Requires Node 18 or newer. No install is needed to build or serve the site. Open **http://127.0.0.1:8080**. Set `PORT` to change the port. The command builds the static output and serves it with clean routes, redirects, compression, security headers, and video range requests. Stop with Ctrl-C.

```sh
npm run build
```

Produces `dist/`, the only deployment directory. Vercel uses this command and directory. The build requires no credentials and makes no network requests. A production deployment still needs its account and DNS configured; none is changed by running the build.

## Content and design

- `site/enterprise.mjs` — cinematic homepage, service overview and details, construction specialty, approach, and closing panel.
- `assets/enterprise.css` / `assets/enterprise.js` — presentation and accessible background-video controls.
- `site/tour.mjs` — original interface illustrations and the construction walkthrough.
- `assets/studio.css` — warm ivory, charcoal, orange, responsive studio layouts, and CSS 3D geometry.
- `site/editorial.mjs` — shared navigation and footer.
- `assets/editorial.css` — shared navigation and footer presentation, photographic sections, gradients, and responsive layout.
- `assets/signal.css` — active palette and self-hosted font tokens. Its old particle renderer in `signal.js` is retired and excluded from output.
- `site/experience.mjs` / `assets/experience.css` / `assets/experience.js` — capability selector, cinematic opening and FDE film.
- `assets/typography.css` / `assets/motion.css` — heading hierarchy, contrast refinements, and native scroll animation.
- `scripts/experience-check.mjs` — controls, motion, fallback, and responsive acceptance checks.
- `site/content.mjs` — business copy, industry examples, ownership and compliance status, resource metadata.
- `site/pages.mjs` — page composition, operational guides, and shared layout.
- `site/art.mjs` — authored SVG icons, reconciliation sequence, and report/diagram markup.
- `assets/site.css` — light and dark palettes, components, responsiveness, and motion.
- `assets/site.js` — progressive enhancement, keyboard controls, inquiry preparation, and reduced-motion behavior.
- `assets/theme.js` — stored theme preference applied before rendering.
- `/system` — rendered design documentation, component states, calculated contrast, and patterns.

The production build emits 20 public pages and five legacy redirects. The sitemap covers the public pages, including the real client story. `/system` and `/theme-lab` are excluded unless an explicit design-lab build is requested. `scroll3d/` is a retired experiment and is excluded from deployment; the current homepage scroll scene is implemented in `site/work-story.mjs` and `assets/finish.js`.

Typography uses locally hosted Outfit. Font licenses are included in `assets/fonts/`. The current palette is defined in `scripts/palette.mjs`, with the final presentation layer in `assets/oct-direction.css`. The homepage retains its video hero and photographic campaign assets. There are no analytics scripts or runtime packages. Service illustrations explain capabilities; they are not representations of the client’s delivered platform.

## Contact destination

The site currently prepares a **downloadable inquiry locally**. Nothing is submitted, stored remotely, or described as sent. A usable destination was not supplied. This behavior keeps the page functional without inventing an inbox.

To offer a prepared email draft, set `CONTACT_EMAIL` when building. To add a booking link, set `BOOKING_URL` to a verified HTTPS address. These are public configuration values, not secrets. `.env.example` documents them; the build reads the process environment, not `.env` files automatically.

```sh
CONTACT_EMAIL=your-monitored-address@your-domain.example npm start
```

Replace that example with a real monitored address. The visitor still reviews and sends the email in their own mail client. There is no automatic email delivery, form endpoint, file upload, or financial-data intake in this repository. The customer-data workflow requires its own verified access, retention, storage, and processing controls.

## Generated video and share image

The real eight-second film, poster, and captions are generated by `scripts/render-video.mjs`. The current cinematic social share image is generated independently with `node scripts/render-share-image.mjs`. It draws 192 Canvas frames and encodes both H.264 MP4 and VP9 WebM with ffmpeg. The output is committed, so ordinary builds need neither browser tooling nor ffmpeg.

To regenerate with Playwright and ffmpeg installed:

```sh
npm ci
npx playwright install chromium
npm run video
npm run build
```

`FFMPEG_PATH` can point to an ffmpeg binary; otherwise the command uses `ffmpeg` on PATH. `CHROME_CHANNEL=chrome` uses installed Chrome. `PLAYWRIGHT_MODULE` can optionally point to an existing Playwright module for development environments. The generator reports output sizes, writes `docs/video-build.json`, and removes its own temporary frames after encoding.

The 60-second live-action shot list, voiceover, edit order, and twelve generative prompts are in `docs/film-production.md`. That document is a production specification, not a claim that live-action footage has been produced.

The player is user-initiated, uses a poster, fetches source metadata near the viewport, supplies captions and a transcript, and never autoplays. Space/K toggles playback and arrow keys seek while the player is focused. Native controls provide captions, seeking, fullscreen, and volume support. Reduced motion does not start playback and pauses a playing video when the preference changes.

## Verification

After `npm ci` and installing a Playwright browser, keep `npm start` running and execute:

```sh
npm run check
```

That runs every browser gate in sequence: `verify`, `check:a11y`,
`check:experience`, `check:enterprise` and `check:fde`. Each is also
available on its own, and `CHROME_CHANNEL` overrides the browser.
Lighthouse stays separate: `node scripts/lighthouse.mjs`.

`npm run build:lab` adds `/theme-lab`, the six candidate palettes on
real page composition. Normal builds omit it and its stylesheets.

`TEST_URL` changes the target. Browser evidence goes to `audit/`: screenshots for all twenty pages at 1440px and 390px in both themes, link checks, form and keyboard checks, both video formats, reduced motion, script failure, and main-thread idle sampling. Lighthouse writes HTML and JSON reports. `LIGHTHOUSE_MODULE` and `CHROME_PATH` are optional paths for an existing local audit installation.

These are meaningful browser acceptance checks, not a unit suite for static copy. See `docs/verification.md` for the measured results and limits of the hardware simulation.

## Deployment boundary

Only `dist/` is published. Source modules, documentation, scripts, local reports, environment files, and the retired experiment are excluded by the output boundary. Headers are specified in both the development server and `vercel.json`. The server explicitly rejects POST; CSP does not permit form submissions. Changing the inquiry to server delivery requires an intentional endpoint and policy change.

The hosting account's commercial plan eligibility and production deployment remain operator decisions. This implementation does not publish itself.

Video review: `npm run check:film` checks all four scene boundaries, looping, mobile poster-only loading, and explicit playback. Media provenance and native macOS rendering commands are recorded in `docs/media-sources.md`. The homepage uses separate hero and editorial films; real stock footage is labeled as illustrative.
