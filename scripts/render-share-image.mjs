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
  const frame=(await fs.readFile(path.join(root,'assets/images/people-at-work.webp'))).toString('base64');
  await page.setContent(`<!doctype html><html lang="en"><meta charset="utf-8"><title>BundleBoB share image</title><style>@font-face{font-family:Montserrat;src:url(data:font/woff2;base64,${font});font-weight:300 700}*{box-sizing:border-box}body{margin:0;color:white;font-family:Montserrat,Arial,sans-serif}main{width:1200px;height:630px;padding:44px 56px;background:linear-gradient(90deg,#101817e6,#10181770 70%,#10181730),url(data:image/webp;base64,${frame}) center/cover}.brand{display:flex;align-items:center;gap:12px;font-size:25px;font-weight:650;letter-spacing:-1px}.brand svg{width:27px;height:30px}.copy{margin-top:65px}p{font-size:10px;font-weight:600;letter-spacing:1.5px}h1{font-size:70px;font-weight:500;line-height:1.06;letter-spacing:-4px;margin:24px 0 28px}h1 span{color:#ffb38c}small{font-size:14px;letter-spacing:-.2px}.bottom{position:absolute;bottom:40px;right:56px;font-size:12px}.rule{position:absolute;bottom:0;left:0;right:0;height:12px;background:linear-gradient(110deg,#913991,#d93479 38%,#f16437 70%,#f9a348)}</style><main><div class="brand">${mark}BundleBoB</div><div class="copy"><p>TECHNOLOGY SERVICES. REAL HUMAN PARTNERSHIP.</p><h1>Built for the way<br>your business<br><span>really works.</span></h1><small>Custom software / Practical AI / Connected systems</small></div><span class="bottom">bundlebob.com</span><div class="rule"></div></main></html>`);
  await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:path.join(root,'assets/og-image.png')});
  console.log('Rendered assets/og-image.png (1200 × 630).');
 }finally{await browser.close();}
}
if(process.argv[1]===fileURLToPath(import.meta.url))await renderShareImage();
