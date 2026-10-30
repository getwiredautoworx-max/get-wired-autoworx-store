# Direct EFT and WhatsApp setup

This change prepares the storefront to show business bank instructions after an authenticated order is successfully created. Actual account values are not stored in this repository.

## Configure the business bank instructions

After this change has passed review and is deployed to the approved Supabase project, set the following Edge Function secrets for `store-checkout` in the Supabase Dashboard:

- `DIRECT_EFT_BANK_NAME`
- `DIRECT_EFT_ACCOUNT_NAME`
- `DIRECT_EFT_ACCOUNT_NUMBER`
- `DIRECT_EFT_BRANCH_CODE`
- `DIRECT_EFT_ACCOUNT_TYPE`

Enter only the business account details intended for customer EFT payments. Never commit these values to GitHub or send them through ChatGPT. Do not provide online-banking passwords, PINs, OTPs or login credentials.

The checkout returns bank instructions only when all five values and a valid order reference are present. The customer sees a reference in the form `GW-<order number>`. If configuration is incomplete, no partial or placeholder bank details are shown; the customer is told to await payment instructions.

## Payment verification

- The order remains `pending` after creation.
- The customer’s proof-of-payment image or WhatsApp message does not automatically mark the order paid.
- The owner/admin must verify the deposit in the business bank account and update the order through the authorised admin process.

## WhatsApp handoff

The existing no-cost click-to-chat number is `+27 74 488 4234`. The checkout handoff includes the order reference, item summary and total, and excludes delivery address and bank account details.

This is not automated WhatsApp Business Platform messaging. Automated outbound notifications require a separate Meta Business/WhatsApp Business Platform setup, verified sending number, access token and webhook. Do not enable paid messaging without explicit owner approval.

## Deployment sequence

1. Review and merge the source/test change.
2. Configure the five `DIRECT_EFT_*` values as Edge Function secrets outside GitHub.
3. Verify a test order in a non-production environment and confirm the customer sees the correct bank instructions and reference.
4. Confirm the order remains pending until manual owner verification.
5. Deploy the Edge Function only after the owner explicitly approves the deployment.

No production database writes, Supabase function deployment, Axxess upload, DNS change or live payment activation are included in this source change.
