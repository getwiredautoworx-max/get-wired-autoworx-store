import contextlib
import importlib.util
import io
import json
import tempfile
import unittest
from pathlib import Path
from unittest import mock

SCRIPT = Path(__file__).resolve().parents[1] / "scripts" / "automation" / "task-runner.py"
spec = importlib.util.spec_from_file_location("task_runner", SCRIPT)
runner = importlib.util.module_from_spec(spec)
spec.loader.exec_module(runner)

class RunnerTests(unittest.TestCase):
    def test_task_graph_dependencies_exist_and_are_acyclic(self):
        tasks = {t["id"]: t for t in runner.TASKS}
        self.assertEqual(len(tasks), len(runner.TASKS))
        for task in runner.TASKS:
            for dep in task["needs"]:
                self.assertIn(dep, tasks)
        visiting, visited = set(), set()
        def visit(node):
            self.assertNotIn(node, visiting, "dependency cycle detected")
            if node in visited:
                return
            visiting.add(node)
            for dep in tasks[node]["needs"]:
                visit(dep)
            visiting.remove(node)
            visited.add(node)
        for node in tasks:
            visit(node)

    def test_staging_json_schema_and_production_guard(self):
        ok, detail = runner.check({"id":"staging_taxonomy"})
        self.assertTrue(ok, detail)
        hierarchy = json.loads((runner.ROOT / "assets/store-category-hierarchy.json").read_text())
        rules = json.loads((runner.ROOT / "assets/product-grouping-rules.json").read_text())
        self.assertEqual(len(hierarchy["roots"]), 8)
        self.assertEqual(len(rules["groups"]), 17)
        self.assertFalse(hierarchy["live_catalogue_enabled"])

    def test_retries_are_bounded_per_run_and_resume_later(self):
        original_tasks = runner.TASKS
        try:
            runner.TASKS = [{"id":"synthetic_check","needs":[],"kind":"check"}]
            with tempfile.TemporaryDirectory() as td:
                runner.STATE = Path(td) / "state.json"
                with mock.patch.object(runner, "check", side_effect=[(False,"transient"),(False,"still down"),(True,"recovered")]) as check:
                    with contextlib.redirect_stdout(io.StringIO()):
                        self.assertEqual(runner.main(), 1)
                    state1 = json.loads(runner.STATE.read_text())
                    self.assertEqual(state1["tasks"]["synthetic_check"]["status"], "failed")
                    self.assertEqual(state1["tasks"]["synthetic_check"]["attempts"], 2)
                    with contextlib.redirect_stdout(io.StringIO()):
                        self.assertEqual(runner.main(), 0)
                    state2 = json.loads(runner.STATE.read_text())
                    self.assertEqual(state2["tasks"]["synthetic_check"]["status"], "passed")
                    self.assertEqual(state2["tasks"]["synthetic_check"]["total_attempts"], 3)
                    self.assertEqual(check.call_count, 3)
        finally:
            runner.TASKS = original_tasks

    def test_approval_tasks_are_held_not_executed(self):
        approvals = [t for t in runner.TASKS if t["kind"] == "approval"]
        self.assertTrue(approvals)
        self.assertTrue(all(t["id"] in ("catalogue_source_qa","browser_qa","release") for t in approvals))
        source = SCRIPT.read_text()
        self.assertNotIn("supabase", source.lower().replace("no production writes", ""))
        self.assertNotIn("deploy(", source.lower())

if __name__ == "__main__":
    unittest.main()
