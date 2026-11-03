import unittest
from pathlib import Path
from tempfile import TemporaryDirectory

from scripts.refresh_category_snapshot import extract_public_config, read_public_config


class PublicConfigTests(unittest.TestCase):
    def test_extracts_named_supabase_key(self):
        url, key = extract_public_config([
            "const SUPABASE_URL='https://example.supabase.co',SUPABASE_KEY='public-key';"
        ])
        self.assertEqual(url, "https://example.supabase.co")
        self.assertEqual(key, "public-key")

    def test_extracts_products_page_key_when_homepage_is_static(self):
        url, key = extract_public_config([
            "<body data-storefront-mode='buttons-only'></body>",
            "const SUPABASE_URL='https://example.supabase.co',KEY='public-key';"
        ])
        self.assertEqual(url, "https://example.supabase.co")
        self.assertEqual(key, "public-key")

    def test_read_public_config_falls_back_to_products_page(self):
        with TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / "index-new.html").write_text(
                "<body data-storefront-mode='buttons-only'></body>", encoding="utf-8"
            )
            (root / "products.html").write_text(
                "const SUPABASE_URL='https://example.supabase.co',KEY='public-key';",
                encoding="utf-8",
            )
            self.assertEqual(
                read_public_config(root),
                ("https://example.supabase.co", "public-key"),
            )

    def test_missing_config_fails_with_actionable_message(self):
        with self.assertRaisesRegex(RuntimeError, "products.html"):
            extract_public_config(["<html></html>"])


if __name__ == "__main__":
    unittest.main()
