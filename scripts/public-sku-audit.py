#!/usr/bin/env python3
"""Fail CI if supplier SKU identifiers leak into customer-facing storefront source."""
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
PUBLIC_EXT = {'.html', '.js', '.css', '.json'}
EXCLUDE = {
    'HANDOVER.md',
    'scripts/public-sku-audit.py',
    'android-owner-app/app/src/main/assets/admin_app.html',
}
# This repository also contains generators, documentation, fixtures, and audits.
# Those internal files must not be mistaken for customer-facing runtime source.
EXCLUDE_PREFIXES = (
    '.github/',
    'docs/',
    'scripts/',
    'staging/',
    'tests/',
    'monitor-evidence/',
    'node_modules/',
)
PATTERNS = [
    (re.compile(r'\bp\.sku\b|\bx\.sku\b'), 'runtime legacy SKU property'),
    (re.compile(r'select=[^\n\r"\']*\bsku\b'), 'REST select of legacy sku'),
    (re.compile(r'\bsupplier_sku\b', re.I), 'supplier_sku identifier'),
    (re.compile(r'accessoriesspares\.co\.za', re.I), 'supplier website reference'),
]
violations = []
scanned = 0
for p in ROOT.rglob('*'):
    if not p.is_file() or p.suffix.lower() not in PUBLIC_EXT:
        continue
    rel = p.relative_to(ROOT).as_posix()
    if rel in EXCLUDE or rel.startswith(EXCLUDE_PREFIXES):
        continue
    try:
        source = p.read_text(encoding='utf-8')
    except (UnicodeDecodeError, OSError):
        continue
    scanned += 1
    for rx, label in PATTERNS:
        for match in rx.finditer(source):
            line = source.count('\n', 0, match.start()) + 1
            violations.append(f'{rel}:{line}: {label}')
if violations:
    print('PUBLIC SKU EXPOSURE AUDIT: FAILED')
    print('\n'.join(violations[:100]))
    sys.exit(1)
print('PUBLIC SKU EXPOSURE AUDIT: PASSED')
print(f'Scanned {scanned} customer-facing source files; internal documentation, generators, fixtures, and audit scripts were excluded.')
print('Customer-facing source must use public_sku only; supplier mapping remains internal.')
