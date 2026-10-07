#!/usr/bin/env python3
"""Fail CI if supplier SKU identifiers leak into customer-facing storefront source."""
from pathlib import Path
import re, sys
ROOT = Path(__file__).resolve().parents[1]
PUBLIC_EXT = {'.html', '.js', '.css', '.json'}
EXCLUDE = {'.github/workflows/asc-sku-image-sync.yml', 'HANDOVER.md', 'scripts/public-sku-audit.py', 'android-owner-app/app/src/main/assets/admin_app.html'}
PATTERNS = [
 (re.compile(r'\bp\.sku\b|\bx\.sku\b'), 'runtime legacy SKU property'),
 (re.compile(r'select=[^\n\r"\']*\bsku\b'), 'REST select of legacy sku'),
 (re.compile(r'\bsupplier_sku\b', re.I), 'supplier_sku identifier'),
 (re.compile(r'accessoriesspares\.co\.za', re.I), 'supplier website reference'),
]
violations = []
for p in ROOT.rglob("*"):
 if not p.is_file() or p.suffix.lower() not in PUBLIC_EXT: continue
 rel = p.relative_to(ROOT).as_posix()
 if rel in EXCLUDE or rel.startswith('node_modules/'): continue
 try: text = p.read_text(encoding="utf-8")
 except UnicodeDecodeError: continue
 for rx, label in PATTERNS:
  for m in rx.finditer(text):
   line = text.count("\n", 0, m.start()) + 1
   violations.append(f"{rel}:{line}: {label}")
if violations:
 print("PUBLIC SKU EXPOSURE AUDIT: FAILED")
 print("\n".join(violations[:100]))
 sys.exit(1)
print("PUBLIC SKU EXPOSURE AUDIT: PASSED")
print("Customer-facing source uses public_sku only; internal supplier mapping remains excluded.")
