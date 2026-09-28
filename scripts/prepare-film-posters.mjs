import {chromium} from 'playwright';
import fs from 'node:fs/promises';
const browser=await chromium.launch({channel:'chrome'});
try{const page=await browser.newPage();
await page.route('http://posters.local/**',async route=>{const name=new URL(route.request().url()).pathname.slice(1);await route.fulfill({contentType:'image/jpeg',headers:{'Access-Control-Allow-Origin':'*'},body:await fs.readFile('assets/images/'+name)})});
await page.goto('about:blank');
 for(const name of ['connected-world','people-process-technology']){
  const data=await page.evaluate(async name=>{const img=new Image();img.crossOrigin='anonymous';img.src='http://posters.local/'+name+'.jpg';await img.decode();const c=document.createElement('canvas');c.width=1600;c.height=900;c.getContext('2d').drawImage(img,0,0,1600,900);return c.toDataURL('image/webp',.82).split(',')[1]},name);
  await fs.writeFile('assets/images/'+name+'.webp',Buffer.from(data,'base64'));
 }

}finally{await browser.close()}
