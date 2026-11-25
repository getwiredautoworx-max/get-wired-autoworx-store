"""Enrich preview catalogue without changing approved prices, stock, images or identities."""
import json,re,collections
from pathlib import Path
ROOT=Path("pages-public")
DATA=ROOT/"assets/audio-catalogue-primary-preview.json"
# Explicit model-specific manufacturer evidence. Preserve differences between RMS and maximum ratings.
SPECS={
("Alpine","BBX-F1200"):("https://www.alpine.co.uk/p/Products/SingleView/BBX-F1200",{"Channels":"4","RMS at 4 ohms":"4 × 50 W","RMS at 2 ohms":"4 × 70 W","Bridged RMS at 4 ohms":"2 × 130 W","Filters":"Variable high-pass and low-pass, 50–500 Hz"}),
("JVC","CS-DR162"):("https://www.jvc.com/usa/car-entertainment/speakers/cs-dr162/",{"Speaker type":"6.5-inch 2-way coaxial","RMS power handling":"50 W","Peak power handling":"300 W","Impedance":"4 ohms","Sensitivity":"88 dB","Frequency response":"88 Hz–22 kHz","Mounting depth":"44 mm"}),
("Kenwood","KDC-1040U"):("https://www.kenwood.com/ae/car/receiver/kdc-1040u/",{"Playback":"CD, USB; FLAC, WAV, MP3, WMA","Inputs":"Front USB and AUX","Preout":"1 × 2.5 V","Equalizer":"3-band","Faceplate":"Detachable","Android playback":"USB AOA2 on compatible devices"}),
("Pioneer","DMH-AP6650BT"):("https://pioneercarentertainment.com/products/dmh-ap6650bt/",{"Display":"9-inch touchscreen","Connectivity":"Bluetooth, Wi-Fi, USB","Apple CarPlay":"Wired and wireless","Android Auto":"Wired and wireless","WebLink Cast":"Wired"}),
("Kicker","46CXA4001"):("https://www.kicker.com/CXA4001-400-Watt-Mono-Class-D-Subwoofer-Amp",{"Amplifier type":"Mono Class D","Power at 4 ohms":"150 W × 1","Power at 2 ohms":"300 W × 1","Power at 1 ohm":"400 W × 1","Frequency response":"25–200 Hz","Low-pass crossover":"50–200 Hz, 12 dB/octave","Subsonic filter":"25 Hz, 24 dB/octave","Bass boost":"0–6 dB at 40 Hz","Input sensitivity":"125 mV–5 V low level; 1–40 V high level","Signal-to-noise ratio":">95 dB"}),
("Kicker","47KEY5001"):("https://www.kicker.com/key-5001-1-channel-smart-amplifier",{"Amplifier type":"Mono smart amplifier","RMS at 4 ohms":"150 W","RMS at 2 ohms":"300 W","RMS at 1 ohm":"500 W","Frequency response":"10–160 Hz","Low-pass filter":"40–160 Hz","High-pass filter":"10–40 Hz","Input sensitivity":"1–40 V high level; 125 mV–5 V low level","Signal-to-noise ratio":">90 dB A-weighted"}),
("Audison","69010021"):("https://audison.com/product/av-1-1-ii/",{"Model":"AV 1.1 II","Type":"Tweeter","Diameter":"28 mm","Peak power (filtered)":"180 W","Impedance":"4 ohms","Dome":"Tetolon soft dome","Upper frequency extension":"40 kHz"}),
("Audison","69020021"):("https://audison.com/product/av-3-0-ii/",{"Model":"AV 3.0 II","Type":"Midrange","Diameter":"70 mm","Peak power":"100 W","Impedance":"4 ohms","Cone":"Pressed paper with cotton fibres","Grille":"Black mesh metal"}),
("Audison","69030021"):("https://audison.com/product/av-6-5-p-ii/",{"Model":"AV 6.5 P II","Type":"Mid-bass woofer","Diameter":"165 mm","RMS power handling":"150 W","Peak power":"300 W","Impedance":"4 ohms","Voice coil":"40 mm"}),
("Hertz","78242015"):("https://hertz-audio.com/product/cp-5-1k/",{"Model":"CP 5.1K","Channels":"5","Class":"D","RMS at 4 ohms":"4 × 80 W + 1 × 330 W","RMS at 2 ohms":"4 × 130 W + 1 × 510 W","Minimum impedance in 5-channel mode":"2 ohms","Inputs":"High and low level","Supply":"11–15 V DC","Fuses":"2 × 30 A","Adjustable crossover":"Yes"}),
}
def title_facts(title):
    # Extract only explicit title facts. Never infer RMS from watts, features from model codes,
    # or connectivity from generic generated marketing descriptions.
    facts={}
    patterns=[
      ("RMS power as listed",r"\b(?:\d+(?:\.\d+)?\s*(?:W|watts?)\s*RMS|RMS\s*\d+(?:\.\d+)?\s*(?:W|watts?))\b"),
      ("Peak/max power as listed",r"\b(?:\d+(?:\.\d+)?\s*(?:W|watts?)\s*(?:peak|max)|(?:peak|max)\s*\d+(?:\.\d+)?\s*(?:W|watts?))\b"),
      ("Power rating as listed (RMS/peak unspecified)",r"\b\d+(?:\.\d+)?\s*(?:W|watts?)\b"),
      ("Impedance as listed",r"\b\d+(?:\.\d+)?\s*[- ]?(?:ohms?|Ω)(?=\W|$)"),
      ("Size as listed",r"\b\d+(?:\.\d+)?\s*[- ]?(?:inches|inch|mm|cm)\b"),
      ("Channels as listed",r"\b\d+\s*[- ]?(?:channels?|ch)\b"),
      ("Speaker configuration as listed",r"\b[234]\s*[- ]?way\b"),
      ("Installation format as listed",r"\b[12]\s*[- ]?din\b"),
      ("Amplifier class as listed",r"\bclass\s*[- ]?(?:D|AB|A/B)\b"),
    ]
    for name,pattern in patterns:
        if name.startswith("Power rating") and any(x.startswith(("RMS power","Peak/max")) for x in facts): continue
        matches=list(dict.fromkeys(m.group(0).strip() for m in re.finditer(pattern,title,re.I)))
        if matches: facts[name]="; ".join(matches)
    # Do not classify a cable, remote or adapter as supporting the feature itself.
    # Instead expose literal product-title feature words with source wording.
    features=[]
    for pattern in (r"\bBluetooth\b",r"\bUSB\b",r"\bApple CarPlay\b",r"\bAndroid Auto\b",r"\bWi[- ]?Fi\b",r"\bAUX\b",r"\bHDMI\b",r"\bDAB\+?",r"\bcoaxial\b",r"\bdual voice coil\b"):
        m=re.search(pattern,title,re.I)
        if m: features.append(m.group(0))
    if features: facts["Features mentioned in supplier title"]=", ".join(features)
    return facts

