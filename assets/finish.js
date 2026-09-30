// Native scrolling, a reading indicator, and depth on decorative layers only.
(() => {
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),fine=matchMedia('(hover:hover) and (pointer:fine)');
 const progress=document.createElement('div');progress.className='reading-progress';progress.setAttribute('aria-hidden','true');document.body.append(progress);
 let scheduled=false;
 function update(){scheduled=false;const total=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${total>0?Math.min(1,Math.max(0,scrollY/total)):0})`;}
 addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(update)}},{passive:true});addEventListener('resize',update);update();
 const animations=new Set();
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;observer.unobserve(entry.target);if(reduced.matches)return;const animation=entry.target.animate([{transform:'translateY(16px)'},{transform:'none'}],{duration:520,easing:'cubic-bezier(.2,.7,.3,1)'});animations.add(animation);animation.finished.then(()=>animations.delete(animation)).catch(()=>{});}),{threshold:.12});
 document.querySelectorAll('.ref-statement-grid article,.en-feature-grid article,.case-workflow li,.story-proof').forEach(e=>observer.observe(e));

 reduced.addEventListener('change',()=>{if(reduced.matches)for(const animation of animations)animation.cancel()});
})();

// Requests, approvals and updates settle into one shared flow as the visitor scrolls.
(() => {
 const section=document.querySelector('.work-story');if(!section)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const cards=[...section.querySelectorAll('.work-card')],steps=[...section.querySelectorAll('[data-work-step]')];
 const offsets=[[-54,-12,80,-22,-8],[38,0,135,20,7],[-30,18,55,-15,-5]];
 let visible=false,queued=false;
 function render(){queued=false;const r=section.getBoundingClientRect();const desktop=innerWidth>1000;const raw=desktop?-r.top/Math.max(1,r.height-innerHeight):(innerHeight-r.top)/(innerHeight+r.height*.55);const progress=reduced.matches?1:Math.max(0,Math.min(1,raw));const eased=progress*progress*(3-2*progress);const rest=1-eased;
  cards.forEach((card,i)=>{const [x,y,z,ry,rz]=offsets[i];const mobile=innerWidth<760?.4:1;card.style.transform=reduced.matches?'none':`translate3d(${x*rest*mobile}px,${y*rest}px,${z*rest}px) rotateY(${ry*rest}deg) rotateZ(${rz*rest}deg)`});
  steps.forEach((step,i)=>step.classList.toggle('is-current',i===Math.min(2,Math.floor(progress*3))));section.dataset.progress=progress.toFixed(3);
 }
 function schedule(){if(!visible||queued)return;queued=true;requestAnimationFrame(render)}
 function preference(){section.classList.toggle('is-animated',!reduced.matches);render()}
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)render()},{rootMargin:'100px'}).observe(section);
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',()=>{preference()});reduced.addEventListener('change',preference);preference();
})();
