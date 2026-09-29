import { inquiryEmail } from "@/lib/site-config";

type RequestType = "rooms" | "chapel" | "function-hall" | "support" | "general";

const requestLabels: Record<RequestType, string> = {
  rooms: "Room stay or group reservation",
  chapel: "Chapel rental",
  "function-hall": "Function hall rental",
  support: "Donation or ministry support inquiry",
  general: "General inquiry",
};

function text(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
}

function jsonError(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");

  if (origin && host) {
    try {
      if (new URL(origin).host.toLowerCase() !== host.toLowerCase()) {
        return jsonError("Request not allowed.", 403);
      }
    } catch {
      return jsonError("Request not allowed.", 403);
    }
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 12_000) return jsonError("Request is too large.", 413);

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await request.json();
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      return jsonError("Please check the form and try again.", 400);
    }
    body = parsed as Record<string, unknown>;
  } catch {
    return jsonError("Please check the form and try again.", 400);
  }

  // Quietly accept automated submissions that fill the hidden field.
  if (text(body.website, 200)) return Response.json({ ok: true });

  const requestType = text(body.requestType, 30) as RequestType;
  if (!Object.hasOwn(requestLabels, requestType)) {
    return jsonError("Choose what you are contacting Moriah about.", 400);
  }

  const name = text(body.name, 100);
  const email = text(body.email, 254);
  const phone = text(body.phone, 40);
  const message = text(body.message, 2000);
  const arrivalDate = text(body.arrivalDate, 10);
  const departureDate = text(body.departureDate, 10);
  const roomPreference = text(body.roomPreference, 20);
  const guestCount = Number(body.guestCount);
  const roomCountValue = text(body.roomCount, 3);
  const budgetValue = text(body.budget, 12);

  if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonError("Enter your name and a valid email address.", 400);
  }

  if (requestType !== "general" && requestType !== "support") {
    if (!isDate(arrivalDate) || !Number.isInteger(guestCount) || guestCount < 1 || guestCount > 500) {
      return jsonError("Enter a valid date and group size.", 400);
    }
    if (requestType === "rooms") {
      if (!isDate(departureDate) || departureDate <= arrivalDate) {
        return jsonError("Departure must be after arrival.", 400);
      }
      if (!["flexible", "solo", "non-solo"].includes(roomPreference)) {
        return jsonError("Choose a room preference or leave it flexible.", 400);
      }
      if (roomCountValue && (!/^\d+$/.test(roomCountValue) || Number(roomCountValue) > 17 || Number(roomCountValue) < 1)) {
        return jsonError("Enter a room count from 1 to 17.", 400);
      }
      if (budgetValue && (!/^\d+(\.\d{1,2})?$/.test(budgetValue) || Number(budgetValue) > 100_000_000)) {
        return jsonError("Enter a valid room budget in Philippine pesos.", 400);
      }
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.INQUIRY_TO_EMAIL || inquiryEmail;
  const sender = process.env.INQUIRY_FROM_EMAIL;
  if (!apiKey || !recipient || !sender) {
    return jsonError("The inquiry service is not configured yet.", 503);
  }

  const details = [
    `Request type: ${requestLabels[requestType]}`,
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone or messaging number: ${phone}` : "",
    arrivalDate ? `Requested arrival/date: ${arrivalDate}` : "",
    departureDate ? `Departure date: ${departureDate}` : "",
    Number.isInteger(guestCount) && guestCount > 0 ? `Group size: ${guestCount}` : "",
    requestType === "rooms" ? `Room preference: ${roomPreference || "Flexible"}` : "",
    requestType === "rooms" && roomCountValue ? `Rooms requested: ${roomCountValue}` : "",
    requestType === "rooms" && budgetValue ? `Total room budget (PHP): ${budgetValue}` : "",
    message ? `Message:\n${message}` : "",
    "",
    requestType === "support"
      ? "This is a voluntary ministry-support question only. No donation or payment was made through this form."
      : "This is an inquiry, not a confirmed booking. Please reply to the guest to confirm availability, room arrangement, and rates.",
  ].filter(Boolean);

  const subjectName = name.replace(/[\r\n]+/g, " ").slice(0, 80);
  let emailResponse: Response;
  try {
    emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: email,
        subject: `Moriah website inquiry: ${requestLabels[requestType]} — ${subjectName}`,
        text: details.join("\n"),
      }),
    });
  } catch {
    console.error("Moriah inquiry email service could not be reached.");
    return jsonError("Could not send your inquiry. Please try again or email Moriah directly.", 502);
  }

  if (!emailResponse.ok) {
    console.error(`Moriah inquiry email service returned ${emailResponse.status}.`);
    return jsonError("Could not send your inquiry. Please try again or email Moriah directly.", 502);
  }

  return Response.json({ ok: true });
}
