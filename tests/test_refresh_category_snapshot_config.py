import importlib.util
import tempfile
import unittest
from pathlib import Path

MODULE_PATH = Path(__file__).resolve().parents[1] / "scripts" / "refresh_category_snapshot.py"
SPEC = importlib.util.spec_from_file_location("refresh_category_snapshot", MODULE_PATH)
MODULE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(MODULE)


class SupabaseConfigResolutionTests(unittest.TestCase):
    def test_environment_config_takes_precedence(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / "checkout-v2.html").write_text(
                "SUPABASE_URL='https://fallback.example',SUPABASE_KEY='fallback'",
                encoding="utf-8",
            )
            self.assertEqual(
                MODULE.load_supabase_config(
                    root, {"SUPABASE_URL": "https://env.example/", "SUPABASE_KEY": "env-key"}
                ),
                ("https://env.example", "env-key"),
            )

    def test_checkout_config_is_used_when_category_shell_is_empty(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / "index-new.html").write_text(
                "<title>Buttons only</title>", encoding="utf-8"
            )
            (root / "checkout-v2.html").write_text(
                "const SUPABASE_URL='https://project.example',"
                "SUPABASE_KEY='sb_publishable_test';",
                encoding="utf-8",
            )
            self.assertEqual(
                MODULE.load_supabase_config(root, {}),
                ("https://project.example", "sb_publishable_test"),
            )

    def test_missing_config_fails_with_actionable_message(self):
        with tempfile.TemporaryDirectory() as directory:
            with self.assertRaisesRegex(RuntimeError, "set SUPABASE_URL/SUPABASE_KEY"):
                MODULE.load_supabase_config(Path(directory), {})


if __name__ == "__main__":
    unittest.main()
