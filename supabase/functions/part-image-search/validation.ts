export const MAX_IMAGE_BYTES = 4 * 1024 * 1024;
export const MAX_REQUEST_BODY_BYTES = 5_800_000;

const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp']);

export function isAllowedOrigin(origin: string, allowedOrigins: Set<string>): boolean {
  return origin.length > 0 && allowedOrigins.has(origin);
}

export function validateImagePayload(base64: string, mime: string):
  { ok: true; decodedBytes: number } | { ok: false; status: number; error: string } {
  if (!ALLOWED_MIME.has(mime)) {
    return { ok: false, status: 400, error: 'Upload a JPG, PNG or WebP photo.' };
  }
  if (!base64 || !/^[A-Za-z0-9+/]+={0,2}$/.test(base64) || base64.length % 4 === 1) {
    return { ok: false, status: 400, error: 'Image data is empty or invalid.' };
  }
  const padding = base64.endsWith('==') ? 2 : base64.endsWith('=') ? 1 : 0;
  const decodedBytes = Math.floor(base64.length * 3 / 4) - padding;
  if (decodedBytes > MAX_IMAGE_BYTES) {
    return { ok: false, status: 413, error: 'Image is too large. Use a photo under 4 MB.' };
  }

  let binary: string;
  try {
    binary = atob(base64);
  } catch {
    return { ok: false, status: 400, error: 'Image data is invalid.' };
  }
  const b = [...binary.slice(0, 12)].map(c => c.charCodeAt(0));
  const jpeg = mime === 'image/jpeg' && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff;
  const png = mime === 'image/png' && [137,80,78,71,13,10,26,10].every((n,i) => b[i] === n);
  const webp = mime === 'image/webp' && b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46 &&
    b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50;
  if (!jpeg && !png && !webp) {
    return { ok: false, status: 400, error: 'Image content does not match the selected JPG, PNG or WebP type.' };
  }
  return { ok: true, decodedBytes: binary.length };
}

export async function readJsonLimited(req: Request, maxBytes = MAX_REQUEST_BODY_BYTES): Promise<unknown> {
  const contentLength = Number(req.headers.get('content-length') || 0);
  if (contentLength > maxBytes) throw new Error('BODY_TOO_LARGE');
  if (!req.body) throw new Error('EMPTY_BODY');
  const reader = req.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maxBytes) {
      await reader.cancel();
      throw new Error('BODY_TOO_LARGE');
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  try {
    return JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    throw new Error('INVALID_JSON');
  }
}

export async function hmacClientHash(ip: string, serverSecret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(serverSecret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const digest = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(ip || 'unknown'));
  return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, '0')).join('');
}
