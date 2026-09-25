import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {mark} from '../site/art.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export async function renderShareImage(){
 const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
 const browser=await chromium.launch({channel:process.env.CHROME_CHANNEL||'chrome'});
 try{
  const font=(await fs.readFile(path.join(root,'assets/fonts/montserrat-latin-variable.woff2'))).toString('base64');
  const page=await browser.newPage({viewport:{width:1200,height:630},deviceScaleFactor:1});
  await page.setContent(`<!doctype html><html lang="en"><meta charset="utf-8"><title>BundleBoB share image</title><style>@font-face{font-family:Montserrat;src:url(data:font/woff2;base64,${font});font-weight:300 700}*{box-sizing:border-box}body{margin:0;color:#252c26;font-family:Montserrat,Arial,sans-serif}main{width:1200px;height:630px;padding:48px 60px;background:#f5f3ed}.brand{display:flex;align-items:center;gap:12px;font-size:27px;font-weight:700;letter-spacing:-1px}.brand svg{width:28px;height:32px}.copy{margin-top:62px}p{font-size:11px;font-weight:600;letter-spacing:2px}h1{font-size:68px;font-weight:500;line-height:1.06;letter-spacing:-4px;margin:24px 0 28px}em{font-family:Georgia,serif;color:#a53c16;font-size:76px;font-weight:400}small{font-size:14px}.art{position:absolute;right:80px;top:160px;width:260px;height:280px;perspective:800px}.tile{position:absolute;width:220px;height:220px;border-radius:12px;transform:rotateX(50deg) rotateZ(-30deg);background:#e98854;box-shadow:-8px 12px 0 #bc633d, -40px 70px 0 #d9dfc5,-48px 82px 0 #9eab88,-80px 128px 0 #839575;padding:30px;font-size:25px;font-weight:600;letter-spacing:-1px}.tile svg{width:35px;height:35px;display:block;margin-bottom:30px}.bottom{position:absolute;bottom:38px;right:60px;font-size:12px}</style><main><div class="brand">${mark}BundleBoB</div><div class="copy"><p>YOUR TECHNOLOGY PARTNER</p><h1>Real problems.<br>Thoughtful tech.<br><em>Built for you.</em></h1><small>Custom software / Practical AI / Connected systems</small></div><div class="art"><div class="tile">${mark}Better<br>together.</div></div><span class="bottom">bundlebob.com</span></main></html>`);
  await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:path.join(root,'assets/og-image.png')});
  console.log('Rendered assets/og-image.png (1200 × 630).');
 }finally{await browser.close();}
}
if(process.argv[1]===fileURLToPath(import.meta.url))await renderShareImage();
