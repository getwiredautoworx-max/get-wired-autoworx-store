const assert = require('node:assert/strict');
const fs = require('node:fs');
const html = fs.readFileSync('index-new.html', 'utf8');
const category = fs.readFileSync('category.html', 'utf8');
const sections = [...html.matchAll(/<section class="group">[\\s\\S]*?<\\/section>/g)].map(x => x[0]);
const labels = sections.map(section => {
  const m = section.match(/<button class="category"[^>]*>(.*?)<span class="symbol">/s);
  return m ? m[1].replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim() : '';
});
assert.deepEqual(labels, ['Auto Electrical Spares', 'Car Audio / Home Entertainment', 'Car Care & Accessories']);
assert.match(category, /const ROOTS=\\[\\['Auto Electrical Spares'/);
assert.match(category, /\\['Car Audio \/ Home Entertainment'/);
assert.match(category, /\\['Car Care & Accessories'/);
console.log('THREE_DEPARTMENT_ROOTS_OK:', labels.join(' | '));
