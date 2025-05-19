import React from 'react';
import { StationCard } from './StationCard';
import type { RankedStation } from '@/lib/autoease/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Info } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface StationListProps {
  stations: RankedStation[] | null;
  isLoading: boolean;
  error: string | null;
  onViewSlots: (station: RankedStation) => void;
  selectedStationId?: string | null;
}

export function StationList({ stations, isLoading, error, onViewSlots, selectedStationId }: StationListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mt-4">
        <Info className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!stations) {
    return null; // Or a message prompting to select car/service
  }
  
  if (stations.length === 0) {
    return (
      <Alert className="mt-4">
        <Info className="h-4 w-4" />
        <AlertTitle>No Stations Found</AlertTitle>
        <AlertDescription>
          We couldn't find any stations matching your criteria. Try selecting a different car type or service.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-primary">Recommended Stations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stations.map((station) => (
          <StationCard 
            key={station.id} 
            station={station} 
            onViewSlots={onViewSlots}
            isSelectedForSlots={selectedStationId === station.id}
          />
        ))}
      </div>
    </div>
  );
}

const CardSkeleton = () => (
  <div className="flex flex-col space-y-3 p-4 border rounded-lg shadow-md">
    <Skeleton className="h-40 w-full rounded-md" />
    <Skeleton className="h-6 w-3/4 rounded-md" />
    <Skeleton className="h-4 w-1/2 rounded-md" />
    <Skeleton className="h-4 w-full rounded-md" />
    <Skeleton className="h-4 w-full rounded-md" />
    <Skeleton className="h-10 w-full rounded-md mt-2" />
  </div>
);
