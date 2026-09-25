import {chromium} from 'playwright';
import fs from 'node:fs/promises';
import {createRequire} from 'node:module';
const require = createRequire(import.meta.url);
const axe = await fs.readFile(require.resolve('axe-core/axe.min.js'), 'utf8');
const base = process.env.TEST_URL || 'http://127.0.0.1:8080';
const routes = ['/services', '/approach', '/', '/how-it-works', '/solutions', '/why-bundlebob', '/resources', '/resources/when-systems-disagree', '/resources/wip-review', '/resources/mapping-first', '/about', '/contact', '/system'];
const browser = await chromium.launch({channel: process.env.CHROME_CHANNEL || 'chrome'});
const results = [];
try {
  for (const theme of ['light', 'dark']) {
    const context = await browser.newContext({viewport: {width:390, height:844}, colorScheme:theme, reducedMotion:'reduce'});
    const page = await context.newPage();
    for (const route of routes) {
      await page.goto(base + route, {waitUntil:'networkidle'});
      await page.evaluate(axe);
      const audit = await page.evaluate(() => window.axe.run(document, {runOnly: {type:'tag', values:['wcag2a','wcag2aa','wcag21a','wcag21aa','best-practice']}}));
      results.push({route, theme, violations: audit.violations.map(v => ({id:v.id, impact:v.impact, description:v.description, nodes:v.nodes.map(n => ({html:n.html, summary:n.failureSummary}))}))});
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
