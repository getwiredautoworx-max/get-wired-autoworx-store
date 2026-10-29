export type QuoteItem = { public_sku?: string; sku?: string; qty?: number; quantity?: number };
export type QuoteClaims = Record<string, unknown>;

export function normalise(value: unknown): string {
  return String(value ?? "").normalize("NFKC").trim().replace(/\\s+/g, " ").toLowerCase();
}

export async function digest(value: string): Promise<string> {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(bytes), b => b.toString(16).padStart(2, "0")).join("");
}

export function cartCanonical(items: QuoteItem[]): string {
  const quantities = new Map<string, number>();
  for (const item of items) {
    const sku = String(item.public_sku ?? item.sku ?? "").trim().toUpperCase();
    const qty = Number(item.quantity ?? item.qty);
    if (!/^GW-[A-Z0-9]{8}$/.test(sku) || !Number.isInteger(qty) || qty < 1 || qty > 100) {
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
  return btoa(binary).replace(/\\+/g, "-").replace(/\\//g, "_").replace(/=+$/g, "");
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
    if (!await crypto.subtle.verify("HMAC", key, decodeB64url(parts[1]), new TextEncoder().encode(parts[0]))) return null;
    const claims = JSON.parse(new TextDecoder().decode(decodeB64url(parts[0])));
    return claims && typeof claims === "object" && !Array.isArray(claims) ? claims as QuoteClaims : null;
  } catch {
    return null;
  }
}
