# BundleBoB — marketing site (static)

Public-facing site for BundleBoB: **one Forward Deployed Engineer (also known as
an AI Integrator)** placed inside a mid-market commercial general contractor to
connect its systems (Procore, Sage, Foundation, QuickBooks, spreadsheets), then
build the layer on top that shows where margin is leaking — **Capture → Control
→ Intelligence**. A headcount line, not a software subscription.

## What this is

A **static HTML site**, built on the Nexora Bootstrap 5 template
([ThemeWagon](https://themewagon.com/), MIT licence). No build step, no
framework, no backend. Just HTML + `css/custom.css` + `js/main.js`, with
Bootstrap, Bootstrap Icons and Google Fonts loaded from CDNs.

> This replaced an earlier Next.js version of the site. The template's original
> style and UI are kept as-is; only the text content was rewritten to BundleBoB.

## Run locally

```bash
python3 -m http.server 8080     # then open http://localhost:8080
```

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home — the arc, who it's for, integration posture |
| `about.html` | Why one FDE; the harvest loop; team (placeholder) |
| `services.html` | The Arc — Capture / Control / Intelligence overview |
| `service-details.html` | The Arc in detail, with example deliverables |
| `pricing.html` | Priced against a hire, not a project |
| `portfolio.html` | Work — illustrative engagement scenarios by stage |
| `portfolio-single.html` | A first engagement, walked through (demo) |
| `blog.html` | Notes — planned field-note topics (nothing published) |
| `blog-details.html` | One note outline (demo) |
| `security.html` | Security & data — posture, plainly, including gaps |
| `contact.html` | Holding page — no public inbox yet |

## Demo / placeholder content — replace before any commercial launch

This is a **design demo on a domain that is not in commercial use**. The
following are on-brand placeholders, not real facts, and must be replaced with
real, named, checkable content before the site is used commercially:

- **`index.html`** — the testimonial cards ("Name on approval", placeholder
  avatars). Real quotes go in only once a named client approves the wording.
- **`portfolio.html` / `portfolio-single.html`** — labelled "illustrative" /
  "demo content". No named client, no measured results.
- **`blog.html` / `blog-details.html`** — labelled "nothing published yet".
- **`about.html`** — founder / FDE bio, entity name + US state, team location.
- **`contact.html`** — real inbox + reply time; then re-add `/contact` to the
  nav (it is intentionally omitted from the header/footer nav until then).
- **`security.html`** — the isolation model, encryption specifics, hosting
  region, model providers and SOC 2 / pen-test / BAA status should be confirmed
  by whoever owns the infrastructure before they are treated as commitments.
- **Newsletter / contact forms** submit nowhere (template demo behaviour).

## Deploy

Static hosting. `vercel.json` sets `framework: null` with no build step and
serves the repo root.
