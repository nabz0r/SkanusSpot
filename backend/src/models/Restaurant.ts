import mongoose from 'mongoose';

export interface IRestaurant extends mongoose.Document {
  name: string;
  type: 'halal' | 'kosher';
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  phone: string;
  website?: string;
  hours: {
    day: string;
    open: string;
    close: string;
  }[];
  cuisine: string[];
  priceRange: '€' | '€€' | '€€€';
  delivery: boolean;
  deliveryPlatforms?: string[];
  averageRating: number;
  certifications: string[];
  features: string[];
  photos: string[];
  createdAt: Date;
  updatedAt: Date;
}

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['halal', 'kosher'],
    required: true
  },
  address: {
    type: String,
    required: true
  },
  coordinates: {
    lat: Number,
    lng: Number
  },
  phone: {
    type: String,
    required: true
  },
  website: String,
  hours: [{
    day: String,
    open: String,
    close: String
  }],
  cuisine: [String],
  priceRange: {
    type: String,
    enum: ['€', '€€', '€€€'],
    default: '€€'
  },
  delivery: {
    type: Boolean,
    default: false
  },
  deliveryPlatforms: [String],
  averageRating: {
    type: Number,
    default: 0
  },
  certifications: [String],
  features: [String],
  photos: [String]
}, {
  timestamps: true
});

// Index pour la recherche géospatiale
restaurantSchema.index({ coordinates: '2dsphere' });

export const Restaurant = mongoose.model<IRestaurant>('Restaurant', restaurantSchema);