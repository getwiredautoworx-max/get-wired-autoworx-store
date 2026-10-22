const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const htmlPath = path.resolve(process.cwd(), 'store.html');
const html = fs.readFileSync(htmlPath, 'utf8');
const server = http.createServer((req, res) => {
  if (req.url === '/store.html' || req.url === '/') {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end(html);
    return;
  }
  if (req.url === '/index-new.html') {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end('<!doctype html><title>Test storefront</title><p>Storefront test fixture loaded</p>');
    return;
  }
  res.writeHead(404);
  res.end('not found');
});

(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  const base = `http://127.0.0.1:${address.port}/store.html`;
  const browser = await chromium.launch({ headless: true });
  const failures = [];
  const check = (condition, label) => {
    console.log(`${condition ? 'PASS' : 'FAIL'} ${label}`);
    if (!condition) failures.push(label);
  };
  try {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(base);
    const gate = page.locator('#termsGate');
    await gate.waitFor({ state: 'visible' });
    check(await gate.isVisible(), 'first visit shows blocking terms dialog');
    check((await page.locator('#store').getAttribute('src')) === null, 'store iframe does not load before acceptance');
    check(await page.locator('#acceptTerms').isDisabled(), 'accept button disabled until checkbox selected');
    await page.locator('#termsConfirm').check();
    check(await page.locator('#acceptTerms').isEnabled(), 'checkbox enables explicit accept action');
    await page.locator('#acceptTerms').click();
    await gate.waitFor({ state: 'hidden' });
    await page.locator('#store').waitFor();
    await page.waitForFunction(() => document.querySelector('#store').contentDocument?.title === 'Test storefront');
    check(await gate.isHidden(), 'accepting terms unlocks store');
    check((await page.locator('#store').getAttribute('src')) === 'index-new.html', 'store only starts loading after acceptance');
    check(await page.locator('#checkout').evaluate(el => getComputedStyle(el).display === 'none' || !el.classList.contains('show')), 'checkout is not presented as enabled with an empty cart');

    await page.reload();
    check(await page.locator('#termsGate').isHidden(), 'same terms version is remembered on this browser');
    await page.evaluate(() => localStorage.setItem('gw_terms_gate_version', 'older-terms-version'));
    await page.reload();
    check(await page.locator('#termsGate').isVisible(), 'older acceptance version triggers a fresh prompt');
    await context.close();

    const declineContext = await browser.newContext();
    const declinePage = await declineContext.newPage();
    await declinePage.goto(base);
    await declinePage.locator('#declineTerms').click();
    check(await declinePage.locator('#termsGate').isVisible(), 'declining keeps store blocked');
    check((await declinePage.locator('#store').getAttribute('src')) === null, 'declining never starts the store iframe');
    check((await declinePage.locator('#termsStatus').innerText()).includes('declined'), 'decline gives clear feedback');
    await declineContext.close();
  } finally {
    await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
  if (failures.length) {
    console.error('Failed checks:', failures.join('; '));
    process.exitCode = 1;
  }
})().catch(error => {
  console.error(error);
  process.exit(2);
});
