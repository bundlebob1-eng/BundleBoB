/* ============================================================
   The homepage, composed from the two reference sites.

   Structure follows what octanner.com and avathon.com actually
   do, in their order: a full-bleed film opening under a heavy
   scrim; one statement section with enormous air; a saturated
   full-bleed gradient carrying translucent cards; a second
   full-bleed film; a quiet index; then the closing call.

   Copy is existing BundleBoB copy or a tightening of it. The
   reconciliation figures are the same synthetic ones used
   elsewhere on the site and are labelled as synthetic here too.
   The pre-pilot position is stated rather than implied: neither
   reference carries that because both have real customers, and
   it is the one thing not to copy from them.
   ============================================================ */

import {icon} from './art.mjs';

const arrow = icon('arrow', 17);

/* Both films keep the same safeguards the rest of the site uses:
   no src until JS decides, poster meanwhile, and a pause control. */
const film = (name, poster, alt, cls = '') => `
<video class="${cls}" data-background-video muted loop playsinline preload="none"
       poster="/assets/images/${poster}.webp" aria-hidden="true" tabindex="-1"
       data-src="/assets/video/${name}.mp4"></video>
<img class="ref-hero-media" src="/assets/images/${poster}.webp" alt="${alt}" hidden>`;

const sectors = [
  ['construction', 'Construction & real estate'],
  ['manufacturing', 'Manufacturing & fabrication'],
  ['field-service', 'Field service & repair'],
  ['professional-services', 'Professional services'],
  ['energy', 'Energy & utilities'],
  ['logistics', 'Supply chain & logistics'],
  ['property', 'Property & facilities'],
  ['retail', 'Retail & ecommerce']
];

export function referenceHome(){
  return `<div class="ref">

<section class="ref-hero" data-video-region>
  ${film('people-process-technology','people-process-technology','Colleagues working through a process together')}
  <div class="wrap">
    <div class="ref-hero-copy">
      <p class="ref-eyebrow">AI &amp; software for real-world operations</p>
      <h1>Software for the work that <em>actually runs</em> your business.</h1>
      <p class="ref-lede">Practical AI, custom software and connected systems — built with the people who use them, by an engineer working alongside your team.</p>
      <div class="ref-hero-actions">
        <a class="ref-cta" href="/contact">Start a conversation ${arrow}</a>
        <a class="ref-ghost" href="/services">See what we build ${arrow}</a>
      </div>
    </div>
    <div class="ref-hero-foot">
      <a href="#problem">Scroll to explore &darr;</a>
      <span>Across industries &middot; deep in construction</span>
      <button class="en-video-toggle" type="button" data-video-toggle hidden aria-label="Play background film">
        <span data-video-toggle-icon>&#9658;</span><span data-video-toggle-label>Play film</span>
      </button>
    </div>
  </div>
</section>

<section class="ref-statement" id="problem">
  <div class="wrap">
    <p class="ref-eyebrow">The problem we keep finding</p>
    <h2>Your operations system and your accounting system describe <em>two different jobs</em>.</h2>
    <p class="ref-lede">One carries the change that was approved on site this morning. The other carries only what has posted. The number you actually run the business on sits between them, and usually arrives too late to act on.</p>
    <div class="ref-statement-grid">
      <article><h3>Work in progress</h3><p>See what a job is worth while you can still change the outcome, not after it closes.</p></article>
      <article><h3>Cost tracking</h3><p>Committed cost, approved change and posted cost in one place, with the source of every figure.</p></article>
      <article><h3>Operational reporting</h3><p>Reports your team trusts because they can see where each number came from.</p></article>
    </div>
  </div>
</section>

<section class="ref-gradient" id="services">
  <div class="wrap">
    <p class="ref-eyebrow">One partner. Three capabilities.</p>
    <h2>Start with the problem. Choose the technology after.</h2>
    <div class="ref-gradient-cards">
      <a class="ref-card" href="/services/ai-solutions">
        <h3>Practical AI</h3>
        <p>Less repetitive work, more room for human judgment. Applied to a process you already run, with a person still deciding.</p>
        <span>Explore applied AI ${arrow}</span>
      </a>
      <a class="ref-card" href="/services/custom-software">
        <h3>Custom software</h3>
        <p>Tools that fit the process, built with the people using them rather than around them.</p>
        <span>Explore custom software ${arrow}</span>
      </a>
      <a class="ref-card" href="/services/integrations">
        <h3>Connected systems</h3>
        <p>Connect the records, surface the exceptions, and give every figure a source you can follow.</p>
        <span>Explore connected systems ${arrow}</span>
      </a>
    </div>
  </div>
</section>

<section class="ref-film" data-video-region>
  ${film('connected-world','connected-world','An engineer working alongside a client team','ref-film-video')}
  <div class="wrap">
    <p class="ref-eyebrow">The people behind the technology</p>
    <h2>We get inside the problem before we build.</h2>
    <p class="ref-lede">Your engineer sits with your team: watching the work, questioning the handoffs, and turning a real operational need into software that survives contact with a Tuesday.</p>
    <a class="ref-cta" href="/forward-deployed-engineering">How we work with you ${arrow}</a>
    <div class="ref-film-controls">
      <button class="en-video-toggle" type="button" data-video-toggle hidden aria-label="Play background film">
        <span data-video-toggle-icon>&#9658;</span><span data-video-toggle-label>Play film</span>
      </button>
    </div>
  </div>
</section>

<section class="ref-demo">
  <div class="wrap">
    <div class="ref-demo-grid">
      <div>
        <p class="ref-eyebrow">Construction demonstration &middot; synthetic data</p>
        <h2>The job moved on. The numbers <em>didn’t</em>.</h2>
        <p class="ref-lede">One job, two systems, one difference worth reviewing before the month closes. These figures are constructed to explain the method — they are not a customer result.</p>
        <a class="ref-cta" href="/construction" style="margin-top:34px">See the walkthrough ${arrow}</a>
      </div>
      <div class="ref-demo-panel">
        <div class="ref-demo-row"><b>Operations</b><data value="196450">$196,450</data></div>
        <div class="ref-demo-row"><b>Accounting</b><data value="184600">$184,600</data></div>
        <div class="ref-demo-row is-gap"><b>To review</b><data value="11850">$11,850</data></div>
        <p class="ref-note">Synthetic records. BundleBoB is pre-pilot: no client outcomes are shown anywhere on this site.</p>
      </div>
    </div>
  </div>
</section>

<section class="ref-industries">
  <div class="wrap">
    <p class="ref-eyebrow">Where this applies</p>
    <h2>Industries with jobs, work orders and a margin to protect.</h2>
    <ul>
      ${sectors.map(([id,label])=>`<li><a href="/solutions#${id}">${label}<span>View ${arrow}</span></a></li>`).join('')}
    </ul>
  </div>
</section>

<section class="ref-closing">
  <div class="wrap">
    <p class="ref-eyebrow" style="justify-content:center">A better way starts with a conversation</p>
    <h2>Tell us what gets in the way.</h2>
    <p class="ref-lede">No brief required. Describe the process that takes too long, and we will tell you honestly whether we can help.</p>
    <div class="ref-hero-actions">
      <a class="ref-cta" href="/contact">Start a conversation ${arrow}</a>
      <a class="ref-ghost" href="/resources/wip-review">Get the WIP checklist ${arrow}</a>
    </div>
  </div>
</section>

</div>`;
}
