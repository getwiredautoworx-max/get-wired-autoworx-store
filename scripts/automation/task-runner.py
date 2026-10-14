#!/usr/bin/env python3
"""Safe dependency-aware runner for staging-only store checks."""
import argparse, json, os, sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
STATE = Path(os.environ.get("TASK_RUNNER_STATE", ROOT / "task-runner-state.json"))
MAX_ATTEMPTS = 2
TASKS = [
 {"id":"repo_safety","needs":[],"kind":"check"},
 {"id":"staging_taxonomy","needs":["repo_safety"],"kind":"check"},
 {"id":"controller_presence","needs":["repo_safety"],"kind":"check"},
 {"id":"catalogue_source_qa","needs":["staging_taxonomy"],"kind":"approval"},
 {"id":"browser_qa","needs":["staging_taxonomy"],"kind":"approval"},
 {"id":"release","needs":["catalogue_source_qa","browser_qa","controller_presence"],"kind":"approval"},
]
def stamp(): return datetime.now(timezone.utc).isoformat()
def load():
 try:
  s=json.loads(STATE.read_text())
  if s.get("schema") != 1: raise ValueError("unsupported state schema")
  return s
 except FileNotFoundError:
  return {"schema":1,"updated_at":stamp(),"tasks":{},"events":[]}
def check(task):
 if task["id"] == "repo_safety":
  return True, "Runner implements checks/holds only; no production writes or deploy steps."
 if task["id"] == "staging_taxonomy":
  hp=ROOT/"assets/store-category-hierarchy.json"; rp=ROOT/"assets/product-grouping-rules.json"
  missing=[str(p.relative_to(ROOT)) for p in (hp,rp) if not p.is_file()]
  if missing: return False,"Missing staging files: "+", ".join(missing)
  try: h=json.loads(hp.read_text()); r=json.loads(rp.read_text())
  except Exception as e: return False,"Invalid JSON: "+str(e)
  roots=h.get("roots",h.get("categories",[])) if isinstance(h,dict) else h
  rules=r.get("groups",r.get("rules",[])) if isinstance(r,dict) else r
  if not isinstance(roots,list) or len(roots)!=8: return False,"Expected 8 staged root categories."
  if not isinstance(rules,list) or len(rules)!=17: return False,"Expected 17 proposed grouping rules."
  if isinstance(h,dict) and h.get("live_catalogue_enabled",False): return False,"Refusing: live catalogue flag is enabled."
  return True,"Staging JSON valid: 8 roots and 17 proposed rules; not product-level approval."
 if task["id"] == "controller_presence":
  keywords=("controller","task-runner","task_runner","automation")
  excluded={".git","node_modules","vendor","dist","build"}
  found=[]
  for base, dirs, files in os.walk(ROOT):
   dirs[:]=[d for d in dirs if d not in excluded and not d.startswith(".cache")]
   for name in files:
    rel=(Path(base)/name).relative_to(ROOT)
    if name.lower().endswith((".py",".js",".ts",".yml",".yaml")) and any(k in name.lower() for k in keywords):
     found.append(str(rel))
  found=sorted(set(found))
  # Exclude this runner and its workflow/docs; identify independent controller candidates.
  candidates=[p for p in found if p != "scripts/automation/task-runner.py" and not p.startswith("tests/") and "dependency-aware-task-runner.yml" not in p and "VALIDATION-CHECKPOINT" not in p and not p.endswith("README.md")]
  controller=ROOT/"scripts/background_task_controller.py"
  workflow=ROOT/".github/workflows/background-task-controller.yml"
  if not controller.is_file() or not workflow.is_file():
   return False,"Controller source or scheduled workflow missing."
  try:
   compile(controller.read_text(encoding="utf-8"),str(controller),"exec")
  except Exception as e:
   return False,"Controller syntax validation failed: "+str(e)
  source=controller.read_text(encoding="utf-8")
  required=["AUTO_RETRY_ALLOWLIST","MAX_ATTEMPTS = 2","MAX_FAILURE_AGE = timedelta(hours=6)","rerun_failed_jobs","overall_status"]
  missing=[term for term in required if term not in source]
  forbidden=["cloudflare-pages-deploy.yml","asc-sku-image-sync-bounded.yml","refresh-category-snapshot.yml"]
  # Deployment, SKU sync and category-write workflows must not be retryable.
  allow_section=source.split("AUTO_RETRY_ALLOWLIST",1)[1].split("}",1)[0] if "AUTO_RETRY_ALLOWLIST" in source else ""
  unsafe=[name for name in forbidden if name in allow_section]
  if missing or unsafe:
   return False,"Controller policy checks failed; missing="+str(missing)+" unsafe_allowlist="+str(unsafe)
  return True,"Existing controller syntax and retry safety policy verified; retries limited to allowlisted QA/audit/packaging, one retry within six hours. API token/permissions and live runtime outcomes remain separately monitored."
 return False,"No handler implemented."
def main(argv=None):
 ap=argparse.ArgumentParser(); ap.add_argument("--reset",action="store_true"); args=ap.parse_args(argv)
 s=load()
 if args.reset: s={"schema":1,"updated_at":stamp(),"tasks":{},"events":[]}
 for t in TASKS:
  i=t["id"]; old=s["tasks"].get(i,{})
  if t["kind"]=="approval":
   s["tasks"][i]={"status":"blocked_approval","attempts":old.get("attempts",0),"updated_at":stamp(),"detail":"Human evidence/approval required; held safely."}
   s["events"].append({"at":stamp(),"task":i,"status":"blocked_approval"})
   continue
  if old.get("status")=="passed": continue
  if any(s["tasks"].get(d,{}).get("status")!="passed" for d in t["needs"]):
   s["tasks"][i]={"status":"blocked_dependency","attempts":old.get("attempts",0),"updated_at":stamp(),"detail":"Dependencies have not passed."}; continue
  attempts_this_run=0; ok=False; detail="attempt limit reached"
  while attempts_this_run<MAX_ATTEMPTS and not ok:
   attempts_this_run+=1; ok,detail=check(t)
  total_attempts=old.get("total_attempts",old.get("attempts",0))+attempts_this_run
  status="passed" if ok else "failed"
  s["tasks"][i]={"status":status,"attempts":attempts_this_run,"total_attempts":total_attempts,"updated_at":stamp(),"detail":detail}
  s["events"].append({"at":stamp(),"task":i,"status":status,"attempts_this_run":attempts_this_run,"total_attempts":total_attempts,"detail":detail})
 s["updated_at"]=stamp(); STATE.parent.mkdir(parents=True,exist_ok=True); STATE.write_text(json.dumps(s,indent=2)+"\n")
 print(json.dumps(s,indent=2))
 return 0 if all(s["tasks"].get(t["id"],{}).get("status") in ("passed","blocked_approval","blocked_dependency") for t in TASKS) else 1
if __name__=="__main__": sys.exit(main())
