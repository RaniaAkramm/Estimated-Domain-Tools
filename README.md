# Estimated — Domain Appraisal, Naming & Marketplace Tools

A Next.js 14 (App Router) project with:

- **/appraise** — multi-factor domain value estimator (returns a price range, not a
  single fixed number)
- **/cvcvcv** — vowel / consonant / semivowel letter-pattern checker
- **/marketplace** — public board of domains listed for sale (buy-now and/or make-offer)
- **/dashboard** — protected page where a signed-in user lists domains and sees offers
- **/signup**, **/login** — email/password accounts (no OAuth, no third-party login)

`/appraise` and `/cvcvcv` still run entirely client-side. The marketplace and accounts
now need a Postgres database.

## How the marketplace works

Estimated is a listing board, not the seller of record. A user adds a domain with a
"buy-now" price and/or a minimum offer, plus the URL of the platform where the domain
is actually held for sale (e.g. Afternic, Dan.com, Sedo). "Buy now" sends the buyer
straight to that URL. "Make offer" keeps the offer inside Estimated, visible to the
lister on their dashboard — no payment is processed by this app yet.

## 1. Set up a database

Use either:
- **Vercel Postgres** — from your Vercel project → Storage → Create Database → Postgres
- **Supabase** — create a project, copy the connection string (use the "Transaction"
  pooler URL for serverless)

Copy `.env.example` to `.env` and fill in `DATABASE_URL`. Generate `NEXTAUTH_SECRET`
with `openssl rand -base64 32` (or any random 32+ character string).

## 2. Create the database tables

Once `DATABASE_URL` is set, run:

```
npx prisma migrate dev --name init
```

This creates the `User`, `Listing`, and `Offer` tables. In Vercel's own environment
you can instead run `npx prisma db push` from a one-off deployment or locally against
the same `DATABASE_URL`.

## 3. Before you deploy — fix the SEO placeholder URL

Open `app/layout.tsx`, `app/sitemap.ts`, and `app/robots.ts` and replace
`https://estimated.example.com` with your real domain.

## 4. Deploy from your phone (GitHub → Vercel)

1. Create a GitHub repo and upload this whole folder via the GitHub web UI.
2. In Vercel: Add New Project → Import the repo.
3. Add the three environment variables from `.env` (`DATABASE_URL`, `NEXTAUTH_SECRET`,
   `NEXTAUTH_URL` — set `NEXTAUTH_URL` to your real Vercel/production URL).
4. Deploy. `prisma generate` runs automatically on install/build.
5. Run the migration once (step 2) against the same `DATABASE_URL` your Vercel
   deployment uses, so the live database has its tables.

## SEO already wired in

- Per-page `<title>` and meta description
- Open Graph + Twitter card tags
- JSON-LD `WebApplication` structured data
- Auto-generated `sitemap.xml` and `robots.txt`
- Canonical URLs per page
- `/dashboard` is marked `noindex` since it's a private page

## What's still not in this build

- The 20-domain bulk name generator
- Wiring `/appraise` to a real appraisal API (Atom.com) instead of the built-in
  heuristic scoring in `lib/valuation.ts`
- Real payment processing for buy-now purchases (currently just an outbound link to
  wherever the domain is actually listed)
- Accepting/declining offers from the dashboard (offers currently just display; wire
  up a status-update button when you're ready)

Ask for any of these next and they can be added as new routes in this same project.
