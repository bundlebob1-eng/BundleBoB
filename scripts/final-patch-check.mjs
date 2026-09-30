import {chromium,devices} from 'playwright';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const base=process.env.TEST_URL||'http://127.0.0.1:8081';await fs.mkdir('audit/final-patch',{recursive:true});
const browser=await chromium.launch({channel:'chrome'}),results={devices:[],errors:[]};
try{
 for(const [name,options,expected] of [
  ['phone',{...devices['iPhone 13']},'portrait'],
  ['ipad-portrait',{viewport:{width:820,height:1180},deviceScaleFactor:2,isMobile:true,hasTouch:true},'tablet'],
  ['ipad-landscape',{viewport:{width:1180,height:820},deviceScaleFactor:2,isMobile:true,hasTouch:true},'hd'],
  ['desktop',{viewport:{width:1440,height:1000},deviceScaleFactor:1},'hd']
 ]){
  const context=await browser.newContext(options);await context.addInitScript(()=>{if(navigator.connection){Object.defineProperty(navigator.connection,'downlink',{get:()=>10});Object.defineProperty(navigator.connection,'rtt',{get:()=>30})}});const p=await context.newPage();p.on('pageerror',e=>results.errors.push(e.message));
  await p.goto(base);await p.evaluate(()=>document.fonts.ready);await p.waitForFunction(()=>document.querySelector('.ref-hero video').currentTime>1);
  const video=await p.locator('.ref-hero video').evaluate(v=>({src:v.currentSrc,w:v.videoWidth,h:v.videoHeight,time:v.currentTime,muted:v.muted,inline:v.playsInline,quality:v.getVideoPlaybackQuality()}));assert.ok(video.src.endsWith(`-${expected}.mp4`),`${name}: ${video.src}`);assert.equal(video.muted&&video.inline,true);
  await p.screenshot({path:`audit/final-patch/hero-${name}.png`});
  await p.locator('.work-stage').scrollIntoViewIfNeeded();await p.waitForTimeout(300);
  assert.equal(await p.locator('.work-card').first().evaluate(e=>getComputedStyle(e).transform),'none');
  const overlaps=await p.locator('.work-card').evaluateAll(es=>es.slice(1).some((e,i)=>e.getBoundingClientRect().top<es[i].getBoundingClientRect().bottom));assert.equal(overlaps,false,`${name}: overlapping cards`);
  await p.screenshot({path:`audit/final-patch/motion-${name}.png`});
  await p.locator('#services').scrollIntoViewIfNeeded();for(const i of [0,2,1]){await p.locator(`[data-service-index="${i}"]`).click();await p.waitForTimeout(650);assert.equal(await p.locator(`[data-service-index="${i}"]`).getAttribute('aria-pressed'),'true')}
  await p.locator('[data-service-index="0"]').click();await p.waitForTimeout(650);await p.locator('.ref-card').first().scrollIntoViewIfNeeded();await p.screenshot({path:`audit/final-patch/services-${name}.png`});
  for(let i=0;i<2;i++){await p.locator('[data-story-video]').nth(i).scrollIntoViewIfNeeded();await p.waitForFunction(i=>document.querySelectorAll('[data-story-video]')[i].currentTime>.5,i);assert.equal(await p.locator('[data-story-video]').nth(i).evaluate(v=>v.videoHeight>=720),true)}
  assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await p.goto(base+'/construction');await p.waitForFunction(()=>document.querySelector('[data-background-video]').currentTime>.5);await p.screenshot({path:`audit/final-patch/construction-${name}.png`});
  await p.emulateMedia({reducedMotion:'reduce'});await p.goto(base);assert.equal(await p.locator('.ref-hero video').getAttribute('src'),null);assert.equal(await p.locator('.work-card-surface').first().evaluate(e=>getComputedStyle(e).transform),'none');
  results.devices.push({name,video});await context.close();console.log(`${name}: media, sharp cards, service controls, construction and reduced motion passed`);
 }
 const p=await browser.newPage({viewport:{width:1440,height:1000}});await p.goto(base);
 const box=await p.locator('.work-story').evaluate(e=>({top:e.getBoundingClientRect().top+scrollY,height:e.offsetHeight}));const transforms=[];for(const n of [0,.5,1]){await p.evaluate(({box,n})=>scrollTo({top:box.top+(box.height-innerHeight)*n,behavior:'instant'}),{box,n});await p.waitForTimeout(200);transforms.push(await p.locator('.work-card-surface').first().evaluate(e=>getComputedStyle(e).transform))}assert.equal(new Set(transforms).size,3);results.depthTransforms=transforms;
 await p.goto(base+'/contact');assert.equal(await p.locator('#inquiry-form').getAttribute('data-email'),'contact@bundlebob.com');await p.locator('#name').fill('QA visitor');await p.locator('#company').fill('Example business');await p.locator('#email').fill('qa@example.invalid');await p.locator('#message').fill('A sample workflow question for validation.');await p.locator('[type=submit]').click();await p.locator('#inquiry-email').waitFor();const mail=await p.locator('#inquiry-email').getAttribute('href');assert.ok(mail.startsWith('mailto:contact@bundlebob.com?'));assert.ok(decodeURIComponent(mail).includes('Example business'));results.emailDraft=true;
 assert.deepEqual(results.errors,[]);await fs.writeFile('audit/final-patch/checks.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
}finally{await browser.close()}
