import unittest
from scripts.crawl_asc_catalogue import parse_products


class AscCrawlerParserTest(unittest.TestCase):
    def test_extracts_exact_sku_stock_and_discontinued_flags(self):
        html = """
        <p class="woocommerce-result-count">Showing 1–2 of 12002 results</p>
        <ul class="products">
          <li class="product">
            <a class="woocommerce-LoopProduct-link" href="/product/fuel-pump/">
              <h2 class="woocommerce-loop-product__title">FUEL PUMP WILL DISCONTINUE NOT VIABLE</h2>
            </a>
            <span>SKU: F1-035</span><span>15 in stock</span>
          </li>
          <li class="product">
            <a class="woocommerce-LoopProduct-link" href="/product/stockout/">
              <h2 class="woocommerce-loop-product__title">OUT OF STOCK PART</h2>
            </a>
            <span>Out of stock</span>
          </li>
        </ul>
        """
        rows, total = parse_products(html, "https://accessoriesspares.co.za/shop/")
        self.assertEqual(total, 12002)
        self.assertEqual(len(rows), 2)
        self.assertEqual(rows[0]["supplier_sku"], "F1-035")
        self.assertEqual(rows[0]["stock_status"], "IN_STOCK")
        self.assertIn("WILL_DISCONTINUE", rows[0]["supplier_status_flags"])
        self.assertIn("NOT_VIABLE", rows[0]["supplier_status_flags"])
        self.assertEqual(rows[1]["stock_status"], "OUT_OF_STOCK")
        self.assertEqual(rows[1]["supplier_sku"], "")


if __name__ == "__main__":
    unittest.main()
