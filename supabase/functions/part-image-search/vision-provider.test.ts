import { analyzePartImage, VisionProviderError } from "./vision-provider.ts";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}
function input(overrides: Partial<Parameters<typeof analyzePartImage>[0]> = {}) {
  return {
    base64: "dGVzdC1pbWFnZQ==",
    mime: "image/jpeg",
    prompt: "Identify this automotive part and return JSON.",
    geminiApiKey: "",
    geminiModel: "gemini-2.5-flash-lite",
    openAiApiKey: "openai-test-key",
    openAiModel: "gpt-4.1-mini",
    ...overrides,
  };
}

Deno.test("uses Gemini when configured and sends the image without calling OpenAI", async () => {
  let calls = 0;
  const fakeFetch: typeof fetch = async (url, init) => {
    calls++;
    assert(String(url).includes("generativelanguage.googleapis.com"), "Gemini endpoint was not used");
    const headers = new Headers(init?.headers);
    assert(headers.get("x-goog-api-key") === "gemini-test-key", "Gemini key must be sent in the header");
    const body = JSON.parse(String(init?.body));
    assert(body.contents[0].parts[1].inlineData.data === "dGVzdC1pbWFnZQ==", "Image data was not sent");
    assert(body.generationConfig.responseMimeType === "application/json", "JSON output mode must be requested");
    return new Response(JSON.stringify({
      candidates: [{ content: { parts: [{ text: '{"part_name":"blade fuse","confidence":"high"}' }] } }],
    }), { status: 200, headers: { "content-type": "application/json" } });
  };
  const result = await analyzePartImage(input({ geminiApiKey: "gemini-test-key", fetchImpl: fakeFetch }));
  assert(calls === 1, "Expected exactly one provider call");
  assert(result.provider === "gemini", "Gemini should be selected");
  assert(result.model === "gemini-2.5-flash-lite", "Selected model should be reported");
  assert(JSON.parse(result.text).part_name === "blade fuse", "Gemini JSON text was not extracted");
});

Deno.test("Gemini quota errors do not fall back to potentially paid OpenAI", async () => {
  let calls = 0;
  const fakeFetch: typeof fetch = async () => {
    calls++;
    return new Response('{"error":{"message":"quota exceeded"}}', { status: 429 });
  };
  let caught: unknown;
  try {
    await analyzePartImage(input({ geminiApiKey: "gemini-test-key", fetchImpl: fakeFetch }));
  } catch (error) {
    caught = error;
  }
  assert(caught instanceof VisionProviderError, "Expected a safe provider error");
  assert(caught.status === 429, "Gemini quota should map to HTTP 429");
  assert(caught.message.includes("free-tier usage limit"), "User-facing quota message should be actionable");
  assert(calls === 1, "No OpenAI fallback call should be made");
});

Deno.test("uses OpenAI only when no Gemini key is configured and paid fallback is explicitly enabled", async () => {
  const fakeFetch: typeof fetch = async (url, init) => {
    assert(String(url).includes("api.openai.com/v1/chat/completions"), "OpenAI endpoint was not used");
    assert(new Headers(init?.headers).get("authorization") === "Bearer openai-test-key", "OpenAI key header missing");
    return new Response(JSON.stringify({
      choices: [{ message: { content: '{"part_name":"relay","confidence":"medium"}' } }],
    }), { status: 200, headers: { "content-type": "application/json" } });
  };
  const result = await analyzePartImage(input({ allowPaidOpenAiFallback: true, fetchImpl: fakeFetch }));
  assert(result.provider === "openai", "OpenAI should be used only when Gemini is not configured");
  assert(JSON.parse(result.text).part_name === "relay", "OpenAI JSON text was not extracted");
});

Deno.test("OpenAI exhausted credits returns explicit no-cost recovery guidance", async () => {
  const fakeFetch: typeof fetch = async () => new Response(
    '{"error":{"type":"insufficient_quota","code":"credit_balance_exhausted"}}',
    { status: 429 },
  );
  let caught: unknown;
  try {
    await analyzePartImage(input({ allowPaidOpenAiFallback: true, fetchImpl: fakeFetch }));
  } catch (error) {
    caught = error;
  }
  assert(caught instanceof VisionProviderError, "Expected a safe provider error");
  assert(caught.status === 429, "Exhausted OpenAI quota should map to HTTP 429");
  assert(caught.message.includes("GEMINI_API_KEY"), "Error should identify the no-cost provider path");
});

Deno.test("missing provider keys fail clearly without making a network request", async () => {
  let calls = 0;
  const fakeFetch: typeof fetch = async () => {
    calls++;
    return new Response("unexpected", { status: 500 });
  };
  let caught: unknown;
  try {
    await analyzePartImage(input({ openAiApiKey: "", fetchImpl: fakeFetch }));
  } catch (error) {
    caught = error;
  }
  assert(caught instanceof VisionProviderError, "Expected a configuration error");
  assert(caught.status === 503, "Missing keys should return HTTP 503");
  assert(calls === 0, "Missing keys must not call a provider");
});

Deno.test("paid OpenAI fallback is disabled by default even when an OpenAI key exists", async () => {
  let calls = 0;
  const fakeFetch: typeof fetch = async () => {
    calls++;
    return new Response("unexpected", { status: 500 });
  };
  let caught: unknown;
  try {
    await analyzePartImage(input({ fetchImpl: fakeFetch }));
  } catch (error) {
    caught = error;
  }
  assert(caught instanceof VisionProviderError, "Expected paid fallback to be blocked");
  assert(caught.status === 503, "Disabled paid fallback should return HTTP 503");
  assert(caught.message.includes("Paid OpenAI fallback is disabled"), "Response should explain the owner-controlled fallback gate");
  assert(calls === 0, "Disabled paid fallback must not call OpenAI");
});
