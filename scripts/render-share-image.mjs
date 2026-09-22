import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {mark} from '../site/art.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export async function renderShareImage(){
 const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
 const browser=await chromium.launch({channel:process.env.CHROME_CHANNEL||'chrome'});
 try{
  const photo=(await fs.readFile(path.join(root,'assets/images/workshop.webp'))).toString('base64');
  const font=(await fs.readFile(path.join(root,'assets/fonts/montserrat-latin-variable.woff2'))).toString('base64');
  const page=await browser.newPage({viewport:{width:1200,height:630},deviceScaleFactor:1});
  await page.setContent(`<!doctype html><html lang="en"><meta charset="utf-8"><title>BundleBoB share image</title><style>@font-face{font-family:Montserrat;src:url(data:font/woff2;base64,${font});font-weight:300 700}*{box-sizing:border-box}body{margin:0;color:white;font-family:Montserrat,Arial,sans-serif}main{width:1200px;height:630px;padding:48px 54px;background:linear-gradient(90deg,#000a,#0005 58%,#0001),url(data:image/webp;base64,${photo}) center/cover}.brand{display:flex;align-items:center;gap:12px;font-size:27px;font-weight:700;letter-spacing:-1px}.brand svg{width:28px;height:32px}.copy{margin-top:128px}p{font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:-.2px}h1{font-size:66px;font-weight:500;line-height:1.08;letter-spacing:-3px;margin:20px 0 28px}small{font-size:15px}i{position:absolute;bottom:0;left:0;right:0;height:16px;background:linear-gradient(110deg,#9352a3,#d52b88,#f9433f,#ff6500,#f3a30a)}</style><main><div class="brand">${mark}BundleBoB</div><div class="copy"><p>Job visibility that keeps your business moving</p><h1>Because every job<br>should add up.</h1><small>Connect your systems. See the bigger picture.</small></div><i></i></main></html>`);
  await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:path.join(root,'assets/og-image.png')});
  console.log('Rendered assets/og-image.png (1200 × 630).');
 }finally{await browser.close();}
}
if(process.argv[1]===fileURLToPath(import.meta.url))await renderShareImage();
