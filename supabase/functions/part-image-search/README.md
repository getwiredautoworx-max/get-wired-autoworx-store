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
- **Do not enable paid public inference until abuse controls are in place.** `verify_jwt=false` is currently necessary for the anonymous storefront call; CORS and the in-memory per-IP map are not durable access controls. Add durable shared rate limiting or a challenge/edge rule before the API key is configured for public use.
- Configure spending limits / usage alerts with the AI provider.
- Add durable per-user/IP rate limiting or a challenge such as Turnstile. The deployed in-memory limiter is only a basic safeguard and does not reliably rate-limit across separate function instances. The feature must remain release-gated until shared/durable protection is implemented and tested.
- Confirm Edge Function CORS origins match the final production domain.
- Confirm the Supabase project has the required secret-key environment value and the function can read the active catalogue.
- Test at least one clear photo, a low-quality/ambiguous photo, a non-part image, an image over the size limit, and a product with no catalogue match.
- Show a clear customer-facing notice before upload: the selected photo is sent to OpenAI for analysis; do not upload personal/sensitive content; results are suggestions only. The storefront currently needs an explicit pre-submit disclosure verified in the UI. The function does not persist the image; normal service-provider processing/retention terms may apply.
- Treat results as suggestions only; never promise fitment or stock based on image recognition alone.

## How it works
The Edge Function asks the vision model for a cautious part description, readable labels, and search keywords; then it scores active catalogue items against those terms and returns up to eight candidates. It does not alter products, prices, inventory, orders, or supplier data. It uses only the product's public SKU and customer-facing catalogue fields.


## Verified deployment state — 2026-10-15
- Supabase Management API reports function `part-image-search` ACTIVE, version 2, `verify_jwt=false`, function ID `33ba0b75-eb4d-42e4-b123-b70b85ddb0d4`.
- The deployed source reads `Deno.env.get("OPENAI_API_KEY") || ""` and returns 503 before processing the image if the secret is empty.
- This proves the function is deployed; it does not prove the OpenAI secret exists or that a vision request succeeds. A successful end-to-end image test is still required after secure secret setup and abuse-control review.
