import React from 'react';
import { Badge } from '@/components/ui/badge';

interface RestaurantInfoProps {
  restaurant: {
    name: string;
    description: string;
    cuisine: string[];
    certifications: {
      halal: boolean;
      kosher: boolean;
      vegan: boolean;
      vegetarian: boolean;
    };
    contacts: {
      phone: string;
      email: string;
      website: string;
    };
  };
}

export function RestaurantInfo({ restaurant }: RestaurantInfoProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold">{restaurant.name}</h1>
        <p className="mt-2 text-gray-600">{restaurant.description}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {restaurant.cuisine.map(type => (
          <Badge key={type} variant="secondary">{type}</Badge>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {restaurant.certifications.halal && (
          <Badge variant="success">☪️ Halal Certified</Badge>
        )}
        {restaurant.certifications.kosher && (
          <Badge variant="success">✡️ Kosher Certified</Badge>
        )}
        {restaurant.certifications.vegan && (
          <Badge variant="success">🌱 Vegan</Badge>
        )}
        {restaurant.certifications.vegetarian && (
          <Badge variant="success">🥬 Vegetarian</Badge>
        )}
      </div>

      <div className="space-y-2">
        <p>📞 {restaurant.contacts.phone}</p>
        <p>📧 {restaurant.contacts.email}</p>
        <p>
          🌐 <a 
            href={restaurant.contacts.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {restaurant.contacts.website}
          </a>
        </p>
      </div>
    </div>
  );
}