#!/usr/bin/env python3
"""Read-only Planetworld XLSX inventory and field-mapping audit.

Reads supplier workbooks without changing them. Outputs review-only CSV/JSON files.
No live catalogue import, pricing update, stock update, or image download is performed.
"""
from __future__ import annotations
import csv, hashlib, json, re, sys
from collections import Counter
from pathlib import Path
from openpyxl import load_workbook

ROOT = Path("catalogue-source/suppliers/planetworld/incoming-xlsx")
OUT = Path("planetworld-audit-output")
OUT.mkdir(parents=True, exist_ok=True)

HEADER_TERMS = {
    "model": ("model", "model no", "model number", "item code", "product code", "sku", "part no", "part number", "code"),
    "description": ("description", "long description", "product description", "item description", "short description", "product name", "item name", "product title", "marketing description", "details"),
    "product_type": ("product type", "category", "product class", "type", "class"),
    "rrp": ("rrp", "recommended retail", "retail price", "list price", "selling price", "srp"),
    "cost": ("dealer cost", "dealer price", "net price", "cost price", "dealer", "cost", "buy price"),
    "stock": ("stock", "qty", "quantity", "availability", "on hand"),
    "brand": ("brand", "manufacturer"),
}
def norm(value):
    return re.sub(r"[^a-z0-9]+", " ", str(value or "").strip().lower()).strip()
def as_text(value):
    if value is None: return ""
    if isinstance(value, float) and value.is_integer(): return str(int(value))
    return str(value).strip()
def as_number(value):
    if isinstance(value, (int, float)): return float(value)
    s = str(value or "").strip().replace("R", "").replace("$", "").replace("€", "").replace("£", "")
    s = s.replace("\u00a0", "").replace(" ", "")
    if not s: return None
    if "," in s and "." in s:
        if s.rfind(",") > s.rfind("."): s = s.replace(".", "").replace(",", ".")
        else: s = s.replace(",", "")
    elif "," in s:
        tail = s.rsplit(",", 1)[-1]
        s = s.replace(",", ".") if len(tail) in (1, 2) else s.replace(",", "")
    s = re.sub(r"[^0-9.\-]", "", s)
    try: return float(s) if s not in ("", ".", "-", "-.") else None
    except ValueError: return None
def field_score(header, terms):
    h = norm(header)
    for i, term in enumerate(terms):
        t = norm(term)
        if h == t: return 100 - i
    for i, term in enumerate(terms):
        t = norm(term)
        if t and (t in h or h in t and len(h) > 2): return 70 - i
    return 0
def guess_category(brand, description, model, filename):
    text = norm(" ".join([brand, description, model, filename]))
    rules = [
      ("DJ / Studio / Pro Audio", ("dj ", "mixer", "microphone", "studio", "shure", "denon dj", "ibanez", "wireless mic", "drum", "guitar", "keyboard", "midi", "audio interface", "stage monitor", "pro audio")),
      ("Home Theatre / Hi-Fi", ("home theatre", "home theater", "soundbar", "av receiver", "receiver", "sonos", "denon", "hi fi", "hifi", "home audio", "projector", "mount", "display", "screen", "tv bracket", "television")),
      ("Marine Audio", ("marine", "boat", "waterproof", "nautic")),
      ("Car Audio", ("car audio", "vehicle", "car speaker", "head unit", "double din", "single din", "alpine", "jvc car", "kenwood car", "pioneer car", "focal car", "jbl car", "audison", "car amplifier", "component speaker", "coaxial", "harness", "trim kit")),
      ("Speakers", ("speaker", "loudspeaker", "woofer", "tweeter")),
      ("Cables / Accessories", ("cable", "adapter", "bracket", "mount", "remote", "accessory", "connector")),
    ]
    for label, words in rules:
        if any(norm(w) in text for w in words): return label
    return "REVIEW - UNCLASSIFIED"
def choose_column(headers, kind):
    ranked = sorted(((field_score(h, HEADER_TERMS[kind]), i) for i, h in enumerate(headers)), reverse=True)
    return ranked[0][1] if ranked and ranked[0][0] > 0 else None
