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

    def test_root_entry_is_bright_preview_not_legacy_redirect(self):
        source = (ROOT / "index.html").read_text(encoding="utf-8")
        self.assertNotIn("url=store.html", source.lower())
        self.assertNotIn("location.replace('store.html')", source)
        self.assertIn('name="robots" content="noindex,follow"', source)
        self.assertIn("Auto Electrical Spares", source)
        self.assertIn("Trailer &amp; Canopy", source)

    def test_homepage_exposes_exactly_eight_approved_root_categories(self):
        source = (ROOT / "index.html").read_text(encoding="utf-8")
        self.assertEqual(source.count('class="category"'), 8)
        for label in (
            "Auto Electrical Spares",
            "Vehicle Security",
            "Car Audio &amp; Entertainment",
            "Automotive Accessories",
            "Marine Spares &amp; Accessories",
            "Tools, Hardware &amp; Consumables",
            "Camping, Leisure &amp; Outdoors",
            "Trailer &amp; Canopy",
        ):
            self.assertIn(label, source)

if __name__ == "__main__":
    unittest.main()
