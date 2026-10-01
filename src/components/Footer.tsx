import Link from "next/link";
import { routes } from "@/lib/routes";
import { site, whatsappLink } from "@/lib/site";
import { MapPinIcon, PhoneIcon, WhatsAppIcon } from "./icons";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-400">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-extrabold text-white">
            Challo<span className="text-yellow-400">Taxi</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed">
            Trusted taxi service in Rajkot for local rides, airport transfers and one way &amp; round trip
            outstation cabs across Gujarat – available 24x7.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-white">Popular Routes</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {routes.slice(0, 6).map((r) => (
              <li key={r.slug}>
                <Link href={`/${r.slug}`} className="hover:text-yellow-400">
                  {r.from} to {r.to} Taxi
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white">Services</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/taxi-in-rajkot" className="hover:text-yellow-400">Taxi in Rajkot</Link></li>
            <li><Link href="/taxi-in-rajkot#airport" className="hover:text-yellow-400">Rajkot Airport Taxi</Link></li>
            <li><Link href="/rajkot-to-ahmedabad-taxi" className="hover:text-yellow-400">Rajkot to Ahmedabad Cab</Link></li>
            <li><Link href="/routes" className="hover:text-yellow-400">Outstation Taxi from Rajkot</Link></li>
            <li><Link href="/#book" className="hover:text-yellow-400">Book a Taxi</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white">Contact Us</h3>
          <ul className="mt-3 space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-yellow-400" />
              {site.city}, {site.region}, India
            </li>
            <li>
              <a href={`tel:${site.phone}`} className="flex items-center gap-2 hover:text-yellow-400">
                <PhoneIcon className="h-4 w-4 text-yellow-400" />
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={whatsappLink("Hi, I want to book a taxi.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-yellow-400"
              >
                <WhatsAppIcon className="h-4 w-4 text-green-500" />
                WhatsApp {site.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs">
        © {new Date().getFullYear()} {site.name}. Rajkot Taxi Service. All rights reserved.
      </div>
    </footer>
  );
}
