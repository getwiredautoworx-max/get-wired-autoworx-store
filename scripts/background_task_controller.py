#!/usr/bin/env python3
"""Monitor store workflows and perform one bounded retry of failed jobs in safe CI/staging tasks.

This controller never retries image-sync writes, category snapshot writes, or deployments.
It does not edit catalogue records, prices, categories, stock, or production hosting.
"""
import json
import os
import sys
import time
import urllib.error
import urllib.request
from datetime import datetime, timezone, timedelta
from pathlib import Path

REPO = os.environ.get("GITHUB_REPOSITORY", "getwiredautoworx-max/get-wired-autoworx-store")
TOKEN = os.environ.get("GITHUB_TOKEN", "")
API = "https://api.github.com/repos/" + REPO

# Use stable numeric workflow IDs for workflows that currently live only on review/staging
# branches; use file names for workflows on the default branch.
WORKFLOWS = [
    ("staging-category-navigation-acceptance.yml", 383443984),
    ("extract-buyer-guides-staging.yml", 383117751),
    ("asc-sku-image-sync-bounded.yml", 379342734),
    ("catalogue-image-audit.yml", 372760810),
    ("public-sku-exposure-audit.yml", 372386212),
    ("asc-catalogue-preview.yml", 404209587),
    ("store-preview-browser-qa.yml", 401567163),
    ("cloudflare-public-pages-build-qa.yml", 401552812),
    ("planetworld-workbook-audit.yml", 396705983),
    ("delivery-quote-security.yml", 400557742),
    ("category-snapshot-config-tests.yml", 404522830),
    ("refresh-category-snapshot.yml", 379356023),
    ("store-production-qa.yml", 377651943),
    ("storefront-smoke.yml", 359930642),
    ("prepare-axxess-package.yml", "prepare-axxess-package.yml"),
    ("public-url-http-check.yml", "public-url-http-check.yml"),
    ("cloudflare-pages-deploy.yml", "cloudflare-pages-deploy.yml"),
    ("live-release-gates.yml", 384256975),
]

# Only deterministic, non-production, read-only QA/audit/test or package-building
# workflows may receive one automatic retry. Never retry data/image sync, snapshot
# writes, production checks, or any Cloudflare deployment.
AUTO_RETRY_ALLOWLIST = {
    "staging-category-navigation-acceptance.yml",
    "extract-buyer-guides-staging.yml",
    "catalogue-image-audit.yml",
    "public-sku-exposure-audit.yml",
    "asc-catalogue-preview.yml",
    "store-preview-browser-qa.yml",
    "cloudflare-public-pages-build-qa.yml",
    "planetworld-workbook-audit.yml",
    "delivery-quote-security.yml",
    "category-snapshot-config-tests.yml",
    "storefront-smoke.yml",
    "prepare-axxess-package.yml",
    "public-url-http-check.yml",
}
RETRYABLE_RUN_CONCLUSIONS = {"failure", "timed_out", "cancelled", "startup_failure", "stale"}
RETRYABLE_JOB_CONCLUSIONS = {"failure", "timed_out", "cancelled", "startup_failure"}
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


