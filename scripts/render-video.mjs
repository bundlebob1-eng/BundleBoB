import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const output=path.join(root,'assets/video');
const frames=await fs.mkdtemp(path.join(os.tmpdir(),'bundlebob-frames-'));
await fs.mkdir(output,{recursive:true});
const browser=await chromium.launch({...(process.env.CHROME_CHANNEL?{channel:process.env.CHROME_CHANNEL}:{})});
const page=await browser.newPage({viewport:{width:960,height:540},deviceScaleFactor:1});
await page.setContent('<!doctype html><html><style>body{margin:0}canvas{display:block}</style><canvas width="960" height="540"></canvas></html>');
await page.evaluate(()=>{
const canvas=document.querySelector('canvas'),ctx=canvas.getContext('2d');
const colors={bg:'#132e33',panel:'#1c3a3f',line:'#365356',text:'#f5f3ed',muted:'#aec2c0',accent:'#efa078'};
const sans='"Avenir Next","Segoe UI",sans-serif',mono='Consolas,monospace';
const clamp=v=>Math.min(1,Math.max(0,v));const ease=v=>1-(1-clamp(v))**3;
function rounded(x,y,w,h,r,fill,stroke){ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fillStyle=fill;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=1;ctx.stroke()}}
function text(t,x,y,size=16,color=colors.text,weight=400,font=sans){ctx.fillStyle=color;ctx.font=`${weight} ${size}px ${font}`;ctx.fillText(t,x,y)}
window.renderFrame=t=>{ctx.globalAlpha=1;ctx.fillStyle=colors.bg;ctx.fillRect(0,0,960,540);ctx.strokeStyle='#234046';ctx.lineWidth=1;for(let x=0;x<960;x+=40){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,540);ctx.stroke()}for(let y=0;y<540;y+=40){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(960,y);ctx.stroke()}
text('BundleBoB.',52,50,22,colors.text,650);text('THE WORK AND THE NUMBERS, IN THE SAME FRAME.',520,48,9,colors.muted,400,mono);
text('One job. Two different totals.',52,115,34,colors.text,500);text('JOB 024 / ILLUSTRATIVE RECORDS',54,143,10,colors.muted,400,mono);
const visible=ease(t/.5)*ease((8-t)/.6);ctx.globalAlpha=visible;const amount=184600+Math.round(11850*ease((t-1.5)/1.4));
rounded(52,178,416,141,9,colors.panel,colors.line);rounded(492,178,416,141,9,colors.panel,colors.line);
text('OPERATIONS',76,206,10,colors.muted,500,mono);text('ACCOUNTING',516,206,10,colors.muted,500,mono);
text('$'+amount.toLocaleString('en-US'),76,262,43,colors.text,500);text('$184,600',516,262,43,colors.text,500);
text('Posted costs + approved additions',76,294,12,colors.muted);text('Posted costs only',516,294,12,colors.muted);
const conflict=ease((t-3)/.7);ctx.globalAlpha=visible*conflict;
rounded(52,340,856,134,9,'#2a3d3c','#94735c');rounded(76,360,22,22,11,colors.accent);text('!',84,376,14,colors.bg,650);
text('$11,850 difference. A clear next step.',112,379,22,colors.text,500);
text('Addition A-14 is approved in operations, but is not yet posted in accounting.',76,415,14,colors.muted);
text('Both values retained. Flagged for review. No automatic write-back.',76,448,12,colors.accent);
ctx.globalAlpha=1;text('Synthetic data. A demonstration of the method, not a customer result.',52,516,10,colors.muted);text('8 SECOND LOOP',798,516,9,colors.muted,400,mono);
};
});
try{
 for(let i=0;i<192;i++){await page.evaluate(t=>window.renderFrame(t),i/24);await page.locator('canvas').screenshot({path:path.join(frames,String(i).padStart(4,'0')+'.png')});if(i%48===0)console.log(`Rendered ${i}/192 frames`)}
 await page.evaluate(()=>window.renderFrame(5.4));await page.locator('canvas').screenshot({path:path.join(output,'reconciliation-poster.png')});
}finally{await browser.close()}
const ffmpeg=process.env.FFMPEG_PATH||'ffmpeg';
async function encode(args){await new Promise((resolve,reject)=>{const p=spawn(ffmpeg,['-hide_banner','-loglevel','error','-y','-framerate','24','-i',path.join(frames,'%04d.png'),...args],{stdio:'inherit'});p.on('error',reject);p.on('exit',code=>code===0?resolve():reject(new Error(`ffmpeg exited ${code}`)))})}
await encode(['-c:v','libx264','-crf','24','-preset','slow','-pix_fmt','yuv420p','-movflags','+faststart',path.join(output,'reconciliation.mp4')]);
await encode(['-c:v','libvpx-vp9','-b:v','0','-crf','36','-pix_fmt','yuv420p',path.join(output,'reconciliation.webm')]);
await fs.writeFile(path.join(output,'reconciliation.vtt'),`WEBVTT\n\n00:00.000 --> 00:01.500\nOne illustrative job. Two systems begin at $184,600.\n\n00:01.500 --> 00:03.000\nOperations includes approved additions, reaching $196,450.\n\n00:03.000 --> 00:05.000\nAccounting still shows $184,600 in posted costs.\n\n00:05.000 --> 00:08.000\nAn $11,850 difference is flagged for review. No automatic write-back.\n`);
const sizes=Object.fromEntries(await Promise.all(['reconciliation.mp4','reconciliation.webm','reconciliation-poster.png'].map(async name=>[name,(await fs.stat(path.join(output,name))).size])));
await fs.writeFile(path.join(root,'docs/video-build.json'),JSON.stringify({durationSeconds:8,fps:24,width:960,height:540,frames:192,sizes,technique:'Authored Canvas frames encoded with ffmpeg',reproduce:'npm run video (Playwright and ffmpeg installed)'},null,2)+'\n');
await fs.rm(frames,{recursive:true,force:true});console.log('Video generated:',sizes);
