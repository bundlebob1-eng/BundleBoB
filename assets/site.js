(function(){

/* Failsafe: if the reveal observer never runs (JS error, blocked script),
   force every .rv block visible so the page can never render blank. */
setTimeout(function(){
  var e = document.querySelectorAll('.rv:not(.in)');
  for (var i = 0; i < e.length; i++) e[i].classList.add('in');
}, 2500);

(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- nav dropdowns ---- */
  document.querySelectorAll('[data-menu]').forEach(function(item){
    var btn = item.querySelector('.navbtn');
    function open(v){ item.dataset.open = v ? '1':'0'; btn.setAttribute('aria-expanded', v?'true':'false'); }
    item.addEventListener('mouseenter', function(){ open(true); });
    item.addEventListener('mouseleave', function(){ open(false); });
    btn.addEventListener('click', function(e){ e.preventDefault(); open(item.dataset.open !== '1'); });
    item.addEventListener('focusout', function(e){ if(!item.contains(e.relatedTarget)) open(false); });
    item.addEventListener('keydown', function(e){ if(e.key === 'Escape'){ open(false); btn.focus(); } });
  });

  /* ---- mobile menu ---- */
  var shell = document.getElementById('navshell'), burger = document.getElementById('burger');
  burger.addEventListener('click', function(){
    var on = shell.dataset.mobile !== '1';
    shell.dataset.mobile = on ? '1':'0';
    burger.setAttribute('aria-expanded', on?'true':'false');
    burger.setAttribute('aria-label', on ? 'Close menu':'Open menu');
  });
  shell.querySelectorAll('.mobilepanel a').forEach(function(a){
    a.addEventListener('click', function(){ shell.dataset.mobile='0'; burger.setAttribute('aria-expanded','false'); });
  });

  /* ---- hide nav on scroll down ---- */
  var last = 0;
  window.addEventListener('scroll', function(){
    var y = window.scrollY;
    if (shell.dataset.mobile === '1'){ last = y; return; }
    shell.classList.toggle('hidden', y > last && y > 260);
    last = y;
  }, {passive:true});

  /* ---- hero blueprint canvas ---- */
  var cv = document.getElementById('grid-canvas');
  if (cv && cv.getContext){
    var cx = cv.getContext('2d'), t = 0, raf;
    function size(){
      var d = Math.min(window.devicePixelRatio||1, 2);
      cv.width = cv.offsetWidth*d; cv.height = cv.offsetHeight*d; cx.setTransform(d,0,0,d,0,0);
    }
    function draw(){
      var w = cv.offsetWidth, h = cv.offsetHeight, s = 46;
      cx.clearRect(0,0,w,h);
      cx.strokeStyle = 'rgba(120,170,210,.16)'; cx.lineWidth = 1;
      for (var x = -s + (t % s); x < w + s; x += s){ cx.beginPath(); cx.moveTo(x,0); cx.lineTo(x,h); cx.stroke(); }
      for (var y = -s + (t*0.4 % s); y < h + s; y += s){ cx.beginPath(); cx.moveTo(0,y); cx.lineTo(w,y); cx.stroke(); }
      cx.strokeStyle = 'rgba(185,120,43,.40)'; cx.lineWidth = 1.6;
      for (var i=0;i<5;i++){
        var yy = ((t*0.9 + i*190) % (h+260)) - 130;
        cx.beginPath(); cx.moveTo(w*0.06, yy); cx.lineTo(w*0.34, yy - 66); cx.lineTo(w*0.62, yy - 20); cx.stroke();
      }
      if (!reduce) t += 0.22;
      raf = requestAnimationFrame(draw);
    }
    size(); draw();
    window.addEventListener('resize', size);
  }

  /* ---- marquee: duplicate for seamless loop ---- */
  document.querySelectorAll('.marquee').forEach(function(m){
    var tr = m.querySelector('.marquee-track');
    if (!tr || m.dataset.dup === '1') return;
    m.dataset.dup = '1';
    var clone = tr.cloneNode(true); clone.removeAttribute('id');
    clone.setAttribute('aria-hidden','true'); m.appendChild(clone);
  });

  /* ---- platform rail ---- */
  document.querySelectorAll('.rail').forEach(function(rail){
    var head = rail.closest('.wrap') ? rail.closest('.wrap').querySelector('.rail-nav') : null;
    if (!head) return;
    var prev = head.children[0], nx = head.children[1];
    function step(){ var c = rail.querySelector('.pcard'); return c ? c.offsetWidth + 22 : 400; }
    function sync(){
      prev.disabled = rail.scrollLeft < 12;
      nx.disabled = rail.scrollLeft > rail.scrollWidth - rail.clientWidth - 12;
    }
    prev.addEventListener('click', function(){ rail.scrollBy({left:-step(), behavior: reduce?'auto':'smooth'}); });
    nx.addEventListener('click', function(){ rail.scrollBy({left:step(), behavior: reduce?'auto':'smooth'}); });
    rail.addEventListener('scroll', sync, {passive:true});
    window.addEventListener('resize', sync);
    sync();
  });

  /* ---- testimonial carousel ---- */
  document.querySelectorAll('.tcarousel').forEach(function(car){
    var track = car.querySelector('.ttrack');
    var dots = car.parentNode.querySelector('.dots');
    if (!track || !dots || !track.children.length) return;
    var cards = track.children.length, page = 0;
    function perView(){ return window.innerWidth > 1080 ? 3 : (window.innerWidth > 720 ? 2 : 1); }
    function pages(){ return Math.max(1, cards - perView() + 1); }
    function render(){
      var n = pages(); if (page > n-1) page = n-1;
      var w = track.children[0].offsetWidth + 22;
      track.style.transform = 'translateX(' + (-page*w) + 'px)';
      dots.innerHTML = '';
      for (var i=0;i<n;i++){
        var d = document.createElement('button');
        d.setAttribute('aria-label','Go to testimonial ' + (i+1));
        d.setAttribute('aria-current', i===page ? 'true':'false');
        d.dataset.i = i; dots.appendChild(d);
      }
    }
    dots.addEventListener('click', function(e){
      var t = e.target.closest('button'); if(!t) return; page = +t.dataset.i; render();
    });
    window.addEventListener('resize', render);
    render();
    if (!reduce) setInterval(function(){ page = (page + 1) % pages(); render(); }, 6500);
  });

  /* ---- resource filter tabs ---- */
  var tabs = document.querySelectorAll('.tab');
  tabs.forEach(function(tab){
    tab.addEventListener('click', function(){
      tabs.forEach(function(t){ t.setAttribute('aria-selected','false'); });
      tab.setAttribute('aria-selected','true');
      var f = tab.dataset.filter;
      document.querySelectorAll('#rgrid .rcard').forEach(function(c){
        c.classList.toggle('hide', f !== 'all' && c.dataset.kind !== f);
      });
    });
  });

  /* ---- count up + reveal ---- */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if (!en.isIntersecting) return;
      var el = en.target;
      if (el.classList.contains('rv')) el.classList.add('in');
      io.unobserve(el);
    });
  }, {threshold:.14, rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.rv').forEach(function(el){ io.observe(el); });

  var co = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if (!en.isIntersecting) return;
      var el = en.target, target = parseFloat(el.dataset.count), sfx = el.dataset.suffix || '';
      co.unobserve(el);
      if (reduce || target === 0){ el.textContent = target + sfx; return; }
      var start = performance.now(), dur = 1300;
      (function tick(now){
        var p = Math.min(1, (now-start)/dur), e = 1 - Math.pow(1-p, 3);
        el.textContent = Math.round(target*e) + sfx;
        if (p < 1) requestAnimationFrame(tick);
      })(start);
    });
  }, {threshold:.5});
  document.querySelectorAll('[data-count]').forEach(function(el){ co.observe(el); });
})();

