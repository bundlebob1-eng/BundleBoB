import {chromium} from 'playwright';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const base=process.env.TEST_URL||'http://127.0.0.1:8080';
const browser=await chromium.launch({channel:process.env.CHROME_CHANNEL||'chrome'});
await fs.mkdir('audit/editorial',{recursive:true});
const page=await browser.newPage({viewport:{width:1440,height:900},colorScheme:'light',reducedMotion:'reduce'});
page.setDefaultTimeout(10000);
const results={navigation:{},industries:{},widths:[],images:[]};
try{
 await page.goto(base,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
 await page.screenshot({path:'audit/editorial/home-desktop.png'});
 await page.screenshot({path:'audit/editorial/home-desktop-full.png',fullPage:true});
 const product=page.locator('.nav-item summary').filter({hasText:'Product'});
 await product.focus();await page.keyboard.press('Enter');
 assert.equal(await page.locator('.nav-item[open]').count(),1);
 await page.screenshot({path:'audit/editorial/navigation.png'});
 await page.keyboard.press('Escape');assert.equal(await page.locator('.nav-item[open]').count(),0);
 assert.equal(await product.evaluate(e=>document.activeElement===e),true);results.navigation.keyboardAndEscape=true;
 await product.click();await page.locator('.nav-item summary').filter({hasText:'Solutions'}).click();
 assert.equal(await page.locator('.nav-item[open]').count(),1);
 await page.mouse.click(30,750);assert.equal(await page.locator('.nav-item[open]').count(),0);results.navigation.outsideAndSingleOpen=true;
 const tabs=page.locator('[role=tab]');
 await tabs.first().focus();await page.keyboard.press('ArrowRight');
 assert.equal(await tabs.nth(1).getAttribute('aria-selected'),'true');
 assert.equal(await page.locator('#industry-story-1').isVisible(),true);
 await page.keyboard.press('End');assert.equal(await tabs.last().getAttribute('aria-selected'),'true');
 await page.keyboard.press('Home');assert.equal(await tabs.first().getAttribute('aria-selected'),'true');results.industries.keyboard=true;
 for(let i=0;i<4;i++){await tabs.nth(i).click();assert.equal(await page.locator(`[data-industry-panel="${i}"]`).isVisible(),true);}
 results.industries.allPanels=true;await tabs.first().click();
 for(const selector of ['.editorial-capabilities','.goals-section','.insights-section','.industry-stories','.editorial-resources','.editorial-closing']){await page.locator(selector).scrollIntoViewIfNeeded();await page.screenshot({path:'audit/editorial/'+selector.slice(1)+'.png'});}
 for(const width of [320,390,768,900,1024,1280,1440]){await page.setViewportSize({width,height:900});await page.goto(base,{waitUntil:'networkidle'});const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);const offenders=overflow?await page.evaluate(()=>[...document.querySelectorAll("main *,.site-header *,.site-footer *")].filter(e=>{const r=e.getBoundingClientRect();return r.width&&r.right>innerWidth+1&&!e.closest(".capability-rail,.comparison-scroll")}).map(e=>({tag:e.tagName,cls:e.className,right:Math.round(e.getBoundingClientRect().right)})).slice(0,15)):[];results.widths.push({width,overflow,offenders});}
 await page.setViewportSize({width:390,height:844});await page.goto(base,{waitUntil:'networkidle'});await page.screenshot({path:'audit/editorial/home-mobile.png'});await page.screenshot({path:'audit/editorial/home-mobile-full.png',fullPage:true});
 await page.locator('.menu-toggle').click();assert.equal(await page.locator('#mobile-menu').isVisible(),true);await page.screenshot({path:'audit/editorial/mobile-menu.png'});await page.keyboard.press('Escape');
 await page.locator('.theme-toggle').click();assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');results.navigation.themeToggle=true;
 await page.goto(base+'/contact',{waitUntil:'networkidle'});await page.screenshot({path:'audit/editorial/contact-mobile.png',fullPage:true});
 await page.evaluate(()=>localStorage.removeItem('bundlebob-theme'));await page.goto(base,{waitUntil:'networkidle'});
 results.fonts=await page.evaluate(async()=>{await document.fonts.ready;return [...document.fonts].map(f=>({family:f.family,status:f.status}))});assert.ok(results.fonts.some(f=>f.family==='Montserrat'&&f.status==='loaded'));
 for(const src of await page.locator('img').evaluateAll(es=>[...new Set(es.map(e=>e.currentSrc||e.src))])){const response=await page.request.get(src);results.images.push({src:new URL(src).pathname,status:response.status()});assert.equal(response.status(),200);}
 const noScript=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:844}});await noScript.goto(base);assert.equal(await noScript.locator('h1').isVisible(),true);assert.equal(await noScript.locator('.industry-story:visible').count(),4);results.withoutJavaScript='Content and all four industry examples remain visible';await noScript.close();
 await fs.writeFile('audit/editorial/results.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));assert.equal(results.widths.some(r=>r.overflow),false,'Responsive overflow found');
}finally{await browser.close();}
