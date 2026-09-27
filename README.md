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
- Website inquiry form for general questions, room stays, chapel rentals, and function hall rentals
- Group room requests can include guest count, preferred room mix, requested room count, and a total budget

## Website inquiries

The inquiry form sends email through the Resend API from the server-side Next.js route at `/api/inquiries`. The guest's email is set as the reply-to address. Room requests include dates, group size, an optional room preference/count, and an optional total budget so the ministry can suggest an arrangement for larger groups. Room and venue requests are inquiries only; they do not create or hold a reservation. The ministry confirms arrangements directly by email.

Copy `.env.example` to `.env.local` for local development, then configure `RESEND_API_KEY` and `INQUIRY_FROM_EMAIL`. The recipient defaults to the published Moriah contact email; set `INQUIRY_TO_EMAIL` only to override it. The sender address must belong to a domain verified with Resend. Set these values in Vercel for Preview and Production deployments. Keep the API key private and out of Git. Submitted requests are emailed; they are not stored in a booking database yet.

## Content and media notes

All ministry photos and video are kept under `public/assets/news/` and should appear only in the News & Updates feed. Stories with unconfirmed dates are labeled for confirmation. Confirm parent or guardian permission for photos showing children before publishing. Confirm official contacts, map location, current route details, and event information with ministry leadership before launch.

## Future room booking

The recommended next full-stack phase is PostgreSQL with Prisma: searchable room availability by check-in, check-out, and guest count; booking requests with staff confirmation; and an admin calendar. Add instant confirmation, Google sign-in for guests, or payment only after room inventory, rates, cancellation rules, and operating procedures are confirmed.
