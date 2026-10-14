Dependency-aware staging task runner

Safety: staging-only; no deployment, Supabase writes, product imports, Axxess edits, or live-catalogue mutations. Deterministic checks have a bounded two-attempt limit. State is saved to an Actions cache and each run uploads a 30-day report artifact. Human evidence and approval tasks remain blocked rather than guessed.

Graph: repo_safety -> staging_taxonomy -> catalogue_source_qa (approval hold) and browser_qa (approval hold). repo_safety -> controller_presence. Release remains held until evidence and owner approval.

Run locally: python3 scripts/automation/task-runner.py. Reset explicitly with --reset.

Limitations: GitHub Actions is scheduled/event-driven, not a permanently running process. Cache restore is best-effort, not transactional. Scheduled runs can be delayed or stopped by quota, permissions, or disabled workflows. The canonical existing controller has not yet been identified; the runner fails safely if it cannot find a known entry point.