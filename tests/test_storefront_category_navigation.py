import unittest
from html.parser import HTMLParser
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


class CategoryButtonParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.buttons = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        classes = attrs.get("class", "").split()
        if tag == "button" and "catBtn" in classes:
            self.buttons.append(attrs.get("data-filter", ""))


class StorefrontNavigationTests(unittest.TestCase):
    def test_all_homepage_subcategory_buttons_have_category_ids(self):
        html = (ROOT / "index-new.html").read_text(encoding="utf-8")
        parser = CategoryButtonParser()
        parser.feed(html)
        self.assertGreater(len(parser.buttons), 0)
        self.assertTrue(all(parser.buttons), "Every subcategory button needs a data-filter category ID")

    def test_subcategory_buttons_navigate_to_category_page(self):
        html = (ROOT / "index-new.html").read_text(encoding="utf-8")
        self.assertIn("closest('button.catBtn[data-filter]')", html)
        self.assertIn("location.href='category.html?id='+encodeURIComponent(id)", html)

    def test_leaf_categories_open_product_listing_even_when_empty(self):
        html = (ROOT / "category.html").read_text(encoding="utf-8")
        self.assertIn("if(!hasChildren){location.replace('products.html?category='+encodeURIComponent(current.id));return}", html)


if __name__ == "__main__":
    unittest.main()
