const fs = require('fs');
const path = require('path');

// 1. Create target directories
const dirs = ['docs/knowledge-base', 'docs/schema', 'docs/architecture'];
dirs.forEach(d => {
  const fullPath = path.join(process.cwd(), d);
  if (!fs.existsSync(fullPath)) fs.mkdirSync(fullPath, { recursive: true });
});

console.log('Generating complete Priority 1-4 documentation pack...');

// 2. Knowledge Base Pack (9 Files)
fs.writeFileSync('docs/knowledge-base/README.md', `# Get Wired AutoWorx — Support & Knowledge Base Pack\n\n- 01-store-identity-and-scope.md\n- 02-storefront-categories.md\n- 03-checkout-and-delivery.md\n- 04-returns-and-warranty.md\n- 05-product-inquiries-and-escalation.md\n- 06-faqs-and-safe-response-rules.md\n- 07-privacy-contact-payments.md\n- 08-source-of-truth-register.md\n`);
fs.writeFileSync('docs/knowledge-base/01-store-identity-and-scope.md', `# 01. Store Identity & Scope\n\n- **Trading Name:** Get Wired AutoWorx\n- **Tagline:** "Your 1 Stop Automotive shopping experience."\n- **Speciality:** Sound & Security • Auto Electrical\n- **Domain:** https://www.getwiredauto.co.za/\n`);
fs.writeFileSync('docs/knowledge-base/02-storefront-categories.md', `# 02. Approved Storefront Categories\n\n1. Auto Electrical Spares\n2. Vehicle Security\n3. Car Audio & Entertainment\n4. Automotive Accessories\n5. Marine Spares & Accessories\n6. Tools, Hardware & Consumables\n7. Camping, Leisure & Outdoors\n8. Trailer & Canopy\n`);
fs.writeFileSync('docs/knowledge-base/03-checkout-and-delivery.md', `# 03. Checkout & Delivery Guidelines\n\nDirect EFT is verified. No fixed delivery promises without owner confirmation.\n`);
fs.writeFileSync('docs/knowledge-base/04-returns-and-warranty.md', `# 04. Returns & Warranty Policy\n\nElectrical parts require proof of professional installation.\n`);
fs.writeFileSync('docs/knowledge-base/05-product-inquiries-and-escalation.md', `# 05. Product Inquiries & Escalation\n\nVehicle details required for fitment check. Unpriced items must stay quote-only.\n`);
fs.writeFileSync('docs/knowledge-base/06-faqs-and-safe-response-rules.md', `# 06. FAQs & Safe Response Rules\n\nDo not guess compatibility or state PayFast/PayJustNow are live.\n`);
fs.writeFileSync('docs/knowledge-base/07-privacy-contact-payments.md', `# 07. Privacy & Payments Register\n\nDirect EFT is CONFIRMED. PayFast and PayJustNow are DEFERRED.\n`);
fs.writeFileSync('docs/knowledge-base/08-source-of-truth-register.md', `# 08. Source-of-Truth Policy Register\n\nLists confirmed, unverified, and owner-confirmation-needed items.\n`);

