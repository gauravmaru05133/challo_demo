import type { Metadata } from "next";
import BookingForm from "@/components/BookingForm";
import JsonLd from "@/components/JsonLd";
import { Breadcrumbs, breadcrumbSchema, RoutesGrid } from "@/components/Sections";
import { site } from "@/lib/site";

const title = "Outstation Taxi from Rajkot – All Routes & Fares";
const description = `One way and round trip outstation taxi from Rajkot to Ahmedabad, Dwarka, Somnath, Vadodara, Surat, Jamnagar, Junagadh, Bhuj and more. Book on WhatsApp ${site.phoneDisplay}.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/routes" },
  openGraph: { title, description, url: "/routes" },
  twitter: { title, description },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Routes", path: "/routes" },
];

export default function RoutesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <section className="bg-neutral-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">
            Outstation Taxi from <span className="text-yellow-400">Rajkot</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-neutral-300">
            One way drops and round trips from Rajkot to every major city and pilgrimage destination in Gujarat.
          </p>
        </div>
      </section>
      <RoutesGrid title="All Taxi Routes from Rajkot" />
      <section className="bg-neutral-50 py-16">
        <div className="mx-auto max-w-2xl px-4">
          <BookingForm heading="Don't see your route? Book any trip" />
        </div>
      </section>
    </>
  );
}
