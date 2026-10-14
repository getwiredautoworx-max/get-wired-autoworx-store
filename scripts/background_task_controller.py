#!/usr/bin/env python3
"""Monitor store workflows and perform one bounded retry for allowlisted CI/test failures.

This controller never retries data-sync or deployment workflows. It does not edit
catalogue records, prices, categories, stock, or production hosting.
"""
import json
import os
import sys
import urllib.error
import urllib.request
from datetime import datetime, timezone, timedelta
from pathlib import Path

REPO = os.environ.get("GITHUB_REPOSITORY", "getwiredautoworx-max/get-wired-autoworx-store")
TOKEN = os.environ.get("GITHUB_TOKEN", "")
API = "https://api.github.com/repos/" + REPO
WORKFLOWS = [
    "asc-sku-image-sync-bounded.yml",
    "catalogue-image-audit.yml",
    "public-sku-exposure-audit.yml",
    "refresh-category-snapshot.yml",
    "store-production-qa.yml",
    "storefront-smoke.yml",
    "prepare-axxess-package.yml",
    "cloudflare-pages-deploy.yml",
]
# Only deterministic, read-only QA/audit or artifact packaging workflows may
# receive one automatic retry. Never retry image sync, category writes, or deploy.
AUTO_RETRY_ALLOWLIST = {
    "catalogue-image-audit.yml",
    "public-sku-exposure-audit.yml",
    "store-production-qa.yml",
    "storefront-smoke.yml",
    "prepare-axxess-package.yml",
}
MAX_ATTEMPTS = 2  # one original attempt + at most one retry
MAX_FAILURE_AGE = timedelta(hours=6)
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "background-task-checkpoint"
OUT.mkdir(exist_ok=True)

def headers():
    h = {"Accept": "application/vnd.github+json", "User-Agent": "Get-Wired-AutoWorx-Background-Controller"}
    if TOKEN:
        h["Authorization"] = "Bearer " + TOKEN
    return h

def get_json(url):
    req = urllib.request.Request(url, headers=headers())
    try:
        with urllib.request.urlopen(req, timeout=20) as response:
            return json.load(response), None
    except Exception as exc:
        return None, str(exc)

def rerun_failed_jobs(run_id):
    if not TOKEN:
        return False, "missing GITHUB_TOKEN; automatic retry disabled"
    url = f"{API}/actions/runs/{run_id}/rerun-failed-jobs"
    req = urllib.request.Request(url, data=b"{}", headers={**headers(), "Content-Type": "application/json"}, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=20) as response:
            if response.status in (200, 201, 202, 204):
                return True, f"GitHub accepted failed-job rerun (HTTP {response.status})"
            return False, f"unexpected GitHub HTTP status {response.status}"
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")[:500]
        return False, f"GitHub HTTP {exc.code}: {detail}"
    except Exception as exc:
        return False, str(exc)

queue_path = ROOT / "automation/task-queue.json"
queue = json.loads(queue_path.read_text(encoding="utf-8"))
workflow_results = []
api_errors = []
retry_actions = []
now_dt = datetime.now(timezone.utc)
for filename in WORKFLOWS:
    url = f"{API}/actions/workflows/{filename}/runs?per_page=1"
    data, error = get_json(url)
    if error:
        api_errors.append({"workflow": filename, "error": error})
        workflow_results.append({"workflow": filename, "status": "unknown", "conclusion": None, "run_id": None, "url": None, "updated_at": None, "error": error})
        continue
    runs = data.get("workflow_runs", [])
    if not runs:
        workflow_results.append({"workflow": filename, "status": "no_runs_found", "conclusion": None, "run_id": None, "url": None, "updated_at": None})
        continue
    run = runs[0]
    item = {
        "workflow": filename,
        "status": run.get("status"),
        "conclusion": run.get("conclusion"),
        "run_id": run.get("id"),
        "url": run.get("html_url"),
        "updated_at": run.get("updated_at"),
        "head_branch": run.get("head_branch"),
        "run_attempt": int(run.get("run_attempt") or 1),
        "retry_action": "not_needed",
    }
    workflow_results.append(item)

    if item["status"] != "completed" or item["conclusion"] not in {"failure", "timed_out"}:
        continue
    if filename not in AUTO_RETRY_ALLOWLIST:
        item["retry_action"] = "not_allowed_for_this_workflow"
        continue
    try:
        updated_dt = datetime.fromisoformat((item["updated_at"] or "").replace("Z", "+00:00"))
    except ValueError:
        item["retry_action"] = "skipped_missing_or_invalid_timestamp"
        continue
    if now_dt - updated_dt > MAX_FAILURE_AGE:
        item["retry_action"] = "skipped_failure_older_than_6_hours"
        continue
    if item["run_attempt"] >= MAX_ATTEMPTS:
        item["retry_action"] = "retry_limit_reached"
        continue
    ok, detail = rerun_failed_jobs(item["run_id"])
    item["retry_action"] = "retry_requested" if ok else "retry_request_failed"
    retry_actions.append({
        "workflow": filename,
        "run_id": item["run_id"],
        "attempt_before_retry": item["run_attempt"],
        "result": item["retry_action"],
        "detail": detail,
        "url": item["url"],
    })
    if not ok:
        api_errors.append({"workflow": filename, "run_id": item["run_id"], "retry_error": detail})

