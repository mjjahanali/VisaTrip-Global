/**
 * Phase 2 Live Flight GDS/NDC API Architecture (Scaffolding Only).
 * Currently Air Ticketing runs as a high-trust consultation & enquiry desk.
 * Plug Amadeus, Sabre, Travelport, or BDFare/ShareTrip B2B APIs into this adapter later.
 */

export interface FlightSearchQuery {
  tripType: 'one-way' | 'round-trip';
  scope: 'domestic' | 'international';
  originIata: string;
  destinationIata: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  cabinClass: 'Economy' | 'Premium Economy' | 'Business';
}

export interface FlightOffer {
  id: string;
  airline: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  stops: number;
  priceBDT: number;
  baggageAllowance: string;
}

export interface FlightProviderAdapter {
  searchFlights(query: FlightSearchQuery): Promise<FlightOffer[]>;
}
