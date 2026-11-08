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

ROOT = Path("suppliers/Planetworld")
OUT = Path("planetworld-audit-output")
OUT.mkdir(parents=True, exist_ok=True)

HEADER_TERMS = {
    "model": ("model", "model no", "model number", "item code", "product code", "sku", "part no", "part number", "code"),
    "description": ("description", "long description", "product description", "item description", "short description", "product name", "item name", "product title", "marketing description", "details"),
    "product_type": ("product type", "category", "product class", "type", "class"),
    "division": ("division", "business division", "product division"),
    "rrp": ("rrp", "recommended retail", "retail price", "list price", "selling price", "srp"),
    "cost": ("dealer cost", "dealer price", "net price", "cost price", "dealer", "cost", "buy price"),
    "stock": ("stock", "qty", "quantity", "availability", "on hand"),
    "brand": ("brand", "manufacturer"),
}
def norm(value):
    return re.sub(r"[^a-z0-9]+", " ", str(value or "").strip().lower()).strip()
def contains_term(text, term):
    """Match normalized whole words/phrases; avoid e.g. 'remo' matching 'remote'."""
    term = norm(term)
    if not term: return False
    if term.endswith("y") and len(term) > 1:
        pattern = re.escape(term[:-1]) + r"(?:y|ies)"
    else:
        pattern = re.escape(term) + r"(?:s|es)?"
    return re.search(rf"(?<![a-z0-9]){pattern}(?![a-z0-9])", text) is not None
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
def guess_category(brand, description, model, filename, division=""):
    text = norm(" ".join([brand, description, model, filename]))
    # Supplier Division is the primary source classification. Prevent generic
    # words such as "display", "receiver", or "remote" from moving Car Audio
    # records into Home Theatre or Musical Instruments. Explicit marine/boat
    # language remains a review-only Marine Audio signal.
    if norm(division) == "car audio":
        if any(contains_term(text, w) for w in ("marine", "boat", "nautic")):
            return "Marine Audio"
        return "Car Audio"
    rules = [
      ("Musical Instruments & Accessories", ("ibanez", "tama", "remo", "paiste", "on stage", "planetwaves", "mason", "medeli", "crossrock", "guitar", "bass guitar", "electric bass", "cymbal", "snare", "drum", "percussion", "ukulele", "mandolin", "piano bench", "keyboard bench", "powerpad")),
      ("Headsets & Conferencing", ("jabra", "jlab", "headset", "earbuds", "earbud", "panacast", "video bar", "conference phone", "speakerphone")),
      ("Robotic Vacuums & Home Care", ("roborock", "robotic vacuum", "vacuum cleaner", "pool cleaning", "skimmer")),
      ("Pool Cleaning & Outdoor", ("aiper", "pool vacuum", "robotic pool cleaner", "pool cleaner")),
      ("Home Automation & Lighting Controls", ("p5 ", "low voltage led dimmer", "smart dimmer", "ethernet relay", "dimmer and 0-10v")),
      ("Home Theatre / Hi-Fi", ("kicker kb6", "arcam", "klipsch", "onkyo", "home theatre", "home theater", "soundbar", "av receiver", "receiver", "sonos", "sonance", "m&k sound", "vogels", "hdanywhere", "denon", "hi fi", "hifi", "home audio", "projector", "mount", "display", "screen", "tv bracket", "television")),
      ("Car Audio", ("one price list", "one nav", "onenav", "onex", "oneacoustic", "kicker", "car audio", "vehicle", "car speaker", "head unit", "double din", "single din", "alpine", "jvc car", "kenwood car", "pioneer car", "focal car", "jbl car", "audison", "car amplifier", "component speaker", "coaxial", "harness", "trim kit", "android radio", "rear view monitor", "car dvr", "parking sensor", "can bus", "smart mirror")),
      ("DJ / Studio / Pro Audio", ("dj ", "mixer", "microphone", "studio", "shure", "denon dj", "wireless mic", "audio interface", "stage monitor", "pro audio", "m-audio", "zoom", "alto professional", "amplified", "dbx", "numark", "rane dj", "sound switch", "soundcraft", "line array", "pa system", "portable pa", "eon one")),
      ("Marine Audio", ("marine", "boat", "waterproof", "nautic")),
      ("Speakers", ("speaker", "loudspeaker", "woofer", "tweeter")),
      ("Cables / Accessories", ("cable", "adapter", "bracket", "mount", "remote", "accessory", "connector")),
    ]
    for label, words in rules:
        if any(contains_term(text, w) for w in words): return label
    return "REVIEW - UNCLASSIFIED"
