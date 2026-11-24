'use strict';
const assert = require('node:assert/strict');
const { chromium } = require('playwright');

const BASE = process.env.GW_QA_BASE || 'http://127.0.0.1:4173';
const SUPPLIER_NAMES = /Planetworld|Audio Connections/i;
const EXPECTED_ROOTS = ['Car Audio / Home Entertainment', 'Auto Electrical Spares', 'Car Care & Accessories'];

(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const width of [320, 390, 430, 1280]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      page.setDefaultTimeout(20000);
      const writes = [];
      const pageErrors = [];
      const consoleErrors = [];
      page.on('pageerror', error => pageErrors.push(error.message));
      page.on('console', message => { if (message.type() === 'error') consoleErrors.push(message.text()); });
      await page.route('**/rest/v1/**', async route => {
        const method = route.request().method();
        const url = route.request().url();
        if (method !== 'GET' && method !== 'HEAD') {
          writes.push({ method, url });
          return route.abort();
        }
        if (/\/rest\/v1\/products(?:\?|$)/.test(url)) {
          return route.fulfill({ status: 200, contentType: 'application/json', body: '[]' });
        }
        return route.continue();
      });

      await page.goto(BASE + '/index-new.html?ownerPreview=1&previewBuild=exact-head-qa', { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => document.querySelectorAll('#categoryGrid>.rootCategoryLink').length === 3, null, { timeout: 30000 });
      const roots = await page.locator('#categoryGrid>.rootCategoryLink .catContent b').allTextContents();
      assert.deepEqual(roots.map(x => x.trim()), EXPECTED_ROOTS, 'homepage must expose exactly the three owner-approved main categories');
      assert.deepEqual(pageErrors, [], 'homepage must not raise JavaScript errors: ' + pageErrors.join('; '));
      const homeText = await page.locator('body').innerText();
      assert.ok(!SUPPLIER_NAMES.test(homeText), 'supplier names must not appear on customer-facing homepage content');
      assert.ok(!/Supplier SKU|Dealer Cost|Dealer Price|Proposed Get Wired SKU/i.test(homeText), 'internal supplier and proposed SKU fields must not be shown');
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      assert.equal(overflow, false, 'homepage must not overflow horizontally at viewport ' + width);
      assert.equal(writes.length, 0, 'owner preview must not issue live write requests');

      await page.goto(BASE + '/owner-preview.html', { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('iframe');
      const frame = page.frames().find(f => f.url().includes('index-new.html'));
      assert.ok(frame, 'owner preview must embed the current three-category storefront');
      await frame.waitForFunction(() => document.querySelectorAll('#categoryGrid>.rootCategoryLink').length === 3, null, { timeout: 30000 });
      await frame.waitForFunction(() => document.documentElement.dataset.gwPreviewLocked === '1', null, { timeout: 10000 });
      const visibleCheckoutControls = await frame.locator('a[href*="checkout"], .checkoutNow, #checkout, .checkout-fab').evaluateAll(nodes =>
        nodes.filter(node => {
          const style = getComputedStyle(node);
          return style.display !== 'none' && style.visibility !== 'hidden' && !node.hasAttribute('disabled');
        }).map(node => ({ tag: node.tagName, text: (node.innerText || '').trim(), href: node.getAttribute('href'), className: node.className }))
      );
      assert.deepEqual(visibleCheckoutControls, [], 'owner preview must keep checkout and order actions blocked; visible controls: ' + JSON.stringify(visibleCheckoutControls));
      const frameRoots = await frame.locator('#categoryGrid>.rootCategoryLink .catContent b').allTextContents();
      assert.deepEqual(frameRoots.map(x => x.trim()), EXPECTED_ROOTS, 'owner preview iframe must retain exactly the three approved root categories');

      // The zero-stock shell must still let shoppers browse departments, brands and product types.
      await page.goto(BASE + '/preview-audio.html', { waitUntil: 'domcontentloaded' });
      await page.locator('#departments .audioTile').first().waitFor({ state: 'visible' });
      assert.ok((await page.locator('#departments .audioTile').count()) >= 3, 'audio department cards must survive the catalogue reset');
      await page.getByRole('button', { name: 'Open Car Audio & Video' }).click();
      await page.locator('#brands a[aria-label="Sony"]').waitFor({ state: 'visible' });
      assert.equal(await page.locator('#brands a.brandLogoButton').count() > 0, true, 'brand cards must remain visible without stock');
      await page.locator('#brands a[aria-label="Sony"]').click();
      await page.locator('#types a.typeCard').filter({ hasText: 'Speakers & Component Kits' }).waitFor({ state: 'visible' });
      assert.ok((await page.locator('#types a.typeCard').count()) > 0, 'product type cards must be available without stock');
      await page.locator('#types a.typeCard').filter({ hasText: 'Speakers & Component Kits' }).click();
      await page.locator('#products .empty').waitFor({ state: 'visible' });
      assert.equal(await page.locator('#products article.product').count(), 0, 'stock must remain zero after full click-through');
      const pathOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      assert.equal(pathOverflow, false, 'brand/product-type route must not overflow at viewport ' + width);
      assert.equal(writes.length, 0, 'navigation must not issue live write requests');

      // Homepage search and empty cart must be usable rather than missing or misleading.
      await page.goto(BASE + '/index-new.html?ownerPreview=1', { waitUntil: 'domcontentloaded' });
      await page.locator('#searchInput').waitFor({ state: 'visible' });
      await page.locator('#searchInput').fill('nonexistent-product-xyz');
      await page.waitForTimeout(350);
      assert.equal(await page.locator('#shop .product').count(), 0, 'empty search must show no product cards');
      const cartText = await page.locator('#cartItems').innerText();
      assert.match(cartText, /Your cart is empty/i, 'the empty cart must be disclosed');
      assert.equal(writes.length, 0, 'search and empty cart must never send a write request');

      await page.goto(BASE + '/preview-audio-products.html?department=Car%20Audio&brand=Sony&component=Speakers%20%26%20Component%20Kits&label=Car%20Audio%20%26%20Video', { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => {
        const products = document.getElementById('products');
        return products && !products.hidden && products.innerText.includes('No products are currently listed');
      });
      const audioText = await page.locator('body').innerText();
      assert.ok(audioText.includes('Sony'), 'brand-first route must retain the selected brand');
      assert.equal(await page.locator('#products article').count(), 0, 'empty store must not render product cards');
      assert.ok(!SUPPLIER_NAMES.test(audioText), 'supplier names must not appear in customer-facing audio product content');
      assert.ok(!/Proposed Get Wired SKU|Supplier SKU|Dealer Cost|Dealer Price/i.test(audioText), 'internal identifiers and dealer pricing must not appear');
      assert.ok(!/\bR\s?[\d,]+(?:\.\d{2})?\b/.test(audioText), 'stale numeric supplier prices must not appear');
      const dataAudit = await page.evaluate(async () => {
        const [planet, audio] = await Promise.all([
          fetch('assets/audio-catalogue-primary-preview.json').then(r => r.json()),
          fetch('assets/audio-catalogue-secondary-preview.json').then(r => r.json())
        ]);
        return {
          planetRows: planet.records.length,
          audioRows: audio.records.length,
          planetPriceLeaks: planet.records.filter(r => typeof r.indicativePrice === 'number' || typeof r.hasStock === 'boolean').length,
          audioPriceLeaks: audio.records.filter(r => typeof r.indicativePrice === 'number' || typeof r.hasStock === 'boolean').length,
          audioPriceLabels: [...new Set(audio.records.map(r => r.priceOnRequestText))]
        };
      });
      assert.equal(dataAudit.planetRows, 0);
      assert.equal(dataAudit.audioRows, 0, 'secondary public catalogue must be empty');
      assert.equal(dataAudit.planetPriceLeaks, 0, 'Planetworld preview JSON must not retain numeric price or stock claims');
      assert.equal(dataAudit.audioPriceLeaks, 0, 'Audio Connections preview JSON must not retain numeric price or stock claims');
      assert.deepEqual(dataAudit.audioPriceLabels, []);
      const audioOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      assert.equal(audioOverflow, false, 'audio product route must not overflow horizontally at viewport ' + width);
      await page.close();
      console.log('PASS owner preview viewport=' + width + ' roots=3 department-brand-type-clickthrough=PASS search=PASS empty-cart=PASS products=0 checkout=blocked no-live-writes');
    }
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exit(1); });
