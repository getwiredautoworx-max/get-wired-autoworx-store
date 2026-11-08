import unittest
from scripts.task_queue_utils import format_task_summary, task_description

class TaskQueueRenderingTests(unittest.TestCase):
    def test_schema_v2_without_legacy_description(self):
        task = {"id":"audio-task","priority":3,"status":"ready","success_criteria":["Exact model verified","Image matched"]}
        self.assertEqual(task_description(task), "Exact model verified; Image matched")
        self.assertEqual(format_task_summary(task), "3. audio-task — ready")
    def test_missing_optional_fields(self):
        self.assertEqual(task_description({}), "No description supplied.")
        self.assertEqual(format_task_summary({}), "—. unnamed-task — unknown")
    def test_legacy_description(self):
        self.assertEqual(task_description({"description":"Legacy summary"}), "Legacy summary")

if __name__ == "__main__":
    unittest.main()
