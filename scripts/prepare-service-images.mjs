import {chromium} from 'playwright';
import fs from 'node:fs/promises';
const b=await chromium.launch({channel:'chrome'});
try{const p=await b.newPage();await p.route('http://images.local/**',async r=>{const n=new URL(r.request().url()).pathname.slice(1);await r.fulfill({contentType:'image/png',headers:{'Access-Control-Allow-Origin':'*'},body:await fs.readFile('assets/images/generated/'+n)})});await p.goto('about:blank');
for(const name of ['service-ai','service-software','service-systems']){const data=await p.evaluate(async n=>{const img=new Image();img.crossOrigin='anonymous';img.src='http://images.local/'+n+'.png';await img.decode();const c=document.createElement('canvas');c.width=img.naturalWidth;c.height=img.naturalHeight;c.getContext('2d').drawImage(img,0,0);return c.toDataURL('image/webp',.88).split(',')[1]},name);await fs.writeFile('assets/images/'+name+'.webp',Buffer.from(data,'base64'))}}
finally{await b.close()}
