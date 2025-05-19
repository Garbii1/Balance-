import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import type { RankedStation, TimeSlot, Service, CarType } from '@/lib/autoease/types';
import { CheckCircle, CalendarDays, MapPin, Settings, Car } from 'lucide-react';

interface BookingConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  bookingDetails: {
    station: RankedStation;
    timeSlot: TimeSlot;
    service: Service;
    carType: CarType;
  } | null;
}

export function BookingConfirmationDialog({ isOpen, onClose, bookingDetails }: BookingConfirmationDialogProps) {
  if (!bookingDetails) return null;

  const { station, timeSlot, service, carType } = bookingDetails;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl text-center text-accent flex items-center justify-center">
            <CheckCircle className="mr-2 h-8 w-8" />
            Booking Confirmed!
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center pt-2">
            Your appointment has been successfully scheduled.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="py-4 space-y-3 text-sm">
          <div className="flex items-start">
            <MapPin className="mr-3 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <strong>Station:</strong> {station.name}
              <p className="text-xs text-muted-foreground">{station.address}</p>
            </div>
          </div>
          <div className="flex items-center">
            <CalendarDays className="mr-3 h-5 w-5 text-primary flex-shrink-0" />
            <strong>Time:</strong> {timeSlot}
          </div>
          <div className="flex items-center">
            <Car className="mr-3 h-5 w-5 text-primary flex-shrink-0" />
            <strong>Car Type:</strong> {carType}
          </div>
          <div className="flex items-center">
            <Settings className="mr-3 h-5 w-5 text-primary flex-shrink-0" />
            <strong>Service:</strong> {service}
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onClose} className="w-full bg-primary hover:bg-primary/90">
            Done
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
