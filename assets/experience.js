// One source of truth for the native service carousel: buttons, arrows, swipe and keyboard.
(() => {
 const track=document.querySelector('[data-service-track]');if(!track)return;
 const cards=[...track.children],buttons=[...document.querySelectorAll('[data-service-index]')];
 const controls=document.querySelector('[data-service-controls]');
 const previous=controls.querySelector('[data-service-prev]'),next=controls.querySelector('[data-service-next]');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let active=0,pending=null,settle;
 const max=()=>Math.max(0,track.scrollWidth-track.clientWidth);
 const position=i=>Math.min(max(),cards[i].offsetLeft-cards[0].offsetLeft);
 function paint(i){active=i;buttons.forEach((b,n)=>b.setAttribute('aria-pressed',String(n===i)));previous.disabled=i===0;next.disabled=i===cards.length-1;}
 function sync(){if(pending!==null)return;const left=track.scrollLeft;if(Math.abs(position(active)-left)<3)return;const index=left>=max()-3&&max()>0?cards.length-1:cards.reduce((best,_,i)=>Math.abs(position(i)-left)<Math.abs(position(best)-left)?i:best,0);paint(index);}
 function select(i){pending=Math.max(0,Math.min(cards.length-1,i));paint(pending);track.scrollTo({left:position(pending),behavior:reduced.matches?'instant':'smooth'});clearTimeout(settle);settle=setTimeout(()=>{pending=null;sync()},600);}
 track.addEventListener('scroll',()=>{clearTimeout(settle);if(pending===null)sync();settle=setTimeout(()=>{pending=null;sync()},120)},{passive:true});
 for(const event of ['pointerdown','wheel'])track.addEventListener(event,()=>{pending=null},{passive:true});
 controls.hidden=false;previous.addEventListener('click',()=>select(active-1));next.addEventListener('click',()=>select(active+1));
 buttons.forEach((b,i)=>{b.addEventListener('click',()=>select(i));b.addEventListener('keydown',e=>{const n=e.key==='ArrowRight'?(i+1)%cards.length:e.key==='ArrowLeft'?(i+cards.length-1)%cards.length:-1;if(n>=0){e.preventDefault();buttons[n].focus();select(n)}})});
 track.addEventListener('keydown',e=>{if(e.target!==track)return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();select(active+(e.key==='ArrowRight'?1:-1))}});
 new ResizeObserver(()=>{pending=null;sync()}).observe(track);sync();
 track.querySelectorAll('details').forEach(detail=>detail.addEventListener('toggle',()=>{if(detail.open)track.querySelectorAll('details').forEach(other=>{if(other!==detail)other.open=false})}));
})();
