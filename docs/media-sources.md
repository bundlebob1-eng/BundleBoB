# Current media — final quality patch

The active background videos now use real licensed footage, rendered directly from the original sources. The prior lower photographic zoom loops are retired from deployment. Source imagery is contextual stock footage, not a representation of BundleBoB employees or the client team.

- Hero: cottonbro studio source 12–18s; Toàn BDS warehouse source 5–10s; Mikael Blomkvist construction source 1–6s. Total 16s. Desktop 2560×1440 / 6.5 Mbps target, phone 1080×1920 / 3.5 Mbps, tablet 1440×1920 / 4.5 Mbps.
- A balanced tier is available for connections reporting under 4 Mbps with at least 100ms RTT: 1920×1080 / 2 Mbps, 1080×1440 / 1.6 Mbps, and 720×1280 / 1.3 Mbps. Standard quality remains the default when connection estimates are unavailable or latency is low.
- Construction: original 4K field footage 0–8s; the same three aspect variants.
- Administrative work: cottonbro source 2–12s, 1920×1080; 1280×720 for smaller rendered players.
- Clearer handoffs: Antoni Shkraba collaboration source 0–8s, at the same landscape sizes.
- Posters are actual opening frames, WebP quality 90; no artificial sharpening or generative edits.
- All exports are silent H.264, 25fps, with one-second keyframe intervals and the MP4 index at the front. A source is chosen from the video’s rendered shape and size; rotation preserves the current playback position.

Additional source retrieval: [original 4K construction file](https://videos.pexels.com/video-files/8964771/8964771-uhd_3840_2160_25fps.mp4); [collaboration download](https://www.pexels.com/download/video/7165691/). Creator/source page references are recorded below. Reproduce with `scripts/render-responsive-media.swift` and `scripts/prepare-responsive-posters.mjs`; source paths are explicit in the renderer. JPEG intermediates remain in `/private/tmp/bundlebob-responsive-posters`.

Earlier records below describe prior edits and controls and do not describe the current production treatment.

---

## Marketing refinement — September 30 review

The two workflow films have been re-exported as photographic loops without any burned-in words or graphical text cards. Their authored motion uses the existing generated campaign photos; it is not footage of the client’s staff. Supporting explanation remains accessible HTML on the page.

Mobile H.264 exports at 1280×720 are selected before loading on viewports at or below 760px. The desktop hero edit is unchanged. Reduced motion and Save-Data still defer all background footage.

# Current media update — September 29

Three generated HD background images and two authored motion illustrations are documented in [generated-campaign-assets.md](generated-campaign-assets.md). The original hero and construction footage retain the licenses below. Retired films remain archived in source; the production build uses an explicit video allowlist.

# Live-action media sources

Downloaded September 25, 2026. Pexels permits commercial website use and modification under its [license](https://www.pexels.com/license/). Credits also appear in the footer. These are stock scenes, not representations of BundleBoB employees or customers.

| Asset | Creator and source | Local use |
| --- | --- | --- |
| Office collaboration | Antoni Shkraba — [People Using a Laptop at the Office](https://www.pexels.com/video/people-using-a-laptop-at-the-office-7165691/) | `assets/video/people-at-work.mp4`, `assets/images/people-at-work.webp` |
| Construction collaboration | Mikael Blomkvist — [Engineers discussing plans on site](https://www.pexels.com/video/a-man-and-woman-having-conversation-while-looking-at-the-construction-site-8964771/) | `assets/video/construction-field.mp4`, `assets/images/construction-field.webp` |
| Software engineering | Raddy — [A Programmer Working on a Laptop Computer](https://www.pexels.com/video/a-programmer-working-on-a-laptop-computer-13522186/) | `assets/images/engineering.webp`, extracted from downloaded footage |

Posters are encoded as WebP from actual footage frames with no generative alteration. Background presentation applies CSS contrast/saturation and a readability overlay. Original source videos were downloaded from Pexels' video CDN. The engineering video remains only in the temporary working directory; only its derived poster is deployed.

## September 28 — replacement brand films

The generic office loop has been retired from the deployment. Its still remains in the applied-AI service card. The new films use licensed, real footage, with no generated scenes or implied client endorsements.

| Shot | Creator / source | Edit |
| --- | --- | --- |
| Modern operations | [Toàn BDS / Pexels 29959327](https://www.pexels.com/video/aerial-view-of-large-industrial-warehouse-facility-29959327/) | Source 3–8s → brand film 0–5s |
| Engineers at work | [cottonbro studio / Pexels 6804114](https://www.pexels.com/video/programmers-at-work-6804114/) | Source 4–10s → brand film 5–11s |
| Connected infrastructure | [MrColo / Pexels 7140928](https://www.pexels.com/video/close-up-of-a-cpu-7140928/) | Source 1–5s → brand film 11–15s; separate 8s hero loop |
| Construction field collaboration | Mikael Blomkvist, credited above | Existing edit 1–6s → brand film 15–20s |

Outputs: `connected-world.mp4` (8 seconds, approximately 2.2 MB) and `people-process-technology.mp4` (20 seconds, approximately 7.2 MB). Both are silent H.264, 1920×1080, 25 fps, optimized for progressive playback. Clean cuts preserve an intentional four-part sequence. A restrained CSS saturation/contrast treatment unifies presentation. The film appears below its introduction with a bottom readability gradient, synchronized scene markers, and pause/play controls. The source footage is illustrative, not a company showreel.

Reproduction on macOS: download the three new originals to `/private/tmp/bundlebob-film-{warehouse,people,racks}.mp4`; run `scripts/edit-brand-film.swift`, then `scripts/compress-brand-film.swift` with Swift. Run `node scripts/prepare-film-posters.mjs` to convert the generated JPEG intermediates to deployed WebP posters, then `npm run build`. Native media tools and Chrome may need execution outside the sandbox. Original CDN files:

- Warehouse: `https://videos.pexels.com/video-files/29959327/12856531_3840_2160_60fps.mp4`
- People: `https://videos.pexels.com/video-files/6804114/6804114-uhd_4096_2160_25fps.mp4`
- Racks: `https://videos.pexels.com/video-files/7140928/7140928-hd_1920_1080_24fps.mp4`

Videos are loaded only when visible on desktop. Mobile and reduced-motion/data-saving visitors receive real-frame WebP posters; explicit play remains available. The below-fold montage is not downloaded with the initial hero.

## Attribution

Pexels does not require attribution, so the footer credit line was removed on request. Creator credits remain in the table above, which is the record of what was licensed and from whom. The people in this footage are stock performers and are not BundleBoB staff, clients or customers; no page presents them as such.

## Primary-reference hero film

`business-in-motion.mp4` is a new 20-second edit for the full-screen homepage hero. It uses the already credited cottonbro studio engineering footage (source 12–18s), Toàn BDS operations aerial (5–10s), Mikael Blomkvist field collaboration (existing edit 1–6s), and MrColo infrastructure detail (2–6s), in that order. It is edited real stock footage, not an AI-generated video and not a client/staff documentary.

Reproduce: `swift -module-cache-path /private/tmp/bundlebob-swift-cache scripts/edit-business-film.swift`; `swift -module-cache-path /private/tmp/bundlebob-swift-cache scripts/compress-brand-film.swift business-in-motion`; `node scripts/prepare-film-posters.mjs business-in-motion`. The source paths match the preceding download list. The site's CSS applies a focused text-legibility overlay; the video itself has no baked-in copy.
