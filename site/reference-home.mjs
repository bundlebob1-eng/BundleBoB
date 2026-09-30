import {backgroundFilm} from './media.mjs';
import {workStory} from './work-story.mjs';
import {clientStoryFeature} from './client-story.mjs';
import {icon} from './art.mjs';
import {sectors} from './partnership.mjs';
const arrow=icon('arrow',18);
const link=(url,text,ghost=false)=>`<a class="${ghost?'ref-ghost':'ref-cta'}" href="${url}">${text}${arrow}</a>`;

const services=[
 ['ai','Less paperwork. More time.','Put AI to work on the reading, sorting, and repeated tasks that slow your team down. Your people stay in control.','service-ai','ai-solutions'],
 ['software','Tools that fit your business.','Give your team a simpler way to manage requests, serve customers, and get work done. Built around how you work.','service-software','custom-software'],
 ['systems','Your information. Together.','Help the systems you already use share information, so your people spend less time copying, checking, and chasing.','service-systems','integrations']
];
export function referenceHome(){return `<div class="ref">
<header class="ref-hero" data-video-region>
 ${backgroundFilm('business-in-motion')}
 <div class="wrap ref-hero-copy"><p class="ref-eyebrow">Better ways to run your business</p><h1>Better technology.<br>Stronger business.</h1><p class="ref-hero-subline">We build the tools that cut paperwork, connect your team, and make everyday work easier.</p><div class="ref-hero-actions">${link('/services','Explore our services')}${link('/contact','Let’s talk',true)}</div></div>
 <div class="wrap ref-hero-foot"><a href="#services">Explore what’s possible ↓</a></div>
</header>
<div class="ref-focus-strip"><div class="wrap"><a class="ref-proof-link" href="/client-story">Built for real operations. Read the client story ↗</a><p>Practical AI <i>·</i> Custom software <i>·</i> Connected systems</p></div></div>
${serviceOverview()}
${clientStoryFeature()}
${workStory()}
<section class="ref-film ref-people-background"><div class="wrap"><p class="ref-eyebrow">An engineer alongside your team</p><h2>Close to your people.<br>Closer to the problem.</h2><p class="ref-lede">Your forward-deployed engineer works directly with you—from observing the process to building, testing, and improving the solution.</p><div class="ref-hero-actions">${link('/forward-deployed-engineering','How your FDE works')}${link('/client-story','Read the client story',true)}</div></div></section>
${workflowFilms()}<section class="ref-industries"><div class="wrap"><p class="ref-eyebrow">Across industries</p><h2>Your world is our starting point.</h2><p class="ref-lede">From the office to the factory floor, the approach starts with the people doing the work. Construction is one area of particular focus.</p><ul>${sectors.map(([id,label])=>`<li><a href="/solutions#${id}">${label}${arrow}</a></li>`).join('')}</ul></div></section>
<section class="ref-closing"><div class="wrap"><p class="ref-eyebrow">Let’s move your business forward</p><h2>Start with the work<br>you want to make better.</h2><p class="ref-lede">Bring your challenge. We’ll explore what a useful first step could look like.</p>${link('/contact','Start a conversation')}</div></section>
</div>`;}

function serviceOverview(){return `<section class="service-overview" id="services" aria-labelledby="services-title"><div class="wrap">
 <div class="service-heading"><div><p class="ref-eyebrow">Technology services, built with you</p><h2 id="services-title">More possibility.<br>Less getting in the way.</h2></div><p>Practical AI, custom software, and connected systems. Start with the work you want to make easier.</p></div>
 <div class="service-features">${services.map(([id,title,copy,photo,slug],i)=>`<article class="service-feature" aria-labelledby="service-${id}-title">
  <div class="service-feature-media"><img src="/assets/images/${photo}.webp" alt="" width="1600" height="900" loading="lazy" decoding="async"></div>
  <div class="service-feature-copy"><p class="service-category"><span>0${i+1}</span>${['Practical AI','Custom software','Connected systems'][i]}</p><h3 id="service-${id}-title">${title}</h3><p class="service-description">${copy}</p><p class="service-example"><b>A typical application</b>${['Read invoices and flag details for a person to review.','Track a customer request from first contact to completion.','Keep approved information in sync across your existing tools.'][i]}</p>${link('/services/'+slug,['Explore practical AI','Explore custom software','Explore connected systems'][i])}</div>
 </article>`).join('')}</div>
 </div></section>`;}

function workflowFilms(){return `<section class="ref-workflow-films" id="everyday-work"><div class="wrap"><p class="ref-eyebrow">The everyday work worth improving</p><h2>Good work deserves<br>a better process.</h2><p class="ref-lede">The operational problems we tackle with your team, and the connected workflows we build to move the business forward.</p><div class="workflow-film-grid">${[
 ['admin-overhead','service-ai','When admin becomes the job.','Requests arrive in different places. Someone re-enters the details, checks the attachments, and chases the next person. The process takes attention away from the work itself.'],
 ['clearer-handoffs','service-software','A clearer path from request to action.','One intake point. An accountable owner. A review step with the right context. We design the workflow with your team, then build the software to support it.']
].map(([name,poster,title,copy])=>`<article><div class="workflow-player" data-story-player><video data-story-video data-background-video muted loop preload="none" playsinline data-poster="/assets/images/${name}-hd.webp" data-src="/assets/video/${name}-hd.mp4" data-mobile-src="/assets/video/${name}-mobile-hd.mp4" aria-label="${title} Silent workflow film"></video></div><h3>${title}</h3><p>${copy}</p></article>`).join('')}</div></div></section>`;}
