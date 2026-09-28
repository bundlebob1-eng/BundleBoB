import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const base=process.env.TEST_URL||'http://127.0.0.1:8080';
const browser=await chromium.launch({channel:process.env.CHROME_CHANNEL||'chrome'});
await fs.mkdir('audit/experience',{recursive:true});
const results={},errors=[];
const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'no-preference'});
page.on('pageerror',e=>errors.push(e.message));
try{
 await page.goto(base);await page.locator('.ex-hero').waitFor();
 await page.evaluate(()=>document.fonts.ready);
 assert.equal((await page.locator('h1').innerText()).toLowerCase(),'your world.\nworking\nbetter.');
 assert.equal(await page.locator('.en-industry-links a').count(),13);
 assert.equal(await page.locator('[data-signal]').count(),0);
 results.positioning='Cross-industry services; construction demonstration; direct FDE';
 const film=page.locator('.ex-hero [data-background-video]');
 await page.waitForFunction(()=>document.querySelector('.ex-hero video').currentTime>.1);
 await page.locator('.ex-hero [data-video-toggle]').click();
 assert.equal(await film.evaluate(v=>v.paused),true);
   await page.waitForTimeout(150);
 const pausedA=await page.screenshot();await page.waitForTimeout(300);const pausedB=await page.screenshot();assert.deepEqual(pausedA,pausedB,'Pause must actually stop visual motion');
 await page.locator('.ex-hero [data-video-toggle]').click();await page.waitForTimeout(250);const movingA=await page.screenshot();await page.waitForTimeout(350);const movingB=await page.screenshot();assert.notDeepEqual(movingA,movingB,'The film should render new frames');results.filmPauseResume=true;
 await page.locator('[data-capability-id="1"]').click();assert.equal(await page.locator('[data-capability-link]').getAttribute('href'),'/services/custom-software');
 await page.keyboard.press('ArrowRight');assert.equal(await page.locator('[data-capability-id="2"]').getAttribute('aria-pressed'),'true');assert.equal(await page.locator('[data-capability-link]').getAttribute('href'),'/services/integrations');
 await page.keyboard.press('Home');assert.equal(await page.locator('[data-capability-id="0"]').getAttribute('aria-pressed'),'true');results.capabilityMouseAndKeyboard=true;
 await page.screenshot({path:'audit/experience/home-desktop.png'});
 await page.evaluate(()=>scrollTo({top:250,behavior:'instant'}));await page.waitForTimeout(100);assert.ok(Number(await page.locator('.ex-hero').evaluate(e=>e.style.getPropertyValue('--ex-progress')))>.1);results.scrollDepth=true;
 await page.locator('.ex-field-film').scrollIntoViewIfNeeded();await page.waitForFunction(()=>document.querySelector('.ex-field-video').currentTime>.1);
 await page.waitForFunction(()=>{const v=document.querySelector('[data-background-video]');return !v||v.paused});assert.equal(await film.evaluate(v=>v.paused),true);results.offscreenPauseAndSecondFilm=true;
 await page.screenshot({path:'audit/experience/fde-film.png'});
 await page.emulateMedia({reducedMotion:'reduce'});await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(100);
 assert.equal(await film.evaluate(v=>v.paused),true);assert.equal(await page.locator('[data-business-globe]').count(),0);assert.equal(await page.evaluate(()=>document.getAnimations().filter(a=>a.playState==='running').length),0);results.reducedMotion=true;
 results.layouts=[];
 for(const width of [320,390,600,760,761,900,1024,1100,1280,1440,1920]){
  await page.setViewportSize({width,height:900});await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
  const check=await page.evaluate(()=>{
   const rect=e=>{const r=e.getBoundingClientRect();return {left:r.left,right:r.right,top:r.top,bottom:r.bottom}};
   const copy=rect(document.querySelector('.ex-hero-copy')),panel=rect(document.querySelector('.ex-capability'));
   const overlap=(a,b)=>a.left<b.right&&a.right>b.left&&a.top<b.bottom&&a.bottom>b.top;
   return {overflow:document.documentElement.scrollWidth>innerWidth,labels:[].map(e=>({text:e.textContent,clipped:rect(e).right>innerWidth||rect(e).left<0,overlap:overlap(rect(e),copy)||overlap(rect(e),panel)})),heading:[...document.querySelectorAll('h1>span,h1>em')].every(e=>rect(e).left>=0&&rect(e).right<=innerWidth)};
  });
  assert.equal(check.overflow,false,`Overflow at ${width}`);assert.equal(check.heading,true,`Heading clipped at ${width}`);assert.equal(check.labels.some(l=>l.clipped||l.overlap),false,`Orbit label collision at ${width}: ${JSON.stringify(check.labels)}`);results.layouts.push(width);
 }
 await page.setViewportSize({width:390,height:844});await page.goto(base);await page.screenshot({path:'audit/experience/home-mobile.png'});
 await page.locator('.ex-capability').scrollIntoViewIfNeeded();await page.screenshot({path:'audit/experience/mobile-controls.png'});
 const nojs=await browser.newContext({javaScriptEnabled:false});const fallback=await nojs.newPage();await fallback.goto(base);assert.equal(await fallback.locator('.ex-capability-options a[href^="/services/"]').count(),3);assert.equal(await fallback.locator('.ex-capability-options a').count(),3);assert.equal(await fallback.locator('.en-problems h2').isVisible(),true);await nojs.close();results.noJavaScriptFallback=true;
   // The WebGL globe was removed; there is no canvas to fall back from.
 assert.equal((await page.request.get(base+'/theme-lab')).status(),404);assert.equal((await page.request.get(base+'/assets/signal.js')).status(),404);results.retiredExperimentsExcluded=true;
 assert.deepEqual(errors,[]);results.errors=errors;
}finally{await browser.close()}
await fs.writeFile('audit/experience/results.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
