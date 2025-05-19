import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { carTypes, services } from '@/lib/autoease/data';
import type { CarType, Service } from '@/lib/autoease/types';
import { useAutoEaseStore } from '@/hooks/useAutoEaseStore';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  carType: z.string().min(1, "Please select a car type."),
  service: z.string().min(1, "Please select a service."),
});

type ServiceSelectionFormValues = z.infer<typeof formSchema>;

interface ServiceSelectionFormProps {
  onSubmit: () => void;
}

export function ServiceSelectionForm({ onSubmit }: ServiceSelectionFormProps) {
  const { setCarType, setService, isLoadingStations } = useAutoEaseStore();

  const form = useForm<ServiceSelectionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      carType: "",
      service: "",
    },
  });

  const handleFormSubmit = (values: ServiceSelectionFormValues) => {
    setCarType(values.carType as CarType);
    setService(values.service as Service);
    onSubmit();
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl text-primary">Find a Repair Station</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="carType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Car Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your car type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {carTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center">
                            <type.icon className="mr-2 h-5 w-5 text-primary" />
                            {type.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repair Service</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the service you need" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.value} value={service.value}>
                           <div className="flex items-center">
                            <service.icon className="mr-2 h-5 w-5 text-primary" />
                            {service.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoadingStations}>
              {isLoadingStations ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                'Find Stations'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
