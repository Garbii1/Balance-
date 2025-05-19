
'use client';

import React, { useEffect } from 'react';
import { useBalanceeStore } from '@/hooks/useBalanceeStore';
import { ServiceSelectionForm } from '@/components/balancee/ServiceSelectionForm';
import { StationList } from '@/components/balancee/StationList';
import { TimeSlotDisplay } from '@/components/balancee/TimeSlotDisplay';
import { BookingConfirmationDialog } from '@/components/balancee/BookingConfirmationDialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Car, Wrench } from 'lucide-react';
import { ThemeToggleButton } from '@/components/balancee/theme-toggle-button';

export default function BalanceePage() {
  const {
    fetchRankedStations,
    rankedStations,
    isLoadingStations,
    error,
    clearError,
    selectedStationForSlots,
    setSelectedStationForSlots,
    availableTimeSlots,
    isLoadingTimeSlots,
    selectedTimeSlot,
    setSelectedTimeSlot,
    confirmBooking,
    bookingConfirmed,
    resetBooking,
  } = useBalanceeStore();

  useEffect(() => {
    // Clear any persistent errors on mount or when relevant state changes
    return () => {
      clearError();
    };
  }, [clearError]);

  const handleServiceSelectionSubmit = () => {
    fetchRankedStations();
  };

  const handleBookNow = () => {
    confirmBooking();
    // toast from shadcn/ui can be used here, but dialog is primary confirmation
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 py-8 min-h-screen">
      <header className="mb-10 text-center relative">
        <div className="flex items-center justify-center space-x-4 mb-2">
          <Car className="h-12 w-12 text-primary" />
          <h1 className="text-4xl sm:text-5xl font-bold text-primary">Balanceè</h1>
          <Wrench className="h-12 w-12 text-primary" />
        </div>
        <p className="text-lg text-muted-foreground">Smart Car Repair Booking</p>
        <div className="absolute top-0 right-0">
          <ThemeToggleButton />
        </div>
      </header>

      <main className="space-y-10 max-w-4xl mx-auto">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertTitle>An Error Occurred</AlertTitle>
            <AlertDescription>
              {error}
              <Button variant="link" onClick={clearError} className="p-0 h-auto ml-2 text-destructive-foreground">
                Dismiss
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <ServiceSelectionForm onSubmit={handleServiceSelectionSubmit} />

        { (isLoadingStations || rankedStations) && (
          <StationList
            stations={rankedStations}
            isLoading={isLoadingStations}
            error={null} // Page level error is handled above
            onViewSlots={setSelectedStationForSlots}
            selectedStationId={selectedStationForSlots?.id}
          />
        )}

        {selectedStationForSlots && (
          <TimeSlotDisplay
            station={selectedStationForSlots}
            timeSlots={availableTimeSlots}
            isLoading={isLoadingTimeSlots}
            selectedTimeSlot={selectedTimeSlot}
            onSelectTimeSlot={setSelectedTimeSlot}
            onBookNow={handleBookNow}
            onClose={() => setSelectedStationForSlots(null)}
          />
        )}

        <BookingConfirmationDialog
          isOpen={!!bookingConfirmed}
          onClose={resetBooking}
          bookingDetails={bookingConfirmed}
        />
      </main>
      <footer className="text-center mt-12 py-6 border-t">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Balanceè. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
