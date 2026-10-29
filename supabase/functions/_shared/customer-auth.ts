export type CustomerSessionResult =
  | { ok: true; user: { id: string; email: string } }
  | { ok: false; status: 401 | 403 | 503; code: string; message: string };

export async function validateCustomerSession(
  supabaseUrl: string,
  publicApiKey: string,
  authorization: string,
  fetcher: typeof fetch = fetch,
): Promise<CustomerSessionResult> {
  if (!supabaseUrl || !publicApiKey) return { ok: false, status: 503, code: "AUTH_NOT_CONFIGURED", message: "Customer authentication is not configured." };
  const accessToken = authorization.match(/^Bearer\s+(.+)$/i)?.[1] || "";
  if (!accessToken) return { ok: false, status: 401, code: "AUTH_REQUIRED", message: "Please sign in before checkout." };
  try {
    const response = await fetcher(supabaseUrl.replace(/\/+$/, "") + "/auth/v1/user", { headers: { apikey: publicApiKey, Authorization: "Bearer " + accessToken } });
    if (!response.ok) return { ok: false, status: 401, code: "AUTH_REQUIRED", message: "Your customer session is invalid or expired. Please sign in again." };
    const user = await response.json();
    if (!user?.id || typeof user.email !== "string" || !user.email || !user.email_confirmed_at) return { ok: false, status: 403, code: "AUTH_EMAIL_REQUIRED", message: "A verified customer email account is required for checkout." };
    return { ok: true, user: { id: String(user.id), email: user.email } };
  } catch {
    return { ok: false, status: 503, code: "AUTH_CHECK_FAILED", message: "Unable to verify your customer session. Please try again." };
  }
}
