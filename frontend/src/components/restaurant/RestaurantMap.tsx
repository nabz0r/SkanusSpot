import React from 'react';

interface RestaurantMapProps {
  location: {
    address: string;
    city: string;
    country: string;
    coordinates: {
      type: string;
      coordinates: [number, number];
    };
  };
}

export function RestaurantMap({ location }: RestaurantMapProps) {
  // Ici vous pouvez intégrer une carte Google Maps ou OpenStreetMap
  // Pour l'instant, on affiche juste l'adresse
  return (
    <div className="space-y-2">
      <p className="font-medium">{location.address}</p>
      <p>{location.city}, {location.country}</p>
      <p className="text-sm text-gray-500">
        Coordinates: {location.coordinates.coordinates.join(', ')}
      </p>
    </div>
  );
}