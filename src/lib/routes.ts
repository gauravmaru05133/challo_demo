import { estimateFare, formatINR, vehicles } from "./fleet";
import { site } from "./site";

export type TaxiRoute = {
  slug: string;
  from: string;
  to: string;
  distanceKm: number;
  duration: string;
  via: string;
  about: string;
  popular?: boolean;
};

export const routes: TaxiRoute[] = [
  {
    slug: "rajkot-to-ahmedabad-taxi",
    from: "Rajkot",
    to: "Ahmedabad",
    distanceKm: 215,
    duration: "4 hours",
    via: "NH 47 via Chotila, Limbdi and Bagodara",
    about:
      "Ahmedabad is Gujarat's biggest business hub, and Rajkot to Ahmedabad is our most booked route – for office visits, hospital appointments, railway connections, shopping and family trips.",
    popular: true,
  },
  {
    slug: "rajkot-to-ahmedabad-airport-taxi",
    from: "Rajkot",
    to: "Ahmedabad Airport",
    distanceKm: 225,
    duration: "4 hours 15 minutes",
    via: "NH 47 via Chotila, Limbdi and Bagodara",
    about:
      "Catch your flight on time from Sardar Vallabhbhai Patel International Airport. Our drivers track your departure time and plan the pickup with a comfortable buffer for traffic.",
    popular: true,
  },
  {
    slug: "rajkot-to-dwarka-taxi",
    from: "Rajkot",
    to: "Dwarka",
    distanceKm: 225,
    duration: "4 hours 30 minutes",
    via: "Jamnagar and Khambhalia",
    about:
      "Visit the holy Dwarkadhish Temple, Bet Dwarka, Nageshwar Jyotirlinga and Shivrajpur Beach with a comfortable cab from Rajkot.",
    popular: true,
  },
  {
    slug: "rajkot-to-somnath-taxi",
    from: "Rajkot",
    to: "Somnath",
    distanceKm: 190,
    duration: "4 hours",
    via: "Gondal, Jetpur, Junagadh and Veraval",
    about:
      "Plan a peaceful darshan at Somnath Jyotirlinga, the first of the twelve Jyotirlingas, with an experienced driver who knows the route well.",
    popular: true,
  },
  {
    slug: "rajkot-to-vadodara-taxi",
    from: "Rajkot",
    to: "Vadodara",
    distanceKm: 300,
    duration: "5 hours 30 minutes",
    via: "Bagodara and Tarapur",
    about:
      "Travel to Vadodara for business, education or family visits in a clean AC car with a professional driver.",
  },
  {
    slug: "rajkot-to-surat-taxi",
    from: "Rajkot",
    to: "Surat",
    distanceKm: 450,
    duration: "8 hours",
    via: "Bagodara, Tarapur, Vadodara and Bharuch",
    about:
      "A long-distance trip to Surat – the diamond and textile city – made comfortable with spacious cars and drivers experienced on highway routes.",
  },
  {
    slug: "rajkot-to-jamnagar-taxi",
    from: "Rajkot",
    to: "Jamnagar",
    distanceKm: 90,
    duration: "1 hour 45 minutes",
    via: "Dhrol",
    about:
      "Quick and affordable cab from Rajkot to Jamnagar for business meetings, Reliance refinery visits or a day trip.",
  },
  {
    slug: "rajkot-to-junagadh-taxi",
    from: "Rajkot",
    to: "Junagadh",
    distanceKm: 100,
    duration: "2 hours",
    via: "Gondal and Jetpur on NH 27",
    about:
      "Visit Girnar, Uparkot Fort and the Junagadh ropeway, or continue to Sasan Gir for a lion safari.",
  },
  {
    slug: "rajkot-to-bhuj-taxi",
    from: "Rajkot",
    to: "Bhuj",
    distanceKm: 240,
    duration: "4 hours 30 minutes",
    via: "Morbi and Samakhiyali",
    about:
      "Explore Kutch – Bhuj, the White Rann and Kala Dungar – with a reliable outstation taxi from Rajkot.",
  },
  {
    slug: "rajkot-to-porbandar-taxi",
    from: "Rajkot",
    to: "Porbandar",
    distanceKm: 180,
    duration: "3 hours 30 minutes",
    via: "Gondal and Jetpur",
    about:
      "Visit Kirti Mandir, the birthplace of Mahatma Gandhi, and the Porbandar beach with a comfortable cab.",
  },
];

export function getRoute(slug: string) {
  return routes.find((r) => r.slug === slug);
}

export function routeFares(route: TaxiRoute) {
  return vehicles.map((v) => ({
    vehicle: v,
    fare: estimateFare(route.distanceKm, v.perKm),
  }));
}

export function startingFare(route: TaxiRoute) {
  return formatINR(estimateFare(route.distanceKm, vehicles[0].perKm));
}

export function routeFaqs(route: TaxiRoute) {
  const fares = routeFares(route);
  const sedan = formatINR(fares[0].fare);
  const suv = formatINR(fares[1].fare);
  return [
    {
      q: `How far is ${route.to} from ${route.from} by road?`,
      a: `${route.to} is about ${route.distanceKm} km from ${route.from}. By taxi the journey usually takes around ${route.duration}, travelling ${route.via}.`,
    },
    {
      q: `What is the taxi fare from ${route.from} to ${route.to}?`,
      a: `A one way ${route.from} to ${route.to} taxi starts at approximately ${sedan} for a sedan and ${suv} for an SUV. Toll and parking are extra. Send your trip details on WhatsApp for an exact quote.`,
    },
    {
      q: `Do you provide ${route.to} to ${route.from} taxi as well?`,
      a: `Yes. We provide both ${route.from} to ${route.to} and ${route.to} to ${route.from} taxi service, as one way drops or round trips.`,
    },
    {
      q: `Is one way taxi available from ${route.from} to ${route.to}?`,
      a: `Yes, you can book a one way cab and pay only for the drop – no return fare is charged.`,
    },
    {
      q: `How do I book a ${route.from} to ${route.to} cab?`,
      a: `Fill in the booking form on this page and tap "Send on WhatsApp". Your trip details are sent to us on WhatsApp and we confirm the car, driver and fare within minutes. You can also call ${site.phoneDisplay}.`,
    },
  ];
}
