#!/usr/bin/env python3
"""Deterministic tests for the Audison official-page candidate selector."""
import csv
import importlib.util
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts" / "extract-audison-official-candidates.py"
SPEC = importlib.util.spec_from_file_location("audison_candidate_extractor", SCRIPT)
MODULE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(MODULE)

class AudisonCandidateExtractorTests(unittest.TestCase):
    def test_actual_register_headers_are_normalized(self):
        row = MODULE.normalize_audit_row({
            "supplier_sku_reference_only": "66755115",
            "source_model_in_description": "AF C4.10 bit",
            "source_description": "Audison - AF C4.10 bit - 4CH AMPLIFIER WITH DSP 4x150W",
            "manufacturer_match_status": "EXACT OFFICIAL INDIVIDUAL PRODUCT PAGE FOUND",
            "official_manufacturer_reference": "https://audison.com/product/af-c4-10-bit/",
        })
        self.assertTrue(MODULE.is_exact_individual_product_page(row))
        self.assertEqual(row["source_model"], "AF C4.10 bit")
        self.assertEqual(row["source_sku"], "66755115")
        self.assertEqual(row["official_product_page_url"], "https://audison.com/product/af-c4-10-bit/")

    def test_model_label_is_parsed_when_audit_column_is_blank(self):
        row = MODULE.normalize_audit_row({
            "supplier_sku_reference_only": "66755156",
            "source_model_in_description": "",
            "source_description": "Audison - F2O - FORZA OPTICAL EXTENSION",
            "manufacturer_match_status": "EXACT OFFICIAL INDIVIDUAL PRODUCT PAGE FOUND",
            "official_manufacturer_reference": "https://audison.com/product/f2o/",
        })
        self.assertEqual(row["source_model"], "F2O")
        self.assertEqual(row["source_model_title_status"], "MATCH")

    def test_source_model_title_disagreement_is_not_selected(self):
        row = MODULE.normalize_audit_row({
            "source_model_in_description": "AV 1.1",
            "source_description": "Audison - AV K6 - KIT 2 WAY AV 1.1+AV 6.5",
            "manufacturer_match_status": "EXACT OFFICIAL INDIVIDUAL PRODUCT PAGE FOUND",
            "official_manufacturer_reference": "https://audison.com/product/av-1-1/",
        })
        self.assertEqual(row["source_model_title_status"], "SOURCE_MODEL_TITLE_DISAGREEMENT")

    def test_existing_candidate_pages_are_excluded_and_remaining_rows_are_bounded(self):
        with MODULE.AUDIT.open(newline="", encoding="utf-8-sig") as handle:
            rows = list(csv.DictReader(handle))
        candidate_urls = MODULE.load_candidate_urls()
        pending, total = MODULE.select_pending_rows(rows, {}, candidate_urls, [], 100)
        self.assertEqual(total, len(pending))
        self.assertTrue(pending)
        self.assertEqual(pending[0]["source_model"], "AF C4.10 bit")
        self.assertTrue(all(MODULE.normalize_url(x["official_product_page_url"]) not in candidate_urls for x in pending))
        self.assertTrue(all(x["source_model_title_status"] != "SOURCE_MODEL_TITLE_DISAGREEMENT" for x in pending))

if __name__ == "__main__":
    unittest.main()
