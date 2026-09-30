// Decorative background motion loops while visible.
// No floating film controls. Reduced motion and Save-Data use the poster.
(() => {
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const connection=navigator.connection;
 const limited=connection?.saveData||/(^|-)(2g|3g)$/.test(connection?.effectiveType||'');
 document.querySelectorAll('[data-background-video]').forEach(video=>{
  let visible=false;
  video.loop=true;video.muted=true;video.defaultMuted=true;video.playsInline=true;
  function sync(){
   if(!visible||document.hidden||reduced.matches||limited){video.pause();return}
   if(!video.getAttribute('src')){video.src=matchMedia('(max-width:760px)').matches&&video.dataset.mobileSrc?video.dataset.mobileSrc:video.dataset.src;video.load()}
   video.play().catch(()=>{});
  }
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync()},{threshold:.05}).observe(video);
  document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);
 });

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
