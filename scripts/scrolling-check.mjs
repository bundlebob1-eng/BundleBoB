import {chromium,webkit} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {createRequire} from 'node:module';
import {assertHomeFlow} from './home-flow-assertions.mjs';

const base=process.env.TEST_URL||'http://127.0.0.1:8081';
const out='audit/scrolling';await fs.mkdir(out,{recursive:true});
const axe=await fs.readFile(createRequire(import.meta.url).resolve('axe-core/axe.min.js'),'utf8');
const results={checks:[],accessibility:[],errors:[]};
for(const [engine,type,options] of [['chrome',chromium,{channel:'chrome'}],['webkit',webkit,{}]]){
 console.log(`${engine}: starting browser`);
 const browser=await type.launch({...options,timeout:30000});
 const deadline=setTimeout(()=>{console.error(`${engine}: test timeout`);browser.close().finally(()=>process.exit(1))},180000);
 try{
  for(const [name,width,height] of [['phone',390,844],['ipad',820,1180],['ipad-landscape',1180,820],['desktop',1440,1000]]){
   const context=await browser.newContext({viewport:{width,height},hasTouch:width<1200,isMobile:width<1200});
   const page=await context.newPage();page.on('pageerror',e=>results.errors.push(e.message));
   for(const motion of ['no-preference','reduce']){
    await page.emulateMedia({reducedMotion:motion});await page.goto(base);await page.evaluate(()=>document.fonts.ready);
    const checks=await assertHomeFlow(page);results.checks.push({engine,name,motion,...checks});
    if(motion==='no-preference'){
     // Real wheel and keyboard events must move the document through both sections.
     for(const selector of engine==='webkit'&&width<1200?[]:['.service-feature','.workflow-step']){
      await page.locator(selector).first().evaluate(e=>scrollTo({top:e.getBoundingClientRect().top+scrollY-150,behavior:'instant'}));
      let before=await page.evaluate(()=>scrollY);await page.mouse.move(width/2,height/2);await page.mouse.wheel(0,240);
      await page.waitForFunction(y=>scrollY>y+100,before);
      before=await page.evaluate(()=>scrollY);await page.keyboard.press('PageDown');await page.waitForFunction(y=>scrollY>y+100,before);
     }
     await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(900);
     await page.screenshot({path:`${out}/${engine}-hero-${name}.png`});
     await page.locator('.service-heading').evaluate(e=>scrollTo({top:e.getBoundingClientRect().top+scrollY-130,behavior:'instant'}));await page.waitForTimeout(900);
     await page.screenshot({path:`${out}/${engine}-services-${name}.png`});
     await page.locator('.service-feature').nth(1).evaluate(e=>scrollTo({top:e.getBoundingClientRect().top+scrollY-130,behavior:'instant'}));await page.waitForTimeout(900);
     await page.screenshot({path:`${out}/${engine}-software-${name}.png`});
     await page.locator('.workflow-heading').evaluate(e=>scrollTo({top:e.getBoundingClientRect().top+scrollY-130,behavior:'instant'}));await page.waitForTimeout(900);
     await page.screenshot({path:`${out}/${engine}-workflow-${name}.png`});
    }
   }
   if(engine==='chrome'){
    await page.evaluate(axe);const audit=await page.evaluate(()=>axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','best-practice']}}));
    results.accessibility.push({name,violations:audit.violations});assert.equal(audit.violations.length,0,JSON.stringify(audit.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.html)}))));
   }
   for(const [i,slug] of ['ai-solutions','custom-software','integrations'].entries()){
    await page.goto(base);await page.locator('.service-feature .ref-cta').nth(i).click();assert.equal(new URL(page.url()).pathname,`/services/${slug}`);
   }
   await page.goto(base);await page.locator('.ref-hero-foot a').click();await page.waitForTimeout(700);
   assert.equal(new URL(page.url()).hash,'#services');assert.ok(await page.locator('#services-title').evaluate(e=>e.getBoundingClientRect().top>=80));
   console.log(`${engine} ${name}: document flow, all services, motion preferences and links passed`);
   await context.close();
  }
  console.log(`${engine}: checking without JavaScript`);
  const page=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:844}});await page.goto(base);await assertHomeFlow(page);await page.close();
  console.log(`${engine}: checking 320px`);
  const page2=await browser.newPage({viewport:{width:320,height:640},reducedMotion:'reduce'});await page2.goto(base);await assertHomeFlow(page2);
  await page2.close();console.log(`${engine}: complete`);
 }finally{clearTimeout(deadline);await browser.close()}
}
assert.deepEqual(results.errors,[]);await fs.writeFile(`${out}/results.json`,JSON.stringify(results,null,2));console.log('Scroll checks complete; screenshots and results in audit/scrolling.');