def guess_component(division, description, model, brand=""):
    d = norm(division)
    b = norm(brand)
    t = norm(" ".join([brand, description, model]))
    if b == "kicker" and norm(model) == "51keychain": return "Excluded — Non-Audio Merchandise"
    if any(x in t for x in ("marine", "boat", "waterproof marine")): return "Marine Audio"
    if "car audio" in d:
        if model.lower().startswith("s2-s69c") or model in ("69030020", "69030021"): return "Car Speakers"
        if model.lower().startswith("9i"): return "Car Audio Accessories"
        if model.lower().startswith("on669"): return "Car Audio Accessories"
        if model.lower().startswith("on1509-cs"): return "Car Head Units & Receivers"
        if b == "kicker":
            if any(x in model.lower() for x in ("46kisload", "46pwb", "46pw", "46pkd", "47keyloc", "47kpb")): return "Car Audio Accessories"
            if any(x in model.lower() for x in ("51hs8", "hs8")): return "Car Subwoofers"
            if model.lower().startswith("51lx"): return "Car Amplifiers"
            if model.lower().startswith("47psm"): return "Car Speakers"
            if "combo" in model.lower(): return "Car Audio Packages"
        if b == "one":
            if any(x in t for x in ("rear view monitor", "car dvr", "dvr recorder", "headrest monitor")): return "Vehicle Cameras"
            if any(x in t for x in ("touch screen", "lcd display", "10.1inch to 9inch", "nissan box")): return "Car Audio Accessories"
            if any(x in t for x in ("can bus", "frame for", "fitment", "prado")): return "Vehicle Harnesses & Trims"
        if b == "pioneer car audio":
            if model.lower().startswith("dmh-"): return "Car Head Units & Receivers"
            if model.lower().startswith("ts-g"): return "Car Speakers"
        if b == "kenwood car audio" and model.lower().startswith("dmx"): return "Car Head Units & Receivers"
        if any(x in t for x in ("harness", "trim kit", "steering wheel interface", "fascia", "2-din", "2 din", "1-din", "1 din", "fitment kit", "cage kit", "frame")) or re.match(r"^(9000|9001|9002|900hil|har)", model.strip().lower()): return "Vehicle Harnesses & Trims"
        if any(x in t for x in ("head unit", "double din", "single din", "d/din", "media receiver", "media reciever", "media station", "media player", "media center", "carplay", "android auto", "infotainment", "onenav", "car stereo", "receiver")): return "Car Head Units & Receivers"
        if any(x in t for x in ("signal processor", "signal interface processor", "interface processor", "signal converter", "hilo v3", "sound processor", "bit tune", "dsp", "digital most interface", "sound solution")): return "Car DSP & Signal Processors"
        if any(x in t for x in ("door pod", "speaker pod", "speaker grille", "speaker grill", "grille", "grill")): return "Car Speaker Pods, Grilles & Enclosures"
        if any(x in t for x in ("subwoofer", "powered sub", "sub box", "sealed sub", "reflex sub", "dynamic bass tracking", "enclosure", "solo baric", "shallow subw", "shallow subw", "subw")): return "Car Subwoofers"
        if any(x in t for x in ("speaker", "speaeker", "tweeter", "midrange", "midbass", "woofer", "2way", "2 way", "wide range", "coaxial", "tower system", "s2-s69c")): return "Car Speakers"
        if "amplifier" in t or re.search(r"\bamp\b", t): return "Car Amplifiers"
        if any(x in t for x in ("parking sensor", "sensors with buzzer", "third eye")): return "Vehicle Sensors & Parking Assist"
        if "camera" in t: return "Vehicle Cameras"
        if "antenna" in t: return "Vehicle Antennas"
        if any(x in t for x in ("cable", "adapter", "adaptor", "remote", "bracket", "accessory", "accessories", "extension", "terminal", "spk out", "speaker out", "anti reflective", "anti glare", "screen protector", "protective foil", "acc cntl module", "t h set", "fuse holder", "termination block", "rca interconnect", "interconnect", "power kit", "power wire", "wire roll", "line-out converter", "line out converter", "smart-radio interface", "keychain", "license plate holder")): return "Car Audio Accessories"
        return "Car Audio - Review Component"
    if d == "musical instruments":
        if model.lower().startswith(("ber10", "k7yang")): return "Guitars & Basses"
        if model.lower().startswith(("smmini", "trmini", "tsmini", "ts808", "ts9", "ts9dx", "tsmaxi", "wh10v3")): return "Instrument Effects & Pedals"
        if model.lower().startswith(("t30ii", "t80ii")): return "Instrument Amplifiers"
        if model.lower() == "tamm002": return "Music Accessories"
        if b in ("tama", "remo", "paiste"): return "Drums & Percussion"
        if b == "mason":
            if any(x in t for x in ("cello", "tuba", "violin", "shoulder rest", "violin bridge", "slide oil", "valve oil")): return "Orchestral Instruments & Accessories"
            if any(x in t for x in ("maraca", "bongo", "conga", "cowbell", "bar chime", "agogo", "triangle", "clave", "cabasa", "kazoo")): return "Drums & Percussion"
        if b == "ibanez" and model.lower().startswith(("espr", "icc", "icgc", "ict", "ift", "igc", "imc", "isc", "isw", "m300c", "mb300c", "mf100c", "mr500c", "mr600ac", "ms100c", "mtz", "pgs", "pjt", "pul", "uta", "whs", "iabs", "iacs", "iebs", "iegs", "icls", "bigmini", "dcs50")): return "Music Accessories"
        if b == "m audio":
            if model.lower().startswith("bx"): return "PA & Studio Speakers"
            if model.lower().startswith(("air", "exh")): return "Recording & Interfaces"
            if model.lower().startswith(("keystation", "oxygen")): return "Keyboards & Synthesizers"
        if b == "numark":
            if model.lower().startswith(("cc1", "cs1")): return "Music Accessories"
            if model.lower().startswith("hf"): return "Headphones & Headsets"
            if model.lower().startswith("m6usb"): return "Mixers"
            if model.lower().startswith("mixtrack"): return "DJ Controllers & Decks"
        if b == "rane dj":
            if model.lower().startswith("magfour"): return "Music Accessories"
            return "DJ Controllers & Decks"
        if b == "zoom":
            if model.lower().startswith(("exh", "a1")): return "Recording & Interfaces" if model.lower().startswith("exh") else "Instrument Effects & Pedals"
            if model.lower().startswith(("hs-", "hws-")): return "Music Accessories"
        if b == "sound switch": return "AV Distribution & Switching"
        if b == "soundcraft": return "Mixers"
        if b == "alto professional" and model.lower().startswith("ts"): return "PA & Studio Speakers"
        if b == "shure" and model.lower().startswith("mv7"): return "Microphones"
        if b == "on stage": return "Music Accessories"
        if any(x in t for x in ("dj controller", "deck controller", "dj deck", "media player", "turntable", "cross fader")): return "DJ Controllers & Decks"
        if any(x in t for x in ("powerpad", "gig bag", "guitar bag", "guitar case", "drum bag", "stick bag", "instrument case", "instrument bag", "guitar strap", "drumstick bag", "stand", "bench", "pouch", "carry case", "cable", "adapter", "adaptor", "battery", "clip", "strap", "power supply", "psu", "accessory", "accessories", "picks", "tuner", "teardrop shape", "guitar string", "strings", "wound", "gauge", "bronze", "nylon", "replacement spring", "original double locking", "lo pro edge", "flanger pedal", "mini flanger", "headstock tuner", "planetwaves", "music stand", "microphone stand", "speaker stand")): return "Music Accessories"
        if any(x in t for x in ("guitar", "bass guitar", "electric bass", "el.5-st.bass", "bass", "ukulele", "mandolin", "banjo", "advanced acoustic", "aeg series", "ae series", "aeb series", "aewc series", "artcore series", "artwood series", "grand concert", "rg gio", "sr gio", "az essentials", "pf series", "gio series", "ga series", "gb signature", "artist series", "solid okoume", "spruce top", "gtr")) or re.match(r"^(aam|aeg|ae|aeb|aewc|ag|am|amh|ar|aw|rg|sr|az|pf|grg|sa|af|as|tmb|jem|jiva|k5|tcm|tcy|uew|iuk)[a-z0-9-]*", model.strip().lower()): return "Guitars & Basses"
        if any(x in t for x in ("drum", "cymbal", "snare", "tom tom", "tambourine", "percussion", "drumstick", "drum head", "pedal beater", "beater", "crash", "ride", "hi hat", "hi-hat", "encore pro pack", "signature dark energy")): return "Drums & Percussion"
        if any(x in t for x in ("keyboard", "piano", "synthesizer", "synth")): return "Keyboards & Synthesizers"
        if any(x in t for x in ("microphone", "mic ", "mic-", "lavali", "shotgun mic", "wireless system", "vocal system", "lav system", "bodypack transmitter", "bodypack", "transmitter", "receiver", "reciever", "shure blx", "beta58", "pg58", "sm58")): return "Microphones"
        if any(x in t for x in ("studio monitor", "powered speaker", "pa speaker", "line array", "loudspeaker", "truesonic series")): return "PA & Studio Speakers"
        if "speaker" in t or "woofer" in t: return "Speakers"
        if "amplifier" in t or "guitar amp" in t: return "Instrument Amplifiers"
        if any(x in t for x in ("mixer", "mixing console")): return "Mixers"
        if any(x in t for x in ("direct box", "pa management system")): return "Audio Processing & DI"
        if any(x in t for x in ("recorder", "audio interface", "podcast", "field recorder", "multitrack")): return "Recording & Interfaces"
        if any(x in t for x in ("headphone", "headset", "earphone", "earpad", "earpads")): return "Headphones & Headsets"
        if any(x in t for x in ("cable", "adapter", "adaptor", "battery", "case", "bag", "stand", "clip", "strap", "power supply", "psu", "accessory", "accessories")): return "Music Accessories"
        return "Musical Instruments - Review Component"
    if d in ("installed av", "home ci"):
        if model in ("1600-289", "8800-00-90", "8800-00-94", "8800-01-104"): return "Headset & Conferencing Accessories"
        if model.startswith(("2740-", "2755-", "5121-", "5131-", "5132-", "9000-")): return "Headsets & Conferencing"
        if b == "vogels": return "Mounts & Stands"
        if b == "planetwaves": return "AV Accessories"
        if b == "p5": return "Home Automation Controls"
        if b == "onkyo": return "Amplifiers & AV Processors"
        if b == "hdanywhere" and any(x in t for x in ("dac", "digital to analog converter")): return "AV Distribution & Switching"
        if any(x in t for x in ("ear cushion", "earcushion", "eargel", "ear gel", "earhook", "ear hook", "headband cushion", "headset pouch", "headset carry", "headband", "neckband", "clothing clip", "microphone cover", "battery pack", "charging pad", "charging stand", "charging cradle", "cradle", "power supply", "link ehs", "link extension", "link controller", "link", "dect", "usb-a", "usb-c", "cord", "cable", "adapter", "adaptor", "controller", "controler", "extension", "replacement", "spare", "accessory", "accessories", "pouch", "carry case", "carry pouch", "earpiece", "ear tip", "eartip", "charger", "base acc")): return "Headset & Conferencing Accessories"
        if any(x in t for x in ("headset", "earbuds", "earbud", "speakerphone", "conference phone", "panacast", "video bar", "webcam", "evolve", "engage", "biz ", "elite", "talk", "gn audio", "speak2", "perform ", "gn 2100", "mono 3 in 1", "cam crew", "cam iq", "scheduler uc")): return "Headsets & Conferencing"
        if any(x in t for x in ("hdmi", "splitter", "matrix", "zone processor", "distribution", "extender", "switcher", "switch pro", "mhub", "xtnd")): return "AV Distribution & Switching"
        if "projector" in t: return "Projectors"
        if "screen" in t: return "Screens"
        if any(x in t for x in ("mount", "bracket", "stand", "pole", "plate", "wall support", "ceiling", "pfw", "puc", "thin")): return "Mounts & Stands"
        if "soundbar" in t: return "Soundbars"
        if any(x in t for x in ("speaker", "subwoofer", "lcr", "in wall", "on wall", "surrounds", "m k", "sonance", "2-way", "2 way", "full range", "kicker kb6")): return "Installed Speakers & Subwoofers"
        if any(x in t for x in ("amplifier", "receiver", "processor", "multi zone", "avr")): return "Amplifiers & AV Processors"
        if any(x in t for x in ("cable", "adapter", "adaptor", "remote", "accessory", "accessories")): return "AV Accessories"
        return "Installed AV - Review Component"
    if d == "home retail":
        if b == "klipsch" or any(x in t for x in ("miami eua", "new york eua")): return "Consumer Audio"
        if any(x in t for x in ("pool", "vacuum", "skimmer", "robotic cleaner")): return "Pool Cleaning & Outdoor"
        if any(x in t for x in ("keyboard", "mouse", "wireless mouse")): return "Computer Accessories"
        if any(x in t for x in ("adapter", "adaptor", "charging base", "optical adapter", "hdmi arc", "line in adapter", "line-in adapter", "combo adapter")): return "Consumer Audio Accessories"
        if any(x in t for x in ("speaker", "headphone", "headset", "earbud", "earphone", "on-ear", "soundbar", "sonos", "subwoofer", "surrounds", "jbuds", "epic open sport")): return "Consumer Audio"
        return "Home Retail - Review Component"
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
                division = as_text(val("division"))
                brand = as_text(val("brand"))
                stock_indices = [i for i, h in enumerate(headers) if "stock" in norm(h) and i < len(vals)]
                stock_by_location = {headers[i]: as_text(vals[i]) for i in stock_indices}
                stock_numbers = [as_number(vals[i]) for i in stock_indices if vals[i] is not None and as_number(vals[i]) is not None]
                stock_total = sum(stock_numbers) if stock_numbers else None
                rrp, cost, stock = as_number(val("rrp")), as_number(val("cost")), as_text(val("stock"))
                flags = []
                if not model: flags.append("MISSING_MODEL_OR_SKU")
                if rrp == 0: flags.append("ZERO_RRP_REVIEW")
                if not desc: flags.append("MISSING_DESCRIPTION")
                if rrp is None: flags.append("MISSING_OR_UNMAPPED_RRP")
                if columns["cost"] is None: flags.append("COST_COLUMN_NOT_MAPPED")
                if columns["rrp"] is None: flags.append("RRP_COLUMN_NOT_MAPPED")
                if not brand: brand = path.stem.split("-price-list")[0].replace("-", " ").replace("_", " ").title()
                cat = guess_category(brand, " ".join([product_type, desc]), model, path.name, division)
                component = guess_component(division, desc, model, brand)
                proposed_1 = round(rrp * 0.99, 2) if rrp is not None else None
                proposed_2 = round(rrp * 0.98, 2) if rrp is not None else None
                cost_header = headers[columns["cost"]] if columns["cost"] is not None and columns["cost"] < len(headers) else ""
                cost_basis = "EX_VAT" if re.search(r"excl|excluding|ex vat|net", norm(cost_header)) else ("INCL_VAT" if re.search(r"incl|including|inc vat", norm(cost_header)) else "UNKNOWN")
                cost_incl_vat = round(cost * 1.15, 2) if cost is not None and cost_basis == "EX_VAT" else (cost if cost is not None and cost_basis == "INCL_VAT" else None)
                margin_1 = round(proposed_1 - cost_incl_vat, 2) if proposed_1 is not None and cost_incl_vat is not None else None
                margin_2 = round(proposed_2 - cost_incl_vat, 2) if proposed_2 is not None and cost_incl_vat is not None else None
                if rrp is not None and rrp > 0 and margin_1 is not None and margin_1 < 0: flags.append("RRP_MINUS_1_BELOW_ESTIMATED_COST_INCL_VAT")
                if rrp is not None and rrp > 0 and margin_2 is not None and margin_2 < 0: flags.append("RRP_MINUS_2_BELOW_ESTIMATED_COST_INCL_VAT")
                extracted.append({
                    "source_file": rel, "sheet": ws.title, "source_row": row_num,
                    "brand": brand, "model_or_sku": model, "supplier_division_source_value": division, "product_type_source_value": product_type, "description": desc,
                    "component_guess_review_only": component,
                    "all_source_headers_json": json.dumps(headers, ensure_ascii=False),
                    "all_source_values_json": json.dumps([as_text(v) for v in vals], ensure_ascii=False),
                    "rrp_source_header": headers[columns["rrp"]] if columns["rrp"] is not None and columns["rrp"] < len(headers) else "",
                    "rrp_source_value": as_text(val("rrp")), "rrp_numeric": rrp,
                    "cost_source_header": cost_header, "cost_source_value": as_text(val("cost")), "cost_numeric": cost,
                    "cost_vat_basis_detected": cost_basis, "estimated_cost_incl_vat": cost_incl_vat,
                    "stock_source_value_selected_column": stock, "stock_by_location_json": json.dumps(stock_by_location, ensure_ascii=False), "stock_total_known_locations_review_only": stock_total, "category_guess_review_only": cat,
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
                "mapped_product_type_column": headers[columns["product_type"]] if columns["product_type"] is not None and columns["product_type"] < len(headers) else "",
                "all_source_headers_json": json.dumps(headers, ensure_ascii=False),
                "mapped_rrp_column": headers[columns["rrp"]] if columns["rrp"] is not None and columns["rrp"] < len(headers) else "",
                "mapped_cost_column": headers[columns["cost"]] if columns["cost"] is not None and columns["cost"] < len(headers) else "",
                "mapped_stock_column": headers[columns["stock"]] if columns["stock"] is not None and columns["stock"] < len(headers) else "",
                "mapped_brand_column": headers[columns["brand"]] if columns["brand"] is not None and columns["brand"] < len(headers) else "",
                "data_rows_scanned": data_count,
            })
        wb.close()
    except Exception as e:
        errors.append({"source_file": rel, "error": f"{type(e).__name__}: {e}"})

