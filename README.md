# Macey’s Country Bakery

Production-oriented Next.js App Router storefront and admin for a small collection-only bakery. It uses Supabase Auth, Postgres and Storage, plus verified Stripe Checkout webhooks.

## Local setup

1. Create a Supabase project and run every SQL file in `supabase/migrations/` in filename order, then run `supabase/seed.sql` in the SQL editor.
2. In Authentication, create the bakery owner account. Promote it once in SQL: `update public.profiles set role='admin' where id='<auth-user-uuid>';`.
3. Confirm the `product-images` bucket and its policies were created by the migration.
4. Create a Stripe account and obtain test API keys. Add a webhook endpoint at `https://YOUR_DOMAIN/api/stripe/webhook` for `checkout.session.completed` and `checkout.session.expired`.
5. Copy `.env.example` to `.env.local` and fill every required value. Never prefix service-role or Stripe secret values with `NEXT_PUBLIC_`.
6. Run `npm install` and `npm run dev`.

For an existing Supabase project, run only migrations that have not already been applied. `0002_maceys_pricing.sql` adds the current treat box, cupcake, banana-loaf and dinner-roll prices safely and can be rerun.

## Stripe testing

For local signed webhooks, use Stripe CLI: `stripe listen --forward-to localhost:3000/api/stripe/webhook`, then copy the printed `whsec_...` to `STRIPE_WEBHOOK_SECRET`. Checkout line items are rebuilt from Supabase on the server; browser prices are ignored. The webhook raw body is signature-verified and event IDs are persisted for idempotency.

## Vercel deployment

Import `Nashbuilt/maceycountrybakes` into Vercel. Add all `.env.example` keys in Project Settings → Environment Variables, using the production site URL. Deploy, then register the final Vercel webhook URL in Stripe and replace `STRIPE_WEBHOOK_SECRET` with that endpoint’s signing secret. In Supabase Auth URL Configuration, set the Site URL to the production domain and add the Vercel preview pattern only if preview logins are required.

Before accepting live orders, switch Stripe keys from test to live mode, create a new live webhook endpoint, run a low-value real payment, confirm webhook delivery, stock decrement and collection capacity, then refund it in Stripe.

## Security

Admin server actions call `requireAdmin()` before any mutation and validate all input with Zod. RLS independently restricts protected tables. The service-role key and Stripe secrets are server-only. Storage uploads enforce MIME type and size. Paid state is only written by the verified, idempotent webhook.
