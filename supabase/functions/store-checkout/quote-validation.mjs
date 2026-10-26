export function normalizeCheckoutItems(input) {
  if (!Array.isArray(input) || input.length < 1 || input.length > 100) {
    throw new Error("Cart must contain between 1 and 100 line items.");
  }
  const quantities = new Map();
  for (const item of input) {
    const sku = String(item?.public_sku ?? item?.sku ?? "").trim();
    if (!/^GW-[A-Z0-9]{8}$/.test(sku)) throw new Error("Every cart item must have a valid public SKU.");
    const rawQuantity = item?.quantity ?? item?.qty;
    if (rawQuantity === undefined || rawQuantity === null || !/^\d+$/.test(String(rawQuantity))) {
      throw new Error("Cart item quantity must be a whole number.");
    }
    const quantity = Number(rawQuantity);
    if (!Number.isSafeInteger(quantity) || quantity < 1 || quantity > 99) {
      throw new Error("Each cart item quantity must be between 1 and 99.");
    }
    const combined = (quantities.get(sku) || 0) + quantity;
    if (combined > 99) throw new Error("Combined quantity for a product cannot exceed 99.");
    quantities.set(sku, combined);
  }
  return [...quantities.entries()].map(([public_sku, quantity]) => ({ public_sku, quantity }));
}

export function matchCurrentLiveQuote(selected, currentQuotes) {
  if (!selected || typeof selected !== "object" || selected.live !== true) return null;
  const provider = typeof selected.provider === "string" ? selected.provider.trim() : "";
  const service = typeof selected.service === "string" ? selected.service.trim() : "";
  const price = Number(selected.price);
  const currency = String(selected.currency || "");
  if (!provider || !service || currency !== "ZAR" || !Number.isFinite(price) || price <= 0) return null;
  if (!Array.isArray(currentQuotes)) return null;
  const cents = Math.round(price * 100);
  return currentQuotes.find(q =>
    q && q.live === true &&
    q.provider === provider &&
    q.service === service &&
    String(q.currency || "") === "ZAR" &&
    Number.isFinite(Number(q.price)) &&
    Math.round(Number(q.price) * 100) === cents
  ) || null;
}
