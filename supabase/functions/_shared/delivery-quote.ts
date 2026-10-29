export type QuoteItem = { public_sku?: string; sku?: string; qty?: number; quantity?: number };
export type QuoteClaims = Record<string, unknown>;

export function normalise(value: unknown): string {
  return String(value ?? "").normalize("NFKC").trim().replace(/\s+/g, " ").toLowerCase();
}

export async function digest(value: string): Promise<string> {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(bytes), b => b.toString(16).padStart(2, "0")).join("");
}

export function quoteTimeValid(claims: QuoteClaims, now = Date.now()): boolean {
  const issuedAt = Number(claims.issued_at), expiresAt = Number(claims.expires_at);
  return claims.v === 1 && Number.isFinite(issuedAt) && Number.isFinite(expiresAt) && expiresAt > now &&
    issuedAt <= now + 30000 && expiresAt > issuedAt && expiresAt - issuedAt <= 10 * 60 * 1000;
}

export function cartCanonical(items: QuoteItem[]): string {
  const quantities = new Map<string, number>();
  for (const item of items) {
    const sku = String(item.public_sku ?? item.sku ?? "").trim().toUpperCase();
    const qty = Number(item.quantity ?? item.qty);
    if (!/^GW-[A-Z0-9]{8}$/.test(sku) || !Number.isInteger(qty) || qty < 1 || qty > 99) {
      throw new Error("Cart items need a valid SKU and quantity.");
    }
    quantities.set(sku, (quantities.get(sku) || 0) + qty);
  }
  return [...quantities.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([sku, qty]) => sku + ":" + qty).join("|");
}

export function destinationCanonical(body: Record<string, unknown>): string {
  return [body.address ?? body.p_delivery_address, body.city ?? body.p_city, body.province ?? body.p_province, body.postal_code ?? body.p_postal_code]
    .map(normalise).join("|");
}

function b64url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/g, "");
}

function decodeB64url(part: string): Uint8Array {
  const normal = part.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normal + "=".repeat((4 - normal.length % 4) % 4);
  return Uint8Array.from(atob(padded), c => c.charCodeAt(0));
}

export async function signQuote(claims: QuoteClaims, secret: string): Promise<string> {
  if (secret.length < 32) throw new Error("Delivery quote signing secret must be at least 32 characters.");
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const payload = b64url(new TextEncoder().encode(JSON.stringify(claims)));
  const signature = new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload)));
  return payload + "." + b64url(signature);
}

export async function verifyQuoteToken(token: string, secret: string): Promise<QuoteClaims | null> {
  if (secret.length < 32) return null;
  const parts = token.split(".");
  if (parts.length !== 2 || !parts[0] || !parts[1]) return null;
  try {
    const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["verify"]);
    const signature = decodeB64url(parts[1]);
    const signatureBuffer = signature.buffer.slice(signature.byteOffset, signature.byteOffset + signature.byteLength) as ArrayBuffer;
    if (!await crypto.subtle.verify("HMAC", key, signatureBuffer, new TextEncoder().encode(parts[0]))) return null;
    const claims = JSON.parse(new TextDecoder().decode(decodeB64url(parts[0])));
    return claims && typeof claims === "object" && !Array.isArray(claims) ? claims as QuoteClaims : null;
  } catch {
    return null;
  }
}

export async function validateBoundQuote(args: {
  quote: Record<string, unknown>;
  token: string;
  secret: string;
  items: QuoteItem[];
  destination: Record<string, unknown>;
  deliveryFee: number;
  parcel: { weight_kg: number; length_cm: number; width_cm: number; height_cm: number };
  now?: number;
}): Promise<QuoteClaims> {
  if (args.quote.live !== true || !args.token) throw new Error("A signed live delivery quote is required.");
  const claims = await verifyQuoteToken(args.token, args.secret);
  if (!claims) throw new Error("Delivery quote signature is invalid.");
  const now = args.now ?? Date.now();
  if (!quoteTimeValid(claims, now)) throw new Error("Delivery quote is expired or has an invalid lifetime.");
  const [cartHash, destinationHash] = await Promise.all([
    digest(cartCanonical(args.items)), digest(destinationCanonical(args.destination)),
  ]);
  const quotePrice = Number(args.quote.price), claimPrice = Number(claims.price);
  if (claims.cart_hash !== cartHash || claims.destination_hash !== destinationHash ||
      typeof claims.provider !== "string" || typeof claims.service !== "string" || claims.currency !== "ZAR" ||
      !Number.isFinite(claimPrice) || claimPrice <= 0 ||
      args.quote.provider !== claims.provider || args.quote.service !== claims.service ||
      args.quote.nonce !== claims.nonce || String(args.quote.currency).toUpperCase() !== "ZAR" ||
      quotePrice !== claimPrice || args.deliveryFee !== claimPrice) {
    throw new Error("Delivery quote is altered or does not match this address, cart, provider or fee.");
  }
  const parcel = claims.parcel as Record<string, unknown> | null;
  if (!parcel ||
      Math.abs(Number(parcel.weight_kg) - args.parcel.weight_kg) >= 0.001 ||
      Number(parcel.length_cm) !== args.parcel.length_cm ||
      Number(parcel.width_cm) !== args.parcel.width_cm ||
      Number(parcel.height_cm) !== args.parcel.height_cm) {
    throw new Error("Delivery quote parcel dimensions do not match current product data.");
  }
  return claims;
}

export function validatePickup(deliveryFee: number, quote: unknown): void {
  if (!Number.isFinite(deliveryFee) || deliveryFee !== 0 || quote != null) {
    throw new Error("Pickup must have a zero delivery fee and no delivery quote.");
  }
}