def post_json(url):
    if not TOKEN:
        return False, "missing GITHUB_TOKEN; automatic retry disabled"
    req = urllib.request.Request(
        url,
        data=b"{}",
        headers={**headers(), "Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=20) as response:
            if response.status in (200, 201, 202, 204):
                return True, f"GitHub accepted job rerun (HTTP {response.status})"
            return False, f"unexpected GitHub HTTP status {response.status}"
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")[:500]
        return False, f"GitHub HTTP {exc.code}: {detail}"
    except Exception as exc:
        return False, str(exc)


def rerun_interrupted_jobs(run_id, attempt_before):
    """Rerun only jobs whose latest conclusion is failure/cancelled/timed_out/startup_failure."""
    jobs_data, error = get_json(f"{API}/actions/runs/{run_id}/jobs?per_page=100")
    if error:
        return "retry_request_failed", f"Could not inspect jobs: {error}", [], None
    candidates = [
        job for job in jobs_data.get("jobs", [])
        if job.get("conclusion") in RETRYABLE_JOB_CONCLUSIONS
    ]
    if not candidates:
        return "no_rerunnable_jobs", "No failed/cancelled/stopped jobs were returned by the run's jobs endpoint.", [], None

    job_actions = []
    for job in candidates:
        ok, detail = post_json(f"{API}/actions/jobs/{job['id']}/rerun")
        job_actions.append({
            "job_id": job.get("id"),
            "job_name": job.get("name"),
            "conclusion_before_retry": job.get("conclusion"),
            "result": "retry_requested" if ok else "retry_request_failed",
            "detail": detail,
        })

    requested = any(item["result"] == "retry_requested" for item in job_actions)
    verification = None
    if requested:
        time.sleep(3)
        latest, verify_error = get_json(f"{API}/actions/runs/{run_id}")
        if verify_error:
            verification = {"verified": False, "error": verify_error}
        else:
            latest_attempt = int(latest.get("run_attempt") or attempt_before)
            latest_status = latest.get("status")
            verification = {
                "verified": latest_attempt > attempt_before or latest_status in {"queued", "in_progress"},
                "run_attempt": latest_attempt,
                "status": latest_status,
                "conclusion": latest.get("conclusion"),
                "url": latest.get("html_url"),
            }
    result = "retry_requested" if requested else "retry_request_failed"
    detail = "; ".join(
        f"job {item['job_id']} {item['result']}: {item['detail']}" for item in job_actions
    )
    return result, detail, job_actions, verification


queue_path = ROOT / "automation/task-queue.json"
queue = json.loads(queue_path.read_text(encoding="utf-8"))
workflow_results = []
api_errors = []
retry_actions = []
now_dt = datetime.now(timezone.utc)

for filename, workflow_ref in WORKFLOWS:
    url = f"{API}/actions/workflows/{workflow_ref}/runs?per_page=1"
    data, error = get_json(url)
    if error:
        api_errors.append({"workflow": filename, "workflow_ref": workflow_ref, "error": error})
        workflow_results.append({
            "workflow": filename, "workflow_ref": workflow_ref, "status": "unknown",
            "conclusion": None, "run_id": None, "url": None, "updated_at": None, "error": error,
        })
        continue
    runs = data.get("workflow_runs", [])
    if not runs:
        workflow_results.append({
            "workflow": filename, "workflow_ref": workflow_ref, "status": "no_runs_found",
            "conclusion": None, "run_id": None, "url": None, "updated_at": None,
        })
        continue

    run = runs[0]
    item = {
        "workflow": filename,
        "workflow_ref": workflow_ref,
        "status": run.get("status"),
        "conclusion": run.get("conclusion"),
        "run_id": run.get("id"),
        "url": run.get("html_url"),
        "updated_at": run.get("updated_at"),
        "head_branch": run.get("head_branch"),
        "head_sha": run.get("head_sha"),
        "run_attempt": int(run.get("run_attempt") or 1),
        "retry_action": "not_needed",
    }
    workflow_results.append(item)

    # A queued/in-progress latest run is already active: never create a duplicate rerun.
    if item["status"] != "completed" or item["conclusion"] not in RETRYABLE_RUN_CONCLUSIONS:
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

    retry_result, detail, job_actions, verification = rerun_interrupted_jobs(
        item["run_id"], item["run_attempt"]
    )
    item["retry_action"] = retry_result
    item["retry_jobs"] = job_actions
    item["retry_verification"] = verification
    retry_actions.append({
        "workflow": filename,
        "run_id": item["run_id"],
        "attempt_before_retry": item["run_attempt"],
        "result": retry_result,
        "detail": detail,
        "jobs": job_actions,
        "verification": verification,
        "url": item["url"],
    })
    if retry_result == "retry_request_failed":
        api_errors.append({"workflow": filename, "run_id": item["run_id"], "retry_error": detail})


failed = [r for r in workflow_results if r["status"] == "completed" and r["conclusion"] != "success"]
running = [r for r in workflow_results if r["status"] not in ("completed", "no_runs_found", "unknown")]
unknown = [r for r in workflow_results if r["status"] == "unknown"]
now = now_dt.isoformat()
report = {
    "generated_at_utc": now,
    "repository": REPO,
    "mode": "monitor plus bounded job-level retries for allowlisted QA/staging/audit/packaging workflows",
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
        "retryable_run_conclusions": sorted(RETRYABLE_RUN_CONCLUSIONS),
        "retryable_job_conclusions": sorted(RETRYABLE_JOB_CONCLUSIONS),
        "rerun_scope": "only individual failed/cancelled/timed-out/startup-failure jobs; queued/in-progress runs are never duplicated",
        "excluded": [
            "ASC exact-SKU image sync",
            "category snapshot writes",
            "Store Production QA",
            "Live Release Gates",
            "Cloudflare production deployment",
            "ASC non-production Cloudflare deployment",
        ],
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
    "- Mode: read-only monitoring plus bounded job-level retries of allowlisted QA/staging/audit/packaging workflows.",
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
    # Queue schema v2 uses success_criteria/source rather than the legacy description field.
    description = task.get("description") or "; ".join(task.get("success_criteria", [])) or "No description supplied."
    next_action = task.get("next_action") or "No next action recorded."
    lines += [f"### {task.get('priority', '—')}. {task.get('id', 'unnamed-task')} — {task.get('status', 'unknown')}", "", description, "", f"**Next action:** {next_action}", ""]
lines += [
    "## Safety rules", "",
    "- No product, price, category, stock, or image database writes are performed by this controller.",
    "- No production or preview deployment is triggered.",
    "- Automatic retries are limited to one retry within six hours for allowlisted non-production QA/audit/test/packaging workflows.",
    "- Retries target only failed/cancelled/timed-out/startup-failure jobs; queued or in-progress runs are not duplicated.",
    "- Image-sync writes, category snapshot writes, and deployment workflows are excluded from automatic retry.",
    "- Artifact inventory is read-only; this controller never deletes retained artifacts.",
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
