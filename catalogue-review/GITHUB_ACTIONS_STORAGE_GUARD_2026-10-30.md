# GitHub Actions storage guard — 2026-10-30

The repository's read-only audit run recorded GitHub's explicit message: **"Artifact storage quota has been hit. Usage is recalculated every 6-12 hours."** The workbook audit itself completed successfully; its artifact upload was configured as best-effort, so the quota message did not invalidate the workbook scan.

To avoid repeating the storage pressure, recurring monitor/browser/catalogue report uploads and optional APK/XLSX artifacts are now gated behind repository Actions variables. They remain disabled unless explicitly enabled. APK/XLSX artifacts use one-day retention when enabled. The Planetworld workbook audit now publishes its summary in the job summary and does not upload an artifact. The Axxess package workflow remains manual-only and retains its one-day artifact/fallback behavior.

Variables:
- `ENABLE_TASK_MONITOR_ARTIFACT_UPLOAD`
- `ENABLE_BROWSER_QA_ARTIFACT_UPLOAD`
- `ENABLE_CATALOGUE_IMAGE_AUDIT_ARTIFACT_UPLOAD`
- `ENABLE_STORE_APK_ARTIFACT_UPLOAD`
- `ENABLE_OWNER_APK_ARTIFACT_UPLOAD`
- `ENABLE_UNMATCHED_IMAGE_EXPORT_ARTIFACT_UPLOAD`

No old artifacts were deleted by this change, no production deploy occurred, and no additional storage quota was purchased.
