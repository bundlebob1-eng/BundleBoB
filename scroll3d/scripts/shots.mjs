import { chromium } from 'playwright'
const b = await chromium.launch({ channel: 'chrome' })
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' })
await p.goto('http://localhost:8200/', { waitUntil: 'domcontentloaded' })
await p.waitForSelector('canvas', { timeout: 15000 })
await p.waitForFunction(() => {
  const el = document.querySelector('[role="status"]')
  return el && getComputedStyle(el).opacity === '0'
}, { timeout: 12000 })
await p.waitForTimeout(1000)

// progress 1.0 is reached when the SPACER's bottom hits the viewport bottom,
// which is well before the document end (the handover section follows).
const maxScroll = await p.evaluate(() => {
  const sp = [...document.querySelectorAll('div')].find(d => d.style.height?.includes('vh'))
  return sp.offsetTop + sp.offsetHeight - window.innerHeight
})
console.log('progress-1.0 scrollTop =', maxScroll)

for (const target of [0.00, 0.08, 0.22, 0.37, 0.53, 0.70, 0.80, 0.92, 1.00]) {
  await p.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), maxScroll * target)
  await p.waitForTimeout(1700)
  const readout = await p.locator('.fixed.left-6').first().innerText().catch(()=>'')
  console.log(`p=${target.toFixed(2)}  hud="${readout.replace(/\n/g,' ')}"`)
  await p.screenshot({ path: `/tmp/shots/b${String(Math.round(target*100)).padStart(3,'0')}.png` })
}
await b.close()
