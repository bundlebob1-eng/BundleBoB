import {assertHomeFlow} from './home-flow-assertions.mjs';
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
  await assertHomeFlow(p);
  await p.locator('.workflow-heading').scrollIntoViewIfNeeded();await p.waitForTimeout(900);await p.screenshot({path:`audit/final-patch/motion-${name}.png`});
  await p.locator('.service-heading').scrollIntoViewIfNeeded();await p.waitForTimeout(900);await p.screenshot({path:`audit/final-patch/services-${name}.png`});
  for(let i=0;i<2;i++){await p.locator('[data-story-video]').nth(i).scrollIntoViewIfNeeded();await p.waitForFunction(i=>document.querySelectorAll('[data-story-video]')[i].currentTime>.5,i);assert.equal(await p.locator('[data-story-video]').nth(i).evaluate(v=>v.videoHeight>=720),true)}
  assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await p.goto(base+'/construction');await p.waitForFunction(()=>document.querySelector('[data-background-video]').currentTime>.5);await p.screenshot({path:`audit/final-patch/construction-${name}.png`});
  await p.emulateMedia({reducedMotion:'reduce'});await p.goto(base);assert.equal(await p.locator('.ref-hero video').getAttribute('src'),null);await assertHomeFlow(p);
  results.devices.push({name,video});await context.close();console.log(`${name}: media, natural flow, services, construction and reduced motion passed`);
 }
 const p=await browser.newPage({viewport:{width:1440,height:1000}});await p.goto(base);
 results.documentFlow=await assertHomeFlow(p);
 await p.goto(base+'/contact');assert.equal(await p.locator('#inquiry-form').getAttribute('data-email'),'contact@bundlebob.com');await p.locator('#name').fill('QA visitor');await p.locator('#company').fill('Example business');await p.locator('#email').fill('qa@example.invalid');await p.locator('#message').fill('A sample workflow question for validation.');await p.locator('[type=submit]').click();await p.locator('#inquiry-email').waitFor();const mail=await p.locator('#inquiry-email').getAttribute('href');assert.ok(mail.startsWith('mailto:contact@bundlebob.com?'));assert.ok(decodeURIComponent(mail).includes('Example business'));results.emailDraft=true;
 assert.deepEqual(results.errors,[]);await fs.writeFile('audit/final-patch/checks.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
}finally{await browser.close()}
