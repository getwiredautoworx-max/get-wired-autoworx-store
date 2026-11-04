import unittest
from scripts.compare_asc_store_readonly import compare_rows


class CompareAscStoreReadOnlyTest(unittest.TestCase):
    def test_exact_sku_discontinued_and_stockout(self):
        store = [
            {"sku": "F1-035", "public_sku": "GW-A", "name": "Fuel pump", "active": True, "stock_quantity": 5, "price": "10.00"},
            {"sku": "TR414C", "public_sku": "GW-B", "name": "Tyre stems", "active": True, "stock_quantity": 5, "price": "20.00"},
            {"sku": "OTHER", "public_sku": "GW-C", "name": "Other", "active": True, "stock_quantity": 1, "price": "5.00"},
        ]
        asc = [
            {"supplier_sku": "F1-035", "title": "FUEL PUMP WILL DISCONTINUE", "stock_status": "IN_STOCK", "stock_quantity": "15", "supplier_status_flags": "WILL_DISCONTINUE", "product_url": "https://example.test/fuel"},
            {"supplier_sku": "TR414C", "title": "TYRE STEMS", "stock_status": "OUT_OF_STOCK", "stock_quantity": "", "supplier_status_flags": "OUT_OF_STOCK", "product_url": "https://example.test/tyre"},
            {"supplier_sku": "SIMILAR", "title": "FUEL PUMP DISCONTINUED", "stock_status": "OUT_OF_STOCK", "stock_quantity": "", "supplier_status_flags": "DISCONTINUED", "product_url": "https://example.test/similar"},
        ]
        out = compare_rows(store, asc)
        self.assertEqual(len(out), 2)
        by_sku = {r["supplier_sku"]: r for r in out}
        self.assertEqual(by_sku["F1-035"]["recommended_action"], "DEACTIVATE_AFTER_REVIEW")
        self.assertEqual(by_sku["TR414C"]["recommended_action"], "REVIEW_TEMPORARY_STOCKOUT")
        self.assertNotIn("SIMILAR", by_sku)

    def test_duplicate_sku_is_manual_review(self):
        store = [{"sku": "DUP", "public_sku": "GW-D", "name": "Duplicate", "active": True, "stock_quantity": 1, "price": "1"}]
        asc = [
            {"supplier_sku": "DUP", "title": "PART DISCONTINUED", "supplier_status_flags": "DISCONTINUED", "stock_status": "IN_STOCK", "stock_quantity": "3", "product_url": "a"},
            {"supplier_sku": "DUP", "title": "PART DISCONTINUED", "supplier_status_flags": "DISCONTINUED", "stock_status": "IN_STOCK", "stock_quantity": "4", "product_url": "b"},
        ]
        out = compare_rows(store, asc)
        self.assertEqual(len(out), 1)
        self.assertEqual(out[0]["recommended_action"], "MANUAL_REVIEW")


if __name__ == "__main__":
    unittest.main()
