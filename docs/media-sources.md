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
