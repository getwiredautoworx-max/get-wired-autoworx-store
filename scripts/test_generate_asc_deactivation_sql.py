import csv
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

SCRIPT = Path(__file__).with_name("generate_asc_deactivation_sql.py")


class DeactivationSqlGeneratorTest(unittest.TestCase):
    def test_only_active_discontinued_rows_are_emitted(self):
        with tempfile.TemporaryDirectory() as td:
            root = Path(td)
            source = root / "review.csv"
            output = root / "patch.sql"
            fields = ["supplier_sku", "public_sku", "store_name", "store_active", "asc_listing_title", "asc_listing_url", "recommended_action"]
            with source.open("w", newline="", encoding="utf-8") as f:
                writer = csv.DictWriter(f, fieldnames=fields)
                writer.writeheader()
                writer.writerow({"supplier_sku":"F1-035","public_sku":"GW-1","store_name":"Fuel pump","store_active":"true","asc_listing_title":"WILL DISCONTINUE","asc_listing_url":"https://example.test/item","recommended_action":"DEACTIVATE_AFTER_REVIEW"})
                writer.writerow({"supplier_sku":"TR414C","public_sku":"GW-2","store_name":"Tyre stems","store_active":"true","asc_listing_title":"Out of stock","asc_listing_url":"https://example.test/tyre","recommended_action":"REVIEW_TEMPORARY_STOCKOUT"})
                writer.writerow({"supplier_sku":"OLD","public_sku":"GW-3","store_name":"Old item","store_active":"false","asc_listing_title":"DISCONTINUED","asc_listing_url":"https://example.test/old","recommended_action":"DEACTIVATE_AFTER_REVIEW"})
            result = subprocess.run([sys.executable, str(SCRIPT), "--review-csv", str(source), "--output", str(output)], check=True, text=True, capture_output=True)
            sql = output.read_text(encoding="utf-8")
            self.assertIn("WHERE sku = 'F1-035' AND active = true", sql)
            self.assertNotIn("TR414C", sql)
            self.assertNotIn("WHERE sku = 'OLD'", sql)
            self.assertIn("Proposed deactivations: 1", result.stdout)
            self.assertIn("no database connection or writes", result.stdout.lower())


if __name__ == "__main__":
    unittest.main()
