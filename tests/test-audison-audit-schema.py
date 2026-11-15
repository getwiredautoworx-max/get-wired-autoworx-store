#!/usr/bin/env python3
"""Regression tests for the current Audison audit-register schema adapter."""
import csv
import importlib.util
from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location("audison_extractor", ROOT / "scripts/extract-audison-official-candidates.py")
MODULE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(MODULE)

class AudisonAuditSchemaTests(unittest.TestCase):
    def test_current_register_yields_individual_exact_product_pages(self):
        path = ROOT / "catalogue-review/planetworld-audison-official-model-audit.csv"
        with path.open(newline="", encoding="utf-8-sig") as handle:
            rows = list(csv.DictReader(handle))
        normalized = [MODULE.normalize_audit_row(row) for row in rows]
        candidates = [row for row in normalized if row]
        self.assertGreater(len(candidates), 0, "current register must not silently yield an empty extraction batch")
        self.assertTrue(all(row["official_product_page_url"].startswith("https://") for row in candidates))
        self.assertTrue(all(row["brand"] == "Audison" for row in candidates))
        self.assertTrue(all(row["source_sku"] for row in candidates))

    def test_collection_only_rows_are_held(self):
        row = {
            "supplier_sku_reference_only": "66700860",
            "source_model_in_description": "AVCX 3P",
            "source_description": "Audison - AVCX 3P - SET XOVER",
            "manufacturer_match_status": "EXACT MODEL LABEL IN OFFICIAL AUDISON COLLECTION; DETAIL PAGE NOT INDIVIDUALLY VERIFIED",
            "official_manufacturer_reference": "https://audison.com/collections/car-speakers-voce-ii/",
        }
        self.assertIsNone(MODULE.normalize_audit_row(row))

    def test_individual_page_row_maps_source_model_and_private_sku(self):
        row = {
            "supplier_sku_reference_only": "66750650",
            "source_model_in_description": "bit DMI",
            "source_description": "Audison - bit DMI - Digital MOST Interface",
            "manufacturer_match_status": "EXACT OFFICIAL INDIVIDUAL PRODUCT PAGE FOUND",
            "official_manufacturer_reference": "https://audison.com/product/bit-dmi/",
        }
        result = MODULE.normalize_audit_row(row)
        self.assertEqual(result["source_model"], "bit DMI")
        self.assertEqual(result["official_product_page_url"], "https://audison.com/product/bit-dmi/")
        self.assertEqual(result["source_sku"], "66750650")

if __name__ == "__main__":
    unittest.main()
