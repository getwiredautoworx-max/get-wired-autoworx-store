const fs = require('fs');
const path = require('path');

// 1. Ensure target directories exist
const dirs = [
  'docs/knowledge-base',
  'docs/schema',
  'docs/architecture'
];

dirs.forEach(d => {
  const fullPath = path.join(process.cwd(), d);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`Created directory: ${d}`);
  }
});

console.log('Generating complete Priority 1-4 documentation pack for PR #28...');

// ==========================================
// KNOWLEDGE BASE (9 Files)
// ==========================================

fs.writeFileSync('docs/knowledge-base/README.md', `# Get Wired AutoWorx — Support & Knowledge Base Pack

Welcome to the internal and support policy documentation for Get Wired AutoWorx.

## Directory Structure
- \`01-store-identity-and-scope.md\`: Business identity, branding, and core scope.
- \`02-storefront-categories.md\`: Approved 8 top-level storefront categories.
- \`03-checkout-and-delivery.md\`: Delivery rules, local pickup, and checkout policy.
- \`04-returns-and-warranty.md\`: Returns, refunds, electrical installation evidence, and warranty.
- \`05-product-inquiries-and-escalation.md\`: Vehicle fitment inquiries, quote-only products, and escalation paths.
- \`06-faqs-and-safe-response-rules.md\`: Safe support rules, compatibility requirements, and FAQs.
- \`07-privacy-contact-payments.md\`: Payment gateway statuses, privacy, and contact channels.
- \`08-source-of-truth-register.md\`: Status tracking register for all policy claims.
`);

fs.writeFileSync('docs/knowledge-base/01-store-identity-and-scope.md', `# 01. Store Identity & Scope

## Store Branding & Slogan
- **Trading Name:** Get Wired AutoWorx
- **Tagline / Slogan:** "Your 1 Stop Automotive shopping experience."
- **Core Speciality:** Sound & Security • Auto Electrical
- **Live Store Domain:** https://www.getwiredauto.co.za/

## Business Scope
Get Wired AutoWorx supplies automotive electrical components, vehicle security systems, car audio and infotainment hardware, hand and power tools, marine spares, and outdoor/leisure accessories.

## Operating Boundaries & Confidentiality
- Internal supplier costs, margin calculations, private supplier SKUs, and mapping confidences MUST REMAIN strictly confidential and hidden from public storefront views.
`);

fs.writeFileSync('docs/knowledge-base/02-storefront-categories.md', `# 02. Approved Storefront Categories

The Get Wired AutoWorx storefront taxonomy is fixed to **eight top-level categories**. No additional root categories may be added without owner authorization.

## The Eight Approved Root Categories
1. **Auto Electrical Spares**
2. **Vehicle Security**
3. **Car Audio & Entertainment**
4. **Automotive Accessories**
5. **Marine Spares & Accessories**
6. **Tools, Hardware & Consumables**
7. **Camping, Leisure & Outdoors**
8. **Trailer & Canopy**

## Source Taxonomy Preservation
Supplier source categories (e.g., Auto Supplies Catalogue / ASC headings) must be preserved independently in data fields (\`asc_source_category\` / \`asc_source_subcategory\`) and mapped cleanly underneath one of these eight root categories.
`);

fs.writeFileSync('docs/knowledge-base/03-checkout-and-delivery.md', `# 03. Checkout and Delivery Guidelines

## Delivery & Courier Rates
- **Status:** Standard courier delivery fees and timeframes are subject to order verification.
- **Rule:** Do NOT promise fixed courier rates, guaranteed delivery dates, or specific courier partner names unless formally confirmed in writing by store management.

## Local Pickup
- Pickup details are arranged upon checkout confirmation where applicable.

## Stock Guarantees
- Product availability is subject to warehouse stock and supplier verification.
- Out-of-stock or unverified items must be routed to manual inquiry or marked as "Quote Only".
`);

fs.writeFileSync('docs/knowledge-base/04-returns-and-warranty.md', `# 04. Returns, Refunds & Warranty Policy

## Returns Policy Overview
- Products returned for refund or exchange must be in original, unopened packaging, complete with all accessories and proof of purchase.
- **Electrical & Electronic Components Notice:** Electrical items (relays, modules, ignition parts, custom wiring harnesses) are subject to technical inspection. Returns on electrical items damaged due to improper installation or reversed polarity are not permitted.

## Electronic / Electrical Installation Evidence
- Proof of professional installation by a qualified auto electrician or certified installer may be required for warranty claims on complex electronic hardware.

## Policy Flags
- \`[OWNER CONFIRMATION NEEDED]\`: Restocking fee percentages (if applicable).
- \`[OWNER CONFIRMATION NEEDED]\`: Standard return window duration (e.g., 7 days vs 14 days vs 30 days).
`);