def main():
    assert json.loads((ROOT/"qa-build-result.json").read_text())["preview_only"] is True
    d=json.loads(DATA.read_text()); records=d["records"]; assert len(records)==693
    before=json.loads(json.dumps(records))
    coverage=collections.Counter()
    evidence_file=Path("/tmp/planetworld-spec-evidence.json")
    external=json.loads(evidence_file.read_text()) if evidence_file.exists() else {}
    for p in records:
        key=(p["brand"],p["modelNumber"])
        source,facts=SPECS.get(key,("",{}))
        supplied=title_facts(p["title"])
        evidence=external.get(p.get("getWiredSku") or ("Kicker:"+p["modelNumber"]),{})
        if not facts and evidence.get("facts") and evidence.get("source"):
            source=evidence["source"]; facts=evidence["facts"]
            # External technical tables require review before being represented as fully verified.
            external_candidate=True
        else:
            external_candidate=False
        if p.get("component") in ("Trims","Harnesses"):
            fit=re.search(r"\b(?:frame|fitment kit|fascia|trim|harness|adapter|adaptor)\s+(?:for\s+)?(.+)",p["title"],re.I)
            if fit and re.search(r"\b(?:Toyota|Ford|Mazda|Suzuki|Nissan|Isuzu|BMW|Audi|VW|Volkswagen|Kia|Hyundai|Mitsubishi|Honda|Mercedes|Merc|GWM|Jeep|Mahindra)\b",fit.group(1),re.I):
                supplied["Vehicle application as listed"]=fit.group(1).strip(" -")
        combined=dict(supplied); combined.update(facts)
        combined={"Supplier model / SKU":p["modelNumber"],"Product type":p.get("component","Car audio"),**combined}
        p["technicalSpecifications"]=[{"label":k,"value":v} for k,v in combined.items()]
        p["specificationSource"]=source or ("Supplier workbook product title" if supplied else "")
        p["specificationStatus"]="exact_model_source_pending_review" if external_candidate else ("manufacturer_verified" if facts else ("supplier_title_only" if supplied else "pending"))
        coverage[p["specificationStatus"]]+=1
    for a,b in zip(before,records):
        assert all(b[k]==v for k,v in a.items()),a["modelNumber"]
    assert coverage["manufacturer_verified"]==len(SPECS),coverage
    assert sum(coverage.values())==693
    DATA.write_text(json.dumps(d,ensure_ascii=False))
    p=ROOT/"preview-audio-products.html"
    s=p.read_text()
    anchor="body.append(title,meta,desc,price);"
    assert anchor in s
    s=s.replace(anchor,'''body.append(title,meta,desc);const specs=document.createElement('section');specs.className='technicalSpecs';const sh=document.createElement('h4');sh.textContent='Technical specifications & features';specs.append(sh);const fields=Array.isArray(p.technicalSpecifications)?p.technicalSpecifications:[];if(fields.length){const dl=document.createElement('dl');fields.forEach(f=>{const dt=document.createElement('dt');dt.textContent=f.label;const dd=document.createElement('dd');dd.textContent=f.value;dl.append(dt,dd)});specs.append(dl)}const note=document.createElement('small');note.textContent=p.specificationStatus==='manufacturer_verified'?'Manufacturer specifications':p.specificationStatus==='exact_model_source_pending_review'?'Exact-model source — technical review pending':p.specificationStatus==='supplier_title_only'?'Supplier title information — full specifications pending':'Full technical specifications pending verification';specs.append(note);if(['manufacturer_verified','exact_model_source_pending_review'].includes(p.specificationStatus)&&p.specificationSource){const a=document.createElement('a');a.href=p.specificationSource;a.target='_blank';a.rel='noopener noreferrer';a.textContent='Product specification source';specs.append(document.createElement('br'),a)}body.append(specs,price);''')
    s=s.replace("</style>",".technicalSpecs{margin:12px 0;padding:12px;border:1px solid #d4e0e9;border-radius:9px;background:#f7fafc}.technicalSpecs h4{margin:0 0 8px;font-size:14px}.technicalSpecs dl{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:6px 12px;margin:0 0 8px;font-size:13px}.technicalSpecs dt{font-weight:700}.technicalSpecs dd{margin:0;overflow-wrap:anywhere}.technicalSpecs small{color:#56748c}.technicalSpecs a{font-size:12px}</style>",1)
    p.write_text(s)
    print("SPECIFICATION_COVERAGE",json.dumps(dict(coverage)),flush=True)
if __name__=="__main__": main()
