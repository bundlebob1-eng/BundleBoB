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

This is a **design demo on a domain that is not in commercial use**. Every gap
is disclosed honestly on the page itself (no `[ TO CONFIRM ]` brackets):

- **`index.html`** — "We don't have client testimonials yet"; the Work preview
  shows the *shape* of an engagement with no week numbers.
- **`portfolio.html` / `portfolio-single.html`** — labelled "illustrative" /
  "demo content". No named client, no measured results.
- **`blog.html` / `blog-details.html`** — labelled "nothing published yet".
- **`about.html`** — founder / FDE bio, entity name + US state, team location.
- **`contact.html`** — real inbox + reply time; then re-add `Contact` to the
  nav (it is intentionally omitted from the header/footer nav until then).
- **`security.html`** — every card states whether it is an implemented control
  or a **design intent not yet validated against a real client**. Do not
  upgrade a card to a present-tense fact until it actually is one.
- **Newsletter / contact forms** submit nowhere (template demo behaviour).

**`LAUNCH-CHECKLIST.md`** is the single list of what must become real before the
"Demo site — not in commercial use" footer label may be removed.

## Deploy

Static hosting. `vercel.json` sets `framework: null` with no build step and
serves the repo root.
