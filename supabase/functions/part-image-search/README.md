# AI Part Image Search — Setup and Safety Notes

## Status
**Deployment verified 2026-10-15:** Supabase project `ojytykqpvonxvepprgbh` reports `part-image-search` ACTIVE at version 2 with `verify_jwt=false`. The endpoint is deployed, but AI recognition remains **credential-gated**: the function returns HTTP 503 when `OPENAI_API_KEY` is absent. No successful vision request has yet been verified. The storefront calls:

`https://ojytykqpvonxvepprgbh.supabase.co/functions/v1/part-image-search`

The OpenAI secret is one unresolved gate; durable abuse controls and a customer-facing photo disclosure are also required before public paid inference is enabled. Do not redeploy merely to set this secret: Supabase makes new function secrets available immediately. The public endpoint must not be treated as launch-ready until durable abuse protection, a visible customer disclosure before photo submission, provider spend controls, and a successful controlled end-to-end test are recorded.

## Required secret
1. Create a dedicated OpenAI API key in the [OpenAI API keys dashboard](https://platform.openai.com/api-keys). API usage is billed separately from a ChatGPT subscription. Use a dedicated project/key and configure usage notifications and the tightest available spend controls.
2. Open [Supabase Edge Function Secrets](https://supabase.com/dashboard/project/ojytykqpvonxvepprgbh/functions/secrets).
3. Add secret name `OPENAI_API_KEY`, paste the key as its value, and save.
4. Do **not** paste the key into ChatGPT, GitHub, this README, frontend code, or any committed file.
5. No redeploy is required after adding the secret. Then run the controlled smoke test described below.

CLI alternative, only from a trusted local terminal; avoid putting the key in shell history:

```sh
read -s OPENAI_API_KEY
export OPENAI_API_KEY
supabase secrets set OPENAI_API_KEY="$OPENAI_API_KEY" --project-ref ojytykqpvonxvepprgbh
unset OPENAI_API_KEY
```

The function reads the project-managed `SUPABASE_URL` and `SUPABASE_SECRET_KEYS` secrets already used by existing project functions. It also accepts optional `OPENAI_VISION_MODEL`; default is `gpt-4.1-mini`.

## Before public launch
- **Do not enable paid public inference until abuse controls are in place.** `verify_jwt=false` is currently necessary for the anonymous storefront call; CORS is not access control.
- Staging proposal in `supabase/migrations/20261015120000_part_image_search_rate_limit.sql` adds a shared, database-backed per-client window and a service-role-only RPC. It is a source artifact only; it has not been applied to production. The updated function fails closed with HTTP 503 if the RPC/service credential is unavailable. Apply the migration in an approved staging project and validate its grants/concurrency before any function deployment. Add durable shared rate limiting or a challenge/edge rule before the API key is configured for public use.
- Configure spending limits / usage alerts with the AI provider.
- The staged function uses HMAC-hashed client identifiers with the server-side Supabase service key and checks the shared limiter before any OpenAI call. Confirm the upstream proxy IP header behavior and consider a WAF/challenge as a second layer.
- Confirm Edge Function CORS origins match the final production domain.
- Confirm the Supabase project has the required secret-key environment value and the function can read the active catalogue. The production secret-presence state has not been independently verified.
- Unit tests cover origin allowlisting, request body limits, image size/MIME/signature validation, and HMAC identifier hashing. `handler_test.ts` now adds endpoint-level mocks for missing-key/no-upstream-call, no-Origin rejection, shared rate-limit exhaustion, mocked vision success, provider 429/5xx, and ambiguous/no-match behavior; its CI result must pass before acceptance. Still required before launch: validate the migration against a disposable staging database, confirm proxy IP header semantics, verify secret presence securely and provider spend controls, and check the disclosure's visibility on desktop/mobile.
- The current storefront markup includes a notice before the photo input stating the photo is sent to the AI provider and results are suggestions only. Verify its visibility/readability on mobile and desktop in browser QA; advise customers not to upload personal or sensitive content. The function does not persist the image; normal service-provider processing/retention terms may apply.
- Treat results as suggestions only; never promise fitment or stock based on image recognition alone.

## How it works
The Edge Function asks the vision model for a cautious part description, readable labels, and search keywords; then it scores active catalogue items against those terms and returns up to eight candidates. It does not alter products, prices, inventory, orders, or supplier data. It uses only the product's public SKU and customer-facing catalogue fields.


## Verified deployment state — 2026-10-15
- Supabase Management API reports function `part-image-search` ACTIVE, version 2, `verify_jwt=false`, function ID `33ba0b75-eb4d-42e4-b123-b70b85ddb0d4`.
- The deployed source reads `Deno.env.get("OPENAI_API_KEY") || ""` and returns 503 before processing the image if the secret is empty.
- This proves the function is deployed; it does not prove the OpenAI secret exists or that a vision request succeeds. A successful end-to-end image test is still required after secure secret setup and abuse-control review.
