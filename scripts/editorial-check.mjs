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
 const model=page.locator('.sculpture-object');const surface=page.locator('.system-sculpture');
 await surface.hover({position:{x:80,y:100}});assert.match(await model.getAttribute('style'),/rotateX/);results.interactions.pointerTilt=true;
 await page.emulateMedia({reducedMotion:'reduce'});await page.waitForFunction(()=>!document.querySelector('.sculpture-object').style.transform);assert.equal(await model.getAttribute('style'),'');await surface.hover({position:{x:120,y:140}});assert.equal(await model.getAttribute('style'),'');results.interactions.reducedMotion=true;
 for(const width of [320,390,768,900,1024,1440,1920]){
  await page.setViewportSize({width,height:900});await page.goto(base);await page.evaluate(()=>document.fonts.ready);
  const scrollWidth=await page.evaluate(()=>document.documentElement.scrollWidth);assert.ok(scrollWidth<=width,`Overflow at ${width}: ${scrollWidth}`);results.widths.push({width,scrollWidth});
 }
 await page.setViewportSize({width:390,height:844});await page.goto(base);await page.screenshot({path:'audit/editorial/home-mobile-full.png',fullPage:true});
 await page.locator('.menu-toggle').click();await page.getByRole('navigation',{name:'Mobile navigation'}).getByRole('link',{name:'Services',exact:true}).click();assert.equal(new URL(page.url()).pathname,'/services');results.navigation.mobileServices=true;
 const noScript=await browser.newContext({javaScriptEnabled:false});const fallback=await noScript.newPage();await fallback.goto(base);await fallback.locator('.problem-choice').nth(2).locator('summary').click();assert.equal(await fallback.locator('.problem-choice').nth(2).evaluate(e=>e.open),true);results.interactions.noScriptDisclosure=true;await noScript.close();
}finally{await browser.close();}
await fs.writeFile('audit/editorial/results.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
