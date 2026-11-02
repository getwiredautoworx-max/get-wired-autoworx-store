const fs = require('node:fs');
const assert = require('node:assert/strict');

const file = 'catalogue-review/asc-catalogue-extraction/asc-catalogue-taxonomy-review-only.json';
const taxonomy = JSON.parse(fs.readFileSync(file, 'utf8'));
assert.equal(taxonomy.source_catalogues.length, 6, 'only six post-reset ASC PDFs are in scope');
assert.equal(taxonomy.source_page_total, 72);
assert.equal(taxonomy.source_heading_total, 75);

const sections = taxonomy.groups.flatMap(group => group.sections);
const sourceHeadings = sections.filter(section => section.id !== 'asc-fuel-pumps');
assert.equal(sourceHeadings.length, 75, 'preserve all 75 source contents headings');
assert.equal(sections.length, 76, 'one additional virtual Fuel Pumps parent is navigation-only');
assert.equal(new Set(sections.map(section => section.id)).size, 76, 'taxonomy IDs must be unique');

const required = [
  ['Car Audio & Entertainment', 'Vehicle-Specific Aerials'],
  ['Auto Electrical Spares', 'Crankshaft & Camshaft Position Sensors'],
  ['Auto Electrical Spares', 'Ignition Switches & Barrel Sets'],
  ['Auto Electrical Spares', 'HID Globes, Kits & Ballasts'],
  ['Automotive Accessories', 'Carpet Mat Sets — Toyota'],
  ['Auto Electrical Spares', 'Diesel Lift Pumps & Housings — All Makes']
];
for (const [root, name] of required) {
  assert.ok(sections.some(section => section.name === name &&
    taxonomy.groups.some(group => group.store_root_category === root && group.sections.includes(section))),
    `missing or mis-mapped source heading: ${root} / ${name}`);
}
for (const group of taxonomy.groups) {
  assert.ok(group.store_root_category, 'every taxonomy group needs an approved store root');
  for (const section of group.sections) {
    assert.ok(section.id && section.name, 'every section needs a stable ID and source label');
    assert.ok(Array.isArray(section.query_hints), 'query hints must remain an array');
  }
}
assert.ok(taxonomy.notes.some(note => note.includes('No supplier price, stock')));
console.log('ASC_TAXONOMY_RECONSTRUCTION_PASS: 6 PDFs, 72 pages, 75 source headings, 76 unique preview taxonomy IDs.');