# Duplicate model/SKU flags are calculated after identical product-data duplicate workbooks are identified, so repeated rows in a duplicate workbook do not create false positives.\n
# Detect different XLSX files that contain identical product-row data even when
# workbook metadata makes their binary SHA-256 hashes differ.
by_file = {}
for row in extracted:
    by_file.setdefault(row["source_file"], []).append((
        norm(row["model_or_sku"]), norm(row["description"]), row["rrp_source_value"],
        row["cost_source_value"], row["stock_by_location_json"], row["all_source_values_json"]
    ))
def preferred_source(filename):
    return 0 if not re.search(r"\s*\(\d+\)\.xlsx$", filename, re.I) else 1
signature_groups = {}
for filename, records in by_file.items():
    signature = tuple(sorted(records))
    signature_groups.setdefault(signature, []).append(filename)
identical_product_data_file_groups = []
for group in signature_groups.values():
    if len(group) > 1:
        keep = sorted(group, key=lambda x: (preferred_source(x), x))[0]
        duplicates = [x for x in sorted(group) if x != keep]
        identical_product_data_file_groups.append({"retained_source": keep, "duplicate_sources": duplicates})
        for row in extracted:
            if row["source_file"] in duplicates:
                row["quality_flags"] = ";".join(filter(None, [row["quality_flags"], "IDENTICAL_PRODUCT_DATA_DUPLICATE_WORKBOOK"]))

