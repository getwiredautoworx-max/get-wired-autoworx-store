export function mapProviderError(status, upstreamText) {
  let providerCode = "";
  try {
    const parsed = JSON.parse(String(upstreamText ?? ""));
    const providerError = parsed?.error && typeof parsed.error === "object" ? parsed.error : {};
    providerCode = String(providerError.code || providerError.type || "");
  } catch {
    // Malformed provider bodies are treated as unclassified errors.
  }

  if (status === 401 || status === 403) {
    return {
      status: 502,
      providerCode,
      body: { error: "AI provider authentication failed. Please contact the store administrator." }
    };
  }
  if (status === 429 && (providerCode === "insufficient_quota" || providerCode === "credit_balance_exhausted")) {
    return {
      status: 503,
      providerCode,
      body: { error: "AI picture search is currently unavailable because the AI provider has no API credits. Use Part Search or Request a Part instead." }
    };
  }
  if (status === 429) {
    return {
      status: 429,
      providerCode,
      body: { error: "AI picture search is temporarily rate-limited. Please wait before trying again, or use Part Search or Request a Part." }
    };
  }
  return {
    status: 502,
    providerCode,
    body: { error: "The image could not be analysed right now. Please try again or use Request a Part." }
  };
}
