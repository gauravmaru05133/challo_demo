import Link from "next/link";
import { site } from "@/lib/site";
import { CarIcon, PhoneIcon } from "./icons";

const nav = [
  { href: "/", label: "Home" },
  { href: "/taxi-in-rajkot", label: "Rajkot Taxi" },
  { href: "/rajkot-to-ahmedabad-taxi", label: "Rajkot to Ahmedabad" },
  { href: "/routes", label: "All Routes" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-neutral-950/95 text-white backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2" aria-label={`${site.name} home`}>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-400 text-neutral-950">
            <CarIcon className="h-5 w-5" />
          </span>
          <span className="text-lg font-extrabold tracking-tight">
            Challo<span className="text-yellow-400">Taxi</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-6 text-sm font-medium md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-neutral-300 transition hover:text-yellow-400">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${site.phone}`}
            className="hidden items-center gap-2 rounded-lg bg-yellow-400 px-4 py-2 text-sm font-bold text-neutral-950 transition hover:bg-yellow-300 sm:flex"
          >
            <PhoneIcon className="h-4 w-4" />
            {site.phoneDisplay}
          </a>
          <details className="relative md:hidden">
            <summary className="flex cursor-pointer list-none items-center rounded-lg border border-white/20 px-3 py-2 text-sm">
              Menu
            </summary>
            <nav
              aria-label="Mobile"
              className="absolute right-0 mt-2 w-56 rounded-xl bg-neutral-900 p-2 shadow-xl ring-1 ring-white/10"
            >
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className="block rounded-lg px-3 py-2 text-sm hover:bg-white/10">
                  {item.label}
                </Link>
              ))}
              <a href={`tel:${site.phone}`} className="mt-1 block rounded-lg bg-yellow-400 px-3 py-2 text-sm font-bold text-neutral-950">
                Call {site.phoneDisplay}
              </a>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