# Recalculate duplicate model/SKU flags using only retained source workbooks.
# Keep '+' meaningful: KT7800 and KT7800+ are distinct models, as are Q7 TF B/W
# and Q7 TF+ B/W (the latter also includes an auto-empty dock).
duplicate_sources = {
    source for group in identical_product_data_file_groups
    for source in group["duplicate_sources"]
}
def duplicate_model_key(value):
    value = str(value or "").strip().lower()
    value = re.sub(r"[^a-z0-9+]+", " ", value)
    return re.sub(r"\s+", " ", value).strip()
for row in extracted:
    row["quality_flags"] = ";".join(
        flag for flag in row["quality_flags"].split(";")
        if flag and flag != "DUPLICATE_MODEL_OR_SKU_CROSS_SOURCE"
    )
eligible_keys = [
    duplicate_model_key(row["model_or_sku"])
    for row in extracted
    if row["source_file"] not in duplicate_sources and duplicate_model_key(row["model_or_sku"])
]
counts = Counter(eligible_keys)
for row in extracted:
    key = duplicate_model_key(row["model_or_sku"])
    if row["source_file"] not in duplicate_sources and key and counts[key] > 1:
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
# Sanitized Car Audio-only review dataset: no dealer cost, RRP, stock or margin fields.
car_audio_review_fields = [
    "source_file", "sheet", "source_row", "brand", "model_or_sku", "description",
    "category_guess_review_only", "component_guess_review_only", "review_status",
]
car_audio_review_rows = [
    {
        "source_file": r["source_file"], "sheet": r["sheet"], "source_row": r["source_row"],
        "brand": r["brand"], "model_or_sku": r["model_or_sku"], "description": r["description"],
        "category_guess_review_only": r["category_guess_review_only"],
        "component_guess_review_only": r["component_guess_review_only"],
        "review_status": "MODEL_IMAGE_FEATURE_AND_GW_SKU_VERIFICATION_REQUIRED",
    }
    for r in extracted if norm(r["supplier_division_source_value"]) == "car audio"
]
with (OUT / "car_audio_review_only.csv").open("w", newline="", encoding="utf-8-sig") as f:
    w = csv.DictWriter(f, fieldnames=car_audio_review_fields, extrasaction="ignore")
    w.writeheader(); w.writerows(car_audio_review_rows)

