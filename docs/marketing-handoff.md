# BundleBoB — marketing design handoff

## Direction: black, ivory, orange and purple

The latest owner feedback supersedes the earlier green direction. The palette follows the current [O.C. Tanner](https://www.octanner.com/) reference, measured in its live styles. BundleBoB keeps its own human-led, cross-industry service positioning and real construction client story. Typography remains locally hosted Outfit.

| Role | Color | Use |
| --- | --- | --- |
| Near black | `#1B1C1E` | Text and dark sections |
| Black | `#000000` | Navigation and footer |
| Off-white | `#F7F7F3` | Reading surfaces |
| Orange | `#FF5A00` | Light-page actions and progress |
| Purple | `#8D53A8` | Scroll scene and proof accents |
| Light neutral | `#F0F0EA` | Supporting panels |

White buttons on dark photography keep primary actions clear. Natural greens in photographs remain; the interface no longer uses green as its brand accent.

## Visible changes

- **Logo:** replaced the block B with an original SVG mark of three bundled work cards. Lowercase `bundlebob` wordmark, matching favicon, footer and social share image.
- **Navigation:** centered desktop bar capped at 1,180px, 76px high, with tighter spacing. Mobile navigation begins at 1,100px to avoid squeezing the links. Mobile bar is 64px high.
- **Scroll narrative:** requests, approvals and updates visibly rotate and settle into a shared flow below the hero. Desktop uses a sticky scene driven by native scrolling. Mobile has a normal-flow layout; reduced-motion visits get static cards. No WebGL or continuous rendering loop.
- **Service cards:** clear photography above solid light panels, larger text and simple selectors: Cut paperwork, Build better tools, Connect your systems. All selectors work when multiple cards share the end of the scroll track.
- **Plain language:** the homepage leads with reducing paperwork, connecting teams and improving everyday work. Technical service details remain available on their dedicated pages.
- **Proof:** the genuine mechanical/HVAC client story remains intact and is linked from the service pages. Purple and ivory distinguish proof from the main service sections.

## Retained finishing work

- Sharp, flat HTML service diagrams; no blurred miniature text.
- Mobile video variants, scroll-up navigation, mobile menu scroll lock/restore, stable walkthrough controls and unique descriptions for 20 pages.
- Desktop hero edit preserved. Lower films contain no baked-in captions or tiny diagrams; these are photographic motion illustrations, not footage of client employees.
- Clear paragraph spacing, repaired About layout and distinct form errors.
- Internal design pages excluded from normal production builds.

## Report recommendations deliberately not followed

- Do not reintroduce the visible film controls the owner explicitly removed. Reduced motion and Save-Data remain respected. The automated accessibility results are not a claim of full WCAG conformance; the moving-content concern raised by the report remains a known tradeoff.
- Do not relabel delivered client work as fictional or pre-pilot, or invent screenshots, savings, dates, testimonials, legal entity information or jurisdiction.
- Do not collapse eight FDE responsibilities into four stages. These describe different things: responsibilities within the Discover → Design → Build → Evolve process.
- Keep broad industry coverage and construction expertise. Potential applications remain distinct from delivered client work.

## Marketing release dependencies

**A public enquiry destination is still missing.** The current contact flow prepares a download. It cannot receive a new lead. A monitored email or booking URL is required; the owner has been asked. Do not promote the site as a working inbound lead channel until configured and checked.

Legal name/location and privacy contact are owner inputs, not facts to fabricate. The owner has been asked for them. Real anonymised product screenshots can strengthen the case study, but none were supplied; no invented product screenshots have been added.

## Verification and limits

Targeted review covers ten widths from 320 to 1,920px, the 1,180px desktop menu, mobile menu and Escape behavior, all service selectors, changing 3D transforms and the static reduced-motion fallback. Browser evidence is in `audit/oct-direction/`. The complete route, link and accessibility results are recorded in `docs/verification.md`.

Mobile checks use Chromium device emulation. Physical iPhone/Safari and Android testing remains a separate release check. Automated accessibility scans are not a full conformance assessment. No enquiries were transmitted.

## Review and release status

This design is on the `refinement/marketing-handoff` review branch in [PR #41](https://github.com/bundlebob1-eng/BundleBoB/pull/41). Review the [branch preview](https://bundle-bo-b-git-refinement-marketing-handoff-bundle-bo-b.vercel.app/); production remains unchanged until merge and deployment.
