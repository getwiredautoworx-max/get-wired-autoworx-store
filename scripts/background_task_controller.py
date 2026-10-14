#!/usr/bin/env python3
"""Read-only background controller: summarize task queue and recent workflow outcomes.
It does not alter catalogue data, deploy production, or auto-approve ambiguous records.
"""
import json
import os
import sys
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

REPO = os.environ.get("GITHUB_REPOSITORY", "getwiredautoworx-max/get-wired-autoworx-store")
TOKEN = os.environ.get("GITHUB_TOKEN", "")
API = "https://api.github.com/repos/" + REPO
WORKFLOWS = [
    "asc-sku-image-sync-bounded.yml",
    "catalogue-image-audit.yml",
    "refresh-category-snapshot.yml",
    "store-production-qa.yml",
    "storefront-smoke.yml",
    "prepare-axxess-package.yml",
    "cloudflare-pages-deploy.yml",
]
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "background-task-checkpoint"
OUT.mkdir(exist_ok=True)

def get_json(url):
    headers = {"Accept": "application/vnd.github+json", "User-Agent": "Get-Wired-AutoWorx-Background-Controller"}
    if TOKEN:
        headers["Authorization"] = "Bearer " + TOKEN
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=20) as response:
            return json.load(response), None
    except Exception as exc:
        return None, str(exc)

queue_path = ROOT / "automation/task-queue.json"
queue = json.loads(queue_path.read_text(encoding="utf-8"))
workflow_results = []
api_errors = []
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
    workflow_results.append({
        "workflow": filename,
        "status": run.get("status"),
        "conclusion": run.get("conclusion"),
        "run_id": run.get("id"),
        "url": run.get("html_url"),
        "updated_at": run.get("updated_at"),
        "head_branch": run.get("head_branch"),
    })

failed = [r for r in workflow_results if r["status"] == "completed" and r["conclusion"] != "success"]
running = [r for r in workflow_results if r["status"] not in ("completed", "no_runs_found", "unknown")]
unknown = [r for r in workflow_results if r["status"] == "unknown"]
now = datetime.now(timezone.utc).isoformat()
report = {
    "generated_at_utc": now,
    "repository": REPO,
    "mode": "read-only monitor and checkpoint; no production mutations",
    "queue_source": "automation/task-queue.json",
    "task_queue": queue,
    "latest_workflow_runs": workflow_results,
    "failed_or_non_successful_completed_runs": failed,
    "currently_running_runs": running,
    "monitoring_errors": api_errors,
    "next_actions": [
        "Inspect failed workflows and retry only transient failures, up to the configured limit.",
        "Continue source-page evidence checks for provisional category candidates; keep ambiguous SKUs held.",
        "Inspect the bounded image-sync audit artifact before any image-sync retry.",
        "Do not deploy to Axxess or modify live catalogue data from this controller."
    ],
    "overall_status": "attention_required" if failed or api_errors else ("in_progress" if running else "monitoring_complete")
}
(OUT / "background-task-status.json").write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
lines = [
    "# Background Task Checkpoint",
    "",
    f"- Generated (UTC): {now}",
    f"- Repository: {REPO}",
    "- Mode: read-only monitoring; production mutations and deployments are disabled.",
    f"- Overall status: **{report['overall_status']}**",
    f"- Completed runs needing attention: {len(failed)}",
    f"- Runs still in progress: {len(running)}",
    f"- Monitoring/API errors: {len(api_errors)}",
    "",
    "## Latest workflow runs",
    "",
    "| Workflow | Status | Conclusion | Run | Last updated (UTC) |",
    "|---|---|---|---|---|",
]
for item in workflow_results:
    run_link = f"[{item['run_id']}]({item['url']})" if item.get("run_id") and item.get("url") else "—"
    lines.append(f"| {item['workflow']} | {item['status']} | {item.get('conclusion') or '—'} | {run_link} | {item.get('updated_at') or '—'} |")
lines += ["", "## Persistent task queue", ""]
for task in sorted(queue.get("tasks", []), key=lambda t: t.get("priority", 999)):
    lines += [f"### {task['priority']}. {task['id']} — {task['status']}", "", task["description"], "", f"**Next action:** {task['next_action']}", ""]
lines += ["## Safety rules", "", "- No product, price, category, stock, or image database writes are performed by this controller.",
          "- No production deployment is triggered.",
          "- Workflow failure is reported, not silently treated as success.",
          "- This checkpoint is a workflow artifact; it does not claim to have updated the permanent handover file.",
          ""]
(OUT / "BACKGROUND_TASK_STATUS.md").write_text("\n".join(lines), encoding="utf-8")
print(json.dumps({
    "overall_status": report["overall_status"],
    "workflow_runs_checked": len(workflow_results),
    "failed_or_non_successful_completed_runs": len(failed),
    "currently_running_runs": len(running),
    "monitoring_errors": len(api_errors),
    "checkpoint": str(OUT)
}, indent=2))
if api_errors:
    sys.exit(2)
