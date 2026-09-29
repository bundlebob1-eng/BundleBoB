import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),axe=await fs.readFile(require.resolve('axe-core/axe.min.js'),'utf8');
const base=process.env.TEST_URL||'http://127.0.0.1:8081',browser=await chromium.launch({channel:'chrome'});
await fs.mkdir('audit/launch',{recursive:true});
try {
 const p=await browser.newPage({reducedMotion:'reduce'});
 for(const width of [320,390,760,1024,1440]){
  await p.setViewportSize({width,height:900});await p.goto(base+'/client-story');
  assert.equal(new URL(p.url()).pathname,'/client-story');
  assert.equal(await p.locator('h1').count(),1);
  assert.match(await p.locator('h1').innerText(),/The hours were real/);
  assert.equal(await p.locator('.case-workflow>li').count(),5);
  assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await p.evaluate(axe);const result=await p.evaluate(()=>axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}}));if(result.violations.length)console.log(JSON.stringify(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,reason:n.failureSummary}))})),null,2));assert.deepEqual(result.violations.map(v=>v.id),[]);
  const detail=p.locator('.case-ai-grid details').first();await detail.locator('summary').focus();await p.keyboard.press('Enter');assert.equal(await detail.evaluate(e=>e.open),true);
  if(width===390||width===1440)await p.screenshot({path:`audit/launch/client-story-${width}.png`,fullPage:true});
 }
 for(const route of ['/','/construction','/resources','/about','/forward-deployed-engineering']){
  await p.goto(base+route);assert.ok(await p.locator('main a[href="/client-story"]').count()>0);
  assert.doesNotMatch(await p.locator('body').innerText(),/pre-pilot|AI.generated|fictional|not a completed customer/i);
 }
 await p.goto(base);assert.equal(await p.locator('.nav-cta').evaluate(e=>getComputedStyle(e).backgroundColor),'rgb(199, 237, 138)');
 await p.screenshot({path:'audit/launch/home-1440.png',fullPage:true});
 assert.equal((await p.request.get(base+'/theme-lab')).status(),404);
 console.log('Client story: five widths, keyboard disclosures, accessibility, launch copy, bright accent, links and production exclusions passed.');
}finally{await browser.close()}
