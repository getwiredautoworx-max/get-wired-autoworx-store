# Direct EFT and WhatsApp owner setup

This procedure applies only after the Direct EFT implementation PR has been reviewed, merged, and the owner has approved the non-production deployment/test. Do not configure production banking instructions or deploy the checkout function as part of preview QA.

## 1. Add the five Edge Function secrets

In the Supabase Dashboard:

1. Select the Get Wired AutoWorx project.
2. Open **Edge Functions → Secrets**.
3. Add each key below using the exact bank details shown on the verified business bank account. Do not put the values in GitHub, source files, email, or ChatGPT.

| Secret key | Value to enter |
|---|---|
| `DIRECT_EFT_BANK_NAME` | Bank name |
| `DIRECT_EFT_ACCOUNT_NAME` | Exact registered account-holder / beneficiary name |
| `DIRECT_EFT_ACCOUNT_NUMBER` | Business account number |
| `DIRECT_EFT_BRANCH_CODE` | Branch code |
| `DIRECT_EFT_ACCOUNT_TYPE` | Account type |

Save the secrets. Supabase makes newly saved Edge Function secrets available to functions immediately; a redeploy is not required solely to make the secret values visible. The checkout code still needs to be deployed separately after approval.

Official instructions: [Supabase Edge Function secrets](https://supabase.com/docs/guides/functions/secrets).

## 2. Verify in a non-production environment first

- Use a non-production Supabase project and a test customer account.
- Submit a small test order using the Direct EFT option.
- Confirm the order confirmation displays all five configured bank fields and the exact order-specific `GW-<order number>` payment reference.
- Confirm an incomplete/missing secret set returns no partial bank details.
- Confirm the order remains **Payment pending** until the owner independently verifies the EFT in the bank account.
- Confirm customer address and bank details are not included in the WhatsApp message.
- Do not use a real payment or change production order status during this test.

## 3. WhatsApp handoff

The current implementation uses the existing no-cost WhatsApp click-to-chat number **+27 74 488 4234**. The message contains the order number/reference, item summary and total. It deliberately excludes the delivery address and bank account details.

Test the generated link on both mobile and desktop. The customer must still press Send in WhatsApp. This is not automated WhatsApp Business Platform messaging or a delivery/read receipt. Do not add Meta API credentials or paid messaging services without a separate owner decision.

## 4. Production release gate

Production activation requires all of the following:

- PR review and merge approval.
- Owner confirmation that the bank beneficiary and account details are correct.
- Production secrets entered directly in the Supabase Dashboard by an authorised project administrator.
- Explicit owner approval to deploy the `store-checkout` Edge Function.
- A controlled post-deployment test confirming the correct account details, order reference, pending payment state and WhatsApp privacy.

Never send bank account values, online banking credentials, PINs, OTPs, service-role keys or Supabase secret keys through chat or GitHub. No production deployment or payment activation is authorised by this document.
