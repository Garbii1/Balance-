import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingIndicatorProps {
  text?: string;
  size?: number;
  className?: string;
}

export function LoadingIndicator({ text = "Loading...", size = 8, className }: LoadingIndicatorProps) {
  return (
    <div className={`flex flex-col items-center justify-center p-4 ${className}`}>
      <Loader2 className={`h-${size} w-${size} animate-spin text-primary mb-2`} />
      <p className="text-muted-foreground">{text}</p>
    </div>
  );
}
