import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const {default:lighthouse}=await import(process.env.LIGHTHOUSE_MODULE||'lighthouse');
const {createRequire}=await import('node:module');
const require=createRequire(process.env.LIGHTHOUSE_MODULE||import.meta.url);
const launcher=require('chrome-launcher');
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
await fs.mkdir(path.join(root,'audit'),{recursive:true});
const chrome=await launcher.launch({...(process.env.CHROME_PATH?{chromePath:process.env.CHROME_PATH}:{}),chromeFlags:['--headless','--no-sandbox']});
try{const result=await lighthouse(process.env.TEST_URL||'http://127.0.0.1:8080/',{port:chrome.port,output:['json','html'],logLevel:'error',onlyCategories:['performance','accessibility','best-practices','seo']});await fs.writeFile(path.join(root,'audit/lighthouse.json'),result.report[0]);await fs.writeFile(path.join(root,'audit/lighthouse.html'),result.report[1]);const lhr=result.lhr;const numbers={version:lhr.lighthouseVersion,date:lhr.fetchTime,scores:Object.fromEntries(Object.entries(lhr.categories).map(([k,v])=>[k,Math.round(v.score*100)])),metrics:lhr.audits.metrics.details.items[0],warnings:lhr.runWarnings,issues:Object.values(lhr.audits).filter(a=>a.score!==null&&a.score<1).map(a=>({id:a.id,title:a.title,display:a.displayValue,details:a.details}))};await fs.writeFile(path.join(root,'audit/lighthouse-summary.json'),JSON.stringify(numbers,null,2));console.log(JSON.stringify(numbers,null,2));}finally{await chrome.kill()}
