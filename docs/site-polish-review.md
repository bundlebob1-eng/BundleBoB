# September 29 — site-wide review

The approved homepage structure remains. The hero MP4 is unchanged. Three new generated HD images are used as service-card and lower-page backgrounds, not standalone image tiles. The logo is now a single-color native SVG monogram; matching assets are `assets/logo.svg` and `assets/favicon.svg`.

## Shared behavior

- One art-directed appearance: charcoal, warm ivory, muted sage. No night-mode button or stored theme preference.
- Navigation hides during page scrolling and returns after 240ms without scrolling. Keyboard focus and an open menu keep it available. Reduced motion removes its transition.
- No floating “Pause film” control. Decorative videos loop continuously while visible and resume after returning onscreen. Reduced-motion and data-saving visits keep the poster. The underlying hero edit remains unchanged.
- Workflow films autoplay silently and loop while visible, without watch buttons or imagery captions. They pause when offscreen or the tab is hidden, with the same poster fallback preferences as the hero.
- Service selectors, keyboard navigation, native horizontal scrolling, and expandable workflow examples add useful interaction. The scrollbar is hidden visually; buttons and keyboard access remain.
- Closing sections use large photographic backgrounds with readable overlays. Decorative layered logo artwork and neon gradients are retired from the visible design.

## Page review

| Page | Review / adjustment |
| --- | --- |
| `/` | New service backgrounds, selector, workflow disclosures, FDE background, two motion illustrations, and photographic closing. |
| `/services` | New service imagery and shared sage/ivory treatment; all three capabilities remain explicit. |
| `/services/ai-solutions` | Human review, uncertainty, source context, and scoped evaluation stay explicit. FAQ and delivery links checked. |
| `/services/custom-software` | Applications and workflows described around users, process, and agreed acceptance. |
| `/services/integrations` | Existing-system access, exception handling, and maintenance remain scoped. |
| `/construction` | Construction remains a specific example. Synthetic walkthrough and keyboard-accessible tour retained. Background preview controls removed. |
| `/approach` | Discovery, design, build, and improvement remain tied to direct FDE engagement. |
| `/how-it-works` | Reframed as a construction demonstration; removed blanket nightly-service and weekly-finance-review claims. |
| `/solutions` | Thirteen sectors; examples are possible applications rather than claimed client results. |
| `/forward-deployed-engineering` | Eight responsibilities and five-step illustrative engagement retained. No invented client endorsement. |
| `/why-bundlebob` | Rewritten introduction and engagement copy for the broader service business. Removed fixed monthly platform model and automatic IP ownership claims. |
| `/resources` | Broader operational framing; the three current guides are identified as project/finance examples. Search verified. |
| `/resources/when-systems-disagree` | Source/timing/mapping distinctions remain useful beyond the construction example. |
| `/resources/wip-review` | Explicit project-finance checklist, kept within that domain. |
| `/resources/mapping-first` | Removed unqualified platform ownership/support wording; responsibilities follow the engagement scope. |
| `/about` | Cross-industry services, direct engineer relationship, and pre-pilot disclosure retained. |
| `/contact` | Business-problem inquiry, validation, and local download tested. No claim of backend delivery. |
| `/privacy` | Updated to reflect removal of stored theme settings. Hosting text distinguishes deployment configuration. |
| `/terms` | Media description includes generated imagery and illustrative workflow films. |
| `/system` | Updated palette, typography, background-video behavior, and native scrolling guidance. Noindex retained. |

Verification evidence: `audit/browser-results.json`, `audit/accessibility.json`, `audit/polish/`, and `audit/screenshots/`. Desktop and mobile page boards are in `audit/polish/all-pages-1440.png` and `audit/polish/all-pages-390.png`.

Generated media provenance, prompts, exact dimensions, and reproduction: [generated-campaign-assets.md](generated-campaign-assets.md). The new films animate generated still imagery and graphics; they do not synthesize moving actors. They are labeled as illustrative in the page.
