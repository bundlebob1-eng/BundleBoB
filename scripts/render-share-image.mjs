import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {mark} from '../site/art.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export async function renderShareImage(){
 const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
 const browser=await chromium.launch({channel:process.env.CHROME_CHANNEL||'chrome'});
 try{
  const font=(await fs.readFile(path.join(root,'assets/fonts/figtree-latin.woff2'))).toString('base64');
  const page=await browser.newPage({viewport:{width:1200,height:630},deviceScaleFactor:1});
  const globe=(await fs.readFile(path.join(root,'assets/images/business-globe.svg'))).toString('base64');
  await page.setContent(`<!doctype html><html lang="en"><meta charset="utf-8"><title>BundleBoB share image</title><style>@font-face{font-family:Figtree;src:url(data:font/woff2;base64,${font});font-weight:400 800}*{box-sizing:border-box}body{margin:0;color:#f4f1ea;background:#0e1820;font-family:Figtree,Arial,sans-serif}main{position:relative;isolation:isolate;width:1200px;height:630px;padding:40px 56px;overflow:hidden}.globe{position:absolute;width:850px;height:850px;right:-210px;top:-118px;z-index:-1}.brand{display:flex;align-items:center;gap:12px;font-size:25px;font-weight:650;letter-spacing:-1px}.brand svg{width:27px;height:30px}.copy{margin-top:69px}p{font-size:12px;font-weight:600;letter-spacing:1.1px}h1{font-size:84px;font-weight:800;line-height:.96;letter-spacing:-4px;margin:24px 0 29px;text-transform:uppercase}h1 span{color:#ffd400}small{font-size:15px;letter-spacing:0}.bottom{position:absolute;bottom:37px;right:56px;font-size:13px}.rule{position:absolute;bottom:0;left:0;right:0;height:3px;background:#ffd400}</style><main><img class="globe" src="data:image/svg+xml;base64,${globe}" alt=""><div class="brand">${mark}BundleBoB</div><div class="copy"><p>AI & SOFTWARE FOR REAL-WORLD OPERATIONS</p><h1>Your world.<br>Working<br><span>better.</span></h1><small>Custom software / Practical AI / Connected systems</small></div><span class="bottom">bundlebob.com</span><div class="rule"></div></main></html>`);
  await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:path.join(root,'assets/og-image.png')});
  console.log('Rendered assets/og-image.png (1200 × 630).');
 }finally{await browser.close();}
}
if(process.argv[1]===fileURLToPath(import.meta.url))await renderShareImage();
