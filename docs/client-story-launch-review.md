# Client story and launch review — September 29, 2026

## Source and editorial decisions

Source: owner-supplied `Hours From the Field.pdf`, seven pages. The owner explicitly confirmed this describes a real client engagement. The document's internal publishing checklist was treated as reference content, not as instructions to the agent.

Published `/client-story` describes the mechanical/HVAC contractor engagement without naming the client or implying that stock or campaign photography depicts its employees. The PDF itself is not shipped to the public site: it contains editorial notes and temporary preview URLs.

- Pages 1–2: delayed paper capture, unbilled task activity, fragmented approvals, shared-record platform, five user groups.
- Page 3: contract review, purchasing and buyout ownership.
- Pages 4–5: dictation drafts, category matching, human confirmation, leadership summaries, mandatory independent exception flags, locally hosted models and logged outputs.
- Page 6: 20 roles, scoped access, enforced approvals, verifiable hash-chained audit history.
- Page 7: no measured adoption, savings, recovered revenue, turnaround or testimonial supplied. None invented or published. Engineering test counts and endpoint counts are omitted from marketing copy.

The homepage, FDE page, construction page, resources, About and shared navigation now lead to the client story. Removed pre-pilot and fictional-client framing. Existing financial method examples retain their example-data context: the PDF does not substantiate the old $11,850 reconciliation amount as a client outcome.

Removed imagery-generation captions from public copy. Media provenance remains documented internally in `docs/media-sources.md` and `docs/generated-campaign-assets.md`.

## Visual direction

Preserve charcoal `#202722`, ivory `#F7F6F2` and sage `#B6C9A8`. Add bright green `#C7ED8A` for primary actions, active service selections and key story details; use pale sage `#E5EEDC` for supporting surfaces. Exact accent colors are preserved by the production palette pass. Outfit typography and natural scrolling remain.

## Production corrections

- `/client-story` is a real indexable page, replacing the previous About redirect in both the local server aliases and Vercel config.
- Client story has its own title, description, canonical URL and sitemap entry.
- Production Vercel build no longer sets `DESIGN_LAB=1`.
- Internal design-system footer link removed; `/system` remains noindex.
- No generated imagery is presented as a named client's workplace.

## Launch dependency

The contact destination has not been supplied. Current build prepares a downloadable enquiry; it does not deliver a lead. The owner has been asked for a business email or booking URL. Configure and verify that destination before calling the site fully ready to acquire leads. Do not silently invent an email address or claim a message was sent.

## Verification

Build passed. Browser suite passed 84 combinations and 100 local links. The client story passed five widths, keyboard disclosure and accessibility checks after correcting one dark-section paragraph contrast issue. Production design-lab exclusion and exact accent color are verified. Screenshots saved in `audit/launch/`.