failed = [r for r in workflow_results if r["status"] == "completed" and r["conclusion"] != "success"]
running = [r for r in workflow_results if r["status"] not in ("completed", "no_runs_found", "unknown")]
unknown = [r for r in workflow_results if r["status"] == "unknown"]
now = now_dt.isoformat()
report = {
    "generated_at_utc": now,
    "repository": REPO,
    "mode": "monitor plus bounded failed-job retries for allowlisted QA/audit/packaging workflows",
    "queue_source": "automation/task-queue.json",
    "task_queue": queue,
    "latest_workflow_runs": workflow_results,
    "failed_or_non_successful_completed_runs": failed,
    "currently_running_runs": running,
    "automatic_retry_actions": retry_actions,
    "automatic_retry_policy": {
        "allowlist": sorted(AUTO_RETRY_ALLOWLIST),
        "maximum_total_attempts": MAX_ATTEMPTS,
        "maximum_failure_age_hours": 6,
        "retryable_conclusions": ["failure", "timed_out"],
        "excluded": ["ASC exact-SKU image sync", "category snapshot writes", "Cloudflare deployment", "all production deployments"],
    },
    "monitoring_errors": api_errors,
    "next_actions": [
        "Inspect retry outcomes; fix deterministic code/test failures rather than repeating them.",
        "Continue source-page evidence checks for provisional category candidates; keep ambiguous SKUs held.",
        "Inspect bounded image-sync audit artifacts before any manual image-sync retry.",
        "Do not deploy to Axxess or modify live catalogue data from this controller.",
    ],
    "overall_status": "attention_required" if failed or api_errors else ("in_progress" if running else "monitoring_complete"),
}
(OUT / "background-task-status.json").write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
lines = [
    "# Background Task Checkpoint", "",
    f"- Generated (UTC): {now}",
    f"- Repository: {REPO}",
    "- Mode: read-only monitoring plus bounded retry of failed jobs in allowlisted QA/audit/packaging workflows.",
    f"- Overall status: **{report['overall_status']}**",
    f"- Completed runs needing attention: {len(failed)}",
    f"- Runs still in progress: {len(running)}",
    f"- Retry actions requested: {len(retry_actions)}",
    f"- Monitoring/API errors: {len(api_errors)}", "",
    "## Latest workflow runs", "",
    "| Workflow | Status | Conclusion | Attempt | Retry action | Run | Last updated (UTC) |",
    "|---|---|---|---:|---|---|---|",
]
for item in workflow_results:
    run_link = f"[{item['run_id']}]({item['url']})" if item.get("run_id") and item.get("url") else "—"
    lines.append(f"| {item['workflow']} | {item['status']} | {item.get('conclusion') or '—'} | {item.get('run_attempt', '—')} | {item.get('retry_action', '—')} | {run_link} | {item.get('updated_at') or '—'} |")
lines += ["", "## Automatic retry actions", ""]
if retry_actions:
    for item in retry_actions:
        lines.append(f"- {item['workflow']} run {item['run_id']}: **{item['result']}** — {item['detail']}")
else:
    lines.append("- No automatic retries requested in this checkpoint.")
lines += ["", "## Persistent task queue", ""]
for task in sorted(queue.get("tasks", []), key=lambda t: t.get("priority", 999)):
    lines += [f"### {task['priority']}. {task['id']} — {task['status']}", "", task["description"], "", f"**Next action:** {task['next_action']}", ""]
lines += [
    "## Safety rules", "",
    "- No product, price, category, stock, or image database writes are performed by this controller.",
    "- No production deployment is triggered.",
    "- Automatic retries are limited to one retry within six hours for allowlisted QA/audit/packaging workflows.",
    "- Image-sync writes, category snapshot writes, and deployment workflows are excluded from automatic retry.",
    "- Workflow failure is reported, not silently treated as success.",
    "- This checkpoint is a workflow artifact; it does not claim to have updated the permanent handover file.", "",
]
(OUT / "BACKGROUND_TASK_STATUS.md").write_text("\n".join(lines), encoding="utf-8")
print(json.dumps({
    "overall_status": report["overall_status"],
    "workflow_runs_checked": len(workflow_results),
    "failed_or_non_successful_completed_runs": len(failed),
    "currently_running_runs": len(running),
    "retry_actions_requested": len(retry_actions),
    "monitoring_errors": len(api_errors),
    "checkpoint": str(OUT),
}, indent=2))
if api_errors:
    sys.exit(2)
