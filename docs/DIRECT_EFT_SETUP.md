# Direct EFT and WhatsApp owner setup

This procedure is for the Get Wired AutoWorx owner. It does not ask you to share bank details in ChatGPT, email, GitHub, or source files.

## 1. Add the five bank settings in Supabase

1. Open the Supabase Dashboard for the Get Wired AutoWorx project.
2. Go to **Edge Functions → Secrets**.
3. Add these exact secret names. Enter the values directly from the verified business bank account.

| Secret name | Enter |
|---|---|
| `DIRECT_EFT_BANK_NAME` | Your bank name |
| `DIRECT_EFT_ACCOUNT_NAME` | Registered beneficiary/account-holder name |
| `DIRECT_EFT_ACCOUNT_NUMBER` | Business account number |
| `DIRECT_EFT_BRANCH_CODE` | Branch code |
| `DIRECT_EFT_ACCOUNT_TYPE` | Account type |

Save the five secrets. Do not send the values to ChatGPT or commit them to GitHub. Supabase makes saved Edge Function secrets available to functions immediately; changing secrets alone does not deploy new checkout code.

## 2. Controlled test before launch

Use a non-production Supabase environment and a test customer account first.

- Place a small test order using Direct EFT.
- Confirm the checkout response displays all five bank fields.
- Confirm the payment reference is exactly `GW-<order number>`.
- Confirm missing or incomplete secrets return no partial bank details.
- Confirm the order remains **Payment pending** until you independently verify the EFT in your bank account.
- Confirm the WhatsApp handoff contains order reference, item summary and total, but excludes the delivery address and bank account details.
- Test the WhatsApp link on both mobile and desktop. The customer still presses **Send** in WhatsApp.

## 3. WhatsApp capability and cost

The current implementation uses click-to-chat to the existing Get Wired number **+27 74 488 4234**. This is no-cost customer-initiated WhatsApp handoff. It is not automated WhatsApp Business Platform messaging, delivery/read receipts, or automatic outbound notifications. Do not add paid Meta API credentials unless separately approved.

## 4. Production release gate

Do not activate production EFT until:
- The checkout code and required database migration are reviewed and approved.
- You have entered and verified the five production secrets directly in Supabase.
- A controlled non-production order test passes.
- You explicitly approve deploying the `store-checkout` Edge Function and any required migration.

Never share bank account values, online banking credentials, PINs, OTPs, Supabase service-role keys or secret keys through chat or GitHub.
