
import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { RankedStation } from '@/lib/balancee/types';
import { Star, MapPin, CheckCircle, MessageSquareText } from 'lucide-react';

interface StationCardProps {
  station: RankedStation;
  onViewSlots: (station: RankedStation) => void;
  isSelectedForSlots: boolean;
}

export function StationCard({ station, onViewSlots, isSelectedForSlots }: StationCardProps) {
  return (
    <Card className={`shadow-md transition-all duration-300 hover:shadow-xl ${isSelectedForSlots ? 'ring-2 ring-primary' : ''}`}>
      <CardHeader>
        {station.image && (
          <div className="relative h-40 w-full mb-4 rounded-t-lg overflow-hidden">
            <Image 
              src={station.image} 
              alt={station.name} 
              layout="fill" 
              objectFit="cover"
              data-ai-hint="garage auto repair" 
            />
          </div>
        )}
        <CardTitle className="text-xl text-primary">{station.name}</CardTitle>
        <CardDescription className="flex items-center text-sm">
          <MapPin className="mr-1 h-4 w-4 text-muted-foreground" /> {station.address}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center text-sm">
          <Star className="mr-1 h-4 w-4 text-yellow-500" />
          {station.rating.toFixed(1)} ({station.reviewCount} reviews)
        </div>
        <div className="flex items-center text-sm text-green-600">
          <CheckCircle className="mr-1 h-4 w-4" />
          AI Rank: {station.rank}
        </div>
        <div className="text-sm italic text-muted-foreground p-2 border border-dashed rounded-md">
           <MessageSquareText className="inline-block mr-1 h-4 w-4 align-text-bottom" />
           {station.reason}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => onViewSlots(station)} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          {isSelectedForSlots ? 'Viewing Slots...' : 'View Available Slots'}
        </Button>
      </CardFooter>
    </Card>
  );
}
