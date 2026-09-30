import {chromium,devices} from 'playwright';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const base=process.env.TEST_URL||'http://127.0.0.1:8081',browser=await chromium.launch({channel:'chrome'});
await fs.mkdir('audit/owner-review',{recursive:true});const results={};
try{
 const p=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 for(const width of [320,390,1024,1440]){
  await p.setViewportSize({width,height:1000});await p.goto(base);
  await p.locator('#services').scrollIntoViewIfNeeded();
  for(const i of [0,1,2,0]){await p.locator(`[data-service-index="${i}"]`).click();await p.waitForTimeout(750);assert.equal(await p.locator(`[data-service-index="${i}"]`).getAttribute('aria-pressed'),'true',`Selector ${i} at ${width}`)}
  assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  if(width===390||width===1440)await p.screenshot({path:`audit/owner-review/services-${width}.png`});
  await p.goto(base+'/services/ai-solutions');const board=p.locator('.service-board');assert.equal(await board.evaluate(e=>getComputedStyle(e).transform),'none');assert.equal(await p.locator('.en-button-primary').first().evaluate(e=>getComputedStyle(e).backgroundColor),'rgb(255, 90, 0)');
  assert.ok(await p.locator('main a[href="/client-story"]').count()>0);assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  if(width===390||width===1440)await p.screenshot({path:`audit/owner-review/ai-${width}.png`,fullPage:width===390});
  await p.goto(base+'/construction');await p.locator('[data-tour]').scrollIntoViewIfNeeded();await p.waitForTimeout(600);
  const top=await p.locator('.tour-controls').evaluate(e=>e.getBoundingClientRect().top+scrollY);
  for(const i of [1,2,0]){await p.locator(`[data-tour-tab="${i}"]`).click();assert.ok(Math.abs(await p.locator('.tour-controls').evaluate(e=>e.getBoundingClientRect().top+scrollY)-top)<2)}
 }
 results.carouselAndCrispCardsAndStableTour=true;
 await p.setViewportSize({width:1440,height:1000});await p.goto(base);await p.evaluate(()=>scrollTo({top:900,behavior:'instant'}));await p.waitForTimeout(400);await p.evaluate(()=>scrollBy({top:-100,behavior:'instant'}));await p.waitForTimeout(60);assert.equal(await p.locator('.site-header').evaluate(e=>e.classList.contains('is-scrolling')),false);results.scrollUpNavigation=true;
 await p.locator('.work-story').scrollIntoViewIfNeeded();const card=p.locator('.work-card').first();const firstTransform=await card.evaluate(e=>getComputedStyle(e).transform);await p.evaluate(()=>scrollBy({top:300,behavior:'instant'}));await p.waitForTimeout(100);assert.notEqual(await card.evaluate(e=>getComputedStyle(e).transform),firstTransform);
 await p.emulateMedia({reducedMotion:'reduce'});assert.equal(await card.evaluate(e=>getComputedStyle(e).transform),'none');results.scrollNarrative=true;
 for(const route of ['/','/services','/about','/client-story']){await p.goto(base+route);await p.screenshot({path:`audit/owner-review/final-${route==='/'?'home':route.slice(1)}.png`,fullPage:true})}
 const sitemap=await (await p.request.get(base+'/sitemap.xml')).text(),routes=[...sitemap.matchAll(/<loc>https:\/\/bundlebob.com([^<]*)<\/loc>/g)].map(m=>m[1]);const descriptions=[];
 for(const route of routes){await p.goto(base+route);descriptions.push(await p.locator('meta[name=description]').getAttribute('content'));assert.equal(await p.locator('meta[property="og:description"]').getAttribute('content'),descriptions.at(-1))}
 assert.equal(new Set(descriptions).size,routes.length);assert.equal((await p.request.get(base+'/system')).status(),404);results.uniqueMetadataPages=routes.length;
 const context=await browser.newContext({...devices['iPhone 13']});const mobile=await context.newPage(),media=[];mobile.on('request',r=>{if(r.url().endsWith('.mp4'))media.push(r.url())});await mobile.goto(base);
 await mobile.waitForFunction(()=>document.querySelector('.ref-hero video').currentTime>.2);assert.match(await mobile.locator('.ref-hero video').getAttribute('src'),/-mobile.mp4$/);
 for(let i=0;i<2;i++){await mobile.locator('[data-story-video]').nth(i).scrollIntoViewIfNeeded();await mobile.waitForFunction(i=>document.querySelectorAll('[data-story-video]')[i].currentTime>.2,i)}
 assert.ok(media.every(url=>url.endsWith('-mobile.mp4')));results.mobileSources=media;
 await mobile.evaluate(()=>scrollTo({top:600,behavior:'instant'}));await mobile.waitForTimeout(350);await mobile.locator('.menu-toggle').click();assert.equal(await mobile.evaluate(()=>getComputedStyle(document.body).position),'fixed');const position=await mobile.evaluate(()=>document.body.style.top);await mobile.mouse.wheel(0,500);await mobile.waitForTimeout(200);assert.equal(await mobile.evaluate(()=>document.body.style.top),position);await mobile.keyboard.press('Escape');assert.ok(Math.abs(await mobile.evaluate(()=>scrollY)-600)<2);results.mobileMenuRestoresPosition=true;
 await context.close();assert.deepEqual(errors,[]);results.errors=errors;console.log(JSON.stringify(results,null,2));await fs.writeFile('audit/owner-review/checks.json',JSON.stringify(results,null,2));
}finally{await browser.close()}
