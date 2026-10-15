const fs = require('fs');
const path = require('path');

// Ensure target directories exist
const dirs = [
  'docs/knowledge-base',
  'docs/schema',
  'docs/architecture'
];
dirs.forEach(d => fs.mkdirSync(d, { recursive: true }));

console.log('Generating complete documentation pack for PR #28...');

// ==========================================
// 1. KNOWLEDGE BASE & POLICY PACK
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
1. Require the customer to provide full vehicle details:
   - Make
   - Model
   - Year of manufacture
   - Engine variant / VIN (if applicable)
   - Original Part Number (if replacing OEM)
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

## Common FAQs

**Q: Can I pay via PayFast or Buy Now Pay Later (PayJustNow)?**  
*A:* Currently, checkout confirmation and verified payment options are strictly Direct Bank Transfer (EFT). Additional payment gateways will be announced once fully integrated.

**Q: Will this wiring harness fit my vehicle?**  
*A:* To confirm fitment, please provide your vehicle's make, model, year, and trim level. If direct compatibility is not confirmed in our database, our team will manually check the specification for you.
`);

fs.writeFileSync('docs/knowledge-base/07-privacy-contact-payments.md', `# 07. Privacy, Contact & Payment Gateway Register

## Contact Channels
- **Official Store Domain:** https://www.getwiredauto.co.za/
- Customer inquiries are handled via official store contact channels.

## Payment Method Status
| Gateway / Method | Status | Notes / Instructions |
| :--- | :--- | :--- |
| **Direct EFT (Bank Transfer)** | **CONFIRMED** | Primary verified checkout payment method. |
| **PayFast** | **DEFERRED / UNVERIFIED** | Do NOT market as active until live integration testing completes. |
| **PayJustNow** | **DEFERRED / UNVERIFIED** | Do NOT market as active until live integration testing completes. |

## Privacy & Customer Data
Customer personal information (names, shipping addresses, phone numbers) must be kept confidential and used solely for fulfilling orders.
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
// 2. SCHEMA & VALIDATION PACK
// ==========================================

const jsonSchemaContent = {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://getwiredauto.co.za/schemas/catalogue-item.v1.json",
  "title": "CatalogueItemV1",
  "type": "object",
  "required": [
    "supplier_sku",
    "public_sku",
    "product_name",
    "storefront_category",
    "quote_only",
    "is_active",
    "review_status"
  ],
  "properties": {
    "supplier_sku": {
      "type": "string",
      "description": "Private/internal SKU provided by supplier. Must never be exposed publicly."
    },
    "public_sku": {
      "type": "string",
      "pattern": "^GW-[A-Z0-9]{8}$",
      "description": "Public identifier format GW-XXXXXXXX."
    },
    "product_name": { "type": "string" },
    "product_description": { "type": ["string", "null"] },
    "vehicle_compatibility": { "type": ["string", "null"] },
    "storefront_category": {
      "type": "string",
      "enum": [
        "Auto Electrical Spares",
        "Vehicle Security",
        "Car Audio & Entertainment",
        "Automotive Accessories",
        "Marine Spares & Accessories",
        "Tools, Hardware & Consumables",
        "Camping, Leisure & Outdoors",
        "Trailer & Canopy"
      ]
    },
    "storefront_subcategory": { "type": ["string", "null"] },
    "asc_source_category": { "type": ["string", "null"] },
    "asc_source_subcategory": { "type": ["string", "null"] },
    "asc_guide_page": { "type": ["string", "null"] },
    "supplier_cost_ex_vat": {
      "type": ["number", "null"],
      "minimum": 0.01
    },
    "supplier_price_effective_date": { "type": ["string", "null"], "format": "date" },
    "supplier_price_expiry_date": { "type": ["string", "null"], "format": "date" },
    "supplier_confirmation_ref": { "type": ["string", "null"] },
    "customer_price": {
      "type": ["number", "null"],
      "minimum": 0.01
    },
    "image_path": { "type": ["string", "null"] },
    "image_asset_hash": { "type": ["string", "null"] },
    "image_permission_status": {
      "type": "string",
      "enum": ["Granted", "Pending", "Denied", "None"]
    },
    "quote_only": { "type": "boolean" },
    "is_active": { "type": "boolean" },
    "review_status": {
      "type": "string",
      "enum": ["Approved", "Pending", "Rejected", "Hold"]
    },
    "review_reason": { "type": ["string", "null"] },
    "reviewer": { "type": ["string", "null"] },
    "review_timestamp": { "type": ["string", "null"], "format": "date-time" }
  }
};