fs.writeFileSync('docs/knowledge-base/05-product-inquiries-and-escalation.md', `# 05. Product Inquiries & Support Escalation

## Compatibility Inquiries
When a customer asks if a product fits their vehicle:
1. Require the customer to provide full vehicle details: Make, Model, Year, Engine variant, and OEM part number.
2. **Rule:** NEVER guarantee fitment unless the product catalog explicitly confirms application for that exact vehicle specification.
3. If uncertain, route the inquiry to human support/management for manual verification.

## Quote-Only & Special Orders
- Items marked as "Quote Only" or unpriced catalogue items CANNOT be ordered directly online.
- Escalate all "Quote Only" inquiries to sales support to request an updated supplier cost check before providing a customer quote.
`);

fs.writeFileSync('docs/knowledge-base/06-faqs-and-safe-response-rules.md', `# 06. Agent FAQs & Safe Response Rules

## Safe Response Rules for AI & Support Staff
- **Rule 1 (No Guesses):** Never guess vehicle compatibility or electrical wiring pinouts.
- **Rule 2 (No Unverified Gateways):** Do NOT inform customers that PayFast or PayJustNow are available until explicitly enabled and verified on live checkout.
- **Rule 3 (No Price Promises on Unpriced Items):** Unpriced or zero-cost catalogue items are NOT free. They must be handled via formal quote.
`);

fs.writeFileSync('docs/knowledge-base/07-privacy-contact-payments.md', `# 07. Privacy, Contact & Payment Gateway Register

## Contact Channels
- **Official Store Domain:** https://www.getwiredauto.co.za/

## Payment Method Status
| Gateway / Method | Status | Notes / Instructions |
| :--- | :--- | :--- |
| **Direct EFT (Bank Transfer)** | **CONFIRMED** | Primary verified checkout payment method. |
| **PayFast** | **DEFERRED / UNVERIFIED** | Do NOT market as active until live integration testing completes. |
| **PayJustNow** | **DEFERRED / UNVERIFIED** | Do NOT market as active until live integration testing completes. |
`);

fs.writeFileSync('docs/knowledge-base/08-source-of-truth-register.md', `# 08. Source-of-Truth Policy Register

| Claim / Policy Area | Status | Verified Source / Notes |
| :--- | :--- | :--- |
| Store Branding & Slogan | **CONFIRMED** | Handover brief & official logo branding |
| 8 Root Categories | **CONFIRMED** | Handover brief & architectural decision |
| Customer Pricing Formula | **CONFIRMED** | \`round(supplier_cost_ex_vat * 1.15 * 1.35, 2)\` |
| Direct EFT Payment | **CONFIRMED** | Live store evidence check |
| PayFast / PayJustNow Availability | **UNVERIFIED / DEFERRED** | Deferred until gateway approval & live test pass |
| Delivery / Courier Flat Rates | **UNVERIFIED / DEFERRED** | Rates need formal owner confirmation |
| Standard Return Window | **OWNER CONFIRMATION NEEDED** | Pending formal legal policy confirmation |
`);

// ==========================================
// SCHEMA & VALIDATION PACK (5 Files)
// ==========================================

