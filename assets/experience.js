/* Palette bridge: the shaders below are written against the three
   roles, not against fixed colours, so a theme change in CSS reaches
   the WebGL layer too. Falls back to the shipped values if a token is
   missing or unreadable. */
function paletteVec(name, fallback){
  try{
    var v=getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    var m=/^#?([0-9a-f]{6})$/i.exec(v);
    if(!m) return fallback;
    var n=parseInt(m[1],16);
    return [((n>>16)&255)/255, ((n>>8)&255)/255, (n&255)/255];
  }catch(e){ return fallback; }
}
function glsl(v){ return 'vec3('+v.map(function(x){return x.toFixed(4)}).join(',')+')'; }
/* An original, small WebGL globe. Geometry is local; the rest of the page
   remains ordinary HTML. No scroll interception or animation dependency. */
(() => {
 'use strict';
 const opening=document.querySelector('[data-experience]');
 if(!opening)return;
 const hero=opening.querySelector('.ex-hero');
 const canvas=opening.querySelector('[data-business-globe]');
 const globe=canvas.parentElement;
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 const compact=matchMedia('(max-width: 760px)');
 const toggle=opening.querySelector('[data-globe-toggle]');
 const header=document.querySelector('.site-header');
 const capabilities=[
  ['Less repetitive work. More room for human judgment.','Explore applied AI','/services/ai-solutions'],
  ['Tools that fit the process. Built with the people using them.','Explore custom software','/services/custom-software'],
  ['Connect the records. See the exceptions. Act with context.','Explore connected systems','/services/integrations']
 ];
 let selected=0,progress=0,visible=true,userPaused=false,frame=0,last=0,time=0;
 let pointerX=0,pointerY=0,gl=null,draw=null,lost=false;
 const options=opening.querySelector('.ex-capability-options');
 const buttons=[...options.querySelectorAll('a')].map((link,i)=>{
  const b=document.createElement('button');b.type='button';b.innerHTML=link.innerHTML;
  b.className=link.className;b.dataset.capabilityId=String(i);b.setAttribute('aria-pressed',String(i===0));b.setAttribute('aria-controls','capability-detail');
  link.replaceWith(b);b.addEventListener('click',()=>select(i));return b;
 });
 function select(i){
  selected=i;
  buttons.forEach((b,j)=>{b.classList.toggle('is-selected',i===j);b.setAttribute('aria-pressed',String(i===j))});
  opening.querySelector('[data-capability-copy]').textContent=capabilities[i][0];
  const link=opening.querySelector('[data-capability-link]');link.firstChild.textContent=capabilities[i][1]+' ';link.href=capabilities[i][2];
  globe.dataset.capability=String(i);requestFrame();
 }
 options.addEventListener('keydown',e=>{
  const i=buttons.indexOf(document.activeElement);if(i<0)return;
  const next=e.key==='ArrowRight'?(i+1)%3:e.key==='ArrowLeft'?(i+2)%3:e.key==='Home'?0:e.key==='End'?2:-1;
  if(next>=0){e.preventDefault();buttons[next].focus();select(next)}
 });
 function paused(){return motion.matches||userPaused||Boolean(navigator.connection?.saveData)}
 function state(){
  const stopped=paused();toggle.setAttribute('aria-label',stopped?'Play globe animation':'Pause globe animation');
  toggle.querySelector('[data-globe-toggle-icon]').textContent=stopped?'▶':'Ⅱ';
  toggle.querySelector('[data-globe-toggle-label]').textContent=stopped?'Play 3D':'Pause 3D';
  globe.dataset.state=lost?'unavailable':!visible||document.hidden?'offscreen':motion.matches?'reduced':stopped?'paused':'running';
 }
 function tick(now){
  frame=0;if(!draw||lost||!visible||document.hidden)return;
  if(!paused()&&last&&now-last<32){frame=requestAnimationFrame(tick);return}
  if(!paused())time+=Math.min(.06,last?(now-last)/1000:0);
  last=now;
  draw(time,motion.matches?0:progress,motion.matches?0:pointerX,motion.matches?0:pointerY,selected);
  if(!paused())frame=requestAnimationFrame(tick);
 }
 function requestFrame(){if(draw&&!frame&&!lost&&visible&&!document.hidden)frame=requestAnimationFrame(tick)}
 function sync(){cancelAnimationFrame(frame);frame=0;last=0;state();requestFrame()}
 toggle.addEventListener('click',()=>{
  // A reduced-motion preference is respected even after interaction.
  if(motion.matches)return;
  userPaused=!userPaused;sync();
 });
 motion.addEventListener('change',()=>{toggle.hidden=motion.matches||!draw;scroll();sync()});
 document.addEventListener('visibilitychange',sync);
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync()},{threshold:.01}).observe(hero);
 let scrollFrame=0;
 function scroll(){
  scrollFrame=0;header.classList.toggle('ex-header-scrolled',scrollY>40);
  progress=motion.matches||compact.matches?0:Math.max(0,Math.min(1,-opening.getBoundingClientRect().top/Math.max(1,opening.offsetHeight-hero.offsetHeight)));
  hero.style.setProperty('--ex-progress',progress.toFixed(3));requestFrame();
 }
 addEventListener('scroll',()=>{if(!scrollFrame)scrollFrame=requestAnimationFrame(scroll)},{passive:true});
 addEventListener('resize',scroll,{passive:true});compact.addEventListener('change',scroll);scroll();
 if(matchMedia('(hover:hover) and (pointer:fine)').matches){
  hero.addEventListener('pointermove',e=>{if(paused())return;pointerX=(e.clientX/innerWidth-.5)*.16;pointerY=(e.clientY/innerHeight-.5)*.09;requestFrame()},{passive:true});
  hero.addEventListener('pointerleave',()=>{pointerX=0;pointerY=0;requestFrame()});
 }
 canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();lost=true;cancelAnimationFrame(frame);frame=0;globe.removeAttribute('data-ready');toggle.hidden=true;state()});
 canvas.addEventListener('webglcontextrestored',()=>{lost=false;init()});

 async function init(){
  try{
   gl=canvas.getContext('webgl',{alpha:true,antialias:true,premultipliedAlpha:false,powerPreference:'low-power'});
   if(!gl)return;
   const response=await fetch('/assets/globe-data.json');if(!response.ok)return;
   const data=new Float32Array(await response.json());
   function program(v,f){
    const compile=(kind,src)=>{const shader=gl.createShader(kind);gl.shaderSource(shader,src);gl.compileShader(shader);if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))throw new Error('Globe shader unavailable');return shader};
    const p=gl.createProgram(),vs=compile(gl.VERTEX_SHADER,v),fs=compile(gl.FRAGMENT_SHADER,f);gl.attachShader(p,vs);gl.attachShader(p,fs);gl.linkProgram(p);gl.deleteShader(vs);gl.deleteShader(fs);if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw new Error('Globe unavailable');return p;
   }
   const P_INK=paletteVec('--ink',[.035,.062,.083]),P_PAP=paletteVec('--paper',[.957,.945,.918]),
         P_ACC=paletteVec('--hivis',[1,.831,0]),P_MUT=[(P_PAP[0]+P_INK[0])/2,(P_PAP[1]+P_INK[1])/2,(P_PAP[2]+P_INK[2])/2];
   const sphere=program(`attribute vec2 aPosition;varying vec2 vPosition;void main(){vPosition=aPosition;gl_Position=vec4(aPosition,0.,1.);}`,`
    precision mediump float;varying vec2 vPosition;uniform float uZoom;
    void main(){vec2 p=vPosition/(.76*uZoom);float r=length(p);vec3 ink=${glsl(P_INK)};vec3 gold=${glsl(P_ACC)};vec3 paper=${glsl(P_PAP)};
    float light=clamp(.45+p.y*.4+p.x*.24,.0,1.);float rim=exp(-abs(r-1.)*95.);float halo=exp(-abs(r-1.)*20.)*.16;
    if(r>1.){gl_FragColor=vec4(mix(paper,gold,light),rim*.55+halo*.8);return;}
    float edge=pow(r,14.);vec3 body=ink+${glsl(P_INK.map(function(x){return x*0.16}))}*(1.-r);body+=mix(paper,gold,light)*(edge*.12+rim*.7+halo*.15);gl_FragColor=vec4(body,.99);}`);
   const vertex=`attribute vec4 aPoint;uniform float uYaw,uPitch,uZoom,uDpr;varying float vDepth,vKind;
    void main(){float cy=cos(uYaw),sy=sin(uYaw),cx=cos(uPitch),sx=sin(uPitch);vec3 p=vec3(aPoint.x*cy+aPoint.z*sy,aPoint.y,aPoint.z*cy-aPoint.x*sy);p=vec3(p.x,p.y*cx-p.z*sx,p.y*sx+p.z*cx);vDepth=p.z;vKind=aPoint.w;gl_Position=vec4(p.xy*.76*uZoom,0.,1.);gl_PointSize=(.85+aPoint.w*1.35)*uDpr*(.65+max(p.z,0.)*.45);}`;
   const land=program(vertex,`precision mediump float;varying float vDepth,vKind;void main(){if(vDepth<.015)discard;float a=1.-smoothstep(.3,.5,length(gl_PointCoord-vec2(.5)));vec3 c=mix(${glsl(P_MUT)},${glsl(P_PAP)},vKind);float opacity=mix(.16,.95,vKind)*(.3+vDepth*.7);gl_FragColor=vec4(c,a*opacity);}`);
   const lines=program(vertex,`precision mediump float;varying float vDepth,vKind;uniform float uSelected,uPulse;void main(){if(vDepth<.02)discard;float on=1.-step(.1,abs(vKind-uSelected));vec3 c=mix(${glsl(P_PAP)},${glsl(P_ACC)},on);gl_FragColor=vec4(c,(.16+on*.65+uPulse*.2)*smoothstep(0.,.2,vDepth));}`);
   const buffer=(a)=>{const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(a),gl.STATIC_DRAW);return b};
   const quad=buffer([-1,-1,1,-1,-1,1,1,1]);const dots=buffer(data);
   function unit(lat,lon){const a=lat*Math.PI/180,b=lon*Math.PI/180;return [Math.cos(a)*Math.sin(b),Math.sin(a),Math.cos(a)*Math.cos(b)]}
   const routes=[[[51,-.1],[19,73],0],[[19,73],[-34,151],1],[[35,140],[1,104],2],[[51,-.1],[-34,18],2],[[40,-74],[51,-.1],1]];
   const paths=routes.map(([a,b,group])=>{
    const start=unit(...a),end=unit(...b),omega=Math.acos(Math.max(-1,Math.min(1,start.reduce((s,v,i)=>s+v*end[i],0))));
    const point=t=>{const lift=1+Math.sin(t*Math.PI)*.22;return start.map((v,i)=>(v*Math.sin((1-t)*omega)+end[i]*Math.sin(t*omega))/Math.sin(omega)*lift).concat(group)};
    const vertices=[];for(let i=0;i<=80;i++)vertices.push(...point(i/80));return {buffer:buffer(vertices),point,group};
   });
   const pulses=buffer(new Array(paths.length*4).fill(0));
   const uniforms=p=>Object.fromEntries(['uYaw','uPitch','uZoom','uDpr','uSelected','uPulse'].map(n=>[n,gl.getUniformLocation(p,n)]));
   const pu=uniforms(land),lu=uniforms(lines),su=uniforms(sphere);
   const pointPosition=gl.getAttribLocation(land,'aPoint'),linePosition=gl.getAttribLocation(lines,'aPoint'),quadPosition=gl.getAttribLocation(sphere,'aPosition');
   let dpr=1;
   function resize(){const size=globe.clientWidth;dpr=Math.min(devicePixelRatio||1,compact.matches?1.25:1.65);canvas.width=Math.round(size*dpr);canvas.height=canvas.width;gl.viewport(0,0,canvas.width,canvas.height);requestFrame()}
   new ResizeObserver(resize).observe(globe);resize();
   const bind=(b,location,size)=>{gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.enableVertexAttribArray(location);gl.vertexAttribPointer(location,size,gl.FLOAT,false,0,0)};
   const setup=(p,u,t,scroll,x,y,selected)=>{gl.useProgram(p);gl.uniform1f(u.uYaw,-.95+Math.sin(t*.075)*.19+scroll*.5+x);gl.uniform1f(u.uPitch,.17+y-scroll*.05);gl.uniform1f(u.uZoom,1+scroll*.14);gl.uniform1f(u.uDpr,dpr);gl.uniform1f(u.uSelected,selected);gl.uniform1f(u.uPulse,0)};
   gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);gl.clearColor(0,0,0,0);
   draw=(t,scroll,x,y,selected)=>{
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(sphere);gl.uniform1f(su.uZoom,1+scroll*.14);bind(quad,quadPosition,2);gl.drawArrays(gl.TRIANGLE_STRIP,0,4);gl.disableVertexAttribArray(quadPosition);
    setup(land,pu,t,scroll,x,y,selected);bind(dots,pointPosition,4);gl.drawArrays(gl.POINTS,0,data.length/4);gl.disableVertexAttribArray(pointPosition);
    setup(lines,lu,t,scroll,x,y,selected);paths.forEach(p=>{bind(p.buffer,linePosition,4);gl.drawArrays(gl.LINE_STRIP,0,81)});
    const pulseData=paths.flatMap((p,i)=>p.point((t*.075+i*.21)%1));gl.bindBuffer(gl.ARRAY_BUFFER,pulses);gl.bufferSubData(gl.ARRAY_BUFFER,0,new Float32Array(pulseData));bind(pulses,linePosition,4);gl.uniform1f(lu.uPulse,1);gl.drawArrays(gl.POINTS,0,paths.length);gl.disableVertexAttribArray(linePosition);
    if(!globe.hasAttribute('data-ready'))globe.setAttribute('data-ready','');
   };
   toggle.hidden=motion.matches||Boolean(navigator.connection?.saveData);sync();
  }catch{globe.removeAttribute('data-ready');toggle.hidden=true;lost=true;state()}
 }
 init();
})();
