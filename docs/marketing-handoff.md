# BundleBoB — marketing design handoff

## Final direction: ink, ivory and orange

The latest owner feedback supersedes the earlier green and purple directions. The palette follows the current [O.C. Tanner](https://www.octanner.com/) reference, measured in its live styles. BundleBoB keeps its own human-led, cross-industry service positioning and real construction client story. Typography remains locally hosted Outfit.

| Role | Color | Use |
| --- | --- | --- |
| Near black | `#1B1C1E` | Text and dark sections |
| Black | `#000000` | Navigation and footer |
| Off-white | `#F7F7F3` | Reading surfaces |
| Orange | `#FF5A00` | Light-page actions and progress |
| Light neutral | `#F0F0EA` | Supporting panels |

White buttons on dark photography keep primary actions clear. Natural greens in photographs remain; the interface no longer uses green as its brand accent.

## Visible changes

- **Logo:** replaced the block B with an original SVG mark of three bundled work cards. Lowercase `bundlebob` wordmark, matching favicon, footer and social share image.
- **Navigation:** restored the wider desktop bar, capped at 1,440px and 88px high, with 17px navigation text and roomier padding. Mobile navigation begins at 1,100px to avoid squeezing the links. Mobile bar is 64px high.
- **Scrolling:** the whole page follows the document. The pinned workflow, scroll-selected steps and rotating paper surfaces are removed. One compact supplier-invoice sequence reads left to right on desktop and top to bottom on phones. It works without JavaScript.
- **Services:** three full-width photographic features follow one another vertically. Desktop alternates photography and solid text panels; tablet and phone put the image above the copy. Every service has a direct link and a short application example. There are no sideways tracks, selectors, hidden services or expandable rows.
- **Reading order:** hero → services → genuine client story → compact workflow → embedded engineer → everyday work → industries → contact. Repeated process copy is removed.
- **Reference review:** O.C. Tanner’s live homepage was rechecked for large type, generous spacing and photography beside clear text. Briq was rechecked for explicit offerings and its delivery narrative. Those observations inform the layout; BundleBoB retains its own positioning and claims.
- **Plain language:** the homepage leads with reducing paperwork, connecting teams and improving everyday work. Technical service details remain available on their dedicated pages.
- **Proof:** the genuine mechanical/HVAC client story remains intact and is linked from the service pages. Orange and ivory distinguish proof from the main service sections.

## Retained finishing work

- Sharp, flat HTML service diagrams; no blurred miniature text.
- Mobile video variants, scroll-up navigation, mobile menu scroll lock/restore, stable walkthrough controls and unique descriptions for 20 pages.
- High-resolution hero variants are framed for desktop, portrait phone and portrait iPad. Lower films now use actual licensed footage; posters match their opening frames. Neither footage nor photos are presented as the client’s employees.
- Clear paragraph spacing, repaired About layout and distinct form errors.
- Internal design pages excluded from normal production builds.

## Report recommendations deliberately not followed

- Do not reintroduce the visible film controls the owner explicitly removed. Reduced motion and Save-Data remain respected. The automated accessibility results are not a claim of full WCAG conformance; the moving-content concern raised by the report remains a known tradeoff.
- Do not relabel delivered client work as fictional or pre-pilot, or invent screenshots, savings, dates, testimonials, legal entity information or jurisdiction.
- Do not collapse eight FDE responsibilities into four stages. These describe different things: responsibilities within the Discover → Design → Build → Evolve process.
- Keep broad industry coverage and construction expertise. Potential applications remain distinct from delivered client work.

## Contact and business details

The owner confirmed **contact@bundlebob.com**. It is configured as the default public contact address in the build, footer, contact page and privacy contact. The enquiry builder prepares an email to that inbox; visitors review and send it in their own mail application. No message is submitted automatically and no test email was transmitted.

Legal entity name/location remains an owner input. No entity or jurisdiction has been invented. The genuine client story does not rely on invented savings, testimonials or product screenshots.

## Verification and limits

The final pass expands the site review to desktop, phone and both tablet widths. Chrome and WebKit checks cover playback, rotation, offscreen resume, sharp text, natural scrolling, service links and reduced-motion behavior. Every public page is checked for off-palette saturated interface colors. Results are recorded in `docs/verification.md`; current scrolling screenshots are in `audit/scrolling/`; earlier media results remain in `audit/final-patch/`.

Physical iPhone/iPad/Android hardware was not available. Browser emulation is not a physical-device test. Automated accessibility scans are not a full conformance assessment. No enquiries were transmitted.

## Final quality and competitor review

See [final-quality-review.md](final-quality-review.md) for the Briq comparison, exact media changes, motion corrections and release checks. This handoff supersedes the pinned-workflow and service-carousel layout from PR #42.
