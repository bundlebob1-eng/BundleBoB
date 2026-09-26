import {chromium} from 'playwright';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const base=process.env.TEST_URL||'http://127.0.0.1:8080';
const browser=await chromium.launch({channel:process.env.CHROME_CHANNEL||'chrome'});
await fs.mkdir('audit/enterprise',{recursive:true});
const errors=[];const results={};
const page=await browser.newPage({viewport:{width:1440,height:1000}});
page.on('pageerror',e=>errors.push(e.message));page.setDefaultTimeout(15000);
try{
 await page.goto(base,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
 const video=page.locator('[data-background-video]');await page.waitForFunction(()=>document.querySelector('[data-background-video]').currentTime>.2);
 assert.equal(await video.evaluate(v=>v.muted),true);results.backgroundPlays=true;
 await page.getByRole('button',{name:'Pause background video',exact:true}).click();assert.equal(await video.evaluate(v=>v.paused),true);results.pause=true;
 await page.getByRole('button',{name:'Play background video',exact:true}).click();await page.waitForFunction(()=>!document.querySelector('[data-background-video]').paused);results.resume=true;
 await page.screenshot({path:'audit/enterprise/home-desktop.png'});
 await page.locator('#services').scrollIntoViewIfNeeded();await page.waitForFunction(()=>document.querySelector('[data-background-video]').paused);results.offscreenPauses=true;
 await page.evaluate(()=>scrollTo(0,0));await page.waitForFunction(()=>!document.querySelector('[data-background-video]').paused);
 await page.emulateMedia({reducedMotion:'reduce'});await page.waitForFunction(()=>document.querySelector('[data-background-video]').paused);results.reducedMotion=true;
 const menu=page.locator('.nav-item summary').filter({hasText:'Services'});await menu.focus();await page.keyboard.press('Enter');assert.equal(await page.locator('.nav-item[open]').count(),1);await page.keyboard.press('Escape');assert.equal(await menu.evaluate(e=>e===document.activeElement),true);results.menuKeyboard=true;
 for(const width of [320,390,768,1024,1440,1920]){
  await page.setViewportSize({width,height:900});await page.goto(base);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`Home overflow at ${width}`);
 }
 await page.setViewportSize({width:1440,height:1000});await page.goto(base);await page.locator('img').evaluateAll(imgs=>imgs.forEach(img=>img.loading='eager'));await page.waitForFunction(()=>[...document.images].every(i=>i.complete));await page.screenshot({path:'audit/enterprise/home-desktop-full.png',fullPage:true});
 await page.setViewportSize({width:390,height:844});await page.goto(base);await page.locator('img').evaluateAll(imgs=>imgs.forEach(img=>img.loading='eager'));await page.waitForFunction(()=>[...document.images].every(i=>i.complete));await page.screenshot({path:'audit/enterprise/home-mobile.png'});await page.screenshot({path:'audit/enterprise/home-mobile-full.png',fullPage:true});
 await page.locator('.menu-toggle').click();await page.getByRole('navigation',{name:'Mobile navigation'}).getByRole('link',{name:'Construction technology',exact:true}).click();assert.equal(new URL(page.url()).pathname,'/construction');results.mobileNavigation=true;
 await page.goto(base+'/construction#tour-review');assert.equal(await page.locator('#tour-review').isVisible(),true);assert.equal(await page.locator('#tour-sources').isVisible(),false);results.deepLinkedTour=true;
 await page.locator('#tour-tab-2').focus();await page.keyboard.press('Home');assert.equal(await page.locator('#tour-sources').isVisible(),true);await page.keyboard.press('ArrowDown');assert.equal(await page.locator('#tour-difference').isVisible(),true);results.tourKeyboard=true;
 await page.locator('[data-tour-direction="1"]').click();assert.equal(await page.locator('#tour-review').isVisible(),true);results.tourControls=true;
 await page.setViewportSize({width:1440,height:1000});await page.goto(base+'/construction');await page.screenshot({path:'audit/enterprise/construction-desktop-full.png',fullPage:true});
 await page.goto(base+'/services/ai-solutions');await page.screenshot({path:'audit/enterprise/ai-desktop-full.png',fullPage:true});await page.locator('.en-faq summary').first().click();assert.equal(await page.locator('.en-faq details').first().evaluate(e=>e.open),true);results.faq=true;
 const nojs=await browser.newContext({javaScriptEnabled:false});const fallback=await nojs.newPage();await fallback.goto(base+'/construction');assert.equal(await fallback.locator('[data-tour-panel]:visible').count(),3);assert.equal(await fallback.locator('[data-background-video]').getAttribute('src'),null);results.noScriptFallback=true;await nojs.close();
 const reduced=await browser.newContext({reducedMotion:'reduce'});const r=await reduced.newPage();const requested=[];r.on('request',req=>{if(req.url().endsWith('people-at-work.mp4'))requested.push(req.url())});await r.goto(base,{waitUntil:'networkidle'});assert.equal(requested.length,0);results.reducedSkipsVideoDownload=true;await reduced.close();
 assert.deepEqual(errors,[]);results.browserErrors=errors;
}finally{await browser.close()}
await fs.writeFile('audit/enterprise/results.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
