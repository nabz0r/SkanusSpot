import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { BookingForm } from '@/components/booking/BookingForm';
import { RestaurantInfo } from '@/components/restaurant/RestaurantInfo';
import { OpeningHours } from '@/components/restaurant/OpeningHours';
import { RestaurantMap } from '@/components/restaurant/RestaurantMap';

export default function RestaurantPage() {
  const { id } = useParams<{ id: string }>();

  const { data: restaurant, isLoading, error } = useQuery({
    queryKey: ['restaurant', id],
    queryFn: async () => {
      const response = await fetch(`/api/restaurants/${id}`);
      if (!response.ok) throw new Error('Failed to fetch restaurant');
      return response.json();
    }
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading restaurant</div>;
  if (!restaurant) return <div>Restaurant not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left column: Restaurant info */}
        <div className="md:col-span-2 space-y-6">
          <RestaurantInfo restaurant={restaurant} />
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Location</h2>
            <RestaurantMap location={restaurant.location} />
          </Card>
        </div>
        
        {/* Right column: Booking and hours */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Book a Table</h2>
            <BookingForm restaurantId={id} />
          </Card>
          
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Opening Hours</h2>
            <OpeningHours hours={restaurant.openingHours} />
          </Card>
        </div>
      </div>
    </div>
  );
}