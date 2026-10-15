const fs = require('node:fs');
const path = require('node:path');
const Ajv2020 = require('ajv/dist/2020');
const addFormats = require('ajv-formats');
const { parseCsv } = require('./validate_catalogue');

const schema = JSON.parse(fs.readFileSync(path.join(__dirname, 'catalogue-item.schema.json'), 'utf8'));
const rows = parseCsv(fs.readFileSync(path.join(__dirname, 'sample_catalogue_synthetic.csv'), 'utf8'));
if (rows.length < 2) throw new Error('Expected a header and at least one synthetic row');
const [headers, ...cells] = rows;
if (new Set(headers).size !== headers.length) throw new Error('Synthetic fixture has duplicate headers');
const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);
const validateSchema = ajv.compile(schema);
const toValue = (key, value) => {
  if (['quote_only', 'is_active'].includes(key)) return value === 'true';
  if (['supplier_cost_ex_vat', 'customer_price'].includes(key)) return value === '' ? null : Number(value);
  if (['supplier_price_effective_date', 'supplier_confirmation_ref', 'image_evidence_ref', 'vehicle_application', 'subcategory', 'review_reason'].includes(key) && value === '') return null;
  return value;
};
let failures = 0;
for (let i = 0; i < cells.length; i++) {
  const row = Object.fromEntries(headers.map((key, j) => [key, toValue(key, cells[i][j])]));
  if (!validateSchema(row)) {
    failures++;
    console.error('JSON Schema rejected sample row ' + (i + 2) + ':');
    for (const error of validateSchema.errors || []) console.error(' - ' + error.instancePath + ' ' + error.message);
  }
}
if (failures) process.exit(1);
console.log('PASS: ' + cells.length + ' synthetic sample row(s) validated against JSON Schema draft 2020-12.');
console.log('NOTE: schema validity is not supplier evidence or authorization to publish real products.');
