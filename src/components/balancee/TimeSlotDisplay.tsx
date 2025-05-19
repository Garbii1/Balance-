
import React from 'react';
import type { TimeSlot, RankedStation } from '@/lib/balancee/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, CalendarClock, Info, XCircle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TimeSlotDisplayProps {
  station: RankedStation | null;
  timeSlots: TimeSlot[] | null;
  isLoading: boolean;
  selectedTimeSlot: TimeSlot | null;
  onSelectTimeSlot: (slot: TimeSlot) => void;
  onBookNow: () => void;
  onClose: () => void; // To close/hide the time slot display
}

export function TimeSlotDisplay({
  station,
  timeSlots,
  isLoading,
  selectedTimeSlot,
  onSelectTimeSlot,
  onBookNow,
  onClose
}: TimeSlotDisplayProps) {
  if (!station) return null;

  return (
    <Card className="mt-6 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl text-primary flex items-center">
            <CalendarClock className="mr-2 h-6 w-6" />
            Available Slots for {station.name}
          </CardTitle>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close time slots">
          <XCircle className="h-6 w-6" />
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="flex justify-center items-center min-h-[100px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-2">Loading time slots...</p>
          </div>
        )}
        {!isLoading && timeSlots && timeSlots.length > 0 && (
          <ScrollArea className="h-[200px] pr-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {timeSlots.map((slot) => (
                <Button
                  key={slot}
                  variant={selectedTimeSlot === slot ? 'default' : 'outline'}
                  onClick={() => onSelectTimeSlot(slot)}
                  className="w-full"
                >
                  {slot}
                </Button>
              ))}
            </div>
          </ScrollArea>
        )}
        {!isLoading && timeSlots && timeSlots.length === 0 && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>No Slots Available</AlertTitle>
            <AlertDescription>
              There are no available time slots for this station and service at the moment. Please try another station or check back later.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      {timeSlots && timeSlots.length > 0 && (
        <CardFooter>
          <Button
            onClick={onBookNow}
            disabled={!selectedTimeSlot || isLoading}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            Book Now {selectedTimeSlot ? `at ${selectedTimeSlot}` : ''}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
