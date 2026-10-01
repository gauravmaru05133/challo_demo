import type { Metadata } from "next";
import Link from "next/link";
import BookingForm from "@/components/BookingForm";
import Faq, { faqSchema, type FaqItem } from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { Fleet, RoutesGrid, SectionHeading, WhyUs } from "@/components/Sections";
import {
  CarIcon,
  CheckIcon,
  MapPinIcon,
  PhoneIcon,
  PlaneIcon,
  StarIcon,
  WhatsAppIcon,
} from "@/components/icons";
import { getRoute, routes, startingFare } from "@/lib/routes";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

const ahmedabad = getRoute("rajkot-to-ahmedabad-taxi")!;

const faqs: FaqItem[] = [
  {
    q: "How can I book a taxi in Rajkot?",
    a: `Fill the booking form on this page and tap "Send on WhatsApp", or call us directly on ${site.phoneDisplay}. We confirm your car and driver on WhatsApp within minutes.`,
  },
  {
    q: "What is the Rajkot to Ahmedabad taxi fare?",
    a: `A one way Rajkot to Ahmedabad taxi starts at approximately ${startingFare(ahmedabad)} for a sedan (about ${ahmedabad.distanceKm} km). SUV and Innova Crysta are also available. Toll and parking are extra.`,
  },
  {
    q: "Is Challo Taxi available 24 hours in Rajkot?",
    a: "Yes. Our Rajkot taxi service runs 24x7, including early morning airport drops and late night railway station pickups.",
  },
  {
    q: "Do you provide one way taxi from Rajkot?",
    a: "Yes. We offer one way drop taxis from Rajkot to Ahmedabad, Vadodara, Surat, Dwarka, Somnath, Jamnagar and other cities in Gujarat – you pay only for one side.",
  },
  {
    q: "Do you provide Rajkot airport taxi?",
    a: "Yes. We provide pickup and drop to Rajkot International Airport (Hirasar) and to Ahmedabad Airport, with flight-time based scheduling.",
  },
  {
    q: "Which cars are available for booking?",
    a: "You can choose from Sedan (Dzire, Etios), SUV (Ertiga), Toyota Innova Crysta and Tempo Traveller for groups.",
  },
];

const services = [
  { icon: CarIcon, title: "Outstation Taxi", text: "One way & round trip cabs from Rajkot to any city in Gujarat and beyond." },
  { icon: MapPinIcon, title: "Local Rajkot Taxi", text: "Hourly packages for city rides, shopping, meetings and sightseeing in Rajkot." },
  { icon: PlaneIcon, title: "Airport Transfers", text: "Rajkot (Hirasar) and Ahmedabad airport pickup & drop, on time, every time." },
  { icon: StarIcon, title: "Tour Packages", text: "Dwarka, Somnath, Gir, Kutch and Statue of Unity tours with experienced drivers." },
];

