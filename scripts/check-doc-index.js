const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const indexPath = path.join(root, 'docs/knowledge-base/README.md');
const index = fs.readFileSync(indexPath, 'utf8');
const required = [
  '01-store-identity-and-scope.md',
  '02-storefront-categories.md',
  '03-checkout-and-delivery.md',
  '04-returns-and-warranty.md',
  '05-product-inquiries-and-escalation.md',
  '06-faqs-and-safe-response-rules.md',
  '07-privacy-contact-payments.md',
  '08-source-of-truth-register.md'
];
const listed = [...index.matchAll(/(?:^|[\s(])([0-9]{2}-[a-z0-9-]+\.md)(?:[)\s]|$)/gm)].map(m => m[1]);
const missingFromIndex = required.filter(file => !listed.includes(file));
const missingOnDisk = required.filter(file => !fs.existsSync(path.join(path.dirname(indexPath), file)));
const unexpected = listed.filter(file => !required.includes(file));
if (missingFromIndex.length || missingOnDisk.length || unexpected.length) {
  console.error('KNOWLEDGE-BASE INDEX CHECK: FAILED');
  if (missingFromIndex.length) console.error('Missing from README: ' + missingFromIndex.join(', '));
  if (missingOnDisk.length) console.error('Missing files: ' + missingOnDisk.join(', '));
  if (unexpected.length) console.error('Unexpected indexed files: ' + unexpected.join(', '));
  process.exit(1);
}
console.log('KNOWLEDGE-BASE INDEX CHECK: PASSED (' + required.length + ' indexed files exist).');
