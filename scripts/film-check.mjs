import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const browser=await chromium.launch({channel:'chrome'});
const base=process.env.TEST_URL||'http://127.0.0.1:8080';
await fs.mkdir('audit/film',{recursive:true});
const results={};
try {
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 await page.goto(base);
 await page.locator('.ex-film-screen').scrollIntoViewIfNeeded();
 await page.waitForFunction(()=>document.querySelector('.ex-field-video').currentTime>.1);
 const v=page.locator('.ex-field-video');
 await v.evaluate(v=>v.pause());
 assert.equal(Math.round(await v.evaluate(v=>v.duration)),20);
 results.scenes=[];
 for(const second of [2,7,12,17]){
  await v.evaluate(async (v,t)=>{v.currentTime=t;await new Promise(r=>v.addEventListener('seeked',r,{once:true}));},second);
  await page.waitForTimeout(100);
  const active=await page.locator('.ex-film-chapters .is-active').innerText();
  results.scenes.push({second,active});
  await page.locator('.ex-film-screen').screenshot({path:`audit/film/scene-${second}.png`});
 }
 assert.deepEqual(results.scenes.map(s=>s.active),['01 / Real operations','02 / Human expertise','03 / Connected systems','04 / In the field']);
 await v.evaluate(v=>{v.currentTime=19.7;return v.play()});
 await page.waitForFunction(()=>document.querySelector('.ex-field-video').currentTime<1);
 results.loop=true;
 await page.locator('.ex-field-toggle').click();assert.equal(await v.evaluate(v=>v.paused),true);
 await page.locator('.ex-field-film').screenshot({path:'audit/film/desktop.png'});
 const mobile=await browser.newPage({viewport:{width:390,height:844}});
 const downloads=[];mobile.on('request',r=>{if(r.url().endsWith('.mp4'))downloads.push(r.url())});
 await mobile.goto(base);await mobile.locator('.ex-film-screen').scrollIntoViewIfNeeded();await mobile.waitForTimeout(500);
 assert.equal(downloads.length,0);results.mobilePosterWithoutDownload=true;
 await mobile.locator('.ex-field-film').screenshot({path:'audit/film/mobile.png'});
 await mobile.locator('.ex-field-toggle').click();await mobile.waitForFunction(()=>document.querySelector('.ex-field-video').currentTime>.1);results.mobileExplicitPlayback=true;
 assert.equal(await mobile.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 console.log(JSON.stringify(results,null,2));await fs.writeFile('audit/film/results.json',JSON.stringify(results,null,2));
} finally {await browser.close()}
