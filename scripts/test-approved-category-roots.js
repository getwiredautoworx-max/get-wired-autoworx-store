const assert = require('node:assert/strict');
const fs = require('node:fs');

const homepage = fs.readFileSync('index-new.html', 'utf8');
const categoryPage = fs.readFileSync('category.html', 'utf8');
const nav = fs.readFileSync('category-navigation.js', 'utf8');
const tree = JSON.parse(fs.readFileSync('assets/category-tree.json', 'utf8'));
const approved = [
  'Auto Electrical Spares',
  'Vehicle Security',
  'Car Audio & Entertainment',
  'Automotive Accessories',
  'Marine Spares & Accessories',
  'Tools, Hardware & Consumables',
  'Camping, Leisure & Outdoors',
  'Trailer & Canopy'
];
const approvedIds = [
  '6cc56033-b0a9-4f25-b207-aeeb341a1c47',
  '8e93d917-8fcc-4427-b364-cdad244f263f',
  '5ab55c53-eee3-41ce-ad48-04ad6df85181',
  '87982093-7d81-4f2e-a8e2-e20cdeef30d8',
  '38b382c1-6ee0-4b3c-86ad-399094bc40cc',
  '77297c18-67f6-452e-8918-c55d2ef6231a',
  'af2f8625-4f42-45e6-9f21-d571d7415893',
  '63a71fd9-df45-43f0-b61d-ad622daa9d79'
];
const idsMatch = homepage.match(/const HOME_CATEGORY_IDS=\[([^\]]+)\];/);
assert(idsMatch, 'homepage root ID list must exist');
const homepageIds = [...idsMatch[1].matchAll(/'([^']+)'/g)].map(m => m[1]);
assert.equal(homepageIds.length, 8, 'homepage must declare exactly eight approved root IDs');
assert.equal(new Set(homepageIds).size, 8, 'homepage root IDs must be unique');
assert.deepEqual(homepageIds, approvedIds, 'homepage root IDs must match approved order');
assert(homepage.includes("'182423ec-ea46-43e4-bbe3-b8857b5a1583':'4x4 Outdoor'"), '4x4 label must remain available for nested category display');
assert(!homepageIds.includes('182423ec-ea46-43e4-bbe3-b8857b5a1583'), '4x4 must not be a ninth root');
const rootMatch = categoryPage.match(/const ROOTS=\[([\s\S]*?)\];/);
assert(rootMatch, 'category page ROOTS list must exist');
const pairs = [...rootMatch[1].matchAll(/\['([^']+)','([^']+)'\]/g)].map(m => ({ label: m[1], id: m[2] }));
assert.equal(pairs.length, 8, 'category landing page must expose exactly eight roots');
assert.deepEqual(pairs.map(x => x.label), approved, 'category landing labels must match approved labels');
assert.deepEqual(pairs.map(x => x.id), approvedIds, 'category landing IDs must match approved IDs');
assert(!categoryPage.includes("['Spare Parts','68e6ada2-ddf8-4327-844f-771d92db54bd']"), 'generic Spare Parts must not be a customer-facing root');
const fourByFour = tree.categories.find(c => c.id === '182423ec-ea46-43e4-bbe3-b8857b5a1583');
assert(fourByFour, '4x4 category ID must be preserved in the category snapshot');
assert.equal(fourByFour.parent_id, 'af2f8625-4f42-45e6-9f21-d571d7415893', '4x4 must remain nested under Camping / Leisure / Outdoors');
assert(Number(fourByFour.direct_active_products) > 0, '4x4 nested category must retain its active product assignments');
assert(nav.includes("'4X4 OUTDOOR':'4x4-outdoor'"), '4x4 navigation alias must remain available');
console.log('PASS: exactly eight approved roots on homepage and category landing page; no duplicate root; generic Spare Parts is hidden only from root selector; 4x4 remains nested with its category ID and product assignments.');
