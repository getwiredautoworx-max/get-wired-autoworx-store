import { chromium } from 'playwright';
import fs from 'node:fs';

const base = process.env.STOREFRONT_BASE_URL || 'http://127.0.0.1:4173/index.html';
const outDir = 'qa-output';
fs.mkdirSync(outDir, { recursive: true });
const report = { base, startedAt: new Date().toISOString(), viewports: [], checks: {}, consoleErrors: [], pageErrors: [], failedRequests: [], httpResponses: [] };
const failures = [];
const check = (name, ok, detail = '') => {
  report.checks[name] = { passed: Boolean(ok), detail };
  if (!ok) failures.push(name + (detail ? ': ' + detail : ''));
};

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  page.on('console', msg => { if (msg.type() === 'error') report.consoleErrors.push(msg.text()); });
  page.on('pageerror', error => report.pageErrors.push(String(error)));
  page.on('requestfailed', req => report.failedRequests.push({ url: req.url(), failure: req.failure()?.errorText || 'unknown' }));
  page.on('response', res => { if (res.status() >= 400) report.httpResponses.push({ status: res.status(), url: res.url() }); });

  const response = await page.goto(base, { waitUntil: 'domcontentloaded', timeout: 45000 });
  report.status = response?.status() ?? null;
  await page.waitForTimeout(9000);
  report.title = await page.title();
  report.bodyClass = await page.locator('body').getAttribute('class');
  check('homepage_http_200', report.status === 200, 'HTTP ' + report.status);
  check('bright_theme_activated', (report.bodyClass || '').split(/\s+/).includes('brightTheme'), 'body class=' + report.bodyClass);
  check('hero_present', await page.locator('.heroCard').count() > 0, 'heroCard element exists');
  check('category_grid_exists', await page.locator('#categoryGrid').count() === 1, 'expected #categoryGrid');
  check('part_search_control', await page.getByRole('button', { name: 'PART SEARCH' }).count() === 1, 'expected one Part Search button');
  check('request_part_control', await page.getByRole('button', { name: 'REQUEST A PART' }).count() === 1, 'expected one Request a Part button');
  check('checkout_route_present', await page.locator('a.checkoutNow[href="checkout-v2.html"]').count() === 1, 'cart checkout route');
  check('correct_terms_route', await page.locator('a[href="terms-and-conditions.html"]').count() >= 1 && await page.locator('a[href="TERMS_AND_CONDITIONS.md"]').count() === 0, 'terms link must point to included HTML page');

  for (const [width, height] of [[1440,1000],[390,844],[320,700]]) {
    await page.setViewportSize({ width, height });
    await page.waitForTimeout(400);
    const metrics = await page.evaluate(() => ({
      viewportWidth: innerWidth,
      documentWidth: document.documentElement.scrollWidth,
      bodyWidth: document.body.scrollWidth,
      pageHeight: document.documentElement.scrollHeight,
      categoryCards: document.querySelectorAll('#categoryGrid .catWrap').length,
      categoryButtons: document.querySelectorAll('#categoryGrid .catBtn').length,
      productCards: document.querySelectorAll('.product').length,
      heroWidth: document.querySelector('.heroCard')?.getBoundingClientRect().width ?? null,
      images: [...document.images].map(i => ({ src: i.currentSrc || i.src, complete: i.complete, naturalWidth: i.naturalWidth }))
    }));
    metrics.width = width;
    metrics.horizontalOverflow = metrics.documentWidth > width || metrics.bodyWidth > width;
    metrics.loadedImages = metrics.images.filter(i => i.complete && i.naturalWidth > 0).length;
    metrics.brokenImages = metrics.images.filter(i => i.complete && i.naturalWidth === 0).length;
    report.viewports.push(metrics);
    await page.screenshot({ path: outDir + '/homepage-' + width + '.png', fullPage: true });
    check('no_horizontal_overflow_' + width, !metrics.horizontalOverflow, 'viewport=' + width + ', document=' + metrics.documentWidth + ', body=' + metrics.bodyWidth);
  }

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.getByRole('button', { name: 'PART SEARCH' }).click();
  check('part_search_opens', await page.locator('.partSearchOverlay.open').count() === 1, 'overlay should open');
  check('part_search_input_present', await page.locator('#partSearchQuery').count() === 1, 'search input should be available');
  await page.locator('.partSearchOverlay.open .partSearchClose').click();
  check('part_search_closes', await page.locator('.partSearchOverlay.open').count() === 0, 'overlay should close');

  await page.getByRole('button', { name: 'REQUEST A PART' }).click();
  check('part_request_opens', await page.locator('#sourcePart.open').count() === 1, 'request form should open');
  check('part_request_form_present', await page.locator('#sourcePartForm').count() === 1, 'request form should be available');
  await page.locator('#sourcePart .requestModalClose').click();
  check('part_request_closes', await page.locator('#sourcePart.open').count() === 0, 'request form should close');

  await page.locator('.cart').click();
  check('cart_opens', await page.locator('#cartPanel.open').count() === 1, 'cart panel should open');
  check('cart_checkout_link_visible', await page.locator('#cartPanel a.checkoutNow[href="checkout-v2.html"]').count() === 1, 'checkout link in cart');
  await page.locator('#closeCart').click();
  check('cart_closes', await page.locator('#cartPanel.open').count() === 0, 'cart panel should close');

  report.categoryCardsAfterLoad = await page.locator('#categoryGrid .catWrap').count();
  check('category_tiles_populated', report.categoryCardsAfterLoad >= 1, 'found ' + report.categoryCardsAfterLoad + ' category tiles after waiting for catalogue load');

  await page.locator('.cart').click();
  await page.locator('#cartPanel a.checkoutNow').click();
  await page.waitForLoadState('domcontentloaded');
  check('checkout_link_navigates', new URL(page.url()).pathname.endsWith('/checkout-v2.html'), 'landed at ' + page.url());

  const routeResults = [];
  for (const route of ['store.html','product.html','products.html','checkout.html','checkout-v2.html','category.html','returns-refunds.html','terms-and-conditions.html']) {
    const routeResponse = await page.goto(new URL(route, base).toString(), { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(350);
    const routeResult = { route, status: routeResponse?.status() ?? null, title: await page.title() };
    routeResults.push(routeResult);
    check('route_' + route.replace(/[^a-z0-9]+/gi, '_') + '_http_200', routeResult.status === 200 && routeResult.title.length > 0, JSON.stringify(routeResult));
  }
  report.customerRoutes = routeResults;
  check('no_uncaught_page_errors', report.pageErrors.length === 0, report.pageErrors.slice(0, 5).join(' | '));
  report.finishedAt = new Date().toISOString();
  report.failures = failures;
  fs.writeFileSync(outDir + '/report.json', JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  if (failures.length) process.exitCode = 1;
} catch (error) {
  report.fatalError = String(error?.stack || error);
  report.finishedAt = new Date().toISOString();
  fs.writeFileSync(outDir + '/report.json', JSON.stringify(report, null, 2));
  console.error(report.fatalError);
  process.exitCode = 1;
} finally {
  await browser.close();
}
