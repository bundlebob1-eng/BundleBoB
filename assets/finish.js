// Native page scrolling, a reading indicator, and subtle once-only entrances.
(() => {
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const progress=document.createElement('div');progress.className='reading-progress';progress.setAttribute('aria-hidden','true');document.body.append(progress);
 let scheduled=false;
 function update(){scheduled=false;const total=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${total>0?Math.min(1,Math.max(0,scrollY/total)):0})`;}
 addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(update)}},{passive:true});addEventListener('resize',update);update();
 const animations=new Set();
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;observer.unobserve(entry.target);if(reduced.matches)return;const animation=entry.target.animate([{transform:'translateY(16px)'},{transform:'none'}],{duration:520,easing:'cubic-bezier(.2,.7,.3,1)'});animations.add(animation);animation.finished.then(()=>animations.delete(animation)).catch(()=>{});}),{threshold:.12});
 document.querySelectorAll('.en-feature-grid article,.case-workflow li,.story-proof').forEach(e=>observer.observe(e));

 reduced.addEventListener('change',()=>{if(reduced.matches)for(const animation of animations)animation.cancel()});
})();
