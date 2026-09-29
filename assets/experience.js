// Native horizontal scrolling. No pinned scenes, WebGL, or 3D motion.
(() => {
 const track=document.querySelector('[data-service-track]');
 if(!track)return;
 const controls=document.querySelector('[data-service-controls]');
 const previous=controls.querySelector('[data-service-prev]');
 const next=controls.querySelector('[data-service-next]');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 controls.hidden=false;
 const update=()=>{previous.disabled=track.scrollLeft<4;next.disabled=track.scrollLeft>=track.scrollWidth-track.clientWidth-4};
 const move=direction=>{const step=track.firstElementChild.getBoundingClientRect().width+parseFloat(getComputedStyle(track).gap);const position=track.scrollLeft/step;const index=direction>0?Math.floor(position+.01)+1:Math.ceil(position-.01)-1;track.scrollTo({left:Math.max(0,index*step),behavior:reduced.matches?'instant':'smooth'})};
 previous.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));
 track.addEventListener('keydown',event=>{if(event.target!==track)return;if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();move(event.key==='ArrowRight'?1:-1)}});
 track.addEventListener('scroll',update,{passive:true});new ResizeObserver(update).observe(track);update();
})();

(() => {
 const track=document.querySelector('[data-service-track]');if(!track)return;
 const buttons=[...document.querySelectorAll('[data-service-index]')];
 const reduced=matchMedia('(prefers-reduced-motion:reduce)');
 const select=i=>{const card=track.children[i];track.scrollTo({left:card.offsetLeft-track.firstElementChild.offsetLeft,behavior:reduced.matches?'instant':'smooth'})};
 buttons.forEach((button,i)=>{button.addEventListener('click',()=>select(i));button.addEventListener('keydown',e=>{const next=e.key==='ArrowRight'?(i+1)%buttons.length:e.key==='ArrowLeft'?(i+buttons.length-1)%buttons.length:-1;if(next>=0){e.preventDefault();buttons[next].focus();select(next)}})});
 function update(){const start=track.getBoundingClientRect().left+parseFloat(getComputedStyle(track).paddingLeft);const closest=[...track.children].reduce((a,c,i)=>Math.abs(c.getBoundingClientRect().left-start)<a.distance?{index:i,distance:Math.abs(c.getBoundingClientRect().left-start)}:a,{index:0,distance:Infinity});buttons.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===closest.index)))}
 track.addEventListener('scroll',update,{passive:true});update();
 track.querySelectorAll('details').forEach(detail=>detail.addEventListener('toggle',()=>{if(detail.open)track.querySelectorAll('details').forEach(other=>{if(other!==detail)other.open=false})}));
})();
