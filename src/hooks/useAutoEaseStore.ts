import { create } from 'zustand';
import type { CarType, Service, Station, TimeSlot, RankedStation } from '@/lib/autoease/types';
import { mockStations, getMockTimeSlots } from '@/lib/autoease/data';
import { rankStations, type RankStationsInput, type RankStationsOutput } from '@/ai/flows/station-ranking';

interface AutoEaseState {
  carType: CarType | null;
  service: Service | null;
  allStations: Station[]; // Raw list from mock data
  rankedStations: RankedStation[] | null;
  selectedStationForSlots: Station | null; // Station whose slots are being viewed
  availableTimeSlots: TimeSlot[] | null;
  selectedTimeSlot: TimeSlot | null;
  
  isLoadingStations: boolean;
  isLoadingTimeSlots: boolean;
  
  bookingConfirmed: {
    station: RankedStation;
    timeSlot: TimeSlot;
    service: Service;
    carType: CarType;
  } | null;
  
  error: string | null;

  setCarType: (carType: CarType | null) => void;
  setService: (service: Service | null) => void;
  fetchRankedStations: () => Promise<void>;
  setSelectedStationForSlots: (station: RankedStation | null) => void;
  fetchTimeSlots: () => Promise<void>;
  setSelectedTimeSlot: (timeSlot: TimeSlot | null) => void;
  confirmBooking: () => void;
  resetBooking: () => void;
  clearError: () => void;
}

export const useAutoEaseStore = create<AutoEaseState>((set, get) => ({
  carType: null,
  service: null,
  allStations: mockStations,
  rankedStations: null,
  selectedStationForSlots: null,
  availableTimeSlots: null,
  selectedTimeSlot: null,
  
  isLoadingStations: false,
  isLoadingTimeSlots: false,
  
  bookingConfirmed: null,
  error: null,

  setCarType: (carType) => set({ carType, rankedStations: null, selectedStationForSlots: null, availableTimeSlots: null, selectedTimeSlot: null, error: null }),
  setService: (service) => set({ service, rankedStations: null, selectedStationForSlots: null, availableTimeSlots: null, selectedTimeSlot: null, error: null }),

  fetchRankedStations: async () => {
    const { carType, service, allStations } = get();
    if (!carType || !service) {
      set({ error: "Please select both car type and service." });
      return;
    }

    set({ isLoadingStations: true, error: null, rankedStations: null, selectedStationForSlots: null, availableTimeSlots: null, selectedTimeSlot: null });
    try {
      const rankStationsInput: RankStationsInput = {
        carType,
        service,
        stations: allStations.map(s => ({
          id: s.id,
          name: s.name,
          services: s.services,
          carTypes: s.carTypes,
        })),
      };
      const genAIrankedStations: RankStationsOutput = await rankStations(rankStationsInput);
      
      // Combine GenAI ranking with original station details
      const enrichedRankedStations: RankedStation[] = genAIrankedStations.map(ranked => {
        const originalStation = allStations.find(s => s.id === ranked.id);
        return {
          ...ranked,
          address: originalStation?.address || 'N/A',
          rating: originalStation?.rating || 0,
          image: originalStation?.image,
          reviewCount: originalStation?.reviewCount || 0,
        };
      }).sort((a, b) => b.rank - a.rank); // Ensure sorted by rank

      set({ rankedStations: enrichedRankedStations, isLoadingStations: false });
    } catch (err) {
      console.error("Error fetching ranked stations:", err);
      set({ error: "Failed to get station rankings. Please try again.", isLoadingStations: false });
    }
  },

  setSelectedStationForSlots: (station) => {
    set({ selectedStationForSlots: station, availableTimeSlots: null, selectedTimeSlot: null, error: null });
    if (station) {
      get().fetchTimeSlots();
    }
  },

  fetchTimeSlots: async () => {
    const { selectedStationForSlots, service } = get();
    if (!selectedStationForSlots || !service) {
      // This should not happen if setSelectedStationForSlots is used correctly
      set({ error: "Station or service not selected for fetching time slots." });
      return;
    }

    set({ isLoadingTimeSlots: true, error: null, availableTimeSlots: null, selectedTimeSlot: null });
    try {
      const timeSlots = await getMockTimeSlots(selectedStationForSlots.id, service);
      set({ availableTimeSlots: timeSlots, isLoadingTimeSlots: false });
    } catch (err) {
      console.error("Error fetching time slots:", err);
      set({ error: "Failed to fetch time slots. Please try again.", isLoadingTimeSlots: false });
    }
  },
  
  setSelectedTimeSlot: (timeSlot) => set({ selectedTimeSlot: timeSlot }),

  confirmBooking: () => {
    const { selectedStationForSlots, selectedTimeSlot, service, carType } = get();
    if (selectedStationForSlots && selectedTimeSlot && service && carType) {
      set({
        bookingConfirmed: {
          station: selectedStationForSlots as RankedStation, // Cast, as it would be RankedStation type by now
          timeSlot: selectedTimeSlot,
          service,
          carType,
        },
        // Reset selections for a new booking flow
        selectedStationForSlots: null,
        availableTimeSlots: null,
        selectedTimeSlot: null,
      });
    } else {
      set({ error: "Missing information for booking. Please select station, time slot, service, and car type." });
    }
  },

  resetBooking: () => {
    set({
      bookingConfirmed: null,
      // carType: null, // Optionally reset these too or keep them for convenience
      // service: null,
      // rankedStations: null, 
      error: null,
    });
  },
  
  clearError: () => set({ error: null }),
}));
