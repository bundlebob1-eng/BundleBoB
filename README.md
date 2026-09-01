# BundleBoB — marketing site (static)

Public-facing site for BundleBoB: **one Forward Deployed Engineer (also known as
an AI Integrator)** placed inside a mid-market commercial general contractor to
connect its systems (Procore, Sage 300 CRE, Foundation, Viewpoint Vista, CMiC,
QuickBooks, spreadsheets), then build the layer on top that shows where margin
is leaking — **Capture → Control → Intelligence, in that order**. A headcount
line, not a software subscription. Advisory, not autonomous.

## What this is

A **static HTML site**. No build step, no framework, no backend. Page content
is plain HTML; all styling is in `assets/site.css` and all behaviour in
`assets/site.js` (one dependency-free IIFE). Only Google Fonts (Archivo, IBM
Plex Sans, IBM Plex Mono) load from a CDN.

> This is the third design of the site. It adopts a pasted static template
> (`bundlebobsite/`, O.C. Tanner–inspired) for structure and design system;
> every page's copy was rewritten to the BundleBoB FDE positioning and the
> honesty rules below. The earlier Nexora-template and Next.js versions are
> gone.

### Design system

- Tokens: `--paper #F0EEE7`, `--ink #14161B`, `--indigo #1E2A78`,
  `--amber #F0A03C`, `--muted #63666F`.
- Type: Archivo (display, 700–800), IBM Plex Sans (body), IBM Plex Mono
  (eyebrows / data).
- Three-state theming: bare `:root` is the light palette; dark is redefined
  under `@media (prefers-color-scheme: dark)` guarded `:root:not([data-theme="light"])`
  and again under `:root[data-theme="dark"]`.
- Fixed dark floating nav island; `.rv` scroll-reveal with a `<noscript>`
  fallback and a `setTimeout` failsafe in `site.js` so a JS error can never
  leave the page blank.

## Run locally

```bash
python3 -m http.server 8080     # then open http://localhost:8080
```

Deployed on Vercel (`vercel.json`: `framework: null`, `cleanUrls: true`,
`trailingSlash: false`, `outputDirectory: "."`, no install/build step).
`cleanUrls` is why internal links are extensionless (`/platform`, not
`/platform.html`).

## Pages

| File | Route | Purpose |
|---|---|---|
| `index.html` | `/` | Home — the arc, self-select block, honest state |
| `platform.html` | `/platform` | The Arc in detail — Capture / Control / Intelligence, why one FDE |
| `integrations.html` | `/integrations` | Systems we connect — priority vs. on-request, nothing in production yet |
| `services.html` | `/services` | The engagement — what the FDE does, priced against a hire |
| `compare.html` | `/compare` | Why an FDE vs. hire-your-own / SaaS / consultancy; **Security & data** section (`#security`) |
| `resources.html` | `/resources` | Notes — planned topics, nothing published |
| `article.html` | `/article` | One note *outline* ("What breaks when you sync Vista and Procore"), labelled not-published |
| `client-story.html` | `/client-story` | Proof — honest "no named client yet, pre-pilot" |
| `about.html` | `/about` | About — why one embedded engineer; bios/entity not published yet |
| `demo.html` | `/demo` | Contact — holding page, no form, "a direct channel isn't open yet" |

`/demo` is intentionally kept out of the header/footer nav until a monitored
inbox exists; it is reachable from the "Talk to us" buttons.

## Honesty rules (the site is a demo, not in commercial use)

Every page footer reads **"© 2026 BundleBoB. Demo site — not in commercial
use."** While that label is up, the site must contain **no fabricated facts**:
no invented names, prices, dates, client counts, certifications, testimonials,
case studies, or specific technical claims presented as fact. Where something
does not exist yet, the page says so plainly ("not published yet", "pre-pilot",
"design intent — not yet in place").

Current honest "not yet" states:

- **`client-story.html`** — no named client; pre-pilot; no published figures.
- **`index.html` / `services.html` / `compare.html`** — "We
  don't have testimonials yet."
- **`resources.html` / `article.html`** — "nothing published yet"; the article
  is an *outline* describing design intent, not a report from a deployment.
- **`about.html`** — team bios, legal entity name + US state, team/client
  location: not published yet.
- **`integrations.html`** — every system is "Priority" (first wave to build) or
  "On request"; nothing is running in production.
- **`compare.html` → Security & data** — split into "In place now" vs. "Design
  intent — not yet in place". SOC 2 / SSO / SCIM / audit logging / pen testing /
  named entity are all in the second column. Do not move an item to the first
  column until it is implemented and checkable.
- **`demo.html`** — no working form; no public inbox; company details withheld
  until on record.
- **`.mock` UI blocks** are `aria-hidden` illustrations of what the product
  would look like — not screenshots of real client data.

**`LAUNCH-CHECKLIST.md`** is the single list of what must become real before the
"Demo site — not in commercial use" label may be removed.

## Pre-deploy check (every deploy)

```sh
grep -rn "REPLACE\|TO CONFIRM\|Placeholder attribution" *.html   # must be zero
grep -rn 'href="#"' *.html                                       # must be zero
grep -rn "<form" *.html                                          # must be zero
grep -rn 'href="[a-z-]*\.html"' *.html                           # must be zero (cleanUrls)
```
