# Moriah Prayer Mountain Rooms and Booking Masterplan

**Status:** Planning draft
**Prepared:** September 28, 2026
**Scope:** Room information now; room inquiries and online booking in later phases.

This plan uses the room information provided by the ministry for the current website. The attached general website masterplan contains older room labels and provisional rates; those details are not treated as confirmed and must not be published as current facts.

## 1. Goal

Give visitors reliable lodging information and a clear way to ask about a stay. Add online availability and booking only after Moriah confirms the room inventory, rates, and operating rules.

Keep the presentation consistent with Moriah as a prayer and retreat ministry. The rooms support a visit; they should not make the website feel like a hotel marketplace.

## 2. Confirmed information

- Moriah has **11 rooms in total**.
- **6 solo rooms are currently available**, according to the ministry's latest information.
- **All rooms have air conditioning.**

Availability can change. The website should ask visitors to confirm it before they travel. The remaining five rooms' types and availability are not specified yet.

## 3. Phase One: room information placeholder

Add a clear room summary within the Visit area. Do not create eleven invented room cards or imply that all eleven rooms are currently available.

Suggested copy:

> **Rooms at Moriah**
>
> Moriah has 11 rooms in total, including 6 solo rooms currently available. All rooms have air conditioning. Room details and rates are being confirmed. Please check current availability with the ministry before planning your stay.

Display these points:

- 11 rooms total;
- 6 solo rooms currently available, subject to confirmation;
- air conditioning in all rooms;
- individual room layouts, capacity, rates, and booking details to come.

Keep this as an informational placeholder. Do not add a date picker, fake availability calendar, booking confirmation, login, or payment step yet. Do not publish the older Small/Big/VIP labels or prices until the ministry verifies them.

Do not add room photos throughout the page. Add room photography only after the ministry provides approved, good-quality photos and chooses where a consolidated room gallery belongs.

## 4. Information to confirm before accepting booking requests

Create an inventory sheet with one row per room. Confirm:

| Field | Needed for |
| --- | --- |
| Room identifier and public name | Staff assignment and guest communication |
| Room type, including which rooms are solo | Accurate room selection |
| Maximum guests and bed setup | Preventing unsuitable reservations |
| Private/shared bathroom and facilities | Setting guest expectations |
| Rate, rate basis, and any group/child pricing | Accurate quotations |
| Availability and maintenance status | Preventing unavailable-room requests |
| Check-in/check-out times and arrival process | Coordinating stays |
| Meals, linens, and other inclusions | Clear pricing and preparation |
| Minimum stay and booking window | Enforcing operating rules |
| Deposit, payment, cancellation, and refund rules | Handling confirmed reservations |
| Public inquiry contact and response owner | Making requests actionable |

Also decide who can change availability, how quickly inquiries are answered, and who handles cancellations or date changes.

## 5. Phase Two: inquiry-based booking

Once room details and a public contact method are confirmed, add a request form. A request is **not a confirmed reservation** until ministry staff approves it.

Collect only what staff need:

- arrival and departure dates;
- number of guests;
- preferred room type or solo-room request;
- guest name and one contact method;
- optional note for the ministry.

Show an explicit pending message after submission. Staff check the room calendar, then confirm or decline with the guest directly. Until a shared calendar is in use, staff must record approved stays and maintenance blocks in one agreed source of truth to avoid double booking.

## 6. Phase Three: staff-managed availability

After the inquiry process is understood, add an admin calendar for the eleven rooms. Staff should be able to:

- view arrivals, departures, and pending requests;
- confirm, decline, edit, or cancel requests;
- block a room for maintenance or ministry use;
- see the assigned room and guest count;
- record an operational note and who changed a booking.

Keep individual guest records private. The public site should not expose guest names or staff notes.

## 7. Phase Four: guest self-service booking

Consider live availability and immediate confirmation only after the room inventory and booking process stay accurate in practice. Add:

- date and guest search;
- available room selection and a clear total price;
- reservation review before submission;
- booking confirmation and change/cancellation instructions;
- optional Google sign-in if returning guests need account features.

Payments are a separate later decision. Add them only after Moriah approves the payment account, deposit amount, refund rules, receipts, and reconciliation process. Do not make a payment imply a confirmed stay until the booking flow guarantees that room inventory is held correctly.

## 8. Suggested technical direction

Keep the current **Next.js App Router, React, and TypeScript** site. When booking data is needed, use **PostgreSQL with Prisma** and server-side route handlers or server actions in the existing app. This avoids introducing a separate Express service before the product requires one.

Design the later data model around individual rooms, availability blocks, booking requests, and booking status. Store dates consistently using the ministry's **Asia/Manila** timezone. Enforce availability checks on the server so two requests cannot reserve the same room for overlapping dates.

Guest login, payment processing, and a CMS are not prerequisites for the first placeholder or staff-reviewed inquiry flow.

## 9. Readiness gates

### Ready for the informational placeholder

- [x] Total room count supplied: 11.
- [x] Solo-room count supplied: 6.
- [x] Air conditioning confirmed for all rooms.
- [ ] Public inquiry contact confirmed.
- [ ] Room types and capacities confirmed.
- [ ] Rates confirmed or explicitly kept unpublished.

### Ready for inquiry requests

- [ ] All 11 rooms and their bookable status documented.
- [ ] Rates and stay rules approved.
- [ ] One staff-owned availability calendar selected.
- [ ] A request owner and response timeframe agreed.
- [ ] Public contact and privacy notice ready.

### Ready for online confirmation or payment

- [ ] Booking and cancellation rules approved.
- [ ] Overlap prevention and room holds implemented.
- [ ] Confirmation, cancellation, and change messages approved.
- [ ] Payment account and refund process approved, if payments are enabled.
- [ ] Staff admin access and change history in place.

## 10. Recommended next implementation step

Publish only the room summary in the Visit section, with an availability-check reminder. Keep the other room details clearly marked as forthcoming. Gather the inventory and operating answers in Section 4 before designing a booking calendar or accepting reservations online.
