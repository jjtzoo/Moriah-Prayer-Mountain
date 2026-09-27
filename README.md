# Moriah Prayer Mountain

Official ministry and retreat website for Moriah Prayer Mountain in Masbate, Philippines.

## Stack

- Next.js App Router and React
- TypeScript
- Tailwind CSS 4 with custom site styles
- Next Image for news photography

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Current scope

- Public ministry, visit, and route-planning content
- One News & Updates feed for dated ministry stories and media
- Responsive navigation and layouts
- Google sign-in and online room booking are future phases

## Content and media notes

All ministry photos and video are kept under `public/assets/news/` and should appear only in the News & Updates feed. Stories with unconfirmed dates are labeled for confirmation. Confirm parent or guardian permission for photos showing children before publishing. Confirm official contacts, map location, current route details, and event information with ministry leadership before launch.

## Future room booking

The recommended next full-stack phase is PostgreSQL with Prisma: searchable room availability by check-in, check-out, and guest count; booking requests with staff confirmation; and an admin calendar. Add instant confirmation, Google sign-in for guests, or payment only after room inventory, rates, cancellation rules, and operating procedures are confirmed.
