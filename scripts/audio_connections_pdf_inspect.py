#!/usr/bin/env python3
"""Read-only text extraction diagnostics for the two Audio Connections PDFs."""
from pathlib import Path
import subprocess

ROOT = Path("suppliers/Audio Connections")
FILES = [
    "STARSOUND Price Lists 05 AUGUST 2026.pdf",
    "Sony Mobile ES Dealer Price List Sept 26.pdf",
]
for name in FILES:
    path = ROOT / name
    print(f"=== PDF_SOURCE_BEGIN: {name} ===")
    if not path.exists():
        print("SOURCE_MISSING")
        continue
    info = subprocess.run(["pdfinfo", str(path)], text=True, capture_output=True, check=False)
    for line in info.stdout.splitlines():
        if line.startswith(("Pages:", "Page size:", "File size:", "PDF version:")):
            print(line)
    extracted = subprocess.run(["pdftotext", "-layout", str(path), "-"], text=True, capture_output=True, check=False)
    if extracted.returncode:
        print("PDFTOTEXT_ERROR:", extracted.stderr[:500])
        continue
    lines = extracted.stdout.splitlines()
    nonblank = [line for line in lines if line.strip()]
    print(f"EXTRACTED_LINES={len(lines)} NONBLANK_LINES={len(nonblank)}")
    # Emit only a bounded opening sample for schema/layout inspection.
    for line in nonblank[:140]:
        print(line[:300])
    print(f"=== PDF_SOURCE_END: {name} ===")
