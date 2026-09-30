import {chromium} from 'playwright';
import fs from 'node:fs/promises';
const names=['business-in-motion-hd','business-in-motion-tablet','business-in-motion-portrait','admin-overhead-hd','clearer-handoffs-hd','construction-field-hd','construction-field-tablet','construction-field-portrait'];
const browser=await chromium.launch({channel:'chrome'});
try{const p=await browser.newPage();await p.goto('about:blank');for(const name of names){const src='data:image/jpeg;base64,'+(await fs.readFile(`/private/tmp/bundlebob-responsive-posters/${name}.jpg`)).toString('base64');const result=await p.evaluate(async src=>{const img=new Image();img.src=src;await img.decode();const c=document.createElement('canvas');c.width=img.naturalWidth;c.height=img.naturalHeight;c.getContext('2d').drawImage(img,0,0);return c.toDataURL('image/webp',.9).split(',')[1]},src);await fs.writeFile(`assets/images/${name}.webp`,Buffer.from(result,'base64'));console.log(name);}}finally{await browser.close()}
