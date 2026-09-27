"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { inquiryEmail } from "@/lib/site-config";

type RequestType = "rooms" | "chapel" | "function-hall" | "general";

const requestLabels: Record<RequestType, string> = {
  rooms: "Room stay or group reservation",
  chapel: "Chapel rental",
  "function-hall": "Function hall rental",
  general: "General inquiry",
};

export default function InquiryForm() {
  const [requestType, setRequestType] = useState<RequestType>("rooms");
  const [isSending, setIsSending] = useState(false);
  const [result, setResult] = useState<{
    kind: "success" | "error";
    message: string;
  } | null>(null);

  const needsDates = requestType !== "general";
  const isRoomRequest = requestType === "rooms";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSending(true);
    setResult(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });

      if (!response.ok) throw new Error("delivery_failed");

      setResult({
        kind: "success",
        message:
          "Your inquiry was sent to Moriah. A room or venue is not reserved until the ministry confirms it with you.",
      });
      form.reset();
      setRequestType("rooms");
    } catch {
      setResult({
        kind: "error",
        message:
          "The online form could not send your inquiry. Please email Moriah directly using the link below.",
      });
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="inquiry-wrap">
      <p className="inquiry-intro">
        Planning for a group, even up to 50 guests? Share your dates, group
        size, and estimated room budget. The ministry can review a suitable
        arrangement and reply with options. Every request is confirmed directly
        with you.
      </p>

      <form className="inquiry-form" onSubmit={handleSubmit}>
        <div className="inquiry-honeypot" aria-hidden="true">
          <label htmlFor="inquiry-website">Leave this field blank</label>
          <input
            id="inquiry-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="inquiry-fields">
          <label className="inquiry-field inquiry-field-wide">
            <span>What can we help you with?</span>
            <select
              name="requestType"
              value={requestType}
              onChange={(event) =>
                setRequestType(event.target.value as RequestType)
              }
            >
              {Object.entries(requestLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <label className="inquiry-field">
            <span>Your name</span>
            <input name="name" type="text" autoComplete="name" required maxLength={100} />
          </label>
          <label className="inquiry-field">
            <span>Email address</span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
            />
          </label>
          <label className="inquiry-field inquiry-field-wide">
            <span>Phone or messaging number <small>Optional</small></span>
            <input name="phone" type="tel" autoComplete="tel" maxLength={40} />
          </label>

          {needsDates && (
            <>
              <label className="inquiry-field">
                <span>{isRoomRequest ? "Arrival date" : "Requested date"}</span>
                <input
                  name="arrivalDate"
                  type="date"
                  required
                  autoComplete="off"
                />
              </label>
              {isRoomRequest && (
                <label className="inquiry-field">
                  <span>Departure date</span>
                  <input name="departureDate" type="date" required />
                </label>
              )}
              <label className="inquiry-field">
                <span>{isRoomRequest ? "Number of guests" : "Expected group size"}</span>
                <input
                  name="guestCount"
                  type="number"
                  min="1"
                  max="500"
                  step="1"
                  required
                />
              </label>
            </>
          )}

          {isRoomRequest && (
            <>
              <label className="inquiry-field">
                <span>Room preference <small>Optional</small></span>
                <select name="roomPreference" defaultValue="flexible">
                  <option value="flexible">Flexible / suggest a mix</option>
                  <option value="solo">Solo rooms</option>
                  <option value="non-solo">Non-solo rooms</option>
                </select>
              </label>
              <label className="inquiry-field">
                <span>Rooms requested <small>Optional</small></span>
                <input name="roomCount" type="number" min="1" max="17" step="1" />
              </label>
              <label className="inquiry-field inquiry-field-wide">
                <span>Total room budget in PHP <small>Optional</small></span>
                <input
                  name="budget"
                  type="number"
                  min="0"
                  max="100000000"
                  step="100"
                  inputMode="decimal"
                  placeholder="Share an estimate so we can suggest an arrangement"
                />
              </label>
            </>
          )}

          <label className="inquiry-field inquiry-field-wide">
            <span>Message <small>Optional</small></span>
            <textarea
              name="message"
              rows={4}
              maxLength={2000}
              placeholder="Tell us what you’re planning or ask a question."
            />
          </label>
        </div>

        <div className="inquiry-submit-row">
          <button className="button button-light inquiry-submit" type="submit" disabled={isSending}>
            {isSending ? "Sending…" : "Send inquiry"}
            <span aria-hidden="true">↗</span>
          </button>
          <p>
            This is an inquiry only. Your room or venue is not reserved until
            Moriah confirms it.
          </p>
        </div>
        <p
          className={`inquiry-result${result ? ` inquiry-result-${result.kind}` : ""}`}
          role="status"
          aria-live="polite"
        >
          {result?.message ?? ""}
        </p>
      </form>

      <p className="contact-note inquiry-email">
        Prefer email? <a href={`mailto:${inquiryEmail}`}>{inquiryEmail}</a>
      </p>
    </div>
  );
}
