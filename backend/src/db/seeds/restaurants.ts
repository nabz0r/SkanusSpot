import mongoose from 'mongoose';
import { Restaurant } from '../../models/Restaurant';

export const restaurantSeeds = [
  // Vilnius, Lithuania
  {
    name: "Halal Grill House",
    description: "Authentic halal cuisine in the heart of Vilnius",
    cuisine: ["Middle Eastern", "Grilled", "Halal"],
    certifications: {
      halal: true,
      kosher: false,
      vegan: false,
      vegetarian: true
    },
    location: {
      address: "Pilies g. 16",
      city: "Vilnius",
      country: "Lithuania",
      coordinates: {
        type: "Point",
        coordinates: [25.2797, 54.6872]
      }
    },
    contacts: {
      phone: "+370 5 123 4567",
      email: "contact@halalgrill.lt",
      website: "https://halalgrill.lt"
    },
    openingHours: {
      monday: "11:00-22:00",
      tuesday: "11:00-22:00",
      wednesday: "11:00-22:00",
      thursday: "11:00-22:00",
      friday: "11:00-23:00",
      saturday: "12:00-23:00",
      sunday: "12:00-21:00"
    },
    subscription: {
      plan: "premium",
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-12-31"),
      features: ["online-booking", "delivery", "priority-support"]
    },
    placement: {
      priority: 1,
      promoted: true
    },
    commissionRate: 5
  },

  // Riga, Latvia
  {
    name: "Kosher Delight",
    description: "Traditional kosher restaurant serving Jewish specialties",
    cuisine: ["Jewish", "Kosher", "European"],
    certifications: {
      halal: false,
      kosher: true,
      vegan: false,
      vegetarian: true
    },
    location: {
      address: "Elizabetes iela 89",
      city: "Riga",
      country: "Latvia",
      coordinates: {
        type: "Point",
        coordinates: [24.1052, 56.9496]
      }
    },
    contacts: {
      phone: "+371 67 891 234",
      email: "info@kosherdelight.lv",
      website: "https://kosherdelight.lv"
    },
    openingHours: {
      monday: "closed",
      tuesday: "12:00-21:00",
      wednesday: "12:00-21:00",
      thursday: "12:00-21:00",
      friday: "12:00-16:00",
      saturday: "closed",
      sunday: "12:00-21:00"
    },
    subscription: {
      plan: "basic",
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-12-31"),
      features: ["online-booking"]
    },
    placement: {
      priority: 2,
      promoted: false
    },
    commissionRate: 3
  },

  // Tallinn, Estonia
  {
    name: "Vegan Paradise",
    description: "Modern vegan cuisine with Baltic influences",
    cuisine: ["Vegan", "Baltic", "Fusion"],
    certifications: {
      halal: false,
      kosher: false,
      vegan: true,
      vegetarian: true
    },
    location: {
      address: "Viru 23",
      city: "Tallinn",
      country: "Estonia",
      coordinates: {
        type: "Point",
        coordinates: [24.7536, 59.4369]
      }
    },
    contacts: {
      phone: "+372 634 5678",
      email: "hello@veganparadise.ee",
      website: "https://veganparadise.ee"
    },
    openingHours: {
      monday: "11:00-21:00",
      tuesday: "11:00-21:00",
      wednesday: "11:00-21:00",
      thursday: "11:00-21:00",
      friday: "11:00-22:00",
      saturday: "11:00-22:00",
      sunday: "11:00-20:00"
    },
    subscription: {
      plan: "premium",
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-12-31"),
      features: ["online-booking", "delivery", "priority-support"]
    },
    placement: {
      priority: 1,
      promoted: true
    },
    commissionRate: 5
  }
];

const seedRestaurants = async () => {
  try {
    // Clear existing restaurants
    await Restaurant.deleteMany({});
    
    // Insert new restaurants
    await Restaurant.insertMany(restaurantSeeds);
    
    console.log('✅ Restaurants seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding restaurants:', error);
    throw error;
  }
};

export default seedRestaurants;