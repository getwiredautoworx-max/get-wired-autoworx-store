#!/usr/bin/env python3
"""Fail CI if private supplier identifiers leak into either customer-facing Pages package."""
from pathlib import Path
import os
import re
import runpy
import sys

ROOT = Path(__file__).resolve().parents[1]
PUBLIC_EXT = {'.html', '.js', '.css', '.json'}
PATTERNS = [
    (re.compile(r'\\bp\\.sku\\b|\\bx\\.sku\\b'), 'runtime legacy SKU property'),
    (re.compile(r'select=[^\\n\\r"\\']*\\bsku\\b'), 'REST select of legacy sku'),
    (re.compile(r'\\bsupplier_sku\\b', re.I), 'supplier_sku identifier'),
    (re.compile(r'accessoriesspares\\.co\\.za', re.I), 'supplier website reference'),
]

def audit_package(label: str, include_preview: bool) -> list[str]:
    # Audit exactly what the Pages allowlist would publish, not private repository
    # source/review documents which are intentionally never customer-facing.
    if include_preview:
        os.environ['GW_INCLUDE_PREVIEW_ROUTES'] = '1'
    else:
        os.environ.pop('GW_INCLUDE_PREVIEW_ROUTES', None)
    runpy.run_path(str(ROOT / 'scripts' / 'build-cloudflare-pages-public.py'), run_name='__main__')
    package = ROOT / 'pages-public'
    violations = []
    for path in package.rglob('*'):
        if not path.is_file() or path.suffix.lower() not in PUBLIC_EXT:
            continue
        try:
            source = path.read_text(encoding='utf-8')
        except UnicodeDecodeError:
            continue
        for pattern, description in PATTERNS:
            for match in pattern.finditer(source):
                line = source.count('\\n', 0, match.start()) + 1
                relative = path.relative_to(package).as_posix()
                violations.append(f'{label}/{relative}:{line}: {description}')
    return violations

violations = audit_package('standard', False)
violations.extend(audit_package('preview', True))
os.environ.pop('GW_INCLUDE_PREVIEW_ROUTES', None)

if violations:
    print('PUBLIC SKU EXPOSURE AUDIT: FAILED')
    print('\\n'.join(violations[:100]))
    sys.exit(1)
print('PUBLIC SKU EXPOSURE AUDIT: PASSED')
print('Standard and non-production preview Pages packages contain no private supplier SKU identifiers.')
