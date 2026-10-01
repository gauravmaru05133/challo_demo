import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BookingForm from "@/components/BookingForm";
import Faq, { faqSchema } from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { Breadcrumbs, breadcrumbSchema, Fleet, RoutesGrid, WhyUs } from "@/components/Sections";
import { CheckIcon, ClockIcon, MapPinIcon, PhoneIcon, RupeeIcon } from "@/components/icons";
import { formatINR } from "@/lib/fleet";
import { getRoute, routeFaqs, routeFares, routes, startingFare } from "@/lib/routes";
import { absoluteUrl, site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return routes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const route = getRoute(slug);
  if (!route) return {};

  const title = `${route.from} to ${route.to} Taxi from ${startingFare(route)} | One Way & Round Trip Cab`;
  const description = `Book ${route.from} to ${route.to} taxi at the best fare. ${route.distanceKm} km, approx. ${route.duration}. One way & round trip cab with AC Sedan, SUV & Innova Crysta. 24x7 booking on WhatsApp ${site.phoneDisplay}.`;
  const path = `/${route.slug}`;

  return {
    title,
    description,
    keywords: [
      `${route.from} to ${route.to} taxi`,
      `${route.from} to ${route.to} cab`,
      `${route.from} to ${route.to} one way taxi`,
      `${route.from} to ${route.to} taxi fare`,
      `${route.to} to ${route.from} taxi`,
      `${route.from.toLowerCase()} taxi`,
      `taxi in ${route.from.toLowerCase()}`,
    ],
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type: "website" },
    twitter: { title, description },
  };
}

export default async function RoutePage({ params }: Props) {
  const { slug } = await params;
  const route = getRoute(slug);
  if (!route) notFound();

  const fares = routeFares(route);
  const faqs = routeFaqs(route);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Routes", path: "/routes" },
    { name: `${route.from} to ${route.to} Taxi`, path: `/${route.slug}` },
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    name: `${route.from} to ${route.to} Taxi`,
    url: absoluteUrl(`/${route.slug}`),
    provider: { "@id": `${site.url}/#business` },
    areaServed: [
      { "@type": "City", name: route.from },
      { "@type": "City", name: route.to },
    ],
    offers: fares.map(({ vehicle, fare }) => ({
      "@type": "Offer",
      name: `${route.from} to ${route.to} ${vehicle.name} (one way)`,
      price: fare,
      priceCurrency: "INR",
    })),
  };

  const related = routes.filter((r) => r.slug !== route.slug).slice(0, 6);

  return (
    <>
      <JsonLd data={[serviceSchema, faqSchema(faqs), breadcrumbSchema(crumbs)]} />

      <section className="relative overflow-hidden bg-neutral-950 text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(250,204,21,0.22),transparent_45%)]" />
        <div className="relative mx-auto grid max-w-7xl items-start gap-10 px-4 py-12 lg:grid-cols-2 lg:py-16">
          <div>
            <Breadcrumbs items={crumbs} />
            <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">
              {route.from} to {route.to} Taxi
              <span className="block text-2xl font-bold text-yellow-400 sm:text-3xl">
                One Way &amp; Round Trip Cab from {startingFare(route)}
              </span>
            </h1>
            <p className="mt-5 text-lg text-neutral-300">{route.about}</p>

            <dl className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { icon: MapPinIcon, label: "Distance", value: `${route.distanceKm} km` },
                { icon: ClockIcon, label: "Travel Time", value: route.duration },
                { icon: RupeeIcon, label: "Fare From", value: startingFare(route) },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                  <dt className="flex items-center gap-2 text-xs uppercase tracking-wide text-neutral-400">
                    <Icon className="h-4 w-4 text-yellow-400" /> {label}
                  </dt>
                  <dd className="mt-1 text-lg font-bold">{value}</dd>
                </div>
              ))}
            </dl>

            <ul className="mt-8 space-y-2 text-neutral-200">
              {[
                `Doorstep pickup anywhere in ${route.from}`,
                "Pay only one side for one way drop",
                "Experienced, verified highway drivers",
                "Clean AC cars, 24x7 support",
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

          <BookingForm
            heading={`Book ${route.from} to ${route.to} Cab`}
            defaultPickup={route.from}
            defaultDrop={route.to}
            defaultTripType={route.to.includes("Airport") ? "Airport Transfer" : "One Way"}
          />
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-3xl font-bold">
            {route.from} to {route.to} Taxi Fare
          </h2>
          <p className="mt-3 text-center text-neutral-600">
            Approximate one way fares for {route.distanceKm} km. Round trip fares available on request.
          </p>
          <div className="mt-8 overflow-x-auto rounded-2xl ring-1 ring-neutral-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-950 text-white">
                <tr>
                  <th className="px-5 py-4 font-semibold">Car Type</th>
                  <th className="px-5 py-4 font-semibold">Models</th>
                  <th className="px-5 py-4 font-semibold">Seats</th>
                  <th className="px-5 py-4 font-semibold">Rate / km</th>
                  <th className="px-5 py-4 font-semibold">One Way Fare</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 bg-white">
                {fares.map(({ vehicle, fare }) => (
                  <tr key={vehicle.id}>
                    <td className="px-5 py-4 font-semibold">{vehicle.name}</td>
                    <td className="px-5 py-4 text-neutral-600">{vehicle.models}</td>
                    <td className="px-5 py-4">{vehicle.seats}</td>
                    <td className="px-5 py-4">{formatINR(vehicle.perKm)}</td>
                    <td className="px-5 py-4 font-bold text-green-700">{formatINR(fare)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-center text-xs text-neutral-500">
            Toll, parking and night charges extra where applicable. Final fare confirmed on WhatsApp.
          </p>
        </div>
      </section>

      <section className="bg-neutral-50 py-16">
        <article className="mx-auto max-w-4xl px-4 leading-relaxed text-neutral-700">
          <h2 className="text-3xl font-bold text-neutral-900">
            Book {route.from} to {route.to} Cab with {site.name}
          </h2>
          <p className="mt-4">
            Planning a trip from {route.from} to {route.to}? {site.name} offers comfortable and affordable{" "}
            <strong>{route.from} to {route.to} taxi</strong> service with doorstep pickup from your home, hotel,
            railway station or Rajkot airport. The distance from {route.from} to {route.to} is about{" "}
            {route.distanceKm} km and the drive takes around {route.duration}, travelling {route.via}.
          </p>
          <p className="mt-4">
            Choose a <strong>one way {route.from} to {route.to} cab</strong> and pay only for the drop, or book a
            round trip if you plan to return. We also run <strong>{route.to} to {route.from} taxi</strong> service
            every day. All our cars are air conditioned, regularly sanitised and driven by experienced,
            police-verified drivers.
          </p>
          <p className="mt-4">
            To book, simply fill the form above and tap <em>Send on WhatsApp</em>, or call {site.phoneDisplay}. Our
            team confirms your booking within minutes, 24 hours a day.
          </p>
        </article>
      </section>

      <Fleet />
      <WhyUs />
      <Faq items={faqs} title={`${route.from} to ${route.to} Taxi – FAQs`} />
      <RoutesGrid items={related} title="Other Taxi Routes from Rajkot" />
    </>
  );
}
