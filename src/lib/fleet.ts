export type Vehicle = {
  id: string;
  name: string;
  models: string;
  seats: number;
  luggage: string;
  perKm: number;
};

// Indicative per-km rates used for fare estimates across the site. Update to your actual pricing.
export const vehicles: Vehicle[] = [
  { id: "sedan", name: "Sedan", models: "Swift Dzire, Etios, Aura", seats: 4, luggage: "2 bags", perKm: 11 },
  { id: "suv", name: "SUV", models: "Ertiga, Marazzo", seats: 6, luggage: "3 bags", perKm: 14 },
  { id: "innova", name: "Innova Crysta", models: "Toyota Innova Crysta", seats: 7, luggage: "4 bags", perKm: 18 },
  { id: "tempo", name: "Tempo Traveller", models: "Force Tempo Traveller", seats: 12, luggage: "8 bags", perKm: 24 },
];

export function estimateFare(distanceKm: number, perKm: number) {
  return Math.round((distanceKm * perKm) / 50) * 50;
}

export function formatINR(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}
