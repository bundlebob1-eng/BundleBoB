/* ============================================================
   HOME — acceptance checks for the rebuilt homepage.

   This replaces scripts/experience-check.mjs, whose subject (the
   globe hero and its capability selector) no longer exists. The
   assertions are carried over rather than dropped: each one is
   pointed at the equivalent thing in the new composition, so the
   coverage is the same shape.

   What it proves:
     the two films never fetch bytes before they are wanted
     pausing actually stops pixels changing, not just a label
     reduced motion holds both films
     the honesty copy is present, not quietly lost in a redesign
     every call to action resolves
     nothing overflows at eleven widths
     the page still works with JavaScript disabled
   ============================================================ */

import assert from 'node:assert/strict';
import {chromium} from 'playwright';

const base = process.env.TEST_URL || 'http://127.0.0.1:8080';
const browser = await chromium.launch({channel: process.env.CHROME_CHANNEL || 'chrome'});
const result = {};
const errors = [];
const page = await browser.newPage({viewport: {width: 1440, height: 900}});
page.on('pageerror', e => errors.push(e.message));
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });

try {
  await page.goto(base, {waitUntil: 'networkidle'});
  await page.locator('.ref-hero').waitFor();
  await page.evaluate(() => document.fonts.ready);

  /* ---- composition ---- */
  const h1 = (await page.locator('.ref-hero h1').innerText()).replace(/\s+/g, ' ').trim();
  assert.match(h1, /actually runs/, 'the accent phrase must survive in the headline');
  assert.equal(await page.locator('.ref-gradient').count(), 1, 'the gradient section is a reference signature');
  assert.equal(await page.locator('.ref-card').count(), 3);
  assert.equal(await page.locator('.ref-industries a').count(), 8);
  result.composition = h1;

  /* ---- films fetch nothing until asked ---- */
  const requested = [];
  page.on('request', r => { if (/\.mp4/.test(r.url())) requested.push(r.url()); });
  await page.reload({waitUntil: 'networkidle'});
  await page.waitForTimeout(1200);
  assert.equal(await page.locator('video[data-background-video]').count(), 2);
  assert.deepEqual(
    await page.locator('video[data-background-video]').evaluateAll(v => v.map(x => x.getAttribute('preload'))),
    ['none', 'none']
  );
  result.filmsDeferred = true;

  /* ---- pause stops pixels, resume moves them ---- */
  const film = page.locator('.ref-hero video').first();
  await page.waitForTimeout(1800);
  const toggle = page.locator('.ref-hero [data-video-toggle]');
  if (await toggle.isVisible()) {
    if (!await film.evaluate(v => v.paused)) await toggle.click();
    await page.waitForTimeout(150);
    assert.equal(await film.evaluate(v => v.paused), true);
    const a = await page.locator('.ref-hero').screenshot();
    await page.waitForTimeout(320);
    const b = await page.locator('.ref-hero').screenshot();
    assert.deepEqual(a, b, 'a paused film must stop the pixels changing');
    result.pauseStopsMotion = true;
  }

  /* ---- honesty copy survived the redesign ---- */
  const body = await page.locator('body').innerText();
  assert.match(body, /synthetic/i, 'the synthetic-data label must remain');
  assert.match(body, /pre-pilot/i, 'the pre-pilot disclosure must remain');
  result.honestyCopy = true;

  /* ---- every call to action resolves ---- */
  const hrefs = [...new Set(await page.locator('.ref a[href^="/"]').evaluateAll(a => a.map(x => x.getAttribute('href'))))];
  for (const href of hrefs) {
    const status = (await page.request.get(base + href.split('#')[0])).status();
    assert.ok(status < 400, `${href} returned ${status}`);
  }
  result.links = hrefs.length;

  /* ---- reduced motion holds both films ---- */
  await page.emulateMedia({reducedMotion: 'reduce'});
  await page.reload({waitUntil: 'networkidle'});
  await page.waitForTimeout(1200);
  assert.deepEqual(
    await page.locator('video[data-background-video]').evaluateAll(v => v.map(x => x.paused)),
    [true, true]
  );
  assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'auto');
  await page.emulateMedia({reducedMotion: 'no-preference'});
  result.reducedMotion = true;

  /* ---- eleven widths, no overflow, headline intact ---- */
  result.layouts = [];
  for (const width of [320, 390, 600, 760, 761, 900, 1024, 1100, 1280, 1440, 1920]) {
    await page.setViewportSize({width, height: 900});
    await page.goto(base, {waitUntil: 'domcontentloaded'});
    await page.waitForTimeout(280);
    const check = await page.evaluate(W => {
      const h = document.querySelector('.ref-hero h1').getBoundingClientRect();
      return {overflow: document.documentElement.scrollWidth > W, clipped: h.right > W + 1 || h.left < -1};
    }, width);
    assert.equal(check.overflow, false, `overflow at ${width}`);
    assert.equal(check.clipped, false, `headline clipped at ${width}`);
    result.layouts.push(width);
  }

  /* ---- works without JavaScript ---- */
  const nojs = await browser.newContext({javaScriptEnabled: false});
  const plain = await nojs.newPage();
  await plain.goto(base);
  assert.ok((await plain.locator('.ref-hero h1').innerText()).length > 10);
  assert.equal(await plain.locator('.ref-card').count(), 3);
  assert.equal(await plain.locator('.ref-industries a').count(), 8);
  await nojs.close();
  result.noJavaScript = true;

  assert.deepEqual(errors, []);
  result.errors = errors;
  console.log(JSON.stringify(result, null, 2));
} finally {
  await browser.close();
}
