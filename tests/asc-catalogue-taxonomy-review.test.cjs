const fs=require('node:fs');
const assert=require('node:assert/strict');
const taxonomy=JSON.parse(fs.readFileSync('catalogue-review/asc-catalogue-extraction/asc-catalogue-taxonomy-review-only.json','utf8'));
assert.equal(taxonomy.source_catalogues.length,6);assert.equal(taxonomy.source_page_total,72);assert.equal(taxonomy.source_heading_total,75);
const sections=taxonomy.groups.flatMap(g=>g.sections);const headings=sections.filter(s=>s.id!=='asc-fuel-pumps');assert.equal(headings.length,75);assert.equal(sections.length,76,'75 source headings plus the preview-only Fuel Pumps parent');assert.equal(new Set(sections.map(s=>s.id)).size,76,'taxonomy IDs must be unique');
assert.ok(taxonomy.groups.some(g=>g.store_parent_id==='asc-fuel-pumps'&&g.sections.some(s=>s.name==='Diesel Lift Pumps & Housings — All Makes')));
assert.ok(taxonomy.groups.some(g=>g.store_root_category==='Automotive Accessories'&&g.sections.some(s=>s.name==='Carpet Mat Sets — Toyota')));
assert.ok(taxonomy.groups.some(g=>g.store_root_category==='Car Audio & Entertainment'&&g.sections.some(s=>s.name==='Vehicle-Specific Aerials')));
for(const g of taxonomy.groups)for(const s of g.sections){assert.ok(s.id&&s.name);assert.ok(Array.isArray(s.query_hints));}
console.log('ASC_TAXONOMY_REVIEW_PASS: 6 source families, 72 pages, 75 source sections; unique IDs and approved root mappings.');
