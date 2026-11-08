#!/usr/bin/env python3
"""Run the public-safe, review-only ASC catalogue extraction cycle.

This worker is intentionally restricted to the six owner-approved ASC catalogue PDFs.
It refuses to run if additional PDFs (including any Buyers Guide) appear in the folder.
It does not touch supplier pricing workbooks, live data, product listings, or deployments.
"""
from __future__ import annotations
import json
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "suppliers" / "ASC"
OUT = ROOT / "catalogue-review" / "asc-catalogue-extraction"
CHECKPOINT = ROOT / "background-task-checkpoint"
APPROVED = {
    "ASC- Aerials (1).pdf",
    "ASC- Automotive Sensors (1).pdf",
    "ASC- Automotive Switches (1).pdf",
    "ASC- Automotive globes (1).pdf",
    "ASC- Car Mats (1).pdf",
    "ASC- Fuel Pumps (1).pdf",
}

def main() -> int:
    CHECKPOINT.mkdir(parents=True, exist_ok=True)
    found = {p.name for p in SOURCE.glob("*.pdf") if p.is_file()}
    if found != APPROVED:
        missing = sorted(APPROVED - found)
        unexpected = sorted(found - APPROVED)
        report = {
            "generated_at_utc": datetime.now(timezone.utc).isoformat(),
            "status": "blocked_source_inventory_mismatch",
            "expected_catalogues": sorted(APPROVED),
            "found_catalogues": sorted(found),
            "missing": missing,
            "unexpected": unexpected,
            "message": "Fail-closed: no extraction was run because the source folder does not exactly match the six approved ASC catalogues."
        }
        (CHECKPOINT / "public-safe-worker-status.json").write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
        print(json.dumps(report, indent=2))
        return 2

    command = [sys.executable, str(ROOT / "scripts" / "asc_catalogue_extract.py")]
    result = subprocess.run(command, cwd=ROOT, text=True, capture_output=True, check=False)
    (CHECKPOINT / "asc-extraction.stdout.txt").write_text(result.stdout, encoding="utf-8")
    (CHECKPOINT / "asc-extraction.stderr.txt").write_text(result.stderr, encoding="utf-8")

    summary_path = OUT / "asc-extraction-summary.json"
    summary = json.loads(summary_path.read_text(encoding="utf-8")) if summary_path.exists() else []
    extracted_names = {item.get("source_file") for item in summary}
    complete_inventory = extracted_names == APPROVED and len(summary) == len(APPROVED)
    successful = result.returncode == 0 and complete_inventory and all(item.get("extraction_status") == "review-text-extracted" for item in summary)
    report = {
        "generated_at_utc": datetime.now(timezone.utc).isoformat(),
        "status": "success" if successful else "attention_required",
        "mode": "public-safe ASC catalogue OCR; review-only; DO NOT IMPORT",
        "source_files_expected": len(APPROVED),
        "source_files_processed": len(summary),
        "source_inventory_exact": complete_inventory,
        "pages_total": sum(int(item.get("page_count") or 0) for item in summary),
        "pages_with_text": sum(int(item.get("text_pages") or 0) for item in summary),
        "ocr_pages": sum(int(item.get("ocr_pages") or 0) for item in summary),
        "files": summary,
        "script_exit_code": result.returncode,
        "restrictions": [
            "No ASC Buyers Guides are processed.",
            "No supplier price or stock data is inferred.",
            "OCR output is not editorial approval and remains DO NOT IMPORT.",
            "No live catalogue, database, price, stock, production or hosting changes are made."
        ]
    }
    (CHECKPOINT / "public-safe-worker-status.json").write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    lines = [
        "# Public-Safe Catalogue Worker Checkpoint",
        "",
        f"- Generated (UTC): {report['generated_at_utc']}",
        f"- Status: **{report['status']}**",
        "- Scope: six approved ASC catalogues only; review-only OCR; DO NOT IMPORT.",
        f"- PDFs: {report['source_files_processed']}/{report['source_files_expected']}",
        f"- Pages: {report['pages_total']}; text pages: {report['pages_with_text']}; OCR pages: {report['ocr_pages']}",
        "",
        "## Source files",
        ""
    ]
    for item in summary:
        lines.append(f"- {item.get('source_file')}: {item.get('page_count')} pages; {item.get('extraction_status')}")
    lines += [
        "",
        "## Safety boundary",
        "",
        "- This public runner handles only the six approved ASC catalogue PDFs, which contain no supplier price list.",
        "- Audio Connections and Planetworld price/workbook processing is deliberately excluded until a private execution boundary exists.",
        "- OCR is source extraction only; exact product, fitment, specification and image checks remain required.",
        "- No imports, live writes, Axxess uploads, DNS/payment changes or production deployments."
    ]
    (CHECKPOINT / "PUBLIC_SAFE_WORKER_STATUS.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(json.dumps({k: report[k] for k in ("status", "source_files_processed", "pages_total", "pages_with_text", "ocr_pages", "script_exit_code")}, indent=2))
    return 0 if successful else 1

if __name__ == "__main__":
    raise SystemExit(main())
