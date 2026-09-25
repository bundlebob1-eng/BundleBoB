/* ============================================================
   SIGNAL — live hero field. Hand-written WebGL, no library.
   Two counter-rotating streams of records: operations (cyan)
   and accounting (violet). A travelling divergence pushes the
   accounting stream outward; that region flares amber. The
   readout under the headline reports the same gap in dollars,
   so the picture and the number never disagree.
   Decorative: bails silently on reduced motion or no WebGL.
   ============================================================ */
(function () {
  var canvas = document.querySelector('[data-signal]');
  if (!canvas) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var gl;
  try {
    gl = canvas.getContext('webgl', { alpha: true, antialias: true, premultipliedAlpha: false }) ||
         canvas.getContext('experimental-webgl');
  } catch (e) { return; }
  if (!gl) return;

  var VERT = [
    'attribute float aAngle,aRad,aY,aStream,aSeed;',
    'uniform float uTime,uAspect,uDpr,uShift;',
    'uniform vec2 uTilt;',
    'varying float vDiff,vStream,vFade;',
    'void main(){',
    '  float dir = aStream < .5 ? 1.0 : -1.0;',
    '  float ang = aAngle + uTime*0.16*dir;',
    '  float w = cos(ang - uTime*0.30);',
    '  float diff = pow(max(w,0.0),9.0);',
    '  float rad = aRad + sin(uTime*0.7 + aSeed*6.2)*0.03;',
    '  rad += (aStream < .5 ? -diff*0.10 : diff*0.46);',
    '  float y = aY + sin(uTime*0.5 + aSeed*9.0)*0.05;',
    '  vec3 p = vec3(cos(ang)*rad, y, sin(ang)*rad);',
    '  float cx=cos(uTilt.y), sx=sin(uTilt.y);',
    '  p = vec3(p.x, p.y*cx - p.z*sx, p.y*sx + p.z*cx);',
    '  float cy=cos(uTilt.x), sy=sin(uTilt.x);',
    '  p = vec3(p.x*cy + p.z*sy, p.y, -p.x*sy + p.z*cy);',
    '  p.z += 3.05;',
    '  float persp = 2.55 / max(p.z, 0.25);',
    '  gl_Position = vec4(p.x*persp/uAspect + uShift, p.y*persp + 0.06, 0.0, 1.0);',
    '  gl_PointSize = (2.6 + diff*6.0) * persp * uDpr;',
    '  vDiff = diff; vStream = aStream;',
    '  vFade = clamp(persp*0.72, 0.30, 1.0);',
    '}'
  ].join('\n');

  var FRAG = [
    'precision mediump float;',
    'varying float vDiff,vStream,vFade;',
    'uniform vec3 uOps,uAcct,uDif;',
    'void main(){',
    '  vec2 c = gl_PointCoord - 0.5;',
    '  float d = dot(c,c);',
    '  if (d > 0.25) discard;',
    '  float a = smoothstep(0.25,0.015,d);',
    '  vec3 col = mix(uOps,uAcct,vStream);',
    '  col = mix(col,uDif,vDiff);',
    '  gl_FragColor = vec4(col, a*vFade*(0.80 + vDiff*0.20));',
    '}'
  ].join('\n');

  function compile(type, src) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src); gl.compileShader(s);
    return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
  }
  var vs = compile(gl.VERTEX_SHADER, VERT), fs = compile(gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return;
  var prog = gl.createProgram();
  gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
  gl.useProgram(prog);

  /* ---- the field ---- */
  var N = 2600, angle = [], rad = [], yy = [], stream = [], seed = [];
  for (var i = 0; i < N; i++) {
    var s = i % 2;
    angle.push(Math.random() * Math.PI * 2);
    rad.push((s ? 1.46 : 1.12) + (Math.random() - 0.5) * 0.055);
    yy.push((Math.random() - 0.5) * 0.30);
    stream.push(s);
    seed.push(Math.random());
  }
  function attrib(name, data) {
    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(prog, name);
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 1, gl.FLOAT, false, 0, 0);
  }
  attrib('aAngle', angle); attrib('aRad', rad); attrib('aY', yy);
  attrib('aStream', stream); attrib('aSeed', seed);

  var uTime = gl.getUniformLocation(prog, 'uTime'),
      uAspect = gl.getUniformLocation(prog, 'uAspect'),
      uDpr = gl.getUniformLocation(prog, 'uDpr'),
      uTilt = gl.getUniformLocation(prog, 'uTilt'),
      uShift = gl.getUniformLocation(prog, 'uShift');
  gl.uniform3f(gl.getUniformLocation(prog, 'uOps'), 0.24, 0.88, 1.0);
  gl.uniform3f(gl.getUniformLocation(prog, 'uAcct'), 0.66, 0.55, 1.0);
  gl.uniform3f(gl.getUniformLocation(prog, 'uDif'), 1.0, 0.69, 0.13);

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE);   /* additive: the overlaps glow */

  var dpr = 1, W = 0, H = 0;
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = Math.max(1, (W * dpr) | 0);
    canvas.height = Math.max(1, (H * dpr) | 0);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform1f(uAspect, W / Math.max(H, 1));
    gl.uniform1f(uDpr, dpr);
    gl.uniform1f(uShift, W > 900 ? 0.42 : 0.0);
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  /* ---- pointer parallax, heavily damped ---- */
  var tx = 0, ty = 0, cxp = 0, cyp = 0;
  window.addEventListener('pointermove', function (e) {
    tx = (e.clientX / window.innerWidth - 0.5) * 0.55;
    ty = (e.clientY / window.innerHeight - 0.5) * 0.30;
  }, { passive: true });

  /* ---- the readout agrees with the picture ---- */
  var elGap = document.querySelector('[data-sg-gap]'),
      elState = document.querySelector('[data-sg-state]');
  var BASE = 184600, PEAK = 11850;

  /* ---- pause when off-screen ---- */
  var visible = true;
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { visible = es[0].isIntersecting; },
      { threshold: 0.01 }).observe(canvas);
  }

  var t0 = performance.now(), raf = 0;
  function frame(now) {
    raf = requestAnimationFrame(frame);
    if (!visible) return;
    var t = (now - t0) / 1000;
    cxp += (tx - cxp) * 0.045; cyp += (ty - cyp) * 0.045;

    gl.uniform1f(uTime, t);
    gl.uniform2f(uTilt, cxp, cyp + 0.12);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, N);

    if (elGap) {
      var w = Math.max(Math.cos(t * 0.30), 0);
      var g = Math.round(Math.pow(w, 4) * PEAK);
      elGap.textContent = '$' + g.toLocaleString('en-US');
      if (elState) {
        var open = g > 400;
        elState.textContent = open ? 'DIFFERENCE OPEN' : 'RECONCILED';
        elState.className = open ? 'df' : 'ok';
      }
    }
  }
  raf = requestAnimationFrame(frame);

  window.addEventListener('pagehide', function () { cancelAnimationFrame(raf); });
})();
