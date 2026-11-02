export const MAX_IMAGE_BYTES = 4 * 1024 * 1024;
export const MAX_BODY_BYTES = 5_600_000;
export const RATE_LIMIT_WINDOW_SECONDS = 60;
export const RATE_LIMIT_MAX_REQUESTS = 8;

const ALLOWED_MIME = new Set(["image/jpeg", "image/png", "image/webp"]);
const ALLOWED_ORIGINS = new Set([
  "https://getwiredauto.co.za",
  "https://www.getwiredauto.co.za",
  "https://get-wired-autoworx-store.pages.dev"
]);

export function isAllowedOrigin(origin) {
  return typeof origin === "string" && ALLOWED_ORIGINS.has(origin);
}

export async function readJsonLimited(request, maxBytes = MAX_BODY_BYTES) {
  const contentType = (request.headers.get("content-type") || "").split(";")[0].trim().toLowerCase();
  if (contentType !== "application/json") throw new Error("Send the photo as a JSON request.");
  const declared = request.headers.get("content-length");
  if (declared !== null) {
    const size = Number(declared);
    if (!Number.isSafeInteger(size) || size < 0 || size > maxBytes) throw new Error("Image request is too large. Use a photo under 4 MB.");
  }
  if (!request.body) throw new Error("The image request is empty.");

  const reader = request.body.getReader();
  const chunks = [];
  let total = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > maxBytes) {
        await reader.cancel();
        throw new Error("Image request is too large. Use a photo under 4 MB.");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  let source;
  try {
    source = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    return JSON.parse(source);
  } catch {
    throw new Error("The image request is not valid JSON.");
  }
}

export function validateImagePayload(base64, mime) {
  if (!ALLOWED_MIME.has(mime)) return { ok: false, error: "Upload a JPG, PNG or WebP photo." };
  if (typeof base64 !== "string" || !base64 || base64.length > Math.ceil(MAX_IMAGE_BYTES / 3) * 4 + 4 ||
      !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(base64)) {
    return { ok: false, error: "Image is empty or too large. Use a photo under 4 MB." };
  }

  let binary;
  try { binary = atob(base64); }
  catch { return { ok: false, error: "The photo encoding is invalid." }; }
  if (!binary.length || binary.length > MAX_IMAGE_BYTES) {
    return { ok: false, error: "Image is empty or too large. Use a photo under 4 MB." };
  }

  const b = Array.from(binary.slice(0, 12), char => char.charCodeAt(0));
  const jpeg = mime === "image/jpeg" && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff;
  const png = mime === "image/png" && b.length >= 8 &&
    b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47 &&
    b[4] === 0x0d && b[5] === 0x0a && b[6] === 0x1a && b[7] === 0x0a;
  const webp = mime === "image/webp" && b.length >= 12 &&
    b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46 &&
    b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50;
  if (!jpeg && !png && !webp) return { ok: false, error: "The file contents do not match the selected photo type." };
  return { ok: true, bytes: binary.length };
}

export async function hashClientIp(ip, secret) {
  if (typeof ip !== "string" || !ip.trim() || typeof secret !== "string" || secret.length < 32) {
    throw new Error("Trusted client identity or rate-limit key is unavailable.");
  }
  const key = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(ip.trim()));
  return Array.from(new Uint8Array(signature), byte => byte.toString(16).padStart(2, "0")).join("");
}

export async function consumeDurableRateLimit(db, keyHash) {
  const { data, error } = await db.rpc("consume_part_image_search_rate_limit", {
    p_key_hash: keyHash,
    p_window_seconds: RATE_LIMIT_WINDOW_SECONDS,
    p_max_requests: RATE_LIMIT_MAX_REQUESTS
  });
  if (error) throw new Error("Shared picture-search rate limit is unavailable.");
  const row = Array.isArray(data) ? data[0] : data;
  if (!row || typeof row.allowed !== "boolean") throw new Error("Shared picture-search rate limit returned an invalid response.");
  return row;
}
