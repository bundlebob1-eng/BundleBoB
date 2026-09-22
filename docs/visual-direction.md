# BundleBoB reference-led draft

This iteration continues the implementation at `86eaaff`. The user requested O.C. Tanner’s structure, typography, and visual style with BundleBoB’s business context, and approved close open fonts for this draft.

Reference inspected: https://www.octanner.com/ on 21 September 2026. Screenshots and computed-style observations are local review evidence in `audit/reference/`, excluded from deployment. The reference’s source code, commercial font files, photographs, customer logos, testimonials, and certification claims are not part of this implementation.

## Structure and visual decisions

| Reference pattern | BundleBoB implementation |
|---|---|
| Floating black navigation, rounded container, disclosure menus | Product, Solutions, Why BundleBoB, Resources, Company, theme control, and contact action |
| Full-bleed visual hero, large geometric heading, paired actions | Generated workshop scene; “Because every job should add up.”; platform and contact actions |
| Narrow gradient and logo strip | Gradient followed by four industry links, without implying customer endorsements |
| Large image-led product rail with inset UI | Job profitability, WIP, reconciliation, and operational reporting, with illustrative HTML report details |
| Gradient section linking business goals to solutions | Four real links into the existing platform explanation |
| Spacious impact section with staggered serif figures | Clearly identified synthetic example: two sources, $11,850 difference, one review step, nightly rhythm |
| Black section with selectable stories and photography | Keyboard-operable industry examples, with four panels and source-preserving scenarios |
| Supporting product and comparison sections | Existing scroll diagram, original eight-second reconciliation video, and approach comparison |
| Editorial resource grid | Three existing guides, with one larger lead article |
| Gradient closing panel and multi-column dark footer | Contact action, illustrative field-service image, and complete page/industry/resource navigation |

The same navigation, typography, palette, buttons, spacing, footer, and closing treatment apply to all eleven existing routes. The homepage uses a still photographic hero. The existing generated MP4/WebM walkthrough remains unchanged and appears on the homepage and How It Works page.

## Fonts and assets

- **Montserrat** replaces the reference’s Gotham SSm for this approved draft. Locally hosted variable WOFF2, weights 300–700; license in `assets/fonts/Montserrat-OFL.txt`.
- **Roboto Slab** fills the reference’s Sentinel role for large figures and industry-story headings. Locally hosted variable WOFF2, weights 400–500; license in `assets/fonts/Roboto-Slab-LICENSE.txt`.
- Native monospace remains in small identifiers and authored product diagrams.
- CSS and markup were authored for this repository. No reference-site scripts or stylesheets are shipped.
- Three AI-generated business scenes are stored in `assets/images/`, with compressed WebP versions and 768px variants. Full prompts and generation method are in `docs/image-prompts.md`.
- The hero’s full WebP is 87,336 bytes; a 38,740-byte portrait crop serves phones. Original JPEG conversions are retained as source assets. No image or font request leaves the site’s origin.
- The original video files and PNG poster remain intact. A 23,272-byte lossless WebP copy of the poster is used by the player to reduce page transfer.
- `scripts/render-share-image.mjs` renders the updated 1200×630 social preview independently of the original video renderer.

## Implementation

- `site/editorial.mjs`: homepage, navigation, closing panel, footer.
- `assets/editorial.css`: reference-led presentation over the existing shared component styles.
- `assets/site.js`: accessible disclosure-menu coordination and industry tabs, alongside existing interactions.
- `site/pages.mjs`: existing supporting pages use the new shared presentation.
- `scripts/editorial-check.mjs`: new interaction checks and screenshots at seven widths, in addition to the existing full-site checks.

The static builder embeds the shared CSS into each page to avoid stylesheet round trips and preloads both local font families. It still copies the standalone stylesheets for inspection and the design documentation.

The contact flow still prepares a local downloadable inquiry. An actual monitored inbox or booking destination is needed to configure its delivery route. There are no new customer, security-certification, or measured commercial-outcome claims.
