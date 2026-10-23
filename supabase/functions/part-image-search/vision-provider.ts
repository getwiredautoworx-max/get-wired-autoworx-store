export class VisionProviderError extends Error {
  constructor(public readonly status: number, message: string) {
    super(message);
    this.name = "VisionProviderError";
  }
}

export type VisionProviderInput = {
  base64: string;
  mime: string;
  prompt: string;
  geminiApiKey: string;
  geminiModel: string;
  openAiApiKey: string;
  openAiModel: string;
  fetchImpl?: typeof fetch;
};

export type VisionProviderResult = {
  text: string;
  model: string;
  provider: "gemini" | "openai";
};

function extractGeminiText(payload: any): string {
  return (payload?.candidates?.[0]?.content?.parts || [])
    .map((part: any) => typeof part?.text === "string" ? part.text : "")
    .join("")
    .trim();
}

export async function analyzePartImage(input: VisionProviderInput): Promise<VisionProviderResult> {
  const fetcher = input.fetchImpl || fetch;

  // Prefer the explicitly configured Gemini free-tier provider. Do not silently
  // fall back to OpenAI if Gemini is rate-limited: that could incur paid usage.
  if (input.geminiApiKey) {
    const response = await fetcher(
      "https://generativelanguage.googleapis.com/v1beta/models/" +
        encodeURIComponent(input.geminiModel) + ":generateContent",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-goog-api-key": input.geminiApiKey,
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{
              text: "You identify physical automotive and electrical parts cautiously. Output valid JSON only.",
            }],
          },
          contents: [{
            role: "user",
            parts: [
              { text: input.prompt },
              { inlineData: { mimeType: input.mime, data: input.base64 } },
            ],
          }],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 450,
            responseMimeType: "application/json",
          },
        }),
        signal: AbortSignal.timeout(25_000),
      },
    );

    if (!response.ok) {
      const detail = await response.text();
      console.error("Gemini image analysis failed", response.status, detail.slice(0, 500));
      if (response.status === 401 || response.status === 403) {
        throw new VisionProviderError(502, "Gemini provider authentication failed. Please check the GEMINI_API_KEY secret.");
      }
      if (response.status === 429) {
        throw new VisionProviderError(429, "Gemini free-tier usage limit reached or temporarily busy. Please try later or use Request a Part.");
      }
      throw new VisionProviderError(502, "Gemini could not analyse the image right now. Please try again or use Request a Part.");
    }

    const payload = await response.json();
    const text = extractGeminiText(payload);
    if (!text) throw new VisionProviderError(502, "Gemini returned an unreadable result. Please try another photo or use Request a Part.");
    return { text, model: input.geminiModel, provider: "gemini" };
  }

  if (!input.openAiApiKey) {
    throw new VisionProviderError(503, "AI picture search is not configured. Add GEMINI_API_KEY for the free tier, or use Request a Part.");
  }

  const response = await fetcher("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      authorization: "Bearer " + input.openAiApiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: input.openAiModel,
      temperature: 0.1,
      max_tokens: 450,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You identify physical automotive and electrical parts cautiously. Output valid JSON only." },
        {
          role: "user",
          content: [
            { type: "text", text: input.prompt },
            { type: "image_url", image_url: { url: "data:" + input.mime + ";base64," + input.base64, detail: "high" } },
          ],
        },
      ],
    }),
    signal: AbortSignal.timeout(25_000),
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error("OpenAI image analysis failed", response.status, detail.slice(0, 500));
    if (response.status === 401 || response.status === 403) {
      throw new VisionProviderError(502, "OpenAI provider authentication failed. Please contact the store administrator.");
    }
    if (response.status === 429) {
      let quotaExhausted = false;
      try {
        const parsed = JSON.parse(detail);
        quotaExhausted = parsed?.error?.code === "credit_balance_exhausted" ||
          parsed?.error?.type === "insufficient_quota";
      } catch {
        // Keep the generic rate-limit message when the upstream body is not JSON.
      }
      if (quotaExhausted) {
        throw new VisionProviderError(429, "The OpenAI API has no credits remaining. Configure GEMINI_API_KEY for the free-tier vision provider, or use Request a Part.");
      }
      throw new VisionProviderError(429, "OpenAI image search is temporarily busy or its usage limit has been reached. Please try later or use Request a Part.");
    }
    throw new VisionProviderError(502, "OpenAI could not analyse the image right now. Please try again or use Request a Part.");
  }

  const payload = await response.json();
  const text = payload?.choices?.[0]?.message?.content;
  if (typeof text !== "string" || !text.trim()) {
    throw new VisionProviderError(502, "OpenAI returned an unreadable result. Please try another photo or use Request a Part.");
  }
  return { text, model: input.openAiModel, provider: "openai" };
}