fs.writeFileSync('docs/schema/catalogue-item.schema.json', JSON.stringify(jsonSchemaContent, null, 2));

fs.writeFileSync('docs/schema/FIELD_DICTIONARY.md', `# Catalogue Field Dictionary & Pricing Rules

## Required Pricing Formula
\`customer_price\` is a derived field calculated strictly as:
\`\`\`
customer_price = round(supplier_cost_ex_vat * 1.15 * 1.35, 2)
\`\`\`
- **1.15:** 15% South African VAT addition.
- **1.35:** 35% store retail markup.
- **Constraint:** A calculated price does NOT prove supplier cost is current. Cost must be backed by an active supplier confirmation reference and non-expired effective date.

## Private vs. Public SKU Separation
- \`supplier_sku\`: Private internal SKU. NEVER exposed publicly to customers or on the storefront.
- \`public_sku\`: Must follow pattern \`GW-XXXXXXXX\` (e.g., \`GW-SYNAMP01\`).

## Quote-Only & Unpriced Protection
- Products with missing, zero, or unverified supplier cost MUST set \`quote_only: true\`, \`customer_price: null\`, and \`is_active: false\`.
- Never convert missing costs to \`0.00\`.

## Image Permissions & Rights
- \`image_permission_status\` must be \`"Granted"\` before an image is published.
- Having a matching SKU or image file alone does NOT grant image copyright usage permission.
`);

fs.writeFileSync('docs/schema/sample_catalogue_synthetic.csv', `supplier_sku,public_sku,product_name,storefront_category,storefront_subcategory,supplier_cost_ex_vat,supplier_price_effective_date,supplier_confirmation_ref,customer_price,image_permission_status,quote_only,is_active,review_status,review_reason
SYN-AMP-101,GW-SYNAMP01,Synthetic 4-Channel Amplifier 1000W,Car Audio & Entertainment,Amplifiers,1000.00,2026-10-01,CONF-2026-001,1552.50,Granted,false,false,Approved,Synthetic test item approved
SYN-REL-202,GW-SYNREL02,Synthetic 12V 40A Relay 5-Pin,Auto Electrical Spares,Relays & Fuses,25.00,2026-10-01,CONF-2026-001,38.81,Granted,false,false,Approved,Synthetic test item approved
SYN-UNK-999,GW-SYNUNK99,Synthetic Unpriced Special Harness,Auto Electrical Spares,Wiring Harnesses,,,,None,true,false,Hold,Unpriced supplier quote required
`);

fs.writeFileSync('docs/schema/invalid_rows_examples.csv', `supplier_sku,public_sku,product_name,storefront_category,supplier_cost_ex_vat,customer_price,quote_only,is_active,review_status,violation_reason
BAD-001,GW-123,Invalid SKU Length,Auto Electrical Spares,100.00,155.25,false,true,Approved,public_sku does not match GW-XXXXXXXX pattern
BAD-002,GW-BADPRICE,Zero Cost Activated,Vehicle Security,0.00,0.00,false,true,Approved,Cost and price cannot be zero; must be quote_only
BAD-003,GW-WRONGPRC,Mismatched Price Formula,Car Audio & Entertainment,1000.00,1400.00,false,true,Approved,customer_price (1400.00) does not equal round(1000 * 1.15 * 1.35) = 1552.50
BAD-004,GW-BADROOT9,Ninth Storefront Category,Custom Category,50.00,77.63,false,false,Pending,Invalid storefront category not in approved 8 roots
`);

