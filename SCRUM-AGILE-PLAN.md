# Moriah Prayer Mountain — Scrum Plan

**Status:** Scrum tracking starts September 29, 2026. Earlier work was completed without a Scrum process; this plan tracks the remaining work from here.

## Product goal

Help visitors understand Moriah, support its ministry through a clear donation path, inquire about stays and venue rentals, and—once room operations and payment rules are confirmed—complete a reliable full-payment booking online.

## Scrum setup

- **Sprint length:** 1 week, reviewed and adjusted at each Sprint Review.
- **Product Owner:** Ministry representative — to be named.
- **Developers:** Website implementation team — to be named.
- **Scrum Master:** Facilitator — to be named.
- **Working agreement:** Keep room and venue inquiries distinct from confirmed reservations. Never publish unconfirmed prices, capacity, or availability. Keep API keys out of Git.

## Current increment

The public Next.js site is deployed on Vercel. It includes the ministry information pages, room information placeholder and gallery, function hall event information, and inquiry form. The story quote has higher contrast. The Vercel production URL is `https://moriah-prayer-mountain.vercel.app`.

The inquiry form's Resend delivery is **not configured** yet. The room section's PayPal copy is informational; there is **no live checkout or booking system**. Room layouts, capacities, and rates remain unconfirmed.

Donations and paid services must have separate visitor flows, payment purposes, and financial records. Do not use a donation checkout for room stays or venue rental fees.

## Product backlog

Ordered by priority. Items blocked on ministry decisions or account setup stay in the backlog until those inputs are available.

### P1 — Configure inquiry email

**Story:** As a visitor, I want my inquiry delivered to Moriah so the ministry can reply.

**Acceptance criteria:**

- Resend API key and sender from a Resend-verified domain are configured in Vercel Preview and Production settings; no secret is committed.
- A test inquiry arrives at the intended ministry inbox with the visitor's reply address and request details.
- The form shows a clear success or recoverable error state.

**Blocked by:** Resend account/API key and verified sender domain.

### P1 — Verify production launch

**Story:** As a visitor, I want the live site to show accurate information and work on my device.

**Acceptance criteria:**

- Ministry contact details, route guidance, room count, event uses, and published photos are confirmed.
- Main navigation, inquiry links, images, and form layout work on desktop and mobile.
- Any confirmed content corrections are deployed to the production URL.

### P1 — Confirm room inventory and policies

**Story:** As ministry staff, I want one accurate room record for each bookable room so I can quote and confirm a stay correctly.

**Acceptance criteria:**

- All 17 rooms have approved identifiers, solo/non-solo type, bed setup, capacity, facilities, rate and rate basis.
- Check-in/out, availability, minimum stay, inclusions, and maintenance-block rules are documented.
- Deposit/full-payment, cancellation, refund, and date-change policies are approved.
- The public site only displays details approved for publication.

**Blocked by:** Ministry-provided inventory and operating decisions.

### P2 — Confirm function hall rental details

**Story:** As an event organizer, I want to know what the function hall can accommodate and how to inquire about a date.

**Acceptance criteria:**

- Approved capacity, included equipment/setup, event rules, pricing, availability process, and rental contact are documented.
- Weddings, conferences, seminars, church events, and other approved uses are reflected accurately on the site.
- Visitors can submit a function hall inquiry and receive a clear confirmation that it is not yet a reservation.

**Blocked by:** Ministry-provided venue details and rental policies.

### P2 — Choose the staff availability workflow

**Story:** As ministry staff, I want one source of truth for room and venue availability so requests do not conflict.

**Acceptance criteria:**

- A staff-owned calendar or booking register is selected.
- A request owner, response target, and process for holds, declines, cancellations, and changes are agreed.
- Staff can identify who changed a booking and when.

**Blocked by:** Named operational owner and ministry workflow decision.

### P2 — Establish a separate donation path

**Story:** As a supporter, I want a clearly labeled way to donate to Moriah that explains how the funds will be used and who receives them.

**Acceptance criteria:**

- Donation purpose, target, recipient organization/account, organizer, and fund-use plan are approved and shown clearly.
- The donation panel and checkout are separate from room-stay and function-hall rental inquiries/payments.
- Donation confirmations and records can be reconciled separately from rental or booking payments.
- Any tax-deductibility statement is shown only if Moriah's status and the platform confirm it.
- A real, verified PayPal Donate link/button or approved campaign URL is tested before the website displays a live donation CTA.

**Blocked by:** Ministry approval of campaign purpose and recipient, a verified receiving account, and a chosen donation platform/link.

### P3 — Build staff-managed reservations

**Story:** As authorized staff, I want to review requests and manage room availability in one private place.

**Acceptance criteria:**

- Staff can review, confirm, decline, modify, and cancel a request.
- Staff can block rooms for maintenance or ministry use.
- Server-side checks prevent overlapping confirmed reservations, including simultaneous requests.
- Guest information and staff notes are private; changes are recorded.

**Depends on:** Approved inventory, rates, operating rules, and availability workflow.

### P3 — Add full PayPal checkout

**Story:** As a guest with a confirmed room arrangement, I want to pay the complete approved stay total through PayPal.

**Acceptance criteria:**

- Checkout is offered only after availability and the final total are confirmed and the room is safely held.
- The amount is calculated and validated server-side from approved pricing; guests cannot alter it in the browser.
- PayPal payment completion is verified server-side before the booking is marked paid/confirmed.
- The guest receives an accurate receipt and approved cancellation/refund instructions.
- Failed, cancelled, duplicated, and refunded payments have clear outcomes for the guest and staff.

**Depends on:** PayPal business account, live pricing, reservation holds, approved refund/cancellation rules, and payment reconciliation process.

### P3 — Connect a custom public domain (optional)

**Story:** As Moriah, I want a ministry-owned domain so visitors can use a stable branded address.

**Acceptance criteria:**

- Ministry selects and owns the domain.
- DNS is verified in Vercel and one canonical hostname redirects consistently.
- Production pages and inquiry endpoints work over HTTPS on the chosen domain.

**Blocked by:** Domain selection/ownership.

## Proposed first sprint

**Sprint goal:** Make the live site's inquiry path dependable and close launch-critical content checks.

1. Configure Resend in Vercel (blocked until the API key and verified sender are available).
2. Send and verify a test inquiry from the deployed production site.
3. Review desktop/mobile pages, imagery, links, published contacts, and travel directions with the ministry.
4. Record any remaining corrections as backlog items and deploy approved fixes.

At Sprint Planning, the Product Owner and Developers should confirm the sprint scope and name the open Scrum roles. If the Resend setup is still blocked, use the sprint on the other ready launch checks and keep email delivery visibly blocked.

## Definition of Done

- Acceptance criteria are met and reviewed with the Product Owner.
- Relevant pages work at mobile and desktop widths; no broken images or navigation links remain.
- No API keys or private environment files are committed.
- Inquiry/payment copy accurately distinguishes a request, a confirmed reservation, and a completed payment.
- Changes are merged to `main`, deployed to Vercel, and the production result is checked.
