import {chromium,devices} from 'playwright';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome'});
try {
 for(const device of ['iPhone 13','Pixel 7']) {
  const context=await browser.newContext({...devices[device],defaultBrowserType:undefined});
  const page=await context.newPage();
  await page.goto(process.env.TEST_URL||'http://127.0.0.1:8080');
  await page.waitForFunction(()=>{const v=document.querySelector('.ref-hero video');return !v.paused&&v.currentTime>6});
  assert.equal(await page.locator('.ref-hero video').evaluate(v=>v.muted&&v.playsInline&&v.loop),true);
  for(let i=0;i<2;i++) {
   await page.locator('[data-story-video]').nth(i).scrollIntoViewIfNeeded();
   await page.waitForFunction(i=>{const v=document.querySelectorAll('[data-story-video]')[i];return !v.paused&&v.currentTime>.2},i);
  }
  await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
  await page.waitForFunction(()=>!document.querySelector('.ref-hero video').paused);
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.waitForFunction(()=>document.querySelector('.ref-hero video').paused);
  await page.reload();
  assert.equal(await page.locator('.ref-hero video').getAttribute('src'),null);
  console.log(`${device}: hero and both workflow films autoplay; hero resumes; reduced motion respected.`);
  await context.close();
 }
} finally {await browser.close()}
