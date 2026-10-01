export const site = {
  name: "Challo Taxi",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.challotaxi.com").replace(/\/$/, ""),
  phone: "+918000101178",
  phoneDisplay: "+91 80001 01178",
  whatsappNumber: "918000101178",
  city: "Rajkot",
  region: "Gujarat",
  country: "IN",
  geo: { latitude: 22.3039, longitude: 70.8022 },
  tagline: "Rajkot Taxi Service – Local & Outstation Cabs 24x7",
  description:
    "Book a reliable taxi in Rajkot with Challo Taxi. One way & round trip Rajkot to Ahmedabad taxi, airport transfers, local Rajkot cabs and outstation trips across Gujarat. Clean AC cars, verified drivers, 24x7 booking on WhatsApp.",
  keywords: [
    "rajkot taxi",
    "taxi in rajkot",
    "rajkot taxi service",
    "rajkot to ahmedabad taxi",
    "rajkot to ahmedabad cab",
    "rajkot to ahmedabad one way taxi",
    "ahmedabad to rajkot taxi",
    "cab in rajkot",
    "rajkot cab service",
    "outstation taxi rajkot",
    "rajkot airport taxi",
    "one way taxi rajkot",
    "taxi near me rajkot",
  ],
};

export function whatsappLink(text?: string) {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function absoluteUrl(path = "/") {
  return `${site.url}${path === "/" ? "" : path}`;
}
