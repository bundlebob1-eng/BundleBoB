import {chromium} from 'playwright';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const base=process.env.TEST_URL||'http://127.0.0.1:8080';
const browser=await chromium.launch({channel:process.env.CHROME_CHANNEL||'chrome'});
await fs.mkdir('audit/fde',{recursive:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}});const errors=[];page.on('pageerror',e=>errors.push(e.message));const result={};
try{
 await page.goto(base);await page.evaluate(()=>document.fonts.ready);
 result.fonts=await page.evaluate(()=>({display:getComputedStyle(document.querySelector('h1')).fontFamily,body:getComputedStyle(document.body).fontFamily,loaded:document.fonts.check('700 60px Figtree')&&document.fonts.check('400 16px InterVF')}));assert.equal(result.fonts.loaded,true);assert.match(result.fonts.display,/Figtree/);assert.match(result.fonts.body,/InterVF/);
 assert.equal(await page.locator('.en-industry-links a').count(),5);
 const scene=page.locator('[data-scroll-story]');
 await scene.evaluate(e=>scrollTo(0,e.offsetTop-130));await page.waitForTimeout(300);const start=await scene.getAttribute('data-scroll-progress');const first=await page.locator('.en-depth-stack').evaluate(e=>getComputedStyle(e).transform);
 await page.locator('[data-scroll-step="2"]').scrollIntoViewIfNeeded();await page.waitForTimeout(300);const end=await scene.getAttribute('data-scroll-progress');const last=await page.locator('.en-depth-stack').evaluate(e=>getComputedStyle(e).transform);assert.notEqual(first,last);assert.ok(Number(end)>Number(start));result.scrollDepth={start,end,transformChanges:true};
 await scene.evaluate(e=>scrollTo(0,e.offsetTop+250));await page.screenshot({path:'audit/fde/scroll-desktop.png'});
 await page.emulateMedia({reducedMotion:'reduce'});await page.waitForFunction(()=>!document.querySelector('[data-scroll-story]').hasAttribute('data-scroll-progress'));assert.equal(await page.locator('.en-scroll-visual').evaluate(e=>getComputedStyle(e).position),'static');result.reducedMotion=true;
 for(const width of [320,390,768,1024,1440,1920]){await page.setViewportSize({width,height:900});for(const route of ['/','/solutions','/forward-deployed-engineering']){await page.goto(base+route);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`${route} overflow at ${width}`)}}result.responsive=true;
 await page.setViewportSize({width:1440,height:1000});await page.goto(base+'/forward-deployed-engineering');assert.equal(await page.locator('.en-fde-work>li').count(),8);assert.equal(await page.locator('.en-story-timeline>li').count(),5);await page.screenshot({path:'audit/fde/client-engagement-desktop.png',fullPage:true});result.fdeStory=true;
 await page.goto(base+'/solutions');await page.screenshot({path:'audit/fde/industries-desktop.png',fullPage:true});await page.locator('.en-sector-grid a').first().click();assert.equal(new URL(page.url()).pathname,'/construction');result.industryLinks=true;
 await page.setViewportSize({width:390,height:844});await page.goto(base);await scene.scrollIntoViewIfNeeded();await page.screenshot({path:'audit/fde/scroll-mobile.png'});await page.goto(base+'/forward-deployed-engineering');await page.screenshot({path:'audit/fde/client-engagement-mobile.png',fullPage:true});
 const nojs=await browser.newContext({javaScriptEnabled:false});const p=await nojs.newPage();await p.goto(base);assert.equal(await p.locator('[data-scroll-step]:visible').count(),3);assert.notEqual(await p.locator('.en-depth-stack').evaluate(e=>getComputedStyle(e).transform),'none');result.noScriptFallback=true;await nojs.close();assert.deepEqual(errors,[]);result.errors=errors;
}finally{await browser.close()}
await fs.writeFile('audit/fde/results.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));
