import Link from "next/link";
import { formatINR, vehicles } from "@/lib/fleet";
import { routes, startingFare, type TaxiRoute } from "@/lib/routes";
import { absoluteUrl } from "@/lib/site";
import {
  ArrowRightIcon,
  CarIcon,
  ClockIcon,
  RupeeIcon,
  ShieldIcon,
  UsersIcon,
} from "./icons";

export function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-neutral-600">{subtitle}</p>}
    </div>
  );
}

export function WhyUs() {
  const items = [
    { icon: ClockIcon, title: "24x7 Availability", text: "Early morning airport drop or late night pickup – we are always on call." },
    { icon: ShieldIcon, title: "Verified Drivers", text: "Experienced, police-verified drivers who know Gujarat highways well." },
    { icon: RupeeIcon, title: "Transparent Fares", text: "Clear per-km pricing, no hidden charges. One way fares available." },
    { icon: CarIcon, title: "Clean AC Cars", text: "Well maintained sedans, SUVs, Innova Crysta and Tempo Travellers." },
  ];
  return (
    <section className="bg-neutral-50 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          title="Why Choose Challo Taxi in Rajkot?"
          subtitle="Thousands of travellers trust us for safe, punctual and affordable taxi rides."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-200">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400 text-neutral-950">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-neutral-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Fleet() {
  return (
    <section className="py-16" id="fleet">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading title="Our Taxi Fleet" subtitle="Choose the right car for your trip – from solo rides to group tours." />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {vehicles.map((v) => (
            <div key={v.id} className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <CarIcon className="h-10 w-10 text-yellow-500" />
              <h3 className="mt-4 text-xl font-bold text-neutral-900">{v.name}</h3>
              <p className="text-sm text-neutral-500">{v.models}</p>
              <div className="mt-4 flex items-center gap-4 text-sm text-neutral-700">
                <span className="flex items-center gap-1"><UsersIcon className="h-4 w-4" /> {v.seats} seats</span>
                <span>{v.luggage}</span>
              </div>
              <p className="mt-4 text-2xl font-extrabold text-neutral-900">
                {formatINR(v.perKm)}
                <span className="text-sm font-medium text-neutral-500"> / km</span>
              </p>
              <Link
                href="#book"
                className="mt-5 rounded-lg bg-neutral-900 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-yellow-400 hover:text-neutral-900"
              >
                Book {v.name}
              </Link>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-neutral-500">
          Rates are indicative for outstation trips. Toll, parking and night charges extra where applicable.
        </p>
      </div>
    </section>
  );
}

export function RoutesGrid({ items = routes, title = "Popular Taxi Routes from Rajkot" }: { items?: TaxiRoute[]; title?: string }) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading title={title} subtitle="One way and round trip cabs at affordable fares." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((r) => (
            <Link
              key={r.slug}
              href={`/${r.slug}`}
              className="group flex items-center justify-between rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:border-yellow-400 hover:shadow-md"
            >
              <div>
                <h3 className="font-semibold text-neutral-900">
                  {r.from} to {r.to} Taxi
                </h3>
                <p className="mt-1 text-sm text-neutral-500">
                  {r.distanceKm} km · {r.duration}
                </p>
                <p className="mt-2 text-sm font-semibold text-green-700">From {startingFare(r)}</p>
              </div>
              <ArrowRightIcon className="h-5 w-5 text-neutral-400 transition group-hover:translate-x-1 group-hover:text-yellow-500" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-neutral-400">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => (
          <li key={item.path} className="flex items-center gap-1">
            {i > 0 && <span>/</span>}
            {i === items.length - 1 ? (
              <span className="text-neutral-200">{item.name}</span>
            ) : (
              <Link href={item.path} className="hover:text-yellow-400">{item.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