/* ============ TAB EXPLORER ============ */
document.querySelectorAll('.tablist').forEach(function(list){
  var scope = list.closest('.explorer');
  list.querySelectorAll('button').forEach(function(b){
    b.addEventListener('click', function(){
      list.querySelectorAll('button').forEach(function(x){ x.setAttribute('aria-selected','false'); });
      b.setAttribute('aria-selected','true');
      scope.querySelectorAll('.tabpanel').forEach(function(p){ p.removeAttribute('data-active'); });
      var t = scope.querySelector('#' + b.dataset.tab);
      if (t) t.setAttribute('data-active','1');
    });
  });
});

/* ============ STICKY FEATURE STEPS ============ */
(function(){
  var steps = document.querySelectorAll('.sfstep');
  if (!steps.length) return;
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){
      if (e.isIntersecting){
        steps.forEach(function(s){ s.removeAttribute('data-on'); });
        e.target.setAttribute('data-on','1');
      }
    });
  }, {rootMargin:'-45% 0px -45% 0px'});
  steps.forEach(function(s){ io.observe(s); });
})();

/* ============ TOC SCROLLSPY ============ */
(function(){
  document.querySelectorAll('.toc').forEach(function(toc){
  var links = [].slice.call(toc.querySelectorAll('a'));
  var targets = links.map(function(a){ return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
  if (!targets.length) return;
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){
      if (!e.isIntersecting) return;
      links.forEach(function(a){
        a.setAttribute('aria-current', a.getAttribute('href') === '#' + e.target.id ? 'true':'false');
      });
    });
  }, {rootMargin:'-120px 0px -70% 0px'});
  targets.forEach(function(t){ io.observe(t); });
  });
})();

