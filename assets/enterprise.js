(() => {
 'use strict';
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 document.querySelectorAll('[data-background-video]').forEach(video=>{
  const button=video.closest('header').querySelector('[data-video-toggle]');
  let userPaused=false,visible=true,loaded=false,userStarted=false;
  // 6.2MB is not a thing to hand a phone uninvited: below 760px the
  // poster stands in until the visitor asks for the film.
  const compact=matchMedia('(max-width: 760px)');
  const conn=navigator.connection;
  // Save-Data, and also any connection that would make a 6MB file a
  // punishment rather than a flourish.
  const saveData=Boolean(conn?.saveData)||/(^|-)(2g|3g)$/.test(conn?.effectiveType||'');
  function label(){const paused=video.paused;button.setAttribute('aria-label',paused?'Play background video':'Pause background video');button.querySelector('[data-video-toggle-label]').textContent=paused?'Play film':'Pause film';button.querySelector('[data-video-toggle-icon]').textContent=paused?'▶':'Ⅱ';}
  async function play(){if(!loaded){video.src=video.dataset.src;loaded=true;video.load();}try{await video.play()}catch{}label();}
  function sync(){if(reduced.matches||saveData||userPaused||!visible||document.hidden||(compact.matches&&!userStarted)){video.pause();label();}else play();}
  video.muted=true;button.hidden=false;
  button.addEventListener('click',()=>{if(video.paused){userPaused=false;userStarted=true;play()}else{userPaused=true;video.pause()}label()});
  video.addEventListener('play',label);video.addEventListener('pause',label);
  video.addEventListener('error',()=>{button.hidden=true;video.removeAttribute('src');loaded=false;});
  reduced.addEventListener('change',sync);compact.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync()},{threshold:.05}).observe(video);
  sync();
 });
})();

// Scroll explains how people, understanding, and delivery connect. No scroll capture or render loop.
(() => {
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 document.querySelectorAll('[data-scroll-story]').forEach(section=>{
  const compact=matchMedia('(max-width: 760px), (max-height: 700px)');
  const steps=[...section.querySelectorAll('[data-scroll-step]')];
  let visible=false,frame=0;
  const clamp=x=>Math.min(1,Math.max(0,x));
  function render(){
   frame=0;
   if(reduced.matches){section.removeAttribute('data-scroll-progress');['--scene-turn','--scene-tilt','--scene-gap','--scene-lift','--scene-spin'].forEach(p=>section.style.removeProperty(p));return;}
   if(!visible||document.hidden)return;
   const bounds=section.getBoundingClientRect();
   const first=steps[0].getBoundingClientRect(),last=steps.at(-1).getBoundingClientRect();
   // Compact screens use the visible illustration itself so movement never depends on an offscreen stage.
   const progress=compact.matches?clamp((innerHeight*.8-bounds.top)/(innerHeight*.8)):clamp((innerHeight*.55-first.top)/(last.top-first.top||1));
   section.dataset.scrollProgress=progress.toFixed(3);
   section.style.setProperty('--scene-turn',`${-12+progress*24}deg`);
   section.style.setProperty('--scene-tilt',`${52-progress*24}deg`);
   section.style.setProperty('--scene-gap',`${85-progress*62}px`);
   section.style.setProperty('--scene-lift',`${15-progress*25}px`);
   section.style.setProperty('--scene-spin',`${-28+progress*23}deg`);
  }
  function schedule(){if(!frame)frame=requestAnimationFrame(render);}
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)schedule();else{cancelAnimationFrame(frame);frame=0;}},{rootMargin:'100px'}).observe(section);
  addEventListener('scroll',()=>{if(visible&&!reduced.matches)schedule()},{passive:true});
  addEventListener('resize',schedule,{passive:true});
  document.addEventListener('visibilitychange',schedule);
  reduced.addEventListener('change',schedule);compact.addEventListener('change',schedule);
 });
})();
