import assert from 'node:assert/strict';

export async function assertHomeFlow(page){
 const layout=await page.evaluate(()=>{
  const box=e=>{const r=e.getBoundingClientRect();return {top:r.top+scrollY,bottom:r.bottom+scrollY,left:r.left,right:r.right}};
  const service=document.querySelector('.service-overview'),workflow=document.querySelector('.workflow-overview');
  return {
   width:innerWidth,scrollWidth:document.documentElement.scrollWidth,
   rows:[...document.querySelectorAll('.service-feature')].map(box),
   steps:[...document.querySelectorAll('.workflow-step')].map(box),
   modified:[...document.querySelectorAll('.service-overview *,.workflow-overview *')].filter(e=>{
    const s=getComputedStyle(e);return ['sticky','fixed'].includes(s.position)||s.transform!=='none'||s.filter!=='none'||s.scrollSnapType!=='none';
   }).map(e=>e.className),
   overflow:[service,workflow,...document.querySelectorAll('.service-feature')].filter(e=>e.scrollWidth>e.clientWidth+1).map(e=>e.className),
   order:[...document.querySelectorAll('.service-overview,.case-feature,.workflow-overview')].map(e=>e.className),
   hidden:[...document.querySelectorAll('.service-feature h3,.workflow-step h3')].filter(e=>{const s=getComputedStyle(e);return s.visibility==='hidden'||s.display==='none'||s.opacity==='0'}).length
  };
 });
 assert.equal(layout.scrollWidth,layout.width,'Page must not scroll sideways');
 assert.equal(layout.rows.length,3);assert.equal(layout.steps.length,3);
 assert.deepEqual(layout.modified,[],'Content must not pin, rotate, blur or snap');
 assert.deepEqual(layout.overflow,[]);assert.equal(layout.hidden,0);
 assert.deepEqual(layout.order,['service-overview','section case-feature','workflow-overview']);
 for(let i=0;i<layout.rows.length;i++){
  const row=layout.rows[i];assert.ok(row.left>=0&&row.right<=layout.width,`Service ${i} must fit the viewport`);
  if(i)assert.ok(row.top>=layout.rows[i-1].bottom,'Services must follow each other vertically');
 }
 for(let i=0;i<layout.steps.length;i++)for(let j=i+1;j<layout.steps.length;j++){
  const a=layout.steps[i],b=layout.steps[j];assert.ok(a.bottom<=b.top||b.bottom<=a.top||a.right<=b.left||b.right<=a.left,'Workflow steps must not overlap');
 }
 const movements=[];
 for(const selector of ['.service-feature','.workflow-step']){
  const target=page.locator(selector).first();
  await target.evaluate(e=>scrollTo({top:e.getBoundingClientRect().top+scrollY-160,behavior:'instant'}));
  const before=await target.evaluate(e=>({top:e.getBoundingClientRect().top,scroll:scrollY}));
  await page.evaluate(()=>scrollBy({top:240,behavior:'instant'}));
  const after=await target.evaluate(e=>({top:e.getBoundingClientRect().top,scroll:scrollY}));
  assert.ok(Math.abs(after.scroll-before.scroll-240)<2,'The document must advance');
  assert.ok(Math.abs(before.top-after.top-(after.scroll-before.scroll))<2,'Content must move with the page');
  movements.push({selector,pageDelta:after.scroll-before.scroll,contentDelta:before.top-after.top});
 }
 return {width:layout.width,services:layout.rows.length,steps:layout.steps.length,movements};
}
