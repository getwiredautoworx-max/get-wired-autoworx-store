import csv
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

SCRIPT = Path(__file__).with_name("asc_catalogue_cleanup_audit.py")


class CatalogueAuditTest(unittest.TestCase):
    def test_exact_sku_flags_discontinued_oos_and_duplicate_skus(self):
        with tempfile.TemporaryDirectory() as td:
            root = Path(td)
            store = root / "store.csv"
            asc = root / "asc.csv"
            out = root / "patch.csv"
            store.write_text(
                "supplier_sku,public_sku,name,active,stock_quantity\n"
                "F1-007,GW-00000001,Fuel pump,true,3\n"
                "F1-035,GW-00000005,Fuel pump future stop,true,5\n"
                "T3-8CS,GW-00000002,Spanner set,true,2\n"
                "NO-MATCH,GW-00000003,Other item,true,4\n"
                "DUP-1,GW-00000004,Duplicate item,true,1\n",
                encoding="utf-8",
            )
            asc.write_text(
                "SKU,Name,Stock status,Stock\n"
                "F1-007,FUEL PUMP NOT VIABLE DISCONTINUED,In stock,5\n"
                "F1-035,FUEL PUMP WILL DISCONTINUE,In stock,15\n"
                "T3-8CS,SPANNER SET,Out of stock,0\n"
                "SIMILAR,FUEL PUMP DISCONTINUED,Out of stock,0\n"
                "DUP-1,First duplicate,In stock,3\n"
                "DUP-1,Second duplicate,In stock,4\n",
                encoding="utf-8",
            )
            result = subprocess.run(
                [sys.executable, str(SCRIPT), "--store", str(store), "--asc", str(asc), "--output", str(out)],
                text=True, capture_output=True, check=True,
            )
            with out.open(newline="", encoding="utf-8") as handle:
                rows = list(csv.DictReader(handle))
            self.assertEqual(len(rows), 4)
            self.assertEqual(rows[0]["recommended_action"], "DEACTIVATE_AFTER_REVIEW")
            self.assertEqual(rows[1]["recommended_action"], "INVENTORY_HOLD_PENDING_CONFIRMATION")
            self.assertEqual(rows[2]["recommended_action"], "REVIEW_TEMPORARY_STOCKOUT")
            self.assertEqual(rows[3]["recommended_action"], "MANUAL_REVIEW")
            self.assertEqual(rows[3]["supplier_status"], "AMBIGUOUS_DUPLICATE_SUPPLIER_SKU")
            self.assertIn("Exact SKU matches: 3", result.stdout)
            self.assertIn("Ambiguous duplicate-SKU matches held for review: 1", result.stdout)
            self.assertIn("no database connection or writes", result.stdout.lower())


if __name__ == "__main__":
    unittest.main()
