import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const b=await chromium.launch({channel:'chrome'}),base=process.env.TEST_URL||'http://127.0.0.1:8080';
const results={},errors=[];await fs.mkdir('audit/polish',{recursive:true});
try{const p=await b.newPage({viewport:{width:1440,height:1000}});p.on('pageerror',e=>errors.push(e.message));await p.goto(base);await p.evaluate(()=>document.fonts.ready);
 assert.equal(await p.locator('.theme-toggle,[data-video-toggle]').count(),0);
 await p.waitForFunction(()=>{const v=document.querySelector('.ref-hero video');return !v.paused&&v.currentTime>6});
 const hero=p.locator('.ref-hero video');
 const time=await hero.evaluate(v=>v.currentTime);await p.waitForTimeout(400);assert.ok(await hero.evaluate(v=>v.currentTime)>time);results.backgroundContinuesPastFiveSeconds=true;
 await hero.evaluate(v=>{v.currentTime=v.duration-.4});
 await p.waitForFunction(()=>{const v=document.querySelector('.ref-hero video');return !v.paused&&v.currentTime>.1&&v.currentTime<2});results.backgroundLoops=true;
 await p.locator('#everyday-work').scrollIntoViewIfNeeded();
 await p.waitForFunction(()=>document.querySelector('.ref-hero video').paused);
 const pausedTime=await hero.evaluate(v=>v.currentTime);await p.waitForTimeout(300);assert.equal(await hero.evaluate(v=>v.currentTime),pausedTime);
 await p.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
 await p.waitForFunction(t=>{const v=document.querySelector('.ref-hero video');return !v.paused&&v.currentTime>t},pausedTime);results.backgroundResumesWhenVisible=true;
 await p.screenshot({path:'audit/polish/home-desktop.png'});
 await p.evaluate(()=>window.scrollTo({top:700,behavior:'instant'}));await p.waitForTimeout(60);assert.equal(await p.locator('.site-header').evaluate(e=>e.classList.contains('is-scrolling')),true);await p.waitForTimeout(350);assert.equal(await p.locator('.site-header').evaluate(e=>e.classList.contains('is-scrolling')),false);results.navigationHidesAndReturns=true;
 await p.locator('#services').scrollIntoViewIfNeeded();await p.locator('[data-service-index="1"]').click();await p.waitForTimeout(1000);assert.equal(await p.locator('[data-service-index="1"]').getAttribute('aria-pressed'),'true');await p.locator('.ref-card').nth(1).locator('summary').click();assert.equal(await p.locator('.ref-card').nth(1).locator('details').getAttribute('open'),'');results.serviceSelectorAndWorkflow=true;
 await p.screenshot({path:'audit/polish/services-desktop.png'});
 const players=p.locator('[data-story-player]');assert.equal(await players.count(),2);results.films=[];
 for(let i=0;i<2;i++){const player=players.nth(i),v=player.locator('video');await player.scrollIntoViewIfNeeded();assert.equal(await player.locator('button').count(),0);await p.waitForFunction(i=>document.querySelectorAll('[data-story-video]')[i].currentTime>.1,i);assert.equal(Math.round(await v.evaluate(v=>v.duration)),12);assert.equal(await v.evaluate(v=>v.videoWidth),1920);await v.evaluate(async v=>{v.pause();v.currentTime=9;await new Promise(r=>v.addEventListener('seeked',r,{once:true}))});await player.screenshot({path:`audit/polish/workflow-film-${i}.png`});results.films.push({duration:12,width:1920})}
 await p.emulateMedia({reducedMotion:'reduce'});results.widths=[];
 for(const width of [320,390,600,760,761,900,1024,1100,1280,1440,1920]){await p.setViewportSize({width,height:900});await p.goto(base);assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'Overflow '+width);results.widths.push(width)}
 await p.setViewportSize({width:390,height:844});await p.goto(base);await p.screenshot({path:'audit/polish/home-mobile.png'});await p.locator('#services').scrollIntoViewIfNeeded();await p.locator('[data-service-index="0"]').click();await p.locator('.ref-card').first().locator('summary').click();await p.screenshot({path:'audit/polish/services-mobile.png'});
 assert.equal(await p.locator('.ref-hero video').getAttribute('src'),null);assert.equal(await p.locator('[data-story-video][src]').count(),0);results.reducedAndMobileDeferVideos=true;
 await p.evaluate(()=>document.activeElement.blur());await p.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await p.waitForTimeout(350);await p.locator('.menu-toggle').click();await p.evaluate(()=>scrollBy({top:100,behavior:'instant'}));await p.waitForTimeout(60);assert.equal(await p.locator('.site-header').evaluate(e=>e.classList.contains('is-scrolling')),false);results.openMenuRemainsAvailable=true;
 assert.deepEqual(errors,[]);results.errors=errors;console.log(JSON.stringify(results,null,2));await fs.writeFile('audit/polish/results.json',JSON.stringify(results,null,2));
}finally{await b.close()}
