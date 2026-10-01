import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import FloatingButtons from "@/components/FloatingButtons";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import { routes } from "@/lib/routes";
import { absoluteUrl, site } from "@/lib/site";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const defaultTitle = "Rajkot Taxi Service | Taxi in Rajkot & Rajkot to Ahmedabad Cab";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${defaultTitle} | ${site.name}`, template: `%s | ${site.name}` },
  description: site.description,
  keywords: site.keywords,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  category: "travel",
  formatDetection: { telephone: true },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.name,
    title: defaultTitle,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title: defaultTitle, description: site.description },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
  other: {
    "geo.region": "IN-GJ",
    "geo.placename": site.city,
    "geo.position": `${site.geo.latitude};${site.geo.longitude}`,
    ICBM: `${site.geo.latitude}, ${site.geo.longitude}`,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

const businessSchema = {
  "@context": "https://schema.org",
  "@type": "TaxiService",
  "@id": `${site.url}/#taxiservice`,
  name: `${site.name} – Rajkot Taxi Service`,
  url: site.url,
  description: site.description,
  areaServed: [
    { "@type": "City", name: "Rajkot" },
    ...routes.map((r) => ({ "@type": "City", name: r.to })),
    { "@type": "State", name: "Gujarat" },
  ],
  provider: {
    "@type": "LocalBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    url: site.url,
    image: absoluteUrl("/opengraph-image"),
    telephone: site.phone,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: site.region,
      addressCountry: site.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.latitude, longitude: site.geo.longitude },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.phone,
      contactType: "reservations",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi", "Gujarati"],
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${poppins.variable} h-full scroll-smooth antialiased`}>
      <body className="flex min-h-full flex-col bg-white font-sans text-neutral-900">
        <JsonLd data={businessSchema} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  );
}
