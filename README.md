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
| `/contact`       | Holding page — no public channel yet (unlinked from nav) |

## Facts still to fill in with real values

The site now ships with honest "not yet published" copy anywhere a real fact is
missing. Nothing is fabricated. When the operator has real values, replace the
holding copy in these places:

- **`company_email`** — no inbox yet. `/contact` is a holding page and is
  removed from the header/footer nav and the header CTA until a real address
  exists. Restore the nav entries + the real `mailto:` on `/contact` when it does.
- **`entity_name_and_state`** — footer + `/about` + `/contact` "company details".
- **`founder_background`** — `/about` and `/proof` (keep in sync).
- **`current_stage` / pilot status** — hero stage line + `/proof`.
- **`team_location`**, **`reply_time`**, **`stage_timeline`**.
- **`monthly_fee`**, **`hire_fully_loaded_cost`** — `/pricing` (numbers only from
  the operator).
- **Security specifics** — `/security` states principles + "shared on request";
  the isolation model, encryption versions, hosting region, model providers, and
  SOC 2 / pen-test / BAA status should be confirmed by whoever owns the infra
  before they are treated as commitments.

Verify before every deploy: `grep -rn "TO CONFIRM" .next` returns nothing.

## Deliberately absent

No blog, no careers page, no case-studies section, no legal/privacy pages —
nothing that exists only to look complete. Add them when there is something real
to put there, and only link them once the page exists.
