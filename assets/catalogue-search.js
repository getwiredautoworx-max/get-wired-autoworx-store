/* Free, client-side catalogue search. No external API or paid inference. */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.gwCatalogueSearch = api;
})(typeof window !== "undefined" ? window : globalThis, function () {
  "use strict";
  const FIELD_WEIGHTS = [
    ["public_sku", 120], ["name", 100], ["brand", 65], ["slug", 55],
    ["description", 45], ["compatible_vehicles", 60], ["vehicle_application", 60],
    ["application", 50], ["category_name", 35], ["specifications", 25]
  ];
  const STOP = new Set(["the", "and", "for", "with", "from", "part", "parts", "please", "find", "search"]);
  const ALIASES = {
    batt: "battery", batteries: "battery", alternators: "alternator", locking: "lock", locks: "lock", locked: "lock",
    starter: "starter motor", starters: "starter motor",
    headlamp: "headlight", headlamps: "headlight", headlights: "headlight",
    indicator: "indicator", indicators: "indicator", amp: "amplifier",
    amps: "amplifier", loudspeaker: "speaker", speakers: "speaker",
    "central locking": "central lock", "door locks": "door lock",
    "windscreen wiper": "wiper", "windshield wiper": "wiper"
  };
  const normalize = value => String(value ?? "")
    .normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " ");
  const tokens = value => normalize(value).split(" ").filter(t => t && !STOP.has(t));
  function distance(a, b, max = 2) {
    if (a === b) return 0;
    if (!a || !b || Math.abs(a.length - b.length) > max) return max + 1;
    let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i++) {
      const row = [i]; let rowMin = i;
      for (let j = 1; j <= b.length; j++) {
        row[j] = Math.min(row[j - 1] + 1, prev[j] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
        rowMin = Math.min(rowMin, row[j]);
      }
      if (rowMin > max) return max + 1;
      prev = row;
    }
    return prev[b.length];
  }
  function fieldText(product, key) {
    const value = product?.[key];
    if (value == null) return "";
    if (typeof value === "object") {
      if (Array.isArray(value)) return value.map(x => typeof x === "object" ? JSON.stringify(x) : String(x ?? "")).join(" ");
      return Object.entries(value).map(([k, v]) => k + " " + (typeof v === "object" ? JSON.stringify(v) : String(v ?? ""))).join(" ");
    }
    return String(value);
  }
  function expandedTokens(query) {
    const base = tokens(query);
    const out = [];
    for (const token of base) {
      out.push(token);
      const alias = ALIASES[token];
      if (alias) out.push(...tokens(alias));
    }
    return [...new Set(out)];
  }
  function scoreProduct(product, query) {
    const q = normalize(query);
    const queryTokens = tokens(query);
    if (!q || !queryTokens.length) return 0;
    const fields = FIELD_WEIGHTS.map(([key, weight]) => ({ key, weight, text: normalize(fieldText(product, key)) })).filter(f => f.text);
    const sku = normalize(fieldText(product, "public_sku"));
    const name = normalize(fieldText(product, "name"));
    let score = sku === q ? 1500 : (sku && sku.includes(q) ? 700 : 0);
    if (name === q) score += 900;
    else if (name.includes(q)) score += 450;
    const allQueryTokens = expandedTokens(queryTokens.join(" "));
    let matched = 0;
    for (const term of allQueryTokens) {
      let best = 0;
      for (const field of fields) {
        const words = field.text.split(" ");
        if (field.text === term || words.includes(term)) best = Math.max(best, field.weight);
        else if (words.some(word => word.startsWith(term) || term.startsWith(word) && word.length >= 4)) best = Math.max(best, field.weight * 0.78);
        else if (term.length >= 4 && words.some(word => distance(word, term, term.length >= 7 ? 2 : 1) <= (term.length >= 7 ? 2 : 1))) best = Math.max(best, field.weight * 0.58);
        else if (field.text.includes(term)) best = Math.max(best, field.weight * 0.45);
      }
      if (best > 0) { matched++; score += best; }
    }
    // Require each original query term to be represented; aliases may improve ranking but cannot rescue an unrelated result.
    const originalsMatched = queryTokens.map(term => ALIASES[term] ? tokens(ALIASES[term]) : [term]).flat().every(term => fields.some(field => {
      const words = field.text.split(" ");
      return field.text.includes(term) || words.some(word => word.startsWith(term) ||
        (term.length >= 4 && distance(word, term, term.length >= 7 ? 2 : 1) <= (term.length >= 7 ? 2 : 1)));
    }));
    if (!originalsMatched) return 0;
    if (Number(product?.stock_quantity || 0) > 0) score += 2;
    return score;
  }
  function search(products, query, limit = 25) {
    if (!Array.isArray(products) || !normalize(query)) return [];
    return products.map(p => ({ p, score: scoreProduct(p, query) }))
      .filter(x => x.score > 0)
      .sort((a, b) => b.score - a.score || String(a.p?.name || "").localeCompare(String(b.p?.name || "")))
      .slice(0, Math.max(1, Math.min(100, Number(limit) || 25)));
  }
  return { normalize, scoreProduct, search };
});
