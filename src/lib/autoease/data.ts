import type { CarType, Service, Station, TimeSlot } from './types';
import { CarFront, Car, Truck, Bike, Bus, Droplets, Repeat, Disc3, SearchCode, BatteryCharging, ThermometerSnowflake, Wrench } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const carTypes: { value: CarType; label: string; icon: LucideIcon }[] = [
  { value: "Sedan", label: "Sedan", icon: CarFront },
  { value: "SUV", label: "SUV", icon: Car },
  { value: "Truck", label: "Truck", icon: Truck },
  { value: "Van", label: "Van", icon: Bus },
  { value: "Motorcycle", label: "Motorcycle", icon: Bike },
];

export const services: { value: Service; label: string; icon: LucideIcon }[] = [
  { value: "Oil Change", label: "Oil Change", icon: Droplets },
  { value: "Tire Rotation", label: "Tire Rotation", icon: Repeat },
  { value: "Brake Inspection", label: "Brake Inspection", icon: Disc3 },
  { value: "Engine Diagnostics", label: "Engine Diagnostics", icon: SearchCode },
  { value: "Battery Replacement", label: "Battery Replacement", icon: BatteryCharging },
  { value: "Air Conditioning Repair", label: "A/C Repair", icon: ThermometerSnowflake },
  { value: "General Maintenance", label: "General Maintenance", icon: Wrench },
];

export const mockStations: Station[] = [
  {
    id: "station-1",
    name: "Precision Auto Care",
    address: "123 Main St, Anytown, USA",
    services: ["Oil Change", "Brake Inspection", "Engine Diagnostics", "General Maintenance"],
    carTypes: ["Sedan", "SUV"],
    rating: 4.5,
    reviewCount: 120,
    image: "https://placehold.co/600x400.png",
    coords: { lat: 34.0522, lng: -118.2437 },
  },
  {
    id: "station-2",
    name: "QuickFix Garage",
    address: "456 Oak Ave, Anytown, USA",
    services: ["Oil Change", "Tire Rotation", "Battery Replacement", "Air Conditioning Repair"],
    carTypes: ["Sedan", "SUV", "Truck", "Van"],
    rating: 4.2,
    reviewCount: 85,
    image: "https://placehold.co/600x400.png",
    coords: { lat: 34.0550, lng: -118.2500 },
  },
  {
    id: "station-3",
    name: "Heavy Duty Motors",
    address: "789 Pine Rd, Anytown, USA",
    services: ["Engine Diagnostics", "Brake Inspection", "General Maintenance"],
    carTypes: ["Truck", "Van"],
    rating: 4.8,
    reviewCount: 200,
    image: "https://placehold.co/600x400.png",
    coords: { lat: 34.0490, lng: -118.2400 },
  },
  {
    id: "station-4",
    name: "Two Wheeler Experts",
    address: "101 Cycle Ln, Anytown, USA",
    services: ["Oil Change", "General Maintenance", "Brake Inspection"],
    carTypes: ["Motorcycle"],
    rating: 4.9,
    reviewCount: 150,
    image: "https://placehold.co/600x400.png",
    coords: { lat: 34.0580, lng: -118.2480 },
  },
  {
    id: "station-5",
    name: "AllRound Auto Services",
    address: "222 Maple Dr, Anytown, USA",
    services: ["Oil Change", "Tire Rotation", "Brake Inspection", "Engine Diagnostics", "Battery Replacement", "Air Conditioning Repair", "General Maintenance"],
    carTypes: ["Sedan", "SUV", "Truck", "Van", "Motorcycle"],
    rating: 4.0,
    reviewCount: 95,
    image: "https://placehold.co/600x400.png",
    coords: { lat: 34.0510, lng: -118.2550 },
  }
];

// Simulate fetching time slots. In a real app, this would be an API call.
export const getMockTimeSlots = (stationId: string, service: Service): Promise<TimeSlot[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simple logic: more slots for general services, fewer for complex ones.
      // Different stations might have different availability.
      const baseSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"];
      let slots: TimeSlot[];

      if (service === "Engine Diagnostics" || service === "Air Conditioning Repair") {
        slots = baseSlots.slice(0, Math.floor(baseSlots.length / 2) + stationId.length % 3);
      } else {
        slots = baseSlots.slice(0, baseSlots.length - stationId.length % 2);
      }
      
      // Randomly remove some slots to simulate busyness
      slots = slots.filter(() => Math.random() > 0.3);

      if (slots.length === 0 && baseSlots.length > 0) {
        // Ensure at least one slot if base slots exist, for demo purposes
        resolve([baseSlots[Math.floor(Math.random() * baseSlots.length)]]);
      } else {
        resolve(slots);
      }
    }, 800); // Simulate network delay
  });
};
