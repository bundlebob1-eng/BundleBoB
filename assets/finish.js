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
 document.querySelectorAll('.case-flow-preview').forEach(panel=>{
  panel.classList.add('depth-surface');
  const reset=()=>{panel.style.removeProperty('--depth-x');panel.style.removeProperty('--depth-y')};
  panel.addEventListener('pointermove',event=>{if(reduced.matches||!fine.matches)return;const box=panel.getBoundingClientRect();panel.style.setProperty('--depth-x',`${((event.clientY-box.top)/box.height-.5)*5}deg`);panel.style.setProperty('--depth-y',`${((event.clientX-box.left)/box.width-.5)*-5}deg`);},{passive:true});
  panel.addEventListener('pointerleave',reset);panel.addEventListener('focusin',reset);reduced.addEventListener('change',reset);
 });
 reduced.addEventListener('change',()=>{if(reduced.matches)for(const animation of animations)animation.cancel()});
})();
