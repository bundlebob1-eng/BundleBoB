# Cinematic enterprise revision — September 25, 2026

## Reference mapping

- [O.C. Tanner](https://www.octanner.com/): full-screen live-action opening, floating dark navigation, large geometric headlines, human context paired with interface details, and a saturated closing section.
- [Kojo purchasing](https://www.usekojo.com/solutions/purchasing): concrete operational problems, visible software examples, and clear paths into a demonstration.
- [Oracle Primavera P6](https://www.oracle.com/construction-engineering/primavera-p6/#p6-cloud-migration-tours): navigable capability detail, a guided walkthrough, and substantive interior pages.

BundleBoB's copy and interfaces are original. Third-party customer logos, testimonials, performance claims, and application screenshots are not reused.

## Implementation

`site/enterprise.mjs` renders the home, service overview, three service detail pages, construction specialty page, approach, and shared closing. `assets/enterprise.css` defines the visual system. `assets/enterprise.js` controls decorative video playback. Existing reporting, resource, company, and inquiry pages share the updated navigation and presentation.

The home and construction page use actual self-hosted video. Playback is muted and looped, with an explicit pause/play control. The video pauses offscreen and in a hidden document. Reduced motion and the browser's Save-Data signal prevent automatic video loading. Posters and content remain available without scripts and if autoplay is blocked. The footage is illustrative stock and does not portray BundleBoB staff or clients.

The construction walkthrough uses synthetic data. Dedicated AI, custom software, and integration pages provide capabilities, delivery criteria, and keyboard-operable FAQs. No credentials, platform integrations, or customer outcomes are implied by the illustrations.

## Local routes

17 pages, including `/services/ai-solutions`, `/services/custom-software`, `/services/integrations`, and `/construction`. Run `npm start`, then visit http://127.0.0.1:8080.

## Launch inputs

A verified monitored contact address and approved project evidence have been requested. Until supplied, inquiries are prepared locally for download and construction work is presented as a demonstration. Build and preview do not publish the site.
