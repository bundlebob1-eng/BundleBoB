/* Theme lab switcher. Swaps the linked stylesheet, which is the whole
   site CSS already remapped for that palette at build time, so what you
   see is exactly what the site would ship -- not an approximation. */
(function(){
  var link=document.getElementById('theme-css');
  var bar=document.querySelector('.tl-bar');
  if(!link||!bar)return;
  var KEY='bundlebob-theme-lab';
  function select(id,store){
    link.href='/assets/theme-'+id+'.css';
    bar.querySelectorAll('[data-theme-id]').forEach(function(b){
      b.setAttribute('aria-selected',String(b.dataset.themeId===id));
    });
    if(store){try{localStorage.setItem(KEY,id)}catch(e){}}
    var u=new URL(location.href);u.searchParams.set('theme',id);history.replaceState(null,'',u);
  }
  bar.addEventListener('click',function(e){
    var b=e.target.closest('[data-theme-id]');
    if(b)select(b.dataset.themeId,true);
  });
  var initial=new URL(location.href).searchParams.get('theme');
  if(!initial){try{initial=localStorage.getItem(KEY)}catch(e){}}
  if(initial&&bar.querySelector('[data-theme-id="'+initial+'"]'))select(initial,false);
})();
