# AI Part Image Search — Setup and Safety Notes

## Status
Source is committed, but the Edge Function is not deployed and AI recognition is not live yet. The storefront calls:

`https://ojytykqpvonxvepprgbh.supabase.co/functions/v1/part-image-search`

The AI provider key must be configured on the Supabase project before this endpoint can return results.

## Required secret
Create an OpenAI API key in the OpenAI developer platform, then set it as a Supabase Edge Function secret named `OPENAI_API_KEY`. Never place the key in `index-new.html`, GitHub client code, or any public file.

With the Supabase CLI, from the repository root:

```sh
supabase secrets set OPENAI_API_KEY=your_key_here --project-ref ojytykqpvonxvepprgbh
supabase functions deploy part-image-search --project-ref ojytykqpvonxvepprgbh --no-verify-jwt
```

The function reads the project-managed `SUPABASE_URL` and `SUPABASE_SECRET_KEYS` secrets already used by existing project functions. It also accepts optional `OPENAI_VISION_MODEL`; default is `gpt-4.1-mini`.

## Before public launch
- Configure spending limits / usage alerts with the AI provider.
- Add durable per-user/IP rate limiting or a challenge such as Turnstile. The included in-memory limiter is only a basic safeguard and does not reliably rate-limit across separate function instances.
- Confirm Edge Function CORS origins match the final production domain.
- Confirm the Supabase project has the required secret-key environment value and the function can read the active catalogue.
- Test at least one clear photo, a low-quality/ambiguous photo, a non-part image, an image over the size limit, and a product with no catalogue match.
- Tell customers that their selected photo is sent to the AI provider for analysis. The function does not persist the image; normal service-provider processing/retention terms may apply.
- Treat results as suggestions only; never promise fitment or stock based on image recognition alone.

## How it works
The Edge Function asks the vision model for a cautious part description, readable labels, and search keywords; then it scores active catalogue items against those terms and returns up to eight candidates. It does not alter products, prices, inventory, orders, or supplier data. It uses only the product's public SKU and customer-facing catalogue fields.
