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
  ["data-asc-query", "virtual catalogue filter controls"],
  ["openAscCatalogueCategory", "catalogue category interaction"],
  ["No matching active store listings have been verified yet", "honest empty-state messaging"]
];
for (const [needle,label] of required) {
  if (!html.includes(needle)) throw new Error("Missing " + label + " (" + needle + ")");
}
const expected = [
  ["'6cc56033-b0a9-4f25-b207-aeeb341a1c47'", ["Automotive Sensors","Automotive Switches","Automotive Globes & Lighting","Fuel Pumps"]],
  ["'5ab55c53-eee3-41ce-ad48-04ad6df85181'", ["Aerials"]],
  ["'87982093-7d81-4f2e-a8e2-e20cdeef30d8'", ["Car Mats"]]
];
for (const [root,labels] of expected) {
  const i=html.indexOf(root,html.indexOf("const ASC_CATALOGUE_CHILDREN"));
  if(i<0) throw new Error("Missing ASC root mapping "+root);
  const block=html.slice(i,html.indexOf("};",i));
  for(const label of labels) if(!block.includes(label)) throw new Error(label+" mapped under wrong/missing root");
}
if (html.includes("ASC catalogue stock verified") || html.includes("ASC supplier stock available")) {
  throw new Error("Preview must not imply supplier stock verification");
}
console.log("ASC_CATALOGUE_NAVIGATION_PASS: six families mapped into approved storefront roots; virtual catalogue filters and unverified-data messaging present.");
