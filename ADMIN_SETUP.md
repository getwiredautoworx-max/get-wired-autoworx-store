# Admin provisioning

The storefront order RPC is public only for order creation. Order listing and updates require a Supabase Auth session belonging to an enabled row in `public.veyron_admin_users`.

Before enabling the admin portal for staff, create the staff account in Supabase Auth and then add its Auth user UUID to `public.veyron_admin_users` with `enabled=true`.

Do not add a client-side admin password, bypass the allowlist, or expose service-role credentials in the storefront.