inventory, extracted, errors = [], [], []
files = sorted(p for p in ROOT.rglob("*") if p.is_file() and p.suffix.lower() == ".xlsx" and not p.name.startswith("~$"))
for path in files:
    rel = path.as_posix()
    try:
        wb = load_workbook(path, read_only=True, data_only=True)
        total_data_rows = 0
        sheet_names = []
        for ws in wb.worksheets:
            sheet_names.append(ws.title)
            preview = list(ws.iter_rows(min_row=1, max_row=min(ws.max_row or 1, 20), values_only=True))
            header_i, headers, best = 0, [], -1
            for ri, row in enumerate(preview):
                vals = [as_text(v) for v in row]
                score = sum(1 for v in vals if any(field_score(v, ts) > 0 for ts in HEADER_TERMS.values()))
                if score > best:
                    header_i, headers, best = ri, vals, score
            columns = {k: choose_column(headers, k) for k in HEADER_TERMS}
            data_count = 0
            for row_num, row in enumerate(ws.iter_rows(min_row=header_i + 2, values_only=True), start=header_i + 2):
                vals = list(row)
                if not any(v is not None and str(v).strip() for v in vals): continue
                data_count += 1
                def val(kind):
                    idx = columns[kind]
                    return vals[idx] if idx is not None and idx < len(vals) else None
                model, desc = as_text(val("model")), as_text(val("description"))
                product_type = as_text(val("product_type"))
                brand = as_text(val("brand"))
                rrp, cost, stock = as_number(val("rrp")), as_number(val("cost")), as_text(val("stock"))
                flags = []
                if not model: flags.append("MISSING_MODEL_OR_SKU")
                if not desc: flags.append("MISSING_DESCRIPTION")
                if rrp is None: flags.append("MISSING_OR_UNMAPPED_RRP")
                if columns["cost"] is None: flags.append("COST_COLUMN_NOT_MAPPED")
                if columns["rrp"] is None: flags.append("RRP_COLUMN_NOT_MAPPED")
                if not brand: brand = path.stem.split("-price-list")[0].replace("-", " ").replace("_", " ").title()
                cat = guess_category(brand, " ".join([product_type, desc]), model, path.name)
                proposed_1 = round(rrp * 0.99, 2) if rrp is not None else None
                proposed_2 = round(rrp * 0.98, 2) if rrp is not None else None
                cost_header = headers[columns["cost"]] if columns["cost"] is not None and columns["cost"] < len(headers) else ""
                cost_basis = "EX_VAT" if re.search(r"excl|excluding|ex vat|net", norm(cost_header)) else ("INCL_VAT" if re.search(r"incl|including|inc vat", norm(cost_header)) else "UNKNOWN")
                cost_incl_vat = round(cost * 1.15, 2) if cost is not None and cost_basis == "EX_VAT" else (cost if cost is not None and cost_basis == "INCL_VAT" else None)
                margin_1 = round(proposed_1 - cost_incl_vat, 2) if proposed_1 is not None and cost_incl_vat is not None else None
                margin_2 = round(proposed_2 - cost_incl_vat, 2) if proposed_2 is not None and cost_incl_vat is not None else None
                extracted.append({
                    "source_file": rel, "sheet": ws.title, "source_row": row_num,
                    "brand": brand, "model_or_sku": model, "product_type_source_value": product_type, "description": desc,
                    "all_source_headers_json": json.dumps(headers, ensure_ascii=False),
                    "all_source_values_json": json.dumps([as_text(v) for v in vals], ensure_ascii=False),
                    "rrp_source_header": headers[columns["rrp"]] if columns["rrp"] is not None and columns["rrp"] < len(headers) else "",
                    "rrp_source_value": as_text(val("rrp")), "rrp_numeric": rrp,
                    "cost_source_header": cost_header, "cost_source_value": as_text(val("cost")), "cost_numeric": cost,
                    "cost_vat_basis_detected": cost_basis, "estimated_cost_incl_vat": cost_incl_vat,
                    "stock_source_value": stock, "category_guess_review_only": cat,
                    "rrp_minus_1pct_review_only": proposed_1, "rrp_minus_2pct_review_only": proposed_2,
                    "estimated_difference_vs_cost_incl_vat_at_minus_1": margin_1, "estimated_difference_vs_cost_incl_vat_at_minus_2": margin_2,
                    "quality_flags": ";".join(flags),
                })
            total_data_rows += data_count
            inventory.append({
                "source_file": rel, "source_file_sha256": hashlib.sha256(path.read_bytes()).hexdigest(), "sheet": ws.title, "max_rows_reported": ws.max_row,
                "max_columns_reported": ws.max_column, "detected_header_row": header_i + 1,
                "header_score": best, "mapped_model_column": headers[columns["model"]] if columns["model"] is not None and columns["model"] < len(headers) else "",
                "mapped_description_column": headers[columns["description"]] if columns["description"] is not None and columns["description"] < len(headers) else "",
                "mapped_rrp_column": headers[columns["rrp"]] if columns["rrp"] is not None and columns["rrp"] < len(headers) else "",
                "mapped_cost_column": headers[columns["cost"]] if columns["cost"] is not None and columns["cost"] < len(headers) else "",
                "mapped_stock_column": headers[columns["stock"]] if columns["stock"] is not None and columns["stock"] < len(headers) else "",
                "mapped_brand_column": headers[columns["brand"]] if columns["brand"] is not None and columns["brand"] < len(headers) else "",
                "data_rows_scanned": data_count,
            })
        wb.close()
    except Exception as e:
        errors.append({"source_file": rel, "error": f"{type(e).__name__}: {e}"})

