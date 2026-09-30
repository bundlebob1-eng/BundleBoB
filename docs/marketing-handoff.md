# BundleBoB — marketing design handoff

## Direction: charcoal, ivory, sage and bright green

Keep the approved brand and sharpen its execution. The independent review included the live BundleBoB site, the supplied 37-page review, and fresh browser inspection of [O.C. Tanner](https://www.octanner.com/) and [Avathon](https://avathon.com/). The reference lesson is a clear visual hierarchy, human-scale photography and a limited accent palette; BundleBoB’s message remains a human-led service business across industries.

| Role | Color | Use |
| --- | --- | --- |
| Charcoal | `#202722` | Navigation, text, dark sections |
| Warm ivory | `#F7F6F2` | Main page background |
| Sage | `#B6C9A8` | Borders and supporting detail |
| Pale sage | `#E5EEDC` | Service boards and proof surfaces |
| Bright green | `#C7ED8A` | Primary actions and active selections |
| Error | `#A12E24` | Invalid fields, with text and an icon |

Typography remains locally hosted Outfit. No new font or third-party runtime dependency was introduced.

## Verified findings and changes

- **Soft service cards:** the live service diagram had a `matrix3d` transform even with reduced motion enabled. Replaced rotated, miniature previews with flat HTML diagrams, larger labels, solid backgrounds and clean borders. Removed redundant diagrams from service overview photo cards. Removed blur from homepage workflow disclosures.
- **Color drift:** legacy `!important` button rules overrode the approved bright green. Removed those rules and unified primary actions. Removed an old gradient override hiding the intended closing-section photography.
- **Video captions:** the lower films contained captions in their actual frames. Re-rendered both without text or miniature UI graphics; the explanation stays in HTML. These remain photographic motion illustrations made from the existing campaign assets, not footage of client employees.
- **Mobile video:** added four 720p mobile variants. The hero is about 1.6 MB; each lower film is about 1 MB. Mobile sources load instead of the desktop versions. Desktop hero edit is unchanged.
- **Scrolling:** native scrolling remains. Navigation reveals immediately on upward movement and after downward movement settles. Added a thin reading-progress line and small, once-only section entrances. Mobile menus lock the page and restore its previous position.
- **Depth:** the decorative outline behind the client-story summary responds subtly to a fine pointer. Foreground text is never tilted or transformed. Touch devices and reduced-motion visits get a static treatment. No WebGL, scroll capture, pinned scenes or continuous animation loop.
- **Interaction:** corrected last-card selection in the services carousel; moved walkthrough controls above changing panels so they do not jump.
- **Copy and proof:** retained the real client story; added contextual links from all four service pages; removed stale formation/in-preparation badges without inventing legal status. Added a short, specific hero subline. Corrected “applied AI”.
- **Editorial quality:** added paragraph spacing, fixed the About page’s empty column, replaced the blank logo block with an intentional brand panel, reduced guide reading width, and made form errors visually distinct.
- **Search and production:** unique descriptions across all 20 public pages; internal `/system` is emitted only for an explicit design-lab build. Production `/system` and `/theme-lab` return 404.

## Report recommendations deliberately not followed

- Do not reintroduce the visible film controls the owner explicitly removed. Reduced motion and Save-Data remain respected. The automated accessibility results are not a claim of full WCAG conformance; the moving-content concern raised by the report remains a known tradeoff.
- Do not relabel delivered client work as fictional or pre-pilot, or invent screenshots, savings, dates, testimonials, legal entity information or jurisdiction.
- Do not collapse eight FDE responsibilities into four stages. These describe different things: responsibilities within the Discover → Design → Build → Evolve process.
- Keep broad industry coverage and construction expertise. Potential applications remain distinct from delivered client work.

## Marketing release dependencies

**A public enquiry destination is still missing.** The current contact flow prepares a download. It cannot receive a new lead. A monitored email or booking URL is required; the owner has been asked. Do not promote the site as a working inbound lead channel until configured and checked.

Legal name/location and privacy contact are owner inputs, not facts to fabricate. The owner has been asked for them. Real anonymised product screenshots can strengthen the case study, but none were supplied; no invented product screenshots have been added.

## Verification and limits

Targeted browser checks cover 320, 390, 1024 and 1440px, every carousel selector, sharp service diagrams, consistent CTA color, stable tour controls, scroll-up navigation, mobile scroll lock/restore, reduced-motion depth fallback, unique descriptions, and mobile-only video requests. No browser errors.

Accessibility scan: 48 route/preference checks, no reported violations. The subsequent closing-photo correction is separately rechecked. Film decoding/playback tests and the complete site browser review are recorded in `docs/verification.md` and `audit/owner-review/`.

Mobile checks use Chromium device emulation. A physical iPhone/Safari or Android device was not available. No enquiries were transmitted. No customer data, source PDF editorial notes, or invented customer imagery is published.
