# BundleBoB — marketing site

Public site for BundleBoB. The offer is a single role: one **Forward Deployed
Engineer (FDE)** — also known as an **AI Integrator** — placed inside a
mid-market commercial general contractor to connect its systems (Procore, Sage,
Foundation, QuickBooks, spreadsheets), then build the layer on top that shows
where margin is leaking — **Capture → Control → Intelligence**. A headcount
line, not a software subscription.

This repo is **the marketing site only**. It is a static Next.js site with no
backend, database, auth, or integrations.

## Stack

- Next.js 13 (App Router), React 18, TypeScript
- Tailwind CSS 3
- System font stack (Georgia for display, system-ui for text) — no web fonts
- Deploys as a static/SSG Next.js app

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Pages

| Route            | Purpose |
|------------------|---------|
| `/`              | The arc and the headcount-not-software framing |
| `/how-it-works`  | Capture / Control / Intelligence in detail |
| `/pricing`       | Engagement model, priced against hiring your own data/analytics engineer |
| `/proof`         | Honest statement of stage; no manufactured social proof |
| `/security`      | Data isolation, encryption, access, and what is not in place yet |
| `/about`         | Who is doing the work |
| `/contact`       | Direct email |

## Unverified facts — read before launch

Anything not yet confirmed is wrapped in the `<Pending>` component
(`components/Pending`) and renders on the page as a conspicuous
`[ TO CONFIRM: ... ]` marker. **The site must not go live with any `Pending`
marker still rendering.** Find them all:

```bash
grep -rn "Pending" app components
```

Each one needs a real value: company email, legal entity name and state,
founder/engineer names and construction background, pilot status, and the
concrete security posture (isolation model, encryption specifics, access policy,
SOC 2 status, offboarding terms).

## Deliberately absent

No blog, no careers page, no case-studies section, no legal/privacy pages —
nothing that exists only to look complete. Add them when there is something real
to put there, and only link them once the page exists.
