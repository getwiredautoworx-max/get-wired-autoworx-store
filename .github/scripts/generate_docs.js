const fs = require('fs');
const path = require('path');

// Ensure target directories exist
const dirs = [
  'docs/knowledge-base',
  'docs/schema',
  'docs/architecture'
];
dirs.forEach(d => fs.mkdirSync(d, { recursive: true }));

// 1. Knowledge Base Pack
fs.writeFileSync('docs/knowledge-base/README.md', `# Get Wired AutoWorx - Knowledge Base & Support Policy Pack\n\n- 01-store-identity-and-scope.md\n- 02-storefront-categories.md\n- 03-checkout-and-delivery.md\n- 04-returns-and-warranty.md\n- 05-product-inquiries-and-escalation.md\n- 06-faqs-and-safe-response-rules.md\n- 07-privacy-contact-payments.md\n- 08-source-of-truth-register.md\n`);

fs.writeFileSync('docs/knowledge-base/01-store-identity-and-scope.md', `# 01. Store Identity & Scope\n\n- **Trading Name:** Get Wired AutoWorx\n- **Slogan:** "Your 1 Stop Automotive shopping experience."\n- **Speciality:** Sound & Security • Auto Electrical\n`);

fs.writeFileSync('docs/knowledge-base/02-storefront-categories.md', `# 02. Approved Storefront Categories\n\n1. Auto Electrical Spares\n2. Vehicle Security\n3. Car Audio & Entertainment\n4. Automotive Accessories\n5. Marine Spares & Accessories\n6. Tools, Hardware & Consumables\n7. Camping, Leisure & Outdoors\n8. Trailer & Canopy\n`);

// 2. Schema Pack
fs.writeFileSync('docs/schema/FIELD_DICTIONARY.md', `# Catalogue Field Dictionary & Validation Rules\n\n## Pricing Formula\ncustomer_price = round(supplier_cost_ex_vat * 1.15 * 1.35, 2)\n`);

fs.writeFileSync('docs/schema/sample_catalogue_synthetic.csv', `supplier_sku,public_sku,product_name,storefront_category,supplier_cost_ex_vat,customer_price,quote_only,is_active,review_status\nSYN-AMP-101,GW-SYNAMP01,Synthetic Amplifier,Car Audio & Entertainment,1000.00,1552.50,false,false,Approved\n`);

// 3. Architecture Pack
fs.writeFileSync('docs/architecture/REPOSITORY_OVERVIEW.md', `# Repository Architecture\n\nNext.js Storefront with Supabase backend and GitHub Actions automation.\n`);

// 4. Operator Runbook
fs.writeFileSync('docs/OPERATOR_RUNBOOK.md', `# Operator Runbook\n\n- Store URL: https://www.getwiredauto.co.za/\n- Status: RELEASE HOLD ACTIVE\n`);

console.log('Documentation and catalogue schema files staged successfully.');
  
