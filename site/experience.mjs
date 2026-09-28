import {icon} from './art.mjs';

// The film references inform the composition, not the business claims.
export function experienceHero(video){return `<div class="ex-opening" data-experience>
<header class="en-hero ex-hero">
 ${video}<div class="ex-film-shade" aria-hidden="true"></div>
 <div class="ex-coordinate" aria-hidden="true">PEOPLE / PROCESS / POSSIBILITY</div>
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
  <div class="ex-motion-controls"><button class="en-video-toggle" type="button" data-video-toggle hidden aria-label="Play film background video"><span data-video-toggle-icon aria-hidden="true">▶</span><span data-video-toggle-label>Play film</span></button></div>
 </div>
</header></div>`;}

export function fieldFilm(){return `<section class="ex-field-film" aria-labelledby="ex-film-heading">
 <div class="wrap ex-field-content"><div><p class="ex-eyebrow">PEOPLE. PROCESS. TECHNOLOGY.</p><h2 id="ex-film-heading">Inside your world.<br><em>Alongside your team.</em></h2></div><div><p>Great software starts with understanding the work. Your forward-deployed engineer works directly with your team, from the first conversation to the systems you use every day.</p><a class="ex-button" href="/forward-deployed-engineering">How your FDE works ${icon('arrow',18)}</a></div></div>
 <div class="ex-film-screen" data-video-region>
 <video class="ex-field-video" data-background-video muted loop playsinline preload="none" poster="/assets/images/people-process-technology.webp" aria-hidden="true" tabindex="-1" data-src="/assets/video/people-process-technology.mp4"></video>
 <div class="ex-field-shade" aria-hidden="true"></div>
 <div class="ex-film-chapters" aria-hidden="true"><span data-film-chapter="0" class="is-active">01 / Real operations</span><span data-film-chapter="5">02 / Human expertise</span><span data-film-chapter="11">03 / Connected systems</span><span data-film-chapter="15">04 / In the field</span></div>
 <div class="ex-film-progress" aria-hidden="true"><span data-film-progress></span></div>
 <button class="en-video-toggle ex-field-toggle" type="button" data-video-toggle hidden aria-label="Play film background video"><span data-video-toggle-icon aria-hidden="true">▶</span><span data-video-toggle-label>Play film</span></button>
 </div><div class="wrap ex-film-note"><span>UNDERSTAND THE WORK. BUILD WHAT MATTERS.</span><span>Illustrative footage · Across industries</span></div>
</section>`;}
