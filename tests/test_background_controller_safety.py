import ast
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
WORKFLOW_PATH = ROOT / ".github" / "workflows" / "background-task-controller.yml"
SCRIPT_PATH = ROOT / "scripts" / "background_task_controller.py"


def assignment(tree, name):
    for node in tree.body:
        if isinstance(node, ast.Assign):
            if any(isinstance(target, ast.Name) and target.id == name for target in node.targets):
                return ast.literal_eval(node.value)
    raise AssertionError(f"Missing literal assignment: {name}")


class BackgroundControllerSafetyTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.workflow = WORKFLOW_PATH.read_text(encoding="utf-8")
        cls.script = SCRIPT_PATH.read_text(encoding="utf-8")
        cls.tree = ast.parse(cls.script)

    def test_artifact_inventory_is_read_only(self):
        self.assertIn("Inventory retained Actions artifacts (read-only; no deletion)", self.workflow)
        self.assertIn("no artifacts were deleted", self.workflow.lower())
        self.assertNotIn("deleteArtifact", self.workflow)
        self.assertNotIn("Deleting artifact", self.workflow)
        self.assertNotIn("staleBuildCutoff", self.workflow)

    def test_required_workflows_are_monitored(self):
        workflows = assignment(self.tree, "WORKFLOWS")
        keys = {item[0] for item in workflows}
        required = {
            "staging-category-navigation-acceptance.yml",
            "extract-buyer-guides-staging.yml",
            "asc-sku-image-sync-bounded.yml",
            "storefront-smoke.yml",
            "store-production-qa.yml",
            "cloudflare-pages-deploy.yml",
            "live-release-gates.yml",
            "catalogue-image-audit.yml",
            "cloudflare-public-pages-build-qa.yml",
            "planetworld-workbook-audit.yml",
            "delivery-quote-security.yml",
        }
        self.assertTrue(required.issubset(keys), f"Missing monitored workflows: {sorted(required - keys)}")

    def test_only_safe_nonproduction_workflows_are_retryable(self):
        allowlist = assignment(self.tree, "AUTO_RETRY_ALLOWLIST")
        forbidden = {
            "asc-sku-image-sync-bounded.yml",
            "refresh-category-snapshot.yml",
            "store-production-qa.yml",
            "live-release-gates.yml",
            "cloudflare-pages-deploy.yml",
        }
        self.assertTrue(forbidden.isdisjoint(allowlist))
        self.assertIn("staging-category-navigation-acceptance.yml", allowlist)
        self.assertIn("extract-buyer-guides-staging.yml", allowlist)

    def test_cancelled_and_stopped_jobs_are_supported_selectively(self):
        retryable = assignment(self.tree, "RETRYABLE_JOB_CONCLUSIONS")
        self.assertTrue({"failure", "timed_out", "cancelled", "startup_failure"}.issubset(retryable))
        self.assertIn("/actions/runs/{run_id}/jobs?per_page=100", self.script)
        self.assertIn("/actions/jobs/{job['id']}/rerun", self.script)
        self.assertIn("queued/in-progress latest run is already active", self.script)
        self.assertNotIn("rerun-failed-jobs", self.script)


if __name__ == "__main__":
    unittest.main()
