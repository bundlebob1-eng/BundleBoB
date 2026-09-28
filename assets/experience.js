// Opening experience: capability selector and scroll progress.
// The WebGL globe was removed on request; its renderer is kept for
// reference at assets/legacy/experience-globe.js.bak and is not shipped.
// Native scrolling throughout: no capture, no continuous render loop.
(() => {
 'use strict';
 const opening=document.querySelector('[data-experience]');
 if(!opening)return;
 const hero=opening.querySelector('.ex-hero');
 const header=document.querySelector('.site-header');
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 const compact=matchMedia('(max-width: 760px)');
 const capabilities=[
  ['Less repetitive work. More room for human judgment.','Explore applied AI','/services/ai-solutions'],
  ['Tools that fit the process. Built with the people using them.','Explore custom software','/services/custom-software'],
  ['Connect the records. See the exceptions. Act with context.','Explore connected systems','/services/integrations']
 ];
 let selected=0;

 const options=opening.querySelector('.ex-capability-options');
 if(options){
  const buttons=[...options.querySelectorAll('a')].map((link,i)=>{
   const b=document.createElement('button');b.type='button';b.innerHTML=link.innerHTML;
   b.className=link.className;b.dataset.capabilityId=String(i);
   b.setAttribute('aria-pressed',String(i===0));b.setAttribute('aria-controls','capability-detail');
   link.replaceWith(b);b.addEventListener('click',()=>select(i));return b;
  });
  function select(i){
   selected=i;
   buttons.forEach((b,j)=>{b.classList.toggle('is-selected',i===j);b.setAttribute('aria-pressed',String(i===j))});
   opening.querySelector('[data-capability-copy]').textContent=capabilities[i][0];
   const link=opening.querySelector('[data-capability-link]');
   link.firstChild.textContent=capabilities[i][1]+' ';link.href=capabilities[i][2];
  }
  options.addEventListener('keydown',e=>{
   const i=buttons.indexOf(document.activeElement);if(i<0)return;
   const next=e.key==='ArrowRight'?(i+1)%3:e.key==='ArrowLeft'?(i+2)%3:e.key==='Home'?0:e.key==='End'?2:-1;
   if(next>=0){e.preventDefault();buttons[next].focus();select(next)}
  });
 }

 // Scroll progress drives CSS only. Reduced motion and narrow screens
 // hold it at 0, which flattens the opening rather than animating it.
 let scrollFrame=0;
 function scroll(){
  scrollFrame=0;
  if(header)header.classList.toggle('ex-header-scrolled',scrollY>40);
  const progress=motion.matches||compact.matches?0:
   Math.max(0,Math.min(1,-opening.getBoundingClientRect().top/Math.max(1,opening.offsetHeight-hero.offsetHeight)));
  hero.style.setProperty('--ex-progress',progress.toFixed(3));
 }
 addEventListener('scroll',()=>{if(!scrollFrame)scrollFrame=requestAnimationFrame(scroll)},{passive:true});
 addEventListener('resize',scroll,{passive:true});
 compact.addEventListener('change',scroll);
 motion.addEventListener('change',scroll);
 scroll();
})();
