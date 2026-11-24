'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs');
const tree=JSON.parse(fs.readFileSync('assets/category-tree.json','utf8'));
const home=fs.readFileSync('index-new.html','utf8');
for(const label of ['Car Audio / Home Entertainment','Auto Electrical Spares','Car Care & Accessories']) assert.ok(home.includes(label)||JSON.stringify(tree).includes(label),label);
for(const [file,key] of [['audio-catalogue-primary-preview.json','records'],['audio-catalogue-secondary-preview.json','records'],['auto-electrical-owner-preview.json','products'],['product-image-treatment-sample.json','records']]) assert.deepEqual(JSON.parse(fs.readFileSync('assets/'+file,'utf8'))[key],[],file);
for(const file of ['owner-preview.html','preview-audio.html','preview-audio-brand.html','preview-audio-products.html','category.html','checkout.html','assets/gw-logo.png']) assert.ok(fs.statSync(file).size>0,file);
console.log('EMPTY_RESTART_STRUCTURE_PASS');
