import type { Metadata } from "next";
import Link from "next/link";
import BookingForm from "@/components/BookingForm";
import Faq, { faqSchema, type FaqItem } from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { Breadcrumbs, breadcrumbSchema, Fleet, RoutesGrid, SectionHeading, WhyUs } from "@/components/Sections";
import { CheckIcon, ClockIcon, MapPinIcon, PhoneIcon, PlaneIcon } from "@/components/icons";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";

const title = "Taxi in Rajkot | Rajkot Taxi Service 24x7 – Local, Airport & Outstation Cab";
const description = `Need a taxi in Rajkot? Book Rajkot taxi service for local rides, hourly packages, Rajkot airport (Hirasar) pickup & drop and outstation trips. Clean AC cabs, verified drivers. Call or WhatsApp ${site.phoneDisplay}.`;

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "taxi in rajkot",
    "rajkot taxi",
    "rajkot taxi service",
    "cab in rajkot",
    "local taxi rajkot",
    "rajkot airport taxi",
    "hirasar airport taxi",
    "rajkot railway station taxi",
    "taxi near me rajkot",
  ],
  alternates: { canonical: "/taxi-in-rajkot" },
  openGraph: { title, description, url: "/taxi-in-rajkot" },
  twitter: { title, description },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Taxi in Rajkot", path: "/taxi-in-rajkot" },
];

const packages = [
  { name: "4 Hours / 40 km", text: "Ideal for shopping, meetings and short city errands." },
  { name: "8 Hours / 80 km", text: "Full day local sightseeing or business visits in Rajkot." },
  { name: "12 Hours / 120 km", text: "Extended day with nearby places like Gondal or Virpur." },
];

const faqs: FaqItem[] = [
  {
    q: "How do I book a taxi in Rajkot?",
    a: `Fill the booking form and tap "Send on WhatsApp", or call ${site.phoneDisplay}. We confirm your cab within minutes, 24x7.`,
  },
  {
    q: "Do you provide taxi to Rajkot International Airport (Hirasar)?",
    a: "Yes. We provide pickup and drop between Rajkot city and Rajkot International Airport at Hirasar, timed to your flight.",
  },
  {
    q: "Do you have hourly local taxi packages in Rajkot?",
    a: "Yes. Choose 4 hours / 40 km, 8 hours / 80 km or 12 hours / 120 km packages for local travel within Rajkot.",
  },
  {
    q: "Is your Rajkot taxi service available at night?",
    a: "Yes. Our taxi service in Rajkot operates 24 hours a day, 7 days a week, including late night railway station and bus stand pickups.",
  },
];

export default function TaxiInRajkotPage() {
  return (
    <>
      <JsonLd data={[faqSchema(faqs), breadcrumbSchema(crumbs)]} />

      <section className="relative overflow-hidden bg-neutral-950 text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(250,204,21,0.22),transparent_45%)]" />
        <div className="relative mx-auto grid max-w-7xl items-start gap-10 px-4 py-12 lg:grid-cols-2 lg:py-16">
          <div>
            <Breadcrumbs items={crumbs} />
            <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">
              Taxi in Rajkot
              <span className="block text-2xl font-bold text-yellow-400 sm:text-3xl">
                Local, Airport &amp; Outstation Cabs 24x7
              </span>
            </h1>
            <p className="mt-5 text-lg text-neutral-300">
              {site.name} is a dependable Rajkot taxi service for everyday city travel, railway station and airport
              transfers, hourly rentals and outstation trips across Gujarat.
            </p>
            <ul className="mt-8 space-y-2 text-neutral-200">
              {[
                "Pickup anywhere in Rajkot city",
                "Rajkot airport (Hirasar) & railway station transfers",
                "Hourly local packages",
                "Sedan, SUV, Innova Crysta & Tempo Traveller",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <CheckIcon className="h-5 w-5 text-yellow-400" /> {t}
                </li>
              ))}
            </ul>
            <a
              href={`tel:${site.phone}`}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-6 py-3 font-bold text-neutral-950 transition hover:bg-yellow-300"
            >
              <PhoneIcon className="h-5 w-5" /> Call {site.phoneDisplay}
            </a>
          </div>
          <BookingForm heading="Book a Taxi in Rajkot" defaultTripType="Local (Rajkot City)" />
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title="Local Rajkot Taxi Packages" subtitle="Hire a cab by the hour for flexible city travel." />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {packages.map((p) => (
              <div key={p.name} className="rounded-2xl border border-neutral-200 p-6 shadow-sm">
                <ClockIcon className="h-8 w-8 text-yellow-500" />
                <h3 className="mt-4 text-xl font-bold">{p.name}</h3>
                <p className="mt-2 text-sm text-neutral-600">{p.text}</p>
                <Link href="#book" className="mt-4 inline-block text-sm font-semibold text-yellow-700 underline">
                  Book this package
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="airport" className="scroll-mt-24 bg-neutral-50 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-2">
          <div>
            <PlaneIcon className="h-10 w-10 text-yellow-500" />
            <h2 className="mt-4 text-3xl font-bold">Rajkot Airport Taxi</h2>
            <p className="mt-4 leading-relaxed text-neutral-700">
              Reach Rajkot International Airport at Hirasar stress-free. Our drivers plan pickups around your flight
              time, help with luggage and wait for delayed arrivals. We also provide direct{" "}
              <Link href="/rajkot-to-ahmedabad-airport-taxi" className="font-semibold text-yellow-700 underline">
                Rajkot to Ahmedabad airport taxi
              </Link>{" "}
              for international and connecting flights.
            </p>
          </div>
          <div>
            <MapPinIcon className="h-10 w-10 text-yellow-500" />
            <h2 className="mt-4 text-3xl font-bold">Places We Cover in Rajkot</h2>
            <p className="mt-4 leading-relaxed text-neutral-700">
              Kalawad Road, 150 Feet Ring Road, Race Course, Yagnik Road, University Road, Mavdi, Kothariya, Raiya
              Road, Gondal Road, Rajkot Railway Station, Rajkot ST Bus Stand, Metoda GIDC, Shapar-Veraval and all
              nearby areas.
            </p>
          </div>
        </div>
      </section>

      <Fleet />
      <WhyUs />
      <Faq items={faqs} title="Taxi in Rajkot – FAQs" />
      <RoutesGrid items={routes} title="Outstation Taxi from Rajkot" />
    </>
  );
}
