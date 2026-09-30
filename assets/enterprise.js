// Silent, source-sized background media. Offscreen and reduced-motion visits stay still.
(() => {
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),connection=navigator.connection;
 const limited=()=>connection?.saveData||/(^|-)(2g|3g)$/.test(connection?.effectiveType||'');
 const players=[];
 document.querySelectorAll('[data-background-video]').forEach(video=>{
  let visible=false,blocked=false,generation=0;
  const originalPoster=video.dataset.poster||video.getAttribute('poster');
  const balanced=Number(connection?.downlink)>0&&connection.downlink<4&&connection.rtt>=100;
  video.loop=true;video.muted=true;video.defaultMuted=true;video.playsInline=true;
  function variant(){
   const box=video.getBoundingClientRect(),ratio=box.width/Math.max(1,box.height);
   if(video.dataset.portraitSrc&&ratio<.66)return [balanced&&video.dataset.portraitBalancedSrc||video.dataset.portraitSrc,video.dataset.portraitPoster];
   if(video.dataset.tabletSrc&&ratio<1.16)return [balanced&&video.dataset.tabletBalancedSrc||video.dataset.tabletSrc,video.dataset.tabletPoster];
   if(video.dataset.mobileSrc&&box.width*Math.min(devicePixelRatio||1,3)<=1280)return [video.dataset.mobileSrc,originalPoster];
   return [balanced&&video.dataset.balancedSrc||video.dataset.src,originalPoster];
  }
  function play(){if(!visible||document.hidden||reduced.matches||limited())return;video.play().then(()=>{blocked=false}).catch(()=>{blocked=true})}
  function sync(){
   const [src,poster]=variant();if(poster&&(visible||!video.hasAttribute('data-story-video'))&&video.getAttribute('poster')!==poster)video.poster=poster;
   if(!visible||document.hidden||reduced.matches||limited()){video.pause();return}
   if(video.getAttribute('src')!==src){const position=video.currentTime||0;const id=++generation;video.src=src;video.addEventListener('loadedmetadata',()=>{if(id!==generation)return;if(position&&video.duration)video.currentTime=Math.min(position,video.duration-.1);play()},{once:true});video.load();return}
   if(video.paused)play();
  }
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync()},{threshold:.01}).observe(video);
  video.addEventListener('canplay',play);document.addEventListener('visibilitychange',sync);addEventListener('pageshow',sync);reduced.addEventListener('change',sync);
  connection?.addEventListener('change',sync);
  players.push({sync,retry:()=>{if(blocked)play()}});sync();
 });
 let resizing;addEventListener('resize',()=>{clearTimeout(resizing);resizing=setTimeout(()=>players.forEach(p=>p.sync()),250)});
 // A browser may require the visitor's first interaction before muted playback.
 for(const event of ['pointerdown','keydown'])addEventListener(event,()=>players.forEach(p=>p.retry()),{passive:true});
})();

/* ---- scroll reveal, the behaviour from the live site ----
   Sections rise as they enter. Failsafe: anything still hidden
   after 2.5s is revealed, so a script error can never leave the
   page blank. Reduced motion skips it entirely (CSS handles it). */
(function () {
  var items = document.querySelectorAll('.rv');
  if (!items.length) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) {
    for (var i = 0; i < items.length; i++) items[i].classList.add('in');
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      en.target.classList.add('in');
      io.unobserve(en.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  for (var k = 0; k < items.length; k++) io.observe(items[k]);
  setTimeout(function () {
    var left = document.querySelectorAll('.rv:not(.in)');
    for (var n = 0; n < left.length; n++) left[n].classList.add('in');
  }, 2500);
})();
