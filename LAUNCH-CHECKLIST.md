# Before "Demo site — not in commercial use" comes off

The footer on every page reads:

> © 2026 BundleBoB. Demo site — not in commercial use. Built on the Nexora
> template (ThemeWagon, MIT).

**Do not remove that label until every item below is a real, checkable fact —
not a placeholder statement, not a stated intent.** Each one currently resolves
to an honest "not yet" somewhere on the site.

## Blocking facts

- [ ] **Founder / Forward Deployed Engineer** — real name and a checkable
      construction-operations + data-engineering background, with a profile link.
      (Currently: `about.html` and `blog-details.html` say "name on publish".)
- [ ] **Legal entity** — registered name, structure, US state of registration,
      year formed. (Currently: `about.html` and `contact.html` say "not published
      yet".)
- [ ] **Team / client location** — where the team and first clients are based.
      (Currently: `about.html` "not published yet".)
- [ ] **Pricing mechanism** — a real monthly fee, or a stated, honest method for
      arriving at one. (Currently: `pricing.html` FAQ explains why no number is
      shown; that stays until there is a real answer.)
- [ ] **Monitored inbox** — a real email address that a person reads, plus a
      reply-time that can actually be held to. Then re-add `Contact` to the
      header/footer nav (it is intentionally omitted). (Currently: `contact.html`
      "a direct channel isn't open yet".)
- [ ] **Security posture — verified, not described** — for each card on
      `security.html`, the "design intent / not yet validated" wording is
      replaced with a present-tense fact only once that control is actually
      implemented and testable against a real client environment: per-firm
      storage + credentials, encryption specifics (TLS version, at-rest cipher,
      key management, hosting region), the client-reviewable access log, model
      provider choices + retention, and the offboarding export/deletion process.
- [ ] **First named engagement** — at least one real client whose work can be
      described on `portfolio.html` (currently "illustrative" scenarios) and,
      with their approval, quoted on the home page (currently "we don't have
      client testimonials yet").

## Pre-deploy check (every deploy, demo or not)

```sh
grep -rn "TO CONFIRM" *.html                     # must be zero
grep -rn "placeholder\|Placeholder" *.html       # only where a gap is being
                                                 # deliberately disclosed
```
