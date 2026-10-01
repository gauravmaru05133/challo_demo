"use client";

import { useState, type FormEvent } from "react";
import { vehicles } from "@/lib/fleet";
import { whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./icons";

const tripTypes = ["One Way", "Round Trip", "Local (Rajkot City)", "Airport Transfer"];

type Props = {
  heading?: string;
  defaultPickup?: string;
  defaultDrop?: string;
  defaultTripType?: string;
};

const inputClass =
  "w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/40";
const labelClass = "mb-1 block text-xs font-semibold uppercase tracking-wide text-neutral-600";

export default function BookingForm({
  heading = "Book Your Taxi",
  defaultPickup = "Rajkot",
  defaultDrop = "",
  defaultTripType = "One Way",
}: Props) {
  const [tripType, setTripType] = useState(defaultTripType);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const isLocal = tripType.startsWith("Local");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();

    const name = get("name");
    const phone = get("phone");
    const pickup = get("pickup");
    const drop = get("drop");

    if (!name || !pickup || (!isLocal && !drop)) {
      setError("Please fill in your name, pickup and drop location.");
      return;
    }
    if (phone.replace(/\D/g, "").length < 10) {
      setError("Please enter a valid 10 digit mobile number.");
      return;
    }
    setError("");

    const lines = [
      "*New Taxi Booking Request*",
      `*Name:* ${name}`,
      `*Mobile:* ${phone}`,
      `*Trip Type:* ${tripType}`,
      `*Pickup:* ${pickup}`,
      drop && `*Drop:* ${drop}`,
      get("date") && `*Date:* ${get("date")}`,
      get("time") && `*Time:* ${get("time")}`,
      tripType === "Round Trip" && get("returnDate") && `*Return Date:* ${get("returnDate")}`,
      `*Car:* ${get("vehicle")}`,
      `*Passengers:* ${get("passengers")}`,
      get("message") && `*Note:* ${get("message")}`,
    ].filter(Boolean);

    const url = whatsappLink(lines.join("\n"));
    const win = window.open(url, "_blank");
    if (win) win.opener = null;
    else window.location.href = url;
    setSent(true);
  }

  return (
    <form
      id="book"
      onSubmit={handleSubmit}
      className="scroll-mt-24 rounded-2xl bg-white p-5 shadow-2xl ring-1 ring-black/5 sm:p-6"
      aria-label="Taxi booking form"
    >
      <h2 className="text-xl font-bold text-neutral-900 sm:text-2xl">{heading}</h2>
      <p className="mt-1 text-sm text-neutral-500">
        Fill the details &amp; send – we confirm on WhatsApp within minutes.
      </p>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {tripTypes.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTripType(t)}
            aria-pressed={tripType === t}
            className={`rounded-lg border px-2 py-2 text-xs font-semibold transition ${
              tripType === t
                ? "border-yellow-400 bg-yellow-400 text-neutral-900"
                : "border-neutral-300 bg-white text-neutral-600 hover:border-yellow-400"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>Your Name</label>
          <input id="name" name="name" required autoComplete="name" placeholder="Full name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>Mobile Number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel"
            placeholder="10 digit mobile"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="pickup" className={labelClass}>Pickup Location</label>
          <input id="pickup" name="pickup" required defaultValue={defaultPickup} placeholder="e.g. Rajkot" className={inputClass} />
        </div>
        <div>
          <label htmlFor="drop" className={labelClass}>
            Drop Location{isLocal && <span className="normal-case text-neutral-400"> (optional)</span>}
          </label>
          <input
            id="drop"
            name="drop"
            required={!isLocal}
            defaultValue={defaultDrop}
            placeholder={isLocal ? "City ride / hourly" : "e.g. Ahmedabad"}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="date" className={labelClass}>Pickup Date</label>
          <input id="date" name="date" type="date" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="time" className={labelClass}>Pickup Time</label>
          <input id="time" name="time" type="time" required className={inputClass} />
        </div>
        {tripType === "Round Trip" && (
          <div className="sm:col-span-2">
            <label htmlFor="returnDate" className={labelClass}>Return Date</label>
            <input id="returnDate" name="returnDate" type="date" className={inputClass} />
          </div>
        )}
        <div>
          <label htmlFor="vehicle" className={labelClass}>Car Type</label>
          <select id="vehicle" name="vehicle" className={inputClass} defaultValue={vehicles[0].name}>
            {vehicles.map((v) => (
              <option key={v.id} value={v.name}>
                {v.name} ({v.seats} seats)
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="passengers" className={labelClass}>Passengers</label>
          <select id="passengers" name="passengers" className={inputClass} defaultValue="2">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className={labelClass}>Message (optional)</label>
          <textarea id="message" name="message" rows={2} placeholder="Luggage, stops, special requests…" className={inputClass} />
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}
      {sent && !error && (
        <p role="status" className="mt-3 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
          WhatsApp opened with your booking details – just tap send to confirm.
        </p>
      )}

      <button
        type="submit"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3.5 text-base font-bold text-white shadow-lg transition hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-500/40"
      >
        <WhatsAppIcon className="h-5 w-5" />
        Send on WhatsApp
      </button>
    </form>
  );
}
