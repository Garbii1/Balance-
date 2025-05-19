
import type { RankStationsOutput } from '@/ai/flows/station-ranking';

export type CarType = "Sedan" | "SUV" | "Truck" | "Van" | "Motorcycle";
export type Service = "Oil Change" | "Tire Rotation" | "Brake Inspection" | "Engine Diagnostics" | "Battery Replacement" | "Air Conditioning Repair" | "General Maintenance";

export interface Station {
  id: string;
  name: string;
  address: string;
  services: Service[];
  carTypes: CarType[];
  rating: number; // e.g., 1-5
  image?: string; // Optional image URL
  reviewCount?: number;
  coords?: { lat: number; lng: number };
}

export type TimeSlot = string; // e.g., "09:00 AM", "10:00 AM - 11:00 AM"

export interface RankedStation extends RankStationsOutput[0] {
  // Inherits id, name, rank, reason from GenAI output
  // Add original station data if needed, or fetch by ID
  address: string;
  rating: number;
  image?: string;
  reviewCount?: number;
}
