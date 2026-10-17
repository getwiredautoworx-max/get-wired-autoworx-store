import unittest
from pathlib import Path

SQL = Path(__file__).resolve().parents[1] / "supabase/review/asc-discontinued-cleanup-2026-10-17.sql"


class ReviewSqlSafetyTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.sql = SQL.read_text(encoding="utf-8")

    def test_checked_in_candidates_are_not_authorized_for_write(self):
        self.assertIn("DEFAULT false", self.sql)
        self.assertIn("DATE '2026-10-17', false, false", self.sql)
        self.assertIn("All flags are false in this reviewed file", self.sql)

    def test_only_freshly_verified_owner_approved_confirmed_discontinued_rows_can_change(self):
        self.assertIn("WHERE c.submitted_status = 'DISCONTINUED'", self.sql)
        self.assertIn("AND c.freshly_verified IS TRUE", self.sql)
        self.assertIn("AND c.owner_approved IS TRUE", self.sql)
        self.assertIn("WILL_DISCONTINUE", self.sql)
        self.assertIn("CONFLICT_REQUIRES_REVIEW", self.sql)
        self.assertIn("UNKNOWN_UNVERIFIED", self.sql)

    def test_local_stock_is_never_rewritten(self):
        self.assertNotIn("SET stock_quantity", self.sql)
        self.assertNotIn("DELETE FROM public.products", self.sql)


if __name__ == "__main__":
    unittest.main()