const jsonSchemaContent = {
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

fs.writeFileSync('docs/schema/catalogue-item.schema.json', JSON.stringify(jsonSchemaContent, null, 2));

fs.writeFileSync('docs/schema/FIELD_DICTIONARY.md', `# Catalogue Field Dictionary & Pricing Rules

## Required Pricing Formula
\`customer_price = round(supplier_cost_ex_vat * 1.15 * 1.35, 2)\`
- **1.15:** 15% VAT addition.
- **1.35:** 35% retail markup.
- **Unpriced / Quote-Only:** Must set \`quote_only: true\`, \`customer_price: null\`, and \`is_active: false\`.
`);

fs.writeFileSync('docs/schema/sample_catalogue_synthetic.csv', `supplier_sku,public_sku,product_name,storefront_category,storefront_subcategory,supplier_cost_ex_vat,supplier_price_effective_date,supplier_confirmation_ref,customer_price,image_permission_status,quote_only,is_active,review_status,review_reason
SYN-AMP-101,GW-SYNAMP01,Synthetic 4-Channel Amplifier 1000W,Car Audio & Entertainment,Amplifiers,1000.00,2026-10-01,CONF-2026-001,1552.50,Granted,false,false,Approved,Synthetic test item approved
SYN-REL-202,GW-SYNREL02,Synthetic 12V 40A Relay 5-Pin,Auto Electrical Spares,Relays & Fuses,25.00,2026-10-01,CONF-2026-001,38.81,Granted,false,false,Approved,Synthetic test item approved
SYN-UNK-999,GW-SYNUNK99,Synthetic Unpriced Special Harness,Auto Electrical Spares,Wiring Harnesses,,,,None,true,false,Hold,Unpriced supplier quote required
`);

fs.writeFileSync('docs/schema/invalid_rows_examples.csv', `supplier_sku,public_sku,product_name,storefront_category,supplier_cost_ex_vat,customer_price,quote_only,is_active,review_status,violation_reason
BAD-001,GW-123,Invalid SKU Length,Auto Electrical Spares,100.00,155.25,false,true,Approved,public_sku does not match GW-XXXXXXXX pattern
BAD-002,GW-BADPRICE,Zero Cost Activated,Vehicle Security,0.00,0.00,false,true,Approved,Cost and price cannot be zero; must be quote_only
`);

// Validator script
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

  if (!publicSku.match(/^GW-[A-Z0-9]{8}$/)) {
    console.error(\`Row \${idx+1}: Public SKU \${publicSku} fails pattern validation.\`);
    errors++;
  }
  if (!quoteOnly && !isNaN(costExVat)) {
    const expected = Math.round(costExVat * 1.15 * 1.35 * 100) / 100;
    if (Math.abs(expected - custPrice) > 0.01) {
      console.error(\`Row \${idx+1}: Pricing formula mismatch! Expected \${expected}, got \${custPrice}\`);
      errors++;
    }
  }
});
if (errors === 0) {
  console.log('✓ All synthetic rows passed validation rules successfully!');
} else {
  console.error(\`✗ Validation failed with \${errors} errors.\`);
  process.exit(1);
}
`);

// Run validator during execution
require('./docs/schema/validate_catalogue.js');

// ==========================================
// ARCHITECTURE & PROPOSED API (2 Files)
// ==========================================

fs.writeFileSync('docs/architecture/REPOSITORY_OVERVIEW.md', `# Repository Architecture & Workflows
- **Storefront:** Next.js / React application.
- **Database & Auth:** Supabase (PostgreSQL, Row Level Security).
- **Deployment Platform:** Webserver / Axxess Hosting.
- **CI/CD:** GitHub Actions (Ephemeral runners).
`);

fs.writeFileSync('docs/architecture/PROPOSED_API_SPEC.openapi.yaml', `openapi: 3.0.3
info:
  title: Get Wired AutoWorx Catalogue API (Proposed)
  version: 1.0.0-proposed
paths:
  /api/v1/products:
    get:
      summary: List active public catalogue products [PROPOSED / NOT IMPLEMENTED]
      responses:
        '200':
          description: List of public products
`);

// ==========================================
// OPERATOR RUNBOOK & README (2 Files)
// ==========================================

fs.writeFileSync('docs/OPERATOR_RUNBOOK.md', `# Get Wired AutoWorx — Operator Runbook
- **Live Store:** https://www.getwiredauto.co.za/
- **Status:** RELEASE HOLD IN FORCE
- **Validation Command:** \`node docs/schema/validate_catalogue.js\`
`);

fs.writeFileSync('README.md', `# Get Wired AutoWorx Storefront
**Official Domain:** [https://www.getwiredauto.co.za/](https://www.getwiredauto.co.za/)  
**Release Status:** **HOLD**
- [Handover Document](HANDOVER_CURRENT.md)
- [Operator Runbook](docs/OPERATOR_RUNBOOK.md)
- [Knowledge Base](docs/knowledge-base/README.md)
- [Catalogue Schema](docs/schema/FIELD_DICTIONARY.md)
`);

console.log('✓ All 18 documentation and schema files written successfully.');
    
