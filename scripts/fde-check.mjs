import {chromium} from 'playwright';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const base=process.env.TEST_URL||'http://127.0.0.1:8080';
const browser=await chromium.launch({channel:process.env.CHROME_CHANNEL||'chrome'});
await fs.mkdir('audit/fde',{recursive:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}});const errors=[];page.on('pageerror',e=>errors.push(e.message));const result={};
try{
 await page.goto(base);await page.evaluate(()=>document.fonts.ready);
 result.fonts=await page.evaluate(()=>({display:getComputedStyle(document.querySelector('h1')).fontFamily,body:getComputedStyle(document.body).fontFamily,loaded:document.fonts.check('500 60px Outfit')}));assert.equal(result.fonts.loaded,true);assert.match(result.fonts.display,/Outfit/);assert.match(result.fonts.body,/Outfit/);
 assert.equal(await page.locator('.ref-industries a').count(),8);
 for(const width of [320,390,768,1024,1440,1920]){await page.setViewportSize({width,height:900});for(const route of ['/','/solutions','/forward-deployed-engineering']){await page.goto(base+route);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`${route} overflow at ${width}`)}}result.responsive=true;
 await page.setViewportSize({width:1440,height:1000});await page.goto(base+'/forward-deployed-engineering');assert.equal(await page.locator('.en-fde-work>li').count(),8);assert.equal(await page.locator('.en-story-timeline>li').count(),5);await page.screenshot({path:'audit/fde/client-engagement-desktop.png',fullPage:true});result.fdeStory=true;
 await page.goto(base+'/solutions');await page.screenshot({path:'audit/fde/industries-desktop.png',fullPage:true});await page.locator('.en-sector-grid a').first().click();assert.equal(new URL(page.url()).pathname,'/construction');result.industryLinks=true;
}finally{await browser.close()}
await fs.writeFile('audit/fde/results.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));
