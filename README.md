# House of Ruturang — Handcrafted Saree Storefront

A premium, mobile-first e-commerce storefront for **House of Ruturang by Rutuja**
(@houseofruturang) — handpicked women's sarees, India/INR. Built with Next.js
(App Router + TypeScript), Tailwind CSS v4, shadcn/ui, and structured for
Supabase (products/orders) and Razorpay (payments).

> **Status: Phase 2 (design prototype), statically exported.** Browsing, cart,
> checkout navigation, and the full brand experience are working. Checkout is
> demo-only and hands off to WhatsApp (no payment is processed); product data
> and policy pages are clearly-marked placeholders.

## Tech stack

- **Next.js** (App Router, TypeScript) — server + client components
- **Tailwind CSS v4** + **shadcn/ui** (Base UI)
- **Supabase** (PostgreSQL) — prepared, not connected
- **Razorpay** — test-mode payment structure, not connected
- **Netlify** — target host (free tier), static export

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

Production checks:

```bash
npm run lint       # ESLint
npm run build      # type-check + static export into out/
npx serve out      # preview the static export locally
```

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Homepage (hero, collections, featured, story, signature, Instagram) |
| `/shop` | Product catalog with category / fabric / sort filters |
| `/collections` | Collection landing page |
| `/product/[slug]` | Product detail with image gallery + lightbox |
| `/cart`, `/checkout` | Bag and guest checkout (WhatsApp-first demo) |
| `/order/success` | Order confirmation (prototype) |
| `/our-story`, `/contact` | Brand story and contact (WhatsApp-first) |
| `/policies/*` | Shipping / returns / privacy / terms (draft) |

## Deploying to Netlify (free tier)

The storefront is a **static export**: `npm run build` writes plain HTML/CSS/JS
into `out/`, so Netlify serves it from its CDN with no serverless functions and
no Next.js runtime. Nothing secret is deployed — there is no server code in the
bundle, and the Razorpay/Supabase keys in `.env.example` are never needed for the
demo.

`netlify.toml` (repo root) already configures the build — `command = "npm run
build"`, `publish = "out"`, Node 22, and the Next.js runtime plugin is skipped
(`NETLIFY_NEXT_PLUGIN_SKIP`).

### Option A — Drag & drop (fastest, no account wiring)

1. Run `npm run build` locally.
2. On [app.netlify.com](https://app.netlify.com), create a new site and
   **Deploy manually** — drag the `out/` folder into the drop zone.
3. Netlify gives you a `https://<site-name>.netlify.app` URL immediately.

### Option B — GitHub (auto-deploys on every push)

1. Push this repo to GitHub:
   ```bash
   git add -A && git commit -m "Static export + Netlify config"
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```
2. In Netlify: **Add new site → Import an existing project → GitHub**, then pick
   the repo. Netlify reads `netlify.toml` automatically.
3. Netlify runs the first build and hands you `https://<site-name>.netlify.app`.

### After it's live

- Open `/`, `/shop`, `/product/banarasi-maroon`, `/cart` and `/checkout` on your
  phone. The 8 product pages are pre-generated; photos are served unoptimized
  from `/images/**`.
- Category deep links (`/shop?category=festive`) resolve in the browser after
  load — a static site can't read the query string server-side.

> **Do not** enable real payments or connect Razorpay/Supabase yet. Phase 2
> (real orders + Razorpay) needs the Netlify Next.js runtime (SSR + functions)
> or another Node host, not a static export.

## Design system

Brand tokens live in `src/app/globals.css` — `--background #FAF7F2`,
`--primary #64283A`, `--gold #B69A74`, `--rose #F3E5E4`,
`--foreground #282323`, `--muted #786D68`, `--border #E8DFD5`. Typography:
**Cormorant Garamond** (headings / wordmark) + **Manrope** (body / UI).

## Imagery

The prototype ships with temporary demo photography (not final, not for
publication):

- `public/images/products/{slug}-{1,2,3}.jpg` — three gallery shots for the
  first four demo products, and a single shot for the four stock-photo demos.
  The gallery only ever references images that exist on disk (see `imageCount`
  in `src/lib/products.ts`), so broken image references can't appear.
- `public/images/editorial/{hero,story,signature}.jpg` — campaign shots
  (1200×1600, 1200×1500, 1920×1080).

The four stock-photo products (blush, sapphire, purple, ivory) are marked
`demo` — visibly labelled and unavailable for checkout. Image credits and
licence links are recorded in `stock-photo-sources.json`.

`src/components/ui/optimized-image.tsx` routes raster photos through
`next/image` (with `images.unoptimized` for the static export, so files are
served as-is) and falls back to a plain `<img>` for any SVG placeholders.

## What is still mock / placeholder

- **Products** (`src/lib/products.ts`) — 8 demonstration entries with
  temporary demo imagery and colour-only display names (no weave claims). Swap
  for Supabase data when inventory is ready.
- **Policies** — draft text, clearly labelled as non-binding.
- **Payments** — checkout is demo-only: it never charges a card or creates an
  order, and instead opens WhatsApp with the order summary. The `/api/checkout`
  and `/api/orders` handlers remain in `src/app/api/` as Phase-2 scaffolding but
  are not deployed by the static export.

## Environment variables

`.env.example` documents the Phase-2 keys (Supabase + Razorpay). The static
build does **not** read or deploy any of them — checkout is demo-only and hands
off to WhatsApp. Keep the server-only keys out of any `NEXT_PUBLIC_*` variable
and out of the client bundle.

| Variable | Where | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase | safe for client |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase | **server-only** |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Razorpay | test mode |
| `RAZORPAY_KEY_SECRET` | Razorpay | **server-only** |
| `RAZORPAY_WEBHOOK_SECRET` | Razorpay → Webhooks | later phase |

## Project structure

```
src/
  app/                        Routes (/, /shop, /collections, /product/[slug],
                              /cart, /checkout, /order/success, /our-story,
                              /contact, /policies/*; /api/checkout + /api/orders
                              remain as Phase-2 scaffolding, not deployed)
  components/
    layout/                   Navbar, footer, search overlay
    cart/                     localStorage cart (useSyncExternalStore) + drawer
    product/                  Card, grid, detail (gallery + lightbox)
    home/                     Hero, collections, featured, story, signature, IG
    shop/                     Catalog filter client
    checkout/  contact/  policies/  icons.tsx
    ui/                       shadcn/ui primitives + optimized-image
  lib/
    site.ts                   Brand config (name, socials, WhatsApp)
    products.ts               Mock catalog (swap for Supabase later)
    supabase.ts  razorpay.ts  Env-guarded clients/helpers (server-only)
    format.ts  shipping.ts    INR formatting + shipping rules
  scripts/generate-images.mjs Placeholder SVG generator
```
