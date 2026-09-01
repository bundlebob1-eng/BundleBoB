# Before "Demo site — not in commercial use" comes off

The footer on every page reads:

> © 2026 BundleBoB. Demo site — not in commercial use.

**Do not remove that label until every item below is a real, checkable fact —
not a placeholder statement, not a stated intent.** Each one currently resolves
to an honest "not yet" somewhere on the site.

## Blocking facts

- [ ] **Forward Deployed Engineer / founder** — real name and a checkable
      construction-operations + data-engineering background, with a profile
      link. (Currently: `about.html` says bios are published "before we ask
      anyone to sign".)
- [ ] **Legal entity** — registered name, structure, US state of registration,
      year formed. (Currently: `about.html` and `demo.html` say "not published
      yet".)
- [ ] **Team / client location** — where the team and first clients are based.
      (Currently: `about.html` "not published yet".)
- [ ] **Pricing mechanism** — a real fee, or a stated, honest method for
      arriving at one. (Currently: `services.html` says "priced against a single
      mid-level hire… exact figures set with you, not published here yet".)
- [ ] **Monitored inbox** — a real email address a person reads, plus a
      reply-time that can be held to. Then re-add `Contact` to the header/footer
      nav (currently intentionally omitted). (Currently: `demo.html` "a direct
      channel isn't open yet"; no form on the page.)
- [ ] **Security posture — verified, not described** — on `compare.html` →
      Security & data, each item under "Design intent — not yet in place" moves
      to "In place now" only once it is actually implemented and testable
      against a real client environment: per-tenant isolation, encryption
      specifics (TLS version, at-rest cipher, key management, hosting region),
      SSO/SAML, SCIM, role-based access, field-level audit logging, independent
      penetration testing, published data-flow diagram, DPA, stated data
      residency, and any third-party audit (e.g. SOC 2).
- [ ] **Integrations** — on `integrations.html`, a system's status changes from
      "Priority" / "On request" to a real "Connected" state only when a
      connector is actually running against that system in production.
- [ ] **First named engagement** — at least one real client whose work can be
      written up on `client-story.html` (currently "no named client yet —
      pre-pilot") and, with their approval, quoted wherever the site now says
      "We don't have testimonials yet".
- [ ] **Notes** — `resources.html` / `article.html` carry real published
      pieces, written from real deployments, instead of "nothing published yet"
      and an outline labelled design-intent.

## Pre-deploy check (every deploy, demo or not)

```sh
grep -rn "REPLACE\|TO CONFIRM\|Placeholder attribution" *.html   # must be zero
grep -rn 'href="#"' *.html                                       # must be zero
grep -rn "<form" *.html                                          # must be zero
grep -rn 'href="[a-z-]*\.html"' *.html                           # must be zero (cleanUrls)
```
