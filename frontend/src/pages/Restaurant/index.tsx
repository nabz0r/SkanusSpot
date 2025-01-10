import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Alert } from '@/components/ui/alert';
import { BookingForm } from '@/components/booking/BookingForm';
import { RestaurantMap } from '@/components/restaurant/RestaurantMap';
import { RestaurantMenu } from '@/components/restaurant/RestaurantMenu';
import { OpeningHours } from '@/components/restaurant/OpeningHours';
import { CertificationBadges } from '@/components/restaurant/CertificationBadges';

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
  if (error) return <Alert variant="destructive">Error loading restaurant details</Alert>;
  if (!restaurant) return <Alert>Restaurant not found</Alert>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Info */}
        <div className="md:col-span-2">
          <Card className="p-6">
            <h1 className="text-3xl font-bold mb-4">{restaurant.name}</h1>
            <CertificationBadges certifications={restaurant.certifications} />
            <p className="text-gray-600 mt-4">{restaurant.description}</p>

            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-3">Contact</h2>
              <div className="space-y-2">
                <p>📞 {restaurant.contacts.phone}</p>
                <p>📧 {restaurant.contacts.email}</p>
                <p>🌐 <a href={restaurant.contacts.website} target="_blank" rel="noopener noreferrer" 
                    className="text-blue-600 hover:underline">
                    {restaurant.contacts.website}
                  </a>
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-3">Location</h2>
              <p>{restaurant.location.address}</p>
              <p>{restaurant.location.city}, {restaurant.location.country}</p>
              <div className="mt-4 h-64">
                <RestaurantMap location={restaurant.location} />
              </div>
            </div>
          </Card>

          <Card className="mt-6 p-6">
            <h2 className="text-xl font-semibold mb-4">Menu</h2>
            <RestaurantMenu restaurantId={id} />
          </Card>
        </div>

        {/* Sidebar */}
        <div>
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Opening Hours</h2>
            <OpeningHours hours={restaurant.openingHours} />
          </Card>

          <Card className="mt-6 p-6">
            <h2 className="text-xl font-semibold mb-4">Make a Reservation</h2>
            <BookingForm restaurantId={id} />
          </Card>
        </div>
      </div>
    </div>
  );
}