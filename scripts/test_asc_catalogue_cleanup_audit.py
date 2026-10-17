import csv
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

SCRIPT = Path(__file__).with_name("asc_catalogue_cleanup_audit.py")


class CatalogueAuditTest(unittest.TestCase):
    def test_exact_sku_flags_discontinued_and_oos_but_not_fuzzy_matches(self):
        with tempfile.TemporaryDirectory() as td:
            root = Path(td)
            store = root / "store.csv"
            asc = root / "asc.csv"
            out = root / "patch.csv"
            store.write_text(
                "supplier_sku,public_sku,name,active,stock_quantity\n"
                "F1-007,GW-00000001,Fuel pump,true,3\n"
                "T3-8CS,GW-00000002,Spanner set,true,2\n"
                "NO-MATCH,GW-00000003,Other item,true,4\n",
                encoding="utf-8",
            )
            asc.write_text(
                "SKU,Name,Stock status,Stock\n"
                "F1-007,FUEL PUMP NOT VIABLE DISCONTINUED,In stock,5\n"
                "T3-8CS,SPANNER SET,Out of stock,0\n"
                "SIMILAR,FUEL PUMP DISCONTINUED,Out of stock,0\n",
                encoding="utf-8",
            )
            result = subprocess.run(
                [sys.executable, str(SCRIPT), "--store", str(store), "--asc", str(asc), "--output", str(out)],
                text=True, capture_output=True, check=True,
            )
            with out.open(newline="", encoding="utf-8") as handle:
                rows = list(csv.DictReader(handle))
            self.assertEqual(len(rows), 2)
            self.assertEqual(rows[0]["recommended_action"], "DEACTIVATE_AFTER_REVIEW")
            self.assertEqual(rows[1]["recommended_action"], "REVIEW_TEMPORARY_STOCKOUT")
            self.assertIn("Exact SKU matches: 2", result.stdout)
            self.assertIn("no database connection or writes", result.stdout.lower())


if __name__ == "__main__":
    unittest.main()
