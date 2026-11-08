#!/usr/bin/env python3
"""Fail-closed validation for the current Get Wired 24/7 task queue."""
from __future__ import annotations
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
QUEUE = ROOT / "automation" / "task-queue.json"
EXPECTED_ROOTS = [
    "Auto Electrical Spares",
    "Car Audio / Home Entertainment",
    "Car Care & Accessories",
]
FORBIDDEN_TERMS = ("buyers guide", "buyers guides", "eight-category", "eight category")

def validate() -> list[str]:
    errors: list[str] = []
    data = json.loads(QUEUE.read_text(encoding="utf-8"))
    if data.get("schema_version") != 2:
        errors.append("schema_version must be 2")
    if data.get("storefront_roots") != EXPECTED_ROOTS:
        errors.append("storefront_roots do not match the owner's current three-category structure")
    policy = data.get("policy", {})
    for key in ("live_store_mutations", "production_deploy", "axxess_dns_payment_supabase_live_writes"):
        if "prohibited" not in str(policy.get(key, "")).lower():
            errors.append(f"policy.{key} must remain prohibited")
    tasks = data.get("tasks", [])
    ids = [t.get("id") for t in tasks]
    if len(ids) != len(set(ids)):
        errors.append("task IDs must be unique")
    for task in tasks:
        if not task.get("id") or not task.get("success_criteria") or not task.get("next_action"):
            errors.append(f"task is missing required fields: {task.get('id')}")
        haystack = json.dumps(task, ensure_ascii=False).lower()
        if any(term in haystack for term in FORBIDDEN_TERMS):
            errors.append(f"obsolete category or Buyers Guide instruction found in task {task.get('id')}")
    private_tasks = [t for t in tasks if t.get("id") == "audio-planetworld-source-extraction"]
    if len(private_tasks) != 1:
        errors.append("Audio Connections / Planetworld private-processing task must exist exactly once")
    else:
        task = private_tasks[0]
        if task.get("automatic") is not False or task.get("execution_mode") != "private-runner-required":
            errors.append("Audio Connections / Planetworld processing must remain disabled on the public runner")
    return errors

if __name__ == "__main__":
    problems = validate()
    if problems:
        for problem in problems:
            print("QUEUE_VALIDATION_ERROR:", problem)
        raise SystemExit(1)
    print("QUEUE_VALIDATION_OK: current three-category roots, safety gates and private supplier-data boundary verified")
