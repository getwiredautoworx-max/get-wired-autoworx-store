const fs = require('node:fs');
const html = fs.readFileSync('preview-store.html','utf8');
const required = [
  ["ASC_CATALOGUE_CHILDREN", "ASC family navigation data"],
  ["Automotive Sensors", "sensor category"],
  ["Automotive Switches", "switch category"],
  ["Automotive Globes & Lighting", "globe and lighting category"],
  ["Fuel Pumps", "fuel pump category"],
  ["Aerials", "aerial category"],
  ["Car Mats", "car mats category"],
  ["Vehicle-Specific Aerials", "aerial subcategory from source contents"],
  ["Crankshaft & Camshaft Position Sensors", "sensor subcategory from source contents"],
  ["Ignition Switches & Barrel Sets", "switch subcategory from source contents"],
  ["HID Globes, Kits & Ballasts", "globe subcategory from source contents"],
  ["Carpet Mat Sets — Toyota", "vehicle-specific mat subcategory"],
  ["Electric Fuel Pumps — BMW", "vehicle-specific fuel-pump subcategory"],
  ["Diesel Lift Pumps & Housings — All Makes", "diesel lift-pump subcategory"],
  ["ascQueryMatches", "AND/OR catalogue product matching"],
  ["data-asc-query", "virtual catalogue filter controls"],
  ["openAscCatalogueCategory", "catalogue category interaction"],
  ["wrap.classList.toggle('open')", "expandable root-category navigation"],
  ["No matching active store listings have been verified yet", "honest empty-state messaging"]
];
for (const [needle,label] of required) {
  if (!html.includes(needle)) throw new Error("Missing " + label + " (" + needle + ")");
}
const objectStart=html.indexOf("const ASC_CATALOGUE_CHILDREN");
const objectEnd=html.indexOf("};",objectStart);
const taxonomy=html.slice(objectStart,objectEnd);
const expected = [
  ["'6cc56033-b0a9-4f25-b207-aeeb341a1c47'", ["Fuel Pumps"]],
  ["'f7f2ea3b-f15d-46a7-920b-9d3d9a394c79'", ["Vehicle-Specific Aerials"]],
  ["'3a1191ad-5fb8-4eb1-9ec0-6ddc598ea272'", ["Crankshaft & Camshaft Position Sensors"]],
  ["'2cb1bdff-652a-4aa5-9b06-b85d3ec44191'", ["Ignition Switches & Barrel Sets"]],
  ["'cfd3e001-9292-459f-b0e5-9502f160eb5c'", ["HID Globes, Kits & Ballasts"]],
  ["'c910bc35-2f87-465e-b7c5-f6b27c133146'", ["Carpet Mat Sets — Toyota"]],
  ["'asc-fuel-pumps'", ["Electric Fuel Pumps — BMW", "Diesel Lift Pumps & Housings — All Makes"]]
];
for (const [parent,labels] of expected) {
  const start=taxonomy.indexOf(parent);
  if(start<0) throw new Error("Missing ASC catalogue parent mapping "+parent);
  const next=taxonomy.indexOf("\n '",start+parent.length);
  const block=taxonomy.slice(start,next<0?taxonomy.length:next);
  for(const label of labels) if(!block.includes(label)) throw new Error(label+" is not nested under expected existing category "+parent);
}
for (const [root,labels] of expected) {
  const i=html.indexOf(root,html.indexOf("const ASC_CATALOGUE_CHILDREN"));
  if(i<0) throw new Error("Missing ASC root mapping "+root);
  const block=html.slice(i,html.indexOf("};",i));
  for(const label of labels) if(!block.includes(label)) throw new Error(label+" mapped under wrong/missing root");
}
if (html.includes("ASC catalogue stock verified") || html.includes("ASC supplier stock available")) {
  throw new Error("Preview must not imply supplier stock verification");
}
console.log("ASC_CATALOGUE_NAVIGATION_PASS: six source families mapped into existing approved storefront categories; virtual catalogue filters and unverified-data messaging present.");
