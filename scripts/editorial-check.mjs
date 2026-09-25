import {chromium} from 'playwright';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const base=process.env.TEST_URL||'http://127.0.0.1:8080';
const browser=await chromium.launch({channel:process.env.CHROME_CHANNEL||'chrome'});
await fs.mkdir('audit/editorial',{recursive:true});
const page=await browser.newPage({viewport:{width:1440,height:900},colorScheme:'light'});
const results={navigation:{},interactions:{},widths:[]};
try{
 await page.goto(base,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
 await page.screenshot({path:'audit/editorial/home-desktop.png'});
 await page.screenshot({path:'audit/editorial/home-desktop-full.png',fullPage:true});
 const services=page.locator('.nav-item summary').filter({hasText:'Services'});
 await services.focus();await page.keyboard.press('Enter');assert.equal(await page.locator('.nav-item[open]').count(),1);
 await page.keyboard.press('Escape');assert.equal(await page.locator('.nav-item[open]').count(),0);assert.equal(await services.evaluate(e=>document.activeElement===e),true);
 results.navigation.keyboardAndEscape=true;
 await services.click();await page.locator('.nav-item summary').filter({hasText:'Solutions'}).click();assert.equal(await page.locator('.nav-item[open]').count(),1);
 await page.mouse.click(30,750);assert.equal(await page.locator('.nav-item[open]').count(),0);results.navigation.outsideAndSingleOpen=true;
 // Hero is now a live WebGL field (assets/signal.js), not the CSS-3D sculpture.
 const field=page.locator('[data-signal]');
 assert.equal(await field.count(),1);
 assert.equal(await field.evaluate(c=>!!(c.getContext('webgl')||c.getContext('experimental-webgl'))),true);
 assert.equal(await field.evaluate(c=>c.width>0&&c.height>0),true);
 await page.mouse.move(1100,300);await page.waitForTimeout(600);
 const gapEl=page.locator('[data-sg-gap]');
 const a=await gapEl.textContent();await page.waitForTimeout(900);const b2=await gapEl.textContent();
 assert.ok(a!==b2,'hero readout should be live');results.interactions.pointerTilt=true;
 // reduced motion: field retires, markup still states the figure
 await page.emulateMedia({reducedMotion:'reduce'});await page.reload();await page.waitForTimeout(500);
 assert.equal(await field.evaluate(c=>getComputedStyle(c).display),'none');
 assert.match(await gapEl.textContent(),/\$11,850/);results.interactions.reducedMotion=true;
 await page.emulateMedia({reducedMotion:'no-preference'});
 for(const width of [320,390,768,900,1024,1440,1920]){
  await page.setViewportSize({width,height:900});await page.goto(base);await page.evaluate(()=>document.fonts.ready);
  const scrollWidth=await page.evaluate(()=>document.documentElement.scrollWidth);assert.ok(scrollWidth<=width,`Overflow at ${width}: ${scrollWidth}`);results.widths.push({width,scrollWidth});
 }
 await page.setViewportSize({width:390,height:844});await page.goto(base);await page.screenshot({path:'audit/editorial/home-mobile-full.png',fullPage:true});
 await page.locator('.menu-toggle').click();await page.getByRole('navigation',{name:'Mobile navigation'}).getByRole('link',{name:'Services',exact:true}).click();assert.equal(new URL(page.url()).pathname,'/services');results.navigation.mobileServices=true;
 const noScript=await browser.newContext({javaScriptEnabled:false});const fallback=await noScript.newPage();await fallback.goto(base);await fallback.locator('.problem-choice').nth(2).locator('summary').click();assert.equal(await fallback.locator('.problem-choice').nth(2).evaluate(e=>e.open),true);results.interactions.noScriptDisclosure=true;await noScript.close();
}finally{await browser.close();}
await fs.writeFile('audit/editorial/results.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
