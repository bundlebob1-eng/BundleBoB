import {chromium} from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const browser=await chromium.launch({channel:process.env.CHROME_CHANNEL||'chrome'});
try{
 for(const [name,input] of [['construction-field',path.join(root,'assets/video/construction-field.mp4')],['engineering',process.env.ENGINEERING_VIDEO||'/private/tmp/bundlebob-engineering.mp4']]){
  const page=await browser.newPage();const bytes=await fs.readFile(input);
  await page.setContent('<video muted></video><canvas hidden></canvas>');
  const data=await page.evaluate(async b=>{const v=document.querySelector('video');v.src='data:video/mp4;base64,'+b;await new Promise((resolve,reject)=>{v.onloadeddata=resolve;v.onerror=reject});v.currentTime=2;await new Promise(resolve=>v.onseeked=resolve);const canvas=document.querySelector('canvas');canvas.width=1600;canvas.height=900;canvas.getContext('2d').drawImage(v,0,0,1600,900);return canvas.toDataURL('image/webp',.88).split(',')[1]},bytes.toString('base64'));
  await fs.writeFile(path.join(root,'assets/images',name+'.webp'),Buffer.from(data,'base64'));await page.close();console.log('Prepared '+name+' poster');
 }
}finally{await browser.close()}
