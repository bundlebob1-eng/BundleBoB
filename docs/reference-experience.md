# Current direction — September 28, 2026

BundleBoB is a technology service provider across industries. AI, custom software, and systems integration support real operational workflows. A forward-deployed engineer works directly with the client. Construction is the detailed example, with clearly labelled synthetic records, not the definition of the whole business.

## Reference decisions

| Reference | Adopted in BundleBoB |
| --- | --- |
| User video `d013275f630f4286add8e7605009263b.MP4` — NRG scene | Immersive depth, full-viewport composition, minimal navigation, restrained motion. |
| User video `7fef1724215641449b3a9330a6bb4f3d.MP4` — United Carriers | Strong display typography and capability controls. The globe it inspired was built and then removed on request; the renderer and its styles are kept as reference in `assets/legacy/`. |
| [Avathon](https://avathon.com/) — business context | Operational problems first; industry-specific applications; context, useful action, and accountable decisions. BundleBoB remains a services business. Avathon's platform claims, customers, partnerships, and results are not copied. |
| [O.C. Tanner](https://www.octanner.com/) | Real footage, strong media composition, generous spacing, complete navigation and supporting pages. |
| [Kojo purchasing](https://www.usekojo.com/solutions/purchasing) and [Oracle Primavera](https://www.oracle.com/construction-engineering/primavera-p6/) | Concrete construction workflows, visible interface details, and a keyboard-accessible product walkthrough. |
| Live BundleBoB | Figtree headings, Inter body text, and IBM Plex Mono identifiers, self-hosted. |

## Retained and retired work

- Retained the other agent's tablet label fixes, heading hierarchy, contrast improvements, and CSS scroll effects. Reduced motion disables automatic animation. Text fades were replaced with movement at full contrast after normal-motion auditing.
- Retained ink, paper, and yellow as the active palette. The six alternative palettes remain an optional design tool: `DESIGN_LAB=1 npm run build`. Normal builds omit the lab and its stylesheets.
- Removed the separate abstract reconciliation particle field and repeated FDE photo section from the homepage. The construction demonstration and dedicated FDE engagement story remain.
- `assets/signal.js` and `site/studio.mjs` are legacy source, excluded from runtime. `assets/signal.css` still supplies active palette/font tokens. `scroll3d/` remains a retired standalone experiment.
- Earlier generated business photographs stay in source for history and are excluded from deployment. Current media is explicitly listed in the builder.

## Experience and implementation

The opening is the film, the display headline and the capability selector. The selector changes the description, destination, and highlighted routes; its three controls support click, Enter/Space, arrows, Home, and End, and without JavaScript they remain direct service links. Scrolling is native throughout, with no capture and no continuous render loop.

The WebGL globe was removed on request. Its renderer, styles and generator output are retained as reference in `assets/legacy/` and `scripts/make-business-globe.mjs`, and none of it is shipped: no canvas, no `globe-data.json`, no static SVG.

Globe and video have separate pause controls. Animation stops offscreen and in hidden tabs. Reduced motion draws a static globe and removes scroll transforms; unavailable WebGL uses the static geographic SVG. The globe illustrates connected work, not office locations, customer deployments, or geographical service guarantees.

The full-width FDE film uses actual stock footage with the same playback safeguards as the hero. Mobile, reduced-motion, and Save-Data visits retain the poster until explicit video playback. Only a visible video automatically loads on eligible desktop visits. Attribution remains in the footer and [media-sources.md](media-sources.md).

The globe is made with Natural Earth. Its map data is [public domain](https://www.naturalearthdata.com/about/terms-of-use/). Source: `scripts/data/ne_110m_land.geojson`; generated data and static SVG: `node scripts/make-business-globe.mjs`. No reference website assets or user reference films are deployed.

## Current delivery boundary

Twenty pages plus six legacy redirects build to `dist/`. This includes service detail pages, thirteen potential industry applications, an FDE page with eight responsibilities and a five-step illustrative engagement, the construction walkthrough, guides, contact, privacy, terms, and the design system.

The inquiry form prepares a local download. `CONTACT_EMAIL` can configure a reviewed email draft and `BOOKING_URL` a verified booking link. There is no automatic form delivery configured. The site does not invent customer proof; the existing pre-pilot disclosure and synthetic-data labels remain. This work does not deploy the site.

## September 28 film replacement

Replaced the repeated office background with an eight-second infrastructure hero loop and a separate twenty-second, four-scene real-footage film. The main film now occupies a wide uninterrupted stage below the FDE introduction. Synchronized chapter labels connect operations, human expertise, connected systems, and field work. Figtree/Inter typography, globe interaction, all-industry positioning, and the explicitly illustrative FDE story remain intact. See `media-sources.md` for licenses, edit points, and reproducible media scripts.

The new hero video is approximately 2.2 MB, and the below-fold film 7.2 MB; its download is deferred until visible. Both use 1080p H.264. Mobile starts with a WebP still and explicit play. The old office MP4 is excluded from the deployment.
