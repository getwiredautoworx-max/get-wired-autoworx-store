"""Safety regression tests for the background controller retry policy."""
import ast
from pathlib import Path
import unittest


class BackgroundControllerPolicyTests(unittest.TestCase):
    def test_production_live_and_deployment_workflows_are_not_retryable(self):
        source = Path("scripts/background_task_controller.py").read_text(encoding="utf-8")
        tree = ast.parse(source)
        values = {}
        for node in tree.body:
            if isinstance(node, ast.Assign):
                for target in node.targets:
                    if isinstance(target, ast.Name) and target.id in {
                        "WORKFLOWS",
                        "AUTO_RETRY_ALLOWLIST",
                    }:
                        values[target.id] = ast.literal_eval(node.value)

        self.assertIn("store-production-qa.yml", values["WORKFLOWS"])
        self.assertNotIn("store-production-qa.yml", values["AUTO_RETRY_ALLOWLIST"])
        for protected in (
            "live-release-gates.yml",
            "cloudflare-pages-deploy.yml",
        ):
            self.assertNotIn(protected, values["AUTO_RETRY_ALLOWLIST"])


if __name__ == "__main__":
    unittest.main()
