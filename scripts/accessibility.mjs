import {chromium} from 'playwright';
import fs from 'node:fs/promises';
import {createRequire} from 'node:module';
const require = createRequire(import.meta.url);
const axe = await fs.readFile(require.resolve('axe-core/axe.min.js'), 'utf8');
const base = process.env.TEST_URL || 'http://127.0.0.1:8080';
const routes = ['/client-story','/forward-deployed-engineering', '/services/ai-solutions', '/services/custom-software', '/services/integrations', '/construction', '/services', '/approach', '/', '/how-it-works', '/solutions', '/why-bundlebob', '/resources', '/resources/when-systems-disagree', '/resources/wip-review', '/resources/mapping-first', '/about', '/contact', '/privacy', '/terms'];
const browser = await chromium.launch({channel: process.env.CHROME_CHANNEL || 'chrome'});
const results = [];
try {
  for (const theme of ['light', 'dark']) for (const motion of ['reduce','no-preference']) {
    const context = await browser.newContext({viewport: {width:390, height:844}, colorScheme:theme, reducedMotion:motion});
    const page = await context.newPage();
    for (const route of motion==='reduce'?routes:['/','/services','/solutions','/forward-deployed-engineering']) {
      console.log(`Accessibility: ${theme} ${motion} ${route}`);
      await page.goto(base + route, {waitUntil:'networkidle'});
      await page.evaluate(axe);
      let deadline;
      const audit = await Promise.race([
        page.evaluate(() => window.axe.run(document, {runOnly: {type:'tag', values:['wcag2a','wcag2aa','wcag21a','wcag21aa','best-practice']},rules:{'label-content-name-mismatch':{enabled:true}}})),
        new Promise((_,reject)=>{deadline=setTimeout(()=>reject(new Error(`Accessibility audit timed out: ${theme} ${route}`)),45000)})
      ]).finally(()=>clearTimeout(deadline));
      results.push({route, theme, motion, violations: audit.violations.map(v => ({id:v.id, impact:v.impact, description:v.description, nodes:v.nodes.map(n => ({html:n.html, summary:n.failureSummary}))}))});
    }
    await context.close();
  }
} finally {
  await browser.close();
}
await fs.mkdir('audit', {recursive:true});
await fs.writeFile('audit/accessibility.json', JSON.stringify(results,null,2));
console.log(JSON.stringify(results.filter(r=>r.violations.length),null,2));
console.log('Audited', results.length, 'page/theme pairs.');
if(results.some(r=>r.violations.length)) process.exitCode=1;
