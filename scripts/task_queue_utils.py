"""Defensive formatting helpers for schema-v2 task queue records."""

def task_description(task):
    description = task.get("description")
    if isinstance(description, str) and description.strip():
        return description.strip()
    criteria = task.get("success_criteria") or []
    if isinstance(criteria, list):
        usable = [str(item).strip() for item in criteria if str(item).strip()]
        if usable:
            return "; ".join(usable)
    return "No description supplied."

def format_task_summary(task):
    priority = task.get("priority", "—")
    task_id = task.get("id") or "unnamed-task"
    status = task.get("status") or "unknown"
    return f"{priority}. {task_id} — {status}"
