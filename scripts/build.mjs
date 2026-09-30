import {descriptions} from '../site/metadata.mjs';
import {clientStory} from '../site/client-story.mjs';
import {industriesPage,fdePage} from '../site/partnership.mjs';
import {servicesOverview,serviceDetail,constructionPage,enterpriseApproach,enterpriseClosing} from '../site/enterprise.mjs';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {home,how,solutions,why,resources,article,about,contact,system,layout,esc,themeLab} from '../site/pages.mjs';
import {content} from '../site/content.mjs';
import {enforcePalette} from './palette.mjs';
import {enforceTypeFloor} from './typography.mjs';
import {THEMES,tokenBlock} from './themes.mjs';
import {privacy,terms} from '../site/legal.mjs';
import {referenceHome} from '../site/reference-home.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export const output=path.join(root,'dist');
export const aliases={'/platform':'/how-it-works','/integrations':'/how-it-works#integrations','/compare':'/why-bundlebob','/demo':'/contact','/article':'/resources/when-systems-disagree'};
export async function build(){
 const email=process.env.CONTACT_EMAIL||'contact@bundlebob.com';const booking=process.env.BOOKING_URL||'';
 if(email&&!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email))throw new Error('CONTACT_EMAIL must be a valid business email address');
 if(booking&&new URL(booking).protocol!=='https:')throw new Error('BOOKING_URL must use HTTPS');
 const config={email,booking};
 const rawStyles=(await Promise.all(['site.css','editorial.css','studio.css','enterprise.css','signal.css','experience.css','typography.css','motion.css','reference.css','polish.css','finish.css','oct-direction.css','media-motion.css'].map(file=>fs.readFile(path.join(root,'assets',file),'utf8')))).join('\n');
 const palette=enforcePalette(rawStyles);
 const type=enforceTypeFloor(palette.css);
 const styles=type.css;
 console.log(`Palette: normalised ${palette.remapped.size} off-palette colours onto ink/paper/hi-vis.`);
 console.log(`Type:    raised ${type.raised} declarations to a ${12}px floor (smallest was ${type.smallest}px).`);
 const routes=[['/client-story','Hours from the field: a mechanical contractor client story',clientStory()],['/','Software for the work that runs your business',referenceHome()],['/services','Technology services',servicesOverview()],['/approach','Our approach',enterpriseApproach()],['/services/ai-solutions','Applied AI services',serviceDetail('ai')],['/services/custom-software','Custom software development',serviceDetail('software')],['/services/integrations','Systems integration services',serviceDetail('systems')],['/construction','Construction technology',constructionPage()],['/how-it-works','Reconciliation walkthrough',how()],['/solutions','Technology solutions across industries',industriesPage()+enterpriseClosing()],['/forward-deployed-engineering','An FDE working directly with your team',fdePage()+enterpriseClosing()],['/why-bundlebob','Why BundleBoB',why()],['/resources','Practical guides to clearer job reporting',resources()],...content.resources.map(r=>['/resources/'+r.id,r.title,article(r.id)]),['/about','About BundleBoB',about()],['/contact','Start a conversation',contact(config)],['/privacy','Privacy',privacy()],['/terms','Terms',terms()]];
 if(process.env.DESIGN_LAB==='1')routes.push(['/system','Design system',system()]);
 await fs.rm(output,{recursive:true,force:true});
 await fs.mkdir(output,{recursive:true});
 for(const [url,title,body] of routes){const destination=path.join(output,url==='/'?'index.html':url.slice(1)+'.html');await fs.mkdir(path.dirname(destination),{recursive:true});await fs.writeFile(destination,layout({title,description:descriptions[url],path:url,body,config,styles,noindex:url==='/system'}));}
 for(const [from,to] of Object.entries(aliases)){await fs.writeFile(path.join(output,from.slice(1)+'.html'),`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta http-equiv="refresh" content="0;url=${to}"><link rel="canonical" href="https://bundlebob.com${to.split('#')[0]}"><title>Page moved | BundleBoB</title><body><p>This page has moved. <a href="${to}">Continue to BundleBoB</a>.</p></body></html>`)}
 await fs.mkdir(path.join(output,'assets'),{recursive:true});
 const assets=['site.js','enterprise.js','finish.js','experience.js','theme.js','favicon.svg','logo.svg','og-image.png'];
 for(const asset of assets)await fs.copyFile(path.join(root,'assets',asset),path.join(output,'assets',asset));
 for(const folder of ['fonts'])await fs.cp(path.join(root,'assets',folder),path.join(output,'assets',folder),{recursive:true});
 await fs.mkdir(path.join(output,'assets/video'),{recursive:true});
 for(const file of ['business-in-motion-hd.mp4','business-in-motion-balanced.mp4','business-in-motion-tablet-balanced.mp4','business-in-motion-portrait-balanced.mp4','business-in-motion-tablet.mp4','business-in-motion-portrait.mp4','admin-overhead-hd.mp4','clearer-handoffs-hd.mp4','admin-overhead-mobile-hd.mp4','clearer-handoffs-mobile-hd.mp4','construction-field-hd.mp4','construction-field-balanced.mp4','construction-field-tablet-balanced.mp4','construction-field-portrait-balanced.mp4','construction-field-tablet.mp4','construction-field-portrait.mp4','reconciliation.mp4','reconciliation.webm','reconciliation.vtt'])await fs.copyFile(path.join(root,'assets/video',file),path.join(output,'assets/video',file));
 await fs.mkdir(path.join(output,'assets/images'),{recursive:true});
 // Deploy only current media; earlier generated business scenes remain archived in source.
 for(const file of ['service-ai.webp','service-software.webp','service-systems.webp','business-in-motion.webp','business-in-motion-hd.webp','business-in-motion-tablet.webp','business-in-motion-portrait.webp','admin-overhead-hd.webp','clearer-handoffs-hd.webp','construction-field-hd.webp','construction-field-tablet.webp','construction-field-portrait.webp','connected-world.webp','people-process-technology.webp','construction-field.webp','engineering.webp','people-at-work.webp','reconciliation-poster.webp'])await fs.copyFile(path.join(root,'assets/images',file),path.join(output,'assets/images',file));
 // Optional design review tool; never part of a normal deployment.
 if(process.env.DESIGN_LAB==='1'){
 await fs.copyFile(path.join(root,'assets/themelab.js'),path.join(output,'assets/themelab.js'));
 // ---- theme lab: one full stylesheet per candidate palette ----
 for(const t of THEMES){
  const themed=enforceTypeFloor(enforcePalette(rawStyles,t).css).css+tokenBlock(t);
  await fs.writeFile(path.join(output,'assets',`theme-${t.id}.css`),themed);
 }
 await fs.writeFile(path.join(output,'theme-lab.html'),themeLab(THEMES,referenceHome(),config));
 console.log(`Themes:  ${THEMES.length} candidate palettes emitted -> /theme-lab`);
 }
 await fs.writeFile(path.join(output,'robots.txt'),'User-agent: *\nAllow: /\nSitemap: https://bundlebob.com/sitemap.xml\n');
 await fs.writeFile(path.join(output,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.filter(([url])=>url!=='/system').map(([url])=>`<url><loc>https://bundlebob.com${esc(url)}</loc></url>`).join('')}</urlset>`);
 await fs.writeFile(path.join(output,'404.html'),layout({title:'Page not found',path:'/404',noindex:true,styles,body:'<section class="page-hero wrap"><p class="eyebrow">404 / Page not found</p><h1>A gap we can close.</h1><p class="lede">That page is not here. Return to the overview or start a conversation about your systems.</p><div class="actions" style="margin-top:32px"><a class="button button-dark" href="/">Back to the overview</a><a class="text-link" href="/contact">Contact BundleBoB</a></div></section>'}));
 console.log(`Built ${routes.length} pages and ${Object.keys(aliases).length} legacy redirects in dist/. Contact mode: ${email?'email draft':'downloadable inquiry'}.`);
 return routes.map(([route])=>route);
}
if(process.argv[1]===fileURLToPath(import.meta.url))await build();