// Validator Script
fs.writeFileSync('docs/schema/validate_catalogue.js', `const fs = require('fs');

console.log('--- Catalogue Schema Validation Run ---');
const schema = JSON.parse(fs.readFileSync('docs/schema/catalogue-item.schema.json', 'utf8'));
console.log('✓ JSON Schema loaded successfully:', schema.title);

const csvContent = fs.readFileSync('docs/schema/sample_catalogue_synthetic.csv', 'utf8');
const lines = csvContent.trim().split('\\n').slice(1);

let errors = 0;
lines.forEach((line, idx) => {
  const fields = line.split(',');
  const supplierSku = fields[0];
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

// Run validator locally during generation
require('./docs/schema/validate_catalogue.js');

// ==========================================
// 3. ARCHITECTURE & PROPOSED API
// ==========================================

fs.writeFileSync('docs/architecture/REPOSITORY_OVERVIEW.md', `# Repository Architecture & Workflows

## Architecture Overview
- **Storefront:** Next.js / React application.
- **Database & Auth:** Supabase (PostgreSQL, Row Level Security).
- **Deployment Platform:** Webserver / Axxess Hosting.
- **CI/CD Orchestration:** GitHub Actions workflows.

## Workflow & Deployment Boundaries
- **Ephemeral Runners:** Workflows in \`.github/workflows/\` execute on ephemeral Ubuntu runners. They are NOT resident daemons.
- **Build Packages vs. Deployment:** GitHub Actions that package build artifacts (zip/tar) generate staging bundles. Creating a GitHub build artifact DOES NOT automatically upload to Axxess hosting or alter production Supabase tables.

## Data Flow
Storefront Category Requests -> Next.js Routing -> Supabase Cached Queries -> Public SKU View (Private SKUs filtered out).
`);

fs.writeFileSync('docs/architecture/PROPOSED_API_SPEC.openapi.yaml', `openapi: 3.0.3
info:
  title: Get Wired AutoWorx Catalogue API (Proposed)
  version: 1.0.0-proposed
  description: >
    PROPOSED SPECIFICATION ONLY. ENDPOINTS ARE NOT IMPLEMENTED IN PRODUCTION.
paths:
  /api/v1/products:
    get:
      summary: List active public catalogue products [PROPOSED / NOT IMPLEMENTED]
      parameters:
        - name: category
          in: query
          required: false
          schema:
            type: string
      responses:
        '200':
          description: List of public products
          content:
            application/json:
              schema:
                type: array
                items:
                  type: object
                  properties:
                    public_sku:
                      type: string
                      example: "GW-SYNAMP01"
                    product_name:
                      type: string
                      example: "Synthetic 4-Channel Amplifier 1000W"
                    customer_price:
                      type: number
                      nullable: true
                      example: 1552.50
                    quote_only:
                      type: boolean
                      example: false
`);

// ==========================================
// 4. OPERATOR RUNBOOK & README
// ==========================================

fs.writeFileSync('docs/OPERATOR_RUNBOOK.md', `# Get Wired AutoWorx — Operator Runbook

## Live Store & Status
- **Live Store URL:** https://www.getwiredauto.co.za/
- **Current Status:** **RELEASE HOLD IN FORCE** (Customer launch hold active pending supplier cost verification and image rights evidence).

## Staging vs Production Boundaries
1. **No Production Writes:** Never run direct SQL modifications on production Supabase without owner review.
2. **Package Uploads:** GitHub Actions build artifacts must be manually inspected before deployment to Axxess hosting.
3. **Rollback Requirement:** Before deploying updates, verify database backups and preserve existing commit SHAs.

## Safe Validation Steps
To run local/staging schema validation:
\`\`\`bash
node docs/schema/validate_catalogue.js
\`\`\`

## Key Escalation Contacts
For unverified pricing, image permission requests, or production gate sign-offs, escalate directly to store ownership.
`);

fs.writeFileSync('README.md', `# Get Wired AutoWorx Storefront

**Official Domain:** [https://www.getwiredauto.co.za/](https://www.getwiredauto.co.za/)  
**Release Status:** **HOLD** (Documentation & Schema Refinement Phase)

## Quick Links & Documentation
- [Handover Document](HANDOVER_CURRENT.md)
- [Operator Runbook](docs/OPERATOR_RUNBOOK.md)
- [Knowledge Base & Policy Pack](docs/knowledge-base/README.md)
- [Catalogue Schema & Field Dictionary](docs/schema/FIELD_DICTIONARY.md)
- [Architecture Overview](docs/architecture/REPOSITORY_OVERVIEW.md)

## Development Safety & Operating Rules
1. **Branch Protection:** Work on feature branches (\`feature/*\`) and submit Pull Requests.
2. **Data Safety:** Never commit API keys, production DB secrets, or private supplier costs.
3. **Pricing Formula:** \`customer_price = round(supplier_cost_ex_vat * 1.15 * 1.35, 2)\`.
`);

console.log('✓ All documentation, schema, and architecture files generated and validated successfully!');
                                   
