import { chromium } from 'playwright';
import fs from 'node:fs';

const base = process.env.STOREFRONT_BASE_URL || 'http://127.0.0.1:4173/index-new.html';
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
  check('dark_theme_activated', await page.locator('body').evaluate(el => { const c = getComputedStyle(el).backgroundColor; return !el.classList.contains('brightTheme') && (c === 'rgb(8, 11, 17)' || c.includes('0, 0, 0') || c.includes('2, 6, 13') || c.includes('radial-gradient')); }), 'body class=' + report.bodyClass);
  check('hero_present', await page.locator('.heroCard').count() > 0, 'heroCard element exists');
  check('category_grid_exists', await page.locator('#categoryGrid').count() === 1, 'expected #categoryGrid');
  check('part_search_control', await page.getByRole('button', { name: 'PART SEARCH' }).count() === 1, 'expected one Part Search button');
  check('request_part_control', await page.getByRole('button', { name: 'REQUEST A PART' }).count() === 1, 'expected one Request a Part button');
  check('checkout_route_present', await page.locator('a.checkoutNow[href="checkout-v2.html"]').count() === 1, 'cart checkout route');
  check('correct_terms_route', await page.locator('a[href="terms-and-conditions.html"]').count() >= 1 && await page.locator('a[href="TERMS_AND_CONDITIONS.md"]').count() === 0, 'terms link must point to included HTML page');

  for (const [width, height] of [[1440,1000],[390,844],[320,700]]) {
    await page.setViewportSize({ width, height });
    await page.waitForTimeout(400);
    // Force lazy images to request and wait for each request to settle before taking
    // measurements. This prevents off-screen lazy images being misreported as healthy.
    const imageAudit = await page.evaluate(async () => {
      const imgs = [...document.images];
      imgs.forEach(img => { img.loading = 'eager'; });
      await Promise.all(imgs.map(img => {
        if (img.complete && img.naturalWidth > 0) return Promise.resolve();
        return new Promise(resolve => {
          let settled = false;
          const finish = () => { if (!settled) { settled = true; resolve(); } };
          img.addEventListener('load', finish, { once: true });
          img.addEventListener('error', finish, { once: true });
          setTimeout(finish, 8000);
        });
      }));
      return imgs.map(img => {
        const box = img.closest('.prodImg, .detailImg, [role="img"]');
        const placeholderText = (box?.textContent || '').trim();
        const placeholder = Boolean(box && (box.classList.contains('no-image') ||
          /product image unavailable/i.test(placeholderText) ||
          /product image unavailable/i.test(box.getAttribute('aria-label') || '')));
        let pixelAudit = { readable: false, variance: null, sampledColors: 0, reason: 'no-image' };
        if (img.complete && img.naturalWidth > 0) {
          try {
            const canvas = document.createElement('canvas');
            canvas.width = 32; canvas.height = 32;
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            ctx.drawImage(img, 0, 0, 32, 32);
            const data = ctx.getImageData(0, 0, 32, 32).data;
            const colors = new Set();
            let sum = 0, sumSq = 0, count = 0;
            for (let y = 2; y < 30; y += 3) for (let x = 2; x < 30; x += 3) {
              const k = (y * 32 + x) * 4;
              const lum = 0.2126 * data[k] + 0.7152 * data[k + 1] + 0.0722 * data[k + 2];
              colors.add(data[k] + ',' + data[k + 1] + ',' + data[k + 2]);
              sum += lum; sumSq += lum * lum; count++;
            }
            const mean = sum / count;
            pixelAudit = { readable: true, variance: Math.max(0, sumSq / count - mean * mean), sampledColors: colors.size, reason: 'decoded-pixel-sample' };
          } catch (error) {
            pixelAudit = { readable: false, variance: null, sampledColors: 0, reason: String(error).slice(0, 120) };
          }
        }
        return {
          src: img.currentSrc || img.src,
          complete: img.complete,
          naturalWidth: img.naturalWidth,
          renderedWidth: Math.round(img.getBoundingClientRect().width),
          renderedHeight: Math.round(img.getBoundingClientRect().height),
          pixelAudit,
          placeholder,
          placeholderText: placeholder ? placeholderText.slice(0, 100) : ''
        };
      });
    });
    const metrics = await page.evaluate(() => ({
      viewportWidth: innerWidth,
      documentWidth: document.documentElement.scrollWidth,
      bodyWidth: document.body.scrollWidth,
      pageHeight: document.documentElement.scrollHeight,
      categoryCards: document.querySelectorAll('#categoryGrid .catWrap').length,
      categoryButtons: document.querySelectorAll('#categoryGrid .catBtn').length,
      productCards: document.querySelectorAll('.product').length,
      heroWidth: document.querySelector('.heroCard')?.getBoundingClientRect().width ?? null,
      overflowingElements: [...document.querySelectorAll('body *')].map(el => { const r = el.getBoundingClientRect(); return { tag: el.tagName, id: el.id || '', className: typeof el.className === 'string' ? el.className.slice(0,100) : '', left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width), text: (el.innerText || '').slice(0,50) }; }).filter(el => el.right > innerWidth + 1 || el.left < -1).slice(0,30)
    }));
    metrics.images = imageAudit;
    metrics.width = width;
    metrics.horizontalOverflow = metrics.documentWidth > width || metrics.bodyWidth > width;
    metrics.loadedImages = metrics.images.filter(i => i.naturalWidth > 0).length;
    metrics.placeholderImages = metrics.images.filter(i => i.placeholder).length;
    metrics.failedImages = metrics.images.filter(i => !i.placeholder && i.complete && i.naturalWidth === 0);
    metrics.unsettledImages = metrics.images.filter(i => !i.placeholder && !i.complete);
    metrics.unresolvedImages = metrics.images.filter(i => !i.placeholder && !(i.complete && i.naturalWidth > 0));
    report.viewports.push(metrics);
    check('all_images_loaded_or_placeholder_' + width, metrics.unresolvedImages.length === 0,
      'unresolved=' + metrics.unresolvedImages.length + ', failed=' + metrics.failedImages.length +
      ', unsettled=' + metrics.unsettledImages.length + ', placeholders=' + metrics.placeholderImages.length +
      ', URLs=' + metrics.unresolvedImages.slice(0, 10).map(i => i.src).join(' | '));
    const productImages = metrics.images.filter(i => /product-image\?sku=|\/assets\/products(?:_webp)?\//i.test(i.src));
    const visuallyBlank = productImages.filter(i => !i.placeholder && i.pixelAudit?.readable &&
      (i.pixelAudit.variance < 18 || i.pixelAudit.sampledColors < 8));
    // Supabase Edge Function images may be correctly decoded and visibly rendered but
    // canvas pixel reads are blocked by browser cross-origin rules. Do not label that
    // security boundary as a broken image: require a decoded source and visible box,
    // while retaining the pixel-variation check whenever canvas access is permitted.
    const visibleProductImages = productImages.filter(i => !i.placeholder && i.renderedWidth > 0 && i.renderedHeight > 0);
    // Some product grids are intentionally hidden until the shopper selects a tab/filter.
    // A decoded image in a hidden grid has a zero layout box; that is not a broken image.
    // Still fail if any image source fails to decode, if a partially rendered box exists,
    // or if no actual product image is visibly rendered at this viewport.
    const unusable = productImages.filter(i => !i.placeholder &&
      (!i.complete || i.naturalWidth <= 0 ||
       ((i.renderedWidth > 0 || i.renderedHeight > 0) && (i.renderedWidth <= 0 || i.renderedHeight <= 0))));
    check('product_images_decoded_and_rendered_' + width,
      productImages.length > 0 && visibleProductImages.length > 0 && visuallyBlank.length === 0 && unusable.length === 0,
      'productImages=' + productImages.length + ', visible=' + visibleProductImages.length +
      ', visuallyBlank=' + visuallyBlank.length + ', unusable=' + unusable.length +
      ', canvasBlocked=' + productImages.filter(i => !i.placeholder && !i.pixelAudit?.readable).length +
      ', samples=' + JSON.stringify(productImages.slice(0, 3).map(i => ({src:i.src, naturalWidth:i.naturalWidth, renderedWidth:i.renderedWidth, renderedHeight:i.renderedHeight, pixelAudit:i.pixelAudit}))));
    const mobileNavDisplay = await page.locator('.mobileNav').first().evaluate(el => getComputedStyle(el).display).catch(() => 'missing');
    check('mobile_bottom_nav_visibility_' + width,
      width <= 900 ? mobileNavDisplay !== 'none' : mobileNavDisplay === 'none',
      'display=' + mobileNavDisplay);
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

  const rootCategoryIds = await page.locator('#categoryGrid > .catWrap').evaluateAll(nodes => nodes.map(node => node.getAttribute('data-filter')));
  const expectedRootCategoryIds = [
    '6cc56033-b0a9-4f25-b207-aeeb341a1c47',
    '8e93d917-8fcc-4427-b364-cdad244f263f',
    '5ab55c53-eee3-41ce-ad48-04ad6df85181',
    '87982093-7d81-4f2e-a8e2-e20cdeef30d8',
    '38b382c1-6ee0-4b3c-86ad-399094bc40cc',
    '77297c18-67f6-452e-8918-c55d2ef6231a',
    'af2f8625-4f42-45e6-9f21-d571d7415893',
    '63a71fd9-df45-43f0-b61d-ad622daa9d79'
  ];
  check('exactly_eight_approved_home_roots',
    rootCategoryIds.length === 8 && expectedRootCategoryIds.every(id => rootCategoryIds.includes(id)),
    JSON.stringify(rootCategoryIds));
  check('4x4_is_nested_under_camping_not_a_home_root',
    rootCategoryIds.includes('182423ec-ea46-43e4-bbe3-b8857b5a1583') === false &&
      await page.locator('#categoryGrid > .catWrap[data-filter="af2f8625-4f42-45e6-9f21-d571d7415893"] .children button[data-filter="182423ec-ea46-43e4-bbe3-b8857b5a1583"]').count() === 1,
    '4x4 should appear as a child of Camping, Leisure & Outdoors');
  const finderHeading = (await page.locator('#vehicleFinder h2').innerText()).trim();
  const finderIntro = await page.locator('#vehicleFinder .vehicleIntro').innerText();
  check('vehicle_finder_explicitly_optional',
    finderHeading.startsWith('OPTIONAL:') && /not required to browse or request/i.test(finderIntro) &&
      /car audio/i.test(finderIntro) && /vehicle security/i.test(finderIntro),
    finderHeading + ' | ' + finderIntro);

  const fitmentCategoryResults = await page.evaluate(() => {
      const roots = [
        { label: 'Vehicle Security', id: '8e93d917-8fcc-4427-b364-cdad244f263f', exempt: true },
        { label: 'Car Audio & Entertainment', id: '5ab55c53-eee3-41ce-ad48-04ad6df85181', exempt: true },
        { label: 'Tools, Hardware & Consumables', id: '77297c18-67f6-452e-8918-c55d2ef6231a', exempt: true },
        { label: 'Camping, Leisure & Outdoors', id: 'af2f8625-4f42-45e6-9f21-d571d7415893', exempt: true },
        { label: 'Auto Electrical Spares', id: '6cc56033-b0a9-4f25-b207-aeeb341a1c47', exempt: false }
      ];
      const categories = window.gwCategories || [];
      const products = window.gwProducts || [];
      function rootId(id) {
        const seen = new Set();
        while (id && !seen.has(id)) {
          seen.add(id);
          const c = categories.find(x => x.id === id);
          if (!c || !c.parent_id) return id;
          id = c.parent_id;
        }
        return id;
      }
      return roots.map(root => {
        const product = products.find(p => rootId(p.category_id) === root.id);
        if (!product) return { ...root, available: false };
        window.gwOpenProduct(product);
        const detail = document.querySelector('#detailContent')?.innerText || '';
        return {
          ...root,
          available: true,
          vehicleBlock: /VEHICLE \/ APPLICATION INFORMATION/i.test(detail),
          fitmentAction: /NOT SURE IT FITS\? GET FITMENT ADVICE/i.test(detail)
        };
      });
    });
  await page.locator('#productModal').evaluate(el => el.classList.remove('open'));
  report.fitmentCategoryResults = fitmentCategoryResults;
  const exemptFitmentChecks = (fitmentCategoryResults || []).filter(x => x.exempt);
  const vehicleSpecificChecks = (fitmentCategoryResults || []).filter(x => !x.exempt);
  check('fitment_prompts_removed_for_non_vehicle_categories',
    exemptFitmentChecks.length === 4 && exemptFitmentChecks.every(x => x.available && !x.vehicleBlock && !x.fitmentAction),
    JSON.stringify(exemptFitmentChecks));
  check('fitment_guidance_retained_for_vehicle_spares',
    vehicleSpecificChecks.length === 1 && vehicleSpecificChecks.every(x => x.available && x.vehicleBlock && x.fitmentAction),
    JSON.stringify(vehicleSpecificChecks));

  await page.locator('.cart').click();
  await page.locator('#cartPanel a.checkoutNow').click();
  await page.waitForLoadState('domcontentloaded');
  check('checkout_link_navigates', ['/checkout-v2.html','/checkout-v2'].includes(new URL(page.url()).pathname.replace(/\\/$/, '')), 'landed at ' + page.url());

  const routeResults = [];
  for (const route of ['store.html','product.html','products.html','checkout.html','checkout-v2.html','category.html','returns-refunds.html','terms-and-conditions.html']) {
    const routeResponse = await page.goto(new URL(route, base).toString(), { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(350);
    const routeResult = { route, status: routeResponse?.status() ?? null, title: await page.title() };
    routeResults.push(routeResult);
    check('route_' + route.replace(/[^a-z0-9]+/gi, '_') + '_http_200', routeResult.status === 200 && routeResult.title.length > 0, JSON.stringify(routeResult));
  }
  report.customerRoutes = routeResults;
  // Verify the actual customer entry wrapper, including its iframe-installed exact-SKU local image fallback.
  const wrapperPage = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  wrapperPage.on('console', msg => { if (msg.type() === 'error') report.consoleErrors.push('[store-wrapper] ' + msg.text()); });
  wrapperPage.on('pageerror', error => report.pageErrors.push('[store-wrapper] ' + String(error)));
  const wrapperResponse = await wrapperPage.goto(new URL('store.html', base).toString(), { waitUntil: 'domcontentloaded', timeout: 30000 });
  const wrapperFrame = wrapperPage.frameLocator('#store');
  await wrapperPage.waitForTimeout(4500);
  const wrapperRoots = await wrapperFrame.locator('#categoryGrid > .catWrap').count().catch(() => 0);
  const wrapperFirstProductBox = wrapperFrame.locator('.product .prodImg').first();
  await wrapperFirstProductBox.scrollIntoViewIfNeeded().catch(() => {});
  await wrapperFirstProductBox.locator('img').evaluate(img => { img.loading = 'eager'; }).catch(() => {});
  // Allow the exact-SKU WebP, JPG fallback, and timeout-to-placeholder path to settle.
  await wrapperPage.waitForTimeout(14000);
  const wrapperProductImage = await wrapperFirstProductBox.evaluate(box => {
    const img = box.querySelector('img');
    const text = (box.textContent || '').trim();
    return {
      src: img ? (img.currentSrc || img.src || '') : '',
      complete: img ? img.complete : false,
      naturalWidth: img ? img.naturalWidth : 0,
      alt: img?.alt || '',
      imageHidden: img ? getComputedStyle(img).display === 'none' : true,
      placeholder: box.classList.contains('no-image') &&
        (/product image unavailable/i.test(text) || /product image unavailable/i.test(box.getAttribute('aria-label') || '')),
      placeholderText: text.slice(0, 100),
      sku: box.closest('.product')?.querySelector('.sku')?.textContent?.trim() || ''
    };
  }).catch(error => ({ error: String(error) }));
  report.customerWrapper = { status: wrapperResponse?.status() ?? null, categoryRoots: wrapperRoots, firstProductImage: wrapperProductImage };
  check('customer_wrapper_http_200', report.customerWrapper.status === 200, JSON.stringify({status:report.customerWrapper.status}));
  check('customer_wrapper_category_roots', wrapperRoots === 8, 'found ' + wrapperRoots + ' top-level categories in store.html iframe');
  const exactLocalImageLoaded = Number(wrapperProductImage.naturalWidth || 0) > 0 &&
    /\/assets\/products(?:_webp)?\/GW-[^/?]+\.(?:webp|jpg)(?:$|\?)/i.test(String(wrapperProductImage.src || ''));
  const explicitPlaceholderShown = wrapperProductImage.placeholder === true && wrapperProductImage.imageHidden === true;
  check('customer_wrapper_exact_sku_image_or_explicit_placeholder',
    exactLocalImageLoaded || explicitPlaceholderShown,
    JSON.stringify(wrapperProductImage));
  await wrapperPage.close();

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
