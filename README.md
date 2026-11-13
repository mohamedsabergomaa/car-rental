# LEMOSINE — Luxury Car Rental Website

A premium, Arabic-first (RTL) company website for the car rental brand **LEMOSINE**, with a built-in admin dashboard to manage the fleet and site settings. Visitors browse the fleet and convert into WhatsApp inquiries.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router, React 19) |
| Styling | Tailwind CSS v4 (custom `@theme` in `src/app/globals.css`) |
| Fonts | Cairo (Arabic UI) + Marcellus (Latin wordmark) via `next/font` |
| Motion | `motion/react` (scroll reveals, respects `prefers-reduced-motion`) |
| Icons | `@phosphor-icons/react` |
| Data | JSON files in `/data` (no database needed) |
| Admin auth | HMAC-signed session cookie (Node crypto) + edge middleware |

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
```

Production:

```bash
npm run build
npm start
```

## Admin Dashboard

- URL: **/admin** (also linked discreetly in the site footer)
- Default password: `lemosine-admin` — set in `.env`
- **Change these before deploying** (`.env`):

```env
ADMIN_PASSWORD=your-strong-password
ADMIN_SESSION_SECRET=a-long-random-string
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

The password never reaches the frontend — it is only compared server-side, and sessions are signed httpOnly cookies. Login attempts are rate-limited (8 tries / 10 min).

### What you can manage

- **Cars** (`/admin/cars`) — add, edit, delete cars; upload/replace images (JPG/PNG/WebP, ≤ 4 MB); set specs, daily price, and "featured" status (featured cars appear on the homepage).
- **Settings** (`/admin/settings`) — WhatsApp number, phone, address, Google Maps embed URL, social links, and the homepage hero title/subtitle.
- The floating WhatsApp button and every "احجز عبر واتساب" button use the number from Settings, with the car name pre-filled in the message.

## Content Notes (first version)

- **Car photos** are open-license stock images (Unsplash) stored in `public/images/cars/` — replace them with the company's real fleet photos from the admin dashboard or by overwriting the files.
- **Phone / WhatsApp numbers are placeholders** (`966500000000`) — set the real ones from `/admin/settings` before launch.
- **Testimonials are clearly marked sample content** — replace them in `src/lib/i18n.js` (`dict.testimonials`) when real reviews exist.
- **No real company address is invented** — the address and map embed are empty until set from the admin dashboard.

## Project Structure

```
src/
  app/
    (site)/            # public site: home, cars, car details, about, contact
    admin/             # protected dashboard (login, cars, settings)
    api/admin/         # login, logout, cars CRUD, upload, settings
    layout.js          # fonts, RTL, global metadata
    globals.css        # design system (Tailwind v4 @theme)
    middleware.js      # protects /admin routes (edge)
  components/          # Header, Footer, CarCard, Gallery, forms…
  lib/
    i18n.js            # all site copy (Arabic dictionary — add "en" here later)
    seed.js            # sample fleet data
    store.js           # JSON file store (/data/*.json)
    auth.js            # admin session (Node runtime)
    auth-edge.js       # session check for middleware (Web Crypto)
    validation.js      # server-side input validation
data/                  # cars.json + settings.json (created on first run)
public/images/cars/    # sample fleet photography
public/uploads/        # images uploaded via the dashboard
```

## Adding English Later

All UI copy lives in `src/lib/i18n.js` as a single Arabic dictionary. To add English: add an `en` object with the same shape, then flip `DEFAULT_LOCALE` — the layout already sets `<html lang dir>` from it.

## SEO

- Per-page Arabic metadata + OpenGraph (`src/app/(site)/…/page.jsx`)
- `robots.txt` (admin/API excluded) and a dynamic `sitemap.xml`
- JSON-LD (`AutoRental`) on the homepage
- Admin pages are `noindex, nofollow`