# Price-risk counts intentionally exclude zero-RRP owner-hold rows and rows from
# identical product-data duplicate workbooks; those are separate review queues.
price_risk_rows = [r for r in extracted if r["source_file"] not in duplicate_sources and r["rrp_numeric"] is not None and float(r["rrp_numeric"]) > 0]
summary = {
  "source_root": ROOT.as_posix(), "xlsx_files_found": len(files),
  "sheets_scanned": len(inventory), "rows_extracted": len(extracted),
  "workbooks_with_errors": len(errors),
  "identical_workbook_hash_groups": [g for g in (lambda d: [[k, sorted(set(v))] for k, v in d.items() if len(set(v)) > 1])(dict((h, [x["source_file"] for x in inventory if x["source_file_sha256"] == h]) for h in set(x["source_file_sha256"] for x in inventory)))],
  "identical_product_data_file_groups": identical_product_data_file_groups,
  "rows_missing_model_or_sku": sum("MISSING_MODEL_OR_SKU" in r["quality_flags"] for r in extracted),
  "rows_missing_or_unmapped_rrp": sum("MISSING_OR_UNMAPPED_RRP" in r["quality_flags"] for r in extracted),
  "rows_with_zero_rrp": sum("ZERO_RRP_REVIEW" in r["quality_flags"] for r in extracted),
  "rows_where_rrp_minus_1pct_is_below_estimated_cost_incl_vat": sum("RRP_MINUS_1_BELOW_ESTIMATED_COST_INCL_VAT" in r["quality_flags"] for r in price_risk_rows),
  "rows_where_rrp_minus_2pct_is_below_estimated_cost_incl_vat": sum("RRP_MINUS_2_BELOW_ESTIMATED_COST_INCL_VAT" in r["quality_flags"] for r in price_risk_rows),
  "price_risk_count_scope": "positive-RRP rows only, excluding identical product-data duplicate workbooks; zero-RRP rows are a separate owner-hold queue",
  "rows_from_identical_duplicate_workbooks": sum("IDENTICAL_PRODUCT_DATA_DUPLICATE_WORKBOOK" in r["quality_flags"] for r in extracted),
  "rows_with_duplicate_model_or_sku": sum("DUPLICATE_MODEL_OR_SKU_CROSS_SOURCE" in r["quality_flags"] for r in extracted),
  "supplier_division_counts": dict(Counter(r["supplier_division_source_value"] or "MISSING DIVISION" for r in extracted)),
  "component_guess_counts": dict(Counter(r["component_guess_review_only"] for r in extracted)),
  "category_guess_counts": dict(Counter(r["category_guess_review_only"] for r in extracted)),
  "important": "Supplier Division is retained as the primary source classification; component guesses are heuristic. Regional stock fields are preserved and summed for review only. RRP source values appear VAT-inclusive and dealer costs marked Excl are VAT-exclusive; cost comparison multiplies detected EX_VAT cost by 1.15. Figures are review-only and exclude overheads; no catalogue, price, or stock changes are performed."
}
(OUT / "summary.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")
print(json.dumps(summary, indent=2))
# Emit only sanitized Car Audio identity/category fields for retrieval if artifact storage is full.
print("GW_CAR_AUDIO_ROWS_JSON_BEGIN")
print(json.dumps(car_audio_review_rows, ensure_ascii=False, separators=(",", ":")))
print("GW_CAR_AUDIO_ROWS_JSON_END")
if errors: print("Some workbooks failed; see workbook_errors.csv", file=sys.stderr)

# 2026-10-29: emit sanitized Car Audio review rows for recovery when Actions artifact storage is unavailable.