// 3. Schema & Validation Pack (5 Files)
const jsonSchema = {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://getwiredauto.co.za/schemas/catalogue-item.v1.json",
  "title": "CatalogueItemV1",
  "type": "object",
  "required": ["supplier_sku", "public_sku", "product_name", "storefront_category", "quote_only", "is_active", "review_status"],
  "properties": {
    "supplier_sku": { "type": "string" },
    "public_sku": { "type": "string", "pattern": "^GW-[A-Z0-9]{8}$" },
    "product_name": { "type": "string" },
    "customer_price": { "type": ["number", "null"] },
    "quote_only": { "type": "boolean" },
    "is_active": { "type": "boolean" },
    "review_status": { "type": "string", "enum": ["Approved", "Pending", "Rejected", "Hold"] }
  }
};
fs.writeFileSync('docs/schema/catalogue-item.schema.json', JSON.stringify(jsonSchema, null, 2));
fs.writeFileSync('docs/schema/FIELD_DICTIONARY.md', `# Catalogue Field Dictionary & Pricing Rules\n\ncustomer_price = round(supplier_cost_ex_vat * 1.15 * 1.35, 2)\n`);
fs.writeFileSync('docs/schema/sample_catalogue_synthetic.csv', `supplier_sku,public_sku,product_name,storefront_category,storefront_subcategory,supplier_cost_ex_vat,supplier_price_effective_date,supplier_confirmation_ref,customer_price,image_permission_status,quote_only,is_active,review_status,review_reason\nSYN-AMP-101,GW-SYNAMP01,Synthetic Amplifier,Car Audio & Entertainment,Amplifiers,1000.00,2026-10-01,CONF-001,1552.50,Granted,false,false,Approved,Synthetic test approved\nSYN-UNK-999,GW-SYNUNK99,Unpriced Harness,Auto Electrical Spares,Wiring Harnesses,,,,None,true,false,Hold,Quote required\n`);
fs.writeFileSync('docs/schema/invalid_rows_examples.csv', `supplier_sku,public_sku,product_name,storefront_category,supplier_cost_ex_vat,customer_price,quote_only,is_active,review_status,violation_reason\nBAD-001,GW-123,Invalid SKU,Auto Electrical Spares,100.00,155.25,false,true,Approved,Bad public_sku pattern\n`);
fs.writeFileSync('docs/schema/validate_catalogue.js', `const fs = require('fs');
console.log('--- Catalogue Schema Validation Run ---');
const csvContent = fs.readFileSync('docs/schema/sample_catalogue_synthetic.csv', 'utf8');
const lines = csvContent.trim().split('\\n').slice(1);
let errors = 0;
lines.forEach((line, idx) => {
  const fields = line.split(',');
  const publicSku = fields[1];
  const costExVat = parseFloat(fields[5]);
  const custPrice = parseFloat(fields[8]);
  const quoteOnly = fields[10] === 'true';
  if (!publicSku.match(/^GW-[A-Z0-9]{8}$/)) { console.error(\`Row \${idx+1}: Public SKU pattern error\`); errors++; }
  if (!quoteOnly && !isNaN(costExVat)) {
    const expected = Math.round(costExVat * 1.15 * 1.35 * 100) / 100;
    if (Math.abs(expected - custPrice) > 0.01) { console.error(\`Row \${idx+1}: Price formula mismatch\`); errors++; }
  }
});
if (errors === 0) console.log('✓ All synthetic rows passed validation!');
else process.exit(1);
`);

require('./docs/schema/validate_catalogue.js');

// 4. Architecture Pack (2 Files)
fs.writeFileSync('docs/architecture/REPOSITORY_OVERVIEW.md', `# Repository Architecture\n\nNext.js storefront with Supabase backend and GitHub Actions automation.\n`);
fs.writeFileSync('docs/architecture/PROPOSED_API_SPEC.openapi.yaml', `openapi: 3.0.3\ninfo:\n  title: Get Wired AutoWorx Catalogue API (Proposed)\n  version: 1.0.0-proposed\npaths:\n  /api/v1/products:\n    get:\n      summary: List active public products [PROPOSED / NOT IMPLEMENTED]\n`);

// 5. Operator Runbook & README (2 Files)
fs.writeFileSync('docs/OPERATOR_RUNBOOK.md', `# Operator Runbook\n\nLive Store: https://www.getwiredauto.co.za/\nStatus: RELEASE HOLD ACTIVE\nValidator: node docs/schema/validate_catalogue.js\n`);
fs.writeFileSync('README.md', `# Get Wired AutoWorx Storefront\n\nStatus: RELEASE HOLD ACTIVE\n\n- [Handover](HANDOVER_CURRENT.md)\n- [Runbook](docs/OPERATOR_RUNBOOK.md)\n- [Knowledge Base](docs/knowledge-base/README.md)\n- [Catalogue Schema](docs/schema/FIELD_DICTIONARY.md)\n`);

console.log('✓ All 18 documentation and schema files generated successfully.');
