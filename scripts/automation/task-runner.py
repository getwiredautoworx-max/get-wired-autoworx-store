#!/usr/bin/env python3
"""Safe dependency-aware runner for staging-only store checks."""
import argparse, json, os, sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
STATE = Path(os.environ.get("TASK_RUNNER_STATE", ROOT / ".task-runner-state.json"))
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
  paths=["scripts/automation/controller.py","scripts/automation/controller.js","scripts/task-controller.py","scripts/task-controller.js",".github/scripts/controller.py",".github/scripts/controller.js"]
  found=[p for p in paths if (ROOT/p).is_file()]
  return (True,"Controller candidate(s): "+", ".join(found)) if found else (False,"No known controller entry point found; identify the canonical controller before validation.")
 return False,"No handler implemented."
def main():
 ap=argparse.ArgumentParser(); ap.add_argument("--reset",action="store_true"); args=ap.parse_args()
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
