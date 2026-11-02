from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]

class PreviewCatalogueGateTests(unittest.TestCase):
    def test_listing_fails_closed_before_any_product_query(self):
        source = (ROOT / "preview-products.html").read_text(encoding="utf-8")
        start = source.index("async function main(){")
        end = source.index("\ndocument.getElementById('filter')", start)
        main = source[start:end]
        guard = main.index("Fail closed: legacy active Supabase rows")
        stop = main.index("return;", guard)
        first_product_query = main.find("apiAll('products?")
        self.assertGreaterEqual(first_product_query, 0)
        self.assertLess(stop, first_product_query)
        self.assertIn("Unverified legacy stock is hidden", source)

    def test_product_detail_fails_closed_before_product_lookup(self):
        source = (ROOT / "preview-product.html").read_text(encoding="utf-8")
        start = source.index("async function main(){")
        end = source.index("main();", start)
        main = source[start:end]
        guard = main.index("not yet been verified")
        stop = main.index("return;", guard)
        lookup = main.find("api('products?")
        self.assertGreaterEqual(lookup, 0)
        self.assertLess(stop, lookup)
        self.assertIn("Unverified legacy stock is hidden", source)

if __name__ == "__main__":
    unittest.main()