export default function Home() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />

      <section className="relative overflow-hidden bg-neutral-950 text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(250,204,21,0.25),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(250,204,21,0.12),transparent_40%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-yellow-400/10 px-4 py-1.5 text-sm font-medium text-yellow-300 ring-1 ring-yellow-400/30">
              <StarIcon className="h-4 w-4" /> Rated 4.9 by Rajkot travellers
            </p>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl">
              Rajkot Taxi Service –<br />
              <span className="text-yellow-400">Book Taxi in Rajkot</span> &amp; Rajkot to Ahmedabad Cab
            </h1>
            <p className="mt-5 max-w-xl text-lg text-neutral-300">
              Safe, clean and affordable cabs for local rides, airport transfers and one way or round trip
              outstation journeys from Rajkot. Book in seconds on WhatsApp – available 24x7.
            </p>
            <ul className="mt-6 grid max-w-lg gap-2 text-neutral-200 sm:grid-cols-2">
              {["One way fares", "Verified drivers", "AC cars", "No hidden charges"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <CheckIcon className="h-5 w-5 text-yellow-400" /> {t}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`tel:${site.phone}`}
                className="flex items-center gap-2 rounded-xl bg-yellow-400 px-6 py-3 font-bold text-neutral-950 transition hover:bg-yellow-300"
              >
                <PhoneIcon className="h-5 w-5" /> Call {site.phoneDisplay}
              </a>
              <a
                href={whatsappLink("Hi, I want to book a taxi.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3 font-semibold transition hover:bg-white/10"
              >
                <WhatsAppIcon className="h-5 w-5 text-green-400" /> WhatsApp Us
              </a>
            </div>
          </div>
          <BookingForm />
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title="Our Taxi Services in Rajkot" subtitle="Whatever your journey, we have the right ride for you." />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-neutral-200 p-6 transition hover:border-yellow-400 hover:shadow-lg">
                <Icon className="h-9 w-9 text-yellow-500" />
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-yellow-400">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-10 text-neutral-950 md:flex-row">
          <div>
            <h2 className="text-2xl font-extrabold sm:text-3xl">Rajkot to Ahmedabad Taxi from {startingFare(ahmedabad)}</h2>
            <p className="mt-1 font-medium">
              {ahmedabad.distanceKm} km · approx. {ahmedabad.duration} · One way &amp; round trip · Ahmedabad airport drop
            </p>
          </div>
          <Link
            href={`/${ahmedabad.slug}`}
            className="rounded-xl bg-neutral-950 px-6 py-3 font-bold text-white transition hover:bg-neutral-800"
          >
            View Fares &amp; Book
          </Link>
        </div>
      </section>

      <RoutesGrid items={routes} />
      <Fleet />
      <WhyUs />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title="Book Your Rajkot Taxi in 3 Easy Steps" />
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              ["Fill the form", "Enter pickup, drop, date, time and car type in the booking form."],
              ["Send on WhatsApp", "Tap the button – your booking details reach us instantly on WhatsApp."],
              ["Get confirmation", "We confirm the fare, car and driver details. Enjoy your ride!"],
            ].map(([title, text], i) => (
              <li key={title} className="rounded-2xl bg-neutral-50 p-6 ring-1 ring-neutral-200">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-950 font-bold text-yellow-400">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-neutral-600">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-neutral-50 py-16">
        <article className="mx-auto max-w-4xl px-4 leading-relaxed text-neutral-700">
          <h2 className="text-3xl font-bold text-neutral-900">Best Taxi Service in Rajkot</h2>
          <p className="mt-4">
            Looking for a reliable <strong>taxi in Rajkot</strong>? {site.name} is a trusted{" "}
            <strong>Rajkot taxi service</strong> offering local cabs, airport transfers and outstation trips across
            Gujarat. Whether you need a quick ride to Rajkot railway station, a drop at Rajkot International Airport
            in Hirasar, or a comfortable <Link href="/rajkot-to-ahmedabad-taxi" className="font-semibold text-yellow-700 underline">Rajkot to Ahmedabad taxi</Link>,
            our professional drivers and well-maintained AC cars make every journey smooth and safe.
          </p>
          <h3 className="mt-8 text-xl font-semibold text-neutral-900">Rajkot to Ahmedabad Cab – One Way &amp; Round Trip</h3>
          <p className="mt-3">
            Rajkot to Ahmedabad is our most popular route. The {ahmedabad.distanceKm} km drive takes about{" "}
            {ahmedabad.duration} on {ahmedabad.via}. Book a one way Rajkot to Ahmedabad cab and pay only for the drop,
            or choose a round trip for business meetings and family visits. We also provide{" "}
            <strong>Ahmedabad to Rajkot taxi</strong> and direct Ahmedabad airport drops.
          </p>
          <h3 className="mt-8 text-xl font-semibold text-neutral-900">Outstation Taxi from Rajkot</h3>
          <p className="mt-3">
            Travel from Rajkot to{" "}
            {routes.slice(2).map((r, i, arr) => (
              <span key={r.slug}>
                <Link href={`/${r.slug}`} className="text-yellow-700 underline">{r.to}</Link>
                {i < arr.length - 2 ? ", " : i === arr.length - 2 ? " and " : ""}
              </span>
            ))}{" "}
            with transparent per-km fares, experienced highway drivers and 24x7 support.
          </p>
          <h3 className="mt-8 text-xl font-semibold text-neutral-900">Local Taxi in Rajkot</h3>
          <p className="mt-3">
            Explore Rajkot – Watson Museum, Rotary Dolls Museum, Aji Dam, Ishwariya Park and Pradyuman Zoological Park –
            or run errands across the city with our hourly <Link href="/taxi-in-rajkot" className="text-yellow-700 underline">local Rajkot taxi</Link> packages.
          </p>
        </article>
      </section>

      <Faq items={faqs} title="Rajkot Taxi – Frequently Asked Questions" />
    </>
  );
}