# Duplicate model flags across all files; source rows remain unmodified.
counts = Counter(norm(r["model_or_sku"]) for r in extracted if norm(r["model_or_sku"]))
for row in extracted:
    key = norm(row["model_or_sku"])
    if key and counts[key] > 1:
        row["quality_flags"] = ";".join(filter(None, [row["quality_flags"], "DUPLICATE_MODEL_OR_SKU_CROSS_SOURCE"]))
def write_csv(name, rows):
    path = OUT / name
    if not rows:
        path.write_text("", encoding="utf-8")
        return
    with path.open("w", newline="", encoding="utf-8-sig") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()), extrasaction="ignore")
        w.writeheader(); w.writerows(rows)
write_csv("workbook_sheet_inventory.csv", inventory)
write_csv("product_rows_review_only.csv", extracted)
write_csv("workbook_errors.csv", errors)
summary = {
  "source_root": ROOT.as_posix(), "xlsx_files_found": len(files),
  "sheets_scanned": len(inventory), "rows_extracted": len(extracted),
  "workbooks_with_errors": len(errors),
  "identical_workbook_hash_groups": [g for g in (lambda d: [[k, v] for k, v in d.items() if len(v) > 1])(dict((h, [x["source_file"] for x in inventory if x["source_file_sha256"] == h]) for h in set(x["source_file_sha256"] for x in inventory)))],
  "rows_missing_model_or_sku": sum("MISSING_MODEL_OR_SKU" in r["quality_flags"] for r in extracted),
  "rows_missing_or_unmapped_rrp": sum("MISSING_OR_UNMAPPED_RRP" in r["quality_flags"] for r in extracted),
  "rows_with_duplicate_model_or_sku": sum("DUPLICATE_MODEL_OR_SKU_CROSS_SOURCE" in r["quality_flags"] for r in extracted),
  "category_guess_counts": dict(Counter(r["category_guess_review_only"] for r in extracted)),
  "important": "RRP source values appear VAT-inclusive and dealer costs marked Excl are VAT-exclusive; cost comparison multiplies detected EX_VAT cost by 1.15. Figures are review-only and exclude overheads; no catalogue, price, or stock changes are performed."
}
(OUT / "summary.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")
print(json.dumps(summary, indent=2))
if errors: print("Some workbooks failed; see workbook_errors.csv", file=sys.stderr)
