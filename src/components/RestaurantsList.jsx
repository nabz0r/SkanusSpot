import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { MapPin, Star, Clock, Truck } from 'lucide-react';

const restaurants = [
  {
    id: 1,
    name: "Five Food halal",
    type: "halal",
    address: "Sodų g. 18A-3, Vilnius",
    coordinates: { lat: 54.671236, lng: 25.2826758 },
    rating: 4.8,
    hours: "11:00-22:00",
    delivery: true,
    specialties: "Cuisine internationale halal"
  },
  {
    id: 2,
    name: "Helen",
    type: "halal",
    address: "Švitrigailos g. 11A, Vilnius",
    coordinates: { lat: 54.6766517, lng: 25.2675664 },
    rating: 4.7,
    hours: "10:00-22:00",
    delivery: true,
    specialties: "Cuisine orientale"
  }
];

const RestaurantCard = ({ restaurant }) => (
  <Card className="mb-4 hover:shadow-lg transition-shadow">
    <CardHeader>
      <CardTitle className="flex justify-between items-center">
        <div>
          <span>{restaurant.name}</span>
          <span className="ml-2 px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">
            {restaurant.type === 'halal' ? 'Halal' : 'Casher'}
          </span>
        </div>
        <div className="flex items-center text-yellow-500">
          <Star className="w-5 h-5 fill-current" />
          <span className="ml-1">{restaurant.rating}</span>
        </div>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{restaurant.address}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Clock className="w-4 h-4 mr-2" />
          <span>{restaurant.hours}</span>
        </div>
        {restaurant.delivery && (
          <div className="flex items-center text-green-600">
            <Truck className="w-4 h-4 mr-2" />
            <span>Livraison disponible</span>
          </div>
        )}
        <div className="mt-2">
          <p className="text-sm text-gray-600">{restaurant.specialties}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const RestaurantsList = () => {
  const [filters, setFilters] = useState({
    type: 'all',
    delivery: false
  });

  const filteredRestaurants = restaurants.filter(restaurant => {
    if (filters.type !== 'all' && restaurant.type !== filters.type) return false;
    if (filters.delivery && !restaurant.delivery) return false;
    return true;
  });

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Restaurants Halal et Casher à Vilnius</h1>
        <div className="flex gap-4 mb-4">
          <select 
            className="border rounded p-2"
            value={filters.type}
            onChange={(e) => setFilters({...filters, type: e.target.value})}
          >
            <option value="all">Tous les types</option>
            <option value="halal">Halal</option>
            <option value="kosher">Casher</option>
          </select>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.delivery}
              onChange={(e) => setFilters({...filters, delivery: e.target.checked})}
              className="mr-2"
            />
            Livraison uniquement
          </label>
        </div>
      </div>
      <div className="space-y-4">
        {filteredRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantsList;