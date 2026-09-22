import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {home,how,solutions,why,resources,article,about,contact,system,layout,esc} from '../site/pages.mjs';
import {content} from '../site/content.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export const output=path.join(root,'dist');
export const aliases={'/platform':'/how-it-works','/integrations':'/how-it-works#integrations','/services':'/why-bundlebob','/compare':'/why-bundlebob','/demo':'/contact','/article':'/resources/when-systems-disagree','/client-story':'/about'};
export async function build(){
 const email=process.env.CONTACT_EMAIL||'';const booking=process.env.BOOKING_URL||'';
 if(email&&!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email))throw new Error('CONTACT_EMAIL must be a valid business email address');
 if(booking&&new URL(booking).protocol!=='https:')throw new Error('BOOKING_URL must use HTTPS');
 const config={email,booking};
 const styles=(await Promise.all(['site.css','editorial.css'].map(file=>fs.readFile(path.join(root,'assets',file),'utf8')))).join('\n');
 const routes=[['/','Know the job before the close',home()],['/how-it-works','How it works',how()],['/solutions','Solutions for businesses that run on jobs',solutions()],['/why-bundlebob','Why BundleBoB',why()],['/resources','Practical guides to clearer job reporting',resources()],...content.resources.map(r=>['/resources/'+r.id,r.title,article(r.id)]),['/about','About BundleBoB',about()],['/contact','Start a conversation',contact(config)],['/system','Design system',system()]];
 await fs.rm(output,{recursive:true,force:true});
 await fs.mkdir(output,{recursive:true});
 for(const [url,title,body] of routes){const destination=path.join(output,url==='/'?'index.html':url.slice(1)+'.html');await fs.mkdir(path.dirname(destination),{recursive:true});await fs.writeFile(destination,layout({title,path:url,body,config,styles,noindex:url==='/system'}));}
 for(const [from,to] of Object.entries(aliases)){await fs.writeFile(path.join(output,from.slice(1)+'.html'),`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta http-equiv="refresh" content="0;url=${to}"><link rel="canonical" href="https://bundlebob.com${to.split('#')[0]}"><title>Page moved | BundleBoB</title><body><p>This page has moved. <a href="${to}">Continue to BundleBoB</a>.</p></body></html>`)}
 await fs.mkdir(path.join(output,'assets'),{recursive:true});
 const assets=['site.css','editorial.css','site.js','theme.js','favicon.svg','og-image.png'];
 for(const asset of assets)await fs.copyFile(path.join(root,'assets',asset),path.join(output,'assets',asset));
 for(const folder of ['video','fonts','images'])await fs.cp(path.join(root,'assets',folder),path.join(output,'assets',folder),{recursive:true});
 await fs.writeFile(path.join(output,'robots.txt'),'User-agent: *\nAllow: /\nSitemap: https://bundlebob.com/sitemap.xml\n');
 await fs.writeFile(path.join(output,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.filter(([url])=>url!=='/system').map(([url])=>`<url><loc>https://bundlebob.com${esc(url)}</loc></url>`).join('')}</urlset>`);
 await fs.writeFile(path.join(output,'404.html'),layout({title:'Page not found',path:'/404',noindex:true,styles,body:'<section class="page-hero wrap"><p class="eyebrow">404 / Page not found</p><h1>A gap we can close.</h1><p class="lede">That page is not here. Return to the overview or start a conversation about your systems.</p><div class="actions" style="margin-top:32px"><a class="button button-dark" href="/">Back to the overview</a><a class="text-link" href="/contact">Contact BundleBoB</a></div></section>'}));
 console.log(`Built ${routes.length} pages and ${Object.keys(aliases).length} legacy redirects in dist/. Contact mode: ${email?'email draft':'downloadable inquiry'}.`);
 return routes.map(([route])=>route);
}
if(process.argv[1]===fileURLToPath(import.meta.url))await build();
