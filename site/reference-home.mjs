import {backgroundFilm} from './media.mjs';
import {workStory} from './work-story.mjs';
import {clientStoryFeature} from './client-story.mjs';
import {icon} from './art.mjs';
import {serviceVisual} from './tour.mjs';
import {sectors} from './partnership.mjs';
const arrow=icon('arrow',18);
const link=(url,text,ghost=false)=>`<a class="${ghost?'ref-ghost':'ref-cta'}" href="${url}">${text}${arrow}</a>`;
const toggle=()=>'';

const services=[
 ['ai','Less paperwork. More time.','Put AI to work on the reading, sorting, and repeated tasks that slow your team down. Your people stay in control.','service-ai','ai-solutions'],
 ['software','Tools that fit your business.','Give your team a simpler way to manage requests, serve customers, and get work done. Built around how you work.','service-software','custom-software'],
 ['systems','Your information. Together.','Help the systems you already use share information, so your people spend less time copying, checking, and chasing.','service-systems','integrations']
];
export function referenceHome(){return `<div class="ref">
<header class="ref-hero" data-video-region>
 ${backgroundFilm('business-in-motion')}
 <div class="wrap ref-hero-copy"><p class="ref-eyebrow">Better ways to run your business</p><h1>Better technology.<br>Stronger business.</h1><p class="ref-hero-subline">We build the tools that cut paperwork, connect your team, and make everyday work easier.</p><div class="ref-hero-actions">${link('/services','Explore our services')}${link('/contact','Let’s talk',true)}</div></div>
 <div class="wrap ref-hero-foot"><a href="#services">Explore what’s possible ↓</a>${toggle()}</div>
</header>
<div class="ref-focus-strip"><div class="wrap"><a class="ref-proof-link" href="/client-story">Built for real operations. Read the client story ↗</a><p>Practical AI <i>·</i> Custom software <i>·</i> Connected systems</p></div></div>
${workStory()}
<section class="ref-services" id="services"><div class="wrap"><p class="ref-eyebrow">Technology services, built with you</p><h2>More possibility.<br>Less getting in the way.</h2><div class="ref-section-intro"><p>Understand the work. Connect the information. Build what makes a difference.</p><div class="ref-service-selector" aria-label="Choose a service" data-service-selector>${services.map(([id,title],i)=>`<button type="button" data-service-index="${i}" aria-pressed="${i===0}">${['Cut paperwork','Build better tools','Connect your systems'][i]}</button>`).join('')}</div><div class="ref-carousel-controls" hidden data-service-controls><button type="button" data-service-prev aria-label="Previous service">←</button><button type="button" data-service-next aria-label="Next service">→</button></div></div></div>
 <div class="ref-service-track" tabindex="0" role="region" aria-label="Explore our three technology services" data-service-track>${services.map(([id,title,copy,photo,slug])=>`<article class="ref-card"><img src="/assets/images/${photo}.webp" alt="" width="1600" height="900" loading="lazy"><div class="ref-card-copy"><h3>${title}</h3><p>${copy}</p>${link('/services/'+slug,{ai:'Explore practical AI',software:'Explore custom software',systems:'Explore connected systems'}[id],true)}</div><details class="ref-use-case"><summary>See a typical workflow ${arrow}</summary><div><p>${id==='ai'?'An incoming invoice becomes a reviewable record, with the original document attached and uncertain fields flagged.':id==='software'?'A client request moves from a shared form to an assigned owner, with a clear status for everyone involved.':'An approved update reaches the next system with a source reference. Exceptions go to the person who can resolve them.'}</p><a href="/services/${slug}">Explore this service ${arrow}</a></div></details></article>`).join('')}</div>
</section>
${clientStoryFeature()}
<section class="ref-statement" id="problem"><div class="wrap"><p class="ref-eyebrow">Your operations. A clearer way forward.</p><h2>Technology should understand<br>the work it’s here to improve.</h2><p class="ref-lede">Disconnected systems. Repeated tasks. Decisions waiting on information. We work with your people to find the friction, then build a practical solution around it.</p><div class="ref-statement-grid"><article><span>01 / Understand</span><h3>Start with the real process.</h3><p>Observe the work, listen to the team, and define the problem before choosing the technology.</p></article><article><span>02 / Connect</span><h3>Put information to work.</h3><p>Bring the right records and business context together, so your team can see what needs attention.</p></article><article><span>03 / Deliver</span><h3>Make improvement usable.</h3><p>Build, test, and refine with the people who will use it. Keep decisions and responsibility clear.</p></article></div></div></section>
<section class="ref-film ref-people-background"><div class="wrap"><p class="ref-eyebrow">An engineer alongside your team</p><h2>Close to your people.<br>Closer to the problem.</h2><p class="ref-lede">Your forward-deployed engineer works directly with you—from observing the process to building, testing, and improving the solution.</p><div class="ref-hero-actions">${link('/forward-deployed-engineering','How your FDE works')}${link('/client-story','Read the client story',true)}</div></div></section>
${workflowFilms()}<section class="ref-industries"><div class="wrap"><p class="ref-eyebrow">Across industries</p><h2>Your world is our starting point.</h2><p class="ref-lede">From the office to the factory floor, the approach starts with the people doing the work. Construction is one area of particular focus.</p><ul>${sectors.map(([id,label])=>`<li><a href="/solutions#${id}">${label}${arrow}</a></li>`).join('')}</ul></div></section>
<section class="ref-closing"><div class="wrap"><p class="ref-eyebrow">Let’s move your business forward</p><h2>Start with the work<br>you want to make better.</h2><p class="ref-lede">Bring your challenge. We’ll explore what a useful first step could look like.</p>${link('/contact','Start a conversation')}</div></section>
</div>`;}

function workflowFilms(){return `<section class="ref-workflow-films" id="everyday-work"><div class="wrap"><p class="ref-eyebrow">The everyday work worth improving</p><h2>Good work deserves<br>a better process.</h2><p class="ref-lede">The operational problems we tackle with your team, and the connected workflows we build to move the business forward.</p><div class="workflow-film-grid">${[
 ['admin-overhead','service-ai','When admin becomes the job.','Requests arrive in different places. Someone re-enters the details, checks the attachments, and chases the next person. The process takes attention away from the work itself.'],
 ['clearer-handoffs','service-software','A clearer path from request to action.','One intake point. An accountable owner. A review step with the right context. We design the workflow with your team, then build the software to support it.']
].map(([name,poster,title,copy])=>`<article><div class="workflow-player" data-story-player><video data-story-video data-background-video muted loop preload="none" playsinline data-poster="/assets/images/${name}-hd.webp" data-src="/assets/video/${name}-hd.mp4" data-mobile-src="/assets/video/${name}-mobile-hd.mp4" aria-label="${title} Silent workflow film"></video></div><h3>${title}</h3><p>${copy}</p></article>`).join('')}</div></div></section>`;}
