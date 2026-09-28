import {icon} from './art.mjs';

// The film references inform the composition, not the business claims.
export function experienceHero(video){return `<div class="ex-opening" data-experience>
<header class="en-hero ex-hero">
 ${video}<div class="ex-film-shade" aria-hidden="true"></div>
 <div class="ex-coordinate" aria-hidden="true">PEOPLE / PROCESS / POSSIBILITY</div>
 <div class="ex-globe" aria-hidden="true">
  <img class="ex-globe-fallback" src="/assets/images/business-globe.svg" alt="" width="1000" height="1000" fetchpriority="high">
  <canvas data-business-globe></canvas>
  <span class="ex-orbit-label ex-orbit-label-a"><i></i> PEOPLE</span>
  <span class="ex-orbit-label ex-orbit-label-b"><i></i> PROCESS</span>
  <span class="ex-orbit-label ex-orbit-label-c"><i></i> TECHNOLOGY</span>
 </div>
 <div class="wrap ex-hero-layout">
  <div class="ex-hero-copy">
   <p class="ex-eyebrow"><span></span> AI & SOFTWARE FOR REAL-WORLD OPERATIONS</p>
   <h1><span>Your world.</span><span>Working</span><em>better.</em></h1>
   <p class="ex-hero-lede">Practical AI. Custom software. Connected systems. <br>For the work that runs your business. <br>An engineer alongside you, from problem to production.</p>
   <div class="ex-actions"><a class="ex-button" href="/contact">Let’s build together ${icon('arrow',18)}</a><a class="ex-button ex-button-outline" href="#services">Explore our services ${icon('arrow',18)}</a></div>
  </div>
  <div class="ex-capability" data-capability>
   <p class="ex-eyebrow">ONE PARTNER. THE RIGHT CAPABILITIES.</p>
   <div class="ex-capability-options" aria-label="Explore our capabilities">
    <a href="/services/ai-solutions" data-capability-id="0" class="is-selected">01 <span>Applied AI</span></a>
    <a href="/services/custom-software" data-capability-id="1">02 <span>Software</span></a>
    <a href="/services/integrations" data-capability-id="2">03 <span>Systems</span></a>
   </div>
   <div class="ex-capability-detail" id="capability-detail" aria-live="polite" aria-atomic="true"><p data-capability-copy>Less repetitive work. More room for human judgment.</p><a href="/services/ai-solutions" data-capability-link>Explore applied AI ${icon('arrow',16)}</a></div>
  </div>
 </div>
 <div class="wrap ex-hero-footer">
  <a href="#services" class="ex-scroll-link"><span>↓</span> SCROLL TO EXPLORE</a>
  <span class="ex-hero-footnote">Across industries. <a href="/construction">Deep in construction.</a></span>
  <div class="ex-motion-controls"><button type="button" data-globe-toggle hidden aria-label="Pause globe animation"><span data-globe-toggle-icon>Ⅱ</span><span data-globe-toggle-label>Pause 3D</span></button><button class="en-video-toggle" type="button" data-video-toggle hidden aria-label="Play background video"><span data-video-toggle-icon>▶</span><span data-video-toggle-label>Play film</span></button></div>
 </div>
</header></div>`;}

export function fieldFilm(){return `<section class="ex-field-film" aria-labelledby="ex-film-heading">
 <img src="/assets/images/people-at-work.webp" alt="Colleagues looking through a workflow together" width="1600" height="900" loading="lazy">
 <div class="ex-field-shade"></div><div class="wrap ex-field-content"><p class="ex-eyebrow">THE PEOPLE BEHIND THE TECHNOLOGY</p><h2 id="ex-film-heading">We get inside<br>the problem.<br><em>Then we build.</em></h2><div><p>Your forward-deployed engineer works beside your team: observing the work, questioning the handoffs, and turning a real business need into working software.</p><a class="ex-button" href="/forward-deployed-engineering">Meet your working relationship ${icon('arrow',18)}</a></div></div>
 <span class="ex-film-caption">DISCOVER TOGETHER / BUILD TOGETHER / IMPROVE TOGETHER</span>
</section>`;}
