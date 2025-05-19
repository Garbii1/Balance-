
import React from 'react';
import { Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ElementType;
  className?: string;
}

export function EmptyState({ title, description, icon: Icon = Info, className }: EmptyStateProps) {
  return (
    <Alert className={`mt-4 ${className}`}>
      <Icon className="h-5 w-5" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
