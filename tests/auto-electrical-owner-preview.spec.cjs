const { chromium } = require('playwright');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const viewport of [{ width: 390, height: 844 }, { width: 1365, height: 900 }]) {
      const page = await browser.newPage({ viewport });
      const errors = [];
      page.on('pageerror', error => errors.push(String(error)));

      await page.goto('http://127.0.0.1:4174/preview-auto-electrical.html', {
        waitUntil: 'domcontentloaded'
      });
      await page.locator('.product-card').first().waitFor({ state: 'visible', timeout: 20000 });
      assert.equal(await page.locator('.product-card').count(), 34);
      assert.ok((await page.locator('body').innerText()).includes(
        'Price On Request due to Limited Stock and Availability'
      ));

      // Product images are intentionally lazy-loaded. Scroll each into view and
      // await decode before asserting, rather than treating unrequested lazy
      // images as broken assets. The full 34-image load check remains mandatory.
      const productImages = await page.locator('img.product-photo').all();
      assert.equal(productImages.length, 34);
      for (const image of productImages) {
        await image.scrollIntoViewIfNeeded();
        await image.evaluate(img => img.decode());
      }
      const imageAudit = await page.locator('img.product-photo').evaluateAll(images =>
        images.map(img => ({
          loaded: img.complete && img.naturalWidth > 0,
          width: img.getBoundingClientRect().width
        }))
      );
      assert.equal(imageAudit.length, 34);
      assert.ok(imageAudit.every(image => image.loaded && image.width <= 181.5));

      const logoImages = await page.locator('img.gw-logo').all();
      assert.equal(logoImages.length, 34);
      for (const image of logoImages) {
        await image.scrollIntoViewIfNeeded();
        await image.evaluate(img => img.decode());
      }
      const logoAudit = await page.locator('img.gw-logo').evaluateAll(images =>
        images.map(img => img.complete && img.naturalWidth > 0)
      );
      assert.ok(logoAudit.every(Boolean));

      await page.getByRole('button', { name: 'Sensors' }).click();
      assert.equal(await page.locator('.product-card').count(), 9);
      await page.getByRole('button', { name: 'All pilot products' }).click();
      assert.equal(await page.locator('.product-card').count(), 34);

      const dimensions = await page.evaluate(() => ({
        width: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth
      }));
      assert.ok(dimensions.scrollWidth <= dimensions.width + 2);
      assert.deepEqual(errors, []);
      await page.close();
    }
  } finally {
    await browser.close();
  }

  console.log(
    'PASS: 390px mobile/1365px desktop preview, 34 decoded product images, ' +
    '34 decoded Get Wired logo watermarks, category filters, POR and no overflow.'
  );
})().catch(error => {
  console.error(error);
  process.exit(1);
});