/* ============ RESOURCE SEARCH / FILTER / SORT ============ */
(function(){
  var list = document.getElementById('rlist');
  if (!list) return;
  var search = document.getElementById('rsearch'), kind = document.getElementById('rkind'),
      sort = document.getElementById('rsort'), count = document.getElementById('rcount');
  var all = [].slice.call(list.children);
  function apply(){
    var q = (search.value||'').toLowerCase().trim(), k = kind.value, shown = 0;
    all.forEach(function(c){
      var okKind = k === 'all' || c.dataset.kind === k;
      var hay = ((c.dataset.title||'') + ' ' + c.textContent).toLowerCase();
      var okQ = !q || hay.indexOf(q) > -1;
      var on = okKind && okQ;
      c.classList.toggle('hide', !on);
      if (on) shown++;
    });
    if (sort.value === 'az'){
      all.slice().sort(function(a,b){ return (a.dataset.title||'').localeCompare(b.dataset.title||''); })
         .forEach(function(c){ list.appendChild(c); });
    } else {
      all.forEach(function(c){ list.appendChild(c); });
    }
    count.textContent = 'Showing ' + shown + ' of ' + all.length + ' resources';
  }
  [search, kind, sort].forEach(function(el){ el.addEventListener('input', apply); });
  apply();
})();

/* ============ INTEGRATION FILTERS ============ */
(function(){
  var list = document.getElementById('ilist');
  if (!list) return;
  var boxes = [].slice.call(document.querySelectorAll('.ifilter')),
      liveOnly = document.getElementById('liveonly'), count = document.getElementById('icount');
  var cards = [].slice.call(list.children);
  function apply(){
    var cats = boxes.filter(function(b){ return b.checked; }).map(function(b){ return b.value; });
    var shown = 0;
    cards.forEach(function(c){
      var on = cats.indexOf(c.dataset.cat) > -1 && (!liveOnly.checked || c.dataset.live === '1');
      c.classList.toggle('hide', !on);
      if (on) shown++;
    });
    count.textContent = 'Showing ' + shown + ' of ' + cards.length + ' integrations';
  }
  boxes.concat([liveOnly]).forEach(function(b){ b.addEventListener('change', apply); });
  apply();
})();

/* ============ DEMO FORM ============ */
(function(){
  var f = document.getElementById('demoform');
  if (!f) return;
  var note = document.getElementById('formnote');
  f.addEventListener('submit', function(e){
    e.preventDefault();
    var bad = null;
    [].slice.call(f.querySelectorAll('[required]')).forEach(function(el){
      var ok = el.type === 'checkbox' ? el.checked : el.value.trim() !== '';
      if (el.type === 'email' && ok) ok = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value);
      el.style.borderColor = ok ? '' : '#C0392B';
      if (!ok && !bad) bad = el;
    });
    if (bad){
      note.textContent = 'Please complete the highlighted fields.';
      note.style.color = '#C0392B';
      bad.focus();
      return;
    }
    note.style.color = '';
    note.textContent = 'Front end only — wire this form to your CRM or form endpoint before launch.';
    f.querySelector('button[type=submit]').textContent = 'Validated ✓';
  });
})();

/* ============ SMOOTH ANCHORS ============ */
document.addEventListener('click', function(e){
  var a = e.target.closest('a[href^="#"]');
  if (!a) return;
  var id = a.getAttribute('href');
  if (id.length < 2 || id.indexOf('#/') === 0) return;
  var t = document.querySelector(id);
  if (!t) return;
  e.preventDefault();
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({top: t.getBoundingClientRect().top + window.scrollY - 110, behavior: reduce ? 'auto':'smooth'});
});

/* ============ ISOMETRIC DIAGRAM — subtle pointer parallax ============ */
(function(){
  var iso = document.getElementById('iso'), stage = document.getElementById('iso-stage');
  if (!iso || !stage) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(max-width: 720px)').matches) return;
  var raf = 0, px = 0, py = 0;
  iso.addEventListener('pointermove', function(e){
    var r = iso.getBoundingClientRect();
    px = ((e.clientX - r.left) / r.width - 0.5) * 12;
    py = ((e.clientY - r.top) / r.height - 0.5) * -9;
    if (raf) return;
    raf = requestAnimationFrame(function(){
      raf = 0;
      stage.style.setProperty('--px', px.toFixed(2) + 'deg');
      stage.style.setProperty('--py', py.toFixed(2) + 'deg');
    });
  });
  iso.addEventListener('pointerleave', function(){
    stage.style.setProperty('--px', '0deg');
    stage.style.setProperty('--py', '0deg');
  });
})();

})();