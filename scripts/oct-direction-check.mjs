import {assertHomeFlow} from './home-flow-assertions.mjs';
import {chromium} from 'playwright';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const base=process.env.TEST_URL||'http://127.0.0.1:8081',browser=await chromium.launch({channel:'chrome'});await fs.mkdir('audit/oct-direction',{recursive:true});
try{const p=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto(base);await p.evaluate(()=>document.fonts.ready);const header=await p.locator('.site-header').boundingBox();assert.equal(Math.round(header.width),1180);assert.equal(Math.round(header.x),130);assert.equal(await p.locator('.brand-wordmark').first().textContent(),'bundlebob');
 await p.screenshot({path:'audit/oct-direction/hero-desktop.png'});
 const flow=await assertHomeFlow(p);
 for(const width of [320,390,760,820,1024,1100,1101,1280,1440,1920]){await p.setViewportSize({width,height:900});await p.goto(base);assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`Overflow at ${width}`);const h=await p.locator('.site-header').boundingBox();assert.ok(h.x>=15&&h.x+h.width<=width-15);if(width<=1100){await p.locator('.menu-toggle').click();assert.equal(await p.locator('#mobile-menu').isVisible(),true);await p.keyboard.press('Escape')}
  if(width===390){await p.screenshot({path:'audit/oct-direction/hero-mobile.png'});await p.locator('.workflow-overview').scrollIntoViewIfNeeded();await p.waitForTimeout(300);await p.screenshot({path:'audit/oct-direction/scroll-mobile.png'})}
  await assertHomeFlow(p);
  if(width===390||width===1440){await p.locator('.service-heading').scrollIntoViewIfNeeded();await p.waitForTimeout(900);await p.screenshot({path:`audit/oct-direction/services-${width}.png`})}
 }
 await p.emulateMedia({reducedMotion:'reduce'});await p.goto(base);await assertHomeFlow(p);assert.equal(await p.locator('.site-header .nav-wrap').evaluate(e=>getComputedStyle(e).backgroundColor),'rgb(0, 0, 0)');assert.equal(await p.locator('.nav-cta').evaluate(e=>getComputedStyle(e).backgroundColor),'rgb(255, 255, 255)');assert.deepEqual(errors,[]);console.log(JSON.stringify({headerWidth:1180,documentFlow:flow,responsiveWidths:10,reducedMotion:true,errors},null,2));
}finally{await browser.close()}
